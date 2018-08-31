webpackJsonp([1,5],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_usuario__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_telefono__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_correo__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__window_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__push_notification_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_facebook__ = __webpack_require__(114);
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
    AuthService.prototype.emitLoggedNoLogin = function (usuario) {
        this.loggedObservable.next(usuario);
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
    AuthService.prototype.nuevoUsuarioNoLogin = function (usuario) {
        var _this = this;
        usuario.rol = 'U';
        usuario.idSucursal = 1;
        this.errorDisplay = '';
        this.dataService.post('/signup/', { "usuario": usuario })
            .then(function (response) {
            console.log('success', response);
            if (response.error) {
                _this.errorDisplay = 'Por favor seleccione otro usuario.';
                _this.emitLoggedNoLogin(null);
            }
            else {
                var newUser = response.auth.user;
                _this.emitLoggedNoLogin(newUser);
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
            console.log('logged');
            console.log(loggedUser);
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
        this.loggedUser = null;
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

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacturaService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FacturaService = (function () {
    function FacturaService(http) {
        this.http = http;
        this.token = '';
        // public server:string = "http://localhost:82/API/index.php"
        // public server:string = "/API/index.php"
        this.server = "http://kyrapps.com/facturador-api/api/facturador";
        // var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        // if ( app ) {
        //     this.server = "http://lospeluqueros.com/API/index.php";
        // }
    }
    FacturaService.prototype.search = function (url, element) {
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
    FacturaService.prototype.post = function (url, element) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.server + url, JSON.stringify(element), options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FacturaService.prototype.postFile = function (url, element) {
        return this.http.post(this.server + url, JSON.stringify(element), { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* ResponseContentType */].Blob })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FacturaService.prototype.getAll = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.server + url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FacturaService.prototype.get = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.server + url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FacturaService.prototype.delete = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.server + url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FacturaService.prototype.setToken = function (token) {
        this.token = 'Bearer ' + token;
    };
    FacturaService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return FacturaService;
}());
FacturaService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */]) === "function" && _a || Object])
], FacturaService);

var _a;
//# sourceMappingURL=factura.service.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(53);
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
    function DataService(http) {
        this.http = http;
        this.token = '';
        // public server:string = "http://localhost:82/API/index.php"
        // public server:string = "/API/index.php"
        this.server = "http://los-peluqueros.herokuapp.com/API/index.php";
        var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
        if (app) {
            this.server = "http://los-peluqueros.herokuapp.com/API/index.php";
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

/***/ 27:
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

/***/ 28:
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

/***/ 29:
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
    ValidatorService.prototype.validaUsuario = function (usuario, requiereContrasenna) {
        if (requiereContrasenna === void 0) { requiereContrasenna = true; }
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
        if (!this.isNotNull(usuario.contrasenna) && requiereContrasenna) {
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

/***/ 337:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 337;


/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(373);




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

/***/ 34:
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
        this.fechaNacimiento = new Date();
        this.cedula = '';
        this.idProvincia = 0;
        this.idCanton = 0;
        this.barrio = '';
        this.distrito = '';
        this.detalleDireccion = '';
    }
    return Usuario;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_push_notification_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(10);
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
    function AppComponent(ngZone, pushService, authService) {
        this.ngZone = ngZone;
        this.pushService = pushService;
        this.authService = authService;
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
        setTimeout(function () {
            if (that.authService.loggedUser) {
                if (that.authService.loggedUser.telefono.length == 0) {
                    alert('Por Favor agregue su telefono');
                }
            }
        }, 2000);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(533),
        styles: [__webpack_require__(430)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* NgZone */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_push_notification_service__["a" /* PushNotificationsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_push_notification_service__["a" /* PushNotificationsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home_component__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__info_info_component__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__login_login_component__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_carousel_carousel_component__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__nav_nav_component__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__footer_footer_component__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__configuracion_configuracion_component__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__calendario_input_calendario_input_component__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_auth_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_data_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_factura_service__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_shared_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_validator_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_facebook_login_service__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_push_notification_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_ngx_facebook__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ngx_bootstrap_collapse__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ngx_bootstrap_timepicker__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ngx_bootstrap_carousel__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_ngx_bootstrap_accordion__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_ngx_bootstrap_tabs__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_ngx_bootstrap_modal__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_ngx_bootstrap_datepicker__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_ngx_bootstrap_buttons__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_ngx_bootstrap_typeahead__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__reserva_reserva_component__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__reserva_hora_pipe__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__calendario_calendario_component__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_hammerjs__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_36_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__barberos_barberos_component__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__usuarios_usuarios_component__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__citas_citas_component__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__factura_factura_component__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41_ngx_pagination__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_ngx_bootstrap_bs_moment__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43_ngx_bootstrap_locale__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__services_window_service__ = __webpack_require__(41);
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
        component: __WEBPACK_IMPORTED_MODULE_7__home_home_component__["a" /* HomeComponent */]
    },
    {
        path: 'reserva',
        component: __WEBPACK_IMPORTED_MODULE_33__reserva_reserva_component__["a" /* ReservaComponent */]
    },
    {
        path: 'configuracion',
        component: __WEBPACK_IMPORTED_MODULE_13__configuracion_configuracion_component__["a" /* ConfiguracionComponent */]
    },
    {
        path: 'info',
        component: __WEBPACK_IMPORTED_MODULE_8__info_info_component__["a" /* InfoComponent */]
    },
    {
        path: 'clientes',
        component: __WEBPACK_IMPORTED_MODULE_38__usuarios_usuarios_component__["a" /* UsuariosComponent */]
    },
    {
        path: 'citas',
        component: __WEBPACK_IMPORTED_MODULE_39__citas_citas_component__["a" /* CitasComponent */]
    },
    {
        path: 'factura',
        component: __WEBPACK_IMPORTED_MODULE_40__factura_factura_component__["a" /* FacturaComponent */]
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_42_ngx_bootstrap_bs_moment__["a" /* defineLocale */])(__WEBPACK_IMPORTED_MODULE_43_ngx_bootstrap_locale__["a" /* es */].abbr, __WEBPACK_IMPORTED_MODULE_43_ngx_bootstrap_locale__["a" /* es */]);

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_11__nav_nav_component__["a" /* NavComponent */],
            __WEBPACK_IMPORTED_MODULE_12__footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_10__home_carousel_carousel_component__["a" /* CarouselComponent */],
            __WEBPACK_IMPORTED_MODULE_9__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_14__shared__["a" /* SHARED_COMPONENTS */],
            __WEBPACK_IMPORTED_MODULE_33__reserva_reserva_component__["a" /* ReservaComponent */],
            __WEBPACK_IMPORTED_MODULE_35__calendario_calendario_component__["a" /* CalendarioComponent */],
            __WEBPACK_IMPORTED_MODULE_37__barberos_barberos_component__["a" /* BarberosComponent */],
            __WEBPACK_IMPORTED_MODULE_34__reserva_hora_pipe__["a" /* FormatHoraPipe */],
            __WEBPACK_IMPORTED_MODULE_13__configuracion_configuracion_component__["a" /* ConfiguracionComponent */],
            __WEBPACK_IMPORTED_MODULE_8__info_info_component__["a" /* InfoComponent */],
            __WEBPACK_IMPORTED_MODULE_15__calendario_input_calendario_input_component__["a" /* CalendarioInputComponent */],
            __WEBPACK_IMPORTED_MODULE_38__usuarios_usuarios_component__["a" /* UsuariosComponent */],
            __WEBPACK_IMPORTED_MODULE_39__citas_citas_component__["a" /* CitasComponent */],
            __WEBPACK_IMPORTED_MODULE_40__factura_factura_component__["a" /* FacturaComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_41_ngx_pagination__["a" /* NgxPaginationModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */].forRoot(ROUTES, {
                preloadingStrategy: __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* PreloadAllModules */],
                useHash: true
            }),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_24_ngx_bootstrap_collapse__["a" /* CollapseModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_26_ngx_bootstrap_carousel__["a" /* CarouselModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_29_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_30_ngx_bootstrap_datepicker__["a" /* DatepickerModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_27_ngx_bootstrap_accordion__["a" /* AccordionModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_28_ngx_bootstrap_tabs__["a" /* TabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_31_ngx_bootstrap_buttons__["a" /* ButtonsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_32_ngx_bootstrap_typeahead__["a" /* TypeaheadModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_25_ngx_bootstrap_timepicker__["a" /* TimepickerModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_30_ngx_bootstrap_datepicker__["b" /* BsDatepickerModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_23_ngx_facebook__["a" /* FacebookModule */].forRoot()
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */]
        ],
        providers: [
            // { provide: LOCALE_ID, useValue: "es-es" },
            __WEBPACK_IMPORTED_MODULE_44__services_window_service__["a" /* WindowRefService */],
            __WEBPACK_IMPORTED_MODULE_16__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["a" /* DecimalPipe */],
            __WEBPACK_IMPORTED_MODULE_18__services_factura_service__["a" /* FacturaService */],
            __WEBPACK_IMPORTED_MODULE_17__services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_20__services_validator_service__["a" /* ValidatorService */],
            __WEBPACK_IMPORTED_MODULE_21__services_facebook_login_service__["a" /* FacebookLoginService */],
            __WEBPACK_IMPORTED_MODULE_22__services_push_notification_service__["a" /* PushNotificationsService */],
            __WEBPACK_IMPORTED_MODULE_19__services_shared_service__["a" /* SharedService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(33);
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
        this.selectBarberDone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.selectedBarber = '';
        this.selectedServicio = '';
        this.barberos = [];
        this.obteniendoBarberos = false;
        this.tiempos = [];
    }
    BarberosComponent.prototype.ngOnInit = function () {
    };
    BarberosComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.barberiaSelected.currentValue != 0) {
            this.obteniendoBarberos = true;
            this.barberos = [];
            this.selectedBarber = {};
            this.dataService.get('/usuario/?idSucursal=' + changes.barberiaSelected.currentValue)
                .then(function (response) {
                _this.obteniendoBarberos = false;
                _this.barberos = response.usuario;
                if (_this.barberos.length == 1) {
                    _this.selectedBarber = _this.barberos[0];
                    if (_this.selectedBarber.servicios.length == 1) {
                        _this.selectedServicio = _this.selectedBarber.servicios[0];
                        _this.selectBarberDone.emit({ 'servicio': _this.selectedServicio, 'barber': _this.selectedBarber });
                    }
                    var veces = 1;
                    _this.tiempos = [];
                    while (veces < 20) {
                        _this.tiempos.push(_this.selectedBarber.tiempoBarbero * veces);
                        veces++;
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
        this.selectedBarber = barber;
        if (this.selectedBarber.servicios.length == 1) {
            this.selectedServicio = this.selectedBarber.servicios[0];
            // this.selectBarberDone.emit({'servicio':this.selectedServicio,'barber':this.selectedBarber});
        }
        var veces = 1;
        this.tiempos = [];
        while (veces < 20) {
            this.tiempos.push(this.selectedBarber.tiempoBarbero * veces);
            veces++;
        }
    };
    BarberosComponent.prototype.selectServicio = function (servicio, dinamico) {
        this.selectedServicio = servicio;
        var valid = true;
        if (dinamico) {
            valid = false;
            if (isNaN(this.selectedServicio.precioDinamico)) {
                alert('Revise el precio del Servicio.');
            }
            else if (isNaN(this.selectedServicio.duracionDinamica)) {
                alert('Revise la duración del Servicio.');
            }
            else if (this.selectedServicio.descripcionDinamica == '' || this.selectedServicio.descripcionDinamica == undefined || this.selectedServicio.descripcionDinamica == null) {
                alert('Revise la descripción del Servicio.');
            }
            else {
                valid = true;
                this.selectedServicio.precio = this.selectedServicio.precioDinamico;
                this.selectedServicio.descripcion = this.selectedServicio.descripcionDinamica;
                this.selectedServicio.duracion = this.selectedServicio.duracionDinamica;
            }
        }
        if ((!this.selectedServicio.esDinamico || dinamico) && valid) {
            this.selectBarberDone.emit({ 'servicio': this.selectedServicio, 'barber': this.selectedBarber, 'changed': true });
        }
    };
    BarberosComponent.prototype.confirmar = function () {
        //this.router.navigate(['results']);
    };
    BarberosComponent.prototype.isFB = function (usuario) {
        return !isNaN(usuario);
    };
    BarberosComponent.prototype.convertMinsToHrsMins = function (mins) {
        if (mins > 60) {
            var tiempo = 'Horas';
            var h = Math.floor(mins / 60);
            var m = mins % 60;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            return h + ":" + m + " " + tiempo;
        }
        else {
            return mins + " Minutos";
        }
    };
    return BarberosComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], BarberosComponent.prototype, "barberiaSelected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], BarberosComponent.prototype, "isRegularUser", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _a || Object)
], BarberosComponent.prototype, "selectBarberDone", void 0);
BarberosComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-barberos',
        template: __webpack_require__(534),
        styles: [__webpack_require__(431)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */]) === "function" && _c || Object])
], BarberosComponent);

var _a, _b, _c;
//# sourceMappingURL=barberos.component.js.map

/***/ }),

/***/ 355:
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
        this.dateSelectedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
    }
    CalendarioInputComponent.prototype.ngOnChanges = function (changes) {
        if (changes.daterecive) {
            this.bsValue = new Date(changes.daterecive.currentValue);
        }
    };
    Object.defineProperty(CalendarioInputComponent.prototype, "bsValue", {
        get: function () {
            return this._bsValue;
        },
        set: function (v) {
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Output */])(),
    __metadata("design:type", Object)
], CalendarioInputComponent.prototype, "dateSelectedChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], CalendarioInputComponent.prototype, "daterecive", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], CalendarioInputComponent.prototype, "customClass", void 0);
CalendarioInputComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'calendario-input',
        template: __webpack_require__(535),
        styles: [__webpack_require__(432)]
    }),
    __metadata("design:paramtypes", [])
], CalendarioInputComponent);

//# sourceMappingURL=calendario-input.component.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_locale_es__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment_locale_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment_locale_es__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(10);
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
    function CalendarioComponent(authService) {
        this.authService = authService;
        this.dateSelectedChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
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
        if (this.authService.isAdminSucursalUser()) {
            (this.minDate = null);
        }
        else {
            (this.minDate = new Date()).setDate(this.minDate.getDate());
        }
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], CalendarioComponent.prototype, "dateSelected", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Output */])(),
    __metadata("design:type", Object)
], CalendarioComponent.prototype, "dateSelectedChange", void 0);
CalendarioComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-calendario',
        template: __webpack_require__(536),
        styles: [__webpack_require__(433)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], CalendarioComponent);

var _a;
//# sourceMappingURL=calendario.component.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_factura_service__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_window_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_validator_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_shared_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_usuario__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_telefono__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_correo__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CitasComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};












