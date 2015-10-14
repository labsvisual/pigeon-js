function Pigeon( config, async ) {
    if ( config == null ) {
        console.log( "The configuration object is null. For the object to instantiate successfully, the initializer requires a configiration object." );
        return;
    }
    if ( config.method == null || config.method === "" ) {
        console.log( "The 'method' field is invalid. For the object to instantiate successfully, the initializer requires a 'method' field." );
        return;
    }
    if ( config.action == null || config.action === "" ) {
        console.log( "The 'action' field is invalid. For the object to instantiate successfully, the initializer requires a 'action' field." );
        return;
    }
    if ( config.prompt == null ) {
        console.log( "The 'prompt' field is invalid. For the object to instantiate successfully, the initializer requires a 'prompt' field." );
        return;
    }
    if ( config.formElement == null || config.formElement === "" ) {
        console.log( "The 'formElement' field is invalid. For the object to instantiate successfully, the initializer requires a 'formElement' field." );
        return;
    }
    var errorHandler = function( inputs ) {
        alert("Oops! There were errors in submitting the form.");
    }
    var successHandler = function( inputs ) {
        alert("Woohoo! :D Done.");
    }
    this.method = config.method || "POST";
    this.action = config.action || "/contact";
    this.async  = async || true;
    this.errorClass = config.errorClass || "error";
    this.prompt = config.prompt;
    this.errorHandler = config.errorHandler || errorHandler;
    this.successHandler = config.successHandler || successHandler;
    this.inputs = [];
    var elements = [];
    switch( config.formElement.substring( 0, 1 ) ) {
        case "#":
            elements = document.getElementById( config.formElement.replace( "#", "" ) );
            break;
        case ".":
            elements = document.getElementsByClassName( config.formElement.replace( ".", "" ) )[ 0 ];
            break;
        default:
            elements = document.getElementsByTagName( config.formElement )[ 0 ];
    }
    this.formElement   = elements;
    this.initialize();
}
 if (!String.prototype.startsWith) {
 	(function() {
 		'use strict';
 		var defineProperty = (function() {
 			try {
 				var object = {};
 				var $defineProperty = Object.defineProperty;
 				var result = $defineProperty(object, object, object) && $defineProperty;
 			} catch(error) {}
 			return result;
 		}());
 		var toString = {}.toString;
 		var startsWith = function(search) {
 			if (this == null) {
 				throw TypeError();
 			}
 			var string = String(this);
 			if (search && toString.call(search) == '[object RegExp]') {
 				throw TypeError();
 			}
 			var stringLength = string.length;
 			var searchString = String(search);
 			var searchLength = searchString.length;
 			var position = arguments.length > 1 ? arguments[1] : undefined;
 			var pos = position ? Number(position) : 0;
 			if (pos != pos) {
 				pos = 0;
 			}
 			var start = Math.min(Math.max(pos, 0), stringLength);
 			if (searchLength + start > stringLength) {
 				return false;
 			}
 			var index = -1;
 			while (++index < searchLength) {
 				if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
 					return false;
 				}
 			}
 			return true;
 		};
 		if (defineProperty) {
 			defineProperty(String.prototype, 'startsWith', {
 				'value': startsWith,
 				'configurable': true,
 				'writable': true
 			});
 		} else {
 			String.prototype.startsWith = startsWith;
 		}
 	}());
 }
