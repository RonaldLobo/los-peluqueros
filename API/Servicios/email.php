<?php

//require_once $_SERVER['DOCUMENT_ROOT'] . '/API/Data/DBUsuario.php';


class EmailServicios {
    
    function EnvioEmailReserva($idUsuario,$idSucursal,$idReserva){
               
        $dbUsuario = new DbUsuario(); 
        $dbReserva = new DBReserva(); 
        $usuarios = $dbUsuario->obtenerDatosEmail($idUsuario,$idSucursal);
        $reserva = $dbReserva->obtenerReserva($idReserva,1);
        $to = "";
        $subject = "";
        $message = "";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: <reservas@lospeluqueros.com>' . "\r\n";
        $to = $usuarios['correo'];
        echo 'correo';
        echo $to;
        $subject="Confirmación de Cita en ".$usuarios['barberia'];
        $message='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
	<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Reserva en Los Peluqueros</title>
        <style type="text/css">
			/* /\/\/\/\/\/\/\/\/ CLIENT-SPECIFIC STYLES /\/\/\/\/\/\/\/\/ */
			#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
			.ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
			.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */
			body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
			table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
			img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */
			/* /\/\/\/\/\/\/\/\/ RESET STYLES /\/\/\/\/\/\/\/\/ */
			body{margin:0; padding:0;}
			img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
			table{border-collapse:collapse !important;}
			body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}
			/* /\/\/\/\/\/\/\/\/ TEMPLATE STYLES /\/\/\/\/\/\/\/\/ */
			/* ========== Page Styles ========== */
			#bodyCell{padding:20px;}
			#templateContainer{width:600px;}
			/**
			* @tab Page
			* @section background style
			* @theme page
			*/
			body, #bodyTable{
				/*@editable*/ background-color:#DEE0E2;
			}
			/**
			* @tab Page
			* @section background style
			* @theme page
			*/
			#bodyCell{
				/*@editable*/ border-top:4px solid #BBBBBB;
			}
			/**
			* @tab Page
			* @section email border
			* @tip Set the border for your email.
			*/
			#templateContainer{
				/*@editable*/ border:1px solid #BBBBBB;
			}
			/**
			* @tab Page
			* @section heading 1
			* @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
			* @style heading 1
			*/
			h1{
				/*@editable*/ color:#202020 !important;
				display:block;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:26px;
				/*@editable*/ font-style:normal;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				/*@editable*/ letter-spacing:normal;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Page
			* @section heading 2
			* @tip Set the styling for all second-level headings in your emails.
			* @style heading 2
			*/
			h2{
				/*@editable*/ color:#404040 !important;
				display:block;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:20px;
				/*@editable*/ font-style:normal;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				/*@editable*/ letter-spacing:normal;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Page
			* @section heading 3
			* @tip Set the styling for all third-level headings in your emails.
			* @style heading 3
			*/
			h3{
				/*@editable*/ color:#606060 !important;
				display:block;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:16px;
				/*@editable*/ font-style:italic;
				/*@editable*/ font-weight:normal;
				/*@editable*/ line-height:100%;
				/*@editable*/ letter-spacing:normal;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Page
			* @section heading 4
			* @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
			* @style heading 4
			*/
			h4{
				/*@editable*/ color:#808080 !important;
				display:block;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:14px;
				/*@editable*/ font-style:italic;
				/*@editable*/ font-weight:normal;
				/*@editable*/ line-height:100%;
				/*@editable*/ letter-spacing:normal;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}
			/* ========== Header Styles ========== */
			/**
			* @tab Header
			* @section preheader style
			* @theme header
			*/
			#templatePreheader{
				/*@editable*/ background-color:#F4F4F4;
				/*@editable*/ border-bottom:1px solid #CCCCCC;
			}
			/**
			* @tab Header
			* @section preheader text
			*/
			.preheaderContent{
				/*@editable*/ color:#808080;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:10px;
				/*@editable*/ line-height:125%;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Header
			* @section preheader link
			*/
			.preheaderContent a:link, .preheaderContent a:visited, /* Yahoo! Mail Override */ .preheaderContent a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:#606060;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			/**
			* @tab Header
			* @section header style
			* @theme header
			*/
			#templateHeader{
				/*@editable*/ background-color:#F4F4F4;
				/*@editable*/ border-top:1px solid #FFFFFF;
				/*@editable*/ border-bottom:1px solid #CCCCCC;
			}
			/**
			* @tab Header
			* @section header text
			*/
			.headerContent{
				/*@editable*/ color:#505050;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:20px;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				/*@editable*/ padding-top:0;
				/*@editable*/ padding-right:0;
				/*@editable*/ padding-bottom:0;
				/*@editable*/ padding-left:0;
				/*@editable*/ text-align:left;
				/*@editable*/ vertical-align:middle;
			}
			/**
			* @tab Header
			* @section header link
			*/
			.headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:#EB4102;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			#headerImage{
				height:auto;
				max-width:600px;
			}
			/* ========== Column Styles ========== */
			.templateColumnContainer{width:260px;}
			/**
			* @tab Columns
			* @section column style
			*/
			#templateColumns{
				/*@editable*/ background-color:#F4F4F4;
				/*@editable*/ border-top:1px solid #FFFFFF;
				/*@editable*/ border-bottom:1px solid #CCCCCC;
			}
			/**
			* @tab Columns
			* @section left column text
			*/
			.leftColumnContent{
				/*@editable*/ color:#505050;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:14px;
				/*@editable*/ line-height:150%;
				padding-top:0;
				padding-right:20px;
				padding-bottom:20px;
				padding-left:20px;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Columns
			* @section left column link
			*/
			.leftColumnContent a:link, .leftColumnContent a:visited, /* Yahoo! Mail Override */ .leftColumnContent a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:green;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			/**
			* @tab Columns
			* @section right column text
			*/
			.rightColumnContent{
				/*@editable*/ color:#505050;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:14px;
				/*@editable*/ line-height:150%;
				padding-top:0;
				padding-right:20px;
				padding-bottom:20px;
				padding-left:20px;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Columns
			* @section right column link
			*/
			.rightColumnContent a:link, .rightColumnContent a:visited, /* Yahoo! Mail Override */ .rightColumnContent a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:green;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			.leftColumnContent img, .rightColumnContent img{
				display:inline;
				height:auto;
				max-width:260px;
			}
			/* ========== Footer Styles ========== */
			/**
			* @tab Footer
			* @section footer style
			* @theme footer
			*/
			#templateFooter{
				/*@editable*/ background-color:#F4F4F4;
				/*@editable*/ border-top:1px solid #FFFFFF;
			}
			/**
			* @tab Footer
			* @section footer text
			* @theme footer
			*/
			.footerContent{
				/*@editable*/ color:#808080;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:10px;
				/*@editable*/ line-height:150%;
				padding-top:20px;
				padding-right:20px;
				padding-bottom:20px;
				padding-left:20px;
				/*@editable*/ text-align:left;
			}
			.footerContent.fb {
				color: #0066cc;
			}
			/**
			* @tab Footer
			* @section footer link
			*/
			.footerContent a:link, .footerContent a:visited, /* Yahoo! Mail Override */ .footerContent a .yshortcuts, .footerContent a span /* Yahoo! Mail Override */{
				/*@editable*/ color:#606060;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			.footerContent.fb a:link{
				color: #0066cc;
			}
			/* /\/\/\/\/\/\/\/\/ MOBILE STYLES /\/\/\/\/\/\/\/\/ */
            @media only screen and (max-width: 480px){
				/* /\/\/\/\/\/\/ CLIENT-SPECIFIC MOBILE STYLES /\/\/\/\/\/\/ */
				body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} /* Prevent Webkit platforms from changing default text sizes */
                                body{width:100% !important; min-width:100% !important;} /* Prevent iOS Mail from adding padding to the body */
				/* /\/\/\/\/\/\/ MOBILE RESET STYLES /\/\/\/\/\/\/ */
				#bodyCell{padding:10px !important;}
				/* /\/\/\/\/\/\/ MOBILE TEMPLATE STYLES /\/\/\/\/\/\/ */
				/* ======== Page Styles ======== */
				/**
				* @tab Mobile Styles
				* @section template width
				*/
				#templateContainer{
					max-width:600px !important;
					/*@editable*/ width:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section heading 1
				* @tip Make the first-level headings larger in size for better readability on small screens.
				*/
				h1{
					/*@editable*/ font-size:24px !important;
					/*@editable*/ line-height:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section heading 2
				* @tip Make the second-level headings larger in size for better readability on small screens.
				*/
				h2{
					/*@editable*/ font-size:20px !important;
					/*@editable*/ line-height:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section heading 3
				* @tip Make the third-level headings larger in size for better readability on small screens.
				*/
				h3{
					/*@editable*/ font-size:18px !important;
					/*@editable*/ line-height:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section heading 4
				* @tip Make the fourth-level headings larger in size for better readability on small screens.
				*/
				h4{
					/*@editable*/ font-size:16px !important;
					/*@editable*/ line-height:100% !important;
				}
				/* ======== Header Styles ======== */
				#templatePreheader{display:none !important;} /* Hide the template preheader to save space */
				/**
				* @tab Mobile Styles
				* @section header image
				*/
				#headerImage{
					height:auto !important;
					/*@editable*/ max-width:600px !important;
					/*@editable*/ width:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section header text
				* @tip Make the header content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
				*/
				.headerContent{
					/*@editable*/ font-size:20px !important;
					/*@editable*/ line-height:125% !important;
				}
				/* ======== Column Styles ======== */
				.templateColumnContainer{display:block !important; width:100% !important;}
				/**
				* @tab Mobile Styles
				* @section column image
				*/
				.columnImage{
					height:auto !important;
					/*@editable*/ max-width:260px !important;
					/*@editable*/ width:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section left column text
				* @tip Make the left column content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
				*/
				.leftColumnContent{
					/*@editable*/ font-size:16px !important;
					/*@editable*/ line-height:125% !important;
				}
				/**
				* @tab Mobile Styles
				* @section right column text
				* @tip Make the right column content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
				*/
				.rightColumnContent{
					/*@editable*/ font-size:16px !important;
					/*@editable*/ line-height:125% !important;
				}
				/* ======== Footer Styles ======== */
				/**
				* @tab Mobile Styles
				* @section footer text
				* @tip Make the body content text larger in size for better readability on small screens.
				*/
				.footerContent{
					/*@editable*/ font-size:14px !important;
					/*@editable*/ line-height:115% !important;
				}
				.footerContent a{display:block !important;} /* Place footer social and utility links on their own lines, for easier access */
			}
		</style>
                </head>
                <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
                    <center>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                            <tr>
                                    <td align="center" valign="top" id="bodyCell">
                                    <!-- BEGIN TEMPLATE // -->
                                    <table border="0" cellpadding="0" cellspacing="0" id="templateContainer">
                                        <tr>
                                            <td align="center" valign="top">
                                                    <!-- BEGIN PREHEADER // -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templatePreheader">
                                                    <tr>
                                                        <td valign="top" class="preheaderContent" style="padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:20px;" mc:edit="preheader_content00">
                                                            Gracias por su reserva en '.$usuarios['barberia'].'
                                                        </td>
                                                        <!-- *|IFNOT:ARCHIVE_PAGE|* -->
                                                        <td valign="top" width="180" class="preheaderContent" style="padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:0;" mc:edit="preheader_content01">
                                                        </td>
                                                        <!-- *|END:IF|* -->
                                                    </tr>
                                                </table>
                                                <!-- // END PREHEADER -->
                                            </td>
                                        </tr>
                                            <tr>
                                            <td align="center" valign="top">
                                                    <!-- BEGIN HEADER // -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader">
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                            <img src="http://res.cloudinary.com/dy8xejglg/image/upload/v1506098399/barber3_cuht5r.jpg" style="max-width:600px;" id="headerImage" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                                                        </td>
                                                    </tr>
                                                </table>
                                                <!-- // END HEADER -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="80%" id="templateHeader">
                                                    <tr>
                                                    	<td valign="top" class="headerContent">
                                                           	Local: '.$reserva->sucursal.'
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                           	Fecha: '.$reserva->dia.'
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                           	Hora: '.$reserva->horaInicial.'
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                           	Precio: '.$reserva->precio.'
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                           	Barbero: '.$reserva->nombreBarbero.' '.$reserva->primerApellidoBarbero.' '.$reserva->segundoApellidoBarbero.'
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                           	Servicio: '.$reserva->servicio.'
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                           	Duracion: '.$reserva->duracion.'
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                         <tr>
                                            <td align="center" valign="top">
                                                    <!-- BEGIN FOOTER // -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter">
                                                    <tr>
                                                        <td valign="top" class="footerContent fb" mc:edit="footer_content00">
                                                            <a href="https://www.facebook.com/lospeluqueros">Síguenos en Facebook</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" class="footerContent" style="padding-top:0;" mc:edit="footer_content01">
                                                            <em>Copyright &copy; 2017 kyr.com, All rights reserved.</em>
                                                            <br />
                                                            <br />
                                                            <strong>Contáctanos:</strong>
                                                            <br />
                                                            contacto@lospeluqueros.com
                                                        </td>
                                                    </tr>
                                                </table>
                                                <!-- // END FOOTER -->
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- // END TEMPLATE -->
                                </td>
                            </tr>
                        </table>
                    </center>
                </body>
            </html>';
        mail($to,$subject,$message,$headers);
        return $usuarios;
    }
    
    function EnvioEmailNuevoUsuario($usuario,$correo){
               
        $dbUsuario = new DbUsuario();
        $to = "";
        $subject = "";
        $message = "";
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From: <registro@lospeluqueros.com>' . "\r\n";
        $to = $correo->correo;
        $subject="Bienvenido a Los Peluqueros.";
        $message='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
	<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Bienvenido a los Peluqueros</title>
        <style type="text/css">
			/* /\/\/\/\/\/\/\/\/ CLIENT-SPECIFIC STYLES /\/\/\/\/\/\/\/\/ */
			#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
			.ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
			.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */
			body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
			table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
			img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */
			/* /\/\/\/\/\/\/\/\/ RESET STYLES /\/\/\/\/\/\/\/\/ */
			body{margin:0; padding:0;}
			img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
			table{border-collapse:collapse !important;}
			body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}
			/* /\/\/\/\/\/\/\/\/ TEMPLATE STYLES /\/\/\/\/\/\/\/\/ */
			/* ========== Page Styles ========== */
			#bodyCell{padding:20px;}
			#templateContainer{width:600px;}
			/**
			* @tab Page
			* @section background style
			* @theme page
			*/
			body, #bodyTable{
				/*@editable*/ background-color:#DEE0E2;
			}
			/**
			* @tab Page
			* @section background style
			* @theme page
			*/
			#bodyCell{
				/*@editable*/ border-top:4px solid #BBBBBB;
			}
			/**
			* @tab Page
			* @section email border
			* @tip Set the border for your email.
			*/
			#templateContainer{
				/*@editable*/ border:1px solid #BBBBBB;
			}
			/**
			* @tab Page
			* @section heading 1
			* @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
			* @style heading 1
			*/
			h1{
				/*@editable*/ color:#202020 !important;
				display:block;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:26px;
				/*@editable*/ font-style:normal;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				/*@editable*/ letter-spacing:normal;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Page
			* @section heading 2
			* @tip Set the styling for all second-level headings in your emails.
			* @style heading 2
			*/
			h2{
				/*@editable*/ color:#404040 !important;
				display:block;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:20px;
				/*@editable*/ font-style:normal;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				/*@editable*/ letter-spacing:normal;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Page
			* @section heading 3
			* @tip Set the styling for all third-level headings in your emails.
			* @style heading 3
			*/
			h3{
				/*@editable*/ color:#606060 !important;
				display:block;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:16px;
				/*@editable*/ font-style:italic;
				/*@editable*/ font-weight:normal;
				/*@editable*/ line-height:100%;
				/*@editable*/ letter-spacing:normal;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Page
			* @section heading 4
			* @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
			* @style heading 4
			*/
			h4{
				/*@editable*/ color:#808080 !important;
				display:block;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:14px;
				/*@editable*/ font-style:italic;
				/*@editable*/ font-weight:normal;
				/*@editable*/ line-height:100%;
				/*@editable*/ letter-spacing:normal;
				margin-top:0;
				margin-right:0;
				margin-bottom:10px;
				margin-left:0;
				/*@editable*/ text-align:left;
			}
			/* ========== Header Styles ========== */
			/**
			* @tab Header
			* @section preheader style
			* @theme header
			*/
			#templatePreheader{
				/*@editable*/ background-color:#F4F4F4;
				/*@editable*/ border-bottom:1px solid #CCCCCC;
			}
			/**
			* @tab Header
			* @section preheader text
			*/
			.preheaderContent{
				/*@editable*/ color:#808080;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:10px;
				/*@editable*/ line-height:125%;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Header
			* @section preheader link
			*/
			.preheaderContent a:link, .preheaderContent a:visited, /* Yahoo! Mail Override */ .preheaderContent a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:#606060;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			/**
			* @tab Header
			* @section header style
			* @theme header
			*/
			#templateHeader{
				/*@editable*/ background-color:#F4F4F4;
				/*@editable*/ border-top:1px solid #FFFFFF;
				/*@editable*/ border-bottom:1px solid #CCCCCC;
			}
			/**
			* @tab Header
			* @section header text
			*/
			.headerContent{
				/*@editable*/ color:#505050;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:20px;
				/*@editable*/ font-weight:bold;
				/*@editable*/ line-height:100%;
				/*@editable*/ padding-top:0;
				/*@editable*/ padding-right:0;
				/*@editable*/ padding-bottom:0;
				/*@editable*/ padding-left:0;
				/*@editable*/ text-align:left;
				/*@editable*/ vertical-align:middle;
			}
			/**
			* @tab Header
			* @section header link
			*/
			.headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:#EB4102;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			#headerImage{
				height:auto;
				max-width:600px;
			}
			/* ========== Column Styles ========== */
			.templateColumnContainer{width:260px;}
			/**
			* @tab Columns
			* @section column style
			*/
			#templateColumns{
				/*@editable*/ background-color:#F4F4F4;
				/*@editable*/ border-top:1px solid #FFFFFF;
				/*@editable*/ border-bottom:1px solid #CCCCCC;
			}
			/**
			* @tab Columns
			* @section left column text
			*/
			.leftColumnContent{
				/*@editable*/ color:#505050;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:14px;
				/*@editable*/ line-height:150%;
				padding-top:0;
				padding-right:20px;
				padding-bottom:20px;
				padding-left:20px;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Columns
			* @section left column link
			*/
			.leftColumnContent a:link, .leftColumnContent a:visited, /* Yahoo! Mail Override */ .leftColumnContent a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:green;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			/**
			* @tab Columns
			* @section right column text
			*/
			.rightColumnContent{
				/*@editable*/ color:#505050;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:14px;
				/*@editable*/ line-height:150%;
				padding-top:0;
				padding-right:20px;
				padding-bottom:20px;
				padding-left:20px;
				/*@editable*/ text-align:left;
			}
			/**
			* @tab Columns
			* @section right column link
			*/
			.rightColumnContent a:link, .rightColumnContent a:visited, /* Yahoo! Mail Override */ .rightColumnContent a .yshortcuts /* Yahoo! Mail Override */{
				/*@editable*/ color:green;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			.leftColumnContent img, .rightColumnContent img{
				display:inline;
				height:auto;
				max-width:260px;
			}
			/* ========== Footer Styles ========== */
			/**
			* @tab Footer
			* @section footer style
			* @theme footer
			*/
			#templateFooter{
				/*@editable*/ background-color:#F4F4F4;
				/*@editable*/ border-top:1px solid #FFFFFF;
			}
			/**
			* @tab Footer
			* @section footer text
			* @theme footer
			*/
			.footerContent{
				/*@editable*/ color:#808080;
				/*@editable*/ font-family:Helvetica;
				/*@editable*/ font-size:10px;
				/*@editable*/ line-height:150%;
				padding-top:20px;
				padding-right:20px;
				padding-bottom:20px;
				padding-left:20px;
				/*@editable*/ text-align:left;
			}
			.footerContent.fb {
				color: #0066cc;
			}
			/**
			* @tab Footer
			* @section footer link
			*/
			.footerContent a:link, .footerContent a:visited, /* Yahoo! Mail Override */ .footerContent a .yshortcuts, .footerContent a span /* Yahoo! Mail Override */{
				/*@editable*/ color:#606060;
				/*@editable*/ font-weight:normal;
				/*@editable*/ text-decoration:underline;
			}
			.footerContent.fb a:link{
				color: #0066cc;
			}
			/* /\/\/\/\/\/\/\/\/ MOBILE STYLES /\/\/\/\/\/\/\/\/ */
            @media only screen and (max-width: 480px){
				/* /\/\/\/\/\/\/ CLIENT-SPECIFIC MOBILE STYLES /\/\/\/\/\/\/ */
				body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} /* Prevent Webkit platforms from changing default text sizes */
                                body{width:100% !important; min-width:100% !important;} /* Prevent iOS Mail from adding padding to the body */
				/* /\/\/\/\/\/\/ MOBILE RESET STYLES /\/\/\/\/\/\/ */
				#bodyCell{padding:10px !important;}
				/* /\/\/\/\/\/\/ MOBILE TEMPLATE STYLES /\/\/\/\/\/\/ */
				/* ======== Page Styles ======== */
				/**
				* @tab Mobile Styles
				* @section template width
				*/
				#templateContainer{
					max-width:600px !important;
					/*@editable*/ width:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section heading 1
				* @tip Make the first-level headings larger in size for better readability on small screens.
				*/
				h1{
					/*@editable*/ font-size:24px !important;
					/*@editable*/ line-height:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section heading 2
				* @tip Make the second-level headings larger in size for better readability on small screens.
				*/
				h2{
					/*@editable*/ font-size:20px !important;
					/*@editable*/ line-height:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section heading 3
				* @tip Make the third-level headings larger in size for better readability on small screens.
				*/
				h3{
					/*@editable*/ font-size:18px !important;
					/*@editable*/ line-height:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section heading 4
				* @tip Make the fourth-level headings larger in size for better readability on small screens.
				*/
				h4{
					/*@editable*/ font-size:16px !important;
					/*@editable*/ line-height:100% !important;
				}
				/* ======== Header Styles ======== */
				#templatePreheader{display:none !important;} /* Hide the template preheader to save space */
				/**
				* @tab Mobile Styles
				* @section header image
				*/
				#headerImage{
					height:auto !important;
					/*@editable*/ max-width:600px !important;
					/*@editable*/ width:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section header text
				* @tip Make the header content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
				*/
				.headerContent{
					/*@editable*/ font-size:20px !important;
					/*@editable*/ line-height:125% !important;
				}
				/* ======== Column Styles ======== */
				.templateColumnContainer{display:block !important; width:100% !important;}
				/**
				* @tab Mobile Styles
				* @section column image
				*/
				.columnImage{
					height:auto !important;
					/*@editable*/ max-width:260px !important;
					/*@editable*/ width:100% !important;
				}
				/**
				* @tab Mobile Styles
				* @section left column text
				* @tip Make the left column content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
				*/
				.leftColumnContent{
					/*@editable*/ font-size:16px !important;
					/*@editable*/ line-height:125% !important;
				}
				/**
				* @tab Mobile Styles
				* @section right column text
				* @tip Make the right column content text larger in size for better readability on small screens. We recommend a font size of at least 16px.
				*/
				.rightColumnContent{
					/*@editable*/ font-size:16px !important;
					/*@editable*/ line-height:125% !important;
				}
				/* ======== Footer Styles ======== */
				/**
				* @tab Mobile Styles
				* @section footer text
				* @tip Make the body content text larger in size for better readability on small screens.
				*/
				.footerContent{
					/*@editable*/ font-size:14px !important;
					/*@editable*/ line-height:115% !important;
				}
				.footerContent a{display:block !important;} /* Place footer social and utility links on their own lines, for easier access */
			}
		</style>
                </head>
                <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
                    <center>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                            <tr>
                                    <td align="center" valign="top" id="bodyCell">
                                    <!-- BEGIN TEMPLATE // -->
                                    <table border="0" cellpadding="0" cellspacing="0" id="templateContainer">
                                        <tr><td>Bienvenido a Los Peluqueros.</td></tr>
                                        
                                        <tr>
                                            <td align="center" valign="top">
                                                    <!-- BEGIN PREHEADER // -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templatePreheader">
                                                    <tr>
                                                        <td valign="top" class="preheaderContent" style="padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:20px;" mc:edit="preheader_content00">
                                                            Bienvenido!!!
                                                        </td>
                                                        <!-- *|IFNOT:ARCHIVE_PAGE|* -->
                                                        <td valign="top" width="180" class="preheaderContent" style="padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:0;" mc:edit="preheader_content01">
                                                        </td>
                                                        <!-- *|END:IF|* -->
                                                    </tr>
                                                </table>
                                                <!-- // END PREHEADER -->
                                            </td>
                                        </tr>
                                            <tr>
                                            <td align="center" valign="top">
                                                    <!-- BEGIN HEADER // -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader">
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                            <img src="http://res.cloudinary.com/dy8xejglg/image/upload/v1506098399/barber3_cuht5r.jpg" style="max-width:600px;" id="headerImage" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                                                        </td>
                                                    </tr>
                                                </table>
                                                <!-- // END HEADER -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="80%" id="templateHeader">
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                           	Usuario: '.$usuario->usuario.'
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" class="headerContent">
                                                           	Clave: '.$usuario->contrasenna.'
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                         <tr>
                                            <td align="center" valign="top">
                                                    <!-- BEGIN FOOTER // -->
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter">
                                                    <tr>
                                                        <td valign="top" class="footerContent fb" mc:edit="footer_content00">
                                                            <a href="https://www.facebook.com/lospeluqueros">Síguenos en Facebook</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td valign="top" class="footerContent" style="padding-top:0;" mc:edit="footer_content01">
                                                            <em>Copyright &copy; 2017 kyr.com, All rights reserved.</em>
                                                            <br />
                                                            <br />
                                                            <strong>Contáctanos:</strong>
                                                            <br />
                                                            contacto@lospeluqueros.com
                                                        </td>
                                                    </tr>
                                                </table>
                                                <!-- // END FOOTER -->
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- // END TEMPLATE -->
                                </td>
                            </tr>
                        </table>
                    </center>
                </body>
            </html>';
        mail($to,$subject,$message,$headers);
        return $usuario;
    }

    
}