var CitasComponent = (function () {
    function CitasComponent(modalService, authService, validatorService, dataService, windowRef, facturaService, sharedService, decimalPipe) {
        this.modalService = modalService;
        this.authService = authService;
        this.validatorService = validatorService;
        this.dataService = dataService;
        this.windowRef = windowRef;
        this.facturaService = facturaService;
        this.sharedService = sharedService;
        this.decimalPipe = decimalPipe;
        this.displayCitas = false;
        this.correosUsuarioDisplay = [];
        this.telefonosUsuarioDisplay = [];
        this.correosBarberoDisplay = [];
        this.telefonosBarberoDisplay = [];
        this.Object = Object;
        this.cargandoCitas = false;
        this.reservas = [];
        this.sucursal = [];
        this.selectedDate = new Date();
        this.displayCitasBarberia = true;
        this.selectedDateBarberia = new Date();
        this.resumenFechaFinal = '';
        this.resumenFechaInicial = '';
        this.reservasResumen = [];
        this.resumenGenerado = false;
        this.cantidadCitas = 0;
        this.ganancias = 0;
        this.cargando = true;
        this.mostrarModificar = false;
        this.nuevoUsuario = new __WEBPACK_IMPORTED_MODULE_8__models_usuario__["a" /* Usuario */]();
        this.usuarioErrores = [];
        this.validationError = false;
        this.validationErrorMsg = '';
        this.selectedCita = {};
        this.selectedDateNoFormat = '';
        this.today = new Date();
        this.facturaHacienda = {};
        this.selectedProvincia = {};
        this.selectedCanton = {};
    }
    CitasComponent.prototype.ngOnInit = function () {
        if (window.screen.width > 900) {
            this.displayCitas = true;
            this.displayCitasBarberia = true;
        }
        var that = this;
        var time = (that.authService.loggedUser) ? 0 : 2000;
        setTimeout(function () {
            if (that.authService.isBarberoUser()) {
                that.cargandoCitas = true;
                that.dataService.get('/reserva/?idUsuarioBarbero=' + that.authService.loggedUser.id + '&fecha=' + that.selectedDate.getFullYear() + '-' + that.zerofill(that.selectedDate.getMonth(), 1) + '-' + that.zerofill(that.selectedDate.getDate(), 0))
                    .then(function (response) {
                    that.reservas = that.updateTimeToHora(response.reserva);
                    that.cargandoCitas = false;
                }, function (error) {
                });
            }
            if (!that.authService.isBarberoUser() && !that.authService.isAdminUser()) {
                that.cargandoCitas = true;
                that.dataService.get('/reserva/?idUsuarioReserva=' + that.authService.loggedUser.id)
                    .then(function (response) {
                    that.reservas = that.updateTimeToHora(response.reserva);
                    that.cargandoCitas = false;
                }, function (error) {
                });
            }
            if (that.authService.isAdminSucursalUser()) {
                //that.obtieneCitasBarberia(that);
            }
            that.sharedService.get('/api/ubicacion').then(function (data) {
                that.selectedProvincia = data.ubicacion[Number(that.authService.loggedUser.idProvincia) - 1];
                that.selectedCanton = that.selectedProvincia.cantones[Number(that.authService.loggedUser.idCanton) - 1];
                that.cargando = false;
            }, function (error) {
                console.log('error', error);
            });
        }, time);
    };
    CitasComponent.prototype.obtieneInfo = function (cita) {
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
        this.obtenerInfoUsuario(cita.idUsuarioReserva);
    };
    CitasComponent.prototype.obtenerInfoUsuario = function (id) {
        var _this = this;
        this.dataService.get('/usuario/' + id)
            .then(function (response) {
            _this.telefonosUsuarioDisplay = response.usuario.telefono;
            _this.correosUsuarioDisplay = response.usuario.correo;
            _this.nuevoUsuario = response.usuario;
        }, function (error) {
        });
    };
    CitasComponent.prototype.changeBarbero = function (id) {
        this.selectedBarbero = id;
    };
    CitasComponent.prototype.convierteTiempo = function (horaParam) {
        var hora = horaParam + '';
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
    CitasComponent.prototype.changeDate = function (option) {
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
        this.cargandoCitas = true;
        this.dataService.get('/reserva/?' + param + '=' + this.authService.loggedUser.id + '&fecha=' + this.selectedDate.getFullYear() + '-' + this.zerofill(this.selectedDate.getMonth(), 1) + '-' + this.zerofill(this.selectedDate.getDate(), 0))
            .then(function (response) {
            _this.reservas = _this.updateTimeToHora(response.reserva);
            _this.cargandoCitas = false;
        }, function (error) {
        });
    };
    CitasComponent.prototype.changeDateBarberia = function (fecha) {
        if (this.selectedDateNoFormat != fecha) {
            var newDate = new Date(fecha);
            newDate.setDate(newDate.getDate() + 1);
            this.selectedDateBarberia = newDate;
            this.selectedDateNoFormat = fecha;
            this.obtieneCitasBarberia(this);
        }
    };
    CitasComponent.prototype.changeDateBarberia1 = function (option) {
        if (option === "more") {
            var newDate = new Date(this.selectedDateBarberia.getTime());
            newDate.setDate(newDate.getDate() + 1);
            this.selectedDateBarberia = newDate;
        }
        else {
            var newDate = new Date(this.selectedDateBarberia.getTime());
            newDate.setDate(newDate.getDate() - 1);
            this.selectedDateBarberia = newDate;
        }
        this.obtieneCitasBarberia(this);
    };
    CitasComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    CitasComponent.prototype.zerofill = function (i, add) {
        i = i + add;
        return ((i < 10 ? '0' : '') + i);
    };
    CitasComponent.prototype.updateTimeToHora = function (pausas) {
        for (var i = pausas.length - 1; i >= 0; i--) {
            pausas[i].horaInicialFormat = Number(pausas[i].horaInicial.substring(0, 2) + pausas[i].horaInicial.substring(3, 5));
        }
        return pausas;
    };
    CitasComponent.prototype.obtieneCitasBarberia = function (that) {
        that.obteniendoBarberos = true;
        that.cargando = true;
        that.barberosCitasSucursal = [];
        that.dataService.get('/usuario/?idSucursal=' + that.authService.loggedUser.idSucursal)
            .then(function (response) {
            that.obteniendoBarberos = false;
            var barberosSucursal = response.usuario;
            if (barberosSucursal.length != 0) {
                that.selectedBarbero = barberosSucursal[0].id;
                var obtenerCitas = function (i) {
                    var barberoCitas = { barbero: null, citas: [] };
                    barberoCitas.barbero = barberosSucursal[i];
                    that.dataService.get('/reserva/?idUsuarioBarbero=' + barberosSucursal[i].id + '&fecha=' + that.selectedDateBarberia.getFullYear() + '-' + that.zerofill(that.selectedDateBarberia.getMonth(), 1) + '-' + that.zerofill(that.selectedDateBarberia.getDate(), 0))
                        .then(function (response) {
                        barberoCitas.citas = that.updateTimeToHora(response.reserva);
                        that.barberosCitasSucursal.push(barberoCitas);
                        if (i + 1 < barberosSucursal.length) {
                            obtenerCitas(i + 1);
                        }
                        else {
                            that.obteniendoBarberos = false;
                            that.cargando = false;
                        }
                    }, function (error) {
                    });
                };
                obtenerCitas(0);
            }
        }, function (error) {
        });
    };
    CitasComponent.prototype.convertMinsToHrsMins = function (mins) {
        if (mins > 60) {
            var tiempo = 'Horas';
            var h = Math.floor(mins / 60);
            var m = mins % 60;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            return h + ":" + m + " " + tiempo;
        }
        else {
            return mins + " Minutos";
        }
    };
    CitasComponent.prototype.fechaInicialChanges = function (event) {
        if (event != "--") {
            this.resumenFechaInicial = event;
        }
    };
    CitasComponent.prototype.fechaFinalChanges = function (event) {
        if (event != "--") {
            this.resumenFechaFinal = event;
        }
    };
    CitasComponent.prototype.generar = function () {
        var _this = this;
        var barberoId = this.authService.loggedUser.id;
        //console.log('is admin',this.authService.isAdminSucursalUser());
        if (this.authService.isAdminSucursalUser()) {
            //console.log(this.selectedBarbero);
            barberoId = this.selectedBarbero;
        }
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
            this.dataService.get('/reserva/?idUsuarioBarbero=' + barberoId + '&fechaInicial=' + this.resumenFechaInicial + '&fechaFinal=' + this.resumenFechaFinal)
                .then(function (response) {
                _this.reservasResumen = response.reserva;
                _this.cantidadCitas = _this.reservasResumen.length;
                for (var i = _this.reservasResumen.length - 1; i >= 0; i--) {
                    var ganancia = (_this.reservasResumen[i].esDinamico == 1) ? _this.reservasResumen[i].precioDinamico : _this.reservasResumen[i].precio;
                    _this.ganancias += Number(ganancia);
                }
                _this.resumenGenerado = true;
                _this.cargando = false;
            }, function (error) {
            });
        }
    };
    CitasComponent.prototype.updateUser = function () {
        var _this = this;
        this.usuarioErrores = this.validatorService.validaUsuario(this.nuevoUsuario, false);
        console.log(this.usuarioErrores);
        if (this.usuarioErrores.length == 0) {
            this.dataService.post('/usuario/?method=put', { 'usuario': this.nuevoUsuario })
                .then(function (response) {
                alert('Información actualizada');
                _this.cargando = false;
                _this.mostrarModificar = false;
                _this.obtenerInfoUsuario(_this.nuevoUsuario.id);
                // this.encontroUsuario = false;
                // this.buscaUsuario = '';
            }, function (error) {
                _this.cargando = false;
            });
        }
    };
    CitasComponent.prototype.visualizarModificar = function () {
        this.mostrarModificar = true;
    };
    CitasComponent.prototype.mayorQueHoy = function (date) {
        var dateCita = new Date(date);
        var hoy = new Date();
        return (dateCita > hoy);
    };
    CitasComponent.prototype.igualQueHoy = function (date) {
        var dateCita = new Date(date);
        dateCita.setMinutes(0, 0, 0);
        var hoy = new Date();
        hoy.setMinutes(0, 0, 0);
        return (dateCita = hoy);
    };
    CitasComponent.prototype.addTelefono = function () {
        this.validationError = false;
        var nuevoTelefono = '' + this.nuevoTelefono;
        if (nuevoTelefono.length == 8) {
            var tel = new __WEBPACK_IMPORTED_MODULE_9__models_telefono__["a" /* Telefono */]();
            tel.telefono = this.nuevoTelefono + '';
            if (!this.nuevoUsuario.telefono)
                this.nuevoUsuario.telefono = [];
            this.nuevoUsuario.telefono.push(tel);
            this.nuevoTelefono = null;
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del telefono";
        }
    };
    CitasComponent.prototype.removeTelefono = function (telefono) {
        this.nuevoUsuario.telefono = this.nuevoUsuario.telefono.filter(function (el) {
            return el.telefono !== telefono.telefono;
        });
    };
    CitasComponent.prototype.addCorreo = function () {
        this.validationError = false;
        if (this.validatorService.emailValid(this.nuevoCorreo)) {
            var cor = new __WEBPACK_IMPORTED_MODULE_10__models_correo__["a" /* Correo */]();
            cor.correo = this.nuevoCorreo + '';
            if (!this.nuevoUsuario.correo)
                this.nuevoUsuario.correo = [];
            this.nuevoUsuario.correo.push(cor);
            this.nuevoCorreo = null;
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del correo";
        }
    };
    CitasComponent.prototype.removeCorreo = function (correo) {
        this.nuevoUsuario.correo = this.nuevoUsuario.correo.filter(function (el) {
            return el.correo !== correo.correo;
        });
    };
    CitasComponent.prototype.updateReserva = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var fact;
            return __generator(this, function (_a) {
                //await this.facturacionHacienda();
                console.log('factura hacienda', this.facturaHacienda);
                fact = this.facturaHacienda;
                // var that = this;
                // fact.con = true;
                // that.facturaService.post('',fact)
                // .then(res => {
                // 	console.log('res',res);
                // 	fact.con = false;
                // 	this.selectedCita.consecutivo = res.resp.consecutivo;
                // 	this.selectedCita.clave = res.resp.clave;
                // 	that.genLetter(function(doc){
                // 		var blob = doc.output("blob");
                //     	that.blobToBase64(blob,function(base){
                // 			fact.facturabase = {
                // 				base: base
                // 			};
                // 			that.facturaService.post('',fact)
                // 			.then(res => {
                // 				console.log('res',res);
                // 				if(res.respuesta == "aceptado"){
                this.selectedCita.consecutivo = '';
                this.selectedCita.clave = '';
                this.selectedCita.estadoFactura = 'P';
                this.dataService.post('/reserva/?method=put', { 'reserva': this.selectedCita })
                    .then(function (response) {
                    alert('Información actualizada');
                    // alert('Factura Generada');
                    _this.cargando = false;
                    console.log(response);
                }, function (error) {
                    // alert('Factura Generada | Error al actualizar el estado. ' + error);
                    _this.cargando = false;
                    _this.selectedCita.estadoFactura = 'R';
                });
                return [2 /*return*/];
            });
        });
    };
    CitasComponent.prototype.eliminarCita = function () {
        var _this = this;
        this.dataService.delete('/reserva/' + this.selectedCita.id)
            .then(function (response) {
        }, function (error) {
            _this.reservas = _this.reservas.filter(function (el) { return (el.id != _this.selectedCita.id); });
            _this.obtieneCitasBarberia(_this);
            _this.modalRef.hide();
        });
    };
    CitasComponent.prototype.obtenerDatosBarberia = function () {
        return this.dataService.get('/sucursal/' + this.authService.loggedUser.idSucursal);
    };
    CitasComponent.prototype.facturacionHacienda = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sucursal, usuarios;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.obtenerDatosBarberia()];
                    case 1:
                        sucursal = _a.sent();
                        //console.log('suc',sucursal);
                        this.sucursal = sucursal[0];
                        this.facturaHacienda.factura = {};
                        this.facturaHacienda.cliente = {};
                        this.facturaHacienda.factura.emisor = {};
                        this.facturaHacienda.factura.receptor = {};
                        this.facturaHacienda.factura.detalles = {};
                        this.facturaHacienda.factura.fecha = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString();
                        this.facturaHacienda.factura.nombreComercial = this.sucursal.nombreNegocio; //nombre barberia
                        this.facturaHacienda.factura.situacion = 'normal';
                        this.facturaHacienda.factura.emisor.nombre = this.sucursal.descripcion; // nombre del negocio
                        this.facturaHacienda.factura.emisor.tipoId = '02';
                        this.facturaHacienda.factura.emisor.id = this.sucursal.cedulaJuridica;
                        this.facturaHacienda.factura.emisor.provincia = this.sucursal.provincia;
                        this.facturaHacienda.factura.emisor.canton = this.sucursal.idCanton;
                        this.facturaHacienda.factura.emisor.distrito = this.sucursal.distrito;
                        this.facturaHacienda.factura.emisor.barrio = this.sucursal.barrio;
                        this.facturaHacienda.factura.emisor.senas = this.sucursal.detalleDireccion;
                        this.facturaHacienda.factura.emisor.codigoPaisTel = '506';
                        this.facturaHacienda.factura.emisor.tel = this.sucursal.telefono[0].telefono;
                        this.facturaHacienda.factura.emisor.codigoPaisFax = '';
                        this.facturaHacienda.factura.emisor.fax = '';
                        this.facturaHacienda.factura.emisor.email = this.sucursal.correo[0].correo;
                        if (!(this.nuevoUsuario.nombre != 'generico' && ((this.nuevoUsuario.nombre && this.nuevoUsuario.apellido1 && this.nuevoUsuario.apellido2) || this.nuevoUsuario.cedula))) return [3 /*break*/, 4];
                        this.facturaHacienda.factura.receptor.nombre = this.nuevoUsuario.nombre + this.nuevoUsuario.apellido1 + this.nuevoUsuario.apellido2;
                        this.facturaHacienda.factura.receptor.tipoId = '01';
                        if (!(!this.nuevoUsuario.cedula && this.nuevoUsuario.nombre && this.nuevoUsuario.apellido1 && this.nuevoUsuario.apellido2)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (this.sharedService.get('/api/personas?tipo=nombre&nombre=' + this.nuevoUsuario.nombre + '&apellido1=' + this.nuevoUsuario.apellido1 + '&apellido2=' + this.nuevoUsuario.apellido2))];
                    case 2:
                        usuarios = _a.sent();
                        if (usuarios.persona[0].length == 1) {
                            this.nuevoUsuario.cedula == usuarios.persona[0].cedula;
                        }
                        _a.label = 3;
                    case 3:
                        this.facturaHacienda.factura.receptor.id = this.nuevoUsuario.cedula;
                        this.facturaHacienda.factura.receptor.provincia = this.nuevoUsuario.idProvincia;
                        this.facturaHacienda.factura.receptor.canton = this.nuevoUsuario.idCanton;
                        this.facturaHacienda.factura.receptor.distrito = this.nuevoUsuario.distrito;
                        this.facturaHacienda.factura.receptor.barrio = '01';
                        this.facturaHacienda.factura.receptor.senas = 'senas';
                        this.facturaHacienda.factura.receptor.codigoPaisTel = '506';
                        this.facturaHacienda.factura.receptor.tel = this.nuevoUsuario.telefono[0].telefono;
                        this.facturaHacienda.factura.receptor.codigoPaisFax = '';
                        this.facturaHacienda.factura.receptor.fax = '';
                        this.facturaHacienda.factura.receptor.email = this.nuevoUsuario.correo[0].correo;
                        this.facturaHacienda.factura.omitirReceptor = 'false';
                        return [3 /*break*/, 5];
                    case 4:
                        this.facturaHacienda.factura.omitirReceptor = 'true';
                        _a.label = 5;
                    case 5:
                        this.facturaHacienda.factura.condicionVenta = '01';
                        this.facturaHacienda.factura.plazoCredito = '0';
                        this.facturaHacienda.factura.medioPago = '01';
                        this.facturaHacienda.factura.codMoneda = 'CRC';
                        this.facturaHacienda.factura.tipoCambio = '1';
                        this.facturaHacienda.factura.totalServGravados = '0';
                        this.facturaHacienda.factura.totalServExentos = this.selectedCita.precio; //total del servicio
                        this.facturaHacienda.factura.totalMercGravada = '0';
                        this.facturaHacienda.factura.totalMercExenta = '0';
                        this.facturaHacienda.factura.totalGravados = '0';
                        this.facturaHacienda.factura.totalExentos = this.selectedCita.precio; //total del servicio
                        this.facturaHacienda.factura.totalVentas = this.selectedCita.precio; //total del servicio
                        this.facturaHacienda.factura.totalDescuentos = '0';
                        this.facturaHacienda.factura.totalVentasNeta = this.selectedCita.precio; //total del servicio
                        this.facturaHacienda.factura.totalImpuestos = 'normal';
                        this.facturaHacienda.factura.totalComprobante = this.selectedCita.precio; //total del servicio
                        this.facturaHacienda.factura.otros = 'Gracias.';
                        this.facturaHacienda.factura.detalles['1'] = {};
                        this.facturaHacienda.factura.detalles['1'].cantidad = '1';
                        this.facturaHacienda.factura.detalles['1'].unidadMedida = 'Sp.';
                        this.facturaHacienda.factura.detalles['1'].detalle = this.selectedCita.servicio;
                        this.facturaHacienda.factura.detalles['1'].precioUnitario = this.selectedCita.precio;
                        this.facturaHacienda.factura.detalles['1'].montoTotal = this.selectedCita.precio;
                        this.facturaHacienda.factura.detalles['1'].subtotal = this.selectedCita.precio;
                        this.facturaHacienda.factura.detalles['1'].montoTotalLinea = this.selectedCita.precio;
                        this.facturaHacienda.cliente.id = this.sucursal.idFacturaAPI; // "5b79d789cd22f43682adeada";//
                        return [2 /*return*/];
                }
            });
        });
    };
    CitasComponent.prototype.paseDate = function (date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var parsed = dd + '/' + mm + '/' + yyyy;
        return parsed;
    };
    CitasComponent.prototype.truncate = function (str, limit) {
        var bits, i;
        bits = str.split('');
        if (bits.length > limit) {
            for (i = bits.length - 1; i > -1; --i) {
                if (i > limit) {
                    bits.length = i;
                }
                else if (' ' === bits[i]) {
                    bits.length = i;
                    break;
                }
            }
            bits.push('...');
        }
        return bits.join('');
    };
    CitasComponent.prototype.genLetter = function (cb) {
        var that = this;
        var doc;
        var img = new Image();
        img.addEventListener('load', function () {
            // header
            // var pags = Math.ceil(that.factura.items.length / 32); -> se usa en caso de tener mas de un item
            var pags = 1;
            console.log(window.jsPDF);
            doc = new window.jsPDF('p', 'pt', 'letter');
            // var i = 0;
            // console.log('j',j,pags);
            var j = 0;
            var o, f, temparray, chunk = 32;
            for (o = 0, f = 1; o < f; o += chunk) {
                // temparray = that.factura.items.slice(o,o+chunk);
                // console.log(temparray);
                // for (var j = 0 ; j < pags; j++) {
                console.log('looped', i, pags);
                doc.setFont("helvetica");
                doc.setFontType("bold");
                doc.setFontSize("12");
                doc.text(that.sucursal.nombreNegocio, 100, 20);
                doc.setFont("helvetica");
                doc.setFontType("normal");
                doc.setFontSize("8");
                doc.text(that.selectedCanton.nombre + ', ' + that.selectedProvincia.nombre, 100, 35);
                doc.text('Tel. ' + that.sucursal.telefono[0].telefono, 100, 45);
                doc.text(that.sucursal.correo[0].correo, 100, 55);
                // if(that.sucursal.paginaWeb){ --> si la barberia tiene pagina web
                // 	doc.text(that.sucursal.paginaWeb, 100, 65);
                // }
                img.width = 80;
                img.height = 80;
                doc.addImage(img, 'png', 25, 10);
                // fin header
                // numero factura
                doc.setFont("helvetica");
                doc.setFontType("bold");
                doc.setFontSize("12");
                doc.text('Factura No', 25, 120);
                var con = that.selectedCita.consecutivo || 'Sin consecutivo';
                doc.text(con, 100, 120);
                doc.text('Fecha', 25, 140);
                doc.text(that.selectedCita.dia + ': ' + that.selectedCita.horaInicial, 100, 140);
                // fin numero factura
                // cliente 
                // doc.setFillColor(191,191,191);
                doc.rect(300, 100, 250, 58);
                doc.text('Cliente', 310, 115);
                doc.setFont("helvetica");
                doc.setFontType("normal");
                doc.setFontSize("10");
                doc.text('Nombre', 310, 130);
                if (that.selectedCita.nombreUserReserva != '' || that.selectedCita.nombreUserReserva != 'generico') {
                    doc.text(that.selectedCita.nombreUserReserva + ' ' +
                        that.selectedCita.primerApellidoUserReserva + ' ' +
                        that.selectedCita.segundoApellidoUserReserva, 380, 130);
                    if (that.selectedCita.cedula) {
                        doc.text('Cedula', 310, 145);
                        doc.text('' + that.selectedCita.cedula, 380, 145);
                    }
                }
                else {
                    doc.text('Factura sin cliente', 380, 130);
                }
                // fin cliente
                // tabla productos
                doc.rect(25, 200, 560, 430);
                doc.setFillColor(191, 191, 191);
                doc.rect(26, 201, 558, 13, 'F');
                var x = 26, y = 214;
                for (var i = 0; i < 32; i++) {
                    if (i % 2 == 0) {
                        doc.setFillColor(204, 217, 255);
                    }
                    else {
                        doc.setFillColor(255, 255, 255);
                    }
                    doc.rect(x, y, 558, 13, 'F');
                    y += 13;
                }
                doc.setDrawColor(255, 255, 255);
                doc.setLineWidth(1.5);
                doc.line(280, 200, 280, 700);
                doc.line(330, 200, 330, 700);
                doc.line(400, 200, 400, 700);
                doc.line(480, 200, 480, 700);
                doc.setFontSize("8");
                doc.text('Detalle', 47, 210);
                doc.text('Cantidad', 290, 210);
                doc.text('Descuento', 345, 210);
                doc.text('Precio und', 420, 210);
                doc.text('Precio', 520, 210);
                // fin tabla productos
                // agregar productos
                y = 223;
                // for (var i = temparray.length - 1; i >= 0; i--) {
                doc.text('' + that.selectedCita.servicio, 45, y, 'left');
                doc.text('1', 310, y, 'right');
                doc.text(that.toDecimals(0), 380, y, 'right');
                doc.text(that.toDecimals(that.selectedCita.precio), 460, y, 'right');
                doc.text(that.toDecimals(that.selectedCita.precio), 550, y, 'right');
                y += 13;
                // }
                // fin agregar productos
                // total
                if (that.sucursal.pieFactura) {
                    console.log('split text', that.sucursal.pieFactura);
                    var splitTitle = doc.splitTextToSize(that.sucursal.pieFactura, 200);
                    doc.text(splitTitle, 35, 670);
                }
                // var splitTitle = doc.splitTextToSize("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 200);
                // doc.text(splitTitle, 35, 670);
                doc.setFontSize("10");
                doc.setFontType("bold");
                doc.text('Total Bruto', 400, 670);
                doc.setFontType("normal");
                doc.text(that.toDecimals(that.selectedCita.precio), 560, 670, 'right');
                doc.text('Descuento', 400, 690);
                doc.text(that.toDecimals(0), 560, 690, 'right');
                doc.text('Total Neto', 400, 710);
                doc.text(that.toDecimals(that.selectedCita.precio), 560, 710, 'right');
                doc.text('Impuestos', 400, 730);
                doc.text(that.toDecimals(0), 560, 730, 'right');
                doc.setFontSize("11");
                doc.setFontType("bold");
                doc.text('Total Factura', 400, 750);
                doc.text(that.toDecimals(that.selectedCita.precio), 560, 750, 'right');
                doc.text('Pag. ' + (j + 1) + ' de ' + pags, 540, 15);
                if (j < pags - 1) {
                    doc.addPage();
                }
                j++;
            }
            // fin total
            cb(doc);
        });
        var imgName = this.sucursal.logoName || 'kyr.jpg';
        img.src = 'assets/' + imgName;
    };
    CitasComponent.prototype.blobToBase64 = function (blob, cb) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            cb(base64);
        };
        reader.readAsDataURL(blob);
    };
    CitasComponent.prototype.calculaTotalItem = function (fi) {
        return fi.precioUnitario * fi.cantidad - fi.montoDescuento + ((fi.precioUnitario * fi.cantidad - fi.montoDescuento) * fi.impuestos / 100);
    };
    CitasComponent.prototype.descuentoPorProducto = function (productoItem) {
        var totalDescuento = productoItem.montoDescuento * productoItem.cantidad;
        return totalDescuento;
    };
    CitasComponent.prototype.dottedLine = function (doc, xFrom, yFrom, xTo, yTo, segmentLength) {
        // Calculate line length (c)
        var a = Math.abs(xTo - xFrom);
        var b = Math.abs(yTo - yFrom);
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        // Make sure we have an odd number of line segments (drawn or blank)
        // to fit it nicely
        var fractions = c / segmentLength;
        var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));
        // Calculate x, y deltas per segment
        var deltaX = adjustedSegmentLength * (a / c);
        var deltaY = adjustedSegmentLength * (b / c);
        var curX = xFrom, curY = yFrom;
        while (curX <= xTo && curY <= yTo) {
            doc.line(curX, curY, curX + deltaX, curY + deltaY);
            curX += 2 * deltaX;
            curY += 2 * deltaY;
        }
    };
    CitasComponent.prototype.toDecimals = function (num) {
        return this.decimalPipe.transform(num, '1.2-2');
    };
    return CitasComponent;
}());
CitasComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-citas',
        template: __webpack_require__(537),
        styles: [__webpack_require__(434)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_validator_service__["a" /* ValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_validator_service__["a" /* ValidatorService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_window_service__["a" /* WindowRefService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_window_service__["a" /* WindowRefService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_factura_service__["a" /* FacturaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_factura_service__["a" /* FacturaService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_shared_service__["a" /* SharedService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_11__angular_common__["a" /* DecimalPipe */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__angular_common__["a" /* DecimalPipe */]) === "function" && _h || Object])
], CitasComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=citas.component.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_validator_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_data_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_usuario__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_telefono__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_correo__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__ = __webpack_require__(24);
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
        this.nuevoServicio = {
            esDinamico: false
        };
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
        this.opcionesDuracion = [];
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
                        if (_this.barberos.length > 0) {
                            _this.opcionesDuracion = [];
                            for (var i = 1; i < 6; i++) {
                                _this.opcionesDuracion.push(_this.barberos[0].tiempoBarbero * i);
                            }
                        }
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
                        if (_this.barberos.length > 0) {
                            _this.opcionesDuracion = [];
                            for (var i = 1; i < 6; i++) {
                                _this.opcionesDuracion.push(_this.barberos[0].tiempoBarbero * i);
                            }
                        }
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
            this.opcionesDuracion = [];
            for (var i = 1; i < 6; i++) {
                this.opcionesDuracion.push(this.authService.loggedUser.tiempoBarbero * i);
            }
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
            if (_this.barberos.length > 0) {
                _this.opcionesDuracion = [];
                for (var i = 1; i < 6; i++) {
                    _this.opcionesDuracion.push(_this.barberos[0].tiempoBarbero * i);
                }
            }
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
        console.log('nuevoBarbero');
        console.log(this.nuevoBarbero);
        this.opcionesDuracion = [];
        for (var i = 1; i < 6; i++) {
            this.opcionesDuracion.push(this.nuevoBarbero.tiempoBarbero * i);
        }
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
        this.opcionesDuracion = [];
        for (var i = 1; i < 6; i++) {
            this.opcionesDuracion.push(this.nuevoBarbero.tiempoBarbero * i);
        }
    };
    ConfiguracionComponent.prototype.actualizaSucursalSelected = function () {
        var _this = this;
        this.barberoErrores = [];
        this.barberiaErrores = [];
        this.servicioErrores = [];
        this.nuevaBarberia = Object.assign({}, this.sucursales.find(function (o) { return o.id == _this.selectedBarberiaId; }));
        if (this.barberos.length > 0) {
            this.opcionesDuracion = [];
            for (var i = 1; i < 6; i++) {
                this.opcionesDuracion.push(this.barberos[0].tiempoBarbero * i);
            }
        }
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
                        if (_this.barberos.length > 0) {
                            _this.opcionesDuracion = [];
                            for (var i = 1; i < 6; i++) {
                                _this.opcionesDuracion.push(_this.barberos[0].tiempoBarbero * i);
                            }
                        }
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
            this.cargando = true;
            //this.nuevaBarberia.descripcion = this.nuevaBarberia.descripcion.replace("'","\'");
            //this.nuevaBarberia.nombreNegocio = this.nuevaBarberia.nombreNegocio.replace("'","\'");
            //this.nuevaBarberia.descripcion = 	this.nuevaBarberia.descripcion.replace(/[']/g, "/'");;
            //console.log(this.nuevaBarberia.descripcion, 'kim');
            //this.nuevaBarberia.descripcion = this.nuevaBarberia.descripcion.replace("'","\'");
            this.dataService.post('/sucursal/?method=PUT', { "sucursal": this.nuevaBarberia })
                .then(function (response) {
                var url = '/sucursal/?idBarberia=' + _this.authService.idBarberia;
                if (_this.authService.isAdminSucursalUser()) {
                    url = '/sucursal/' + _this.authService.loggedUser.idSucursal;
                }
                _this.dataService.get(url)
                    .then(function (response) {
                    _this.sucursales = response;
                    if (!_this.authService.isAdminSucursalUser()) {
                        _this.sucursales = response.sucursal;
                    }
                    _this.nuevaBarberia = _this.sucursales[0];
                    _this.selectedBarberiaId = _this.nuevaBarberia.id;
                    _this.dataService.get('/usuario/?idSucursal=' + _this.nuevaBarberia.id)
                        .then(function (response) {
                        _this.barberos = response.usuario;
                        _this.nuevoBarbero = Object.assign({}, _this.barberos[0]);
                        if (_this.barberos.length > 0) {
                            _this.opcionesDuracion = [];
                            for (var i = 1; i < 6; i++) {
                                _this.opcionesDuracion.push(_this.barberos[0].tiempoBarbero * i);
                            }
                        }
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
                    if (_this.barberos.length > 0) {
                        _this.opcionesDuracion = [];
                        for (var i = 1; i < 6; i++) {
                            _this.opcionesDuracion.push(_this.barberos[0].tiempoBarbero * i);
                        }
                    }
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
        if (this.nuevoServicio.esDinamico) {
            this.nuevoServicio.precio = 1;
            this.nuevoServicio.duracion = 1;
            this.nuevoServicio.esDinamico = 1;
        }
        else {
            this.nuevoServicio.esDinamico = 0;
        }
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
        console.log(this.servicioErrores);
    };
    ConfiguracionComponent.prototype.ModificarServicio = function () {
        var _this = this;
        if (this.nuevoServicio.esDinamico) {
            this.nuevoServicio.precio = 1;
            this.nuevoServicio.duracion = 1;
            this.nuevoServicio.esDinamico = 1;
        }
        else {
            this.nuevoServicio.esDinamico = 0;
        }
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
                        if (that.barberos.length > 0) {
                            that.opcionesDuracion = [];
                            for (var i = 1; i < 6; i++) {
                                that.opcionesDuracion.push(that.barberos[0].tiempoBarbero * i);
                            }
                        }
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
                    if (_this.barberos.length > 0) {
                        _this.opcionesDuracion = [];
                        for (var i = 1; i < 6; i++) {
                            _this.opcionesDuracion.push(_this.barberos[0].tiempoBarbero * i);
                        }
                    }
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
                if (_this.barberos.length > 0) {
                    _this.opcionesDuracion = [];
                    for (var i = 1; i < 6; i++) {
                        _this.opcionesDuracion.push(_this.barberos[0].tiempoBarbero * i);
                    }
                }
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
        template: __webpack_require__(538),
        styles: [__webpack_require__(435)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_validator_service__["a" /* ValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_validator_service__["a" /* ValidatorService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_data_service__["a" /* DataService */]) === "function" && _d || Object])
], ConfiguracionComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=configuracion.component.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_shared_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacturaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FacturaComponent = (function () {
    function FacturaComponent(dataService, authService, modalService, sharedService, decimalPipe) {
        this.dataService = dataService;
        this.authService = authService;
        this.modalService = modalService;
        this.sharedService = sharedService;
        this.decimalPipe = decimalPipe;
        this.facturas = [];
        this.idSucursal = '';
        this.mostrarFactura = false;
        this.selectedFactura = {};
        this.selectedProvincia = {};
        this.selectedCanton = {};
        this.sucursal = {};
        this.p = 1;
    }
    FacturaComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    FacturaComponent.prototype.openModalPrint = function (template) {
        this.printRefCompletar = this.modalService.show(template);
    };
    FacturaComponent.prototype.ngOnInit = function () {
        var that = this;
        setTimeout(function () {
            that.dataService.get('/reserva?idSucursal=' + that.authService.loggedUser.idSucursal + '&estadoFactura=P')
                .then(function (response) {
                console.log(response.reserva);
                that.facturas = that.updateTimeToHora(response.reserva);
            }, function (error) {
            });
            that.sharedService.get('/api/ubicacion').then(function (data) {
                that.selectedProvincia = data.ubicacion[Number(that.authService.loggedUser.idProvincia) - 1];
                that.selectedCanton = that.selectedProvincia.cantones[Number(that.authService.loggedUser.idCanton) - 1];
            }, function (error) {
                console.log('error', error);
            });
            that.dataService.get('/sucursal/' + that.authService.loggedUser.idSucursal).then(function (data) {
                that.sucursal = data[0];
            }, function (error) {
                console.log('error', error);
            });
        }, 2000);
    };
    FacturaComponent.prototype.updateTimeToHora = function (pausas) {
        for (var i = pausas.length - 1; i >= 0; i--) {
            pausas[i].horaInicialFormat = Number(pausas[i].horaInicial.substring(0, 2) + pausas[i].horaInicial.substring(3, 5));
        }
        return pausas;
    };
    FacturaComponent.prototype.cargarFactura = function (factura) {
        this.selectedFactura = factura;
        this.mostrarFactura = true;
    };
    FacturaComponent.prototype.convertMinsToHrsMins = function (mins) {
        if (mins > 60) {
            var tiempo = 'Horas';
            var h = Math.floor(mins / 60);
            var m = mins % 60;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            return h + ":" + m + " " + tiempo;
        }
        else {
            return mins + " Minutos";
        }
    };
    FacturaComponent.prototype.convierteTiempo = function (horaParam) {
        var hora = horaParam + '';
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
    // public imprimir(factura){
    // 	console.log(factura);
    // }
    FacturaComponent.prototype.paseDate = function (date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var parsed = dd + '/' + mm + '/' + yyyy;
        return parsed;
    };
    FacturaComponent.prototype.truncate = function (str, limit) {
        var bits, i;
        bits = str.split('');
        if (bits.length > limit) {
            for (i = bits.length - 1; i > -1; --i) {
                if (i > limit) {
                    bits.length = i;
                }
                else if (' ' === bits[i]) {
                    bits.length = i;
                    break;
                }
            }
            bits.push('...');
        }
        return bits.join('');
    };
    FacturaComponent.prototype.genLetter = function (cb) {
        var that = this;
        var doc;
        var img = new Image();
        img.addEventListener('load', function () {
            // header
            // var pags = Math.ceil(that.factura.items.length / 32); -> se usa en caso de tener mas de un item
            var pags = 1;
            console.log(window.jsPDF);
            doc = new window.jsPDF('p', 'pt', 'letter');
            // var i = 0;
            // console.log('j',j,pags);
            var j = 0;
            var o, f, temparray, chunk = 32;
            for (o = 0, f = 1; o < f; o += chunk) {
                // temparray = that.factura.items.slice(o,o+chunk);
                // console.log(temparray);
                // for (var j = 0 ; j < pags; j++) {
                console.log('looped', i, pags);
                doc.setFont("helvetica");
                doc.setFontType("bold");
                doc.setFontSize("12");
                doc.text(that.sucursal.nombreNegocio, 100, 20);
                doc.setFont("helvetica");
                doc.setFontType("normal");
                doc.setFontSize("8");
                doc.text(that.selectedCanton.nombre + ', ' + that.selectedProvincia.nombre, 100, 35);
                doc.text('Tel. ' + that.sucursal.telefono[0].telefono, 100, 45);
                doc.text(that.sucursal.correo[0].correo, 100, 55);
                // if(that.sucursal.paginaWeb){ --> si la barberia tiene pagina web
                // 	doc.text(that.sucursal.paginaWeb, 100, 65);
                // }
                img.width = 80;
                img.height = 80;
                doc.addImage(img, 'png', 25, 10);
                // fin header
                // numero factura
                doc.setFont("helvetica");
                doc.setFontType("bold");
                doc.setFontSize("12");
                doc.text('Factura No', 25, 120);
                var con = that.selectedFactura.consecutivo || 'Sin consecutivo';
                doc.text(con, 100, 120);
                doc.text('Fecha', 25, 140);
                doc.text(that.selectedFactura.dia + ': ' + that.selectedFactura.horaInicial, 100, 140);
                // fin numero factura
                // cliente 
                // doc.setFillColor(191,191,191);
                doc.rect(300, 100, 250, 58);
                doc.text('Cliente', 310, 115);
                doc.setFont("helvetica");
                doc.setFontType("normal");
                doc.setFontSize("10");
                doc.text('Nombre', 310, 130);
                if (that.selectedFactura.nombreUserReserva != '' || that.selectedFactura.nombreUserReserva != 'generico') {
                    doc.text(that.selectedFactura.nombreUserReserva + ' ' +
                        that.selectedFactura.primerApellidoUserReserva + ' ' +
                        that.selectedFactura.segundoApellidoUserReserva, 380, 130);
                    if (that.selectedFactura.cedula) {
                        doc.text('Cedula', 310, 145);
                        doc.text('' + that.selectedFactura.cedula, 380, 145);
                    }
                }
                else {
                    doc.text('Factura sin cliente', 380, 130);
                }
                // fin cliente
                // tabla productos
                doc.rect(25, 200, 560, 430);
                doc.setFillColor(191, 191, 191);
                doc.rect(26, 201, 558, 13, 'F');
                var x = 26, y = 214;
                for (var i = 0; i < 32; i++) {
                    if (i % 2 == 0) {
                        doc.setFillColor(204, 217, 255);
                    }
                    else {
                        doc.setFillColor(255, 255, 255);
                    }
                    doc.rect(x, y, 558, 13, 'F');
                    y += 13;
                }
                doc.setDrawColor(255, 255, 255);
                doc.setLineWidth(1.5);
                doc.line(280, 200, 280, 700);
                doc.line(330, 200, 330, 700);
                doc.line(400, 200, 400, 700);
                doc.line(480, 200, 480, 700);
                doc.setFontSize("8");
                doc.text('Detalle', 47, 210);
                doc.text('Cantidad', 290, 210);
                doc.text('Descuento', 345, 210);
                doc.text('Precio und', 420, 210);
                doc.text('Precio', 520, 210);
                // fin tabla productos
                // agregar productos
                y = 223;
                // for (var i = temparray.length - 1; i >= 0; i--) {
                doc.text('' + that.selectedFactura.servicio, 45, y, 'left');
                doc.text('1', 310, y, 'right');
                doc.text(that.toDecimals(0), 380, y, 'right');
                doc.text(that.toDecimals(that.selectedFactura.precio), 460, y, 'right');
                doc.text(that.toDecimals(that.selectedFactura.precio), 550, y, 'right');
                y += 13;
                // }
                // fin agregar productos
                // total
                if (that.sucursal.pieFactura) {
                    console.log('split text', that.sucursal.pieFactura);
                    var splitTitle = doc.splitTextToSize(that.sucursal.pieFactura, 200);
                    doc.text(splitTitle, 35, 670);
                }
                // var splitTitle = doc.splitTextToSize("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 200);
                // doc.text(splitTitle, 35, 670);
                doc.setFontSize("10");
                doc.setFontType("bold");
                doc.text('Total Bruto', 400, 670);
                doc.setFontType("normal");
                doc.text(that.toDecimals(that.selectedFactura.precio), 560, 670, 'right');
                doc.text('Descuento', 400, 690);
                doc.text(that.toDecimals(0), 560, 690, 'right');
                doc.text('Total Neto', 400, 710);
                doc.text(that.toDecimals(that.selectedFactura.precio), 560, 710, 'right');
                doc.text('Impuestos', 400, 730);
                doc.text(that.toDecimals(0), 560, 730, 'right');
                doc.setFontSize("11");
                doc.setFontType("bold");
                doc.text('Total Factura', 400, 750);
                doc.text(that.toDecimals(that.selectedFactura.precio), 560, 750, 'right');
                doc.text('Pag. ' + (j + 1) + ' de ' + pags, 540, 15);
                if (j < pags - 1) {
                    doc.addPage();
                }
                j++;
            }
            // fin total
            cb(doc);
        });
        var imgName = this.sucursal.logoName || 'kyr.jpg';
        img.src = 'assets/' + imgName;
    };
    FacturaComponent.prototype.imprimir = function (tipo) {
        console.log('imprimir', tipo, this.selectedFactura);
        var doc;
        var that = this;
        if (tipo == 'A4') {
            this.genLetter(that.printDoc);
        }
        else {
            var height = 60;
            height += 4;
            doc = new window.jsPDF('p', 'mm', [60, height]);
            doc.setFontSize("10");
            doc.setFontType("bold");
            doc.text(that.sucursal.nombreNegocio, 30, 8, "center");
            doc.setFontSize("7");
            doc.setFontType("normal");
            var con = that.selectedFactura.consecutivo || 'Sin consecutivo';
            doc.text(con, 30, 12, "center");
            doc.text(that.selectedCanton.nombre + ', ' + that.selectedProvincia.nombre, 30, 16, "center");
            doc.text('Tel. ' + that.sucursal.telefono[0].telefono, 30, 20, "center");
            doc.text(that.sucursal.correo[0].correo, 30, 24, "center");
            if (that.sucursal.paginaWeb) {
                doc.text(that.sucursal.paginaWeb, 30, 28, "center");
            }
            if (that.sucursal.cedulaJuridica) {
                doc.text(that.sucursal.cedulaJuridica, 30, 32, "center");
            }
            doc.text('Vendedor:', 7, 36, "left");
            doc.text(that.selectedFactura.nombreBarbero + ' ' + that.selectedFactura.primerApellidoBarbero + ' ' + that.selectedFactura.segundoApellidoBarbero, 30, 36, "left");
            //display products
            var y = 43;
            // for (var i = that.factura.items.length - 1; i >= 0; i--) {
            // if(that.factura.items[i].detalle != '0000'){
            var text = '' + that.selectedFactura.servicio;
            doc.text(that.truncate(text, 14), 7, y, 'left');
            // } else {
            // 	doc.text(''+that.factura.items[i].detalle, 7, y,'left');
            // }
            doc.text(that.toDecimals(that.selectedFactura.precio), 50, y, 'right');
            y += 4;
            // }
            // end display
            // total
            doc.text('-------------------------------------------------------------', 30, y, "center");
            doc.text('Total Neto: ', 35, y + 4, "right");
            doc.text(that.toDecimals(that.selectedFactura.precio), 50, y + 4, "right");
            doc.text('Total Impuestos: ', 35, y + 8, "right");
            doc.text(that.toDecimals(0), 50, y + 8, "right");
            doc.text('Total: ', 35, y + 12, "right");
            doc.text(that.toDecimals(that.selectedFactura.precio), 50, y + 12, "right");
            // fin total
            doc.setFontSize("8");
            doc.text('Muchas Gracias', 30, y + 19, "center");
            that.printDoc(doc);
            // doc.save('pdv.pdf')
        }
    };
    FacturaComponent.prototype.printDoc = function (doc) {
        var blob = doc.output("blob");
        window.open(URL.createObjectURL(blob));
    };
    FacturaComponent.prototype.blobToBase64 = function (blob, cb) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            cb(base64);
        };
        reader.readAsDataURL(blob);
    };
    FacturaComponent.prototype.calculaTotalItem = function (fi) {
        return fi.precioUnitario * fi.cantidad - fi.montoDescuento + ((fi.precioUnitario * fi.cantidad - fi.montoDescuento) * fi.impuestos / 100);
    };
    FacturaComponent.prototype.descuentoPorProducto = function (productoItem) {
        var totalDescuento = productoItem.montoDescuento * productoItem.cantidad;
        return totalDescuento;
    };
    FacturaComponent.prototype.dottedLine = function (doc, xFrom, yFrom, xTo, yTo, segmentLength) {
        // Calculate line length (c)
        var a = Math.abs(xTo - xFrom);
        var b = Math.abs(yTo - yFrom);
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        // Make sure we have an odd number of line segments (drawn or blank)
        // to fit it nicely
        var fractions = c / segmentLength;
        var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));
        // Calculate x, y deltas per segment
        var deltaX = adjustedSegmentLength * (a / c);
        var deltaY = adjustedSegmentLength * (b / c);
        var curX = xFrom, curY = yFrom;
        while (curX <= xTo && curY <= yTo) {
            doc.line(curX, curY, curX + deltaX, curY + deltaY);
            curX += 2 * deltaX;
            curY += 2 * deltaY;
        }
    };
    FacturaComponent.prototype.toDecimals = function (num) {
        return this.decimalPipe.transform(num, '1.2-2');
    };
    return FacturaComponent;
}());
FacturaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-factura',
        template: __webpack_require__(539),
        styles: [__webpack_require__(436)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_shared_service__["a" /* SharedService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_common__["a" /* DecimalPipe */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_common__["a" /* DecimalPipe */]) === "function" && _e || Object])
], FacturaComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=factura.component.js.map

