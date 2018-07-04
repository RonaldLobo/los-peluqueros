webpackJsonp([1,5],{

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_usuario__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_telefono__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_correo__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__window_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__push_notification_service__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_facebook__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var window;
var AuthService = (function () {
    function AuthService(router, dataService, fb, windowRef, pushNotificationsService) {
        this.router = router;
        this.dataService = dataService;
        this.fb = fb;
        this.windowRef = windowRef;
        this.pushNotificationsService = pushNotificationsService;
        this.isLogged = false;
        this.token = "token test";
        this.errorDisplay = '';
        this.isImpersonando = false;
        this.isAppUnica = false;
        this.usuarioOriginal = {};
        this.idBarberia = "";
        this.idBarberiaUnica = 1;
        this.nombreBarberia = "Los Peluqueros";
        this.usuario = new __WEBPACK_IMPORTED_MODULE_2__models_usuario__["a" /* Usuario */]();
        this.profilePic = '';
        this.isApp = false;
        this.fbUserIdApp = '';
        this.loggedObservable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.addAfter();
    }
    AuthService.prototype.addAfter = function () {
        var that = this;
        setTimeout(function () {
            var initParams = {
                appId: '1466897480062572',
                xfbml: true,
                version: 'v2.10',
                status: true
            };
            that._window = that.windowRef.nativeWindow;
            var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
            if (app) {
                that.isApp = true;
            }
            else {
                that.fb.init(initParams);
            }
            that.getFromStore();
        }, 1500);
    };
    AuthService.prototype.emitLogged = function () {
        this.loggedObservable.next(this.isLogged);
    };
    AuthService.prototype.login = function (usuario) {
        var _this = this;
        this.dataService.post('/login/', { "usuario": usuario })
            .then(function (response) {
            console.log('success', response);
            _this.isLogged = true;
            _this.token = response.auth.token;
            _this.loggedUser = response.auth.user;
            if (_this.loggedUser.idSucursal == 1) {
                _this.idBarberia = 1;
                _this.emitLogged();
                _this.storeUser();
                _this.pushNotificationsService.agregarTema('user' + _this.loggedUser.id);
            }
            else {
                _this.dataService.get('/sucursal/' + _this.loggedUser.idSucursal)
                    .then(function (response) {
                    _this.idBarberia = response[0].idBarberia;
                    _this.emitLogged();
                    _this.storeUser();
                    _this.pushNotificationsService.agregarTema('user' + _this.loggedUser.id);
                }, function (error) {
                    _this.isLogged = false;
                    _this.emitLogged();
                });
            }
        }, function (error) {
            _this.isLogged = false;
            _this.emitLogged();
        });
    };
    AuthService.prototype.impersonar = function (usuario) {
        this.usuarioOriginal = this.loggedUser;
        this.loggedUser = usuario;
        this.isImpersonando = true;
    };
    AuthService.prototype.noImpersonar = function () {
        this.isImpersonando = false;
        this.loggedUser = this.usuarioOriginal;
        this.router.navigate(['/home']);
    };
    AuthService.prototype.nuevoUsuario = function (usuario) {
        var _this = this;
        usuario.rol = 'U';
        usuario.idSucursal = 1;
        this.errorDisplay = '';
        this.dataService.post('/signup/', { "usuario": usuario })
            .then(function (response) {
            console.log('success', response);
            if (response.error) {
                _this.isLogged = false;
                _this.errorDisplay = 'Por favor seleccione otro usuario.';
                _this.emitLogged();
            }
            else {
                _this.isLogged = true;
                _this.token = response.auth.token;
                _this.loggedUser = response.auth.user;
                _this.storeUser();
                _this.emitLogged();
            }
        }, function (error) {
            console.log('error', error);
        });
    };
    AuthService.prototype.storeUser = function () {
        this.dataService.setToken(this.token);
        try {
            localStorage.setItem('loggedUser', JSON.stringify({ token: this.token, user: this.loggedUser, idBarberia: this.idBarberia, fbUserIdApp: this.fbUserIdApp }));
        }
        catch (e) {
            console.log(e);
        }
    };
    AuthService.prototype.updateStoredUser = function () {
        this.storeUser();
    };
    AuthService.prototype.getFromStore = function () {
        var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (loggedUser) {
            this.token = loggedUser.token;
            this.isLogged = true;
            this.loggedUser = loggedUser.user;
            this.idBarberia = loggedUser.idBarberia;
            this.fbUserIdApp = loggedUser.fbUserIdApp;
            this.dataService.setToken(this.token);
            if (this.fbUserIdApp) {
                this.fbLogin();
            }
        }
    };
    AuthService.prototype.isUserLogged = function () {
        return this.isLogged;
    };
    AuthService.prototype.isRegularUser = function () {
        if (!this.loggedUser || !this.loggedUser.rol)
            return false;
        return this.loggedUser.rol.indexOf('U') != -1;
    };
    AuthService.prototype.isAdminUser = function () {
        if (!this.loggedUser || !this.loggedUser.rol)
            return false;
        return this.loggedUser.rol.indexOf('A') != -1;
    };
    AuthService.prototype.isAdminSucursalUser = function () {
        if (!this.loggedUser || !this.loggedUser.rol)
            return false;
        return this.loggedUser.rol.indexOf('S') != -1;
    };
    AuthService.prototype.isBarberoUser = function () {
        if (!this.loggedUser || !this.loggedUser.rol)
            return false;
        return this.loggedUser.rol.indexOf('B') != -1;
    };
    AuthService.prototype.logout = function () {
        this.pushNotificationsService.eliminarTema('user' + this.loggedUser.id);
        if (this.fbUserIdApp) {
            this.logoutFb();
        }
        localStorage.removeItem('loggedUser');
        this.isLogged = false;
        this.loggedUser = new __WEBPACK_IMPORTED_MODULE_2__models_usuario__["a" /* Usuario */]();
        this.isImpersonando = false;
        this.profilePic = '';
        this.fbUserIdApp = '';
        this.router.navigate(['/home']);
    };
    AuthService.prototype.getLoggedUser = function () {
        return this.loggedUser;
    };
    AuthService.prototype.getFbUser = function () {
        var _this = this;
        console.log('va a traer la info del usuario ' + this.fbUserIdApp);
        this._window.facebookConnectPlugin.api("/me?fields=email,first_name,last_name,picture", null, function (res) {
            console.log('Got the users profile');
            _this.profilePic = res.picture.data.url;
            if (!_this.isLogged) {
                _this.usuario.usuario = res.id;
                _this.usuario.nombre = res.first_name;
                _this.usuario.apellido1 = res.last_name.split(' ')[0];
                if (res.last_name.split(' ').length > 1) {
                    _this.usuario.apellido2 = res.last_name.split(' ')[1];
                }
                _this.usuario.contrasenna = 'facebook';
                _this.usuario.tipo = 'F';
                _this.usuario.correo = [];
                if (res.email) {
                    var cor = new __WEBPACK_IMPORTED_MODULE_6__models_correo__["a" /* Correo */]();
                    cor.correo = res.email;
                    _this.usuario.correo.push(cor);
                }
                _this.usuario.telefono = [];
                if (res.phone) {
                    var tel = new __WEBPACK_IMPORTED_MODULE_5__models_telefono__["a" /* Telefono */]();
                    tel.telefono = res.phone;
                    _this.usuario.telefono.push(tel);
                }
                _this.usuario.idSucursal = 1;
                _this.usuario.rol = 'U';
                _this.login(_this.usuario);
            }
        }, function (error) {
            console.log('error get user info ' + JSON.stringify(error));
        });
    };
    AuthService.prototype.fbLogin = function () {
        var _this = this;
        console.log('es un app ' + this.isApp);
        if (this.isApp) {
            console.log('antes del login status');
            this._window.facebookConnectPlugin.getLoginStatus(function (success) {
                console.log('despues del login status success');
                if (success.status === 'connected') {
                    console.log('despues si esta conectado ');
                    _this.fbUserIdApp = success.authResponse.userID;
                    _this.getFbUser();
                }
                else {
                    _this._window.facebookConnectPlugin.login(['email', 'public_profile'], function (response) {
                        console.log('login dice que salio bien');
                        console.log('Hizo login' + JSON.stringify(response.authResponse));
                        _this.fbUserIdApp = response.authResponse.userID;
                        _this.getFbUser();
                    }, function (error) {
                        console.log('error get user info ' + JSON.stringify(error));
                    });
                }
            }, function (error) {
                console.log('error check status');
                console.log(error);
            });
        }
        else {
            this.fb.login({ scope: 'email,public_profile' })
                .then(function (response) {
                console.log(response);
                _this.fb.api('/me?fields=email,first_name,last_name,picture')
                    .then(function (res) {
                    console.log('Got the users profile', res);
                    _this.profilePic = res.picture.data.url;
                    if (!_this.isLogged) {
                        _this.usuario.usuario = res.id;
                        _this.usuario.nombre = res.first_name;
                        _this.usuario.apellido1 = res.last_name.split(' ')[0];
                        if (res.last_name.split(' ').length > 1) {
                            _this.usuario.apellido2 = res.last_name.split(' ')[1];
                        }
                        _this.usuario.contrasenna = 'facebook';
                        _this.usuario.tipo = 'F';
                        _this.usuario.correo = [];
                        if (res.email) {
                            var cor = new __WEBPACK_IMPORTED_MODULE_6__models_correo__["a" /* Correo */]();
                            cor.correo = res.email;
                            _this.usuario.correo.push(cor);
                        }
                        _this.usuario.telefono = [];
                        if (res.phone) {
                            var tel = new __WEBPACK_IMPORTED_MODULE_5__models_telefono__["a" /* Telefono */]();
                            tel.telefono = res.phone;
                            _this.usuario.telefono.push(tel);
                        }
                        _this.usuario.idSucursal = 1;
                        _this.usuario.rol = 'U';
                        console.log('user', _this.usuario);
                        _this.login(_this.usuario);
                    }
                })
                    .catch(function (error) { return console.error(error); });
            })
                .catch(function (error) { return console.error(error); });
        }
    };
    AuthService.prototype.logoutFb = function () {
        if (this.isApp) {
            this._window.facebookConnectPlugin.logout(function (success) {
                console.log('success logout');
            }, function (failure) {
                console.log('fail login');
            });
        }
        else {
            this.fb.logout()
                .then(function (response) {
                console.log('logout');
            });
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__data_service__["a" /* DataService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_9_ngx_facebook__["b" /* FacebookService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_ngx_facebook__["b" /* FacebookService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__window_service__["a" /* WindowRefService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__window_service__["a" /* WindowRefService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__push_notification_service__["a" /* PushNotificationsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__push_notification_service__["a" /* PushNotificationsService */]) === "function" && _e || Object])
], AuthService);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataService = (function () {
    // public server:string = "http://lospeluqueros.com/API/index.php";
    function DataService(http) {
        this.http = http;
        this.token = '';
        // public server:string = "http://localhost:82/API/index.php"
        this.server = "/API/index.php";
        var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
        if (app) {
            this.server = "https://los-peluqueros.herokuapp.com/API/index.php";
        }
    }
    DataService.prototype.search = function (url, element) {
        var options;
        var params;
        params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* URLSearchParams */]();
        for (var key in element) {
            if (element.hasOwnProperty(key)) {
                params.set(key, element[key]);
            }
        }
        options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ search: params });
        return this.http.get(this.server + url, options)
            .map(function (response) { return response.json(); });
    };
    DataService.prototype.post = function (url, element) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.server + url, JSON.stringify(element), options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postFile = function (url, element) {
        return this.http.post(this.server + url, JSON.stringify(element), { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* ResponseContentType */].Blob })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getAll = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.server + url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.get = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.server + url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.delete = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.server + url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.setToken = function (token) {
        this.token = 'Bearer ' + token;
    };
    DataService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return DataService;
}());
DataService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */]) === "function" && _a || Object])
], DataService);

var _a;
//# sourceMappingURL=data.service.js.map

/***/ }),

/***/ 332:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 332;


/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(363);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
var bootstrap = function () {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
};
var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
if (app) {
    document.addEventListener('deviceready', function () {
        bootstrap();
    });
}
else {
    bootstrap();
}
// platformBrowserDynamic().bootstrapModule(AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_push_notification_service__ = __webpack_require__(69);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(ngZone, pushService) {
        this.ngZone = ngZone;
        this.pushService = pushService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var that = this;
        var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
        if (app) {
            that.ngZone.run(function () {
                _this.pushService.initNotifications();
            });
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(516),
        styles: [__webpack_require__(420)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* NgZone */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_push_notification_service__["a" /* PushNotificationsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_push_notification_service__["a" /* PushNotificationsService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__info_info_component__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__login_login_component__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_carousel_carousel_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nav_nav_component__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__footer_footer_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__configuracion_configuracion_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__calendario_input_calendario_input_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_validator_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_facebook_login_service__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_push_notification_service__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ngx_facebook__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ngx_bootstrap_collapse__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ngx_bootstrap_timepicker__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ngx_bootstrap_carousel__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ngx_bootstrap_accordion__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ngx_bootstrap_tabs__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ngx_bootstrap_modal__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_ngx_bootstrap_datepicker__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ngx_bootstrap_buttons__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_ngx_bootstrap_typeahead__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__reserva_reserva_component__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__reserva_hora_pipe__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__calendario_calendario_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_hammerjs__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_33_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__barberos_barberos_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_ngx_bootstrap_bs_moment__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_ngx_bootstrap_locale__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__services_window_service__ = __webpack_require__(52);
/* unused harmony export ROUTES */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




































var ROUTES = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: __WEBPACK_IMPORTED_MODULE_6__home_home_component__["a" /* HomeComponent */]
    },
    {
        path: 'reserva',
        component: __WEBPACK_IMPORTED_MODULE_30__reserva_reserva_component__["a" /* ReservaComponent */]
    },
    {
        path: 'configuracion',
        component: __WEBPACK_IMPORTED_MODULE_12__configuracion_configuracion_component__["a" /* ConfiguracionComponent */]
    },
    {
        path: 'info',
        component: __WEBPACK_IMPORTED_MODULE_7__info_info_component__["a" /* InfoComponent */]
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_35_ngx_bootstrap_bs_moment__["a" /* defineLocale */])(__WEBPACK_IMPORTED_MODULE_36_ngx_bootstrap_locale__["a" /* es */].abbr, __WEBPACK_IMPORTED_MODULE_36_ngx_bootstrap_locale__["a" /* es */]);

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_10__nav_nav_component__["a" /* NavComponent */],
            __WEBPACK_IMPORTED_MODULE_11__footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_9__home_carousel_carousel_component__["a" /* CarouselComponent */],
            __WEBPACK_IMPORTED_MODULE_8__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_13__shared__["a" /* SHARED_COMPONENTS */],
            __WEBPACK_IMPORTED_MODULE_30__reserva_reserva_component__["a" /* ReservaComponent */],
            __WEBPACK_IMPORTED_MODULE_32__calendario_calendario_component__["a" /* CalendarioComponent */],
            __WEBPACK_IMPORTED_MODULE_34__barberos_barberos_component__["a" /* BarberosComponent */],
            __WEBPACK_IMPORTED_MODULE_31__reserva_hora_pipe__["a" /* FormatHoraPipe */],
            __WEBPACK_IMPORTED_MODULE_12__configuracion_configuracion_component__["a" /* ConfiguracionComponent */],
            __WEBPACK_IMPORTED_MODULE_7__info_info_component__["a" /* InfoComponent */],
            __WEBPACK_IMPORTED_MODULE_14__calendario_input_calendario_input_component__["a" /* CalendarioInputComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(ROUTES, {
                preloadingStrategy: __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* PreloadAllModules */],
                useHash: true
            }),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_21_ngx_bootstrap_collapse__["a" /* CollapseModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_23_ngx_bootstrap_carousel__["a" /* CarouselModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_26_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_27_ngx_bootstrap_datepicker__["a" /* DatepickerModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_24_ngx_bootstrap_accordion__["a" /* AccordionModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_25_ngx_bootstrap_tabs__["a" /* TabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_28_ngx_bootstrap_buttons__["a" /* ButtonsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_29_ngx_bootstrap_typeahead__["a" /* TypeaheadModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_22_ngx_bootstrap_timepicker__["a" /* TimepickerModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_27_ngx_bootstrap_datepicker__["b" /* BsDatepickerModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_20_ngx_facebook__["a" /* FacebookModule */].forRoot()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */]
        ],
        providers: [
            // { provide: LOCALE_ID, useValue: "es-es" },
            __WEBPACK_IMPORTED_MODULE_37__services_window_service__["a" /* WindowRefService */],
            __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_16__services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_17__services_validator_service__["a" /* ValidatorService */],
            __WEBPACK_IMPORTED_MODULE_18__services_facebook_login_service__["a" /* FacebookLoginService */],
            __WEBPACK_IMPORTED_MODULE_19__services_push_notification_service__["a" /* PushNotificationsService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarberosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BarberosComponent = (function () {
    function BarberosComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.selectBarberDone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]();
        this.selectedBarber = '';
        this.selectedServicio = '';
        this.barberos = [];
    }
    BarberosComponent.prototype.ngOnInit = function () {
    };
    BarberosComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        console.log('changes', changes, changes.barberiaSelected.currentValue);
        if (changes.barberiaSelected.currentValue != 0) {
            console.log('get barberos');
            this.dataService.get('/usuario/?idSucursal=' + changes.barberiaSelected.currentValue)
                .then(function (response) {
                _this.barberos = response.usuario;
                if (_this.barberos.length == 1) {
                    _this.selectedBarber = _this.barberos[0];
                    if (_this.selectedBarber.servicios.length == 1) {
                        _this.selectedServicio = _this.selectedBarber.servicios[0];
                        _this.selectBarberDone.emit({ 'servicio': _this.selectedServicio, 'barber': _this.selectedBarber });
                    }
                }
                if (_this.barberos.length == 0) {
                    _this.selectedBarber = '';
                }
            }, function (error) {
            });
        }
        else {
            this.barberos = [];
            this.selectedBarber = '';
        }
    };
    BarberosComponent.prototype.selectBarber = function (barber) {
        console.log('barber', barber);
        this.selectedBarber = barber;
        if (this.selectedBarber.servicios.length == 1) {
            this.selectedServicio = this.selectedBarber.servicios[0];
            this.selectBarberDone.emit({ 'servicio': this.selectedServicio, 'barber': this.selectedBarber });
        }
    };
    BarberosComponent.prototype.selectServicio = function (servicio) {
        console.log("servicio", servicio);
        this.selectedServicio = servicio;
        this.selectBarberDone.emit({ 'servicio': this.selectedServicio, 'barber': this.selectedBarber });
    };
    BarberosComponent.prototype.confirmar = function () {
        //this.router.navigate(['results']);
    };
    return BarberosComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Object)
], BarberosComponent.prototype, "barberiaSelected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]) === "function" && _a || Object)
], BarberosComponent.prototype, "selectBarberDone", void 0);
BarberosComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-barberos',
        template: __webpack_require__(517),
        styles: [__webpack_require__(421)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */]) === "function" && _c || Object])
], BarberosComponent);

var _a, _b, _c;
//# sourceMappingURL=barberos.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarioInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CalendarioInputComponent = (function () {
    function CalendarioInputComponent() {
        this.minDate = new Date(2017, 5, 10);
        this.maxDate = new Date(2018, 9, 15);
        this.dateSelectedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]();
    }
    Object.defineProperty(CalendarioInputComponent.prototype, "bsValue", {
        get: function () {
            return this._bsValue;
        },
        set: function (v) {
            console.log(v);
            this.dateSelectedChange.emit(this.parseDate(v));
            this._bsValue = v;
        },
        enumerable: true,
        configurable: true
    });
    CalendarioInputComponent.prototype.parseDate = function (date) {
        var displayDate = "--";
        if (date) {
            displayDate = date.getFullYear() + '-' + this.zerofill(date.getMonth(), 1) + '-' + this.zerofill(date.getDate(), 0);
        }
        return displayDate;
    };
    CalendarioInputComponent.prototype.zerofill = function (i, add) {
        i = i + add;
        return ((i < 10 ? '0' : '') + i);
    };
    CalendarioInputComponent.prototype.log = function (v) { console.log(v); };
    return CalendarioInputComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], CalendarioInputComponent.prototype, "dateSelectedChange", void 0);
CalendarioInputComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'calendario-input',
        template: __webpack_require__(518)
    })
], CalendarioInputComponent);

