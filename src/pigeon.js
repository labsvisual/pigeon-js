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

    };

    this.formElement = elements;

}