/***/ }),

/***/ 360:
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
        template: __webpack_require__(540),
        styles: [__webpack_require__(437)]
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(10);
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
        template: __webpack_require__(541),
        styles: [__webpack_require__(438)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], CarouselComponent);

var _a;
//# sourceMappingURL=carousel.component.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(10);
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
        template: __webpack_require__(542),
        styles: [__webpack_require__(439)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_window_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_validator_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_telefono__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_correo__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__ = __webpack_require__(114);
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
        this.selectedDateBarberia = new Date();
        this.agregaPausa = true;
        this.pausaErrores = [];
        this.usuarioErrores = [];
        this.Object = Object;
        this.displayCitas = false;
        this.displayPausas = false;
        this.displayContacto = false;
        this.displayHorario = false;
        this.displayResumen = false;
        this.displayCitasBarberia = false;
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
        this.barberosCitasSucursal = [];
        this.obteniendoBarberos = false;
        this.cargandoCitas = false;
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
        if (window.screen.width > 900) {
            this.displayCitas = true;
            this.displayCitasBarberia = true;
            this.displayPausas = true;
            this.displayContacto = true;
            this.displayHorario = true;
            this.displayResumen = true;
        }
        var that = this;
        var time = (that.authService.loggedUser) ? 0 : 2000;
        setTimeout(function () {
            if (that.authService.isBarberoUser()) {
                for (var i = 1; i < 9; i++) {
                    that.opcionesDuracion.push(that.authService.loggedUser.tiempoBarbero * i);
                }
                var horaInicio = 700;
                var horaFinal = 2300;
                var hora = horaInicio;
                while (hora <= horaFinal) {
                    that.tiempos.push(hora);
                    var estimado = hora + 60;
                    if (estimado % 100 == 0) {
                        hora = hora + 60;
                    }
                    else {
                        hora = hora + 20;
                    }
                }
                that.horarios = that.authService.loggedUser.horarios;
                console.log(that.horarios.find(function (o) { return o.dia == 'LU'; }));
                that.selectedHorarioLunes = that.updateHora(that.horarios.find(function (o) { return o.dia == 'LU'; }));
                that.selectedHorarioMartes = that.updateHora(that.horarios.find(function (o) { return o.dia == 'MA'; }));
                that.selectedHorarioMiercoles = that.updateHora(that.horarios.find(function (o) { return o.dia == 'MI'; }));
                that.selectedHorarioJueves = that.updateHora(that.horarios.find(function (o) { return o.dia == 'JU'; }));
                that.selectedHorarioViernes = that.updateHora(that.horarios.find(function (o) { return o.dia == 'VI'; }));
                that.selectedHorarioSabado = that.updateHora(that.horarios.find(function (o) { return o.dia == 'SA'; }));
                that.selectedHorarioDomingo = that.updateHora(that.horarios.find(function (o) { return o.dia == 'DO'; }));
                that.dataService.get('/pausaHorarioBarbero/?idUsuario=' + that.authService.loggedUser.id)
                    .then(function (response) {
                    that.pausas = that.updateTimeToHora(response.pausaHorarioBarbero);
                }, function (error) {
                });
                // that.cargandoCitas = true;
                // that.dataService.get('/reserva/?idUsuarioBarbero='+that.authService.loggedUser.id+'&fecha='+that.selectedDate.getFullYear()+'-'+that.zerofill(that.selectedDate.getMonth(),1)+'-'+that.zerofill(that.selectedDate.getDate(),0))
                //     .then(response => {
                //         that.reservas = that.updateTimeToHora(response.reserva);
                //         that.cargandoCitas = false;
                //     },
                //     error => {
                //     });
                // setInterval(function(){ 
                // 	that.dataService.get('/reserva/?idUsuarioBarbero='+that.authService.loggedUser.id+'&fecha='+that.selectedDate.getFullYear()+'-'+that.zerofill(that.selectedDate.getMonth(),1)+'-'+that.zerofill(that.selectedDate.getDate(),0))
                //     .then(response => {
                //         that.reservas = that.updateTimeToHora(response.reserva);
                //         that.cargandoCitas = false;
                //     },
                //     error => {
                //     });
                // }, 30000);
            }
            // if(!that.authService.isBarberoUser() && !that.authService.isAdminUser()){
            // 	that.cargandoCitas = true;
            // 	that.dataService.get('/reserva/?idUsuarioReserva='+that.authService.loggedUser.id)
            //            .then(response => {
            //                that.reservas = that.updateTimeToHora(response.reserva);
            //                that.cargandoCitas = false;
            //            },
            //            error => {
            //            });
            //    }
            //    if(that.authService.isAdminSucursalUser()){
            // that.obtieneCitasBarberia(that);
            // setInterval(function(){ 
            //    	that.obtieneCitasBarberia(that);
            //    }, 30000);
            // }
        }, time);
    };
    InfoComponent.prototype.obtieneCitasBarberia = function (that) {
        that.obteniendoBarberos = true;
        that.cargando = true;
        that.barberosCitasSucursal = [];
        that.dataService.get('/usuario/?idSucursal=' + that.authService.loggedUser.idSucursal)
            .then(function (response) {
            that.obteniendoBarberos = false;
            var barberosSucursal = response.usuario;
            if (barberosSucursal.length != 0) {
                that.selectedBarbero = barberosSucursal[0].id;
                var obtenerCitas = function (i) {
                    var barberoCitas = { barbero: null, citas: [] };
                    barberoCitas.barbero = barberosSucursal[i];
                    that.dataService.get('/reserva/?idUsuarioBarbero=' + barberosSucursal[i].id + '&fecha=' + that.selectedDateBarberia.getFullYear() + '-' + that.zerofill(that.selectedDateBarberia.getMonth(), 1) + '-' + that.zerofill(that.selectedDateBarberia.getDate(), 0))
                        .then(function (response) {
                        barberoCitas.citas = that.updateTimeToHora(response.reserva);
                        that.barberosCitasSucursal.push(barberoCitas);
                        if (i + 1 < barberosSucursal.length) {
                            obtenerCitas(i + 1);
                        }
                        else {
                            that.obteniendoBarberos = false;
                            that.cargando = false;
                        }
                    }, function (error) {
                    });
                };
                obtenerCitas(0);
            }
        }, function (error) {
        });
    };
    InfoComponent.prototype.changeBarbero = function (id) {
        this.selectedBarbero = id;
    };
    InfoComponent.prototype.zerofill = function (i, add) {
        i = i + add;
        return ((i < 10 ? '0' : '') + i);
    };
    InfoComponent.prototype.updateHora = function (horario) {
        if (typeof (horario.horaInicial) == 'string') {
            horario.horaInicial = Number(horario.horaInicial.substring(0, 2) + horario.horaInicial.substring(3, 5));
        }
        if (typeof (horario.horaFinal) == 'string') {
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
        this.cargandoCitas = true;
        this.dataService.get('/reserva/?' + param + '=' + this.authService.loggedUser.id + '&fecha=' + this.selectedDate.getFullYear() + '-' + this.zerofill(this.selectedDate.getMonth(), 1) + '-' + this.zerofill(this.selectedDate.getDate(), 0))
            .then(function (response) {
            _this.reservas = _this.updateTimeToHora(response.reserva);
            _this.cargandoCitas = false;
        }, function (error) {
        });
    };
    InfoComponent.prototype.changeDateBarberia = function (option) {
        if (option === "more") {
            var newDate = new Date(this.selectedDateBarberia.getTime());
            newDate.setDate(newDate.getDate() + 1);
            this.selectedDateBarberia = newDate;
        }
        else {
            var newDate = new Date(this.selectedDateBarberia.getTime());
            newDate.setDate(newDate.getDate() - 1);
            this.selectedDateBarberia = newDate;
        }
        this.obtieneCitasBarberia(this);
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
    InfoComponent.prototype.igualQueHoy = function (date) {
        var dateCita = new Date(date);
        dateCita.setMinutes(0, 0, 0);
        var hoy = new Date();
        hoy.setMinutes(0, 0, 0);
        return (dateCita = hoy);
    };
    InfoComponent.prototype.eliminarCita = function () {
        var _this = this;
        this.dataService.delete('/reserva/' + this.selectedCita.id)
            .then(function (response) {
        }, function (error) {
            _this.reservas = _this.reservas.filter(function (el) { return (el.id != _this.selectedCita.id); });
            _this.obtieneCitasBarberia(_this);
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
                // that.authService.loggedUser.horarios.push(response.usuario);
                dayInUse = dayInUse + 1;
                if (dayInUse <= 6) {
                    agregar(daysMap[dayInUse]);
                }
                else {
                    that.cargando = false;
                    that.dataService.get('/usuario/' + that.authService.loggedUser.id)
                        .then(function (res) {
                        that.authService.loggedUser.horarios = res.usuario.horarios;
                    }, function (error) {
                    });
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
        var barberoId = this.authService.loggedUser.id;
        if (this.authService.isAdminSucursalUser()) {
            barberoId = this.selectedBarbero;
        }
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
            this.dataService.get('/reserva/?idUsuarioBarbero=' + barberoId + '&fechaInicial=' + this.resumenFechaInicial + '&fechaFinal=' + this.resumenFechaFinal)
                .then(function (response) {
                _this.reservasResumen = response.reserva;
                _this.cantidadCitas = _this.reservasResumen.length;
                for (var i = _this.reservasResumen.length - 1; i >= 0; i--) {
                    var ganancia = (_this.reservasResumen[i].esDinamico == 1) ? _this.reservasResumen[i].precioDinamico : _this.reservasResumen[i].precio;
                    _this.ganancias += Number(ganancia);
                }
                _this.resumenGenerado = true;
                _this.cargando = false;
            }, function (error) {
            });
        }
    };
    InfoComponent.prototype.convertMinsToHrsMins = function (mins) {
        if (mins > 60) {
            var tiempo = 'Horas';
            var h = Math.floor(mins / 60);
            var m = mins % 60;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            return h + ":" + m + " " + tiempo;
        }
        else {
            return mins + " Minutos";
        }
    };
    return InfoComponent;
}());
InfoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'user-info',
        template: __webpack_require__(543),
        styles: [__webpack_require__(440)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__["b" /* FacebookService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_ngx_facebook__["b" /* FacebookService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_validator_service__["a" /* ValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_validator_service__["a" /* ValidatorService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_window_service__["a" /* WindowRefService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_window_service__["a" /* WindowRefService */]) === "function" && _f || Object])
], InfoComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=info.component.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_validator_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_usuario__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_telefono__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_correo__ = __webpack_require__(27);
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
        this.action = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.label = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]();
        this.authService.loggedObservable.subscribe(function (value) {
            console.log('execute');
            if (value) {
                _this.error = false;
                _this.action.emit();
            }
            else {
                _this.error = true;
            }
        });
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _a || Object)
], LoginComponent.prototype, "action", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* EventEmitter */]) === "function" && _b || Object)
], LoginComponent.prototype, "label", void 0);
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'login-view',
        template: __webpack_require__(544),
        styles: [__webpack_require__(441)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_validator_service__["a" /* ValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_validator_service__["a" /* ValidatorService */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(10);
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
        template: __webpack_require__(545),
        styles: [__webpack_require__(442)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], NavComponent);

var _a, _b;
//# sourceMappingURL=nav.component.js.map

/***/ }),

/***/ 366:
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Y" /* Pipe */])({ name: 'formatHora' })
], FormatHoraPipe);

//# sourceMappingURL=hora.pipe.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_validator_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_usuario__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_telefono__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_correo__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_modal__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_of__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_lodash__);
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
    function ReservaComponent(modalService, router, sanitizer, dataService, authService, validatorService) {
        this.modalService = modalService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.dataService = dataService;
        this.authService = authService;
        this.validatorService = validatorService;
        this.action = 'Login';
        this.reservacion = {};
        this.validLocal = false;
        this.validBarber = false;
        this.validReserva = false;
        this.validReservaTotal = false;
        this.barberiaUnica = true;
        this.cargando = false;
        this.selectedReserva = {};
        this.usuarioParaCita = {};
        this.oneAtATime = true;
        this.provincias = [];
        this.escojeFecha = true;
        this.cantones = [];
        this.selectedProvincia = "San José";
        this.selectedCanton = "Central";
        this.selectedLocal = "";
        this.buscaUsuario = "";
        this.selectedLocalId = 0;
        this.barberias = [];
        this.pausas = [];
        this.usuarioCita = [];
        this.tiempoBarbero = 20;
        this.horasBarbero = 13;
        this.iniciaBarbero = '1000';
        this.timeBoxes = [];
        this.camposLibres = [];
        this.reservas = [];
        this.dateSelected = new Date();
        this.timeSelected = "1";
        this.cantonesDisplay = [];
        this.nuevoUsuario = new __WEBPACK_IMPORTED_MODULE_6__models_usuario__["a" /* Usuario */]();
        this.usuarioErrores = [];
        this.error = false;
        this.validationError = false;
        this.validationErrorMsg = '';
        this.nuevoUsuarioDisplay = false;
        this.nuevoUsuarioError = false;
        this.buscaUsuarioChanged = __WEBPACK_IMPORTED_MODULE_11_lodash__["debounce"](function () {
            var _this = this;
            if (this.buscaUsuario.length >= 3) {
                this.cargando = true;
                this.dataService.get('/usuario/?nombre=' + this.buscaUsuario)
                    .then(function (response) {
                    console.log('success usuarios', response);
                    _this.usuarioCita = response.usuario;
                    _this.cargando = false;
                }, function (error) {
                });
            }
            else if (!this.buscaUsuario) {
                this.usuarioCita = [];
            }
        }, 400);
    }
    ReservaComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    ReservaComponent.prototype.ngOnInit = function () {
        this.cargando = true;
        this.reservacion.local = { id: 0 };
        var that = this;
        var time = (that.authService.loggedUser) ? 0 : 2000;
        setTimeout(function () {
            if (that.authService.isAdminSucursalUser()) {
                that.dataService.get('/sucursal/?idSucursal=' + that.authService.loggedUser.idSucursal)
                    .then(function (response) {
                    that.barberias = response.sucursal;
                    if (that.barberias.length == 1) {
                        that.localSelectUnica(that.barberias[0].id);
                    }
                    that.cargando = false;
                }, function (error) {
                });
            }
            else {
                that.provincias = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];
                that.dataService.get('/provinciaCanton')
                    .then(function (response) {
                    that.cantones = response.ProvinciaCanton;
                    that.cantonesDisplay = that.cantones[0].cantones;
                }, function (error) {
                });
                if (that.authService.isAppUnica) {
                    that.dataService.get('/sucursal/?idBarberia=' + that.authService.idBarberiaUnica)
                        .then(function (response) {
                        that.barberias = response.sucursal;
                        if (that.barberias.length > 0) {
                            that.localSelectUnica(that.barberias[0].id);
                        }
                        that.cargando = false;
                    }, function (error) {
                    });
                }
                else {
                    that.dataService.get('/sucursal/?idCanton=1')
                        .then(function (response) {
                        that.barberias = response.sucursal;
                        if (that.barberias.length == 1) {
                            that.localSelectUnica(that.barberias[0].id);
                        }
                        that.cargando = false;
                    }, function (error) {
                    });
                }
            }
            that.mapUrl();
        }, time);
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
        var daysMap = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
        if (this.reservacion.servicio && this.dateSelected) {
            var timeBoxes = [];
            var horasBarbero = 0;
            var horarioInicio = this.updateHora(Object.assign({}, this.reservacion.barbero.horarios.find(function (o) { return o.dia == daysMap[_this.dateSelected.getDay()]; }))).horaInicial;
            console.log('horarioInicio', horarioInicio);
            var today = new Date();
            console.log('time');
            console.log(today.getHours() >= Number(this.modificaHoraToTime(horarioInicio).substring(0, 2)));
            console.log(today.getMinutes() > Number(this.modificaHoraToTime(horarioInicio).substring(2, 4)));
            console.log(today.getHours(), Number(this.modificaHoraToTime(horarioInicio).substring(0, 2)));
            console.log(today.getMinutes(), Number(this.modificaHoraToTime(horarioInicio).substring(2, 4)));
            if (!this.authService.isAdminSucursalUser() && this.dateSelected.getFullYear() + this.dateSelected.getMonth() + this.dateSelected.getDate() == today.getFullYear() + today.getMonth() + today.getDate() &&
                (today.getHours() >= Number(this.modificaHoraToTime(horarioInicio).substring(0, 2)) &&
                    today.getMinutes() > Number(this.modificaHoraToTime(horarioInicio).substring(2, 4)))) {
                console.log('entra');
                var minutos = 0;
                while (minutos < today.getMinutes()) {
                    minutos += Number(this.reservacion.barbero.tiempoBarbero);
                }
                horarioInicio = today.getHours() * 100 + minutos;
                console.log('hora inicio nueva', horarioInicio);
            }
            var horarioFinal = this.updateHora(Object.assign({}, this.reservacion.barbero.horarios.find(function (o) { return o.dia == daysMap[_this.dateSelected.getDay()]; }))).horaFinal;
            console.log('horarioFinal', horarioFinal);
            var hora = new Date();
            var horarioInicioFull = this.modificaHoraToTime(horarioInicio);
            console.log('horarioInicio', horarioInicio);
            console.log('horarioInicioFull', horarioInicioFull);
            if (horarioInicio) {
                horasBarbero = (horarioFinal - horarioInicio) / 100;
                hora.setHours(Number(horarioInicioFull.substring(0, 2)));
                hora.setMinutes(Number(horarioInicioFull.substring(2, 4)));
                console.log('horasBarbero en if ', horasBarbero);
            }
            console.log('hora', hora);
            var timeBoxCount = (horasBarbero * 60 / this.reservacion.barbero.tiempoBarbero);
            console.log('timeBoxCount', timeBoxCount);
            for (var i = 0; i < timeBoxCount; i++) {
                var reservada = false;
                var pausada = false;
                for (var o = 0; o < this.reservas.length; o++) {
                    var horaReservaInicial = new Date();
                    var horaReservaFinal = new Date();
                    horaReservaInicial.setHours(Number(this.reservas[o].horaInicial.substring(0, 2)));
                    horaReservaInicial.setMinutes(Number(this.reservas[o].horaInicial.substring(2, 4)));
                    horaReservaInicial.setSeconds(0);
                    horaReservaFinal.setTime(horaReservaInicial.getTime());
                    var duracion = (this.reservas[o].esDinamico == 1) ? this.reservas[o].duracionDinamica : this.reservas[o].duracion;
                    console.log('duracion', duracion);
                    horaReservaFinal.setMinutes(horaReservaFinal.getMinutes() + Number(duracion));
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
                        if (this.pausas[o].dia != '' && this.reservacion.fecha && this.pausas[o].dia.indexOf(daysMap[this.reservacion.fecha.getDay()]) != -1) {
                            pausada = true;
                        }
                        if (this.pausas[o].fecha && this.reservacion.fecha) {
                            var pausaDate = new Date(this.pausas[o].fecha);
                            if ('' + this.reservacion.fecha.getDate() + this.reservacion.fecha.getMonth() + this.reservacion.fecha.getFullYear() == '' + pausaDate.getDate() + pausaDate.getMonth() + pausaDate.getFullYear()) {
                                pausada = true;
                            }
                        }
                    }
                }
                timeBoxes.push({
                    'hora': new Date(hora.getTime()),
                    'timeBoxCount': i,
                    'reservada': reservada,
                    'pausada': pausada
                });
                hora.setMinutes(hora.getMinutes() + Number(this.reservacion.barbero.tiempoBarbero));
            }
            var tiempo = this.reservacion.servicio.duracion;
            console.log('timeBoxes', timeBoxes);
            var ocupaCampos = tiempo / this.reservacion.barbero.tiempoBarbero;
            this.camposLibres = [];
            var estaReservada = false;
            var estaPausada = false;
            console.log('cam', ocupaCampos, timeBoxes.length);
            for (var i = 0; i < timeBoxes.length; i++) {
                estaReservada = false;
                estaPausada = false;
                for (var o = i; o < i + ocupaCampos; o++) {
                    if (o < timeBoxes.length) {
                        if (timeBoxes[o].reservada == true) {
                            estaReservada = true;
                            break;
                        }
                        if (timeBoxes[o].pausada == true) {
                            estaPausada = true;
                            break;
                        }
                    }
                    else {
                        console.log('aqui termina', o, timeBoxes);
                        estaReservada = true;
                        break;
                    }
                }
                // if(!estaReservada){
                this.camposLibres.push({
                    'hora': timeBoxes[i].hora,
                    'reservada': estaReservada,
                    'pausada': estaPausada
                });
                // }
            }
            console.log('campos after', this.camposLibres);
            if (this.camposLibres.length > 0) {
                var existeTiempo = true;
                var horaFinalDate = new Date();
                var horarioFinalFull = this.modificaHoraToTime(horarioFinal);
                horaFinalDate.setHours(Number(horarioFinalFull.substring(0, 2)));
                horaFinalDate.setMinutes(Number(horarioFinalFull.substring(2, 4)));
                horaFinalDate.setSeconds(0, 0);
                while (existeTiempo) {
                    var ultimaCaja = new Date(+this.camposLibres[this.camposLibres.length - 1].hora);
                    ultimaCaja.setMinutes(ultimaCaja.getMinutes() + Number(tiempo));
                    ultimaCaja.setSeconds(0, 0);
                    if (ultimaCaja > horaFinalDate) {
                        this.camposLibres.pop();
                    }
                    else {
                        existeTiempo = false;
                    }
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
        var _this = this;
        if (this.reservacion.barbero) {
            this.cargando = true;
            this.dateSelected = new Date(value);
            this.reservacion.fecha = this.dateSelected;
            this.dataService.get('/reserva/?idUsuarioBarbero=' + this.reservacion.barbero.id + '&&fecha=' + this.reservacion.fecha.getFullYear() + '-' + this.zerofill(this.reservacion.fecha.getMonth(), 1) + '-' + this.zerofill(this.reservacion.fecha.getDate(), 0))
                .then(function (response) {
                console.log('success', response);
                _this.cargando = false;
                _this.reservas = _this.updateTimeToHoraString(response.reserva);
                _this.actualizaTimeBox();
                _this.escojeFecha = false;
            }, function (error) {
            });
        }
        else {
            alert('Por favor seleccione un barbero y un servicio primero.');
        }
    };
    ReservaComponent.prototype.selectReserva = function (reserva) {
        this.selectedReserva = reserva;
        this.validReserva = true;
        this.reservacion.hora = reserva;
        this.goTo('confirmar');
        this.isReservaValid();
    };
    ReservaComponent.prototype.toDate = function (value) {
        var d = new Date();
        d.setHours(Number(value.substring(0, 2)));
        d.setMinutes(Number(value.substring(2, 4)));
        return d;
    };
    ReservaComponent.prototype.goTo = function (value) {
        if (value === 'date') {
            this.escojeFecha = true;
        }
        this[value].nativeElement.click();
    };
    ReservaComponent.prototype.selectBarberDone = function (event) {
        var _this = this;
        if (event.barber && event.servicio && event.changed) {
            this.goTo('date');
        }
        this.reservacion.barbero = event.barber;
        this.reservacion.servicio = event.servicio;
        this.validBarber = true;
        this.dataService.get('/pausaHorarioBarbero/?idUsuario=' + this.reservacion.barbero.id)
            .then(function (response) {
            console.log('success', response);
            _this.pausas = _this.updateTimeToHoraString(response.pausaHorarioBarbero);
        }, function (error) {
        });
        if (this.reservacion.fecha) {
            this.dataService.get('/reserva/?idUsuarioBarbero=' + this.reservacion.barbero.id + '&&fecha=' + this.reservacion.fecha.getFullYear() + '-' + this.zerofill(this.reservacion.fecha.getMonth(), 1) + '-' + this.zerofill(this.reservacion.fecha.getDate(), 0))
                .then(function (response) {
                console.log('success', response);
                _this.reservas = _this.updateTimeToHoraString(response.reserva);
            }, function (error) {
            });
            this.actualizaTimeBox();
        }
        this.isReservaValid();
    };
    ReservaComponent.prototype.updateTimeToHoraString = function (pausas) {
        for (var i = pausas.length - 1; i >= 0; i--) {
            pausas[i].horaInicial = pausas[i].horaInicial.substring(0, 2) + pausas[i].horaInicial.substring(3, 5);
        }
        return pausas;
    };
    ReservaComponent.prototype.isReservaValid = function () {
        if (this.authService.isAdminSucursalUser()) {
            if (this.reservacion.local && this.reservacion.barbero
                && this.reservacion.servicio && this.reservacion.fecha
                && this.reservacion.hora && this.reservacion.servicio && this.reservacion.usuarioCita) {
                this.validReservaTotal = true;
            }
            else {
                this.validReservaTotal = false;
            }
        }
        else {
            if (this.reservacion.local && this.reservacion.barbero
                && this.reservacion.servicio && this.reservacion.fecha
                && this.reservacion.hora && this.reservacion.servicio
                && (!this.authService.loggedUser || this.authService.loggedUser.telefono.length > 0)) {
                this.validReservaTotal = true;
            }
            else {
                this.validReservaTotal = false;
            }
        }
    };
    ReservaComponent.prototype.confirmarReserva = function (modal) {
        var _this = this;
        if (this.authService.isUserLogged()) {
            this.cargando = true;
            var reserva = {};
            reserva.idSucursal = this.reservacion.local.id;
            if (this.authService.isAdminSucursalUser()) {
                reserva.idUsuarioReserva = this.reservacion.usuarioCita.id;
            }
            else {
                reserva.idUsuarioReserva = this.authService.loggedUser.id;
            }
            reserva.idUsuarioBarbero = this.reservacion.barbero.id;
            reserva.idServicio = this.reservacion.servicio.id;
            if (this.reservacion.servicio.esDinamico) {
                reserva.descripcion = this.reservacion.servicio.descripcion;
                reserva.precioDinamico = this.reservacion.servicio.precio;
                reserva.duracionDinamica = this.reservacion.servicio.duracion;
            }
            reserva.dia = this.reservacion.fecha;
            reserva.horaInicial = this.reservacion.hora.hora.getHours() + ":" + this.reservacion.hora.hora.getMinutes() + ":00";
            reserva.estado = 1;
            reserva.consecutivo = '';
            reserva.clave = '';
            this.dataService.post('/reserva/', { "reserva": reserva })
                .then(function (response) {
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
                if (value && _this.router.url === '/reserva') {
                    if (_this.authService.loggedUser.telefono.length > 0) {
                        _this.cargando = true;
                        var reserva = {};
                        reserva.idSucursal = _this.reservacion.local.id;
                        reserva.idUsuarioReserva = _this.authService.loggedUser.id;
                        reserva.idUsuarioBarbero = _this.reservacion.barbero.id;
                        reserva.idServicio = _this.reservacion.servicio.id;
                        if (_this.reservacion.servicio.esDinamico) {
                            reserva.descripcion = _this.reservacion.servicio.descripcion;
                            reserva.precioDinamico = _this.reservacion.servicio.precio;
                            reserva.duracionDinamica = _this.reservacion.servicio.duracion;
                        }
                        reserva.dia = _this.reservacion.fecha;
                        reserva.horaInicial = _this.reservacion.hora.hora.getHours() + ":" + _this.reservacion.hora.hora.getMinutes() + ":00";
                        reserva.estado = 1;
                        reserva.consecutivo = '';
                        reserva.clave = '';
                        _this.dataService.post('/reserva/', { "reserva": reserva })
                            .then(function (response) {
                            _this.cargando = false;
                            alert('Su reserva a sido confirmada!');
                            _this.router.navigate(['/home']);
                        }, function (error) {
                        });
                    }
                    else {
                        _this.isReservaValid();
                    }
                }
            });
        }
    };
    ReservaComponent.prototype.hide = function () {
        this.modalRef.hide();
    };
    ReservaComponent.prototype.seleccionaUsuarioCita = function (usuario) {
        this.reservacion.usuarioCita = usuario;
        this.isReservaValid();
    };
    ReservaComponent.prototype.updateAction = function (update) {
        this.action = update;
    };
    ReservaComponent.prototype.isNotNum = function (number) {
        return isNaN(number);
    };
    ReservaComponent.prototype.newUser = function () {
        var _this = this;
        this.nuevoUsuario.contrasenna = 'clave';
        this.usuarioErrores = this.validatorService.validaUsuario(this.nuevoUsuario);
        if (this.usuarioErrores.length == 0) {
            this.cargando = true;
            this.authService.nuevoUsuarioNoLogin(this.nuevoUsuario);
            var sub_1 = this.authService.loggedObservable.subscribe(function (value) {
                _this.cargando = false;
                _this.usuarioCita = [];
                if (value) {
                    _this.nuevoUsuarioError = false;
                    _this.reservacion.usuarioCita = value;
                    _this.nuevoUsuarioDisplay = false;
                    _this.isReservaValid();
                }
                else {
                    _this.nuevoUsuarioError = true;
                }
                sub_1.unsubscribe();
            });
        }
    };
    ReservaComponent.prototype.addTelefono = function () {
        this.validationError = false;
        var nuevoTelefono = '' + this.nuevoTelefono;
        if (nuevoTelefono.length == 8) {
            var tel = new __WEBPACK_IMPORTED_MODULE_7__models_telefono__["a" /* Telefono */]();
            tel.telefono = this.nuevoTelefono + '';
            if (!this.nuevoUsuario.telefono)
                this.nuevoUsuario.telefono = [];
            this.nuevoUsuario.telefono.push(tel);
            this.nuevoTelefono = null;
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del telefono";
        }
    };
    ReservaComponent.prototype.removeTelefono = function (telefono) {
        this.nuevoUsuario.telefono = this.nuevoUsuario.telefono.filter(function (el) {
            return el.telefono !== telefono.telefono;
        });
    };
    ReservaComponent.prototype.addCorreo = function () {
        this.validationError = false;
        if (this.validatorService.emailValid(this.nuevoCorreo)) {
            var cor = new __WEBPACK_IMPORTED_MODULE_8__models_correo__["a" /* Correo */]();
            cor.correo = this.nuevoCorreo + '';
            if (!this.nuevoUsuario.correo)
                this.nuevoUsuario.correo = [];
            this.nuevoUsuario.correo.push(cor);
            this.nuevoCorreo = null;
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del correo";
        }
    };
    ReservaComponent.prototype.removeCorreo = function (correo) {
        this.nuevoUsuario.correo = this.nuevoUsuario.correo.filter(function (el) {
            return el.correo !== correo.correo;
        });
    };
    ReservaComponent.prototype.actualizarUsuario = function () {
    };
    ReservaComponent.prototype.addTelefonoUpdate = function () {
        var _this = this;
        this.validationError = false;
        var nuevoTelefono = '' + this.nuevoTelefono;
        if (nuevoTelefono.length == 8) {
            var tel = new __WEBPACK_IMPORTED_MODULE_7__models_telefono__["a" /* Telefono */]();
            tel.telefono = this.nuevoTelefono + '';
            tel.idUsuario = this.authService.loggedUser.id;
            var that = this;
            this.dataService.post('/usuarioTelefono/', { "telefono": tel })
                .then(function (response) {
                that.authService.loggedUser.telefono.push(tel);
                that.nuevoUsuario = that.authService.loggedUser;
                that.authService.updateStoredUser();
                that.nuevoTelefono = null;
                _this.isReservaValid();
            }, function (error) {
            });
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del telefono";
        }
    };
    ReservaComponent.prototype.removeTelefonoUpdate = function (telefono) {
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
    return ReservaComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('confirmar'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _a || Object)
], ReservaComponent.prototype, "confirmar", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('barber'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _b || Object)
], ReservaComponent.prototype, "barber", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('date'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* ElementRef */]) === "function" && _c || Object)
], ReservaComponent.prototype, "date", void 0);
ReservaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-reserva',
        template: __webpack_require__(546),
        styles: [__webpack_require__(443)]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_5__services_validator_service__["a" /* ValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_validator_service__["a" /* ValidatorService */]) === "function" && _j || Object])
], ReservaComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=reserva.component.js.map