//# sourceMappingURL=calendario-input.component.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_locale_es__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_locale_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment_locale_es__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarioComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CalendarioComponent = (function () {
    function CalendarioComponent() {
        this.dateSelectedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]();
        this.dt = new Date();
        this.minDate = new Date();
        this.formats = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
        this.format = this.formats[0];
        this.dateOptions = {
            formatYear: 'YY',
            startingDay: 1,
            showWeeks: false,
            locale: 'es'
        };
        this.opened = false;
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate());
        (this.dateDisabled = []);
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
        __WEBPACK_IMPORTED_MODULE_1_moment__["locale"]('es');
    }
    CalendarioComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    CalendarioComponent.prototype.today = function () {
        this.dt = new Date();
    };
    CalendarioComponent.prototype.d20090824 = function () {
        this.dt = __WEBPACK_IMPORTED_MODULE_1_moment__('2009-08-24', 'YYYY-MM-DD')
            .toDate();
    };
    CalendarioComponent.prototype.disableTomorrow = function () {
        this.dateDisabled = [{ date: this.tomorrow, mode: 'day' }];
    };
    // todo: implement custom class cases
    CalendarioComponent.prototype.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
            for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
                var event = _a[_i];
                var currentDay = new Date(event.date).setHours(0, 0, 0, 0);
                if (dayToCheck === currentDay) {
                    return event.status;
                }
            }
        }
        return '';
    };
    CalendarioComponent.prototype.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };
    CalendarioComponent.prototype.open = function () {
        this.opened = !this.opened;
    };
    CalendarioComponent.prototype.clear = function () {
        this.dt = void 0;
        this.dateDisabled = undefined;
    };
    CalendarioComponent.prototype.toggleMin = function () {
        this.dt = new Date(this.minDate.valueOf());
    };
    CalendarioComponent.prototype.dateChanged = function (date) {
        this.dateSelectedChange.emit(date);
    };
    CalendarioComponent.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_1_moment__["locale"]('es');
        if (this.dateSelected) {
            this.dt = new Date(this.dateSelected);
        }
    };
    return CalendarioComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Object)
], CalendarioComponent.prototype, "dateSelected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], CalendarioComponent.prototype, "dateSelectedChange", void 0);
CalendarioComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-calendario',
        template: __webpack_require__(519),
        styles: [__webpack_require__(422)]
    }),
    __metadata("design:paramtypes", [])
], CalendarioComponent);

//# sourceMappingURL=calendario.component.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_validator_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_usuario__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_telefono__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_correo__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__ = __webpack_require__(45);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfiguracionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ConfiguracionComponent = (function () {
    function ConfiguracionComponent(modalService, authService, validatorService, dataService) {
        this.modalService = modalService;
        this.authService = authService;
        this.validatorService = validatorService;
        this.dataService = dataService;
        this.nuevaBarberia = {};
        this.accion = '';
        this.opcionesDuracion = [];
        this.nuevoServicio = {};
        this.nuevoBarbero = new __WEBPACK_IMPORTED_MODULE_4__models_usuario__["a" /* Usuario */]();
        this.barberoErrores = [];
        this.barberiaErrores = [];
        this.servicioErrores = [];
        this.provincias = [];
        this.cantones = [];
        this.sucursales = [];
        this.barberos = [];
        this.Object = Object;
        this.errorDisplay = '';
        this.barberoAdmistrador = false;
        this.cargando = false;
    }
    ConfiguracionComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    ConfiguracionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.provincias = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];
        this.dataService.get('/provinciaCanton')
            .then(function (response) {
            console.log('success', response);
            _this.cantones = response.ProvinciaCanton;
            _this.cantonesDisplay = _this.cantones[0].cantones;
            _this.selectedProvincia = '0';
        }, function (error) {
        });
        for (var i = 1; i < 6; i++) {
            this.opcionesDuracion.push(this.authService.loggedUser.tiempoBarbero * i);
        }
        if (this.authService.isAdminUser()) {
            //obtiene sucursales
            this.cargando = true;
            this.dataService.get('/sucursal/?idBarberia=' + this.authService.idBarberia)
                .then(function (response) {
                console.log('success Sucursales', response);
                _this.sucursales = response.sucursal;
                if (_this.sucursales.length > 0) {
                    _this.nuevaBarberia = _this.sucursales[0];
                    _this.selectedBarberiaId = _this.nuevaBarberia.id;
                    _this.dataService.get('/usuario/?idSucursal=' + _this.nuevaBarberia.id)
                        .then(function (response) {
                        console.log('success barberos', response);
                        _this.barberos = response.usuario;
                        _this.nuevoBarbero = Object.assign({}, _this.barberos[0]);
                        _this.selectedBarberoId = _this.nuevoBarbero.id;
                        if (_this.selectedBarberoId != undefined) {
                            _this.barberoAdmistrador = (_this.nuevoBarbero.rol.indexOf('A') != -1);
                        }
                        if (_this.nuevoBarbero.servicios && _this.nuevoBarbero.servicios.length > 0) {
                            _this.nuevoServicio = _this.nuevoBarbero.servicios[0];
                            _this.selectedServicioId = _this.nuevoServicio.id;
                        }
                        _this.cargando = false;
                    }, function (error) {
                    });
                }
            }, function (error) {
            });
        }
        if (this.authService.isAdminSucursalUser()) {
            this.cargando = true;
            this.dataService.get('/sucursal/' + this.authService.loggedUser.idSucursal)
                .then(function (response) {
                console.log('success Sucursales', response);
                _this.sucursales = response;
                if (_this.sucursales.length > 0) {
                    _this.nuevaBarberia = _this.sucursales[0];
                    _this.selectedBarberiaId = _this.nuevaBarberia.id;
                    _this.dataService.get('/usuario/?idSucursal=' + _this.nuevaBarberia.id)
                        .then(function (response) {
                        console.log('success barberos', response);
                        _this.barberos = response.usuario;
                        _this.nuevoBarbero = Object.assign({}, _this.barberos[0]);
                        _this.selectedBarberoId = _this.nuevoBarbero.id;
                        if (_this.selectedBarberoId != undefined) {
                            _this.barberoAdmistrador = (_this.nuevoBarbero.rol.indexOf('A') != -1);
                        }
                        if (_this.nuevoBarbero.servicios && _this.nuevoBarbero.servicios.length > 0) {
                            _this.nuevoServicio = _this.nuevoBarbero.servicios[0];
                            _this.selectedServicioId = _this.nuevoServicio.id;
                        }
                        _this.cargando = false;
                    }, function (error) {
                    });
                }
            }, function (error) {
            });
        }
        if (this.authService.isBarberoUser() && !this.authService.isAdminUser()) {
            //obtener toda la info del barbero
            console.log('here', this.authService.loggedUser.servicios);
            this.nuevoBarbero = Object.assign({}, this.authService.loggedUser);
            this.selectedBarberoId = this.nuevoBarbero.id;
            if (this.nuevoBarbero.servicios && this.nuevoBarbero.servicios.length > 0) {
                this.nuevoServicio = this.nuevoBarbero.servicios[0];
                this.selectedServicioId = this.nuevoServicio.id;
            }
        }
        //else {
        // obtener todos los barberos de la sucursal seleccionada por el admin
        //this.nuevoBarbero = this.barberos[0];
        //this.selectedBarberoId = this.nuevoBarbero.id;
        //}
    };
    ConfiguracionComponent.prototype.addTelefonoBarberia = function () {
        console.log('nuevo', this.nuevoTelefono);
        var nuevoTelefono = '' + this.nuevoTelefono;
        if (nuevoTelefono.length == 8) {
            var tel = new __WEBPACK_IMPORTED_MODULE_5__models_telefono__["a" /* Telefono */]();
            tel.telefono = this.nuevoTelefono + '';
            if (!this.nuevaBarberia.telefono)
                this.nuevaBarberia.telefono = [];
            this.nuevaBarberia.telefono.push(tel);
            this.nuevoTelefono = null;
        }
    };
    ConfiguracionComponent.prototype.removeTelefonoBarberia = function (telefono) {
        console.log('remove', telefono);
        this.nuevaBarberia.telefono = this.nuevaBarberia.telefono.filter(function (el) {
            return el.telefono !== telefono.telefono;
        });
    };
    ConfiguracionComponent.prototype.addCorreoBarberia = function () {
        console.log('nuevo', this.nuevoCorreo);
        if (this.validatorService.emailValid(this.nuevoCorreo)) {
            var cor = new __WEBPACK_IMPORTED_MODULE_6__models_correo__["a" /* Correo */]();
            cor.correo = this.nuevoCorreo + '';
            if (!this.nuevaBarberia.correo)
                this.nuevaBarberia.correo = [];
            this.nuevaBarberia.correo.push(cor);
            this.nuevoCorreo = null;
        }
    };
    ConfiguracionComponent.prototype.removeCorreoBarberia = function (correo) {
        console.log('remove', correo);
        this.nuevaBarberia.correo = this.nuevaBarberia.correo.filter(function (el) {
            return el.correo !== correo.correo;
        });
    };
    ConfiguracionComponent.prototype.addTelefono = function () {
        console.log('nuevo', this.nuevoTelefono);
        var nuevoTelefono = '' + this.nuevoTelefono;
        if (nuevoTelefono.length == 8) {
            var tel = new __WEBPACK_IMPORTED_MODULE_5__models_telefono__["a" /* Telefono */]();
            tel.telefono = this.nuevoTelefono + '';
            if (!this.nuevoBarbero.telefono)
                this.nuevoBarbero.telefono = [];
            this.nuevoBarbero.telefono.push(tel);
            this.nuevoTelefono = null;
        }
    };
    ConfiguracionComponent.prototype.removeTelefono = function (telefono) {
        console.log('remove', telefono);
        this.nuevoBarbero.telefono = this.nuevoBarbero.telefono.filter(function (el) {
            return el.telefono !== telefono.telefono;
        });
    };
    ConfiguracionComponent.prototype.addCorreo = function () {
        console.log('nuevo', this.nuevoCorreo);
        if (this.validatorService.emailValid(this.nuevoCorreo)) {
            var cor = new __WEBPACK_IMPORTED_MODULE_6__models_correo__["a" /* Correo */]();
            cor.correo = this.nuevoCorreo + '';
            if (!this.nuevoBarbero.correo)
                this.nuevoBarbero.correo = [];
            this.nuevoBarbero.correo.push(cor);
            this.nuevoCorreo = null;
        }
    };
    ConfiguracionComponent.prototype.removeCorreo = function (correo) {
        console.log('remove', correo);
        this.nuevoBarbero.correo = this.nuevoBarbero.correo.filter(function (el) {
            return el.correo !== correo.correo;
        });
    };
    ConfiguracionComponent.prototype.provinciaChanged = function (id) {
        this.cantonesDisplay = this.cantones[id].cantones;
        this.nuevaBarberia.idCanton = this.cantonesDisplay[0].id;
        this.selectedProvincia = id;
    };
    ConfiguracionComponent.prototype.changeSucursal = function (sucursal) {
        var _this = this;
        console.log('suc', sucursal);
        this.selectedBarberiaId = sucursal;
        this.nuevaBarberia = Object.assign({}, this.sucursales.find(function (o) { return o.id == sucursal; }));
        this.dataService.get('/usuario/?idSucursal=' + this.nuevaBarberia.id)
            .then(function (response) {
            console.log('success barberos', response);
            _this.barberos = response.usuario;
            if (_this.barberos instanceof Array) {
            }
            else {
                _this.barberos = [_this.barberos];
            }
            _this.nuevoBarbero = Object.assign({}, _this.barberos[0]);
            _this.selectedBarberoId = _this.nuevoBarbero.id;
            if (_this.selectedBarberoId != undefined) {
                _this.barberoAdmistrador = (_this.nuevoBarbero.rol.indexOf('A') != -1);
            }
            if (_this.nuevoBarbero.servicios && _this.nuevoBarbero.servicios.length > 0) {
                _this.nuevoServicio = _this.nuevoBarbero.servicios[0];
                _this.selectedServicioId = _this.nuevoServicio.id;
            }
        }, function (error) {
        });
    };
    ConfiguracionComponent.prototype.changeBarbero = function (barbero) {
        this.selectedBarberoId = barbero;
        this.nuevoBarbero = Object.assign({}, this.barberos.find(function (o) { return o.id == barbero; }));
        this.barberoAdmistrador = (this.nuevoBarbero.rol.indexOf('A') != -1);
        //Obtiene servicios
    };
    ConfiguracionComponent.prototype.changeServicio = function (servicio) {
        this.selectedServicioId = servicio;
        this.nuevoServicio = Object.assign({}, this.nuevoBarbero.servicios.find(function (o) { return o.id == servicio; }));
    };
    ConfiguracionComponent.prototype.actualizaServicioSelected = function () {
        var _this = this;
        this.barberoErrores = [];
        this.barberiaErrores = [];
        this.servicioErrores = [];
        this.nuevoServicio = Object.assign({}, this.nuevoBarbero.servicios.find(function (o) { return o.id == _this.selectedServicioId; }));
    };
    ConfiguracionComponent.prototype.actualizaBarberoSelected = function () {
        var _this = this;
        this.barberoErrores = [];
        this.barberiaErrores = [];
        this.servicioErrores = [];
        this.nuevoBarbero = Object.assign({}, this.barberos.find(function (o) { return o.id == _this.selectedBarberoId; }));
    };
    ConfiguracionComponent.prototype.actualizaSucursalSelected = function () {
        var _this = this;
        this.barberoErrores = [];
        this.barberiaErrores = [];
        this.servicioErrores = [];
        this.nuevaBarberia = Object.assign({}, this.sucursales.find(function (o) { return o.id == _this.selectedBarberiaId; }));
    };
    ConfiguracionComponent.prototype.AgregarBarberia = function () {
        var _this = this;
        this.barberiaErrores = this.validatorService.validaBarberia(this.nuevaBarberia);
        console.log('this.barberiaErrores', this.barberiaErrores);
        if (this.barberiaErrores.length == 0) {
            //this.authService.nuevoUsuario(this.usuario);
            console.log('agregar Barberia', this.nuevaBarberia);
            this.nuevaBarberia.estado = 1;
            this.nuevaBarberia.idBarberia = this.authService.idBarberia;
            this.cargando = true;
            this.dataService.post('/sucursal/', { "sucursal": this.nuevaBarberia })
                .then(function (response) {
                var url = '/sucursal/?idBarberia=' + _this.authService.idBarberia;
                if (_this.authService.isAdminSucursalUser()) {
                    url = '/sucursal/' + _this.authService.loggedUser.idSucursal;
                }
                _this.dataService.get(url)
                    .then(function (response) {
                    console.log('success Sucursales', response);
                    _this.sucursales = response.sucursal;
                    _this.nuevaBarberia = _this.sucursales[0];
                    _this.selectedBarberiaId = _this.nuevaBarberia.id;
                    _this.dataService.get('/usuario/?idSucursal=' + _this.nuevaBarberia.id)
                        .then(function (response) {
                        console.log('success barberos', response);
                        _this.barberos = response.usuario;
                        _this.nuevoBarbero = Object.assign({}, _this.barberos[0]);
                        _this.selectedBarberoId = _this.nuevoBarbero.id;
                        _this.barberoAdmistrador = (_this.nuevoBarbero.rol.indexOf('A') != -1);
                        if (_this.nuevoBarbero.servicios && _this.nuevoBarbero.servicios.length > 0) {
                            _this.nuevoServicio = _this.nuevoBarbero.servicios[0];
                            _this.selectedServicioId = _this.nuevoServicio.id;
                        }
                        _this.cargando = false;
                        _this.errorDisplay = '';
                        alert('Sucursal agregada');
                        _this.modalRef.hide();
                    }, function (error) {
                        _this.cargando = false;
                    });
                }, function (error) {
                    _this.cargando = false;
                });
            }, function (error) {
                _this.cargando = false;
            });
        }
    };
    ConfiguracionComponent.prototype.ModificarBarberia = function () {
        var _this = this;
        this.barberiaErrores = this.validatorService.validaBarberia(this.nuevaBarberia);
        if (this.barberiaErrores.length == 0) {
            console.log('modificar Barberia', this.nuevaBarberia);
            this.cargando = true;
            this.dataService.post('/sucursal/?method=PUT', { "sucursal": this.nuevaBarberia })
                .then(function (response) {
                var url = '/sucursal/?idBarberia=' + _this.authService.idBarberia;
                if (_this.authService.isAdminSucursalUser()) {
                    url = '/sucursal/' + _this.authService.loggedUser.idSucursal;
                }
                _this.dataService.get(url)
                    .then(function (response) {
                    console.log('success Sucursales', response);
                    _this.sucursales = response;
                    if (!_this.authService.isAdminSucursalUser()) {
                        _this.sucursales = response.sucursal;
                    }
                    _this.nuevaBarberia = _this.sucursales[0];
                    _this.selectedBarberiaId = _this.nuevaBarberia.id;
                    _this.dataService.get('/usuario/?idSucursal=' + _this.nuevaBarberia.id)
                        .then(function (response) {
                        console.log('success barberos', response);
                        _this.barberos = response.usuario;
                        _this.nuevoBarbero = Object.assign({}, _this.barberos[0]);
                        _this.selectedBarberoId = _this.nuevoBarbero.id;
                        _this.barberoAdmistrador = (_this.nuevoBarbero.rol.indexOf('A') != -1);
                        if (_this.nuevoBarbero.servicios && _this.nuevoBarbero.servicios.length > 0) {
                            _this.nuevoServicio = _this.nuevoBarbero.servicios[0];
                            _this.selectedServicioId = _this.nuevoServicio.id;
                        }
                        alert('Sucursal Modificada');
                        _this.cargando = false;
                        _this.modalRef.hide();
                    }, function (error) {
                        _this.cargando = false;
                    });
                }, function (error) {
                    _this.cargando = false;
                });
            }, function (error) {
                _this.cargando = false;
                console.log('error', error);
            });
        }
    };
    ConfiguracionComponent.prototype.EliminarBarberia = function () {
        var _this = this;
        console.log('eliminar Barberia', this.nuevaBarberia);
        this.dataService.delete('/sucursal/' + this.nuevaBarberia.id)
            .then(function (response) {
            console.log('eliminado', response);
        }, function (error) {
            console.log('here');
            var url = '/sucursal/?idBarberia=' + _this.authService.idBarberia;
            if (_this.authService.isAdminSucursalUser()) {
                url = '/sucursal/' + _this.authService.loggedUser.idSucursal;
            }
            _this.dataService.get(url)
                .then(function (response) {
                console.log('success Sucursales', response);
                _this.sucursales = response.sucursal;
                _this.nuevaBarberia = _this.sucursales[0];
                _this.selectedBarberiaId = _this.nuevaBarberia.id;
                _this.dataService.get('/usuario/?idSucursal=' + _this.nuevaBarberia.id)
                    .then(function (response) {
                    console.log('success barberos', response);
                    _this.barberos = response.usuario;
                    _this.nuevoBarbero = Object.assign({}, _this.barberos[0]);
                    _this.selectedBarberoId = _this.nuevoBarbero.id;
                    _this.barberoAdmistrador = (_this.nuevoBarbero.rol.indexOf('A') != -1);
                    if (_this.nuevoBarbero.servicios && _this.nuevoBarbero.servicios.length > 0) {
                        _this.nuevoServicio = _this.nuevoBarbero.servicios[0];
                        _this.selectedServicioId = _this.nuevoServicio.id;
                    }
                    _this.modalRef.hide();
                }, function (error) {
                });
            }, function (error) {
            });
        });
    };
    ConfiguracionComponent.prototype.AgregarServicio = function () {
        var _this = this;
        this.servicioErrores = this.validatorService.validaServicio(this.nuevoServicio);
        if (this.servicioErrores.length == 0) {
            //this.authService.nuevoUsuario(this.usuario);
            this.nuevoServicio.idUsuario = this.selectedBarberoId;
            this.nuevoServicio.estado = 1;
            this.cargando = true;
            this.dataService.post('/servicio/', { "servicio": this.nuevoServicio })
                .then(function (response) {
                console.log('agregado', response);
                _this.nuevoBarbero.servicios.push(response.servicio);
                _this.modalRef.hide();
                _this.nuevoServicio = _this.nuevoBarbero.servicios[0];
                _this.selectedServicioId = _this.nuevoServicio.id;
                _this.cargando = false;
                alert('Servicio agregado');
            }, function (error) {
                _this.cargando = false;
                console.log('error', error);
            });
            console.log('agregar servicio', this.nuevoServicio);
        }
    };
    ConfiguracionComponent.prototype.ModificarServicio = function () {
        var _this = this;
        this.servicioErrores = this.validatorService.validaServicio(this.nuevoServicio);
        if (this.servicioErrores.length == 0) {
            this.cargando = true;
            this.dataService.post('/servicio/?method=put', { "servicio": this.nuevoServicio })
                .then(function (response) {
                console.log('modificado', response);
                //this.nuevoBarbero.servicios.push(response.servicio);
                _this.nuevoBarbero.servicios = _this.nuevoBarbero.servicios.filter(function (el) { return (el.id != _this.nuevoServicio.id); });
                _this.nuevoBarbero.servicios.push(response.servicio);
                _this.modalRef.hide();
                _this.cargando = false;
                alert('Servicio Modificado');
            }, function (error) {
                _this.cargando = false;
                console.log('error', error);
            });
            console.log('modificar servicio', this.nuevoServicio);
        }
    };
    ConfiguracionComponent.prototype.EliminarServicio = function () {
        var _this = this;
        console.log('eliminar Servicio', this.nuevoServicio);
        this.dataService.delete('/servicio/' + this.nuevoServicio.id)
            .then(function (response) {
            console.log('eliminado', response);
        }, function (error) {
            console.log('here');
            _this.nuevoBarbero.servicios = _this.nuevoBarbero.servicios.filter(function (el) { return (el.id != _this.nuevoServicio.id); });
            _this.modalRef.hide();
        });
    };
    ConfiguracionComponent.prototype.AgregarBarbero = function () {
        var _this = this;
        this.nuevoBarbero.rol = 'B';
        if (this.barberoAdmistrador) {
            this.nuevoBarbero.rol += 'A';
        }
        this.nuevoBarbero.contrasenna = 'temporal';
        this.nuevoBarbero.tipo = 'N';
        this.nuevoBarbero.estado = 1;
        this.nuevoBarbero.idSucursal = this.selectedBarberiaId;
        this.barberoErrores = this.validatorService.validaBarbero(this.nuevoBarbero);
        console.log(this.barberoErrores);
        if (this.barberoErrores.length == 0) {
            //this.authService.nuevoUsuario(this.usuario);
            this.cargando = true;
            this.dataService.post('/usuario/', { "usuario": this.nuevoBarbero })
                .then(function (response) {
                if (response.error) {
                    _this.errorDisplay = 'Por favor seleccione otro usuario.';
                    _this.cargando = false;
                }
                else {
                    console.log('modificado', response);
                    //this.barberos.push(response.usuario);
                    _this.agregaHorario(response.usuario.id);
                    // this.modalRef.hide();
                    // alert('Barbero agregado');
                }
            }, function (error) {
                _this.cargando = false;
                console.log('error', error);
            });
            console.log('agregar Barbero', this.nuevoBarbero);
        }
    };
    ConfiguracionComponent.prototype.agregaHorario = function (idUsuario) {
        var daysMap = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];
        var dayInUse = 0;
        var that = this;
        var agregar = function (dia) {
            var horario = {
                idUsuario: idUsuario,
                dia: dia,
                horaInicial: "09:00:00",
                horaFinal: "20:00:00",
                estado: 1
            };
            that.dataService.post('/horarioBarbero/', { "horarioBarbero": horario })
                .then(function (response) {
                console.log('agregado', response);
                // that.authService.loggedUser.horarios.push(response.usuario);
                dayInUse = dayInUse + 1;
                if (dayInUse <= 6) {
                    agregar(daysMap[dayInUse]);
                }
                else {
                    that.dataService.get('/usuario/?idSucursal=' + that.nuevaBarberia.id)
                        .then(function (response) {
                        console.log('success barberos', response);
                        that.barberos = response.usuario;
                        that.nuevoBarbero = Object.assign({}, that.barberos[0]);
                        that.selectedBarberoId = that.nuevoBarbero.id;
                        that.barberoAdmistrador = (that.nuevoBarbero.rol.indexOf('A') != -1);
                        if (that.nuevoBarbero.servicios && that.nuevoBarbero.servicios.length > 0) {
                            that.nuevoServicio = that.nuevoBarbero.servicios[0];
                            that.selectedServicioId = that.nuevoServicio.id;
                        }
                        that.modalRef.hide();
                        that.cargando = false;
                        alert('Barbero agregado');
                    }, function (error) {
                    });
                }
            }, function (error) {
                console.log('error', error);
            });
        };
        agregar(daysMap[dayInUse]);
    };
    ConfiguracionComponent.prototype.ModificarBarbero = function () {
        var _this = this;
        this.barberoErrores = this.validatorService.validaBarbero(this.nuevoBarbero);
        if (this.barberoErrores.length == 0) {
            //this.authService.nuevoUsuario(this.usuario);
            console.log('modificar Barbero', this.nuevoBarbero);
            this.cargando = true;
            this.dataService.post('/usuario/?method=PUT', { "usuario": this.nuevoBarbero })
                .then(function (response) {
                _this.dataService.get('/usuario/?idSucursal=' + _this.nuevaBarberia.id)
                    .then(function (response) {
                    console.log('success barberos', response);
                    _this.barberos = response.usuario;
                    _this.nuevoBarbero = Object.assign({}, _this.barberos[0]);
                    _this.selectedBarberoId = _this.nuevoBarbero.id;
                    _this.barberoAdmistrador = (_this.nuevoBarbero.rol.indexOf('A') != -1);
                    if (_this.nuevoBarbero.servicios && _this.nuevoBarbero.servicios.length > 0) {
                        _this.nuevoServicio = _this.nuevoBarbero.servicios[0];
                        _this.selectedServicioId = _this.nuevoServicio.id;
                    }
                    alert('Barbero Modificado');
                    _this.cargando = false;
                    _this.modalRef.hide();
                }, function (error) {
                    _this.cargando = false;
                });
            }, function (error) {
                _this.cargando = false;
                console.log('error', error);
            });
        }
    };
    ConfiguracionComponent.prototype.EliminarBarbero = function () {
        var _this = this;
        console.log('eliminar Barbero', this.nuevoBarbero);
        this.dataService.delete('/usuario/' + this.nuevoBarbero.id)
            .then(function (response) {
            console.log('eliminado', response);
        }, function (error) {
            _this.dataService.get('/usuario/?idSucursal=' + _this.nuevaBarberia.id)
                .then(function (response) {
                _this.modalRef.hide();
                console.log('success barberos', response);
                _this.barberos = response.usuario;
                if (_this.barberos instanceof Array) {
                }
                else {
                    _this.barberos = [_this.barberos];
                }
                _this.nuevoBarbero = Object.assign({}, _this.barberos[0]);
                _this.selectedBarberoId = _this.nuevoBarbero.id;
                _this.barberoAdmistrador = (_this.nuevoBarbero.rol.indexOf('A') != -1);
                if (_this.nuevoBarbero.servicios && _this.nuevoBarbero.servicios.length > 0) {
                    _this.nuevoServicio = _this.nuevoBarbero.servicios[0];
                    _this.selectedServicioId = _this.nuevoServicio.id;
                }
            }, function (error) {
            });
        });
    };
    ConfiguracionComponent.prototype.impersonar = function () {
        this.authService.impersonar(this.nuevoBarbero);
    };
    return ConfiguracionComponent;
}());
ConfiguracionComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-configuracion',
        template: __webpack_require__(520),
        styles: [__webpack_require__(423)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_validator_service__["a" /* ValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_validator_service__["a" /* ValidatorService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_data_service__["a" /* DataService */]) === "function" && _d || Object])
], ConfiguracionComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=configuracion.component.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-footer',
        template: __webpack_require__(521),
        styles: [__webpack_require__(424)]
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarouselComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CarouselComponent = (function () {
    function CarouselComponent(authService) {
        this.authService = authService;
        this.myInterval = 4000;
    }
    return CarouselComponent;
}());
CarouselComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'carousel-custom',
        template: __webpack_require__(522),
        styles: [__webpack_require__(425)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], CarouselComponent);

