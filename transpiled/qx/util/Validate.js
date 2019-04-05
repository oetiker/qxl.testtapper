(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {},
      "qx.core.ValidationError": {},
      "qx.util.ColorUtil": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);qx.Class.define("qx.util.Validate", {
    statics: {
      /**
       * Returns the function that checks for a number.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkNumber} Function.
       */
      number: function number(errorMessage) {
        return function (value) {
          qx.util.Validate.checkNumber(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is a number.
       * If not, an ValidationError will be thrown.
       * If you want to use the number check in a property definition,
       * use the {@link #number} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?undefined} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not a
       *    finite number
       */
      checkNumber: function checkNumber(value, formItem, errorMessage) {
        errorMessage = errorMessage || qx.locale.Manager.tr("%1 is not a number.", value);

        if (typeof value !== "number" && !(value instanceof Number) || !isFinite(value)) {
          throw new qx.core.ValidationError("Validation Error", errorMessage);
        }
      },

      /**
       * Returns the function that checks for an email address.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkEmail} Function.
       */
      email: function email(errorMessage) {
        return function (value) {
          qx.util.Validate.checkEmail(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is an email address.
       * If not, an ValidationError will be thrown.
       * If you want to use the email check in a property definition,
       * use the {@link #email} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?null} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not
       *    a valid email address.
       */
      checkEmail: function checkEmail(value, formItem, errorMessage) {
        errorMessage = errorMessage || qx.locale.Manager.tr("'%1' is not an email address.", value || "");

        var reg = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
        if (reg.test(value) === false) {
          throw new qx.core.ValidationError("Validation Error", errorMessage);
        }
      },

      /**
       * Returns the function that checks for a string.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkString} Function.
       */
      string: function string(errorMessage) {
        return function (value) {
          qx.util.Validate.checkString(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is a string.
       * If not, an ValidationError will be thrown.
       * If you want to use the string check in a property definition,
       * use the {@link #string} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?null} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not a string.
       */
      checkString: function checkString(value, formItem, errorMessage) {
        errorMessage = errorMessage || qx.locale.Manager.tr("%1 is not a string.", value);

        if (typeof value !== "string" && !(value instanceof String)) {
          throw new qx.core.ValidationError("Validation Error", errorMessage);
        }
      },

      /**
       * Returns the function that checks for an url.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkUrl} Function.
       */
      url: function url(errorMessage) {
        return function (value) {
          qx.util.Validate.checkUrl(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is an url.
       * If not, an ValidationError will be thrown.
       * If you want to use the url check in a property definition,
       * use the {@link #url} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?null} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not an url.
       */
      checkUrl: function checkUrl(value, formItem, errorMessage) {
        errorMessage = errorMessage || qx.locale.Manager.tr("%1 is not an url.", value);

        var reg = /([A-Za-z0-9])+:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (!reg.test(value)) {
          throw new qx.core.ValidationError("Validation Error", errorMessage);
        }
      },

      /**
       * Returns the function that checks for a color.
       *
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} The {@link #checkColor} Function.
       */
      color: function color(errorMessage) {
        return function (value) {
          qx.util.Validate.checkColor(value, null, errorMessage);
        };
      },

      /**
       * The function checks the incoming value to see if it is a color.
       * If not, an ValidationError will be thrown. The check itself will be
       * delegated to the {@link qx.util.ColorUtil#stringToRgb} method.
       * If you want to use the color check in a property definition,
       * use the {@link #color} method.
       *
       * @param value {var} The value to check.
       * @param formItem {qx.ui.form.IForm} The form item to check if used in a
       *   {@link qx.ui.form.Form}.
       * @param errorMessage {String?null} Custom error message.
       * @throws {qx.core.ValidationError} If the value parameter is not a color.
       */
      checkColor: function checkColor(value, formItem, errorMessage) {
        try {
          qx.util.ColorUtil.stringToRgb(value);
        } catch (e) {
          var message = errorMessage || qx.locale.Manager.tr("%1 is not a color! %2", value, e);
          throw new qx.core.ValidationError("Validation Error", message);
        }
      },

      /**
       * Returns a function that checks if the number is in the given range.
       * The range includes the border values.
       * A range from 1 to 2 accepts the values 1 equally as everything up to 2
       * including the 2.
       * If the value given to the returned function is out of the range, a
       * ValidationError will be thrown.
       *
       * @param from {Number} The lower border of the range.
       * @param to {Number} The upper border of the range.
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} A function taking one parameter (value).
       */
      range: function range(from, to, errorMessage) {
        return function (value) {
          var message = errorMessage || qx.locale.Manager.tr("%1 is not in the range from [%2, %3].", value, from, to);

          if (value < from || value > to) {
            throw new qx.core.ValidationError("Validation Error", message);
          }
        };
      },

      /**
       * Returns a function that checks if the given value is in the array.
       * If the value given to the returned function is not in the array, a
       * ValidationError will be thrown.
       *
       * @param array {Array} The array holding the possibilities.
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} A function taking one parameter (value).
       */
      inArray: function inArray(array, errorMessage) {
        return function (value) {
          var message = errorMessage || qx.locale.Manager.tr("%1 is not in %2", value, array);

          if (array.indexOf(value) === -1) {
            throw new qx.core.ValidationError("Validation Error", message);
          }
        };
      },

      /**
       * Returns a function that checks if the given value fits the RegExp.
       * For testing, the function uses the RegExp.test function.
       * If the value given to the returned function does not fit the RegExp, a
       * ValidationError will be thrown.
       * incoming
       * @param reg {RegExp} The RegExp for the check.
       * @param errorMessage {String?null} Custom error message.
       * @return {Function} A function taking one parameter (value).
       */
      regExp: function regExp(reg, errorMessage) {
        return function (value) {
          var message = errorMessage || qx.locale.Manager.tr("%1 does not fit %2.", value, reg);

          if (!reg.test(value)) {
            throw new qx.core.ValidationError("Validation Error", message);
          }
        };
      }
    }
  });
  qx.util.Validate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Validate.js.map?dt=1554457201350