/***/ }),

/***/ 368:
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

/***/ 369:
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], HomeCardComponent.prototype, "card", void 0);
HomeCardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'home-card',
        template: __webpack_require__(547),
        styles: [__webpack_require__(444)]
    }),
    __metadata("design:paramtypes", [])
], HomeCardComponent);

//# sourceMappingURL=home-card.component.js.map

/***/ }),

/***/ 370:
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Input */])(),
    __metadata("design:type", Object)
], ImgModalComponent.prototype, "name", void 0);
ImgModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'img-modal',
        template: __webpack_require__(548),
        styles: [__webpack_require__(445)]
    }),
    __metadata("design:paramtypes", [])
], ImgModalComponent);

//# sourceMappingURL=img-modal.component.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_card_home_card_component__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img_modal_img_modal_component__ = __webpack_require__(370);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SHARED_COMPONENTS; });
//IMPORT component from subfolder


//Component declaration array
var SHARED_COMPONENTS = [
    __WEBPACK_IMPORTED_MODULE_0__home_card_home_card_component__["a" /* HomeCardComponent */],
    __WEBPACK_IMPORTED_MODULE_1__img_modal_img_modal_component__["a" /* ImgModalComponent */]
];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_validator_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_usuario__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_telefono__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_correo__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_data_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_shared_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_modal__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuariosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var UsuariosComponent = (function () {
    function UsuariosComponent(router, dataService, authService, validatorService, sharedService, modalService) {
        this.router = router;
        this.dataService = dataService;
        this.authService = authService;
        this.validatorService = validatorService;
        this.sharedService = sharedService;
        this.modalService = modalService;
        this.cargando = false;
        this.nuevoUsuario = new __WEBPACK_IMPORTED_MODULE_4__models_usuario__["a" /* Usuario */]();
        this.usuarioErrores = [];
        this.fecha = new Date();
        this.error = false;
        this.validationError = false;
        this.validationErrorMsg = '';
        this.nuevoUsuarioDisplay = false;
        this.nuevoUsuarioError = false;
        this.buscaUsuario = "";
        this.usuarioCita = [];
        this.encontroUsuario = false;
        this.selectedDateNoFormat = '';
        this.selectedProvincia = {};
        this.selectedCanton = {};
        this.provincias = [];
        this.cantones = [];
        this.distritos = [];
        this.posiblesClientes = [];
        this.buscaUsuarioChanged = __WEBPACK_IMPORTED_MODULE_9_lodash__["debounce"](function () {
            var _this = this;
            this.encontroUsuario = false;
            this.nuevoUsuario = new __WEBPACK_IMPORTED_MODULE_4__models_usuario__["a" /* Usuario */]();
            if (this.buscaUsuario.length >= 3) {
                this.cargando = true;
                this.dataService.get('/usuario/?nombre=' + this.buscaUsuario)
                    .then(function (response) {
                    console.log('success usuarios', response);
                    _this.usuarioCita = response.usuario;
                    _this.cargando = false;
                }, function (error) {
                });
            }
            else if (!this.buscaUsuario) {
                this.usuarioCita = [];
            }
        }, 400);
    }
    UsuariosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sharedService.get("/api/ubicacion").then(function (data) {
            _this.provincias = data.ubicacion;
            _this.selectedProvincia = _this.provincias[0];
            _this.selectedCanton = _this.selectedProvincia.cantones[0];
            _this.nuevoUsuario.distrito = _this.selectedCanton.distritos[0].codigo;
        });
    };
    UsuariosComponent.prototype.openModalPrint = function (template) {
        this.printRefCompletar = this.modalService.show(template);
    };
    UsuariosComponent.prototype.changeProvincia = function (event) {
        this.selectedCanton = this.selectedProvincia.cantones[0];
        this.nuevoUsuario.distrito = this.selectedCanton.distritos[0].codigo;
    };
    UsuariosComponent.prototype.changeCanton = function (event) {
        this.nuevoUsuario.distrito = this.selectedCanton.distritos[0].codigo;
    };
    UsuariosComponent.prototype.newUser = function () {
        var _this = this;
        this.nuevoUsuario.contrasenna = 'clave';
        this.nuevoUsuario.fechaNacimiento = this.fecha;
        this.nuevoUsuario.idProvincia = this.selectedProvincia.codigo;
        this.nuevoUsuario.idCanton = this.selectedCanton.codigo;
        this.nuevoUsuario.barrio = '01';
        this.usuarioErrores = this.validatorService.validaUsuario(this.nuevoUsuario);
        if (this.usuarioErrores.length == 0) {
            this.cargando = true;
            this.authService.nuevoUsuarioNoLogin(this.nuevoUsuario);
            var sub_1 = this.authService.loggedObservable.subscribe(function (value) {
                _this.cargando = false;
                if (_this.router.url === '/clientes') {
                    if (value) {
                        _this.nuevoUsuarioError = false;
                        alert('Nuevo cliente guardado.');
                        _this.nuevoUsuario = new __WEBPACK_IMPORTED_MODULE_4__models_usuario__["a" /* Usuario */]();
                    }
                    else {
                        _this.nuevoUsuarioError = true;
                    }
                }
                sub_1.unsubscribe();
            });
        }
    };
    UsuariosComponent.prototype.addTelefono = function () {
        this.validationError = false;
        var nuevoTelefono = '' + this.nuevoTelefono;
        if (nuevoTelefono.length == 8) {
            var tel = new __WEBPACK_IMPORTED_MODULE_5__models_telefono__["a" /* Telefono */]();
            tel.telefono = this.nuevoTelefono + '';
            if (!this.nuevoUsuario.telefono)
                this.nuevoUsuario.telefono = [];
            this.nuevoUsuario.telefono.push(tel);
            this.nuevoTelefono = null;
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del telefono";
        }
    };
    UsuariosComponent.prototype.removeTelefono = function (telefono) {
        this.nuevoUsuario.telefono = this.nuevoUsuario.telefono.filter(function (el) {
            return el.telefono !== telefono.telefono;
        });
    };
    UsuariosComponent.prototype.addCorreo = function () {
        this.validationError = false;
        if (this.validatorService.emailValid(this.nuevoCorreo)) {
            var cor = new __WEBPACK_IMPORTED_MODULE_6__models_correo__["a" /* Correo */]();
            cor.correo = this.nuevoCorreo + '';
            if (!this.nuevoUsuario.correo)
                this.nuevoUsuario.correo = [];
            this.nuevoUsuario.correo.push(cor);
            this.nuevoCorreo = null;
        }
        else {
            this.validationError = true;
            this.validationErrorMsg = "Revise el formato del correo";
        }
    };
    UsuariosComponent.prototype.removeCorreo = function (correo) {
        this.nuevoUsuario.correo = this.nuevoUsuario.correo.filter(function (el) {
            return el.correo !== correo.correo;
        });
    };
    UsuariosComponent.prototype.updateUser = function () {
        var _this = this;
        this.usuarioErrores = this.validatorService.validaUsuario(this.nuevoUsuario, false);
        this.nuevoUsuario.fechaNacimiento = this.fecha;
        this.nuevoUsuario.idProvincia = this.selectedProvincia.codigo;
        this.nuevoUsuario.idCanton = this.selectedCanton.codigo;
        this.nuevoUsuario.barrio = '01';
        if (this.usuarioErrores.length == 0) {
            this.cargando = true;
            this.dataService.post('/usuario/?method=put', { 'usuario': this.nuevoUsuario })
                .then(function (response) {
                alert('Información actualizada');
                _this.cargando = false;
                _this.nuevoUsuario = new __WEBPACK_IMPORTED_MODULE_4__models_usuario__["a" /* Usuario */]();
                _this.encontroUsuario = false;
                _this.buscaUsuario = '';
                _this.fecha = new Date();
            }, function (error) {
                _this.cargando = false;
            });
        }
    };
    UsuariosComponent.prototype.seleccionaUsuarioCita = function (usuario) {
        this.nuevoUsuario = usuario;
        this.selectedProvincia = this.provincias[Number(this.nuevoUsuario.idProvincia) - 1];
        this.selectedCanton = this.selectedProvincia.cantones[Number(this.nuevoUsuario.idCanton) - 1];
        this.encontroUsuario = true;
        this.usuarioCita = [];
        this.fecha = new Date(this.nuevoUsuario.fechaNacimiento);
        console.log(usuario);
    };
    UsuariosComponent.prototype.zerofill = function (i, add) {
        i = i + add;
        return ((i < 10 ? '0' : '') + i);
    };
    UsuariosComponent.prototype.fechaChanges = function (param) {
        var date = this.fecha.getFullYear() + '-' + this.zerofill(this.fecha.getMonth(), 1) + '-' + this.zerofill(this.fecha.getDate(), 0);
        if (date != param) {
            this.fecha = new Date(param.replace(/-/g, '\/'));
        }
    };
    UsuariosComponent.prototype.deleteUser = function () {
        var _this = this;
        this.dataService.post('/usuario/?method=delete&idUsuario=' + this.nuevoUsuario.id + '&idSucursal=' + this.nuevoUsuario.idSucursal, {})
            .then(function (response) {
            alert('Información Eliminada');
            _this.cargando = false;
            _this.nuevoUsuario = new __WEBPACK_IMPORTED_MODULE_4__models_usuario__["a" /* Usuario */]();
            _this.encontroUsuario = false;
            _this.buscaUsuario = '';
        }, function (error) {
            alert('Información Eliminada');
            _this.cargando = false;
            _this.cargando = false;
            _this.nuevoUsuario = new __WEBPACK_IMPORTED_MODULE_4__models_usuario__["a" /* Usuario */]();
            _this.encontroUsuario = false;
            _this.buscaUsuario = '';
        });
    };
    UsuariosComponent.prototype.buscarPorNombre = function () {
        var _this = this;
        this.posiblesClientes = [];
        this.cargando = true;
        this.sharedService.get('/api/personas?tipo=nombre&nombre=' + this.nuevoUsuario.nombre + '&apellido1=' + this.nuevoUsuario.apellido1 + '&apellido2=' + this.nuevoUsuario.apellido2).then(function (res) {
            console.log(res);
            _this.cargando = false;
            if (res.persona.length == 1) {
                _this.nuevoUsuario.cedula = res.persona[0].cedula;
                _this.nuevoUsuario.nombre = _this.toTitleCase(res.persona[0].nombre);
                _this.nuevoUsuario.apellido1 = _this.toTitleCase(res.persona[0].apellido1);
                _this.nuevoUsuario.apellido2 = _this.toTitleCase(res.persona[0].apellido2);
                //this.cliente.tipoId = '01';
                var cod = '' + res.persona[0].codigoelec;
                _this.nuevoUsuario.idProvincia = Number(cod.substr(0, 1));
                _this.nuevoUsuario.idCanton = Number(cod.substr(1, 2));
                _this.selectedProvincia = _this.provincias[Number(_this.nuevoUsuario.idProvincia) - 1];
                _this.selectedCanton = _this.selectedProvincia.cantones[Number(_this.nuevoUsuario.idCanton) - 1];
                _this.nuevoUsuario.distrito = '' + Number(cod.substr(4, 2));
            }
            else {
                _this.posiblesClientes = res.persona;
            }
        }, function (err) {
            console.log(err);
        });
    };
    UsuariosComponent.prototype.toTitleCase = function (str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    UsuariosComponent.prototype.buscarPorCedula = function () {
        var _this = this;
        this.cargando = true;
        this.sharedService.get('/api/personas?tipo=cedula&filter=' + this.nuevoUsuario.cedula).then(function (res) {
            _this.cargando = false;
            if (res.persona.length == 1) {
                _this.nuevoUsuario.cedula = res.persona[0].cedula;
                _this.nuevoUsuario.nombre = _this.toTitleCase(res.persona[0].nombre);
                _this.nuevoUsuario.apellido1 = _this.toTitleCase(res.persona[0].apellido1);
                _this.nuevoUsuario.apellido2 = _this.toTitleCase(res.persona[0].apellido2);
                //this.nuevoUsuario.tipoId = '01';
                var cod = '' + res.persona[0].codigoelec;
                _this.nuevoUsuario.idProvincia = Number(cod.substr(0, 1));
                _this.nuevoUsuario.idCanton = Number(cod.substr(1, 2));
                _this.selectedProvincia = _this.provincias[Number(_this.nuevoUsuario.idProvincia) - 1];
                _this.selectedCanton = _this.selectedProvincia.cantones[Number(_this.nuevoUsuario.idCanton) - 1];
                _this.nuevoUsuario.distrito = '' + Number(cod.substr(4, 2));
            }
        }, function (err) {
            console.log(err);
        });
    };
    UsuariosComponent.prototype.selectCliente = function (cli) {
        this.nuevoUsuario.cedula = cli.cedula;
        //this.cliente.tipoId = '01';
        var cod = '' + cli.codigoelec;
        this.nuevoUsuario.idProvincia = Number(cod.substr(0, 1));
        this.nuevoUsuario.idCanton = Number(cod.substr(1, 2));
        this.nuevoUsuario.distrito = cod.substr(4, 2);
    };
    return UsuariosComponent;
}());
UsuariosComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-usuarios',
        template: __webpack_require__(549),
        styles: [__webpack_require__(446)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__services_data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_data_service__["a" /* DataService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_validator_service__["a" /* ValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_validator_service__["a" /* ValidatorService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_shared_service__["a" /* SharedService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _f || Object])
], UsuariosComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=usuarios.component.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 41:
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

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "ul{\n\ttext-align: center;\n}\n\n.barberos{\n\twidth: 80px;\n    height: 103px;\n    margin-right: 10px;\n    display: inline-block;\n    text-align: center;\n}\n\n.error{\n    color: orange;\n    text-decoration: underline;\n}\n\n.barberos.active .icon-barbero{\n\tborder-color: green;\n    border-width: 2px;\n}\n\n.icon-barbero{\n\twidth: 80px;\n    height: 80px;\n    border-radius: 39px;\n    border: 1px solid black;\n    overflow: hidden;\n    background: white;\n}\n\n.icon-barbero img{\n\twidth: 80px;\n\theight: 80px;\n}\n\n.icon-barbero:hover {\n\tanimation: pop 0.3s linear 1;\n}\n\n.card:hover {\n\tanimation: pop 0.3s linear 1;\n}\n\n@keyframes pop {\n\t50%  {transform: scale(1.2);}\n}\n\n.card {\n    width: 120px;\n    margin-left: 4px;\n    margin-bottom: 4px;\n    display: inline-block;\n    border-color: black;\n    box-shadow: 3px 4px 2px -2px grey;\n}\n\n.card.active{\n\tborder-color: green;\n    border-width: 2px;\n}\n\n.servicio-card{\n    padding: 3px;\n}\n\n.servicio-card p{\n    word-wrap: break-word;\n}\n\n.no-display{\n    display: none;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".ancho{\n\twidth: 80% !important;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".centered-content{\n\ttext-align: center;\n}\n\n.date{\n\tpadding-bottom: 10px;\n    margin-bottom: 10px;\n}\n\n.underline{\n\tborder-bottom: 1px solid black;\n}\n\n.error{\n\tborder: 1px solid red;\n}\n\n.date .col-2{\n\tfont-weight: bold;\n\tfont-size: 20px;\n}\n\n.heading{\n\tfont-weight: bold;\n\tfont-size: 16px;\n\tborder-bottom: 1px solid black;\n}\n\n.cita{\n\t/*border: 1px solid green;\n\tborder-radius: 5px;*/\n}\n\n.telefonos{\n  margin-top: 15px;\n}\n\n.reservas li div{\n\tbackground-color: white;\n\tdisplay: inline-block;\n\tborder: 1px solid green;\n\ttext-align: center;\n\twidth: 100%;\n\tborder-radius: 5px;\n\tmargin-bottom: 5px;\t\n\tpadding-top: 4px;\n\tpadding-bottom: 4px;\n}\n\n.update{\n\tmargin-top: 20px;\n}\n\n.pausas button{\n\tmargin-bottom: 15px;\n}\n\n.active{\n\tborder: 1px solid green !important;\n\tbackground: green !important;\n}\n\n.repetir-item{\n\tbackground: gray;\n    display: inline-block;\n    padding: 3px;\n    width: 30px;\n    text-align: center;\n    color: white;\n    border: 1px solid black;\n}\n\nul.pausas-edit li {\n    margin-bottom: 12px;\n}\n\n.actualizar-usuario div{\n\tmargin-bottom: 12px;\n}\n\n.actualizar-usuario input{\n\twidth: 100%;\n}\n\n.action-modal{\n\tmargin-top: 15px;\n}\n\n.actualizar-horario .col-8{\n\tpadding-right: 0;\n    padding-left: 4px;\n}\n\n.nuevo-numero input{\n\twidth: 80% !important;\n}\n\n.small-action{\n\tdisplay: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n\twidth: 80%;\n\tdisplay: inline-block;\n}\n\n.correo-display .small-action{\n\twidth: 50px;\n}\n\n.correo-display .display{\n\twidth: 100%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\n.nuevo-numero input{\n   width: 80% !important;\n}\n\n.small-action{\n   display: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n   width: 80%;\n   display: inline-block;\n}\n\n.correo-display .small-action{\n   /*width: 50px;*/\n}\n\n.correo-display .display{\n   width: 80%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.contact-item .telefono-display, .contact-item .display{\n   border-bottom: 1px solid black;\n}\n\n.contact-item,.telefonos,.correos,.nuevo-numero{\n   margin-bottom: 0px !important;\n}\n\n.resumen .title{\n  margin-top: 23px;\n  font-weight: bold;\n}\n\n.resumen div{\n  margin-bottom: 10px;\n}\n\n.barbero-cita{\n  padding-bottom: 2px;\n  border-bottom: 1px solid black;\n  margin-bottom: 7px;\n}\n\n.separador{\n    border-bottom: 1px solid;\n    margin-bottom: 10px;\n} ", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".actions{\n\ttext-align: center;\n    padding: 30px 0;\n    border-bottom: 1px solid black;\n}\n\nselect.styled-select{\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  padding-left: 7px;\n}\n\n.error{\n   border: 1px solid red;\n}\n\ninput{\n\twidth: 100%;\n}\n\n.modal-body .row div{\n\tmargin-bottom: 20px;\n}\n\n.actions button{\n\tmargin-top: 10px;\n}\n\n.accion{\n\ttext-transform: capitalize;\n}\n\n.item{\n\tmargin-bottom: 15px;\n}\n\n.heading{\n\tfont-weight: bold;\n\tfont-size: 16px;\n\ttext-decoration: underline;\t\n}\n\n\n.nuevo-numero input{\n   width: 80% !important;\n}\n\n.small-action{\n   display: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n   width: 80%;\n   display: inline-block;\n}\n\n.correo-display .small-action{\n   /*width: 50px;*/\n}\n\n.correo-display .display{\n   width: 80%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.contact-item .telefono-display, .contact-item .display{\n   border-bottom: 1px solid black;\n}\n\n.contact-item,.telefonos,.correos,.nuevo-numero{\n   margin-bottom: 0px !important;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".odd{\n\tbackground-color: #40414c;\n\tcolor: white;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".footer {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 60px;\n  line-height: 60px;\n  background-color: #f5f5f5;\n  text-align: center;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "img {\n\tmargin: 0;   \n\tmax-width: 100% !important;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".home .header{\n\tfont-size: 19px;\n    font-weight: 700;\n    height: 120px;\n    padding-top: 38px;\n    line-height: 26px;\n    letter-spacing: 0.2px;\n}\n\n.mini-gallery .row a{\n\tpadding: 11px 2px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".centered-content{\n\ttext-align: center;\n}\n\n.date{\n\tpadding-bottom: 10px;\n    margin-bottom: 10px;\n}\n\n.underline{\n\tborder-bottom: 1px solid black;\n}\n\n.error{\n\tborder: 1px solid red;\n}\n\n.date .col-2{\n\tfont-weight: bold;\n\tfont-size: 20px;\n}\n\n.heading{\n\tfont-weight: bold;\n\tfont-size: 16px;\n\tborder-bottom: 1px solid black;\n}\n\n.cita{\n\t/*border: 1px solid green;\n\tborder-radius: 5px;*/\n}\n\n.telefonos{\n  margin-top: 15px;\n}\n\n.reservas li div{\n\tbackground-color: white;\n\tdisplay: inline-block;\n\tborder: 1px solid green;\n\ttext-align: center;\n\twidth: 100%;\n\tborder-radius: 5px;\n\tmargin-bottom: 5px;\t\n\tpadding-top: 4px;\n\tpadding-bottom: 4px;\n}\n\n.update{\n\tmargin-top: 20px;\n}\n\n.pausas button{\n\tmargin-bottom: 15px;\n}\n\n.active{\n\tborder: 1px solid green !important;\n\tbackground: green !important;\n}\n\n.repetir-item{\n\tbackground: gray;\n    display: inline-block;\n    padding: 3px;\n    width: 30px;\n    text-align: center;\n    color: white;\n    border: 1px solid black;\n}\n\nul.pausas-edit li {\n    margin-bottom: 12px;\n}\n\n.actualizar-usuario div{\n\tmargin-bottom: 12px;\n}\n\n.actualizar-usuario input{\n\twidth: 100%;\n}\n\n.action-modal{\n\tmargin-top: 15px;\n}\n\n.actualizar-horario .col-8{\n\tpadding-right: 0;\n    padding-left: 4px;\n}\n\n.nuevo-numero input{\n\twidth: 80% !important;\n}\n\n.small-action{\n\tdisplay: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n\twidth: 80%;\n\tdisplay: inline-block;\n}\n\n.correo-display .small-action{\n\twidth: 50px;\n}\n\n.correo-display .display{\n\twidth: 100%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\n.nuevo-numero input{\n   width: 80% !important;\n}\n\n.small-action{\n   display: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n   width: 80%;\n   display: inline-block;\n}\n\n.correo-display .small-action{\n   /*width: 50px;*/\n}\n\n.correo-display .display{\n   width: 80%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.contact-item .telefono-display, .contact-item .display{\n   border-bottom: 1px solid black;\n}\n\n.contact-item,.telefonos,.correos,.nuevo-numero{\n   margin-bottom: 0px !important;\n}\n\n.resumen .title{\n  margin-top: 23px;\n  font-weight: bold;\n}\n\n.resumen div{\n  margin-bottom: 10px;\n}\n\n.barbero-cita{\n  padding-bottom: 2px;\n  border-bottom: 1px solid black;\n  margin-bottom: 7px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".login input{\n\twidth: 100%;\n  border: 1px solid;\n}\n\n.required{\n  color: black;\n  font-size: 16px;\n}\n.required.reqerror{\n  color: red;\n}\n\n.entrar{\n\tmargin-top: 25px;\n\tmargin-bottom: 20px;\n\ttext-align: center;\n}\n\n.tab-container .nav-link {\n    padding-top: 1px !important;\n    padding-bottom: 1px !important;\n    font-size: 14px !important;\n}\n\n.error{\n\tborder: 1px solid red !important;\n}\n\n.user-input{\n  margin-bottom: 15px;\n}\n\n\n.nuevo-numero input{\n\twidth: 80% !important;\n}\n\n.small-action{\n\tdisplay: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n\twidth: 80%;\n\tdisplay: inline-block;\n}\n\n.correo-display .small-action{\n\twidth: 50px;\n}\n\n.correo-display .display{\n\twidth: 100%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\n.nuevo-numero input{\n   width: 80% !important;\n}\n\n.small-action{\n   display: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n    margin: 2px;\n}\n\n.telefono-display{\n   width: 80%;\n   display: inline-block;\n}\n\n.correo-display .small-action{\n   /*width: 50px;*/\n}\n\n.correo-display .display{\n   width: 80%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.contact-item .telefono-display, .contact-item .display{\n   border-bottom: 1px solid black;\n}\n\n.contact-item,.telefonos,.correos,.nuevo-numero{\n   margin-bottom: 0px !important;\n}\n\n.telefonos{\n  margin-top: 15px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".navbar-brand img{\n    display: inline-block;\n    width: 40px;\n    height: 14px;\n    margin-left: 6px;\n}\n\n.menu-toogle{\n\tmargin-top: 7px;\n}\n\n.login-logo{\n\tborder-radius: 22px;\n    height: 39px;\n    min-width: 40px;\n    background-size: 100%;\n}\n\n.title{\n\tmargin-left: 58px;\n    padding-top: 4px;\n    display: inline-block;\n}\n\n.impersonando{\n    color: white;\n    border: 1px solid black;\n    background-color: red;\n    position: absolute;\n    top: 54px;\n    z-index: 10;\n    width: 100%;\n}\n\n.impersonando span{\n    color: blue;\n    text-decoration: underline;\n}\n\n.user-img img{\n    width: 38px;\n    border-radius: 19px;\n}\n\n/*.navbar{\n\tcolor: black !important;\n\tbackground: white !important;\n}\n\n.navbar a{\n\tcolor: black !important;\n}*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".item-action{\n\tfont-weight: bold;\n}\n\nselect.styled-select{\n\t-webkit-appearance: none;\n\t   -moz-appearance: none;\n\t        appearance: none;\n\tpadding-left: 7px;\n}\n\n.confirmar-items li span:first-child{\n\twidth: 90px;\n    display: inline-block;\n}\n\n.title{\n\ttext-align: center;\n\twidth: 100%;\n\tmargin-top: 14px;\n}\n\n.reserva{\n\tbackground-color: #2196f3 !important;\n\tmargin-top: 0px;\n\tpadding-top: 14px;\n\tdisplay: none;\n}\n\n.reserva h5{\n\tmargin-bottom: 0px;\n}\n\n.tab-pane > div{\n\tmargin-top: 10px;\n}\n\n.map{\n\twidth: 100%;\n\theight: 208px;\n}\n\n.next{\n\ttext-align: center;\n\tmargin: 28px 0;\n}\n\n.next button{\n\twidth: 50%;\n    font-size: 24px;\n}\n\n.date{\n\tdisplay: none;\n}\n\n.date.active{\n\tdisplay: inline-block;\n}\n\n.reservas li div{\n\tbackground-color: white;\n\tdisplay: inline-block;\n\tborder: 1px solid black;\n\ttext-align: center;\n\twidth: 100%;\n\tborder-radius: 5px;\n\tmargin-bottom: 5px;\t\n\tpadding-top: 4px;\n\tbox-shadow: 3px 4px 2px -2px grey;\n}\n\n.reservas li div p{\n\tmargin-bottom: 6px;\n}\n\n.reservas li div.reservada{\n\tbackground-color: firebrick;\n\tcolor: white;\n}\n\n\n.go-back-date{\n\tcolor: #2196f3;\n    font-size: 21px;\n    padding-top: 1px;\n    margin-left: 5px;\n}\n\n.error{\n\tcolor: red;\n}\n\n.next button{\n\tposition: fixed;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n}\n\n.volver{\n\ttext-decoration: underline;\n\tcursor: pointer;\n}\n\n.usuarios{\n\ttext-decoration: underline;\n\tcursor: pointer;\n}\n\n.usuarios.active{\n\tcolor: #2196f3;\n}\n\n.login input{\n\twidth: 100%;\n  border: 1px solid;\n}\n\n.required{\n  color: black;\n  font-size: 16px;\n}\n.required.reqerror{\n  color: red;\n}\n\n.entrar{\n\tmargin-top: 25px;\n\tmargin-bottom: 20px;\n\ttext-align: center;\n}\n\n.tab-container .nav-link {\n    padding-top: 1px !important;\n    padding-bottom: 1px !important;\n    font-size: 14px !important;\n}\n\n.error-input{\n\tborder: 1px solid red !important;\n}\n\n.user-input{\n  margin-bottom: 15px;\n}\n\n\n.nuevo-numero input{\n\twidth: 80% !important;\n}\n\n.small-action{\n\tdisplay: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n\twidth: 80%;\n\tdisplay: inline-block;\n}\n\n.correo-display .small-action{\n\twidth: 50px;\n}\n\n.correo-display .display{\n\twidth: 100%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\n.nuevo-numero input{\n   width: 80% !important;\n}\n\n.small-action{\n   display: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n    margin: 2px;\n}\n\n.telefono-display{\n   width: 80%;\n   display: inline-block;\n}\n\n.correo-display .small-action{\n   /*width: 50px;*/\n}\n\n.correo-display .display{\n   width: 80%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.contact-item .telefono-display, .contact-item .display{\n   border-bottom: 1px solid black;\n}\n\n.contact-item,.telefonos,.correos,.nuevo-numero{\n   margin-bottom: 0px !important;\n}\n\n.telefonos{\n  margin-top: 15px;\n}\n\n.nuevo-usuario{\n\ttext-decoration: underline;\n}\n\n.auto-usuario{\n\tborder: 1px solid black;\n}\n\n.reservas li div.reservada{\n\tbackground-color: red;\n}\n\n.ball{\n\tdisplay: inline-block;\n\twidth: 20px;\n\theight: 20px;\n\tborder: 1px solid black;\n\tborder-radius: 10px;\n}\nspan.reservada, span.pausada, span.active{\n\twhite-space: nowrap;\n}\n\nspan.reservada .ball{\n\tbackground-color: red;\n}\n\n.reservas li div.pausada{\n\tbackground-color: orange;\n}\n\nspan.pausada .ball{\n\tbackground-color: orange;\n}\n\n.reservas li div.active{\n\tbackground-color: lightseagreen;\n}\n\nspan.active .ball{\n\tbackground-color: lightseagreen;\n}\n\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".centered-content{\n\ttext-align: center;\n}\n\n.date{\n\tpadding-bottom: 10px;\n    margin-bottom: 10px;\n}\n\n.underline{\n\tborder-bottom: 1px solid black;\n}\n\n.error{\n\tborder: 1px solid red;\n}\n\n.date .col-2{\n\tfont-weight: bold;\n\tfont-size: 20px;\n}\n\n.heading{\n\tfont-weight: bold;\n\tfont-size: 16px;\n\tborder-bottom: 1px solid black;\n}\n\n.cita{\n\t/*border: 1px solid green;\n\tborder-radius: 5px;*/\n}\n\n.telefonos{\n  margin-top: 15px;\n}\n\n.reservas li div{\n\tbackground-color: white;\n\tdisplay: inline-block;\n\tborder: 1px solid green;\n\ttext-align: center;\n\twidth: 100%;\n\tborder-radius: 5px;\n\tmargin-bottom: 5px;\t\n\tpadding-top: 4px;\n\tpadding-bottom: 4px;\n}\n\n.update{\n\tmargin-top: 20px;\n}\n\n.pausas button{\n\tmargin-bottom: 15px;\n}\n\n.active{\n\tborder: 1px solid green !important;\n\tbackground: green !important;\n}\n\n.repetir-item{\n\tbackground: gray;\n    display: inline-block;\n    padding: 3px;\n    width: 30px;\n    text-align: center;\n    color: white;\n    border: 1px solid black;\n}\n\nul.pausas-edit li {\n    margin-bottom: 12px;\n}\n\n.actualizar-usuario div{\n\tmargin-bottom: 12px;\n}\n\n.actualizar-usuario input{\n\twidth: 100%;\n}\n\n.action-modal{\n\tmargin-top: 15px;\n}\n\n.actualizar-horario .col-8{\n\tpadding-right: 0;\n    padding-left: 4px;\n}\n\n.nuevo-numero input{\n\twidth: 80% !important;\n}\n\n.small-action{\n\tdisplay: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n\twidth: 80%;\n\tdisplay: inline-block;\n}\n\n.correo-display .small-action{\n\twidth: 50px;\n}\n\n.correo-display .display{\n\twidth: 100%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\n.nuevo-numero input{\n   width: 80% !important;\n}\n\n.small-action{\n   display: inline-block;\n    width: 25px;\n    height: 26px;\n    border: 1px solid black;\n    border-radius: 14px;\n    text-align: center;\n    font-size: 17px;\n    color: red;\n}\n\n.telefono-display{\n   width: 80%;\n   display: inline-block;\n}\n\n.correo-display .small-action{\n   /*width: 50px;*/\n}\n\n.correo-display .display{\n   width: 80%;\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.contact-item .telefono-display, .contact-item .display{\n   border-bottom: 1px solid black;\n}\n\n.contact-item,.telefonos,.correos,.nuevo-numero{\n   margin-bottom: 0px !important;\n}\n\n.resumen .title{\n  margin-top: 23px;\n  font-weight: bold;\n}\n\n.resumen div{\n  margin-bottom: 10px;\n}\n\n.barbero-cita{\n  padding-bottom: 2px;\n  border-bottom: 1px solid black;\n  margin-bottom: 7px;\n}\n\n\n.separador{\n    border-bottom: 1px solid;\n    margin-bottom: 25px;\n}\n\n.tamComponent{\n   width: 40%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 144,
	"./af.js": 144,
	"./ar": 151,
	"./ar-dz": 145,
	"./ar-dz.js": 145,
	"./ar-kw": 146,
	"./ar-kw.js": 146,
	"./ar-ly": 147,
	"./ar-ly.js": 147,
	"./ar-ma": 148,
	"./ar-ma.js": 148,
	"./ar-sa": 149,
	"./ar-sa.js": 149,
	"./ar-tn": 150,
	"./ar-tn.js": 150,
	"./ar.js": 151,
	"./az": 152,
	"./az.js": 152,
	"./be": 153,
	"./be.js": 153,
	"./bg": 154,
	"./bg.js": 154,
	"./bm": 155,
	"./bm.js": 155,
	"./bn": 156,
	"./bn.js": 156,
	"./bo": 157,
	"./bo.js": 157,
	"./br": 158,
	"./br.js": 158,
	"./bs": 159,
	"./bs.js": 159,
	"./ca": 160,
	"./ca.js": 160,
	"./cs": 161,
	"./cs.js": 161,
	"./cv": 162,
	"./cv.js": 162,
	"./cy": 163,
	"./cy.js": 163,
	"./da": 164,
	"./da.js": 164,
	"./de": 167,
	"./de-at": 165,
	"./de-at.js": 165,
	"./de-ch": 166,
	"./de-ch.js": 166,
	"./de.js": 167,
	"./dv": 168,
	"./dv.js": 168,
	"./el": 169,
	"./el.js": 169,
	"./en-au": 170,
	"./en-au.js": 170,
	"./en-ca": 171,
	"./en-ca.js": 171,
	"./en-gb": 172,
	"./en-gb.js": 172,
	"./en-ie": 173,
	"./en-ie.js": 173,
	"./en-il": 174,
	"./en-il.js": 174,
	"./en-nz": 175,
	"./en-nz.js": 175,
	"./eo": 176,
	"./eo.js": 176,
	"./es": 89,
	"./es-do": 177,
	"./es-do.js": 177,
	"./es-us": 178,
	"./es-us.js": 178,
	"./es.js": 89,
	"./et": 179,
	"./et.js": 179,
	"./eu": 180,
	"./eu.js": 180,
	"./fa": 181,
	"./fa.js": 181,
	"./fi": 182,
	"./fi.js": 182,
	"./fo": 183,
	"./fo.js": 183,
	"./fr": 186,
	"./fr-ca": 184,
	"./fr-ca.js": 184,
	"./fr-ch": 185,
	"./fr-ch.js": 185,
	"./fr.js": 186,
	"./fy": 187,
	"./fy.js": 187,
	"./gd": 188,
	"./gd.js": 188,
	"./gl": 189,
	"./gl.js": 189,
	"./gom-latn": 190,
	"./gom-latn.js": 190,
	"./gu": 191,
	"./gu.js": 191,
	"./he": 192,
	"./he.js": 192,
	"./hi": 193,
	"./hi.js": 193,
	"./hr": 194,
	"./hr.js": 194,
	"./hu": 195,
	"./hu.js": 195,
	"./hy-am": 196,
	"./hy-am.js": 196,
	"./id": 197,
	"./id.js": 197,
	"./is": 198,
	"./is.js": 198,
	"./it": 199,
	"./it.js": 199,
	"./ja": 200,
	"./ja.js": 200,
	"./jv": 201,
	"./jv.js": 201,
	"./ka": 202,
	"./ka.js": 202,
	"./kk": 203,
	"./kk.js": 203,
	"./km": 204,
	"./km.js": 204,
	"./kn": 205,
	"./kn.js": 205,
	"./ko": 206,
	"./ko.js": 206,
	"./ky": 207,
	"./ky.js": 207,
	"./lb": 208,
	"./lb.js": 208,
	"./lo": 209,
	"./lo.js": 209,
	"./lt": 210,
	"./lt.js": 210,
	"./lv": 211,
	"./lv.js": 211,
	"./me": 212,
	"./me.js": 212,
	"./mi": 213,
	"./mi.js": 213,
	"./mk": 214,
	"./mk.js": 214,
	"./ml": 215,
	"./ml.js": 215,
	"./mn": 216,
	"./mn.js": 216,
	"./mr": 217,
	"./mr.js": 217,
	"./ms": 219,
	"./ms-my": 218,
	"./ms-my.js": 218,
	"./ms.js": 219,
	"./mt": 220,
	"./mt.js": 220,
	"./my": 221,
	"./my.js": 221,
	"./nb": 222,
	"./nb.js": 222,
	"./ne": 223,
	"./ne.js": 223,
	"./nl": 225,
	"./nl-be": 224,
	"./nl-be.js": 224,
	"./nl.js": 225,
	"./nn": 226,
	"./nn.js": 226,
	"./pa-in": 227,
	"./pa-in.js": 227,
	"./pl": 228,
	"./pl.js": 228,
	"./pt": 230,
	"./pt-br": 229,
	"./pt-br.js": 229,
	"./pt.js": 230,
	"./ro": 231,
	"./ro.js": 231,
	"./ru": 232,
	"./ru.js": 232,
	"./sd": 233,
	"./sd.js": 233,
	"./se": 234,
	"./se.js": 234,
	"./si": 235,
	"./si.js": 235,
	"./sk": 236,
	"./sk.js": 236,
	"./sl": 237,
	"./sl.js": 237,
	"./sq": 238,
	"./sq.js": 238,
	"./sr": 240,
	"./sr-cyrl": 239,
	"./sr-cyrl.js": 239,
	"./sr.js": 240,
	"./ss": 241,
	"./ss.js": 241,
	"./sv": 242,
	"./sv.js": 242,
	"./sw": 243,
	"./sw.js": 243,
	"./ta": 244,
	"./ta.js": 244,
	"./te": 245,
	"./te.js": 245,
	"./tet": 246,
	"./tet.js": 246,
	"./tg": 247,
	"./tg.js": 247,
	"./th": 248,
	"./th.js": 248,
	"./tl-ph": 249,
	"./tl-ph.js": 249,
	"./tlh": 250,
	"./tlh.js": 250,
	"./tr": 251,
	"./tr.js": 251,
	"./tzl": 252,
	"./tzl.js": 252,
	"./tzm": 254,
	"./tzm-latn": 253,
	"./tzm-latn.js": 253,
	"./tzm.js": 254,
	"./ug-cn": 255,
	"./ug-cn.js": 255,
	"./uk": 256,
	"./uk.js": 256,
	"./ur": 257,
	"./ur.js": 257,
	"./uz": 259,
	"./uz-latn": 258,
	"./uz-latn.js": 258,
	"./uz.js": 259,
	"./vi": 260,
	"./vi.js": 260,
	"./x-pseudo": 261,
	"./x-pseudo.js": 261,
	"./yo": 262,
	"./yo.js": 262,
	"./zh-cn": 263,
	"./zh-cn.js": 263,
	"./zh-hk": 264,
	"./zh-hk.js": 264,
	"./zh-tw": 265,
	"./zh-tw.js": 265
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
webpackContext.id = 452;


/***/ }),

/***/ 533:
/***/ (function(module, exports) {

module.exports = "<app-nav></app-nav>\n<router-outlet></router-outlet>\t\n<!-- <app-footer></app-footer>\n -->"

/***/ }),

/***/ 534:
/***/ (function(module, exports) {

module.exports = "<ul>\n\t<li *ngFor=\"let barbero of barberos\" (click)=\"selectedServicio = '';selectBarber(barbero);\" class=\"barberos\" [class.active]=\"selectedBarber==barbero\">\n\t\t<div class=\"icon-barbero\">\n\t\t\t<img src=\"https://graph.facebook.com/{{barbero.usuario}}/picture?type=large\" *ngIf=\"isFB(barbero.usuario)\">\n\t\t\t<!-- <img src=\"assets/images/barbero-icon.png\" *ngIf=\"(barbero.img == null) && (barbero.sexo == 'M')\"> -->\n\t\t\t<!-- <img src=\"assets/images/barbera-icon.png\" *ngIf=\"(barbero.img == null) && (barbero.sexo == 'F')\"> -->\n\t\t\t<img src=\"assets/images/barbero-icon.png\" *ngIf=\"!isFB(barbero.usuario)\">\n\t\t</div>\n\t\t<p>{{barbero.nombre}}</p>\n\t</li>\n\t<p *ngIf=\"barberos.length == 0 && obteniendoBarberos == false\" class=\"error\">\n\t\tLo sentimos pero el local seleccionado aún no cuenta con servidores!\n\t</p>\n\t<p *ngIf=\"obteniendoBarberos\" class=\"error\">\n\t\tCargando Barberos...\n\t</p>\n</ul>\n<div *ngIf=\"selectedBarber\">\n\t<p>Seleccione el servicio que desea de {{selectedBarber.nombre}}:</p>\n\t<ul class=\"row justify-content-center\">\n\t\t<li *ngFor=\"let servicio of selectedBarber.servicios\" (click)=\"!servicio.esDinamico && selectServicio(servicio,false)\" class=\"card servicio-card\" [class.active]=\"selectedServicio==servicio\">\n\t\t\t<p>{{servicio.descripcion}}</p>\n\t\t\t<div *ngIf=\"servicio.esDinamico && !isRegularUser\">\n\t\t\t\t<p>Precio: <input type=\"number\" name=\"\" [(ngModel)]=\"servicio.precioDinamico\" style=\"width: 100px;\"></p>\n\t\t\t\t<p>Duración: \n\t\t\t\t<select [(ngModel)]=\"servicio.duracionDinamica\" style=\"width: 100px;\">\n\t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [ngValue]=\"tiempo\">{{convertMinsToHrsMins(tiempo)}}</option>\n\t\t\t\t</select>\n\t\t\t\t</p>\n\t\t\t\t<p>Descripción: <input type=\"text\" name=\"\" [(ngModel)]=\"servicio.descripcionDinamica\" style=\"width: 100px;\"></p>\n\t\t\t\t<button class=\"btn btn-primary\" (click)=\"selectServicio(servicio,true)\">Listo</button>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"servicio.esDinamico && isRegularUser\">\n\t\t\t\tComuniquese con la Barbería para este servicio.<br>Tel: {{selectedBarber.telefono[0].telefono}}\n\t\t\t</div>\n\t\t\t<div *ngIf=\"!servicio.esDinamico\">\n\t\t\t\t<p>{{servicio.precio}} Colones</p>\n\t\t\t\t<p>{{servicio.duracion}} Minutos</p>\n\t\t\t</div>\n\t\t</li>\n\t\t<p *ngIf=\"selectedBarber.servicios && selectedBarber.servicios.length == 0\" class=\"error\">\n\t\t\tLo sentimos pero la persona seleccionada aún no tiene servicios registrados!\n\t\t</p>\n\t</ul>\n</div>\n"

/***/ }),

/***/ 535:
/***/ (function(module, exports) {

module.exports = "<input type=\"text\" style=\"\"\n       #dp=\"bsDatepicker\"\n       bsDatepicker [(bsValue)]=\"bsValue\" [value]=\"parseDate(bsValue)\" class=\"{{customClass}}\" [class.ancho]=\"!customClass\">"

/***/ }),

/***/ 536:
/***/ (function(module, exports) {

module.exports = "<div style=\"display:inline-block; min-height:290px;\" class=\"calendario\">\n\t<datepicker [(ngModel)]=\"dt\" [minDate]=\"minDate\" [showWeeks]=\"false\" [dateDisabled]=\"dateDisabled\" (selectionDone)=\"dateChanged($event)\" class=\"theme-green\"></datepicker>\n</div>"

/***/ }),

/***/ 537:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-space\">\n</div>\n\n<div class=\"container\">\n\t<div clas=\"col-12\">\n\t\t<div class=\"module white-back static row\">\n\t\t\t<div class=\"title reserva col-12\">\n\t\t\t  <h5>Citas</h5>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 item\" *ngIf=\"authService.isRegularUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5 clickable\" (click)=\"displayCitas = !displayCitas\">\n\t\t\t\t\t\t<p class=\"heading\">Citas <span *ngIf=\"!displayCitas\">></span> <span *ngIf=\"displayCitas\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\" *ngIf=\"displayCitas\">\n\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t<li *ngFor=\"let cita of reservas\" class=\"col-12 col-md-6\">\n\t\t\t\t\t\t\t\t<div (click)=\"obtieneInfo(cita);selectedCita = Object.assign({}, cita);openModal(citaModal)\">\n\t\t\t\t\t\t\t\t\t{{cita.dia}} - {{convierteTiempo(cita.horaInicialFormat)}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<p *ngIf=\"cargandoCitas\" class=\"col-12\">\n\t\t\t\t\t\t\t\tCargando citas...\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p *ngIf=\"reservas.length == 0\" class=\"col-12\">\n\t\t\t\t\t\t\t\tNo tiene citas.\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 item\" *ngIf=\"authService.isBarberoUser() && !authService.isAdminSucursalUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5 clickable\" (click)=\"displayCitas = !displayCitas\">\n\t\t\t\t\t\t<p class=\"heading\">Citas <span *ngIf=\"!displayCitas\">></span> <span *ngIf=\"displayCitas\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row date\" *ngIf=\"displayCitas\">\n\t\t\t\t\t<div class=\"col-2 centered-content clickable\" >\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8 centered-content \">\n\t\t\t\t\t\t<calendario-input [daterecive]=\"today\" (dateSelectedChange)=\"changeDateBarberia($event)\"></calendario-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-2 centered-content clickable\" >\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayCitas\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t<li *ngFor=\"let cita of reservas\" class=\"col-4 cita\">\n\t\t\t\t\t\t\t\t<div (click)=\"obtieneInfo(cita);selectedCita = Object.assign({}, cita);openModal(citaModal)\">\n\t\t\t\t\t\t\t\t\t{{convierteTiempo(cita.horaInicialFormat)}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<p *ngIf=\"cargandoCitas\" class=\"col-12\">\n\t\t\t\t\t\t\t\tCargando citas...\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t<p *ngIf=\"reservas.length == 0\" class=\"col-12\">\n\t\t\t\t\t\t\t\tNo tiene citas para el día seleccionado.\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<!-- display citas barberia -->\n\t\t\t<div class=\"col-xs-12 item\" *ngIf=\"authService.isAdminSucursalUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5 clickable\">\n\t\t\t\t\t\t<p class=\"heading\">Citas Barberia</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row date\" *ngIf=\"displayCitasBarberia\">\n\t\t\t\t\t<div class=\"col-2 centered-content clickable\" >\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8 centered-content \">\n\t\t\t\t\t\t<calendario-input [daterecive]=\"today\" (dateSelectedChange)=\"changeDateBarberia($event)\"></calendario-input>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-2 centered-content clickable\">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row justify-content-center\" *ngIf=\"displayCitasBarberia\">\n\t\t\t\t\t<div class=\"col-10\">\n\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t<li *ngFor=\"let barberoCita of barberosCitasSucursal\" class=\"col-12 barbero-cita\">\n\t\t\t\t\t\t\t\t<p> Barbero: {{barberoCita.barbero.nombre}} {{barberoCita.barbero.apellido1}}\n\t\t\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t\t\t<li *ngFor=\"let cita of barberoCita.citas\" class=\"col-4 cita\">\n\t\t\t\t\t\t\t\t\t\t<div (click)=\"obtieneInfo(cita);selectedCita = Object.assign({}, cita);openModal(citaModal)\">\n\t\t\t\t\t\t\t\t\t\t\t{{convierteTiempo(cita.horaInicialFormat)}}\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<p *ngIf=\"barberoCita.citas.length == 0\" class=\"col-12\">\n\t\t\t\t\t\t\t\t\t\tNo tiene citas registradas para este día.\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<p *ngIf=\"obteniendoBarberos\" class=\"col-12\">\n\t\t\t\t\t\t\t\tObteniendo citas...\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"(authService.isBarberoUser() && authService.isAdminUser()) || authService.isBarberoUser() || authService.isAdminSucursalUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayResumen = !displayResumen\">\n\t\t\t\t\t\t<p class=\"heading\">Resumen <span *ngIf=\"!displayResumen\">></span> <span *ngIf=\"displayResumen\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayResumen\">\n\t\t\t\t\t<div class=\"col-9\">\n\t\t\t\t\t\t<select class=\"styled-select blue semi-square\"(change)=\"changeBarbero($event.target.value)\" *ngIf=\"authService.isAdminSucursalUser()\">\n\t                    \t<option *ngFor=\"let barberoCita of barberosCitasSucursal\" [value]='barberoCita.barbero.id'>{{barberoCita.barbero.nombre}} {{barberoCita.barbero.primerApellido}}</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row date\" *ngIf=\"displayResumen\">\n\t\t\t\t\t<div class=\"col-6\">Fecha Inicial:<br> <calendario-input (dateSelectedChange)=\"fechaInicialChanges($event)\"></calendario-input></div>\n\t\t\t\t\t<div class=\"col-6\">Fecha Final:<br> <calendario-input (dateSelectedChange)=\"fechaFinalChanges($event)\"></calendario-input></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayResumen\">\n\t\t\t\t\t<div class=\"col-12 update centered-content\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"generar()\">\n\t\t\t\t\t\t\tGenerar\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row resumen\" *ngIf=\"displayResumen && resumenGenerado\">\n\t\t\t\t\t<div class=\"col-12 centered-content title\">\n\t\t\t\t\t\tResumen de {{resumenFechaInicial}} hasta {{resumenFechaFinal}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\tCantidad de citas:\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\t{{cantidadCitas}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\tGanancias por citas:\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\t{{ganancias | number:'.2-2'}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\t\t\n\n<template #confirmaEliminarCita>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Confirmar eliminación de cita</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body\">\n      \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"eliminarCita()\">\n\t\t\tEliminar\n\t\t</button>\n\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\">\n\t\t\tNo Eliminar\n\t\t</button>\n    </div>\n</template>\n\n\n<div class=\"cargando\" *ngIf=\"cargando\">\n  <div>\n    <img src=\"assets/images/m2.png\">\n    Cargando...\n  </div>\n</div>\n<template #citaModal>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Cita</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body container\">\n    \t<ul class=\"row\">\n          <li class=\"col-5\"><span>Barberia : </span></li>\n          <li class=\"col-7\"><span>{{selectedCita.sucursal}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\"><span>{{selectedCita.nombreBarbero}} {{selectedCita.primerApellidoBarbero}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Tel Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\">\n          \t<span *ngFor=\"let tel of telefonosBarberoDisplay\">\n          \t\t{{tel.telefono}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Correo Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\">\n          \t<span *ngFor=\"let cor of correosBarberoDisplay\">\n          \t\t{{cor.correo}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\"><span>Servicio : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedCita.esDinamico == 1\">{{selectedCita.descripcion}}</span>\n          \t<span *ngIf=\"selectedCita.esDinamico != 1\">{{selectedCita.servicio}}</span>\n          </li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>Cliente : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>{{selectedCita.nombreUserReserva}} {{selectedCita.primerApellidoUserReserva}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>Tel Cliente : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\">\n          \t<span *ngFor=\"let tel of telefonosUsuarioDisplay\">\n          \t\t{{tel.telefono}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>Correo Cliente : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\">\n          \t<span *ngFor=\"let cor of correosUsuarioDisplay\">\n          \t\t{{cor.correo}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\"><span>Duración : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedCita.esDinamico == 1\">{{convertMinsToHrsMins(selectedCita.duracionDinamica)}}</span>\n          \t<span *ngIf=\"selectedCita.esDinamico != 1\">{{convertMinsToHrsMins(selectedCita.duracion)}}</span>\n          </li>\n          <li class=\"col-5\"><span>Fecha : </span></li>\n          <li class=\"col-7\"><span>{{selectedCita.dia}}</span></li>\n          <li class=\"col-5\"><span>Hora : </span></li>\n          <li class=\"col-7\"><span>{{convierteTiempo(selectedCita.horaInicialFormat)}}</span></li>\n          <li class=\"col-5\"><span>Precio : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedCita.esDinamico == 1\">{{selectedCita.precioDinamico}}</span> \n          \t<span *ngIf=\"selectedCita.esDinamico != 1\">{{selectedCita.precio}}</span> Colones\n          </li>\n \t\t  <li class=\"col-5\"><span>Estado Factura : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedCita.estadoFactura=='R'\">Registrado</span> \n          \t<span *ngIf=\"selectedCita.estadoFactura=='P'\">Pagada</span>\n          </li>\n  \t\t  <li class=\"col-5\"><span>Tipo Pago : </span></li>\n          <li class=\"col-7\">\n          \t<select [(ngModel)]=\"selectedCita.tipoPago\" [disabled]=\"selectedCita.estadoFactura=='P' || authService.isRegularUser() \">\n          \t\t<option value=\"E\">Efectivo</option>\n          \t\t<option value=\"T\">Tarjeta</option>\n          \t</select>\n          </li>\n \t\t  <li class=\"col-5\"  *ngIf=\"selectedCita.tipoPago=='T'\"><span>Comprobante : </span></li>\n          <li class=\"col-7\" *ngIf=\"selectedCita.tipoPago=='T'\">\n          \t<input type=\"text\" name=\"comprobanteFactura\" [(ngModel)]=\"selectedCita.comprobantePago\">\n          </li>\n          <li class=\"col-5\"><span>Detalle Factura : </span></li>\n          <li class=\"col-7\">\n          \t<input type=\"text\" name=\"detalleFactura\" [disabled]=\"selectedCita.estadoFactura=='P' || authService.isRegularUser() \"  [(ngModel)]=\"selectedCita.detalleFactura\">\n          </li>\n\n          <li class=\"col-4 centered-content action-modal\" *ngIf=\"selectedCita.estadoFactura!='P'\">\n          \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"modalRef.hide();openModal(confirmaEliminarCita)\" *ngIf=\"!authService.isRegularUser() || mayorQueHoy(selectedCita.dia)\">\n\t\t\t\tEliminar\n\t\t\t</button>\n\t\t\t<p *ngIf=\"authService.isRegularUser() && igualQueHoy(selectedCita.dia)\" style=\"color:red\">\n\t\t\t\tPara eliminar esta cita por favor comuniquese con el barbero.\n\t\t\t</p>\n          </li>\n          <li class=\"col-4 centered-content action-modal\" *ngIf=\"selectedCita.estadoFactura!='P'  && (authService.isBarberoUser() || authService.isAdminSucursalUser())\">\n          \t<button type=\"button\" class=\"btn btn-success\" (click)=\"visualizarModificar()\">\n\t\t\t\tActualizar Cliente\n\t\t\t</button>\n          </li>\n           <li class=\"col-4 centered-content action-modal\" *ngIf=\"selectedCita.estadoFactura!='P' && (authService.isBarberoUser() || authService.isAdminSucursalUser())\">\n          \t<button type=\"button\" class=\"btn btn-info\" (click)=\"updateReserva()\">\n\t\t\t\tPagar\n\t\t\t</button>\n          </li>\n        </ul>\n    </div>\n\n\n<div class=\"container\"  *ngIf=\"mostrarModificar\">\n\t<div class=\"col-12 separador\"></div>\n\t<div clas=\"col-12 \">\n\t\t<div class=\"module white-back static row\">\n\t\t\t<div class=\"title reserva col-12\">\n\t\t\t  <h5>Actualizar Cliente</h5>\n\t\t\t</div>\n\t\t\t<div class=\"row col-12\">\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Usuario<span class=\"required\" [class.reqerror]=\"validatorService.hasError('usuario',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"usuario\" [(ngModel)]=\"nuevoUsuario.usuario\" \n\t\t\t\t\t[class.error-input]=\"validatorService.hasError('usuario',usuarioErrores)\" placeholder=\"juan1990\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Nombre<span class=\"required\" [class.reqerror]=\"validatorService.hasError('nombre',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"nombre\" [(ngModel)]=\"nuevoUsuario.nombre\" [class.error-input]=\"validatorService.hasError('nombre',usuarioErrores)\" placeholder=\"Juan\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Apellido 1<span class=\"required\" [class.reqerror]=\"validatorService.hasError('apellido1',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"primerApellido\" [(ngModel)]=\"nuevoUsuario.apellido1\" [class.error-input]=\"validatorService.hasError('apellido1',usuarioErrores)\" placeholder=\"Perez\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Apellido 2</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"segundoApellido\" [(ngModel)]=\"nuevoUsuario.apellido2\" [class.error-input]=\"validatorService.hasError('apellido2',usuarioErrores)\" placeholder=\"Lopez\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Correo<span class=\"required\" [class.reqerror]=\"validatorService.hasError('correo',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8 correos\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-12 nuevo-numero\">\n\t\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error-input]=\"validatorService.hasError('correo',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addCorreo()\"> + </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-12 correo-display contact-item\" *ngFor=\"let correo of nuevoUsuario.correo\">\n\t\t\t\t\t\t\t<span class=\"display\">{{correo.correo}} </span>\n\t\t\t\t\t\t\t<span class=\"small-action\" (click)=\"removeCorreo(correo)\"> - </span> \n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Telefono<span class=\"required\" [class.reqerror]=\"validatorService.hasError('telefono',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8 telefonos\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-12 nuevo-numero\">\n\t\t\t\t\t\t\t<input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error-input]=\"validatorService.hasError('telefono',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addTelefono()\"> + </span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-12 contact-item\" *ngFor=\"let telefono of nuevoUsuario.telefono\">\n\t\t\t\t\t\t\t<span class=\"telefono-display\">{{telefono.telefono}} </span>\n\t\t\t\t\t\t\t<span class=\"small-action\" (click)=\"removeTelefono(telefono)\"> - </span> \n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 entrar\">\n\t\t\t\t\t\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"updateUser()\">\n\t\t\t\t\t\tModificar\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t<div class=\"col-12\" *ngIf=\"nuevoUsuarioError\" style=\"color:red;\">\n\t\t\t\t\t{{authService.errorDisplay}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12\" *ngIf=\"validationError\" style=\"color:red;\">\n\t\t\t\t\t{{validationErrorMsg}}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n\n\n</template>\n"

/***/ }),

/***/ 538:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-space\">\n</div>\n\n<div class=\"container\">\n    <div class=\"row\">\n    \t<div clas=\"col-12\">\n    \t\t<div class=\"module white-back static row\">\n    \t\t\t<div class=\"title reserva col-12\">\n    \t\t\t  <h5>Configuraciones</h5>\n    \t\t\t</div>\n    \t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isAdminUser() || authService.isAdminSucursalUser()\">\n    \t\t\t\t<div class=\"row\">\n    \t\t\t\t\t<div class=\"col-4\">\n    \t\t\t\t\t\t<p class=\"heading\">Barberias:</p>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-8\">\n    \t\t\t\t\t\t<select class=\"styled-select blue semi-square\" (change)=\"changeSucursal($event.target.value)\">\n                                <option *ngFor=\"let sucursal of sucursales\" [value]='sucursal.id'>{{sucursal.descripcion}}</option>\n    \t\t\t\t\t\t</select>\n                            <!-- <option value=\"1\">Tapia's / San Ramon</option> -->\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-12 actions\">\n    \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"nuevaBarberia={};accion='agregar';openModal(barberia)\" *ngIf=\"authService.isAdminUser()\">Agregar</button>\n    \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success\" (click)=\"actualizaSucursalSelected();accion='ver';openModal(barberia)\">Ver</button>\n    \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"actualizaSucursalSelected();accion='modificar';openModal(barberia)\">Modificar</button>\n    \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"actualizaSucursalSelected();accion='borrar';openModal(barberia)\" *ngIf=\"authService.isAdminUser()\">Borrar</button>\n    \t\t\t\t\t</div>\n    \t\t\t\t</div>\n    \t\t\t</div>\n    \t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isAdminUser() || authService.isAdminSucursalUser()\">\n    \t\t\t\t<div class=\"row\">\n    \t\t\t\t\t<div class=\"col-4\">\n    \t\t\t\t\t\t<p class=\"heading\">Barberos:</p>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-8\">\n    \t\t\t\t\t\t<select class=\"styled-select blue semi-square\"(change)=\"changeBarbero($event.target.value)\">\n                                <option *ngFor=\"let barbero of barberos\" [value]='barbero.id'>{{barbero.nombre}} {{barbero.primerApellido}}</option>\n    \t\t\t\t\t\t</select>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-12 actions\">\n                            <span>\n    \t\t\t\t\t\t  <button type=\"button\" class=\"btn btn-primary\" (click)=\"nuevoBarbero={};barberoAdmistrador = false;accion='agregar';openModal(barbero)\">Agregar</button>\n                                \n                            </span>\n                            <span *ngIf=\"nuevoBarbero.id\">\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success\" (click)=\"actualizaBarberoSelected();accion='ver';openModal(barbero);barberoAdmistrador = (nuevoBarbero.rol.indexOf('A') != -1);\">Ver</button>\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"actualizaBarberoSelected();accion='modificar';openModal(barbero);barberoAdmistrador = (nuevoBarbero.rol.indexOf('A') != -1);\">Modificar</button>\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"actualizaBarberoSelected();accion='borrar';openModal(barbero);barberoAdmistrador = (nuevoBarbero.rol.indexOf('A') != -1);\">Borrar</button>\n                                <button type=\"button\" class=\"btn btn-info\" (click)=\"impersonar()\">Impersonar</button>\n                            </span>\n    \t\t\t\t\t</div>\n    \t\t\t\t</div>\n    \t\t\t</div>\n    \t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isBarberoUser()\">\n    \t\t\t\t<div class=\"row\">\n    \t\t\t\t\t<div class=\"col-4\">\n    \t\t\t\t\t\t<p class=\"heading\">Servicios:</p>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-8\">\n                            <select class=\"styled-select blue semi-square\" (change)=\"changeServicio($event.target.value)\">\n                                <option *ngFor=\"let servicio of nuevoBarbero.servicios\" [value]='servicio.id'>{{servicio.descripcion}}</option>\n                            </select>\n    \t\t\t\t\t</div>\n    \t\t\t\t\t<div class=\"col-12 actions\">\n                            <span>\n    \t\t\t\t\t\t  <button type=\"button\" class=\"btn btn-primary\" (click)=\"nuevoServicio={};accion='agregar';openModal(servicio)\">Agregar</button>\n                            </span>\n                            <span *ngIf=\"nuevoBarbero.id\">\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success\" (click)=\"actualizaServicioSelected();accion='ver';openModal(servicio)\">Ver</button>\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"actualizaServicioSelected();accion='modificar';openModal(servicio)\">Modificar</button>\n        \t\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"actualizaServicioSelected();accion='borrar';openModal(servicio)\">Borrar</button>\n                            </span>\n    \t\t\t\t\t</div>\n    \t\t\t\t</div>\n    \t\t\t</div>\n    \t\t</div>\n    \t</div>\n    </div>\n</div>\n\n<div class=\"cargando\" *ngIf=\"cargando\">\n  <div>\n    <img src=\"assets/images/m2.png\">\n    Cargando...\n  </div>\n</div>\n\n<template #barberia>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\"><span class=\"accion\">{{accion}}</span> Sucursal</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"row\">\n        \t<div class=\"col-4\">\n        \t\tNombre:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"barberia\" [(ngModel)]=\"nuevaBarberia.descripcion\" [class.error]=\"validatorService.hasError('descripcion',barberiaErrores)\">\n        \t</div>\n\n\n            <div class=\"col-4\">\n                Nombre Negocio:\n            </div>\n            <div class=\"col-8\">\n               <input type=\"text\" name=\"nombreNegocio\" [(ngModel)]=\"nuevaBarberia.nombreNegocio\" [class.error]=\"validatorService.hasError('nombreNegocio',barberiaErrores)\">\n            </div>\n            <div class=\"col-4\">\n                Cedula Juridica:\n            </div>\n            <div class=\"col-8\">\n                <input type=\"text\" name=\"cedulaJuridica\" [(ngModel)]=\"nuevaBarberia.cedulaJuridica\" [class.error]=\"validatorService.hasError('cedulaJuridica',barberiaErrores)\">\n            </div>\n\n\n\n        \t<div class=\"col-4\">\n        \t\tSeñas:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"ubicacion\" [(ngModel)]=\"nuevaBarberia.detalleDireccion\" [class.error]=\"validatorService.hasError('detalleDireccion',barberiaErrores)\">\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tProvincia:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<!-- <input type=\"text\" name=\"\" [ngModel]=\"nuevaBarberia.provincia\"> -->\n                <select class=\"form-control\" id=\"provincia\" [ngModel]=\"selectedProvincia\" (change)=\"provinciaChanged($event.target.value)\">\n                    <option *ngFor=\"let provincia of provincias;let i = index\" [value]=\"i\">{{provincia}}</option>\n                </select>\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tCanton:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t     <select class=\"form-control\" id=\"provincia\" [(ngModel)]=\"nuevaBarberia.idCanton\">\n                    <option *ngFor=\"let canton of cantonesDisplay\" [value]=\"canton.id\">{{canton.canton}}</option>\n                </select>\n        \t</div>\n            <div class=\"col-4\">\n                Distrito:\n            </div>\n            <div class=\"col-8\">\n                <input type=\"text\" name=\"distrito\" [(ngModel)]=\"nuevaBarberia.distrito\" [class.error]=\"validatorService.hasError('distrito',barberiaErrores)\">\n            </div>\n            <div class=\"col-4\">\n                Barrio:\n            </div>\n            <div class=\"col-8\">\n                <input type=\"text\" name=\"barrio\" [(ngModel)]=\"nuevaBarberia.barrio\" [class.error]=\"validatorService.hasError('barrio',barberiaErrores)\">\n            </div>\n            <div class=\"col-4\">\n                Telefono:\n            </div>\n            <div class=\"col-8 telefonos\">\n                <div class=\"row\">\n                    <div class=\"col-12 nuevo-numero\">\n                        <input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error]=\"validatorService.hasError('telefono',barberiaErrores)\"> <span class=\"small-action\" (click)=\"addTelefonoBarberia()\"> + </span>\n                    </div>\n                    <div class=\"col-12 contact-item\" *ngFor=\"let telefono of nuevaBarberia.telefono\">\n                        <span class=\"telefono-display\">{{telefono.telefono}} </span>\n                        <span class=\"small-action\" (click)=\"removeTelefonoBarberia(telefono)\"> - </span> \n                    </div>\n                </div>\n            </div>\n            <div class=\"col-4\">\n                Correo:\n            </div>\n            <div class=\"col-8 correos\">\n                <div class=\"row\">\n                    <div class=\"col-12 nuevo-numero\">\n                        <input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error]=\"validatorService.hasError('correo',barberiaErrores)\"> <span class=\"small-action\" (click)=\"addCorreoBarberia()\"> + </span>\n                    </div>\n                    <div class=\"col-12 correo-display contact-item\" *ngFor=\"let correo of nuevaBarberia.correo\">\n                        <span class=\"display\">{{correo.correo}} </span>\n                        <span class=\"small-action\" (click)=\"removeCorreoBarberia(correo)\"> - </span> \n                    </div> \n                </div>\n            </div>\n        \t<div class=\"col-12\" style=\"margin-top: 15px;text-align: center;\">\n        \t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"AgregarBarberia()\" *ngIf=\"accion=='agregar'\">Agregar</button>\n        \t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"ModificarBarberia()\" *ngIf=\"accion=='modificar'\">Modificar</button>\n        \t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"EliminarBarberia()\" *ngIf=\"accion=='borrar'\">Borrar</button>\n        \t</div>\n        </div>\n    </div>\n</template>\n\n<template #barbero>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\"><span class=\"accion\">{{accion}}</span>  Barbero</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"row\">\n        \t<div class=\"col-4\">\n        \t\tUsuario:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"barberia\" [(ngModel)]=\"nuevoBarbero.usuario\" [class.error]=\"validatorService.hasError('usuario',barberoErrores)\" [disabled]=\"accion=='modificar'\">\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tNombre:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"ubicacion\" [(ngModel)]=\"nuevoBarbero.nombre\" [class.error]=\"validatorService.hasError('nombre',barberoErrores)\">\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tApellido 1:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"\" [(ngModel)]=\"nuevoBarbero.apellido1\" [class.error]=\"validatorService.hasError('apellido1',barberoErrores)\">\n        \t</div>\n            <div class=\"col-4\">\n                Apellido 2:\n            </div>\n            <div class=\"col-8\">\n                <input type=\"text\" name=\"\" [(ngModel)]=\"nuevoBarbero.apellido2\" [class.error]=\"validatorService.hasError('apellido2',barberoErrores)\">\n            </div>\n        \t<div class=\"col-4\">\n        \t\tTelefono:\n        \t</div>\n        \t<div class=\"col-8 telefonos\">\n                <div class=\"row\">\n                    <div class=\"col-12 nuevo-numero\">\n                        <input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error]=\"validatorService.hasError('telefono',barberoErrores)\"> <span class=\"small-action\" (click)=\"addTelefono()\"> + </span>\n                    </div>\n                    <div class=\"col-12 contact-item\" *ngFor=\"let telefono of nuevoBarbero.telefono\">\n                        <span class=\"telefono-display\">{{telefono.telefono}} </span>\n                        <span class=\"small-action\" (click)=\"removeTelefono(telefono)\"> - </span> \n                    </div>\n                </div>\n        \t</div>\n        \t<div class=\"col-4\">\n        \t\tCorreo:\n        \t</div>\n        \t<div class=\"col-8 correos\">\n                <div class=\"row\">\n                    <div class=\"col-12 nuevo-numero\">\n                        <input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error]=\"validatorService.hasError('correo',barberoErrores)\"> <span class=\"small-action\" (click)=\"addCorreo()\"> + </span>\n                    </div>\n                    <div class=\"col-12 correo-display contact-item\" *ngFor=\"let correo of nuevoBarbero.correo\">\n                        <span class=\"display\">{{correo.correo}} </span>\n                        <span class=\"small-action\" (click)=\"removeCorreo(correo)\"> - </span> \n                    </div>\n                </div>\n        \t</div>\n            <div class=\"col-4\">\n                Tiempo Barbero:\n            </div>\n            <div class=\"col-8\">\n                <select [(ngModel)]=\"nuevoBarbero.tiempoBarbero\" [class.error]=\"validatorService.hasError('tiempoBarbero',barberoErrores)\">\n                    <option value=\"10\">10</option>\n                    <option value=\"20\">20</option>\n                    <option value=\"30\">30</option>\n                    <option value=\"60\">60</option>\n                </select>\n            </div>\n            <div class=\"col-4\">\n                Es Administrador:\n            </div>\n            <div class=\"col-8\">\n                <input type=\"checkbox\" [(ngModel)]=\"barberoAdmistrador\">\n            </div>\n        \t<div class=\"col-12\" style=\"margin-top: 15px;text-align: center;\">\n        \t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"AgregarBarbero()\" *ngIf=\"accion=='agregar'\">Agregar</button>\n        \t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"ModificarBarbero()\" *ngIf=\"accion=='modificar'\">Modificar</button>\n        \t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"EliminarBarbero()\" *ngIf=\"accion=='borrar'\">Borrar</button>\n        \t</div>\n            <div class=\"col-12\" style=\"color:red;\">\n                {{errorDisplay}}\n            </div>\n        </div>\n    </div>\n</template>\n\n<template #servicio>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\"><span class=\"accion\">{{accion}}</span>  Servicio</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"row\">\n        \t<div class=\"col-4\">\n        \t\tNombre:\n        \t</div>\n        \t<div class=\"col-8\">\n        \t\t<input type=\"text\" name=\"barberia\" [(ngModel)]=\"nuevoServicio.descripcion\" [class.error]=\"validatorService.hasError('nombre',servicioErrores)\">\n        \t</div>\n            <div class=\"col-4\">\n                Es el servicio Dinamico(El precio y la duración dependen del servicio):\n            </div>\n            <div class=\"col-8\">\n                <input type=\"checkbox\" [(ngModel)]=\"nuevoServicio.esDinamico\">\n            </div>\n            <div *ngIf=\"!nuevoServicio.esDinamico\" class=\"row col-12\">\n            \t<div class=\"col-4\">\n            \t\tDuración:\n            \t</div>\n            \t<div class=\"col-8\">\n                    <select [(ngModel)]=\"nuevoServicio.duracion\">\n                        <option *ngFor=\"let opcion of opcionesDuracion\" >{{opcion}}</option>\n                    </select>\n            \t</div>\n            \t<div class=\"col-4\">\n            \t\tPrecio:\n            \t</div>\n            \t<div class=\"col-8\">\n            \t\t<input type=\"number\" name=\"\" [(ngModel)]=\"nuevoServicio.precio\" [class.error]=\"validatorService.hasError('precio',servicioErrores)\">\n            \t</div>\n            </div>\n        \t<div class=\"col-12\" style=\"margin-top: 15px;text-align: center;\">\n        \t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"AgregarServicio()\" *ngIf=\"accion=='agregar'\">Agregar</button>\n        \t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"ModificarServicio()\" *ngIf=\"accion=='modificar'\">Modificar</button>\n        \t\t<button type=\"button\" class=\"btn btn-danger\" (click)=\"EliminarServicio()\" *ngIf=\"accion=='borrar'\">Borrar</button>\n        \t</div>\n        </div>\n    </div>\n</template>"

/***/ }),