var _a;
//# sourceMappingURL=carousel.component.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(authService) {
        this.authService = authService;
    }
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__(523),
        styles: [__webpack_require__(426)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_window_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_validator_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_telefono__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_correo__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var InfoComponent = (function () {
    function InfoComponent(fb, modalService, authService, validatorService, dataService, windowRef) {
        this.fb = fb;
        this.modalService = modalService;
        this.authService = authService;
        this.validatorService = validatorService;
        this.dataService = dataService;
        this.windowRef = windowRef;
        this.selectedDate = new Date();
        this.agregaPausa = true;
        this.pausaErrores = [];
        this.usuarioErrores = [];
        this.Object = Object;
        this.displayCitas = false;
        this.displayPausas = false;
        this.displayContacto = false;
        this.displayHorario = false;
        this.displayResumen = false;
        this.horarios = [];
        this.selectedHorarioLunes = {};
        this.selectedHorarioMartes = {};
        this.selectedHorarioMiercoles = {};
        this.selectedHorarioJueves = {};
        this.selectedHorarioViernes = {};
        this.selectedHorarioSabado = {};
        this.selectedHorarioDomingo = {};
        this.reservas = [];
        this.filteredReservas = [];
        this.correosUsuarioDisplay = [];
        this.telefonosUsuarioDisplay = [];
        this.correosBarberoDisplay = [];
        this.telefonosBarberoDisplay = [];
        this.pausas = [];
        this.opcionesDuracion = [];
        this.tiempos = [];
        this.selectedCita = this.reservas[0];
        this.selectedPausa = {};
        this.validationError = false;
        this.validationErrorMsg = '';
        this.cargando = false;
        this.resumenFechaFinal = '';
        this.resumenFechaInicial = '';
        this.reservasResumen = [];
        this.resumenGenerado = false;
        this.cantidadCitas = 0;
        this.ganancias = 0;
        this.nuevoUsuario = Object.assign({}, this.authService.loggedUser);
        var initParams = {
            appId: '1466897480062572',
            xfbml: true,
            version: 'v2.10',
            status: true
        };
        this._window = this.windowRef.nativeWindow;
        if (!this.authService.isApp) {
            this.fb.init(initParams);
        }
    }
    InfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (window.screen.width > 900) {
            this.displayCitas = true;
            this.displayPausas = true;
            this.displayContacto = true;
            this.displayHorario = true;
            this.displayResumen = true;
        }
        if (this.authService.isBarberoUser()) {
            for (var i = 1; i < 9; i++) {
                this.opcionesDuracion.push(this.authService.loggedUser.tiempoBarbero * i);
            }
            var horaInicio = 700;
            var horaFinal = 2300;
            var hora = horaInicio;
            while (hora <= horaFinal) {
                this.tiempos.push(hora);
                var estimado = hora + 60;
                if (estimado % 100 == 0) {
                    hora = hora + 60;
                }
                else {
                    hora = hora + 20;
                }
            }
            this.horarios = this.authService.loggedUser.horarios;
            console.log(this.horarios.find(function (o) { return o.dia == 'LU'; }));
            this.selectedHorarioLunes = this.updateHora(this.horarios.find(function (o) { return o.dia == 'LU'; }));
            this.selectedHorarioMartes = this.updateHora(this.horarios.find(function (o) { return o.dia == 'MA'; }));
            this.selectedHorarioMiercoles = this.updateHora(this.horarios.find(function (o) { return o.dia == 'MI'; }));
            this.selectedHorarioJueves = this.updateHora(this.horarios.find(function (o) { return o.dia == 'JU'; }));
            this.selectedHorarioViernes = this.updateHora(this.horarios.find(function (o) { return o.dia == 'VI'; }));
            this.selectedHorarioSabado = this.updateHora(this.horarios.find(function (o) { return o.dia == 'SA'; }));
            this.selectedHorarioDomingo = this.updateHora(this.horarios.find(function (o) { return o.dia == 'DO'; }));
            this.dataService.get('/pausaHorarioBarbero/?idUsuario=' + this.authService.loggedUser.id)
                .then(function (response) {
                _this.pausas = _this.updateTimeToHora(response.pausaHorarioBarbero);
            }, function (error) {
            });
            this.dataService.get('/reserva/?idUsuarioBarbero=' + this.authService.loggedUser.id + '&fecha=' + this.selectedDate.getFullYear() + '-' + this.zerofill(this.selectedDate.getMonth(), 1) + '-' + this.zerofill(this.selectedDate.getDate(), 0))
                .then(function (response) {
                _this.reservas = _this.updateTimeToHora(response.reserva);
            }, function (error) {
            });
        }
        if (!this.authService.isBarberoUser() && !this.authService.isAdminUser()) {
            this.dataService.get('/reserva/?idUsuarioReserva=' + this.authService.loggedUser.id)
                .then(function (response) {
                _this.reservas = _this.updateTimeToHora(response.reserva);
            }, function (error) {
            });
        }
    };
    InfoComponent.prototype.zerofill = function (i, add) {
        i = i + add;
        return ((i < 10 ? '0' : '') + i);
    };
    InfoComponent.prototype.updateHora = function (horario) {
        if (typeof (horario.horaInicial) == 'string') {
            horario.horaInicial = Number(horario.horaInicial.substring(0, 2) + horario.horaInicial.substring(3, 5));
            horario.horaFinal = Number(horario.horaFinal.substring(0, 2) + horario.horaFinal.substring(3, 5));
        }
        return horario;
    };
    InfoComponent.prototype.updateTimeToHora = function (pausas) {
        for (var i = pausas.length - 1; i >= 0; i--) {
            pausas[i].horaInicial = Number(pausas[i].horaInicial.substring(0, 2) + pausas[i].horaInicial.substring(3, 5));
        }
        return pausas;
    };
    InfoComponent.prototype.changeDate = function (option) {
        var _this = this;
        if (option === "more") {
            var newDate = new Date(this.selectedDate.getTime());
            newDate.setDate(newDate.getDate() + 1);
            this.selectedDate = newDate;
        }
        else {
            var newDate = new Date(this.selectedDate.getTime());
            newDate.setDate(newDate.getDate() - 1);
            this.selectedDate = newDate;
        }
        var param = this.authService.isRegularUser() ? 'idUsuarioReserva' : 'idUsuarioBarbero';
        this.dataService.get('/reserva/?' + param + '=' + this.authService.loggedUser.id + '&fecha=' + this.selectedDate.getFullYear() + '-' + this.zerofill(this.selectedDate.getMonth(), 1) + '-' + this.zerofill(this.selectedDate.getDate(), 0))
            .then(function (response) {
            _this.reservas = _this.updateTimeToHora(response.reserva);
        }, function (error) {
        });
    };
    InfoComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    InfoComponent.prototype.update = function () {
        this.usuarioErrores = this.validatorService.validaUsuario(this.nuevoUsuario);
        if (this.usuarioErrores.length == 0) {
            var that = this;
            this.cargando = true;
            this.updateUser();
        }
    };
    InfoComponent.prototype.updateUser = function () {
        var _this = this;
        this.dataService.post('/usuario/?method=put', { "usuario": this.nuevoUsuario })
            .then(function (response) {
            alert('Información actualizada');
            _this.cargando = false;
            _this.authService.loggedUser = response.usuario;
        }, function (error) {
            _this.cargando = false;
        });
    };
    InfoComponent.prototype.updateFacebook = function () {
        this.cargando = true;
        this.fbLoginVincular();
    };
    InfoComponent.prototype.getFbUserVincular = function () {
        var _this = this;
        this._window.facebookConnectPlugin.api(this.authService.fbUserIdApp + "/?fields=email,first_name,last_name,picture", ["user_birthday"], function (res) {
            console.log('Got the users profile', res);
            _this.authService.profilePic = res.picture.data.url;
            _this.nuevoUsuario.usuario = res.id;
            _this.nuevoUsuario.nombre = res.first_name;
            _this.nuevoUsuario.apellido1 = res.last_name.split(' ')[0];
            if (res.last_name.split(' ').length > 1) {
                _this.nuevoUsuario.apellido2 = res.last_name.split(' ')[1];
            }
            _this.nuevoUsuario.contrasenna = 'facebook';
            _this.nuevoUsuario.tipo = 'F';
            _this.updateUser();
        }, function (error) {
            console.log('error get user info ' + JSON.stringify(error));
            _this.cargando = false;
        });
    };
    InfoComponent.prototype.fbLoginVincular = function () {
        var _this = this;
        if (this.authService.isApp) {
            this._window.facebookConnectPlugin.login(['email', 'public_profile'], function (response) {
                _this.authService.fbUserIdApp = response.authResponse.userID;
                _this.getFbUserVincular();
            }, function (error) {
                console.log('error get user info ' + JSON.stringify(error));
                _this.cargando = false;
            });
        }
        else {
            this.fb.login({ scope: 'email,public_profile' })
                .then(function (response) {
                console.log(response);
                _this.fb.api('/me?fields=email,first_name,last_name,picture')
                    .then(function (res) {
                    console.log('Got the users profile', res);
                    _this.authService.profilePic = res.picture.data.url;
                    _this.nuevoUsuario.usuario = res.id;
                    _this.nuevoUsuario.nombre = res.first_name;
                    _this.nuevoUsuario.apellido1 = res.last_name.split(' ')[0];
                    if (res.last_name.split(' ').length > 1) {
                        _this.nuevoUsuario.apellido2 = res.last_name.split(' ')[1];
                    }
                    _this.nuevoUsuario.contrasenna = 'facebook';
                    _this.nuevoUsuario.tipo = 'F';
                    _this.updateUser();
                })
                    .catch(function (error) { return console.error(error); });
            })
                .catch(function (error) { return console.error(error); });
        }
    };
    InfoComponent.prototype.mayorQueHoy = function (date) {
        var dateCita = new Date(date);
        var hoy = new Date();
        return (dateCita > hoy);
    };
    InfoComponent.prototype.eliminarCita = function () {
        var _this = this;
        this.dataService.delete('/reserva/' + this.selectedCita.id)
            .then(function (response) {
        }, function (error) {
            _this.reservas = _this.reservas.filter(function (el) { return (el.id != _this.selectedCita.id); });
            _this.modalRef.hide();
        });
    };
    InfoComponent.prototype.eliminarPausa = function () {
        var _this = this;
        this.dataService.delete('/pausaHorarioBarbero/' + this.selectedPausa.id)
            .then(function (response) {
        }, function (error) {
            _this.pausas = _this.pausas.filter(function (el) { return (el.id != _this.selectedPausa.id); });
            _this.modalRef.hide();
        });
    };
    InfoComponent.prototype.dateSelectedChange = function (event) {
        this.selectedPausa.fecha = event.getMonth() + '/' + event.getDate() + '/' + event.getFullYear();
    };
    InfoComponent.prototype.contains = function (text) {
        if (this.selectedPausa.dia) {
            return (this.selectedPausa.dia.indexOf(text) != -1);
        }
        return false;
    };
    InfoComponent.prototype.toogleRe = function (text) {
        var daysMap = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];
        if (this.selectedPausa.dia.indexOf(text) == -1) {
            this.selectedPausa.dia = this.selectedPausa.dia + ' ' + text;
            var optionalArray = this.selectedPausa.dia.split(' ');
            optionalArray.shift();
            var other = daysMap.filter(function (el) { return (optionalArray.indexOf(el) > -1); });
            this.selectedPausa.dia = ' ' + other.toString().split(',').join(' ');
        }
        else {
            this.selectedPausa.dia = this.selectedPausa.dia.replace(' ' + text, "");
            this.selectedPausa.dia = this.selectedPausa.dia.replace(text, "");
        }
    };
    InfoComponent.prototype.convierteTiempo = function (hora) {
        hora = hora + '';
        if (hora.length == 3) {
            hora = '0' + hora;
        }
        var nuevaHora = '';
        if (Number(hora.substring(0, 2)) > 12) {
            var primeros = (Number(hora.substring(0, 2)) - 12) + '';
            if (primeros.length == 1) {
                primeros = '0' + primeros;
            }
            nuevaHora = primeros + ":" + hora.substring(2, 4) + ' pm';
        }
        else {
            nuevaHora = hora.substring(0, 2) + ":" + hora.substring(2, 4) + ' am';
        }
        return nuevaHora;
    };
    InfoComponent.prototype.modificarPausa = function () {
        var _this = this;
        this.pausaErrores = this.validatorService.validaPausa(this.selectedPausa);
        if (this.pausaErrores.length == 0) {
            var pausa = Object.assign({}, this.selectedPausa);
            pausa.horaInicial = this.modificaHoraToTimeUno(pausa.horaInicial);
            this.dataService.post('/pausaHorarioBarbero/?method=put', { "pausaHorarioBarbero": pausa })
                .then(function (response) {
                alert('Pausa Modificada');
                // this.pausas.push(response.pausaHorarioBarbero);
                _this.dataService.get('/pausaHorarioBarbero/?idUsuario=' + _this.authService.loggedUser.id)
                    .then(function (response) {
                    _this.pausas = _this.updateTimeToHora(response.pausaHorarioBarbero);
                }, function (error) {
                });
            }, function (error) {
            });
            this.modalRef.hide();
        }
    };
    InfoComponent.prototype.agregarNuevaPausa = function () {
        var _this = this;
        this.pausaErrores = this.validatorService.validaPausa(this.selectedPausa);
        if (this.pausaErrores.length == 0) {
            //this.authService.nuevoUsuario(this.usuario);
            this.selectedPausa.estado = 1;
            this.selectedPausa.idUsuario = this.authService.loggedUser.id;
            var pausa = Object.assign({}, this.selectedPausa);
            pausa.horaInicial = this.modificaHoraToTimeUno(pausa.horaInicial);
            this.dataService.post('/pausaHorarioBarbero/', { "pausaHorarioBarbero": pausa })
                .then(function (response) {
                _this.dataService.get('/pausaHorarioBarbero/?idUsuario=' + _this.authService.loggedUser.id)
                    .then(function (response) {
                    alert('Pausa Agregada');
                    _this.pausas = _this.updateTimeToHora(response.pausaHorarioBarbero);
                }, function (error) {
                });
            }, function (error) {
            });
            this.modalRef.hide();
        }
    };
    InfoComponent.prototype.obtieneInfo = function (cita) {
        var _this = this;
        this.correosBarberoDisplay = [];
        this.telefonosBarberoDisplay = [];
        this.correosUsuarioDisplay = [];
        this.telefonosUsuarioDisplay = [];
        this.dataService.get('/usuario/' + cita.idUsuarioBarbero)
            .then(function (response) {
            _this.telefonosBarberoDisplay = response.usuario.telefono;
            _this.correosBarberoDisplay = response.usuario.correo;
        }, function (error) {
        });
        this.dataService.get('/usuario/' + cita.idUsuarioReserva)
            .then(function (response) {
            _this.telefonosUsuarioDisplay = response.usuario.telefono;
            _this.correosUsuarioDisplay = response.usuario.correo;
        }, function (error) {
        });
    };
    InfoComponent.prototype.modificaHoraToTimeUno = function (hora) {
        hora = hora + '';
        if (hora.length == 3) {
            hora = "0" + hora;
        }
        return hora.substring(0, 2) + ":" + hora.substring(2, 4) + ':00';
    };
    InfoComponent.prototype.modificaHoraToTime = function (horario) {
        horario.horaInicial = horario.horaInicial + '';
        horario.horaFinal = horario.horaFinal + '';
        if (horario.horaInicial.length == 3) {
            horario.horaInicial = "0" + horario.horaInicial;
        }
        horario.horaInicial = horario.horaInicial.substring(0, 2) + ":" + horario.horaInicial.substring(2, 4) + ":00";
        if (horario.horaFinal.length == 3) {
            horario.horaFinal = "0" + horario.horaFinal;
        }
        horario.horaFinal = horario.horaFinal.substring(0, 2) + ":" + horario.horaFinal.substring(2, 4) + ":00";
        return horario;
    };
    InfoComponent.prototype.addTelefono = function () {
        this.validationError = false;
        var nuevoTelefono = '' + this.nuevoTelefono;
        if (nuevoTelefono.length == 8) {
            var tel = new __WEBPACK_IMPORTED_MODULE_6__models_telefono__["a" /* Telefono */]();
            tel.telefono = this.nuevoTelefono + '';
            tel.idUsuario = this.authService.loggedUser.id;
            var that = this;
            this.dataService.post('/usuarioTelefono/', { "telefono": tel })
                .then(function (response) {
                that.authService.loggedUser.telefono.push(tel);
                that.nuevoUsuario = that.authService.loggedUser;
                that.authService.updateStoredUser();
                that.nuevoTelefono = null;
            }, function (error) {
            });
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del telefono";
        }
    };
    InfoComponent.prototype.removeTelefono = function (telefono) {
        var that = this;
        this.dataService.delete('/usuarioTelefono/' + telefono.id)
            .then(function (response) {
        }, function (error) {
        });
        that.authService.loggedUser.telefono = that.authService.loggedUser.telefono.filter(function (el) {
            return el.telefono != telefono.telefono;
        });
        that.nuevoUsuario.telefono = that.nuevoUsuario.telefono.filter(function (el) {
            return el.telefono != telefono.telefono;
        });
        that.authService.updateStoredUser();
    };
    InfoComponent.prototype.addCorreo = function () {
        this.validationError = false;
        if (this.validatorService.emailValid(this.nuevoCorreo)) {
            var cor = new __WEBPACK_IMPORTED_MODULE_7__models_correo__["a" /* Correo */]();
            cor.correo = this.nuevoCorreo + '';
            cor.idUsuario = this.authService.loggedUser.id;
            var that = this;
            this.dataService.post('/usuarioCorreo/', { "correo": cor })
                .then(function (response) {
                that.authService.loggedUser.correo.push(cor);
                that.nuevoUsuario = that.authService.loggedUser;
                that.authService.updateStoredUser();
                that.nuevoCorreo = null;
            }, function (error) {
            });
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del correo";
        }
    };
    InfoComponent.prototype.removeCorreo = function (correo) {
        var that = this;
        this.dataService.delete('/usuarioCorreo/' + correo.idCorreo)
            .then(function (response) {
        }, function (error) {
        });
        that.nuevoUsuario.correo = that.nuevoUsuario.correo.filter(function (el) {
            return el.correo !== correo.correo;
        });
    };
    InfoComponent.prototype.updateHorarios = function () {
        this.agregaHorario();
    };
    InfoComponent.prototype.agregaHorario = function () {
        var daysMap = [this.selectedHorarioLunes, this.selectedHorarioMartes, this.selectedHorarioMiercoles,
            this.selectedHorarioJueves, this.selectedHorarioViernes, this.selectedHorarioSabado, this.selectedHorarioDomingo];
        var dayInUse = 0;
        var that = this;
        var agregar = function (dia) {
            that.cargando = true;
            that.dataService.post('/horarioBarbero/?method=put', { "horarioBarbero": that.modificaHoraToTime(Object.assign({}, dia)) })
                .then(function (response) {
                that.authService.loggedUser.horarios.push(response.usuario);
                dayInUse = dayInUse + 1;
                if (dayInUse <= 6) {
                    agregar(daysMap[dayInUse]);
                }
                else {
                    that.cargando = false;
                }
            }, function (error) {
            });
        };
        agregar(daysMap[dayInUse]);
    };
    InfoComponent.prototype.fechaInicialChanges = function (event) {
        if (event != "--") {
            this.resumenFechaInicial = event;
        }
    };
    InfoComponent.prototype.fechaFinalChanges = function (event) {
        if (event != "--") {
            this.resumenFechaFinal = event;
        }
    };
    InfoComponent.prototype.generar = function () {
        var _this = this;
        var resIni = new Date(this.resumenFechaInicial);
        resIni.setDate(resIni.getDate() + 1);
        var resFin = new Date(this.resumenFechaFinal);
        resFin.setDate(resFin.getDate() + 1);
        if (resIni.getTime() > resFin.getTime()) {
            alert('La fecha inicial debe de ser menor a la fecha final');
        }
        if (resIni.getTime() <= resFin.getTime() && this.resumenFechaInicial && this.resumenFechaFinal) {
            this.resumenGenerado = false;
            this.cargando = true;
            this.ganancias = 0;
            this.dataService.get('/reserva/?idUsuarioBarbero=' + this.authService.loggedUser.id + '&fechaInicial=' + this.resumenFechaInicial + '&fechaFinal=' + this.resumenFechaFinal)
                .then(function (response) {
                _this.reservasResumen = response.reserva;
                _this.cantidadCitas = _this.reservasResumen.length;
                for (var i = _this.reservasResumen.length - 1; i >= 0; i--) {
                    _this.ganancias += Number(_this.reservasResumen[i].precio);
                }
                _this.resumenGenerado = true;
                _this.cargando = false;
            }, function (error) {
            });
        }
    };
    return InfoComponent;
}());
InfoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'user-info',
        template: __webpack_require__(524),
        styles: [__webpack_require__(427)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__["b" /* FacebookService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__["b" /* FacebookService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_validator_service__["a" /* ValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_validator_service__["a" /* ValidatorService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_window_service__["a" /* WindowRefService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_window_service__["a" /* WindowRefService */]) === "function" && _f || Object])
], InfoComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=info.component.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_validator_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_usuario__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_telefono__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_correo__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = (function () {
    function LoginComponent(authService, validatorService) {
        var _this = this;
        this.authService = authService;
        this.validatorService = validatorService;
        this.usuario = new __WEBPACK_IMPORTED_MODULE_3__models_usuario__["a" /* Usuario */]();
        this.usuarioErrores = [];
        this.error = false;
        this.validationError = false;
        this.validationErrorMsg = '';
        this.action = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]();
        this.label = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]();
        this.authService.loggedObservable.subscribe(function (value) {
            if (value) {
                _this.error = false;
                _this.action.emit();
            }
            else {
                _this.error = true;
            }
        });
        // let initParams: InitParams = {
        //      appId: '1466897480062572',
        //      xfbml: true,
        //      version: 'v2.10'
        //    };
        //    fb.init(initParams);
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.loginWithFacebook = function () {
        this.authService.fbLogin();
    };
    LoginComponent.prototype.logUser = function () {
        console.log('usuario', this.usuario);
        this.authService.login(this.usuario);
    };
    LoginComponent.prototype.newUser = function () {
        this.usuarioErrores = this.validatorService.validaUsuario(this.usuario);
        if (this.usuarioErrores.length == 0) {
            this.authService.nuevoUsuario(this.usuario);
        }
    };
    LoginComponent.prototype.addTelefono = function () {
        console.log('nuevo', this.nuevoTelefono);
        this.validationError = false;
        var nuevoTelefono = '' + this.nuevoTelefono;
        if (nuevoTelefono.length == 8) {
            var tel = new __WEBPACK_IMPORTED_MODULE_4__models_telefono__["a" /* Telefono */]();
            tel.telefono = this.nuevoTelefono + '';
            if (!this.usuario.telefono)
                this.usuario.telefono = [];
            this.usuario.telefono.push(tel);
            this.nuevoTelefono = null;
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del telefono";
        }
    };
    LoginComponent.prototype.removeTelefono = function (telefono) {
        console.log('remove', telefono);
        this.usuario.telefono = this.usuario.telefono.filter(function (el) {
            return el.telefono !== telefono.telefono;
        });
    };
    LoginComponent.prototype.addCorreo = function () {
        console.log('nuevo', this.nuevoCorreo);
        this.validationError = false;
        if (this.validatorService.emailValid(this.nuevoCorreo)) {
            var cor = new __WEBPACK_IMPORTED_MODULE_5__models_correo__["a" /* Correo */]();
            cor.correo = this.nuevoCorreo + '';
            if (!this.usuario.correo)
                this.usuario.correo = [];
            this.usuario.correo.push(cor);
            this.nuevoCorreo = null;
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del correo";
        }
    };
    LoginComponent.prototype.removeCorreo = function (correo) {
        console.log('remove', correo);
        this.usuario.correo = this.usuario.correo.filter(function (el) {
            return el.correo !== correo.correo;
        });
    };
    return LoginComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]) === "function" && _a || Object)
], LoginComponent.prototype, "action", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]) === "function" && _b || Object)
], LoginComponent.prototype, "label", void 0);
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'login-view',
        template: __webpack_require__(525),
        styles: [__webpack_require__(428)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_validator_service__["a" /* ValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_validator_service__["a" /* ValidatorService */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavComponent = (function () {
    function NavComponent(modalService, authService) {
        this.modalService = modalService;
        this.authService = authService;
        this.action = 'Login';
    }
    NavComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    NavComponent.prototype.ngOnInit = function () {
    };
    NavComponent.prototype.logout = function () {
        this.authService.logout();
    };
    NavComponent.prototype.hide = function () {
        this.modalRef.hide();
    };
    NavComponent.prototype.updateAction = function (update) {
        console.log('up', update);
        this.action = update;
    };
    return NavComponent;
}());
NavComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-nav',
        template: __webpack_require__(526),
        styles: [__webpack_require__(429)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], NavComponent);

var _a, _b;
//# sourceMappingURL=nav.component.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormatHoraPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FormatHoraPipe = (function () {
    function FormatHoraPipe() {
    }
    FormatHoraPipe.prototype.transform = function (value) {
        //let hora = (Number(value) > 12) ? (Number(value) - 12 ) + " pm": value + "am";
        console.log('value', value, Number(value));
        var hora = "";
        if (Number(value) > 1200) {
            hora = (Number(value) - 1200) + " pm";
        }
        else {
            hora = value + " am";
        }
        return hora;
    };
    return FormatHoraPipe;
}());
FormatHoraPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'formatHora' })
], FormatHoraPipe);

