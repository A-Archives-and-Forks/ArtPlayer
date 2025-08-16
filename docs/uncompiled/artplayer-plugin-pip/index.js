// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"55Mmu":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>artplayerPluginPip);
function artplayerPluginPip(userOptions = {}) {
    const options = {
        width: 480,
        height: 270,
        placeholder: `Playing in Document Picture-in-Picture`,
        ...userOptions
    };
    return (art)=>{
        if (!('documentPictureInPicture' in window)) {
            art.notice.show = 'Document Picture-in-Picture is not supported';
            return;
        }
        const { proxy, icons, i18n, template: { $container }, constructor: { utils: { append, tooltip } } } = art;
        const state = {
            win: null,
            originalParent: null,
            originalNext: null,
            currentDoc: null,
            placeholder: null
        };
        function copyStylesTo(targetDoc) {
            const baseStyle = `
            html, body { margin:0; padding:0; width:100%; height:100%; background:#000; overflow:hidden; }
            #__art_dpip_root { position:absolute; inset:0; display:flex; }
            #__art_dpip_root > * { width:100% !important; height:100% !important; }
        `;
            const $style = document.querySelector('#artplayer-style');
            const clone = targetDoc.createElement('style');
            clone.textContent = baseStyle + $style.textContent;
            targetDoc.head.appendChild(clone);
            const meta = targetDoc.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width,initial-scale=1';
            targetDoc.head.appendChild(meta);
        }
        async function open() {
            if (state.win) return;
            try {
                const pipWin = await window.documentPictureInPicture.requestWindow({
                    width: options.width,
                    height: options.height
                });
                state.win = pipWin;
                state.currentDoc = pipWin.document;
                state.placeholder = document.createElement('div');
                state.placeholder.className = 'artplayer-pip-placeholder';
                state.placeholder.style.cssText = `display:flex;justify-content:center;align-items:center;width:100%;height:100%;`;
                state.placeholder.textContent = options.placeholder;
                state.originalParent = $container.parentNode;
                state.originalNext = $container.nextSibling;
                state.originalParent.insertBefore(state.placeholder, state.originalNext);
                const root = pipWin.document.createElement('div');
                root.id = '__art_dpip_root';
                pipWin.document.body.appendChild(root);
                copyStylesTo(pipWin.document);
                const adopted = pipWin.document.adoptNode($container);
                root.appendChild(adopted);
                state.currentDoc = pipWin.document;
                const onResize = ()=>art.resize?.();
                const onPageHide = ()=>close();
                pipWin.addEventListener('resize', onResize);
                pipWin.addEventListener('pagehide', onPageHide);
                state.cleanup = ()=>{
                    pipWin.removeEventListener('resize', onResize);
                    pipWin.removeEventListener('pagehide', onPageHide);
                };
                art.emit('document-pip', true);
            } catch (err) {
                art.notice.show = 'Document Picture-in-Picture open failed';
                console.warn('[artplayer-plugin-pip] open failed:', err);
            }
        }
        function restoreToOriginalDocument() {
            if (!state.placeholder) return;
            const backDoc = state.placeholder.ownerDocument || document;
            const adoptedBack = backDoc.adoptNode($container);
            state.originalParent.insertBefore(adoptedBack, state.placeholder);
            state.placeholder.remove();
            state.placeholder = null;
            state.currentDoc = backDoc;
        }
        function close() {
            if (!state.win) return;
            try {
                state.cleanup?.();
                restoreToOriginalDocument();
                state.win.close();
                state.win = null;
                art.emit('document-pip', false);
            } catch (err) {
                art.notice.show = 'Document Picture-in-Picture close failed';
                console.warn('[artplayer-plugin-pip] close failed:', err);
            }
        }
        function toggle() {
            if (state.win) close();
            else open();
        }
        art.controls.add({
            name: 'document-pip',
            position: 'right',
            index: 40,
            tooltip: art.i18n.get('PIP Mode'),
            mounted: ($control)=>{
                append($control, icons.pip);
                proxy($control, 'click', toggle);
                art.on('document-pip', (value)=>{
                    tooltip($control, i18n.get(value ? 'Exit PIP Mode' : 'PIP Mode'));
                });
            }
        });
        art.on('destroy', close);
        return {
            name: 'artplayerPluginPip',
            open,
            close,
            toggle
        };
    };
}
if (typeof window !== 'undefined') window.artplayerPluginPip = artplayerPluginPip;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8oCsH"}],"8oCsH":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["55Mmu"], "55Mmu", "parcelRequire4dc0", {})

//# sourceMappingURL=index.js.map