/***/ 539:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-space\">\n</div>\n\n\n<div class=\"container\">\n    \t<div clas=\"col-12\">\n    \t\t<div class=\"module white-back static row\">\n    \t\t\t<div class=\"title reserva col-12\">\n    \t\t\t  <h5>Facturas</h5>\n    \t\t\t</div>\n    \t\t\t<div class=\"col-12 text-center\">\n\t    \t\t    <pagination-controls (pageChange)=\"p = $event\" previousLabel=\"Previo\" nextLabel=\"Siguiente\"></pagination-controls>\n\t    \t\t</div>\n\n\t\t\t\t<ul class=\"col-12 items-list\">\n\t\t\t\t\t<li class=\"item\">\n\t\t\t\t\t\t<div class=\"col-12 row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-3 col-6\">\n\t\t\t\t\t\t\t\t<p>Cliente\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-2 d-none d-sm-block text-center\">\n\t\t\t\t\t\t\t\t<p>Fecha</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 d-none d-sm-block text-center\">\n\t\t\t\t\t\t\t\t<p>Estado</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-4 col-6 text-center\">\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\tAcciones\n\t\t\t\t\t\t        </p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li *ngFor=\"let factura of facturas | paginate: { itemsPerPage: 10, currentPage: p }; index as i;\" \n\t\t\t\t\t\tclass=\"item\" \n\t\t\t\t\t\t[class.odd]=\"i%2==0\">\n\t\t\t\t\t\t<div class=\"col-12 row\">\n\t\t\t\t\t\t\t<div class=\"col-sm-3 col-6\">\n\t\t\t\t\t\t\t\t<p *ngIf=\"factura.idUsuarioBarbero\">\n\t\t\t\t\t\t\t\t\t{{factura.nombreUserReserva +' '+factura.primerApellidoUserReserva + ' '+factura.segundoApellidoUserReserva}}\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<p *ngIf=\"!factura.idUsuarioBarbero\">\n\t\t\t\t\t\t\t\t\tFactura sin cliente asignado\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-2 d-none d-sm-block text-center\">\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t{{factura.dia | date: 'dd/MM/yyyy'}}\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-3 d-none d-sm-block text-center\">\n\t\t\t\t\t\t\t\t<p *ngIf=\"factura.estadoFactura == 'R'\">\n\t\t\t\t\t\t\t\t\tRegistrado\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<p *ngIf=\"factura.estadoFactura == 'P'\">\n\t\t\t\t\t\t\t\t\tPagado\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-sm-4 col-6 text-center\" style=\"padding-top: 4px;\">\n\t\t\t\t\t\t\t\t<button (click)=\"selectedFactura = factura; openModal(facturaModal)\" class=\"btn btn-info\">\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-expand\" aria-hidden=\"true\"></i> Ver\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<button (click)=\"selectedFactura = factura; openModalPrint(print)\" class=\"btn btn-success\">\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-print\" aria-hidden=\"true\"></i> Imprimir\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n</div>\n\n\n\n\n<div class=\"cargando\" *ngIf=\"cargando\">\n  <div>\n    <img src=\"assets/images/m2.png\">\n    Cargando...\n  </div>\n</div>\n\n<template #facturaModal>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Factura</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body container\">\n    \t<ul class=\"row\">\n          <li class=\"col-5\"><span>Barberia : </span></li>\n          <li class=\"col-7\"><span>{{selectedFactura.sucursal}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\"><span>{{selectedFactura.nombreBarbero}} {{selectedFactura.primerApellidoBarbero}}</span></li>\n          <li class=\"col-5\"><span>Servicio : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedFactura.esDinamico == 1\">{{selectedFactura.descripcion}}</span>\n          \t<span *ngIf=\"selectedFactura.esDinamico != 1\">{{selectedFactura.servicio}}</span>\n          </li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>Cliente : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>{{selectedFactura.nombreUserReserva}} {{selectedFactura.primerApellidoUserReserva}}</span></li>\n          <li class=\"col-5\"><span>Duración : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedFactura.esDinamico == 1\">{{convertMinsToHrsMins(selectedFactura.duracionDinamica)}}</span>\n          \t<span *ngIf=\"selectedFactura.esDinamico != 1\">{{convertMinsToHrsMins(selectedFactura.duracion)}}</span>\n          </li>\n          <li class=\"col-5\"><span>Fecha : </span></li>\n          <li class=\"col-7\"><span>{{selectedFactura.dia}}</span></li>\n          <li class=\"col-5\"><span>Hora : </span></li>\n          <li class=\"col-7\"><span>{{convierteTiempo(selectedFactura.horaInicialFormat)}}</span></li>\n          <li class=\"col-5\"><span>Precio : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedFactura.esDinamico == 1\">{{selectedFactura.precioDinamico}}</span> \n          \t<span *ngIf=\"selectedFactura.esDinamico != 1\">{{selectedFactura.precio}}</span> Colones\n          </li>\n \t\t  <li class=\"col-5\"><span>Estado Factura : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedFactura.estadoFactura=='R'\">Registrado</span> \n          \t<span *ngIf=\"selectedFactura.estadoFactura=='P'\">Pagada</span>\n          </li>\n  \t\t  <li class=\"col-5\"><span>Tipo Pago : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedFactura.tipoPago=='E'\">Efectivo</span> \n          \t<span *ngIf=\"selectedFactura.tipoPago=='T'\">Tarjeta</span>\n          </li>\n \t\t  <li class=\"col-5\"  *ngIf=\"selectedFactura.tipoPago=='T'\"><span>Comprobante : </span></li>\n          <li class=\"col-7\" *ngIf=\"selectedFactura.tipoPago=='T'\">\n          \t<span>{{selectedFactura.comprobantePago}}</span>\n          </li>\n          <li class=\"col-5\"><span>Detalle Factura : </span></li>\n          <li class=\"col-7\">\n          \t<span>{{selectedFactura.detalleFactura}}</span>\n          </li>\n\n          <li class=\"col-4 centered-content action-modal\" *ngIf=\"selectedFactura.estadoFactura!='P'\">\n          \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"modalRef.hide();openModal(confirmaEliminarCita)\" *ngIf=\"!authService.isRegularUser() || mayorQueHoy(selectedFactura.dia)\">\n\t\t\t\tEliminar\n\t\t\t</button>\n\t\t\t<p *ngIf=\"authService.isRegularUser() && igualQueHoy(selectedFactura.dia)\" style=\"color:red\">\n\t\t\t\tPara eliminar esta cita por favor comuniquese con el barbero.\n\t\t\t</p>\n          </li>\n        </ul>\n    </div>\n\n </template>\n\n\n<ng-template #print>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\" style=\"text-transform: capitalize;\">Imprimir</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"printRefCompletar.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n  \t<div class=\"text-center\">\n  \t\t<p>Seleccione el tipo de factura a imprimir</p>\n  \t</div>\n    <div class=\"col-12\">\n    \t<div class=\"row\" style=\"padding-bottom: 35px;\">\n    \t\t<div class=\"col-5 card\" (click)=\"imprimir('pdv')\">\n    \t\t\t<p class=\"text-center\">\n    \t\t\t\tImpresora punto de venta.\n    \t\t\t</p>\n    \t\t\t<p class=\"text-center\">\n    \t\t\t\t<img src=\"assets/pdv.png\" style=\"width: 178px;\">\n    \t\t\t</p>\n    \t\t</div>\n    \t\t<div class=\"col-5 offset-2 card\" (click)=\"imprimir('A4')\">\n    \t\t\t<p class=\"text-center\">\n    \t\t\t\tHoja A4\n    \t\t\t</p>\n    \t\t\t<p class=\"text-center\">\n    \t\t\t\t<img src=\"assets/a4.jpg\" style=\"width: 131px;\">\n    \t\t\t</p>\n    \t\t</div>\n    \t</div>\n    </div>\n  </div>\n</ng-template>"