//# sourceMappingURL=hora.pipe.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_of__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReservaComponent = (function () {
    function ReservaComponent(modalService, router, sanitizer, dataService, authService) {
        this.modalService = modalService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.dataService = dataService;
        this.authService = authService;
        this.action = 'Login';
        this.reservacion = {};
        this.validLocal = false;
        this.validBarber = false;
        this.validReserva = false;
        this.validReservaTotal = false;
        this.barberiaUnica = true;
        this.cargando = false;
        this.selectedReserva = {};
        this.oneAtATime = true;
        this.provincias = [];
        this.escojeFecha = true;
        this.cantones = [];
        this.selectedProvincia = "San José";
        this.selectedCanton = "Central";
        this.selectedLocal = "";
        this.selectedLocalId = 0;
        this.barberias = [];
        this.pausas = [];
        this.tiempoBarbero = 20;
        this.horasBarbero = 13;
        this.iniciaBarbero = '1000';
        this.timeBoxes = [];
        this.camposLibres = [];
        this.reservas = [];
        this.dateSelected = new Date();
        this.timeSelected = "1";
        this.cantonesDisplay = [];
    }
    ReservaComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    ReservaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cargando = true;
        this.provincias = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];
        this.dataService.get('/provinciaCanton')
            .then(function (response) {
            console.log('success', response);
            _this.cantones = response.ProvinciaCanton;
            _this.cantonesDisplay = _this.cantones[0].cantones;
        }, function (error) {
        });
        if (this.authService.isAppUnica) {
            this.dataService.get('/sucursal/?idBarberia=' + this.authService.idBarberiaUnica)
                .then(function (response) {
                console.log('success Sucursales', response);
                _this.barberias = response.sucursal;
                if (_this.barberias.length > 0) {
                    _this.localSelectUnica(_this.barberias[0].id);
                }
                _this.cargando = false;
            }, function (error) {
            });
        }
        else {
            this.dataService.get('/sucursal/?idCanton=1')
                .then(function (response) {
                console.log('success Sucursales', response);
                _this.barberias = response.sucursal;
                if (_this.barberias.length == 1) {
                    _this.localSelectUnica(_this.barberias[0].id);
                }
                _this.cargando = false;
            }, function (error) {
            });
        }
        this.reservacion.local = { id: 0 };
        this.mapUrl();
    };
    ReservaComponent.prototype.updateHora = function (horario) {
        horario.horaInicial = Number(horario.horaInicial.substring(0, 2) + horario.horaInicial.substring(3, 5));
        horario.horaFinal = Number(horario.horaFinal.substring(0, 2) + horario.horaFinal.substring(3, 5));
        return horario;
    };
    ReservaComponent.prototype.modificaHoraToTime = function (hora) {
        hora = hora + '';
        if (hora.length == 3) {
            hora = "0" + hora;
        }
        return hora;
    };
    ReservaComponent.prototype.actualizaTimeBox = function () {
        var _this = this;
        var daysMap = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];
        if (this.reservacion.servicio && this.dateSelected) {
            var timeBoxes = [];
            var horasBarbero = 0;
            var horarioInicio = this.updateHora(Object.assign({}, this.reservacion.barbero.horarios.find(function (o) { return o.dia == daysMap[_this.dateSelected.getDay() - 1]; }))).horaInicial;
            var today = new Date();
            if (this.dateSelected.getFullYear() + this.dateSelected.getMonth() + this.dateSelected.getDate() == today.getFullYear() + today.getMonth() + today.getDate()) {
                var veces = 60 / this.reservacion.barbero.tiempoBarbero;
                var minutos = 0;
                while (minutos < today.getMinutes()) {
                    minutos += Number(this.reservacion.barbero.tiempoBarbero);
                }
                horarioInicio = today.getHours() * 100 + minutos;
            }
            var horarioFinal = this.updateHora(Object.assign({}, this.reservacion.barbero.horarios.find(function (o) { return o.dia == daysMap[_this.dateSelected.getDay() - 1]; }))).horaFinal;
            var hora = new Date();
            var horarioInicioFull = this.modificaHoraToTime(horarioInicio);
            if (horarioInicio) {
                horasBarbero = (horarioFinal - horarioInicio) / 100;
                hora.setHours(Number(horarioInicioFull.substring(0, 2)));
                hora.setMinutes(Number(horarioInicioFull.substring(2, 4)));
            }
            var timeBoxCount = horasBarbero * 60 / this.reservacion.barbero.tiempoBarbero;
            for (var i = 0; i < timeBoxCount; i++) {
                var reservada = false;
                for (var o = 0; o < this.reservas.length; o++) {
                    var horaReservaInicial = new Date();
                    var horaReservaFinal = new Date();
                    horaReservaInicial.setHours(Number(this.reservas[o].horaInicial.substring(0, 2)));
                    horaReservaInicial.setMinutes(Number(this.reservas[o].horaInicial.substring(2, 4)));
                    horaReservaInicial.setSeconds(0);
                    horaReservaFinal.setTime(horaReservaInicial.getTime());
                    horaReservaFinal.setMinutes(horaReservaFinal.getMinutes() + Number(this.reservas[o].duracion));
                    horaReservaFinal.setSeconds(0);
                    if (this.reservacion.fecha && horaReservaInicial.getTime() <= hora.getTime() && hora.getTime() <= horaReservaFinal.getTime() && (this.reservacion.fecha.getFullYear() + '-' + this.zerofill(this.reservacion.fecha.getMonth(), 1) + '-' + this.zerofill(this.reservacion.fecha.getDate(), 0) === this.reservas[o].dia)) {
                        console.log('here', this.reservas[o].id, horaReservaInicial, hora, horaReservaFinal);
                        reservada = true;
                    }
                }
                for (var o = 0; o < this.pausas.length; o++) {
                    var horaReservaInicial = new Date();
                    var horaReservaFinal = new Date();
                    horaReservaInicial.setHours(Number(this.pausas[o].horaInicial.substring(0, 2)));
                    horaReservaInicial.setMinutes(Number(this.pausas[o].horaInicial.substring(2, 4)));
                    horaReservaInicial.setSeconds(0);
                    horaReservaFinal.setTime(horaReservaInicial.getTime());
                    horaReservaFinal.setMinutes(horaReservaFinal.getMinutes() + Number(this.pausas[o].duracion));
                    horaReservaFinal.setSeconds(0);
                    if (horaReservaInicial.getTime() <= hora.getTime() && hora.getTime() <= horaReservaFinal.getTime()) {
                        if (this.pausas[o].dia != '' && this.reservacion.fecha && this.pausas[o].dia.indexOf(daysMap[this.reservacion.fecha.getDay() - 1]) != -1) {
                            reservada = true;
                        }
                        if (this.pausas[o].fecha && this.reservacion.fecha) {
                            var pausaDate = new Date(this.pausas[o].fecha);
                            if ('' + this.reservacion.fecha.getDate() + this.reservacion.fecha.getMonth() + this.reservacion.fecha.getFullYear() == '' + pausaDate.getDate() + pausaDate.getMonth() + pausaDate.getFullYear()) {
                                reservada = true;
                            }
                        }
                    }
                }
                timeBoxes.push({
                    'hora': new Date(hora.getTime()),
                    'timeBoxCount': i,
                    'reservada': reservada
                });
                hora.setMinutes(hora.getMinutes() + Number(this.reservacion.barbero.tiempoBarbero));
            }
            console.log('timeBoxes', timeBoxes);
            var tiempo = this.reservacion.servicio.duracion;
            var ocupaCampos = tiempo / this.reservacion.barbero.tiempoBarbero;
            this.camposLibres = [];
            for (var i = 0; i < timeBoxes.length; i++) {
                var estaReservada = false;
                for (var o = i; o < i + ocupaCampos; o++) {
                    if (o < timeBoxes.length) {
                        if (timeBoxes[o].reservada == true) {
                            estaReservada = true;
                            break;
                        }
                    }
                    else {
                        estaReservada = true;
                        break;
                    }
                }
                if (!estaReservada) {
                    this.camposLibres.push({
                        'hora': timeBoxes[i].hora
                    });
                }
            }
            console.log('campos', this.camposLibres);
        }
    };
    ReservaComponent.prototype.zerofill = function (i, add) {
        i = i + add;
        return ((i < 10 ? '0' : '') + i);
    };
    ReservaComponent.prototype.provinciaChanged = function (value) {
        var _this = this;
        this.cantonesDisplay = this.cantones[value].cantones;
        this.selectedProvincia = value;
        this.dataService.get('/sucursal/?idCanton=' + this.cantonesDisplay[0].id)
            .then(function (response) {
            console.log('success Sucursales', response);
            _this.barberias = response.sucursal;
            if (_this.barberias.length === 0) {
                _this.reservacion.local.id = 0;
                _this.selectedLocal = '';
                _this.selectedLocalId = 0;
                _this.validLocal = false;
                _this.isReservaValid();
                _this.mapUrl();
            }
            else {
                _this.localSelectUnica(_this.barberias[0].id);
            }
        }, function (error) {
        });
    };
    ReservaComponent.prototype.cantonChanged = function (value) {
        var _this = this;
        this.selectedCanton = value;
        this.dataService.get('/sucursal/?idCanton=' + this.selectedCanton)
            .then(function (response) {
            console.log('success Sucursales', response);
            _this.barberias = response.sucursal;
            if (_this.barberias.length === 0) {
                _this.reservacion.local.id = 0;
                _this.selectedLocal = '';
                _this.selectedLocalId = 0;
                _this.validLocal = false;
                _this.isReservaValid();
            }
            else {
                _this.localSelectUnica(_this.barberias[0].id);
            }
        }, function (error) {
        });
        this.mapUrl();
    };
    ReservaComponent.prototype.mapUrl = function () {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed/v1/place?key=AIzaSyAU-zYJI8xdxE-rnEGAbzZwBBK_KHOOfnc&q=' + this.selectedProvincia + ' ' + this.selectedCanton + ' ' + this.selectedLocal);
    };
    ReservaComponent.prototype.localSelect = function (value) {
        console.log('value', value);
        this.reservacion.local = value.item;
        this.selectedLocalId = this.reservacion.local.id;
        this.validLocal = true;
        this.isReservaValid();
        this.mapUrl();
    };
    ReservaComponent.prototype.localSelectUnica = function (id) {
        var sucursal = this.barberias.find(function (b) { return b.id == id; });
        this.reservacion.local = sucursal;
        this.validLocal = true;
        this.selectedLocal = this.reservacion.local.descripcion;
        this.selectedLocalId = this.reservacion.local.id;
        this.isReservaValid();
        this.mapUrl();
    };
    ReservaComponent.prototype.dateSelectedChange = function (value) {
        this.dateSelected = new Date(value);
        this.reservacion.fecha = this.dateSelected;
        this.escojeFecha = false;
        this.actualizaTimeBox();
    };
    ReservaComponent.prototype.selectReserva = function (reserva) {
        this.selectedReserva = reserva;
        this.validReserva = true;
        this.reservacion.hora = reserva;
        this.isReservaValid();
    };
    ReservaComponent.prototype.toDate = function (value) {
        var d = new Date();
        d.setHours(Number(value.substring(0, 2)));
        d.setMinutes(Number(value.substring(2, 4)));
        return d;
    };
    ReservaComponent.prototype.goTo = function (value) {
        this[value].nativeElement.click();
    };
    ReservaComponent.prototype.selectBarberDone = function (event) {
        var _this = this;
        this.reservacion.barbero = event.barber;
        this.reservacion.servicio = event.servicio;
        this.validBarber = true;
        console.log('as far', this.reservacion);
        this.dataService.get('/pausaHorarioBarbero/?idUsuario=' + this.reservacion.barbero.id)
            .then(function (response) {
            console.log('success', response);
            _this.pausas = _this.updateTimeToHoraString(response.pausaHorarioBarbero);
        }, function (error) {
        });
        this.dataService.get('/reserva/?idUsuarioBarbero=' + this.reservacion.barbero.id)
            .then(function (response) {
            console.log('success', response);
            _this.reservas = _this.updateTimeToHoraString(response.reserva);
        }, function (error) {
        });
        this.actualizaTimeBox();
        this.isReservaValid();
    };
    ReservaComponent.prototype.updateTimeToHoraString = function (pausas) {
        for (var i = pausas.length - 1; i >= 0; i--) {
            pausas[i].horaInicial = pausas[i].horaInicial.substring(0, 2) + pausas[i].horaInicial.substring(3, 5);
        }
        return pausas;
    };
    ReservaComponent.prototype.isReservaValid = function () {
        if (this.reservacion.local && this.reservacion.barbero
            && this.reservacion.servicio && this.reservacion.fecha
            && this.reservacion.hora && this.reservacion.servicio) {
            this.validReservaTotal = true;
        }
        else {
            this.validReservaTotal = false;
        }
    };
    ReservaComponent.prototype.confirmarReserva = function (modal) {
        var _this = this;
        if (this.authService.isUserLogged()) {
            this.cargando = true;
            var reserva = {};
            reserva.idSucursal = this.reservacion.local.id;
            reserva.idUsuarioReserva = this.authService.loggedUser.id;
            reserva.idUsuarioBarbero = this.reservacion.barbero.id;
            reserva.idServicio = this.reservacion.servicio.id;
            reserva.dia = this.reservacion.fecha;
            reserva.horaInicial = this.reservacion.hora.hora.getHours() + ":" + this.reservacion.hora.hora.getMinutes() + ":00";
            reserva.estado = 1;
            this.dataService.post('/reserva/', { "reserva": reserva })
                .then(function (response) {
                console.log('success', response);
                _this.cargando = false;
                alert('Su reserva a sido confirmada!');
                _this.router.navigate(['/home']);
            }, function (error) {
            });
        }
        else {
            alert('Por favor ingrese al sistema para guardar su reserva');
            this.openModal(modal);
            this.authService.loggedObservable.subscribe(function (value) {
                if (value) {
                    _this.cargando = true;
                    var reserva = {};
                    reserva.idSucursal = _this.reservacion.local.id;
                    reserva.idUsuarioReserva = _this.authService.loggedUser.id;
                    reserva.idUsuarioBarbero = _this.reservacion.barbero.id;
                    reserva.idServicio = _this.reservacion.servicio.id;
                    reserva.dia = _this.reservacion.fecha;
                    reserva.horaInicial = _this.reservacion.hora.hora.getHours() + ":" + _this.reservacion.hora.hora.getMinutes() + ":00";
                    reserva.estado = 1;
                    _this.dataService.post('/reserva/', { "reserva": reserva })
                        .then(function (response) {
                        console.log('success', response);
                        _this.cargando = false;
                        alert('Su reserva a sido confirmada!');
                        _this.router.navigate(['/home']);
                    }, function (error) {
                    });
                }
            });
        }
    };
    ReservaComponent.prototype.hide = function () {
        this.modalRef.hide();
    };
    ReservaComponent.prototype.updateAction = function (update) {
        console.log('up', update);
        this.action = update;
    };
    return ReservaComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('confirmar'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], ReservaComponent.prototype, "confirmar", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('barber'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _b || Object)
], ReservaComponent.prototype, "barber", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('date'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _c || Object)
], ReservaComponent.prototype, "date", void 0);
ReservaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-reserva',
        template: __webpack_require__(527),
        styles: [__webpack_require__(430)]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */]) === "function" && _h || Object])
], ReservaComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=reserva.component.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookLoginService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FacebookLoginService = (function () {
    //   status$ = new Subject<FbStatus>();
    function FacebookLoginService() {
        this.login = function () {
            FB.login(function (response) {
                //   this.status$.next(response);
                if (response.authResponse) {
                    console.log('You are now logged in.');
                    //console.log(AWS);
                    // Add the Facebook access token to the Cognito credentials login map.
                    // AWS.config.region = 'ap-northeast-1';
                    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    //   IdentityPoolId: 'ap-northeast-1:88e9e508-dd0a-4d2f-adb7-587d60092e4c',
                    //   Logins: {
                    //     'graph.facebook.com': response.authResponse.accessToken
                    //   }
                    // });
                    // // Obtain AWS credentials
                    // AWS.config.credentials.get(err => {
                    //     if (err) {
                    //        alert("alert: " + err);
                    //        return;
                    //     }
                    //     console.log(AWS.config.credentials.accessKeyId);
                    //     console.log(AWS.config.credentials.secretAccessKey);
                    //     console.log(AWS.config.credentials.sessionToken);
                    //     // this.response = "Cognito Identity Id", AWS.config.credentials.identityId 
                    //     // setTimeout(()=>{},0);
                    //     // alert("Cognito Identity Id", AWS.config.credentials.identityId);
                    //     var apigClient = apigClientFactory.newClient({
                    //       defaultContentType: 'application/json',
                    //       defaultAcceptType: 'application/json',
                    //       accessKey: AWS.config.credentials.accessKeyId,
                    //       secretKey: AWS.config.credentials.secretAccessKey,
                    //       sessionToken: AWS.config.credentials.sessionToken, //OPTIONAL: If you are using temporary credentials you must include the session token
                    //       region: 'ap-northeast-1' // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
                    //     });
                    //     var params = {
                    //       //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
                    //         // 'Content-Type': 'application/json',
                    //         // 'headers': 'Content-Type: application/json',
                    //          headers: {
                    //             'Content-Type': 'application/json'
                    //         },
                    //     };
                    //     apigClient.graphqlPost({}, {"query": "{hello}"}, {})
                    //       .then(response => console.log(response))
                    //       .catch(err => console.log(err))
                    // });
                }
                else {
                    console.log('There was a problem logging you in.');
                }
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id))
                return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1466897480062572',
                cookie: true,
                xfbml: true,
                version: 'v2.10' // use version 2.2
            });
            FB.getLoginStatus(function (response) {
                //   this.status$.next(response);
                console.log(response);
            });
        };
    }
    FacebookLoginService.prototype.logout = function () {
        FB.logout(function (response) { console.log(response); });
    };
    return FacebookLoginService;
}());
FacebookLoginService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], FacebookLoginService);

