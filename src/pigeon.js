/*
 *  Pigeon.js - A simple library for humanising the development of the contact form.
 *  Description: Pigeon.js provides you with a very simple and straightforward way of creating
 *               and validating contact forms without having to write even a line of JavaScript
 *               validation code.
 *
 *  Source Code released under the MIT License.
 *
 */

/**
 *
 *  Pigeon( String, String, String )
 *      - String (method)       ===== The HTTP verb to use while executing the request.
 *      - String (action)       ===== The HTTP host to connect to for the request.
 *      - String (formElement)  ===== The form to used for this particular instance.
 *
 */
function Pigeon( method, action, formElement ) {

    if ( method == null || method === "" ) {
        console.log( "The method field is invalid. For the object to instantiate successfully, the initializer requires a 'method' field." );
        return;
    }

    if ( action == null || action === "" ) {
        console.log( "The 'action' field is invalid. For the object to instantiate successfully, the initializer requires a 'action' field." );
        return;
    }

    if ( formElement == null || formElement === "" ) {
        console.log( "The 'formElement' field is invalid. For the object to instantiate successfully, the initializer requires a 'formElement' field." );
        return;
    }

    this.method = method;
    this.action = action;

    this.inputs = [];

    var elements = [];

    switch( formElement.substring( 0, 1 ) ) {

        case "#":
            elements = document.getElementById( formElement.replace( "#", "" ) );
            break;

        case ".":
            elements = document.getElementsByClassName( formElement.replace( ".", "" ) )[ 0 ];
            break;

        default:
            elements = document.getElementsByTagName( formElement )[ 0 ];

    }

    this.formElement = elements;
    this.initialize();

}

/**
 *  The .startsWith() function does not exist otherwise. A quick hack.
 *  https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
 *  https://github.com/mathiasbynens/String.prototype.startsWith/blob/master/startswith.js
 */

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

};

Pigeon.prototype.validate = function() {

    var errors = [];

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

                        // // if ( !isRequired ) { break; }

                        var attributeValue   = currentAttribute[ 1 ].trim();
                        if ( inputValue.length > parseInt( attributeValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" exceeds the provided length constraint." );
                        }

                        break;

                    case "min-len":

                        // if ( !isRequired ) { break; }

                        var attributeValue   = currentAttribute[ 1 ].trim();
                        if ( inputValue.length < parseInt( attributeValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" is less than the provided length constraint." );
                        }

                        break;

                    case "digits":

                        // if ( !isRequired ) { break; }

                        var regex = /^[0-9]*$/;
                        if ( !regex.test( inputValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" contains invalid characters." );
                        }

                        break;

                    case "digits-space":

                        // if ( !isRequired ) { break; }

                        var regex = /^[0-9 ]*$/;
                        if ( !regex.test( inputValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" contains invalid characters." );
                        }

                        break;

                    case "only-alphabets":

                        // if ( !isRequired ) { break; }

                        var regex = /^[a-zA-Z ]*$/;
                        if ( !regex.test( inputValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" contains invalid characters." );
                        }

                        break;

                    default:
                    case "required":

                        if ( inputValue == null || inputValue === "" ) {
                            errors.push( "\"" + currentElement.name + "\" is required." );
                        }

                        break;

                    case "email":

                        // if ( !isRequired ) { break; }

                        if ( !( (  inputValue.indexOf( '@' ) > -1 ) && ( inputValue.indexOf( '.' ) > -1 ) ) ) {
                            errors.push( "\"" + currentElement.name + "\" is not a valid email address." );
                        }

                        break;

                    case "url":

                        // if ( !isRequired ) { break; }

                        if ( !( ( inputValue.startsWith( "http://" ) || inputValue.startsWith( "https://" ) || inputValue.startsWith( "ftp://" ) ) && ( inputValue.indexOf( '.' ) > -1 ) ) ) {
                            errors.push( "\"" + currentElement.name + "\" is not a valid URL." );
                        }

                        break;

                    case "alphanumeric":

                        // if ( !isRequired ) { break; }

                        var regex = /^[a-zA-Z0-9 ]*$/;
                        if ( !regex.test( inputValue ) ) {
                            errors.push( "\"" + currentElement.name + "\" contains invalid characters." );
                        }

                        break;

                    case "phone":

                        // if ( !isRequired ) { break; }
                        var regex = /^[0-9]*$/;
                        if ( !regex.test( inputValue ) || inputValue.length > 10 ) {
                            errors.push( "\"" + currentElement.name + "\" is not a valid phone number." );
                        }

                        break;

                    case "credit-card":

                        // For starters, we can't have more than 16 digits. ALL NUMERIC, of course.
                        var regex = /^[0-9]*$/;
                        if ( !regex.test( inputValue ) || inputValue.length > 16 ) {
                            errors.push( "\"" + currentElement.name + "\" is not a valid credit card number." );
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

                        console.log(doubleDigits);

                        var sum = checkDigit;
                        for ( var k = 0; k < doubleDigits.length; k++ ) {

                            sum += doubleDigits[ k ];

                        }

                        if ( ! ( sum % 10 === 0 ) ) {

                            errors.push( "\"" + currentElement.name + "\" is not a valid credit card number." );

                        }

                        break;

                }

            }

        }

    }

    console.log( errors );

    return false;

}