/***/ }),

/***/ 540:
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\n  <div class=\"container\">\n    <span class=\"text-muted\">\n      Creado por KYR.com\n    </span>\n  </div>\n</footer>"

/***/ }),

/***/ 541:
/***/ (function(module, exports) {

module.exports = "<carousel [interval]=\"myInterval\">\n  <slide>\n    <img src=\"assets/images/barber1.jpg\" alt=\"First slide\">\n    <div class=\"carousel-caption\">\n      <h3>Siempre el mejor servicio</h3>\n      <p *ngIf=\"authService.isAdminUser() == false\"><a href=\"#/reserva\">Reservar</a></p>\n    </div>\n  </slide>\n  <slide>\n    <img src=\"assets/images/barber2.jpg\" alt=\"Second slide\">\n    <div class=\"carousel-caption\">\n      <h3>Atentos a las nuevas tendencias</h3>\n      <p *ngIf=\"authService.isAdminUser() == false\"><a href=\"#/reserva\">Reservar</a></p>\n    </div>\n  </slide>\n  <slide>\n    <img src=\"assets/images/barber3.jpg\" alt=\"Third slide\">\n    <div class=\"carousel-caption\">\n      <h3>Haciendo clientes felices</h3>\n      <p *ngIf=\"authService.isAdminUser() == false\"><a href=\"#/reserva\">Reservar</a></p>\n    </div>\n  </slide>\n</carousel>"

/***/ }),