//# sourceMappingURL=facebook-login.service.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeCardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeCardComponent = (function () {
    function HomeCardComponent() {
    }
    return HomeCardComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Object)
], HomeCardComponent.prototype, "card", void 0);
HomeCardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'home-card',
        template: __webpack_require__(528),
        styles: [__webpack_require__(431)]
    }),
    __metadata("design:paramtypes", [])
], HomeCardComponent);

//# sourceMappingURL=home-card.component.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgModalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ImgModalComponent = (function () {
    function ImgModalComponent() {
    }
    ImgModalComponent.prototype.ngOnInit = function () {
    };
    return ImgModalComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Object)
], ImgModalComponent.prototype, "name", void 0);
ImgModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'img-modal',
        template: __webpack_require__(529),
        styles: [__webpack_require__(432)]
    }),
    __metadata("design:paramtypes", [])
], ImgModalComponent);

//# sourceMappingURL=img-modal.component.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_card_home_card_component__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img_modal_img_modal_component__ = __webpack_require__(361);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SHARED_COMPONENTS; });
//IMPORT component from subfolder


//Component declaration array
var SHARED_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_0__home_card_home_card_component__["a" /* HomeCardComponent */],
    __WEBPACK_IMPORTED_MODULE_1__img_modal_img_modal_component__["a" /* ImgModalComponent */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 421:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "ul{\n\ttext-align: center;\n}\n\n.barberos{\n\twidth: 80px;\n    height: 103px;\n    margin-right: 10px;\n    display: inline-block;\n    text-align: center;\n}\n\n.error{\n    color: orange;\n    text-decoration: underline;\n}\n\n.barberos.active .icon-barbero{\n\tborder-color: green;\n    border-width: 2px;\n}\n\n.icon-barbero{\n\twidth: 80px;\n    height: 80px;\n    border-radius: 39px;\n    border: 1px solid black;\n    overflow: hidden;\n    background: white;\n}\n\n.icon-barbero img{\n\twidth: 80px;\n\theight: 80px;\n}\n\n.icon-barbero:hover {\n\tanimation: pop 0.3s linear 1;\n}\n\n.card:hover {\n\tanimation: pop 0.3s linear 1;\n}\n\n@keyframes pop {\n\t50%  {transform: scale(1.2);}\n}\n\n.card {\n    width: 120px;\n    margin-left: 4px;\n    margin-bottom: 4px;\n    display: inline-block;\n    border-color: black;\n    box-shadow: 3px 4px 2px -2px grey;\n}\n\n.card.active{\n\tborder-color: green;\n    border-width: 2px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 423:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".actions{\n\ttext-align: center;\n    padding: 30px 0;\n    border-bottom: 1px solid black;\n}\n\n.error{\n   border: 1px solid red;\n}\n\ninput{\n\twidth: 100%;\n}\n\n.modal-body .row div{\n\tmargin-bottom: 20px;\n}\n\n.actions button{\n\tmargin-top: 10px;\n}\n\n.accion{\n\ttext-transform: capitalize;\n}\n\n.item{\n\tmargin-bottom: 15px;\n}\n\n.heading{\n\tfont-weight: bold;\n\tfont-size: 16px;\n\ttext-decoration: underline;\t\n}\n\n\n.nuevo-numero input{\n   width: 80% !important;\n}\n\n.small-action{\n   display: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n   width: 80%;\n   display: inline-block;\n}\n\n.correo-display .small-action{\n   /*width: 50px;*/\n}\n\n.correo-display .display{\n   width: 80%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.contact-item .telefono-display, .contact-item .display{\n   border-bottom: 1px solid black;\n}\n\n.contact-item,.telefonos,.correos,.nuevo-numero{\n   margin-bottom: 0px !important;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 424:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".footer {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 60px;\n  line-height: 60px;\n  background-color: #f5f5f5;\n  text-align: center;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "img {\n\tmargin: 0;   \n\tmax-width: 100% !important;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".home .header{\n\tfont-size: 19px;\n    font-weight: 700;\n    height: 120px;\n    padding-top: 38px;\n    line-height: 26px;\n    letter-spacing: 0.2px;\n}\n\n.mini-gallery .row a{\n\tpadding: 11px 2px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".centered-content{\n\ttext-align: center;\n}\n\n.date{\n\tpadding-bottom: 10px;\n    margin-bottom: 10px;\n}\n\n.underline{\n\tborder-bottom: 1px solid black;\n}\n\n.error{\n\tborder: 1px solid red;\n}\n\n.date .col-2{\n\tfont-weight: bold;\n\tfont-size: 20px;\n}\n\n.heading{\n\tfont-weight: bold;\n\tfont-size: 16px;\n\tborder-bottom: 1px solid black;\n}\n\n.cita{\n\t/*border: 1px solid green;\n\tborder-radius: 5px;*/\n}\n\n.telefonos{\n  margin-top: 15px;\n}\n\n.reservas li div{\n\tbackground-color: white;\n\tdisplay: inline-block;\n\tborder: 1px solid green;\n\ttext-align: center;\n\twidth: 100%;\n\tborder-radius: 5px;\n\tmargin-bottom: 5px;\t\n\tpadding-top: 4px;\n\tpadding-bottom: 4px;\n}\n\n.update{\n\tmargin-top: 20px;\n}\n\n.pausas button{\n\tmargin-bottom: 15px;\n}\n\n.active{\n\tborder: 1px solid green !important;\n\tbackground: green !important;\n}\n\n.repetir-item{\n\tbackground: gray;\n    display: inline-block;\n    padding: 3px;\n    width: 30px;\n    text-align: center;\n    color: white;\n    border: 1px solid black;\n}\n\nul.pausas-edit li {\n    margin-bottom: 12px;\n}\n\n.actualizar-usuario div{\n\tmargin-bottom: 12px;\n}\n\n.actualizar-usuario input{\n\twidth: 100%;\n}\n\n.action-modal{\n\tmargin-top: 15px;\n}\n\n.actualizar-horario .col-8{\n\tpadding-right: 0;\n    padding-left: 4px;\n}\n\n.nuevo-numero input{\n\twidth: 80% !important;\n}\n\n.small-action{\n\tdisplay: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n\twidth: 80%;\n\tdisplay: inline-block;\n}\n\n.correo-display .small-action{\n\twidth: 50px;\n}\n\n.correo-display .display{\n\twidth: 100%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\n.nuevo-numero input{\n   width: 80% !important;\n}\n\n.small-action{\n   display: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n   width: 80%;\n   display: inline-block;\n}\n\n.correo-display .small-action{\n   /*width: 50px;*/\n}\n\n.correo-display .display{\n   width: 80%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.contact-item .telefono-display, .contact-item .display{\n   border-bottom: 1px solid black;\n}\n\n.contact-item,.telefonos,.correos,.nuevo-numero{\n   margin-bottom: 0px !important;\n}\n\n.resumen .title{\n  margin-top: 23px;\n  font-weight: bold;\n}\n\n.resumen div{\n  margin-bottom: 10px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".login input{\n\twidth: 100%;\n  border: 1px solid;\n}\n\n.required{\n  color: black;\n  font-size: 16px;\n}\n.required.reqerror{\n  color: red;\n}\n\n.entrar{\n\tmargin-top: 25px;\n\tmargin-bottom: 20px;\n\ttext-align: center;\n}\n\n.tab-container .nav-link {\n    padding-top: 1px !important;\n    padding-bottom: 1px !important;\n    font-size: 14px !important;\n}\n\n.error{\n\tborder: 1px solid red !important;\n}\n\n.user-input{\n  margin-bottom: 15px;\n}\n\n\n.nuevo-numero input{\n\twidth: 80% !important;\n}\n\n.small-action{\n\tdisplay: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n\twidth: 80%;\n\tdisplay: inline-block;\n}\n\n.correo-display .small-action{\n\twidth: 50px;\n}\n\n.correo-display .display{\n\twidth: 100%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\n.nuevo-numero input{\n   width: 80% !important;\n}\n\n.small-action{\n   display: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n    margin: 2px;\n}\n\n.telefono-display{\n   width: 80%;\n   display: inline-block;\n}\n\n.correo-display .small-action{\n   /*width: 50px;*/\n}\n\n.correo-display .display{\n   width: 80%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.contact-item .telefono-display, .contact-item .display{\n   border-bottom: 1px solid black;\n}\n\n.contact-item,.telefonos,.correos,.nuevo-numero{\n   margin-bottom: 0px !important;\n}\n\n.telefonos{\n  margin-top: 15px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".navbar-brand img{\n    display: inline-block;\n    width: 40px;\n    height: 14px;\n    margin-left: 6px;\n}\n\n.menu-toogle{\n\tmargin-top: 7px;\n}\n\n.login-logo{\n\tborder-radius: 22px;\n    height: 39px;\n    min-width: 40px;\n    background-size: 100%;\n}\n\n.title{\n\tmargin-left: 58px;\n    padding-top: 4px;\n    display: inline-block;\n}\n\n.impersonando{\n    color: white;\n    border: 1px solid black;\n    background-color: red;\n    position: absolute;\n    top: 54px;\n    z-index: 10;\n    width: 100%;\n}\n\n.impersonando span{\n    color: blue;\n    text-decoration: underline;\n}\n\n.user-img img{\n    width: 38px;\n    border-radius: 19px;\n}\n\n/*.navbar{\n\tcolor: black !important;\n\tbackground: white !important;\n}\n\n.navbar a{\n\tcolor: black !important;\n}*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".item-action{\n\tfont-weight: bold;\n}\n\n.confirmar-items li span:first-child{\n\twidth: 90px;\n    display: inline-block;\n}\n\n.title{\n\ttext-align: center;\n\twidth: 100%;\n\tmargin-top: 14px;\n}\n\n.reserva{\n\tbackground-color: #2196f3 !important;\n\tmargin-top: 0px;\n\tpadding-top: 14px;\n\tdisplay: none;\n}\n\n.reserva h5{\n\tmargin-bottom: 0px;\n}\n\n.tab-pane > div{\n\tmargin-top: 10px;\n}\n\n.map{\n\twidth: 100%;\n\theight: 208px;\n}\n\n.next{\n\ttext-align: center;\n\tmargin: 28px 0;\n}\n\n.next button{\n\twidth: 50%;\n    font-size: 24px;\n}\n\n.date{\n\tdisplay: none;\n}\n\n.date.active{\n\tdisplay: inline-block;\n}\n\n.reservas li div{\n\tbackground-color: white;\n\tdisplay: inline-block;\n\tborder: 1px solid black;\n\ttext-align: center;\n\twidth: 100%;\n\tborder-radius: 5px;\n\tmargin-bottom: 5px;\t\n\tpadding-top: 4px;\n\tbox-shadow: 3px 4px 2px -2px grey;\n}\n\n.reservas li div p{\n\tmargin-bottom: 6px;\n}\n\n.reservas li div.reservada{\n\tbackground-color: firebrick;\n\tcolor: white;\n}\n\n.reservas li div.active{\n\tbackground-color: lightseagreen;\n}\n\n.go-back-date{\n\tcolor: #2196f3;\n    font-size: 29px;\n    padding-top: 2px;\n}\n\n.error{\n\tcolor: red;\n}\n\n.next button{\n\tposition: fixed;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 140,
	"./af.js": 140,
	"./ar": 147,
	"./ar-dz": 141,
	"./ar-dz.js": 141,
	"./ar-kw": 142,
	"./ar-kw.js": 142,
	"./ar-ly": 143,
	"./ar-ly.js": 143,
	"./ar-ma": 144,
	"./ar-ma.js": 144,
	"./ar-sa": 145,
	"./ar-sa.js": 145,
	"./ar-tn": 146,
	"./ar-tn.js": 146,
	"./ar.js": 147,
	"./az": 148,
	"./az.js": 148,
	"./be": 149,
	"./be.js": 149,
	"./bg": 150,
	"./bg.js": 150,
	"./bm": 151,
	"./bm.js": 151,
	"./bn": 152,
	"./bn.js": 152,
	"./bo": 153,
	"./bo.js": 153,
	"./br": 154,
	"./br.js": 154,
	"./bs": 155,
	"./bs.js": 155,
	"./ca": 156,
	"./ca.js": 156,
	"./cs": 157,
	"./cs.js": 157,
	"./cv": 158,
	"./cv.js": 158,
	"./cy": 159,
	"./cy.js": 159,
	"./da": 160,
	"./da.js": 160,
	"./de": 163,
	"./de-at": 161,
	"./de-at.js": 161,
	"./de-ch": 162,
	"./de-ch.js": 162,
	"./de.js": 163,
	"./dv": 164,
	"./dv.js": 164,
	"./el": 165,
	"./el.js": 165,
	"./en-au": 166,
	"./en-au.js": 166,
	"./en-ca": 167,
	"./en-ca.js": 167,
	"./en-gb": 168,
	"./en-gb.js": 168,
	"./en-ie": 169,
	"./en-ie.js": 169,
	"./en-il": 170,
	"./en-il.js": 170,
	"./en-nz": 171,
	"./en-nz.js": 171,
	"./eo": 172,
	"./eo.js": 172,
	"./es": 85,
	"./es-do": 173,
	"./es-do.js": 173,
	"./es-us": 174,
	"./es-us.js": 174,
	"./es.js": 85,
	"./et": 175,
	"./et.js": 175,
	"./eu": 176,
	"./eu.js": 176,
	"./fa": 177,
	"./fa.js": 177,
	"./fi": 178,
	"./fi.js": 178,
	"./fo": 179,
	"./fo.js": 179,
	"./fr": 182,
	"./fr-ca": 180,
	"./fr-ca.js": 180,
	"./fr-ch": 181,
	"./fr-ch.js": 181,
	"./fr.js": 182,
	"./fy": 183,
	"./fy.js": 183,
	"./gd": 184,
	"./gd.js": 184,
	"./gl": 185,
	"./gl.js": 185,
	"./gom-latn": 186,
	"./gom-latn.js": 186,
	"./gu": 187,
	"./gu.js": 187,
	"./he": 188,
	"./he.js": 188,
	"./hi": 189,
	"./hi.js": 189,
	"./hr": 190,
	"./hr.js": 190,
	"./hu": 191,
	"./hu.js": 191,
	"./hy-am": 192,
	"./hy-am.js": 192,
	"./id": 193,
	"./id.js": 193,
	"./is": 194,
	"./is.js": 194,
	"./it": 195,
	"./it.js": 195,
	"./ja": 196,
	"./ja.js": 196,
	"./jv": 197,
	"./jv.js": 197,
	"./ka": 198,
	"./ka.js": 198,
	"./kk": 199,
	"./kk.js": 199,
	"./km": 200,
	"./km.js": 200,
	"./kn": 201,
	"./kn.js": 201,
	"./ko": 202,
	"./ko.js": 202,
	"./ky": 203,
	"./ky.js": 203,
	"./lb": 204,
	"./lb.js": 204,
	"./lo": 205,
	"./lo.js": 205,
	"./lt": 206,
	"./lt.js": 206,
	"./lv": 207,
	"./lv.js": 207,
	"./me": 208,
	"./me.js": 208,
	"./mi": 209,
	"./mi.js": 209,
	"./mk": 210,
	"./mk.js": 210,
	"./ml": 211,
	"./ml.js": 211,
	"./mn": 212,
	"./mn.js": 212,
	"./mr": 213,
	"./mr.js": 213,
	"./ms": 215,
	"./ms-my": 214,
	"./ms-my.js": 214,
	"./ms.js": 215,
	"./mt": 216,
	"./mt.js": 216,
	"./my": 217,
	"./my.js": 217,
	"./nb": 218,
	"./nb.js": 218,
	"./ne": 219,
	"./ne.js": 219,
	"./nl": 221,
	"./nl-be": 220,
	"./nl-be.js": 220,
	"./nl.js": 221,
	"./nn": 222,
	"./nn.js": 222,
	"./pa-in": 223,
	"./pa-in.js": 223,
	"./pl": 224,
	"./pl.js": 224,
	"./pt": 226,
	"./pt-br": 225,
	"./pt-br.js": 225,
	"./pt.js": 226,
	"./ro": 227,
	"./ro.js": 227,
	"./ru": 228,
	"./ru.js": 228,
	"./sd": 229,
	"./sd.js": 229,
	"./se": 230,
	"./se.js": 230,
	"./si": 231,
	"./si.js": 231,
	"./sk": 232,
	"./sk.js": 232,
	"./sl": 233,
	"./sl.js": 233,
	"./sq": 234,
	"./sq.js": 234,
	"./sr": 236,
	"./sr-cyrl": 235,
	"./sr-cyrl.js": 235,
	"./sr.js": 236,
	"./ss": 237,
	"./ss.js": 237,
	"./sv": 238,
	"./sv.js": 238,
	"./sw": 239,
	"./sw.js": 239,
	"./ta": 240,
	"./ta.js": 240,
	"./te": 241,
	"./te.js": 241,
	"./tet": 242,
	"./tet.js": 242,
	"./tg": 243,
	"./tg.js": 243,
	"./th": 244,
	"./th.js": 244,
	"./tl-ph": 245,
	"./tl-ph.js": 245,
	"./tlh": 246,
	"./tlh.js": 246,
	"./tr": 247,
	"./tr.js": 247,
	"./tzl": 248,
	"./tzl.js": 248,
	"./tzm": 250,
	"./tzm-latn": 249,
	"./tzm-latn.js": 249,
	"./tzm.js": 250,
	"./ug-cn": 251,
	"./ug-cn.js": 251,
	"./uk": 252,
	"./uk.js": 252,
	"./ur": 253,
	"./ur.js": 253,
	"./uz": 255,
	"./uz-latn": 254,
	"./uz-latn.js": 254,
	"./uz.js": 255,
	"./vi": 256,
	"./vi.js": 256,
	"./x-pseudo": 257,
	"./x-pseudo.js": 257,
	"./yo": 258,
	"./yo.js": 258,
	"./zh-cn": 259,
	"./zh-cn.js": 259,
	"./zh-hk": 260,
	"./zh-hk.js": 260,
	"./zh-tw": 261,
	"./zh-tw.js": 261
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 438;


/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Correo; });
var Correo = (function () {
    function Correo() {
        this.id = 0;
        this.idUsuario = 0;
        this.correo = '';
        this.estado = 1;
    }
    return Correo;
}());

//# sourceMappingURL=correo.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Telefono; });
var Telefono = (function () {
    function Telefono() {
        this.id = 0;
        this.telefono = '';
        this.estado = 1;
        this.idUsuario = 0;
    }
    return Telefono;
}());

//# sourceMappingURL=telefono.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidatorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidatorService = (function () {
    function ValidatorService() {
    }
    ValidatorService.prototype.validaUsuario = function (usuario) {
        var errors = [];
        if (!this.isNotNull(usuario.nombre)) {
            errors.push({
                error: 'nombre',
                desc: 'Por favor ingrese un nombre'
            });
        }
        if (!this.isNotNull(usuario.usuario)) {
            errors.push({
                error: 'usuario',
                desc: 'Por favor ingrese un usuario'
            });
        }
        if (!this.isNotNull(usuario.contrasenna)) {
            errors.push({
                error: 'contrasenna',
                desc: 'Por favor ingrese una clave'
            });
        }
        if (!this.isNotNull(usuario.apellido1)) {
            errors.push({
                error: 'apellido1',
                desc: 'Por favor ingrese el primer apellido'
            });
        }
        if (!usuario.telefono) {
            errors.push({
                error: 'telefono',
                desc: 'Por favor ingrese al menos un número de telefono'
            });
        }
        else if (usuario.telefono.length == 0) {
            errors.push({
                error: 'telefono',
                desc: 'Por favor ingrese al menos un número de telefono'
            });
        }
        if (!usuario.correo) {
            errors.push({
                error: 'correo',
                desc: 'Por favor ingrese al menos un correo'
            });
        }
        else if (usuario.correo.length == 0) {
            errors.push({
                error: 'correo',
                desc: 'Por favor ingrese al menos un correo'
            });
        }
        return errors;
    };
    ValidatorService.prototype.validaBarbero = function (barbero) {
        var errors = [];
        errors = this.validaUsuario(barbero);
        if (!this.isNotNull(barbero.tiempoBarbero) || !this.isNumeric(barbero.tiempoBarbero)) {
            errors.push({
                error: 'tiempoBarbero',
                desc: 'Por favor verifique el Tiempo Barbero'
            });
        }
        return errors;
    };
    ValidatorService.prototype.validaServicio = function (servicio) {
        var errors = [];
        if (!this.isNotNull(servicio.descripcion)) {
            errors.push({
                error: 'nombre',
                desc: 'Por favor ingrese un nombre'
            });
        }
        if (!this.isNotNull(servicio.duracion) || !this.isNumeric(servicio.duracion)) {
            errors.push({
                error: 'duracion',
                desc: 'Por favor ingrese una duracion'
            });
        }
        if (!this.isNotNull(servicio.precio) || !this.isNumeric(servicio.precio)) {
            errors.push({
                error: 'precio',
                desc: 'Por favor ingrese un precio'
            });
        }
        return errors;
    };
    ValidatorService.prototype.validaBarberia = function (barberia) {
        var errors = [];
        if (!this.isNotNull(barberia.descripcion)) {
            errors.push({
                error: 'descripcion',
                desc: 'Por favor ingrese un nombre'
            });
        }
        if (!this.isNotNull(barberia.detalleDireccion)) {
            errors.push({
                error: 'detalleDireccion',
                desc: 'Por favor ingrese un detalle'
            });
        }
        if (!barberia.telefono) {
            errors.push({
                error: 'telefono',
                desc: 'Por favor ingrese al menos un número de telefono'
            });
        }
        else if (barberia.telefono.length == 0) {
            errors.push({
                error: 'telefono',
                desc: 'Por favor ingrese al menos un número de telefono'
            });
        }
        if (!barberia.correo) {
            errors.push({
                error: 'correo',
                desc: 'Por favor ingrese al menos un correo'
            });
        }
        else if (barberia.correo.length == 0) {
            errors.push({
                error: 'correo',
                desc: 'Por favor ingrese al menos un correo'
            });
        }
        return errors;
    };
    ValidatorService.prototype.validaPausa = function (pausa) {
        var errors = [];
        if (!this.isNotNull(pausa.horaInicial)) {
            errors.push({
                error: 'horaInicial',
                desc: 'Por favor ingrese una hora'
            });
        }
        if (!this.isNotNull(pausa.duracion)) {
            errors.push({
                error: 'duracion',
                desc: 'Por favor ingrese una duracion'
            });
        }
        if (!this.isNotNull(pausa.dia) && !this.isNotNull(pausa.fecha)) {
            errors.push({
                error: 'dia',
                desc: 'Por favor seleccione el dia para repetir'
            });
        }
        return errors;
    };
    ValidatorService.prototype.isNotNull = function (value) {
        return (value);
    };
    ValidatorService.prototype.isNumeric = function (number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    };
    ValidatorService.prototype.emailValid = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidatorService.prototype.hasChars = function (text, number) {
        text = text + '';
        return (text.length == number);
    };
    ValidatorService.prototype.hasError = function (error, errors) {
        return (errors.find(function (o) { return o.error == error; }));
    };
    return ValidatorService;
}());
ValidatorService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ValidatorService);

//# sourceMappingURL=validator.service.js.map

/***/ }),

/***/ 516:
/***/ (function(module, exports) {

module.exports = "<app-nav></app-nav>\n<router-outlet></router-outlet>\t\n<!-- <app-footer></app-footer>\n -->"

/***/ }),

/***/ 517:
/***/ (function(module, exports) {

module.exports = "<ul>\n\t<li *ngFor=\"let barbero of barberos\" (click)=\"selectedServicio = '';selectBarber(barbero);\" class=\"barberos\" [class.active]=\"selectedBarber==barbero\">\n\t\t<div class=\"icon-barbero\">\n\t\t\t<!-- <img src=\"barbero.img\" *ngIf=\"barbero.img !== null\"> -->\n\t\t\t<!-- <img src=\"assets/images/barbero-icon.png\" *ngIf=\"(barbero.img == null) && (barbero.sexo == 'M')\"> -->\n\t\t\t<!-- <img src=\"assets/images/barbera-icon.png\" *ngIf=\"(barbero.img == null) && (barbero.sexo == 'F')\"> -->\n\t\t\t<img src=\"assets/images/barbero-icon.png\">\n\t\t</div>\n\t\t<p>{{barbero.nombre}}</p>\n\t</li>\n\t<p *ngIf=\"barberos.length == 0\" class=\"error\">\n\t\tLo sentimos pero el local seleccionado aún no cuenta con servidores!\n\t</p>\n</ul>\n<div *ngIf=\"selectedBarber\">\n\t<p>Seleccione el servicio que desea de {{selectedBarber.nombre}}:</p>\n\t<ul>\n\t\t<li *ngFor=\"let servicio of selectedBarber.servicios\" (click)=\"selectServicio(servicio)\" class=\"card\" [class.active]=\"selectedServicio==servicio\">\n\t\t\t<p>{{servicio.descripcion}}</p>\n\t\t\t<p>{{servicio.precio}} Colones</p>\n\t\t\t<p>{{servicio.duracion}} Minutos</p>\n\t\t</li>\n\t\t<p *ngIf=\"selectedBarber.servicios.length == 0\" class=\"error\">\n\t\t\tLo sentimos pero la persona seleccionada aún no tiene servicios registrados!\n\t\t</p>\n\t</ul>\n</div>\n"

/***/ }),

/***/ 518:
/***/ (function(module, exports) {

module.exports = "<input type=\"text\" style=\"width: 80%;\"\n       #dp=\"bsDatepicker\"\n       bsDatepicker [(bsValue)]=\"bsValue\" [value]=\"parseDate(bsValue)\">"

/***/ }),

/***/ 519:
/***/ (function(module, exports) {

module.exports = "<div style=\"display:inline-block; min-height:290px;\" class=\"calendario\">\n\t<datepicker [(ngModel)]=\"dt\" [minDate]=\"minDate\" [showWeeks]=\"false\" [dateDisabled]=\"dateDisabled\" (selectionDone)=\"dateChanged($event)\" class=\"theme-green\"></datepicker>\n</div>"

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowRefService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function getWindow() {
    return window;
}
var WindowRefService = (function () {
    function WindowRefService() {
    }
    Object.defineProperty(WindowRefService.prototype, "nativeWindow", {
        get: function () {
            return getWindow();
        },
        enumerable: true,
        configurable: true
    });
    return WindowRefService;
}());
WindowRefService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])()
], WindowRefService);

//# sourceMappingURL=window.service.js.map

/***/ }),

/***/ 520:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-space\">\n</div>\n\n<div class=\"container\">\n    <div class=\"row\">\n    \t<div clas=\"col-12\">\n    \t\t<div class=\"module white-back static row\">\n    \t\t\t<div class=\"title reserva col-12\">\n    \t\t\t  <h5>Configuraciones</h5>\n    \t\t\t</div>\n    \t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isAdminUser() || authService.isAdminSucursalUser()\">\n    \t\t\t\t<div class=\"row\">\n    \t\t\t\t\t<div class=\"col-4\">\n    \t\t\t\t\t\t<p class=\"heading\">Barberias:</p>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-8\">\n    \t\t\t\t\t\t<select class=\"styled-select blue semi-square\" (change)=\"changeSucursal($event.target.value)\">\n                                <option *ngFor=\"let sucursal of sucursales\" [value]='sucursal.id'>{{sucursal.descripcion}}</option>\n    \t\t\t\t\t\t</select>\n                            <!-- <option value=\"1\">Tapia's / San Ramon</option> -->\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-12 actions\">\n    \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"nuevaBarberia={};accion='agregar';openModal(barberia)\" *ngIf=\"authService.isAdminUser()\">Agregar</button>\n    \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success\" (click)=\"actualizaSucursalSelected();accion='ver';openModal(barberia)\">Ver</button>\n    \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"actualizaSucursalSelected();accion='modificar';openModal(barberia)\">Modificar</button>\n    \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"actualizaSucursalSelected();accion='borrar';openModal(barberia)\" *ngIf=\"authService.isAdminUser()\">Borrar</button>\n    \t\t\t\t\t</div>\n    \t\t\t\t</div>\n    \t\t\t</div>\n    \t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isAdminUser() || authService.isAdminSucursalUser()\">\n    \t\t\t\t<div class=\"row\">\n    \t\t\t\t\t<div class=\"col-4\">\n    \t\t\t\t\t\t<p class=\"heading\">Barberos:</p>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-8\">\n    \t\t\t\t\t\t<select class=\"styled-select blue semi-square\"(change)=\"changeBarbero($event.target.value)\">\n                                <option *ngFor=\"let barbero of barberos\" [value]='barbero.id'>{{barbero.nombre}} {{barbero.primerApellido}}</option>\n    \t\t\t\t\t\t</select>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-12 actions\">\n                            <span>\n    \t\t\t\t\t\t  <button type=\"button\" class=\"btn btn-primary\" (click)=\"nuevoBarbero={};barberoAdmistrador = false;accion='agregar';openModal(barbero)\">Agregar</button>\n                                \n                            </span>\n                            <span *ngIf=\"nuevoBarbero.id\">\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success\" (click)=\"actualizaBarberoSelected();accion='ver';openModal(barbero);barberoAdmistrador = (nuevoBarbero.rol.indexOf('A') != -1);\">Ver</button>\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"actualizaBarberoSelected();accion='modificar';openModal(barbero);barberoAdmistrador = (nuevoBarbero.rol.indexOf('A') != -1);\">Modificar</button>\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"actualizaBarberoSelected();accion='borrar';openModal(barbero);barberoAdmistrador = (nuevoBarbero.rol.indexOf('A') != -1);\">Borrar</button>\n                                <button type=\"button\" class=\"btn btn-info\" (click)=\"impersonar()\">Impersonar</button>\n                            </span>\n    \t\t\t\t\t</div>\n    \t\t\t\t</div>\n    \t\t\t</div>\n    \t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isBarberoUser()\">\n    \t\t\t\t<div class=\"row\">\n    \t\t\t\t\t<div class=\"col-4\">\n    \t\t\t\t\t\t<p class=\"heading\">Servicios:</p>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-8\">\n                            <select class=\"styled-select blue semi-square\" (change)=\"changeServicio($event.target.value)\">\n                                <option *ngFor=\"let servicio of nuevoBarbero.servicios\" [value]='servicio.id'>{{servicio.descripcion}}</option>\n                            </select>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-12 actions\">\n                            <span>\n    \t\t\t\t\t\t  <button type=\"button\" class=\"btn btn-primary\" (click)=\"nuevoServicio={};accion='agregar';openModal(servicio)\">Agregar</button>\n                            </span>\n                            <span *ngIf=\"nuevoBarbero.id\">\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success\" (click)=\"actualizaServicioSelected();accion='ver';openModal(servicio)\">Ver</button>\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"actualizaServicioSelected();accion='modificar';openModal(servicio)\">Modificar</button>\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"actualizaServicioSelected();accion='borrar';openModal(servicio)\">Borrar</button>\n                            </span>\n    \t\t\t\t\t</div>\n    \t\t\t\t</div>\n    \t\t\t</div>\n    \t\t</div>\n    \t</div>\n    </div>\n</div>\n\n<div class=\"cargando\" *ngIf=\"cargando\">\n  <img src=\"assets/images/m2.png\">\n  Cargando...\n</div>\n\n<template #barberia>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\"><span class=\"accion\">{{accion}}</span> Sucursal</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"row\">\n        \t<div class=\"col-4\">\n        \t\tNombre:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"barberia\" [(ngModel)]=\"nuevaBarberia.descripcion\" [class.error]=\"validatorService.hasError('descripcion',barberiaErrores)\">\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tSeñas:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"ubicacion\" [(ngModel)]=\"nuevaBarberia.detalleDireccion\" [class.error]=\"validatorService.hasError('detalleDireccion',barberiaErrores)\">\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tProvincia:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<!-- <input type=\"text\" name=\"\" [ngModel]=\"nuevaBarberia.provincia\"> -->\n                <select class=\"form-control\" id=\"provincia\" [ngModel]=\"selectedProvincia\" (change)=\"provinciaChanged($event.target.value)\">\n                    <option *ngFor=\"let provincia of provincias;let i = index\" [value]=\"i\">{{provincia}}</option>\n                </select>\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tCanton:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<!-- <input type=\"text\" name=\"\" [(ngModel)]=\"nuevaBarberia.canton\"> -->\n                <select class=\"form-control\" id=\"provincia\" [(ngModel)]=\"nuevaBarberia.idCanton\">\n                    <option *ngFor=\"let canton of cantonesDisplay\" [value]=\"canton.id\">{{canton.canton}}</option>\n                </select>\n        \t</div>\n            <div class=\"col-4\">\n                Telefono:\n            </div>\n            <div class=\"col-8 telefonos\">\n                <div class=\"row\">\n                    <div class=\"col-12 nuevo-numero\">\n                        <input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error]=\"validatorService.hasError('telefono',barberiaErrores)\"> <span class=\"small-action\" (click)=\"addTelefonoBarberia()\"> + </span>\n                    </div>\n                    <div class=\"col-12 contact-item\" *ngFor=\"let telefono of nuevaBarberia.telefono\">\n                        <span class=\"telefono-display\">{{telefono.telefono}} </span>\n                        <span class=\"small-action\" (click)=\"removeTelefonoBarberia(telefono)\"> - </span> \n                    </div>\n                </div>\n            </div>\n            <div class=\"col-4\">\n                Correo:\n            </div>\n            <div class=\"col-8 correos\">\n                <div class=\"row\">\n                    <div class=\"col-12 nuevo-numero\">\n                        <input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error]=\"validatorService.hasError('correo',barberiaErrores)\"> <span class=\"small-action\" (click)=\"addCorreoBarberia()\"> + </span>\n                    </div>\n                    <div class=\"col-12 correo-display contact-item\" *ngFor=\"let correo of nuevaBarberia.correo\">\n                        <span class=\"display\">{{correo.correo}} </span>\n                        <span class=\"small-action\" (click)=\"removeCorreoBarberia(correo)\"> - </span> \n                    </div> \n                </div>\n            </div>\n        \t<div class=\"col-12\" style=\"margin-top: 15px;text-align: center;\">\n        \t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"AgregarBarberia()\" *ngIf=\"accion=='agregar'\">Agregar</button>\n        \t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"ModificarBarberia()\" *ngIf=\"accion=='modificar'\">Modificar</button>\n        \t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"EliminarBarberia()\" *ngIf=\"accion=='borrar'\">Borrar</button>\n        \t</div>\n        </div>\n    </div>\n</template>\n\n<template #barbero>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\"><span class=\"accion\">{{accion}}</span>  Barbero</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"row\">\n        \t<div class=\"col-4\">\n        \t\tUsuario:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"barberia\" [(ngModel)]=\"nuevoBarbero.usuario\" [class.error]=\"validatorService.hasError('usuario',barberoErrores)\" [disabled]=\"accion=='modificar'\">\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tNombre:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"ubicacion\" [(ngModel)]=\"nuevoBarbero.nombre\" [class.error]=\"validatorService.hasError('nombre',barberoErrores)\">\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tApellido 1:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"\" [(ngModel)]=\"nuevoBarbero.apellido1\" [class.error]=\"validatorService.hasError('apellido1',barberoErrores)\">\n        \t</div>\n            <div class=\"col-4\">\n                Apellido 2:\n            </div>\n            <div class=\"col-8\">\n                <input type=\"text\" name=\"\" [(ngModel)]=\"nuevoBarbero.apellido2\" [class.error]=\"validatorService.hasError('apellido2',barberoErrores)\">\n            </div>\n        \t<div class=\"col-4\">\n        \t\tTelefono:\n        \t</div>\n        \t<div class=\"col-8 telefonos\">\n                <div class=\"row\">\n                    <div class=\"col-12 nuevo-numero\">\n                        <input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error]=\"validatorService.hasError('telefono',barberoErrores)\"> <span class=\"small-action\" (click)=\"addTelefono()\"> + </span>\n                    </div>\n                    <div class=\"col-12 contact-item\" *ngFor=\"let telefono of nuevoBarbero.telefono\">\n                        <span class=\"telefono-display\">{{telefono.telefono}} </span>\n                        <span class=\"small-action\" (click)=\"removeTelefono(telefono)\"> - </span> \n                    </div>\n                </div>\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tCorreo:\n        \t</div>\n        \t<div class=\"col-8 correos\">\n                <div class=\"row\">\n                    <div class=\"col-12 nuevo-numero\">\n                        <input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error]=\"validatorService.hasError('correo',barberoErrores)\"> <span class=\"small-action\" (click)=\"addCorreo()\"> + </span>\n                    </div>\n                    <div class=\"col-12 correo-display contact-item\" *ngFor=\"let correo of nuevoBarbero.correo\">\n                        <span class=\"display\">{{correo.correo}} </span>\n                        <span class=\"small-action\" (click)=\"removeCorreo(correo)\"> - </span> \n                    </div>\n                </div>\n        \t</div>\n            <div class=\"col-4\">\n                Tiempo Barbero:\n            </div>\n            <div class=\"col-8\">\n                <select [(ngModel)]=\"nuevoBarbero.tiempoBarbero\" [class.error]=\"validatorService.hasError('tiempoBarbero',barberoErrores)\">\n                    <option value=\"10\">10</option>\n                    <option value=\"20\">20</option>\n                    <option value=\"30\">30</option>\n                    <option value=\"60\">60</option>\n                </select>\n            </div>\n            <div class=\"col-4\">\n                Es Administrador:\n            </div>\n            <div class=\"col-8\">\n                <input type=\"checkbox\" [(ngModel)]=\"barberoAdmistrador\">\n            </div>\n        \t<div class=\"col-12\" style=\"margin-top: 15px;text-align: center;\">\n        \t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"AgregarBarbero()\" *ngIf=\"accion=='agregar'\">Agregar</button>\n        \t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"ModificarBarbero()\" *ngIf=\"accion=='modificar'\">Modificar</button>\n        \t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"EliminarBarbero()\" *ngIf=\"accion=='borrar'\">Borrar</button>\n        \t</div>\n            <div class=\"col-12\" style=\"color:red;\">\n                {{errorDisplay}}\n            </div>\n        </div>\n    </div>\n</template>\n\n<template #servicio>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\"><span class=\"accion\">{{accion}}</span>  Servicio</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"row\">\n        \t<div class=\"col-4\">\n        \t\tNombre:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"barberia\" [(ngModel)]=\"nuevoServicio.descripcion\" [class.error]=\"validatorService.hasError('nombre',servicioErrores)\">\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tDuración:\n        \t</div>\n        \t<div class=\"col-8\">\n                <select [(ngModel)]=\"nuevoServicio.duracion\">\n                    <option *ngFor=\"let opcion of opcionesDuracion\" >{{opcion}}</option>\n                </select>\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tPrecio:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"number\" name=\"\" [(ngModel)]=\"nuevoServicio.precio\" [class.error]=\"validatorService.hasError('precio',servicioErrores)\">\n        \t</div>\n        \t<div class=\"col-12\" style=\"margin-top: 15px;text-align: center;\">\n        \t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"AgregarServicio()\" *ngIf=\"accion=='agregar'\">Agregar</button>\n        \t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"ModificarServicio()\" *ngIf=\"accion=='modificar'\">Modificar</button>\n        \t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"EliminarServicio()\" *ngIf=\"accion=='borrar'\">Borrar</button>\n        \t</div>\n        </div>\n    </div>\n</template>"

/***/ }),