Pigeon.prototype.initialize = function() {
    for ( var i = 0; i < this.formElement.elements.length; i++ ) {
        this.inputs.push( this.formElement.elements[ i ] );
    }
    this.attachHandler();
}
Pigeon.prototype.attachHandler = function() {
    var self = this;
    for ( var i = 0; i < this.inputs.length; i++ ) {
        var currentInput = this.inputs[ i ];
        if ( currentInput.getAttribute( 'type' ).toLowerCase() === "submit" ) {
            currentInput.setAttribute( 'onclick', 'return false;' );
            currentInput.addEventListener('click', function() {
                self.submit();
            });
        }
    }
}
Pigeon.prototype.validate = function() {
    var self = this;
    for( var i = 0; i < this.inputs.length; i++ ) {
        if( this.inputs[ i ].getAttribute( 'class' ) && ( this.inputs[ i ].getAttribute( 'class' ).indexOf( self.errorClass ) > -1 ) ) {
            this.inputs[ i ].classList.remove( self.errorClass );
        }
    }
    var errors        = [],
        errorElements = [];
    for( var i = 0; i < this.inputs.length; i++ ) {
        var currentElement   = this.inputs[ i ];
        var validationString = currentElement.getAttribute( 'data-pigeon-validate' );
        var isRequired       =  ( validationString ) && ( validationString.toLowerCase().indexOf( 'required' ) > -1 );
        if ( validationString ) {
            var validationAttributes = validationString.split( ';' );
            for ( var j = 0; j < validationAttributes.length; j++ ) {
                var currentAttribute = validationAttributes[ j ].split(":"),
                    attributeName    = currentAttribute[ 0 ].toLowerCase().trim(),
                    inputValue       = currentElement.value;
                switch ( attributeName ) {
                    case "max-len":
                        var attributeValue   = currentAttribute[ 1 ].trim();
                        if ( inputValue.length > parseInt( attributeValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" exceeds the provided length constraint." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    case "min-len":
                        var attributeValue   = currentAttribute[ 1 ].trim();
                        if ( inputValue.length < parseInt( attributeValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" is less than the provided length constraint." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    case "digits":
                        var regex = /^[0-9]*$/;
                        if ( !regex.test( inputValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" contains invalid characters." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    case "digits-space":
                        var regex = /^[0-9 ]*$/;
                        if ( !regex.test( inputValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" contains invalid characters." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    case "only-alphabets":
                        var regex = /^[a-zA-Z ]*$/;
                        if ( !regex.test( inputValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" contains invalid characters." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    default:
                    case "required":
                        if ( inputValue == null || inputValue === "" ) {
                            errors.push( "\"" + currentElement.name + "\" is required." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    case "email":
                        if ( !( (  inputValue.indexOf( '@' ) > -1 ) && ( inputValue.indexOf( '.' ) > -1 ) ) ) {
                            errors.push( "\"" + currentElement.name + "\" is not a valid email address." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    case "url":
                        if ( !( ( inputValue.startsWith( "http://" ) || inputValue.startsWith( "https://" ) || inputValue.startsWith( "ftp://" ) ) && ( inputValue.indexOf( '.' ) > -1 ) ) ) {
                            errors.push( "\"" + currentElement.name + "\" is not a valid URL." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    case "alphanumeric":
                        var regex = /^[a-zA-Z0-9 ]*$/;
                        if ( !regex.test( inputValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" contains invalid characters." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    case "phone":
                        var maxLen = ( inputValue.startsWith( "+" ) && ( inputValue.length == 13 ) ) ? 13 : 10;
                        var regex = /^[0-9]*$/;
                        if ( !regex.test( inputValue ) || inputValue.length > maxLen ) {
                            errors.push( "\"" + currentElement.name + "\" is not a valid phone number." );
                            errorElements.push ( currentElement );
                        }
                        break;
                    case "credit-card":
                        var regex = /^[0-9]*$/;
                        if ( !regex.test( inputValue ) || inputValue.length > 16 ) {
                            errors.push( "\"" + currentElement.name + "\" is not a valid credit card number." );
                            errorElements.push ( currentElement );
                            break;
                        }
                         var checkDigit = parseInt( inputValue.substring( inputValue.length - 1 ) ),
                             inputTest  = inputValue.substring( 0, inputValue.length - 1 );
                        var doubleDigits = [];
                        for ( var k = inputTest.length - 1; k >= 0; k = k - 2 ) {
                            doubleDigits.push( parseInt( inputTest[ k ] ) * 2 );
                        }
                        for ( var k = 0; k < doubleDigits.length; k++ ) {
                            var currentDigit = doubleDigits[ k ];
                            if ( currentDigit.toString().length >= 2 ) {
                                var temp = currentDigit,
                                    sum  = 0;
                                while ( temp != 0 ) {
                                    var a = temp % 10;
                                    temp -= a;
                                    temp /= 10;
                                    sum += a;
                                }
                                doubleDigits[ k ] = sum;
                            }
                        }
                        for ( var k = inputTest.length - 2; k >= 0; k = k - 2 ) {
                            doubleDigits.push( parseInt( inputTest[ k ] ) );
                        }
                        var sum = checkDigit;
                        for ( var k = 0; k < doubleDigits.length; k++ ) {
                            sum += doubleDigits[ k ];
                        }
                        if ( ! ( sum % 10 === 0 ) ) {
                            errors.push( "\"" + currentElement.name + "\" is not a valid credit card number." );
                            errorElements.push ( currentElement );
                        }
                        break;
                }
            }
        }
    }
    return {
        isValid: ( errors.length == 0 && errorElements.length == 0 ),
        errors: errors,
        errorElements: errorElements
    };
}
Pigeon.prototype.formatParams = function() {
    var responses = "";
    for ( var i = 0; i < this.inputs.length; i++ ) {
        var currentInput = this.inputs[ i ];
        if ( currentInput.getAttribute( 'type' ).toLowerCase() === "submit" ) continue;
        responses += encodeURIComponent( currentInput.name ) + "=" + encodeURIComponent( currentInput.value ) + "&";
    }
    return responses.substring( 0, responses.length - 1 );
}
Pigeon.prototype.loadingFinishedHandler = function( xhr, inputs ) {
    var evald = eval( "(" + xhr.responseText + ")" );
    switch( evald.status_code ) {
        default:
        case 200:
            this.successHandler();
            break;
        case 400:
        case 500:
            this.errorHandler( inputs );
            break;
    }
}
Pigeon.prototype.submit = function() {
    var self = this;
    var result = this.validate();
    if ( !result.isValid ) {
        for( var i = 0; i < result.errors.length; i++ ) {
            var currentError   = result.errors[ i ],
                currentElement = result.errorElements[ i ];
            this.prompt( currentElement, currentError );
        }
        return;
    }
    var params = self.formatParams();
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( this.method, this.action, self.async );
    xmlHttp.request = "text/json";
    xmlHttp.onreadystatechange = function() {
        if ( xmlHttp.readyState == 4 ) {
            self.loadingFinishedHandler( xmlHttp, self.inputs );
        }
    }
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.send( params );
}
