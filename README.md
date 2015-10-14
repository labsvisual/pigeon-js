# Pigeon.js
#### Making the contact forms a little less daunting.
---

## Introduction
Pigeon.js is a very simple but a very powerful library which takes care of the most pissing off part of any website: the contact form. I have made it to be as simple and easy to use as possible; still, it's powerful as hell.

## Installation
### Using Bower
```
bower install --save Pigeon.js
```

Then, importing the library like:
```html
<script src="bower_components/Pigeon.js/dist/pigeon.js"></script>
```

### Using the CDN
```
I will update this as soon as I get a go.
```

## Usage
Consider the following file:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Test File</title>

        <style>
            input{
                outline: 0;
            }
            input.error {
                border: 1px solid red;
            }
        </style>
    </head>
    <body>
        <p>Hello World</p>
        <p id="messages"></p>
        <form id="testForm" class="testForm">

            <input type="text" data-pigeon-validate="max-len:10; min-len:2; only-alphabets" name="Name" placeholder="Name" value="Hello"/>
            <input type="text" data-pigeon-validate="email" name="email" placeholder="Email" value="334@doonschool.com"/>
            <input type="text" data-pigeon-validate="phone" name="Phone" placeholder="Phone" value="8979998098"/>
            <input type="text" data-pigeon-validate="required; alphanumeric" name="Alphanumeric" placeholder="alphanumeric" value="Hello123"/>
            <input type="text" data-pigeon-validate="url" name="URL" placeholder="URL" value="https://google.com"/>
            <input type="text" data-pigeon-validate="credit-card" name="credit-card" placeholder="Credit Card" value="4012888888881881"/>
            <input type="submit" name="asd" />

        </form>

        <script src="../src/pigeon.js"></script>
        <script>

            var a = new Pigeon({
                method: "POST",
                action: "http://backend.address:9999",
                formElement: "#testForm",
                errorClass: "error",
                prompt: function( element, message ) {
                    element.className = "error";
                }
            });

        </script>
    </body>
</html>

```

You see how Pigeon is initialized:
```
... new Pigeon({config});
```

The following configuration options are available:
```html
 *  Pigeon( String, String, String, Function, Function, Function, Boolean )
 *      - Object (config)                   ===== Contains the base configuration for the instance.
 *
 *          - String (method)               ===== The HTTP verb to use while executing the request.
 *          - String (action)               ===== The HTTP host to connect to for the request.
 *          - String (formElement)          ===== The form to used for this particular instance.
 *          - String (errorClass)           ===== The class added when there is an error.
 *          - Function (prompt)             ===== The function used to prompt the user of the error.
 *          - Function (successHandler)     ===== The function used to tell the people when the form has been submitted successfully.
 *          - Function (errorHandler)       ===== The function used to tell the people when the form has been submitted but with errors.
 *
 *      - Boolean (async)                   ===== Sets if the AJAX request should be async.
```

And that's it. For the frontend, at least.

## Backend
It sends the data to the backend with the specified verb and the name of each field is the name of the input. So, in the example above, `<input type="text" data-pigeon-validate="email" name="email" placeholder="Email" value="334@doonschool.com"/>` , Pigeon will send `email=value` since email is the `name` of the field.

After that you can process the data, but make sure that the backend returns a JSON object with the `status_code` field set to either:
  - 200 for success
  - 400 for general errors
  - 500 for backend errors.

That's it. :)

## Other Works
Yeah, this is pretty incomplete, I am working on some EXCITING new features. Make sure to "star" this repository to get 'em.