/***/ 521:
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\n  <div class=\"container\">\n    <span class=\"text-muted\">\n      Creado por KYR.co\n    </span>\n  </div>\n</footer>"

/***/ }),

/***/ 522:
/***/ (function(module, exports) {

module.exports = "<carousel [interval]=\"myInterval\">\n  <slide>\n    <img src=\"assets/images/barber1.jpg\" alt=\"First slide\">\n    <div class=\"carousel-caption\">\n      <h3>Siempre el mejor servicio</h3>\n      <p *ngIf=\"authService.isAdminUser() == false\"><a href=\"#/reserva\">Reservar</a></p>\n    </div>\n  </slide>\n  <slide>\n    <img src=\"assets/images/barber2.jpg\" alt=\"Second slide\">\n    <div class=\"carousel-caption\">\n      <h3>Atentos a las nuevas tendencias</h3>\n      <p *ngIf=\"authService.isAdminUser() == false\"><a href=\"#/reserva\">Reservar</a></p>\n    </div>\n  </slide>\n  <slide>\n    <img src=\"assets/images/barber3.jpg\" alt=\"Third slide\">\n    <div class=\"carousel-caption\">\n      <h3>Haciendo clientes felices</h3>\n      <p *ngIf=\"authService.isAdminUser() == false\"><a href=\"#/reserva\">Reservar</a></p>\n    </div>\n  </slide>\n</carousel>"

/***/ }),