/***/ 542:
/***/ (function(module, exports) {

module.exports = "<div class=\"home container\">\n\t<div class=\"row\">\n\t\t<carousel-custom></carousel-custom>\n\t</div>\n\t<div class=\"row\" *ngIf=\"!authService.isAppUnica\">\n\t\t<div class=\"col-12\">\n\t\t\t<div class=\"module white-back static\">\n\t\t\t\t<div class=\"module-title\">\n\t\t\t\t\t<h4>Bienvenido <span *ngIf=\"authService.isUserLogged()\">{{authService.loggedUser.nombre}}</span> a {{authService.nombreBarberia}} </h4>\n\t\t\t\t\t<span class=\"module-separator\"></span>\n\t\t\t\t</div>\n\t\t\t\t<p class=\"lead\">La red de barberias mas grande del Pais.</p>\n\t\t\t\t<p>Solo seleccione \"Reservar\" y escoja la barbería de su preferencia.</p>\n\t\t\t\t<p>Con cientos de clientes  y barberias satisfechos que pueden dar fe de nuestra calidad.</p>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-scissors\" aria-hidden=\"true\"></i>Cobertura nacional</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.5s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-camera-retro\" aria-hidden=\"true\"></i>Disponible 24/7</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.7s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-lightbulb-o\" aria-hidden=\"true\"></i>Siempre trabajando para mejorar nuestros servicios.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"row\" *ngIf=\"authService.isAppUnica\">\n\t\t<div class=\"col-12\">\n\t\t\t<div class=\"module white-back static\">\n\t\t\t\t<div class=\"module-title\">\n\t\t\t\t\t<h4>Bienvenido <span *ngIf=\"authService.isUserLogged()\">{{authService.loggedUser.nombre}}</span> a {{authService.nombreBarberia}} </h4>\n\t\t\t\t\t<span class=\"module-separator\"></span>\n\t\t\t\t</div>\n\t\t\t\t<p class=\"lead\">La Barberia abrio a inicio del 2012, nos especializamos en cortes de cabello y barba, Gracias por elegirnos!</p>\n\t\t\t\t<p>Con miles de clientes satisfechos que pueden dar fe de nuestra calidad.</p>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-scissors\" aria-hidden=\"true\"></i>Cortes de muchos estilos.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.5s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-camera-retro\" aria-hidden=\"true\"></i>Un ambiene ameno para el corte de su cabello y barba.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"info wow fadeInUp\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.7s; animation-name: fadeInUp;\">\n\t\t\t\t\t\t\t<p><i class=\"fa fa-lightbulb-o\" aria-hidden=\"true\"></i>Siempre en entrenamiento para llegar a ser aun mejores.</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"row gallery\">\n\t\t<div class=\"col-12 wow fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n\t\t\t<div class=\"module white-back\">\n\t\t\t\t<div class=\"module-title\">\n\t\t\t\t\t<h4>Beard &amp; Hair Styles</h4>\n\t\t\t\t\t<span class=\"module-separator\"></span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"mini-gallery clearfix\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<div class=\"row\" style=\"margin-bottom: 16px;\">\n\t\t\t\t\t\t\t<img-modal name=\"hair1\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair2\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair3\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair4\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<img-modal name=\"hair5\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair6\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair7\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t\t<img-modal name=\"hair8\" class=\"col-3 img-modal\"></img-modal>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>"

/***/ }),

/***/ 543:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-space\">\n</div>\n\n<div class=\"container\">\n\t<div clas=\"col-12\">\n\t\t<div class=\"module white-back static row\">\n\t\t\t<div class=\"title reserva col-12\">\n\t\t\t  <h5>Información</h5>\n\t\t\t</div>\n\t\t\t<!-- fin display citas barberia -->\n\t\t\t<div class=\"col-xs-12 col-md-6 item pausas\" *ngIf=\"authService.isBarberoUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayPausas = !displayPausas\">\n\t\t\t\t\t\t<p class=\"heading\">Pausas <span *ngIf=\"!displayPausas\">></span> <span *ngIf=\"displayPausas\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayPausas\">\n\t\t\t\t\t<div class=\"col-12\">\n\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t<li *ngFor=\"let pausa of pausas\" class=\"col-12 col-md-6\">\n\t\t\t\t\t\t\t\t<div (click)=\"agregarPausa = false;selectedPausa = Object.assign({}, pausa );openModal(pausaModal)\">\n\t\t\t\t\t\t\t\t\t{{convierteTiempo(pausa.horaInicial)}} : \n\t\t\t\t\t\t\t\t\t<span *ngIf=\"pausa.dia\">\n\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"pausa.dia == ' LU MA MI JU VI SA DO'\">\n\t\t\t\t\t\t\t\t\t\t\tTodos los días\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"pausa.dia == ' LU MA MI JU VI'\">\n\t\t\t\t\t\t\t\t\t\t\tEntre semana\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<span *ngIf=\"pausa.dia != ' LU MA MI JU VI SA DO' && pausa.dia != ' LU MA MI JU VI'\">\n\t\t\t\t\t\t\t\t\t\t\t{{pausa.dia}}\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span *ngIf=\"!pausa.dia\">\n\t\t\t\t\t\t\t\t\t\t{{pausa.fecha}}\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayPausas\">\n\t\t\t\t\t<div class=\"col-12 centered-content\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"agregarPausa = true;selectedPausa = {dia:''} ;openModal(pausaModal)\">\n\t\t\t\t\t\t\tAgregar Pausa\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isBarberoUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayHorario = !displayHorario\">\n\t\t\t\t\t\t<p class=\"heading\">Horarios <span *ngIf=\"!displayHorario\">></span> <span *ngIf=\"displayHorario\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row actualizar-horario\" *ngIf=\"displayHorario\">\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Lunes</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioLunes.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioLunes.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Martes</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioMartes.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioMartes.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Miercoles</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioMiercoles.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioMiercoles.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Jueves</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioJueves.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioJueves.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Viernes</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioViernes.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioViernes.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Sabado</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioSabado.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioSabado.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t\t<span>Domingo</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<select [(ngModel)]=\"selectedHorarioDomingo.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select> - <select [(ngModel)]=\"selectedHorarioDomingo.horaFinal\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12 update centered-content\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"updateHorarios()\">\n\t\t\t\t\t\t\tActualizar\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-12 col-md-6 item\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayContacto = !displayContacto\">\n\t\t\t\t\t\t<p class=\"heading\">Contacto <span *ngIf=\"!displayContacto\">></span> <span *ngIf=\"displayContacto\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row actualizar-usuario\" *ngIf=\"displayContacto\">\n\t\t\t\t\t<div class=\"col-5\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<span>Usuario</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.usuario\" disabled=\"\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\">\n\t\t\t\t\t\t<span>Nombre</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.nombre\" [class.error]=\"validatorService.hasError('nombre',usuarioErrores)\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\">\n\t\t\t\t\t\t<span>Apellido 1</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.apellido1\" [class.error]=\"validatorService.hasError('apellido1',usuarioErrores)\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\">\n\t\t\t\t\t\t<span>Apellido 2</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.apellido2\" [class.error]=\"validatorService.hasError('apellido2',usuarioErrores)\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\">\n\t\t\t\t\t\t<span>Correo</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\">\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-12 nuevo-numero\">\n\t\t\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error]=\"validatorService.hasError('correo',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addCorreo()\"> + </span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-12 correo-display\" *ngFor=\"let correo of nuevoUsuario.correo\">\n\t\t\t\t\t\t\t\t<span class=\"display\">{{correo.correo}} </span>\n\t\t\t\t\t\t\t\t<span class=\"small-action\" (click)=\"removeCorreo(correo)\"> - </span> \n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5 telefonos\">\n\t\t\t\t\t\t<span>Telefono</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7 telefonos\" >\n\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t<div class=\"col-12 nuevo-numero\">\n\t\t\t\t\t\t\t\t<input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error]=\"validatorService.hasError('telefono',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addTelefono()\"> + </span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-12\" *ngFor=\"let telefono of nuevoUsuario.telefono\">\n\t\t\t\t\t\t\t\t<span class=\"telefono-display\">{{telefono.telefono}} </span>\n\t\t\t\t\t\t\t\t<span class=\"small-action\" (click)=\"removeTelefono(telefono)\"> - </span> \n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<span>Contraseña</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoUsuario.contrasenna\" [class.error]=\"validatorService.hasError('contrasenna',usuarioErrores)\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-5\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<span>Vincular con FB</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-7\" *ngIf=\"authService.profilePic == ''\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"updateFacebook()\">\n\t\t\t\t\t\t\tVincular\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"col-12 update centered-content\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"update()\">\n\t\t\t\t\t\t\tActualizar\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\" *ngIf=\"validationError\" style=\"color:red;\">\n\t\t\t\t\t\t{{validationErrorMsg}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\n\t\t\t<!-- <div class=\"col-xs-12 col-md-6 item\" *ngIf=\"authService.isRegularUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayResumen = !displayResumen\">\n\t\t\t\t\t\t<p class=\"heading\">Resumen <span *ngIf=\"!displayResumen\">></span> <span *ngIf=\"displayResumens\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-12\" *ngIf=\"displayResumen\">\n\t\t\t\t\t\t<ul class=\"reservas row\">\n\t\t\t\t\t\t\t<li *ngFor=\"let cita of reservas\" class=\"col-12 col-md-6\">\n\t\t\t\t\t\t\t\t<div (click)=\"obtieneInfo(cita);selectedCita = Object.assign({}, cita);openModal(citaModal)\">\n\t\t\t\t\t\t\t\t\t{{cita.dia}} - {{convierteTiempo(cita.horaInicial)}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div> -->\n\t\t\t<!-- <div class=\"col-xs-12 col-md-6 item\" *ngIf=\"(authService.isBarberoUser() && authService.isAdminUser()) || authService.isBarberoUser() || authService.isAdminSucursalUser()\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-5\" (click)=\"displayResumen = !displayResumen\">\n\t\t\t\t\t\t<p class=\"heading\">Resumen <span *ngIf=\"!displayResumen\">></span> <span *ngIf=\"displayResumen\"><</span></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayResumen\">\n\t\t\t\t\t<div class=\"col-9\">\n\t\t\t\t\t\t<select class=\"styled-select blue semi-square\"(change)=\"changeBarbero($event.target.value)\" *ngIf=\"authService.isAdminSucursalUser()\">\n\t                    \t<option *ngFor=\"let barberoCita of barberosCitasSucursal\" [value]='barberoCita.barbero.id'>{{barberoCita.barbero.nombre}} {{barberoCita.barbero.primerApellido}}</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row date\" *ngIf=\"displayResumen\">\n\t\t\t\t\t<div class=\"col-6\">Fecha Inicial:<br> <calendario-input (dateSelectedChange)=\"fechaInicialChanges($event)\"></calendario-input></div>\n\t\t\t\t\t<div class=\"col-6\">Fecha Final:<br> <calendario-input (dateSelectedChange)=\"fechaFinalChanges($event)\"></calendario-input></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\" *ngIf=\"displayResumen\">\n\t\t\t\t\t<div class=\"col-12 update centered-content\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"generar()\">\n\t\t\t\t\t\t\tGenerar\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row resumen\" *ngIf=\"displayResumen && resumenGenerado\">\n\t\t\t\t\t<div class=\"col-12 centered-content title\">\n\t\t\t\t\t\tResumen de {{resumenFechaInicial}} hasta {{resumenFechaFinal}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\tCantidad de citas:\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\t{{cantidadCitas}}\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\tGanancias por citas:\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t\t{{ganancias}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div> -->\n\n\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"cargando\" *ngIf=\"cargando\">\n  <div>\n    <img src=\"assets/images/m2.png\">\n    Cargando...\n  </div>\n</div>\n<template #citaModal>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Cita</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body container\">\n    \t<ul class=\"row\">\n          <li class=\"col-5\"><span>Barberia : </span></li>\n          <li class=\"col-7\"><span>{{selectedCita.sucursal}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\"><span>{{selectedCita.nombreBarbero}} {{selectedCita.primerApellidoBarbero}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Tel Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\">\n          \t<span *ngFor=\"let tel of telefonosBarberoDisplay\">\n          \t\t{{tel.telefono}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\" *ngIf=\"authService.isRegularUser()\"><span>Correo Barbero : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isRegularUser()\">\n          \t<span *ngFor=\"let cor of correosBarberoDisplay\">\n          \t\t{{cor.correo}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\"><span>Servicio : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedCita.esDinamico == 1\">{{selectedCita.descripcion}}</span>\n          \t<span *ngIf=\"selectedCita.esDinamico != 1\">{{selectedCita.servicio}}</span>\n          </li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>Cliente : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>{{selectedCita.nombreUserReserva}} {{selectedCita.primerApellidoUserReserva}}</span></li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>Tel Cliente : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\">\n          \t<span *ngFor=\"let tel of telefonosUsuarioDisplay\">\n          \t\t{{tel.telefono}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\"><span>Correo Cliente : </span></li>\n          <li class=\"col-7\" *ngIf=\"authService.isBarberoUser() || authService.isAdminSucursalUser()\">\n          \t<span *ngFor=\"let cor of correosUsuarioDisplay\">\n          \t\t{{cor.correo}}<br>\n          \t</span>\n          </li>\n          <li class=\"col-5\"><span>Duración : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedCita.esDinamico == 1\">{{convertMinsToHrsMins(selectedCita.duracionDinamica)}}</span>\n          \t<span *ngIf=\"selectedCita.esDinamico != 1\">{{convertMinsToHrsMins(selectedCita.duracion)}}</span>\n          </li>\n          <li class=\"col-5\"><span>Fecha : </span></li>\n          <li class=\"col-7\"><span>{{selectedCita.dia}}</span></li>\n          <li class=\"col-5\"><span>Hora : </span></li>\n          <li class=\"col-7\"><span>{{convierteTiempo(selectedCita.horaInicial)}}</span></li>\n          <li class=\"col-5\"><span>Precio : </span></li>\n          <li class=\"col-7\">\n          \t<span *ngIf=\"selectedCita.esDinamico == 1\">{{selectedCita.precioDinamico}}</span> \n          \t<span *ngIf=\"selectedCita.esDinamico != 1\">{{selectedCita.precio}}</span> Colones\n          </li>\n          <li class=\"col-12 centered-content action-modal\">\n          \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"modalRef.hide();openModal(confirmaEliminarCita)\" *ngIf=\"!authService.isRegularUser() || mayorQueHoy(selectedCita.dia)\">\n\t\t\t\tEliminar\n\t\t\t</button>\n\t\t\t<p *ngIf=\"authService.isRegularUser() && igualQueHoy(selectedCita.dia)\" style=\"color:red\">\n\t\t\t\tPara eliminar esta cita por favor comuniquese con el barbero.\n\t\t\t</p>\n          </li>\n        </ul>\n    </div>\n</template>\n\n<template #pausaModal>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Pausa</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body\">\n    \t<ul class=\"pausas-edit\">\n          <li>\n          \t<span>Hora : </span>\n          \t<span>\n          \t\t<!-- <input type=\"text\" [(ngModel)]=selectedPausa.hora> -->\n          \t\t<select [(ngModel)]=\"selectedPausa.horaInicial\" [class.error]=\"validatorService.hasError('hora',pausaErrores)\">\n          \t\t\t<option *ngFor=\"let tiempo of tiempos\" [value]='tiempo'>{{convierteTiempo(tiempo)}}</option>\n          \t\t</select>\n          \t</span>\n          </li>\n          <li class=\"repetir\"><span [class.error]=\"validatorService.hasError('dia',pausaErrores)\">dia : </span>\n          \t<span [class.active]=\"contains('LU')\" class=\"repetir-item\" (click)=\"toogleRe('LU')\">\n          \t\tLu\n          \t</span>\n          \t<span [class.active]=\"contains('MA')\" class=\"repetir-item\" (click)=\"toogleRe('MA')\">\n          \t\tMa\n          \t</span>\n          \t<span [class.active]=\"contains('MI')\" class=\"repetir-item\" (click)=\"toogleRe('MI')\">\n          \t\tMi\n          \t</span>\n          \t<span [class.active]=\"contains('JU')\" class=\"repetir-item\" (click)=\"toogleRe('JU')\">\n          \t\tJu\n          \t</span>\n          \t<span [class.active]=\"contains('VI')\" class=\"repetir-item\" (click)=\"toogleRe('VI')\">\n          \t\tVi\n          \t</span>\n          \t<span [class.active]=\"contains('SA')\" class=\"repetir-item\" (click)=\"toogleRe('SA')\">\n          \t\tSa\n          \t</span>\n          \t<span [class.active]=\"contains('DO')\" class=\"repetir-item\" (click)=\"toogleRe('DO')\">\n          \t\tDo\n          \t</span>\n          </li>\n          <li><span>Fecha : </span><span *ngIf=\"!this.selectedPausa.dia\">{{selectedPausa.fecha}}</span>\n          \t<span *ngIf=\"!this.selectedPausa.dia\">\n          \t\t<app-calendario (dateSelectedChange)=\"dateSelectedChange($event)\" [dateSelected]='selectedPausa.fecha'></app-calendario>\n          \t</span>\n          \t<span *ngIf=\"this.selectedPausa.dia\">\n          \t\tRepetición de pausa activa.\n          \t</span>\n          </li>\n          <li>\n          \t<span>Duración : </span>\n          \t<span>\n          \t\t<!-- <input type=\"text\" [(ngModel)]=selectedPausa.duracion> -->\n          \t\t<select [(ngModel)]=\"selectedPausa.duracion\" [class.error]=\"validatorService.hasError('duracion',pausaErrores)\">\n          \t\t\t<option *ngFor=\"let opcion of opcionesDuracion\" >{{opcion}}</option>\n          \t\t</select>\n          \t</span>\n          </li>\n          <li>\n\t\t\t<button type=\"button\" class=\"btn btn-info\" (click)=\"modificarPausa();\" *ngIf=\"!agregarPausa\">\n\t\t\t\tModificiar\n\t\t\t</button>\n          \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"modalRef.hide();openModal(confirmaEliminarPausa)\" *ngIf=\"!agregarPausa\">\n\t\t\t\tEliminar\n\t\t\t</button>\n\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"agregarNuevaPausa();\" *ngIf=\"agregarPausa\">\n\t\t\t\tAgregar\n\t\t\t</button>\n          </li>\n        </ul>\n    </div>\n</template>\n\n<template #confirmaEliminarCita>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Confirmar eliminación de cita</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body\">\n      \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"eliminarCita()\">\n\t\t\tEliminar\n\t\t</button>\n\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\">\n\t\t\tNo Eliminar\n\t\t</button>\n    </div>\n</template>\n\n<template #confirmaEliminarPausa>\n\t<div class=\"modal-header\">\n\t    <h4 class=\"modal-title pull-left\">Confirmar eliminación de pausa</h4>\n\t    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t</div>\n    <div class=\"modal-body\">\n      \t<button type=\"button\" class=\"btn btn-danger\" (click)=\"eliminarPausa()\">\n\t\t\tEliminar\n\t\t</button>\n\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"modalRef.hide()\">\n\t\t\tNo Eliminar\n\t\t</button>\n    </div>\n</template>\n"

/***/ }),

/***/ 544:
/***/ (function(module, exports) {

module.exports = "<div class=\"login\">\n\t<tabset [justified]=\"true\" class=\"login\">  \n\t\t<tab>\n\t\t  \t<template tabHeading>\n\t\t      Ingresar\n\t\t    </template>\n\t\t\t<div class=\"row login\">\n\t\t\t\t<div class=\"col-6 user-input\">\n\t\t\t\t\t<label>Usuario</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-6 user-input\">\n\t\t\t\t\t<input type=\"text\" name=\"usuario\" [(ngModel)]=\"usuario.usuario\" placeholder=\"usuario\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t<label>Clave</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-6\">\n\t\t\t\t\t<input type=\"password\" name=\"clave\" [(ngModel)]=\"usuario.contrasenna\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 entrar\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"logUser()\">\n\t\t\t\t\t\tEntrar\n\t\t\t\t\t</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"loginWithFacebook()\" style=\"\n    padding-top: 0px;\n    padding-bottom: 6px;\n\">Entrar con <i class=\"fa fa-facebook-official\" style=\"font-size:28px\"></i></button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12\" *ngIf=\"error\" style=\"color:red;\">\n\t\t\t\t\tPor favor revise su información de Usuario\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</tab>\n\t\t<tab>\n\t\t  \t<template tabHeading>\n\t\t      Nuevo Usuario\n\t\t    </template>\n\t\t\t<div class=\"row login\">\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Usuario<span class=\"required\" [class.reqerror]=\"validatorService.hasError('usuario',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"usuario\" [(ngModel)]=\"usuario.usuario\" \n\t\t\t\t\t [class.error]=\"validatorService.hasError('usuario',usuarioErrores)\" placeholder=\"juan1990\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Clave<span class=\"required\" [class.reqerror]=\"validatorService.hasError('contrasenna',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"password\" name=\"clave\" [(ngModel)]=\"usuario.contrasenna\" [class.error]=\"validatorService.hasError('contrasenna',usuarioErrores)\" placeholder=\"miclave\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Nombre<span class=\"required\" [class.reqerror]=\"validatorService.hasError('nombre',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"nombre\" [(ngModel)]=\"usuario.nombre\" [class.error]=\"validatorService.hasError('nombre',usuarioErrores)\" placeholder=\"Juan\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Apellido 1<span class=\"required\" [class.reqerror]=\"validatorService.hasError('apellido1',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"primerApellido\" [(ngModel)]=\"usuario.apellido1\" [class.error]=\"validatorService.hasError('apellido1',usuarioErrores)\" placeholder=\"Perez\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Apellido 2</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t<input type=\"text\" name=\"segundoApellido\" [(ngModel)]=\"usuario.apellido2\" [class.error]=\"validatorService.hasError('apellido2',usuarioErrores)\" placeholder=\"Lopez\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Correo<span class=\"required\" [class.reqerror]=\"validatorService.hasError('correo',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8 correos\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t   <div class=\"col-12 nuevo-numero\">\n\t                        <input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error]=\"validatorService.hasError('correo',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addCorreo()\"> + </span>\n\t                    </div>\n\t                    <div class=\"col-12 correo-display contact-item\" *ngFor=\"let correo of usuario.correo\">\n\t                        <span class=\"display\">{{correo.correo}} </span>\n\t                        <span class=\"small-action\" (click)=\"removeCorreo(correo)\"> - </span> \n\t                    </div>\n\t                   \n\t                </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Telefono<span class=\"required\" [class.reqerror]=\"validatorService.hasError('telefono',usuarioErrores)\">*</span></label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8 telefonos\">\n\t\t\t\t\t<div class=\"row\">\n\t                    <div class=\"col-12 nuevo-numero\">\n\t                        <input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error]=\"validatorService.hasError('telefono',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addTelefono()\"> + </span>\n\t                    </div>\n\t                    <div class=\"col-12 contact-item\" *ngFor=\"let telefono of usuario.telefono\">\n\t                        <span class=\"telefono-display\">{{telefono.telefono}} </span>\n\t                        <span class=\"small-action\" (click)=\"removeTelefono(telefono)\"> - </span> \n\t                    </div>\n\t                </div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 entrar\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"newUser()\">\n\t\t\t\t\t\tRegistrar\n\t\t\t\t\t</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"loginWithFacebook()\" style=\"\n    padding-top: 0px;\n    padding-bottom: 6px;\n\">Registrar con <i class=\"fa fa-facebook-official\" style=\"font-size:28px\"></i></button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12\" *ngIf=\"error\" style=\"color:red;\">\n\t\t\t\t\t{{authService.errorDisplay}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12\" *ngIf=\"validationError\" style=\"color:red;\">\n\t\t\t\t\t{{validationErrorMsg}}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</tab>\n\t</tabset>\n</div>"

/***/ }),

/***/ 545:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-toggleable-md navbar-inverse bg-inverse\">\n    <button class=\"navbar-toggler navbar-toggler-left menu-toogle\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\n    </button>\n    <button class=\"navbar-toggler navbar-toggler-right login-logo\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarLogin\" aria-controls=\"navbarLogin\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" *ngIf=\"authService.profilePic === ''\">\n        <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\n    </button>\n     <button class=\"navbar-toggler navbar-toggler-right login-logo\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarLogin\" aria-controls=\"navbarLogin\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" *ngIf=\"authService.profilePic != ''\" [style.background-image]=\"'url(' + authService.profilePic + ')'\">\n    </button>\n    <a class=\"navbar-brand\" href=\"#\"><span class=\"title\">{{authService.nombreBarberia}} <img src=\"assets/images/m2.png\" alt=\"Second slide\"></span></a>\n\n    <div class=\"collapse navbar-collapse justify-content-end\" id=\"navbarLogin\">\n        <ul class=\"navbar-nav mr-auto navbar-right\">\n            <li class=\"nav-item active\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged() == false\">\n                <a class=\"nav-link navbar-right\" (click)=\"openModal(template)\">Login</a>\n            </li>\n            <li class=\"nav-item active\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged()\">\n                <a class=\"nav-link navbar-right\" (click)=\"logout()\">Salir</a>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <ul class=\"navbar-nav mr-auto\" *ngIf=\"!authService.isAdminUser() && !authService.isBarberoUser() && !authService.isAdminSucursalUser()\">\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['home']\">Home</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['reserva']\">Reserva</a>\n            </li>\n             <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged()\">\n                <a class=\"nav-link\" [routerLink]=\"['citas']\">Citas</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged()\">\n                <a class=\"nav-link navbar-right\" [routerLink]=\"['info']\">Mi Cuenta</a>\n            </li>\n\n            <li class=\"nav-item d-none d-md-block user-img\"  data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged() && authService.profilePic != ''\">\n                 <img [src]=\"authService.profilePic\"/>               \n            </li>\n           \n        </ul>\n        <ul class=\"navbar-nav mr-auto\" *ngIf=\"authService.isAdminUser() || authService.isBarberoUser() || authService.isAdminSucursalUser()\">\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['home']\">Home</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['clientes']\">Clientes</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['citas']\">Citas</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['reserva']\">Reserva</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['factura']\">Factura</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\">\n                <a class=\"nav-link\" [routerLink]=\"['configuracion']\">Configuración</a>\n            </li>\n            <li class=\"nav-item\" [routerLinkActive]=\"['active']\" data-toggle=\"collapse\" data-target=\".navbar-collapse.show\" *ngIf=\"authService.isUserLogged()\">\n                <a class=\"nav-link navbar-right\" [routerLink]=\"['info']\">Mi Cuenta</a>\n            </li>\n        </ul>\n    </div>\n</nav>\n<div *ngIf=\"authService.isImpersonando\" class=\"impersonando\">\n    Actualmente esta impersonando a {{authService.loggedUser.nombre}} {{authService.loggedUser.apellido1}} {{authService.loggedUser.apellido2}} <span (click)=\"authService.noImpersonar()\">Dejar de impersonar</span>\n</div>\n\n<template #template>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">{{action}}</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <login-view (action)=\"hide()\"  (label)=\"updateAction()\"></login-view>\n    </div>\n</template>"

