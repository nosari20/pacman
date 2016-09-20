(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/**
 * Created by ACH02 on 15/09/2016.
 */
var Ghost = (function () {
    function Ghost() {
    }
    Ghost.prototype.render = function () {
        console.log('Ghost rendered');
    };
    return Ghost;
}());
exports.Ghost = Ghost;

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Created by ACH02 on 15/09/2016.
 */
var Pacman = (function () {
    function Pacman() {
    }
    Pacman.prototype.render = function () {
        console.log('Ghost rendered');
    };
    return Pacman;
}());
exports.Pacman = Pacman;

},{}],3:[function(require,module,exports){
"use strict";
var Pacman_1 = require("./app/character/Pacman");
var Ghost_1 = require("./app/character/Ghost");
/**
 * Created by ACH02 on 15/09/2016.
 */
var pacman = new Pacman_1.Pacman();
var ghost1 = new Ghost_1.Ghost();
pacman.render();
ghost1.render();

},{"./app/character/Ghost":1,"./app/character/Pacman":2}]},{},[3]);