/***/ 523:
/***/ (function(module, exports) {

module.exports = "<div class=\"home container\">\n\t<div class=\"row\">\n\t\t<carousel-custom></carousel-custom>\n\t</div>\n\t<div class=\"row\" *ngIf=\"!authService.isAppUnica\">\n\t\t<div class=\"col-12\">\n\t\t\t<div class=\"module white-back static\">\n\t\t\t\t<div class=\"module-title\">\n\t\t\t\t\t<h4>Bienvenido <span *ngIf=\"authService.isUserLogged()\">{{authService.loggedUser.nombre}}</span> a {{authService.nombreBarberia}} </h4>\n\t\t\t\t\t<span class=\"module-separator\"></span>\n\t\t\t\t</div>\n\t\t\t\t<p class=\"lead\">La red de barberias mas grande del Pais.</p>\n\t\t\t\t<p>Solo seleccione \"Reservar\" y escoja la barbería de su preferencia.</p>\n\t\t\t\t<p>Con cientos de clientes  y barberias satisfechos que pueden dar fe de nuestra calidad.</p>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-scissors\" aria-hidden=\"true\"></i>Cobertura nacional</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.5s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-camera-retro\" aria-hidden=\"true\"></i>Disponible 24/7</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.7s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-lightbulb-o\" aria-hidden=\"true\"></i>Siempre trabajando para mejorar nuestros servicios.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"row\" *ngIf=\"authService.isAppUnica\">\n\t\t<div class=\"col-12\">\n\t\t\t<div class=\"module white-back static\">\n\t\t\t\t<div class=\"module-title\">\n\t\t\t\t\t<h4>Bienvenido <span *ngIf=\"authService.isUserLogged()\">{{authService.loggedUser.nombre}}</span> a {{authService.nombreBarberia}} </h4>\n\t\t\t\t\t<span class=\"module-separator\"></span>\n\t\t\t\t</div>\n\t\t\t\t<p class=\"lead\">La Barberia abrio a inicio del 2012, nos especializamos en cortes de cabello y barba, Gracias por elegirnos!</p>\n\t\t\t\t<p>Con miles de clientes satisfechos que pueden dar fe de nuestra calidad.</p>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-scissors\" aria-hidden=\"true\"></i>Cortes de muchos estilos.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.5s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-camera-retro\" aria-hidden=\"true\"></i>Un ambiene ameno para el corte de su cabello y barba.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.7s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-lightbulb-o\" aria-hidden=\"true\"></i>Siempre en entrenamiento para llegar a ser aun mejores.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"row gallery\">\n\t\t<div class=\"col-12 wow fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n\t\t\t<div class=\"module white-back\">\n\t\t\t\t<div class=\"module-title\">\n\t\t\t\t\t<h4>Beard &amp; Hair Styles</h4>\n\t\t\t\t\t<span class=\"module-separator\"></span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"mini-gallery clearfix\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"row\" style=\"margin-bottom: 16px;\">\n\t\t\t\t\t\t\t<img-modal name=\"hair1\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair2\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair3\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair4\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<img-modal name=\"hair5\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair6\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair7\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair8\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),

/***/ 524:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-space\">\n</div>\n\n<div class=\"container\">\n\t<div clas=\"col-12\">\n\t\t<div class=\"module white-back static row\">\n\t\t\t<div class=\"title reserva col-12\">\n\t\t\t  <h5>Información</h5>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isRegularUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayCitas = !displayCitas\">\n\t\t\t\t\t\t<p class=\"heading\">Citas <span *ngIf=\"!displayCitas\">></span> <span *ngIf=\"displayCitas\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\" *ngIf=\"displayCitas\">\n\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t<li *ngFor=\"let cita of reservas\" class=\"col-12 col-md-6\">\n\t\t\t\t\t\t\t\t<div (click)=\"obtieneInfo(cita);selectedCita = Object.assign({}, cita);openModal(citaModal)\">\n\t\t\t\t\t\t\t\t\t{{cita.dia}} - {{convierteTiempo(cita.horaInicial)}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"(authService.isBarberoUser() && authService.isAdminUser()) || authService.isBarberoUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayCitas = !displayCitas\">\n\t\t\t\t\t\t<p class=\"heading\">Citas <span *ngIf=\"!displayCitas\">></span> <span *ngIf=\"displayCitas\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row date\" *ngIf=\"displayCitas\">\n\t\t\t\t\t<div class=\"col-2 centered-content\" (click)=\"changeDate('less')\">\n\t\t\t\t\t\t<\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8 centered-content underline\">\n\t\t\t\t\t\t{{selectedDate | date}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-2 centered-content\" (click)=\"changeDate('more')\">\n\t\t\t\t\t\t>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayCitas\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t<li *ngFor=\"let cita of reservas\" class=\"col-4 cita\">\n\t\t\t\t\t\t\t\t<div (click)=\"obtieneInfo(cita);selectedCita = Object.assign({}, cita);openModal(citaModal)\">\n\t\t\t\t\t\t\t\t\t{{convierteTiempo(cita.horaInicial)}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 col-md-6 item pausas\" *ngIf=\"authService.isBarberoUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayPausas = !displayPausas\">\n\t\t\t\t\t\t<p class=\"heading\">Pausas <span *ngIf=\"!displayPausas\">></span> <span *ngIf=\"displayPausas\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayPausas\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t<li *ngFor=\"let pausa of pausas\" class=\"col-12 col-md-6\">\n\t\t\t\t\t\t\t\t<div (click)=\"agregarPausa = false;selectedPausa = Object.assign({}, pausa );openModal(pausaModal)\">\n\t\t\t\t\t\t\t\t\t{{convierteTiempo(pausa.horaInicial)}} : \n\t\t\t\t\t\t\t\t\t<span *ngIf=\"pausa.dia\">\n\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"pausa.dia == ' LU MA MI JU VI SA DO'\">\n\t\t\t\t\t\t\t\t\t\t\tTodos los días\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"pausa.dia == ' LU MA MI JU VI'\">\n\t\t\t\t\t\t\t\t\t\t\tEntre semana\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"pausa.dia != ' LU MA MI JU VI SA DO' && pausa.dia != ' LU MA MI JU VI'\">\n\t\t\t\t\t\t\t\t\t\t\t{{pausa.dia}}\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span *ngIf=\"!pausa.dia\">\n\t\t\t\t\t\t\t\t\t\t{{pausa.fecha}}\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayPausas\">\n\t\t\t\t\t<div class=\"col-12 centered-content\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"agregarPausa = true;selectedPausa = {dia:''} ;openModal(pausaModal)\">\n\t\t\t\t\t\t\tAgregar Pausa\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isBarberoUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayHorario = !displayHorario\">\n\t\t\t\t\t\t<p class=\"heading\">Horarios <span *ngIf=\"!displayHorario\">></span> <span *ngIf=\"displayHorario\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row actualizar-horario\" *ngIf=\"displayHorario\">\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Lunes</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioLunes.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioLunes.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Martes</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioMartes.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioMartes.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Miercoles</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioMiercoles.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioMiercoles.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Jueves</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioJueves.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioJueves.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Viernes</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioViernes.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioViernes.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Sabado</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioSabado.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioSabado.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Domingo</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioDomingo.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioDomingo.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12 update centered-content\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"updateHorarios()\">\n\t\t\t\t\t\t\tActualizar\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 col-md-6 item\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayContacto = !displayContacto\">\n\t\t\t\t\t\t<p class=\"heading\">Contacto <span *ngIf=\"!displayContacto\">></span> <span *ngIf=\"displayContacto\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row actualizar-usuario\" *ngIf=\"displayContacto\">\n\t\t\t\t\t<div class=\"col-5\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<span>Usuario</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.usuario\" disabled=\"\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\">\n\t\t\t\t\t\t<span>Nombre</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.nombre\" [class.error]=\"validatorService.hasError('nombre',usuarioErrores)\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\">\n\t\t\t\t\t\t<span>Apellido 1</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.apellido1\" [class.error]=\"validatorService.hasError('apellido1',usuarioErrores)\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\">\n\t\t\t\t\t\t<span>Apellido 2</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.apellido2\" [class.error]=\"validatorService.hasError('apellido2',usuarioErrores)\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\">\n\t\t\t\t\t\t<span>Correo</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\">\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-12 nuevo-numero\">\n\t\t\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error]=\"validatorService.hasError('correo',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addCorreo()\"> + </span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-12 correo-display\" *ngFor=\"let correo of nuevoUsuario.correo\">\n\t\t\t\t\t\t\t\t<span class=\"display\">{{correo.correo}} </span>\n\t\t\t\t\t\t\t\t<span class=\"small-action\" (click)=\"removeCorreo(correo)\"> - </span> \n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5 telefonos\">\n\t\t\t\t\t\t<span>Telefono</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7 telefonos\" >\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-12 nuevo-numero\">\n\t\t\t\t\t\t\t\t<input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error]=\"validatorService.hasError('telefono',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addTelefono()\"> + </span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-12\" *ngFor=\"let telefono of nuevoUsuario.telefono\">\n\t\t\t\t\t\t\t\t<span class=\"telefono-display\">{{telefono.telefono}} </span>\n\t\t\t\t\t\t\t\t<span class=\"small-action\" (click)=\"removeTelefono(telefono)\"> - </span> \n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<span>Contraseña</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.contrasenna\" [class.error]=\"validatorService.hasError('contrasenna',usuarioErrores)\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<span>Vincular con FB</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"updateFacebook()\">\n\t\t\t\t\t\t\tVincular\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"col-12 update centered-content\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"update()\">\n\t\t\t\t\t\t\tActualizar\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\" *ngIf=\"validationError\" style=\"color:red;\">\n\t\t\t\t\t\t{{validationErrorMsg}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\n\t\t\t<!-- <div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isRegularUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayResumen = !displayResumen\">\n\t\t\t\t\t\t<p class=\"heading\">Resumen <span *ngIf=\"!displayResumen\">></span> <span *ngIf=\"displayResumens\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\" *ngIf=\"displayResumen\">\n\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t<li *ngFor=\"let cita of reservas\" class=\"col-12 col-md-6\">\n\t\t\t\t\t\t\t\t<div (click)=\"obtieneInfo(cita);selectedCita = Object.assign({}, cita);openModal(citaModal)\">\n\t\t\t\t\t\t\t\t\t{{cita.dia}} - {{convierteTiempo(cita.horaInicial)}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div> -->\n\t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"(authService.isBarberoUser() && authService.isAdminUser()) || authService.isBarberoUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayResumen = !displayResumen\">\n\t\t\t\t\t\t<p class=\"heading\">Resumen <span *ngIf=\"!displayResumen\">></span> <span *ngIf=\"displayResumen\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row date\" *ngIf=\"displayResumen\">\n\t\t\t\t\t<div class=\"col-6\">Fecha Inicial:<br> <calendario-input (dateSelectedChange)=\"fechaInicialChanges($event)\"></calendario-input></div>\n\t\t\t\t\t<div class=\"col-6\">Fecha Final:<br> <calendario-input (dateSelectedChange)=\"fechaFinalChanges($event)\"></calendario-input></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayResumen\">\n\t\t\t\t\t<div class=\"col-12 update centered-content\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"generar()\">\n\t\t\t\t\t\t\tGenerar\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row resumen\" *ngIf=\"displayResumen && resumenGenerado\">\n\t\t\t\t\t<div class=\"col-12 centered-content title\">\n\t\t\t\t\t\tResumen de {{resumenFechaInicial}} hasta {{resumenFechaFinal}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\tCantidad de citas:\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\t{{cantidadCitas}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\tGanancias por citas:\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\t{{ganancias}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"cargando\" *ngIf=\"cargando\">\n  <img src=\"assets/images/m2.png\">\n  Cargando...\n</div>\n\n<template #citaModal>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Cita</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body container\">\n    \t<ul class=\"row\">\n          <li class=\"col-5\"><span>Barberia : </span></li>\n          <li class=\"col-7\"><span>{{selectedCita.sucursal}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\"><span>{{selectedCita.nombreBarbero}} {{selectedCita.primerApellidoBarbero}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Tel Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\">\n          \t<span *ngFor=\"let tel of telefonosBarberoDisplay\">\n          \t\t{{tel.telefono}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Correo Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\">\n          \t<span *ngFor=\"let cor of correosBarberoDisplay\">\n          \t\t{{cor.correo}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\"><span>Servicio : </span></li>\n          <li class=\"col-7\"><span>{{selectedCita.servicio}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser()\"><span>Usuario : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser()\"><span>{{selectedCita.nombreUserReserva}} {{selectedCita.primerApellidoUserReserva}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser()\"><span>Tel Usuario : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser()\">\n          \t<span *ngFor=\"let tel of telefonosUsuarioDisplay\">\n          \t\t{{tel.telefono}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser()\"><span>Correo Usuario : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser()\">\n          \t<span *ngFor=\"let cor of correosUsuarioDisplay\">\n          \t\t{{cor.correo}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\"><span>Duración : </span></li>\n          <li class=\"col-7\"><span>{{selectedCita.duracion}} Minutos</span></li>\n          <li class=\"col-5\"><span>Fecha : </span></li>\n          <li class=\"col-7\"><span>{{selectedCita.dia}}</span></li>\n          <li class=\"col-5\"><span>Hora : </span></li>\n          <li class=\"col-7\"><span>{{convierteTiempo(selectedCita.horaInicial)}}</span></li>\n          <li class=\"col-5\"><span>Precio : </span></li>\n          <li class=\"col-7\"><span>{{selectedCita.precio}}</span></li>\n          <li class=\"col-12 centered-content action-modal\">\n          \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"modalRef.hide();openModal(confirmaEliminarCita)\" *ngIf=\"authService.isAdminUser() || mayorQueHoy(selectedCita.dia)\">\n\t\t\t\tEliminar\n\t\t\t</button>\n          </li>\n        </ul>\n    </div>\n</template>\n\n<template #pausaModal>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Pausa</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body\">\n    \t<ul class=\"pausas-edit\">\n          <li>\n          \t<span>Hora : </span>\n          \t<span>\n          \t\t<!-- <input type=\"text\" [(ngModel)]=selectedPausa.hora> -->\n          \t\t<select [(ngModel)]=\"selectedPausa.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t</select>\n          \t</span>\n          </li>\n          <li class=\"repetir\"><span [class.error]=\"validatorService.hasError('dia',pausaErrores)\">dia : </span>\n          \t<span [class.active]=\"contains('LU')\" class=\"repetir-item\" (click)=\"toogleRe('LU')\">\n          \t\tLu\n          \t</span>\n          \t<span [class.active]=\"contains('MA')\" class=\"repetir-item\" (click)=\"toogleRe('MA')\">\n          \t\tMa\n          \t</span>\n          \t<span [class.active]=\"contains('MI')\" class=\"repetir-item\" (click)=\"toogleRe('MI')\">\n          \t\tMi\n          \t</span>\n          \t<span [class.active]=\"contains('JU')\" class=\"repetir-item\" (click)=\"toogleRe('JU')\">\n          \t\tJu\n          \t</span>\n          \t<span [class.active]=\"contains('VI')\" class=\"repetir-item\" (click)=\"toogleRe('VI')\">\n          \t\tVi\n          \t</span>\n          \t<span [class.active]=\"contains('SA')\" class=\"repetir-item\" (click)=\"toogleRe('SA')\">\n          \t\tSa\n          \t</span>\n          \t<span [class.active]=\"contains('DO')\" class=\"repetir-item\" (click)=\"toogleRe('DO')\">\n          \t\tDo\n          \t</span>\n          </li>\n          <li><span>Fecha : </span><span *ngIf=\"!this.selectedPausa.dia\">{{selectedPausa.fecha}}</span>\n          \t<span *ngIf=\"!this.selectedPausa.dia\">\n          \t\t<app-calendario (dateSelectedChange)=\"dateSelectedChange($event)\" [dateSelected]='selectedPausa.fecha'></app-calendario>\n          \t</span>\n          \t<span *ngIf=\"this.selectedPausa.dia\">\n          \t\tRepetición de pausa activa.\n          \t</span>\n          </li>\n          <li>\n          \t<span>Duración : </span>\n          \t<span>\n          \t\t<!-- <input type=\"text\" [(ngModel)]=selectedPausa.duracion> -->\n          \t\t<select [(ngModel)]=\"selectedPausa.duracion\" [class.error]=\"validatorService.hasError('duracion',pausaErrores)\">\n          \t\t\t<option *ngFor=\"let opcion of opcionesDuracion\" >{{opcion}}</option>\n          \t\t</select>\n          \t</span>\n          </li>\n          <li>\n\t\t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"modificarPausa();\" *ngIf=\"!agregarPausa\">\n\t\t\t\tModificiar\n\t\t\t</button>\n          \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"modalRef.hide();openModal(confirmaEliminarPausa)\" *ngIf=\"!agregarPausa\">\n\t\t\t\tEliminar\n\t\t\t</button>\n\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"agregarNuevaPausa();\" *ngIf=\"agregarPausa\">\n\t\t\t\tAgregar\n\t\t\t</button>\n          </li>\n        </ul>\n    </div>\n</template>\n\n<template #confirmaEliminarCita>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Confirmar eliminación de cita</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body\">\n      \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"eliminarCita()\">\n\t\t\tEliminar\n\t\t</button>\n\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\">\n\t\t\tNo Eliminar\n\t\t</button>\n    </div>\n</template>\n\n<template #confirmaEliminarPausa>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Confirmar eliminación de pausa</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body\">\n      \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"eliminarPausa()\">\n\t\t\tEliminar\n\t\t</button>\n\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\">\n\t\t\tNo Eliminar\n\t\t</button>\n    </div>\n</template>\n"

/***/ }),