/***/ }),

/***/ 546:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-space\">\n</div>\n<div class=\"title reserva\">\n  <h5>Reserve su cita</h5>\n</div>\n\n<tabset [justified]=\"true\">  \n  <tab>\n    <template tabHeading>\n      <i class=\"fa fa-home\" aria-hidden=\"true\" #barberia></i>\n    </template>\n    <template [ngIf]=\"!authService.isAppUnica && !authService.isAdminSucursalUser()\">\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <span class=\"header-barberia\">Provincia:</span><br>\n          <div class=\"row\">\n            <div class=\"form-group col-12\">\n              <select class=\"form-control\" id=\"provincia\" (change)=\"provinciaChanged($event.target.value)\">\n                <option *ngFor=\"let provincia of provincias;let i = index\" [value]=\"i\">{{provincia}}</option>\n              </select>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <span class=\"header-barberia\">Canton:</span><br>\n          <div class=\"row\">\n            <div class=\"form-group col-12\">\n              <select class=\"form-control\" id=\"canton\" (change)=\"cantonChanged($event.target.value)\">\n                <option *ngFor=\"let canton of cantonesDisplay\" [value]=\"canton.id\">{{canton.canton}}</option>\n              </select>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <span class=\"header-barberia\">Nombre</span><br>\n          <div class=\"row\" *ngIf=\"barberias.length > 0\">\n            <div class=\"form-group col-12\">\n              <input placeholder=\"Nombre de su barberia\" [(ngModel)]=\"selectedLocal\" [typeahead]=\"barberias\" class=\"form-control\" (typeaheadOnSelect)=\"localSelect($event)\" typeaheadOptionField=\"descripcion\">\n            </div>\n            <div class=\"form-group col-12\">\n              <select class=\"styled-select blue semi-square\" id=\"sucursales\" (change)=\"localSelectUnica($event.target.value)\" [ngModel]=\"selectedLocalId\" style=\"height: 34px;\">\n                <option *ngFor=\"let barberia of barberias;\" [value]=\"barberia.id\">{{barberia.descripcion}}</option>\n              </select>\n            </div>\n          </div>\n          <div class=\"row\" *ngIf=\"barberias.length == 0\">\n            <div class=\"form-group col-12\">\n              No hay barberias disponibles en su cantón.\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <iframe\n            height=\"220\"\n            frameborder=\"0\" style=\"border:0\"\n            [src]=\"url\" allowfullscreen class=\"map col-12\">\n          </iframe>\n        </div>\n      </div>\n      <div class=\"col-12 next\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"goTo('barber')\" [disabled]=\"!validLocal\">\n          Ir a siguiente\n        </button>\n      </div>\n    </template>\n    <template [ngIf]=\"authService.isAppUnica || authService.isAdminSucursalUser()\">\n      <div class=\"col-12\">\n        <div class=\"col-12 card\">\n          <span class=\"header-barberia\">Sucursales:</span><br>\n          <div class=\"row\">\n            <div class=\"form-group col-12\">\n              <select class=\"styled-select blue semi-square\" id=\"sucursales\" (change)=\"localSelectUnica($event.target.value)\" style=\"height: 34px;\">\n                <option *ngFor=\"let barberia of barberias;\" [value]=\"barberia.id\">{{barberia.descripcion}}</option>\n              </select>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-12 next\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"goTo('barber')\" [disabled]=\"!validLocal\">\n          Ir a siguiente\n        </button>\n      </div>\n    </template>\n  </tab>\n  <tab>\n    <template tabHeading>\n      <i class=\"fa fa-user\" aria-hidden=\"true\" #barber></i>\n    </template>\n    <div class=\"col-12\">\n      <div class=\"col-12 card\">\n        <p class=\"item-action\">Seleccione la persona que quiere para su servicio:</p>\n        <app-barberos (selectBarberDone)=\"selectBarberDone($event)\" [barberiaSelected]=\"reservacion.local.id\" [isRegularUser]=\"authService.isRegularUser()\"></app-barberos>\n\n        <div class=\"col-12 next\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"goTo('date')\" [disabled]=\"!validBarber\">\n            Ir a siguiente\n          </button>\n        </div>\n      </div>\n    </div>\n  </tab>\n  <tab>\n    <template tabHeading>\n      <i class=\"fa fa-calendar\" aria-hidden=\"true\" #date></i>\n    </template>\n    <div class=\"col-12\">\n      <div class=\"col-12 card date\" [class.active]=\"escojeFecha\">\n        <p class=\"item-action\">Seleccione la fecha que desea para su servicio</p>\n        <p>Fecha: {{dateSelected | date: 'dd/MM/yyyy'}}</p>\n        <app-calendario (dateSelectedChange)=\"dateSelectedChange($event)\"></app-calendario>\n      </div>\n      <div class=\"col-12 card date\" [class.active]=\"!escojeFecha\">\n        <p style=\"overflow: hidden;\"><span style=\"float: left;\">Fecha: {{dateSelected | date: 'dd/MM/yyyy'}}</span> <span style=\"float: right;\"><span class=\"volver\" (click)=\"escojeFecha=true\"> Volver al calendario<i class=\"fa fa-arrow-left go-back-date\" aria-hidden=\"true\" ></i></span></span></p>\n        <p *ngIf=\"reservacion.servicio\">Horarios para citas disponibles este dia:</p>\n        <p *ngIf=\"!reservacion.servicio\">Por Favor seleccione un barbero y un servicio primero</p>\n        <p *ngIf=\"authService.isAdminSucursalUser()\">\n          <span class=\"reservada\"><span class=\"ball\"></span> Reservada </span>\n          <span class=\"pausada\"><span class=\"ball\"></span> En pausa </span>\n          <span class=\"active\"><span class=\"ball\"></span> Seleccionada </span>\n        </p>\n        <ul class=\"reservas row\">\n          <ng-container *ngFor=\"let reserva of camposLibres\">\n            <li (click)=\"(!reserva.reservada && !reserva.pausada && selectReserva(reserva)) ||(authService.isAdminSucursalUser() && reserva.pausada)\" class=\"col-4\" *ngIf=\"(!reserva.reservada && !reserva.pausada) || authService.isAdminSucursalUser()\">\n              <div [class.active]=\"selectedReserva==reserva\" [class.reservada]=\"reserva.reservada\" [class.pausada]=\"reserva.pausada\">\n                <p>{{reserva.hora | date:'shortTime'}}</p>\n              </div>\n            </li>\n          </ng-container>\n        </ul>\n        <div class=\"col-12 next\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"goTo('confirmar')\" [disabled]=\"!validReserva\">\n            Ir a siguiente\n          </button>\n        </div>\n      </div>\n    </div>\n  </tab>\n  <tab>\n    <template tabHeading>\n      <i class=\"fa fa-check\" aria-hidden=\"true\" #confirmar></i>\n    </template>\n    <div class=\"col-12\">\n      <div class=\"col-12 card\">\n        <p class=\"item-action\">Por favor confirme su reserva</p>\n        <ul class=\"confirmar-items\">\n          <li><span>Barberia : </span><span *ngIf=\"reservacion.local\">{{reservacion.local.descripcion}}</span></li>\n          <li><span>Barbero : </span><span *ngIf=\"reservacion.barbero\">{{reservacion.barbero.nombre}}</span></li>\n          <li><span>Servicio : </span><span *ngIf=\"reservacion.servicio\">{{reservacion.servicio.descripcion}}</span></li>\n          <li><span>Duración : </span><span *ngIf=\"reservacion.servicio\">{{reservacion.servicio.duracion}} Minutos</span></li>\n          <li><span>Fecha : </span><span *ngIf=\"reservacion.fecha\">{{reservacion.fecha | date: 'mediumDate'}}</span></li>\n          <li><span>Hora : </span><span *ngIf=\"reservacion.hora\">{{reservacion.hora.hora | date:'shortTime'}}</span></li>\n          <li><span>Precio : </span><span *ngIf=\"reservacion.servicio\">{{reservacion.servicio.precio}}</span></li>\n          <li *ngIf=\"authService.isAdminSucursalUser()\"><span>Cliente : </span><span *ngIf=\"reservacion.usuarioCita\">{{reservacion.usuarioCita.nombre}} {{reservacion.usuarioCita.apellido1}}</span></li>\n        </ul>\n        <div *ngIf=\"!authService.isAdminSucursalUser() && authService.loggedUser && authService.loggedUser.telefono.length == 0\">\n          Su usuario no tiene número de teléfono registrado, por favor agregue uno para poder hacer su reserva.\n          <div class=\"col-8 telefonos\">\n            <div class=\"row\">\n              <div class=\"col-12 nuevo-numero\">\n                  <input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error-input]=\"validatorService.hasError('telefono',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addTelefonoUpdate()\"> + </span>\n              </div>\n              <div class=\"col-12 contact-item\" *ngFor=\"let telefono of nuevoUsuario.telefono\">\n                  <span class=\"telefono-display\">{{telefono.telefono}} </span>\n                  <span class=\"small-action\" (click)=\"removeTelefonoUpdate(telefono)\"> - </span> \n              </div>\n            </div>\n          </div>\n        </div>\n        <p *ngIf=\"!validReservaTotal\" class=\"error\">\n          Por Favor complete los datos para la reserva!\n        </p>\n        <div *ngIf=\"authService.isAdminSucursalUser()\">\n          <p>Digite el nombre del cliente para el cual quiere agregar esta cita o de click en Nuevo Cliente para agregar uno nuevo:</p>\n          <input class=\"auto-usuario\" type=\"text\" name=\"\" placeholder=\"Nombre Apellidos\" [(ngModel)]=\"buscaUsuario\" (ngModelChange)=\"buscaUsuarioChanged()\">\n          <ul>\n            <li *ngFor=\"let usuario of usuarioCita\"> \n              <span class=\"usuarios\" (click)=\"seleccionaUsuarioCita(usuario)\" [class.active]=\"reservacion.usuarioCita && usuario.id == reservacion.usuarioCita.id\">{{usuario.nombre}} {{usuario.apellido1}} {{usuario.apellido2}} | <span *ngIf=\"usuario.telefono.length > 0\">{{usuario.telefono[0].telefono}}</span>\n              </span>\n            </li>\n          </ul>\n          <button type=\"button\" class=\"btn btn-primary\" style=\"margin-bottom: 30px;\" (click)=\"nuevoUsuarioDisplay = !nuevoUsuarioDisplay\">\n            Nuevo Cliente \n            <span *ngIf=\"!nuevoUsuarioDisplay\">></span>\n            <span *ngIf=\"nuevoUsuarioDisplay\"><</span>\n          </button>\n          <div *ngIf=\"nuevoUsuarioDisplay\">\n            <div class=\"row login\">\n              <div class=\"col-4\">\n                <label>Usuario<span class=\"required\" [class.reqerror]=\"validatorService.hasError('usuario',usuarioErrores)\">*</span></label>\n              </div>\n              <div class=\"col-8\">\n                <input type=\"text\" name=\"usuario\" [(ngModel)]=\"nuevoUsuario.usuario\" \n                 [class.error-input]=\"validatorService.hasError('usuario',usuarioErrores)\" placeholder=\"juan1990\">\n              </div>\n              <div class=\"col-4\">\n                <label>Nombre<span class=\"required\" [class.reqerror]=\"validatorService.hasError('nombre',usuarioErrores)\">*</span></label>\n              </div>\n              <div class=\"col-8\">\n                <input type=\"text\" name=\"nombre\" [(ngModel)]=\"nuevoUsuario.nombre\" [class.error-input]=\"validatorService.hasError('nombre',usuarioErrores)\" placeholder=\"Juan\">\n              </div>\n              <div class=\"col-4\">\n                <label>Apellido 1<span class=\"required\" [class.reqerror]=\"validatorService.hasError('apellido1',usuarioErrores)\">*</span></label>\n              </div>\n              <div class=\"col-8\">\n                <input type=\"text\" name=\"primerApellido\" [(ngModel)]=\"nuevoUsuario.apellido1\" [class.error-input]=\"validatorService.hasError('apellido1',usuarioErrores)\" placeholder=\"Perez\">\n              </div>\n              <div class=\"col-4\">\n                <label>Apellido 2</label>\n              </div>\n              <div class=\"col-8\">\n                <input type=\"text\" name=\"segundoApellido\" [(ngModel)]=\"nuevoUsuario.apellido2\" [class.error-input]=\"validatorService.hasError('apellido2',usuarioErrores)\" placeholder=\"Lopez\">\n              </div>\n              <div class=\"col-4\">\n                <label>Cédula<span class=\"required\" [class.reqerror]=\"validatorService.hasError('cedula',usuarioErrores)\">*</span></label>\n              </div>\n              <div class=\"col-8\">\n                <input type=\"text\" name=\"cedula\" [(ngModel)]=\"nuevoUsuario.cedula\" [class.error-input]=\"validatorService.hasError('cedula',usuarioErrores)\" >\n              </div>\n              <div class=\"col-4\">\n                <label>Correo<span class=\"required\" [class.reqerror]=\"validatorService.hasError('correo',usuarioErrores)\">*</span></label>\n              </div>\n              <div class=\"col-8 correos\">\n                <div class=\"row\">\n                   <div class=\"col-12 nuevo-numero\">\n                                <input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error-input]=\"validatorService.hasError('correo',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addCorreo()\"> + </span>\n                            </div>\n                            <div class=\"col-12 correo-display contact-item\" *ngFor=\"let correo of nuevoUsuario.correo\">\n                                <span class=\"display\">{{correo.correo}} </span>\n                                <span class=\"small-action\" (click)=\"removeCorreo(correo)\"> - </span> \n                            </div>\n                           \n                        </div>\n              </div>\n              <div class=\"col-4\">\n                <label>Telefono<span class=\"required\" [class.reqerror]=\"validatorService.hasError('telefono',usuarioErrores)\">*</span></label>\n              </div>\n              <div class=\"col-8 telefonos\">\n                <div class=\"row\">\n                            <div class=\"col-12 nuevo-numero\">\n                                <input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error-input]=\"validatorService.hasError('telefono',usuarioErrores)\"> <span class=\"small-action\" (click)=\"addTelefono()\"> + </span>\n                            </div>\n                            <div class=\"col-12 contact-item\" *ngFor=\"let telefono of nuevoUsuario.telefono\">\n                                <span class=\"telefono-display\">{{telefono.telefono}} </span>\n                                <span class=\"small-action\" (click)=\"removeTelefono(telefono)\"> - </span> \n                            </div>\n                        </div>\n              </div>\n              <div class=\"col-12 entrar\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"newUser()\">\n                  Registrar\n                </button>\n              </div>\n              <div class=\"col-12\" *ngIf=\"nuevoUsuarioError\" style=\"color:red;\">\n                {{authService.errorDisplay}}\n              </div>\n              <div class=\"col-12\" *ngIf=\"validationError\" style=\"color:red;\">\n                {{validationErrorMsg}}\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"col-12 next\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmarReserva(template)\" [disabled]=\"!validReservaTotal\">\n            Confirmar!\n          </button>\n        </div>\n      </div>\n    </div>\n  </tab>\n</tabset>\n<div class=\"cargando\" *ngIf=\"cargando\">\n  <div>\n    <img src=\"assets/images/m2.png\">\n    Cargando...\n  </div>\n</div>\n\n\n<template #template>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">Ingresar</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\"modal-body\">\n        <login-view (action)=\"hide()\"  (label)=\"updateAction()\"></login-view>\n    </div>\n</template>"

/***/ }),

/***/ 547:
/***/ (function(module, exports) {

module.exports = "<div class=\"\" [style.background]=\"'url(/img/' + card.images[0] + ')'\">\n{{card.title}}\n</div>"

/***/ }),

/***/ 548:
/***/ (function(module, exports) {

module.exports = "<img src=\"assets/images/{{name}}.jpg\" class=\"img-fluid\" (click)=\"lgModal.show()\">\n \n<div bsModal #lgModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\"></h4>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"lgModal.hide()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <img src=\"assets/images/{{name}}.jpg\" class=\"img-fluid\">\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 549:
/***/ (function(module, exports) {

module.exports = "<div class=\"header-space\">\n</div>\n\n\n<div class=\"container\">\n\t<div clas=\"col-12\">\n\t\t<div class=\"module white-back static row\">\n\t\t\t<div class=\"title reserva col-12\">\n\t\t\t  <h5>Clientes</h5>\n\t\t\t</div>\n\t\t\t<div class=\"row col-12 separador\">\n\t\t\t\t<div class=\"col-4\">\n\t\t\t\t\t<label>Buscar Clientes</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t <input class=\"auto-usuario tamComponent\" type=\"text\" name=\"\" placeholder=\"Nombre Apellidos\" [(ngModel)]=\"buscaUsuario\" (ngModelChange)=\"buscaUsuarioChanged()\">\n\t\t\t          <ul>\n\t\t\t            <li *ngFor=\"let usuario of usuarioCita\"> \n\t\t\t              <span class=\"usuarios\" (click)=\"seleccionaUsuarioCita(usuario)\">{{usuario.nombre}} {{usuario.apellido1}} {{usuario.apellido2}} | <span *ngIf=\"usuario.telefono.length > 0\">{{usuario.telefono[0].telefono}}</span>\n\t\t\t              </span>\n\t\t\t            </li>\n\t\t\t          </ul>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class=\"row col-12\">\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Usuario<span class=\"required\" [class.reqerror]=\"validatorService.hasError('usuario',usuarioErrores)\">*</span></label>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<input type=\"text\" name=\"usuario\" class=\"form-control\"  [(ngModel)]=\"nuevoUsuario.usuario\" [class.error-input]=\"validatorService.hasError('usuario',usuarioErrores)\" placeholder=\"juan1990\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Nombre<span class=\"required\" [class.reqerror]=\"validatorService.hasError('nombre',usuarioErrores)\">*</span></label>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<input type=\"text\" name=\"nombre\" class=\"form-control\"  [(ngModel)]=\"nuevoUsuario.nombre\" [class.error-input]=\"validatorService.hasError('nombre',usuarioErrores)\" placeholder=\"Juan\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Apellido 1<span class=\"required\" [class.reqerror]=\"validatorService.hasError('apellido1',usuarioErrores)\">*</span></label>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"  name=\"primerApellido\" [(ngModel)]=\"nuevoUsuario.apellido1\" [class.error-input]=\"validatorService.hasError('apellido1',usuarioErrores)\" placeholder=\"Perez\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Apellido 2</label>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<input type=\"text\"  class=\"form-control\"  name=\"segundoApellido\" [(ngModel)]=\"nuevoUsuario.apellido2\" [class.error-input]=\"validatorService.hasError('apellido2',usuarioErrores)\" placeholder=\"Lopez\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\"></label>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<input type=\"button\"  class=\"btn btn-info\" value=\"Buscar Por Nombre\"  name=\"buscarNombre\" (click)=\"buscarPorNombre()\">\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li *ngFor=\"let cli of posiblesClientes\" (click)=selectCliente(cli)>\n\t\t\t\t\t\t\t\t* {{cli.nombre}} {{cli.apellido1}} {{cli.apellido2}} ced: {{cli.cedula}}\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Cédula</label>\n\t\t\t\t\t<div class=\"col-8\"> \n\t\t\t\t\t\t<input type=\"number\"  class=\"form-control\" maxlength=\"9\" minlength=\"9\" name=\"cedula\" [(ngModel)]=\"nuevoUsuario.cedula\"  >\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\"></label>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<input type=\"button\"  class=\"btn btn-info\"  value=\"Buscar por Cédula\" name=\"buscarCedula\" (click)=\"buscarPorCedula()\">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Fecha Nacimiento</label>\n\t\t\t\t\t<div class=\"col-8\">\n\t\t\t\t\t\t<calendario-input [customClass]=\"'form-control'\" name=\"fechaNacimiento\"  [daterecive]=\"fecha\"  (dateSelectedChange)=\"fechaChanges($event)\"></calendario-input>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Provincia:</label>\n\t        \t\t<div class=\"col-8\">\n\t\t                <select class=\"form-control\" id=\"provincia\" [(ngModel)]=\"selectedProvincia\" (ngModelChange)=\"changeProvincia($event)\">\n\t\t                    <option *ngFor=\"let provincia of provincias;let i = index\" [ngValue]=\"provincia\">{{provincia.nombre}}</option>\n\t\t                </select>\n\t\t        \t</div>\n\t\t        </div>\n\t        \t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Canton:</label>\n\t\t        \t<div class=\"col-8\">\n\t\t        \t     <select class=\"form-control\" id=\"canton\" [(ngModel)]=\"selectedCanton\" (ngModelChange)=\"changeCanton($event)\">\n\t\t                    <option *ngFor=\"let canton of selectedProvincia.cantones\" [ngValue]=\"canton\">{{canton.nombre}}</option>\n\t\t                </select>\n\t\t        \t</div>\n\t\t        </div>\n\t            <div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Distrito:</label>\n\t\t            <!-- <div class=\"col-8\">\n\t\t                <input type=\"text\" class=\"form-control\"  name=\"distrito\" [(ngModel)]=\"nuevoUsuario.distrito\" [class.error]=\"validatorService.hasError('distrito',usuarioErrores)\">\n\t\t            </div> -->\n\t\t            <div class=\"col-8\">\n\t\t        \t     <select class=\"form-control\" id=\"distrito\" [(ngModel)]=\"nuevoUsuario.distrito\">\n\t\t                    <option *ngFor=\"let distrito of selectedCanton.distritos\" [value]=\"distrito.codigo\">{{distrito.nombre}}</option>\n\t\t                </select>\n\t\t        \t</div>\n\t\t        </div>\n\t          <!--   <div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Barrio:</label>\n\t\t            <div class=\"col-8\">\n\t\t                <input type=\"text\" class=\"form-control\"  name=\"barrio\" [(ngModel)]=\"nuevoUsuario.barrio\" [class.error]=\"validatorService.hasError('barrio',usuarioErrores)\">\n\t\t            </div>\n\t\t        </div> -->\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Señas:</label>\n\t\t        \t<div class=\"col-8\">\n\t\t        \t\t<input type=\"text\" class=\"form-control\"  name=\"ubicacion\" [(ngModel)]=\"nuevoUsuario.detalleDireccion\" [class.error]=\"validatorService.hasError('detalleDireccion',usuarioErrores)\">\n\t\t        \t</div>\n\t\t        </div>\n\n\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Correo<span class=\"required\" [class.reqerror]=\"validatorService.hasError('correo',usuarioErrores)\">*</span></label>\n\t\t\t\t\t<div class=\"col-8 correos\">\n\t\t\t\t\t\t<div class=\"row \">\n\t\t\t\t\t\t\t<div class=\"col-12 nuevo-numero\">\n\t\t\t\t\t\t\t\t<div class=\"input-group mb-2\">\n\t\t\t\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"nuevoCorreo\" [class.error-input]=\"validatorService.hasError('correo',usuarioErrores)\" class=\"form-control\">\n\t\t\t\t\t\t\t\t<!--\t<div class=\"input-group mb-2\">-->\n\t\t\t\t\t\t\t\t\t\t<span class=\"small-action\" (click)=\"addCorreo()\"> + </span>\n\t\t\t\t\t\t\t\t<!--\t</div -->\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-12 correo-display contact-item\" *ngFor=\"let correo of nuevoUsuario.correo\">\n\t\t\t\t\t\t\t\t<span class=\"display\">{{correo.correo}} </span>\n\t\t\t\t\t\t\t\t<span class=\"small-action\" (click)=\"removeCorreo(correo)\"> - </span> \n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12 row form-group\">\n\t\t\t\t\t<label class=\"col-4 col-form-label\">Telefono<span class=\"required\" [class.reqerror]=\"validatorService.hasError('telefono',usuarioErrores)\">*</span></label>\n\t\t\t\t\t<div class=\"col-8 telefonos \">\n\t\t\t\t\t\t<div class=\"row \">\n\t\t\t\t\t\t\t<div class=\"col-12 nuevo-numero\">\n\t\t\t\t\t\t\t\t<div class=\"input-group mb-2\">\n\t\t\t\t\t\t        \t<input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error-input]=\"validatorService.hasError('telefono',usuarioErrores)\" class=\"form-control\">\n\t\t\t\t\t\t        \t<!--<div class=\"input-group mb-2\"> -->\n\t\t\t\t\t\t\t\t\t    <span class=\"small-action input-group-text\" (click)=\"addTelefono()\"> + </span>\n\t\t\t\t\t\t\t\t\t<!--</div>-->\n\t\t\t\t\t\t    \t</div>\n\t\t\t\t\t\t\t\t<!-- <input type=\"number\" [(ngModel)]=\"nuevoTelefono\" [class.error-input]=\"validatorService.hasError('telefono',usuarioErrores)\" class=\"form-control\">  -->\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"col-12 contact-item\" *ngFor=\"let telefono of nuevoUsuario.telefono\">\n\t\t\t\t\t\t\t\t<span class=\"telefono-display\">{{telefono.telefono}} </span>\n\t\t\t\t\t\t\t\t<span class=\"small-action\" (click)=\"removeTelefono(telefono)\"> - </span> \n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-2 entrar\">\n\t\t\t\t\t<button type=\"button\" *ngIf=\"encontroUsuario == false\" class=\"btn btn-primary\" (click)=\"newUser()\">\n\t\t\t\t\t\tRegistrar\n\t\t\t\t\t</button>\n\t\t\t\t\t<button type=\"button\" *ngIf=\"encontroUsuario\" class=\"btn btn-primary\" (click)=\"updateUser()\">\n\t\t\t\t\t\tModificar\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-10 entrar\">\n\t\t\t\t\t<button type=\"button\" *ngIf=\"encontroUsuario\" class=\"btn btn-danger\" (click)=\"deleteUser()\">\n\t\t\t\t\t\tEliminar\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t<div class=\"col-12\" *ngIf=\"nuevoUsuarioError\" style=\"color:red;\">\n\t\t\t\t\t{{authService.errorDisplay}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-12\" *ngIf=\"validationError\" style=\"color:red;\">\n\t\t\t\t\t{{validationErrorMsg}}\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"cargando\" *ngIf=\"cargando\">\n  <div>\n    <img src=\"assets/images/m2.png\">\n    Cargando...\n  </div>\n</div>\n\n\n\n\n<ng-template #printModificar>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\" style=\"text-transform: capitalize;\">Información</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"printRefCompletar.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n  \t<div class=\"text-center\">\n  \t\t<p>Actualización Exitosa</p>\n  \t</div>\n  </div>\n</ng-template>"

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SharedService = (function () {
    function SharedService(http) {
        this.http = http;
        this.token = '';
        // public server:string = "http://localhost:82/API/index.php"
        // public server:string = "/API/index.php"
        this.server = "http://kyrapps.com:9004";
        // var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        // if ( app ) {
        //     this.server = "http://lospeluqueros.com/API/index.php";
        // }
    }
    SharedService.prototype.search = function (url, element) {
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
    SharedService.prototype.post = function (url, element) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.server + url, JSON.stringify(element), options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SharedService.prototype.postFile = function (url, element) {
        return this.http.post(this.server + url, JSON.stringify(element), { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* ResponseContentType */].Blob })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SharedService.prototype.getAll = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.server + url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SharedService.prototype.get = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.server + url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SharedService.prototype.delete = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.token);
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.delete(this.server + url, options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SharedService.prototype.setToken = function (token) {
        this.token = 'Bearer ' + token;
    };
    SharedService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return SharedService;
}());
SharedService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */]) === "function" && _a || Object])
], SharedService);

var _a;
//# sourceMappingURL=shared.service.js.map

/***/ }),

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(338);


/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__window_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(33);
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

},[608]);
//# sourceMappingURL=main.bundle.js.map