/***/ 525:
/***/ (function(module, exports) {

module.exports = "<div class=\"login\">\n\t<tabset [justified]=\"true\" class=\"login\">  \n\t\t<tab>\n\t\t  \t<template tabHeading>\n\t\t      Ingresar\n\t\t    </template>\n\t\t\t<div class=\"row login\">\n\t\t\t\t<div class=\"col-6 user-input\">\n\t\t\t\t\t<label>Usuario</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-6 user-input\">\n\t\t\t\t\t<input type=\"text\" name=\"usuario\" [(ngModel)]=\"usuario.usuario\" placeholder=\"usuario\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t<label>Clave</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t<input type=\"password\" name=\"clave\" [(ngModel)]=\"usuario.contrasenna\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 entrar\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"logUser()\">\n\t\t\t\t\t\tEntrar\n\t\t\t\t\t</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"loginWithFacebook()\" style=\"\n    padding-top: 0px;\n    padding-bottom: 6px;\n\">Entrar con <i class=\"fa fa-facebook-official\" style=\"font-size:28px\"></i></button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12\" *ngIf=\"error\" style=\"color:red;\">\n\t\t\t\t\tPor favor revise su información de Usuario\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</tab>\n\t\t<tab>\n\t\t  \t<template tabHeading>\n\t\t      Nuevo Usuario\n\t\t    </template>\n\t\t\t<div class=\"row login\">\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Usuario<span class=\"required\" [class.reqerror]=\"validatorService.hasError('usuario',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"usuario\" [(ngModel)]=\"usuario.usuario\" \n\t\t\t\t\t [class.error]=\"validatorService.hasError('usuario',usuarioErrores)\" placeholder=\"juan1990\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Clave<span class=\"required\" [class.reqerror]=\"validatorService.hasError('contrasenna',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"password\" name=\"clave\" [(ngModel)]=\"usuario.contrasenna\" [class.error]=\"validatorService.hasError('contrasenna',usuarioErrores)\" placeholder=\"miclave\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Nombre<span class=\"required\" [class.reqerror]=\"validatorService.hasError('nombre',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"nombre\" [(ngModel)]=\"usuario.nombre\" [class.error]=\"validatorService.hasError('nombre',usuarioErrores)\" placeholder=\"Juan\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Apellido 1<span class=\"required\" [class.reqerror]=\"validatorService.hasError('apellido1',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"primerApellido\" [(ngModel)]=\"usuario.apellido1\" [class.error]=\"validatorService.hasError('apellido1',usuarioErrores)\" placeholder=\"Perez\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Apellido 2</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"segundoApellido\" [(ngModel)]=\"usuario.apellido2\" [class.error]=\"validatorService.hasError('apellido2',usuarioErrores)\" placeholder=\"Lopez\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Correo<span class=\"required\" [class.reqerror]=\"validatorService.hasError('correo',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8 correos\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t   <div class=\"col-12 nuevo-numero\">\n\t                        <input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error]=\"validatorService.hasError('correo',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addCorreo()\"> + </span>\n\t                    </div>\n\t                    <div class=\"col-12 correo-display contact-item\" *ngFor=\"let correo of usuario.correo\">\n\t                        <span class=\"display\">{{correo.correo}} </span>\n\t                        <span class=\"small-action\" (click)=\"removeCorreo(correo)\"> - </span> \n\t                    </div>\n\t                   \n\t                </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Telefono<span class=\"required\" [class.reqerror]=\"validatorService.hasError('telefono',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8 telefonos\">\n\t\t\t\t\t<div class=\"row\">\n\t                    <div class=\"col-12 nuevo-numero\">\n\t                        <input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error]=\"validatorService.hasError('telefono',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addTelefono()\"> + </span>\n\t                    </div>\n\t                    <div class=\"col-12 contact-item\" *ngFor=\"let telefono of usuario.telefono\">\n\t                        <span class=\"telefono-display\">{{telefono.telefono}} </span>\n\t                        <span class=\"small-action\" (click)=\"removeTelefono(telefono)\"> - </span> \n\t                    </div>\n\t                </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 entrar\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"newUser()\">\n\t\t\t\t\t\tRegistrar\n\t\t\t\t\t</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"loginWithFacebook()\" style=\"\n    padding-top: 0px;\n    padding-bottom: 6px;\n\">Registrar con <i class=\"fa fa-facebook-official\" style=\"font-size:28px\"></i></button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12\" *ngIf=\"error\" style=\"color:red;\">\n\t\t\t\t\t{{authService.errorDisplay}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12\" *ngIf=\"validationError\" style=\"color:red;\">\n\t\t\t\t\t{{validationErrorMsg}}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</tab>\n\t</tabset>\n</div>"

/***/ }),

/***/ 526:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-toggleable-md navbar-inverse bg-inverse\">\n    <button class=\"navbar-toggler navbar-toggler-left menu-toogle\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\n    </button>\n    <button class=\"navbar-toggler navbar-toggler-right login-logo\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarLogin\" aria-controls=\"navbarLogin\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" *ngIf=\"authService.profilePic === ''\">\n        <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\n    </button>\n     <button class=\"navbar-toggler navbar-toggler-right login-logo\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarLogin\" aria-controls=\"navbarLogin\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" *ngIf=\"authService.profilePic != ''\" [style.background-image]=\"'url(' + authService.profilePic + ')'\">\n    </button>\n    <a class=\"navbar-brand\" href=\"#\"><span class=\"title\">{{authService.nombreBarberia}} <img src=\"assets/images/m2.png\" alt=\"Second slide\"></span></a>\n\n    <div class=\"collapse navbar-collapse justify-content-end\" id=\"navbarLogin\">\n        <ul class=\"navbar-nav mr-auto navbar-right\">\n            <li class=\"nav-item active\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged() == false\">\n                <a class=\"nav-link navbar-right\" (click)=\"openModal(template)\">Login</a>\n            </li>\n            <li class=\"nav-item active\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged()\">\n                <a class=\"nav-link navbar-right\" (click)=\"logout()\">Salir</a>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <ul class=\"navbar-nav mr-auto\" *ngIf=\"!authService.isAdminUser() && !authService.isBarberoUser() && !authService.isAdminSucursalUser()\">\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['home']\">Home</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['reserva']\">Reserva</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged()\">\n                <a class=\"nav-link navbar-right\" [routerLink]=\"['info']\">Mi Cuenta</a>\n            </li>\n\n            <li class=\"nav-item d-none d-md-block user-img\"  data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged() && authService.profilePic != ''\">\n                 <img [src]=\"authService.profilePic\"/>               \n            </li>\n           \n        </ul>\n        <ul class=\"navbar-nav mr-auto\" *ngIf=\"authService.isAdminUser() || authService.isBarberoUser() || authService.isAdminSucursalUser()\">\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['home']\">Home</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['configuracion']\">Configuración</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged()\">\n                <a class=\"nav-link navbar-right\" [routerLink]=\"['info']\">Mi Cuenta</a>\n            </li>\n        </ul>\n    </div>\n</nav>\n<div *ngIf=\"authService.isImpersonando\" class=\"impersonando\">\n    Actualmente esta impersonando a {{authService.loggedUser.nombre}} {{authService.loggedUser.apellido1}} {{authService.loggedUser.apellido2}} <span (click)=\"authService.noImpersonar()\">Dejar de impersonar</span>\n</div>\n\n<template #template>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">{{action}}</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <login-view (action)=\"hide()\"  (label)=\"updateAction()\"></login-view>\n    </div>\n</template>"

/***/ }),

/***/ 527:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-space\">\n</div>\n<div class=\"title reserva\">\n  <h5>Reserve su cita</h5>\n</div>\n\n<tabset [justified]=\"true\">  \n  <tab>\n    <template tabHeading>\n      <i class=\"fa fa-home\" aria-hidden=\"true\" #barberia></i>\n    </template>\n    <template [ngIf]=\"!authService.isAppUnica\">\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <span class=\"header-barberia\">Provincia:</span><br>\n          <div class=\"row\">\n            <div class=\"form-group col-12\">\n              <select class=\"form-control\" id=\"provincia\" (change)=\"provinciaChanged($event.target.value)\">\n                <option *ngFor=\"let provincia of provincias;let i = index\" [value]=\"i\">{{provincia}}</option>\n              </select>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <span class=\"header-barberia\">Canton:</span><br>\n          <div class=\"row\">\n            <div class=\"form-group col-12\">\n              <select class=\"form-control\" id=\"canton\" (change)=\"cantonChanged($event.target.value)\">\n                <option *ngFor=\"let canton of cantonesDisplay\" [value]=\"canton.id\">{{canton.canton}}</option>\n              </select>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <span class=\"header-barberia\">Nombre</span><br>\n          <div class=\"row\" *ngIf=\"barberias.length > 0\">\n            <div class=\"form-group col-12\">\n              <input placeholder=\"Nombre de su barberia\" [(ngModel)]=\"selectedLocal\" [typeahead]=\"barberias\" class=\"form-control\" (typeaheadOnSelect)=\"localSelect($event)\" typeaheadOptionField=\"descripcion\">\n            </div>\n            <div class=\"form-group col-12\">\n              <select class=\"styled-select blue semi-square\" id=\"sucursales\" (change)=\"localSelectUnica($event.target.value)\" [ngModel]=\"selectedLocalId\" style=\"height: 34px;\">\n                <option *ngFor=\"let barberia of barberias;\" [value]=\"barberia.id\">{{barberia.descripcion}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"row\" *ngIf=\"barberias.length == 0\">\n            <div class=\"form-group col-12\">\n              No hay barberias disponibles en su cantón.\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <iframe\n            height=\"220\"\n            frameborder=\"0\" style=\"border:0\"\n            [src]=\"url\" allowfullscreen class=\"map col-12\">\n          </iframe>\n        </div>\n      </div>\n      <div class=\"col-12 next\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"goTo('barber')\" [disabled]=\"!validLocal\">\n          Ir a siguiente\n        </button>\n      </div>\n    </template>\n    <template [ngIf]=\"authService.isAppUnica\">\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <span class=\"header-barberia\">Sucursales:</span><br>\n          <div class=\"row\">\n            <div class=\"form-group col-12\">\n              <select class=\"styled-select blue semi-square\" id=\"sucursales\" (change)=\"localSelectUnica($event.target.value)\" style=\"height: 34px;\">\n                <option *ngFor=\"let barberia of barberias;\" [value]=\"barberia.id\">{{barberia.descripcion}}</option>\n              </select>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12 next\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"goTo('barber')\" [disabled]=\"!validLocal\">\n          Ir a siguiente\n        </button>\n      </div>\n    </template>\n  </tab>\n  <tab>\n    <template tabHeading>\n      <i class=\"fa fa-user\" aria-hidden=\"true\" #barber></i>\n    </template>\n    <div class=\"col-12\">\n      <div class=\"col-12 card\">\n        <p class=\"item-action\">Seleccione la persona que quiere para su servicio:</p>\n        <app-barberos (selectBarberDone)=\"selectBarberDone($event)\" [barberiaSelected]=\"reservacion.local.id\"></app-barberos>\n\n        <div class=\"col-12 next\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"goTo('date')\" [disabled]=\"!validBarber\">\n            Ir a siguiente\n          </button>\n        </div>\n      </div>\n    </div>\n  </tab>\n  <tab>\n    <template tabHeading>\n      <i class=\"fa fa-calendar\" aria-hidden=\"true\" #date></i>\n    </template>\n    <div class=\"col-12\">\n      <div class=\"col-12 card date\" [class.active]=\"escojeFecha\">\n        <p class=\"item-action\">Seleccione la fecha que desea para su servicio</p>\n        <p>Fecha: {{dateSelected | date: 'dd/MM/yyyy'}}</p>\n        <app-calendario (dateSelectedChange)=\"dateSelectedChange($event)\"></app-calendario>\n      </div>\n      <div class=\"col-12 card date\" [class.active]=\"!escojeFecha\">\n        <p style=\"overflow: hidden;\"><span style=\"float: left;\">Fecha: {{dateSelected | date: 'dd/MM/yyyy'}}</span> <span style=\"float: right;\"><i class=\"fa fa-undo go-back-date\" aria-hidden=\"true\" (click)=\"escojeFecha=true\"></i></span></p>\n        <p *ngIf=\"reservacion.servicio\">Horarios para citas disponibles este dia:</p>\n        <p *ngIf=\"!reservacion.servicio\">Por Favor seleccione un barbero y un servicio primero</p>\n        <ul class=\"reservas row\">\n          <ng-container *ngFor=\"let reserva of camposLibres\">\n            <li (click)=\"selectReserva(reserva)\" class=\"col-4\">\n              <div [class.active]=\"selectedReserva==reserva\">\n                <p>{{reserva.hora | date:'shortTime'}}</p>\n              </div>\n            </li>\n          </ng-container>\n        </ul>\n        <div class=\"col-12 next\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"goTo('confirmar')\" [disabled]=\"!validReserva\">\n            Ir a siguiente\n          </button>\n        </div>\n      </div>\n    </div>\n  </tab>\n  <tab>\n    <template tabHeading>\n      <i class=\"fa fa-check\" aria-hidden=\"true\" #confirmar></i>\n    </template>\n    <div class=\"col-12\">\n      <div class=\"col-12 card\">\n        <p class=\"item-action\">Por favor confirme su reserva</p>\n        <ul class=\"confirmar-items\">\n          <li><span>Barberia : </span><span *ngIf=\"reservacion.local\">{{reservacion.local.descripcion}}</span></li>\n          <li><span>Barbero : </span><span *ngIf=\"reservacion.barbero\">{{reservacion.barbero.nombre}}</span></li>\n          <li><span>Servicio : </span><span *ngIf=\"reservacion.servicio\">{{reservacion.servicio.descripcion}}</span></li>\n          <li><span>Duración : </span><span *ngIf=\"reservacion.servicio\">{{reservacion.servicio.duracion}} Minutos</span></li>\n          <li><span>Fecha : </span><span *ngIf=\"reservacion.fecha\">{{reservacion.fecha | date: 'mediumDate'}}</span></li>\n          <li><span>Hora : </span><span *ngIf=\"reservacion.hora\">{{reservacion.hora.hora | date:'shortTime'}}</span></li>\n          <li><span>Precio : </span><span *ngIf=\"reservacion.servicio\">{{reservacion.servicio.precio}}</span></li>\n        </ul>\n        <p *ngIf=\"!validReservaTotal\" class=\"error\">\n          Por Favor complete los datos en las otras pestañas\n        </p>\n        <div class=\"col-12 next\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmarReserva(template)\" [disabled]=\"!validReservaTotal\">\n            Confirmar!\n          </button>\n        </div>\n      </div>\n    </div>\n  </tab>\n</tabset>\n<div class=\"cargando\" *ngIf=\"cargando\">\n  <img src=\"assets/images/m2.png\">\n  Cargando...\n</div>\n\n\n<template #template>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">Ingresar</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <login-view (action)=\"hide()\"  (label)=\"updateAction()\"></login-view>\n    </div>\n</template>"

/***/ }),

/***/ 528:
/***/ (function(module, exports) {

module.exports = "<div class=\"\" [style.background]=\"'url(/img/' + card.images[0] + ')'\">\n{{card.title}}\n</div>"

/***/ }),

/***/ 529:
/***/ (function(module, exports) {

module.exports = "<img src=\"assets/images/{{name}}.jpg\" class=\"img-fluid\" (click)=\"lgModal.show()\">\n \n<div bsModal #lgModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\"></h4>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"lgModal.hide()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <img src=\"assets/images/{{name}}.jpg\" class=\"img-fluid\">\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(333);


/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Usuario; });
var Usuario = (function () {
    function Usuario() {
        this.id = 0;
        this.idSucursal = 1;
        this.usuario = "";
        this.nombre = "";
        this.apellido1 = "";
        this.apellido2 = "";
        this.contrasenna = "";
        this.telefono = [];
        this.rol = "";
        this.tipo = "N";
        this.estado = 1;
        this.correo = [];
        this.tiempoBarbero = 20;
        this.servicios = [];
        this.horarios = [];
    }
    return Usuario;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__window_service__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushNotificationsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PushNotificationsService = (function () {
    function PushNotificationsService(windowRef, router) {
        this.windowRef = windowRef;
        this.router = router;
        this._window = windowRef.nativeWindow;
        this.isApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    }
    PushNotificationsService.prototype.initNotifications = function () {
        var _this = this;
        if (this.isApp) {
            this.pushService = this._window.PushNotification.init({
                android: {
                    senderID: 709132659673
                }
            });
            this.pushService.subscribe('all', function () {
                console.log('success subscribe all');
            }, function (e) {
                console.log('error:' + e);
            });
            this.pushService.on('notification', function (data) {
                _this.router.navigateByUrl('/info');
            });
        }
    };
    PushNotificationsService.prototype.agregarTema = function (tema) {
        if (this.isApp) {
            this.pushService.subscribe(tema, function () {
                console.log('success subscribe ' + tema);
            }, function (e) {
                console.log('error:' + e);
            });
        }
    };
    PushNotificationsService.prototype.eliminarTema = function (tema) {
        if (this.isApp) {
            this.pushService.unsubscribe(tema, function () {
                console.log('success unsubscribe ' + tema);
            }, function (e) {
                console.log('error:' + e);
            });
        }
    };
    return PushNotificationsService;
}());
PushNotificationsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__window_service__["a" /* WindowRefService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__window_service__["a" /* WindowRefService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object])
], PushNotificationsService);

var _a, _b;
//# sourceMappingURL=push-notification.service.js.map

/***/ })

},[590]);
//# sourceMappingURL=main.bundle.js.map