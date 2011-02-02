/* @license
==========================================================================
SproutCore Costello -- Property Observing Library
Copyright ©2006-2010, Sprout Systems, Inc. and contributors.
Portions copyright ©2008-2010 Apple Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

For more information about SproutCore, visit http://www.sproutcore.com

==========================================================================
@license */
var require=require||function require(){};
var sc_require=sc_require||require;var sc_resource=sc_resource||function sc_resource(){};
sc_require("license");var YES=true;var NO=false;if(typeof console==="undefined"){window.console={};
console.log=console.info=console.warn=console.error=function(){}}var SC=SC||{};var SproutCore=SproutCore||SC;
SC._baseMixin=function(c){var f=Array.prototype.slice.call(arguments,1),a,e=f[0]||{},g=1,d=f.length,k,b,h;
if(d===1){e=this||{};g=0}for(;g<d;g++){if(!(k=f[g])){continue}for(h in k){if(!k.hasOwnProperty(h)){continue
}b=k[h];if(e===b){continue}if(b!==undefined&&(c||(e[h]===undefined))){e[h]=b}}}return e
};SC.mixin=function(){var a=Array.prototype.slice.call(arguments);a.unshift(true);
return SC._baseMixin.apply(this,a)};SC.supplement=function(){var a=Array.prototype.slice.call(arguments);
a.unshift(false);return SC._baseMixin.apply(this,a)};SC.extend=SC.mixin;SC.mixin({T_ERROR:"error",T_OBJECT:"object",T_NULL:"null",T_CLASS:"class",T_HASH:"hash",T_FUNCTION:"function",T_UNDEFINED:"undefined",T_NUMBER:"number",T_BOOL:"boolean",T_ARRAY:"array",T_STRING:"string",typeOf:function(b){if(b===undefined){return SC.T_UNDEFINED
}if(b===null){return SC.T_NULL}var a=typeof(b);if(a=="object"){if(b instanceof Array){a=SC.T_ARRAY
}else{if(b instanceof Function){a=b.isClass?SC.T_CLASS:SC.T_FUNCTION}else{if(SC.Error&&(b instanceof SC.Error)){a=SC.T_ERROR
}else{if(b instanceof SC.Object){a=SC.T_OBJECT}else{a=SC.T_HASH}}}}}else{if(a===SC.T_FUNCTION){a=(b.isClass)?SC.T_CLASS:SC.T_FUNCTION
}}return a},none:function(a){return a===null||a===undefined},empty:function(a){return a===null||a===undefined||a===""
},isArray:function(c){if(c&&c.objectAt){return YES}var a=(c?c.length:null),b=typeof c;
return !((a===undefined)||(a===null)||(c instanceof Function)||(b==="string")||c.setInterval)
},makeArray:function(a){return SC.isArray(a)?a:SC.A(a)},A:function(c){if(c===null||c===undefined){return[]
}if(c.slice instanceof Function){if(typeof(c)==="string"){return[c]}else{return c.slice()
}}if(c.toArray){return c.toArray()}if(!SC.isArray(c)){return[c]}var b=[],a=c.length;
while(--a>=0){b[a]=c[a]}return b},guidKey:"_sc_guid_"+new Date().getTime(),_nextGUID:0,_numberGuids:[],_stringGuids:{},_keyCache:{},guidFor:function(d){if(d===undefined){return"(undefined)"
}if(d===null){return"(null)"}var a=this.guidKey;if(d[a]){return d[a]}if(d===Object){return"(Object)"
}if(d===Array){return"(Array)"}var b,c;switch(typeof d){case SC.T_NUMBER:b=this._numberGuids;
c=b[d];if(!c){c="nu"+d;b[d]=c}return c;case SC.T_STRING:b=this._stringGuids;c=b[d];
if(!c){c="st"+d;b[d]=c}return c;case SC.T_BOOL:return(d)?"(true)":"(false)";default:return SC.generateGuid(d)
}},keyFor:function(d,c){var b,a=this._keyCache[d];if(!a){a=this._keyCache[d]={}}b=a[c];
if(!b){b=a[c]=d+"_"+c}return b},generateGuid:function(b){var a=("sc"+(this._nextGUID++));
if(b){b[this.guidKey]=a}return a},hashFor:function(){var a=arguments.length,c="",e,d,b;
for(b=0;b<a;++b){e=arguments[b];c+=(e&&(d=e.hash)&&(typeof d===SC.T_FUNCTION))?d.call(e):this.guidFor(e)
}return c===""?null:c},isEqual:function(d,c){if(d===null){return c===null}else{if(d===undefined){return c===undefined
}else{return this.hashFor(d)===this.hashFor(c)}}},compare:function(y,u){if(y===u){return 0
}var k=SC.typeOf(y);var g=SC.typeOf(u);var b=SC.ORDER_DEFINITION_MAPPING;if(!b){var d=SC.ORDER_DEFINITION;
b=SC.ORDER_DEFINITION_MAPPING={};var x,q;for(x=0,q=d.length;x<q;++x){b[d[x]]=x}delete SC.ORDER_DEFINITION
}var z=b[k];var c=b[g];if(z<c){return -1}if(z>c){return 1}switch(k){case SC.T_BOOL:case SC.T_NUMBER:if(y<u){return -1
}if(y>u){return 1}return 0;case SC.T_STRING:var m=y.localeCompare(u);if(m<0){return -1
}if(m>0){return 1}return 0;case SC.T_ARRAY:var s=y.length;var n=u.length;var e=Math.min(s,n);
var a=0;var h=0;var f=arguments.callee;while(a===0&&h<e){a=f(y[h],u[h]);h++}if(a!==0){return a
}if(s<n){return -1}if(s>n){return 1}return 0;case SC.T_OBJECT:if(y.constructor.isComparable===YES){return y.constructor.compare(y,u)
}return 0;default:return 0}},K:function(){return this},EMPTY_ARRAY:[],EMPTY_HASH:{},EMPTY_RANGE:{start:0,length:0},beget:function(c){if(c===null||c===undefined){return null
}var a=SC.K;a.prototype=c;var b=new a();a.prototype=null;if(typeof c.didBeget==="function"){b=c.didBeget(b)
}return b},copy:function(d,b){var c=d,a;if(d){if(d.isCopyable){return d.copy(b)}if(d.clone&&SC.typeOf(d.clone)===SC.T_FUNCTION){return d.clone()
}}switch(SC.typeOf(d)){case SC.T_ARRAY:c=d.slice();if(b){a=c.length;while(a--){c[a]=SC.copy(c[a],true)
}}break;case SC.T_HASH:case SC.T_OBJECT:c={};for(var e in d){c[e]=b?SC.copy(d[e],true):d[e]
}break}return c},merge:function(){var c={},b=arguments.length,a;for(a=0;a<b;a++){SC.mixin(c,arguments[a])
}return c},keys:function(c){var a=[];for(var b in c){a.push(b)}return a},inspect:function(d){var a,b=[];
for(var c in d){a=d[c];if(a==="toString"){continue}if(SC.typeOf(a)===SC.T_FUNCTION){a="function() { ... }"
}b.push(c+": "+a)}return"{"+b.join(" , ")+"}"},tupleForPropertyPath:function(e,a){if(typeof e==="object"&&(e instanceof Array)){return e
}var c;var b=e.indexOf("*");if(b<0){b=e.lastIndexOf(".")}c=(b>=0)?e.slice(b+1):e;
var d=this.objectForPropertyPath(e,a,b);return(d&&c)?[d,c]:null},objectForPropertyPath:function(f,c,d){var g,b,e,a;
if(!c){c=window}if(SC.typeOf(f)===SC.T_STRING){if(d===undefined){d=f.length}g=0;while((c)&&(g<d)){b=f.indexOf(".",g);
if((b<0)||(b>d)){b=d}e=f.slice(g,b);c=c.get?c.get(e):c[e];g=b+1}if(g<d){c=undefined
}}else{g=0;a=f.length;e=null;while((g<a)&&c){e=f[g++];if(e){c=(c.get)?c.get(e):c[e]
}}if(g<a){c=undefined}}return c},STRINGS:{},stringsFor:function(b,a){SC.mixin(SC.STRINGS,a);
return this}});SC.clone=SC.copy;SC.$A=SC.A;SC.didLoad=SC.K;SC.ORDER_DEFINITION=[SC.T_ERROR,SC.T_UNDEFINED,SC.T_NULL,SC.T_BOOL,SC.T_NUMBER,SC.T_STRING,SC.T_ARRAY,SC.T_HASH,SC.T_OBJECT,SC.T_FUNCTION,SC.T_CLASS];
SC.mixin(Function.prototype,{property:function(){this.dependentKeys=SC.$A(arguments);
var a=SC.guidFor(this);this.cacheKey="__cache__"+a;this.lastSetValueKey="__lastValue__"+a;
this.isProperty=YES;return this},cacheable:function(a){this.isProperty=YES;if(!this.dependentKeys){this.dependentKeys=[]
}this.isCacheable=(a===undefined)?YES:a;return this},idempotent:function(a){this.isProperty=YES;
if(!this.dependentKeys){this.dependentKeys=[]}this.isVolatile=(a===undefined)?YES:a;
return this},observes:function(a){var e=arguments.length,b=null,d=null;while(--e>=0){var c=arguments[e];
if((c.indexOf(".")<0)&&(c.indexOf("*")<0)){if(!b){b=this.localPropertyPaths=[]}b.push(c)
}else{if(!d){d=this.propertyPaths=[]}d.push(c)}}return this}});String.prototype.fmt=function(){var b=arguments,a=0;
return this.replace(/%@([0-9]+)?/g,function(c,d){d=(d)?parseInt(d,0)-1:a++;c=b[d];
return((c===null)?"(null)":(c===undefined)?"":c).toString()})};String.prototype.loc=function(){var a=SC.STRINGS[this]||this;
return a.fmt.apply(a,arguments)};String.prototype.w=function(){var c=[],d=this.split(" "),b=d.length,e,a=0;
for(a=0;a<b;++a){e=d[a];if(e.length!==0){c.push(e)}}return c};if(!Date.now){Date.now=function(){return new Date().getTime()
}}SC.ObserverSet={targets:0,_membersCacheIsValid:NO,add:function(d,e,b){var c=(d)?SC.guidFor(d):"__this__";
var a=this[c];if(!a){a=this[c]=SC.CoreSet.create();a.target=d;a.isTargetSet=YES;this.targets++
}a.add(e);if(b!==undefined){if(!a.contexts){a.contexts={}}a.contexts[SC.guidFor(e)]=b
}this._membersCacheIsValid=NO},remove:function(c,d){var b=(c)?SC.guidFor(c):"__this__";
var a=this[b];if(!a){return NO}a.remove(d);if(a.length<=0){a.target=null;a.isTargetSet=NO;
a.contexts=null;delete this[b];this.targets--}else{if(a.contexts){delete a.contexts[SC.guidFor(d)]
}}this._membersCacheIsValid=NO;return YES},invokeMethods:function(){var b,c,a,d,e;
for(b in this){if(!this.hasOwnProperty(b)){continue}c=this[b];if(c&&c.isTargetSet){a=c.length;
d=c.target;while(--a>=0){e=c[a];if(e){e.call(d)}}}}},getMembers:function(){if(this._membersCacheIsValid){return this._members
}if(!this._members){this._members=[]}else{this._members.length=0}var b=this._members;
for(var c in this){if(!this.hasOwnProperty(c)){continue}var d=this[c];if(d&&d.isTargetSet){var a=d.length;
var e=d.target;var g=d.contexts;if(g){while(--a>=0){var f=d[a];b.push([e,f,g[SC.guidFor(f)]])
}}else{while(--a>=0){b.push([e,d[a]])}}}}this._membersCacheIsValid=YES;return b},clone:function(){var b,d,c,a=SC.ObserverSet.create();
for(c in this){if(!this.hasOwnProperty(c)){continue}b=this[c];if(b&&b.isTargetSet){d=b.clone();
d.target=b.target;if(b.contexts){d.contexts=SC.clone(b.contexts)}a[c]=d}}a.targets=this.targets;
a._membersCacheIsValid=NO;return a},create:function(){return SC.beget(this)}};SC.ObserverSet.slice=SC.ObserverSet.clone;
require("private/observer_set");SC.LOG_OBSERVERS=NO;SC.Observable={isObservable:YES,automaticallyNotifiesObserversFor:function(a){return YES
},get:function(c){var b=this[c],a;if(b===undefined){return this.unknownProperty(c)
}else{if(b&&b.isProperty){if(b.isCacheable){a=this._kvo_cache;if(!a){a=this._kvo_cache={}
}return(a[b.cacheKey]!==undefined)?a[b.cacheKey]:(a[b.cacheKey]=b.call(this,c))}else{return b.call(this,c)
}}else{return b}}},set:function(h,f){var b=this[h],k=this.automaticallyNotifiesObserversFor(h),e=f,c,a,g,d;
if(!k&&this._kvo_cacheable&&(a=this._kvo_cache)){c=this._kvo_cachedep;if(!c||(c=c[h])===undefined){c=this._kvo_computeCachedDependentsFor(h)
}if(c){g=c.length;while(--g>=0){d=c[g];a[d.cacheKey]=a[d.lastSetValueKey]=undefined
}}}if(b&&b.isProperty){a=this._kvo_cache;if(b.isVolatile||!a||(a[b.lastSetValueKey]!==f)){if(!a){a=this._kvo_cache={}
}a[b.lastSetValueKey]=f;if(k){this.propertyWillChange(h)}e=b.call(this,h,f);if(b.isCacheable){a[b.cacheKey]=e
}if(k){this.propertyDidChange(h,e,YES)}}}else{if(b===undefined){if(k){this.propertyWillChange(h)
}this.unknownProperty(h,f);if(k){this.propertyDidChange(h,e)}}else{if(this[h]!==f){if(k){this.propertyWillChange(h)
}e=this[h]=f;if(k){this.propertyDidChange(h,e)}}}}return this},unknownProperty:function(a,b){if(!(b===undefined)){this[a]=b
}return b},beginPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;
return this},endPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
var b=this._kvo_changeLevel,a=this._kvo_changes;if((b<=0)&&a&&(a.length>0)&&!SC.Observers.isObservingSuspended){this._notifyPropertyObservers()
}return this},propertyWillChange:function(a){return this},propertyDidChange:function(n,l,c){this._kvo_revision=(this._kvo_revision||0)+1;
var b=this._kvo_changeLevel||0,g,m,h,a,d,f=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO);
if(a=this._kvo_cache){if(!c){d=this[n];if(d&&d.isProperty){a[d.cacheKey]=a[d.lastSetValueKey]=undefined
}}if(this._kvo_cacheable){g=this._kvo_cachedep;if(!g||(g=g[n])===undefined){g=this._kvo_computeCachedDependentsFor(n)
}if(g){m=g.length;while(--m>=0){h=g[m];a[h.cacheKey]=a[h.lastSetValueKey]=undefined
}}}}var e=SC.Observers.isObservingSuspended;if((b>0)||e){var k=this._kvo_changes;
if(!k){k=this._kvo_changes=SC.CoreSet.create()}k.add(n);if(e){if(f){console.log("%@%@: will not notify observers because observing is suspended".fmt(SC.KVO_SPACES,this))
}SC.Observers.objectHasPendingChanges(this)}}else{this._notifyPropertyObservers(n)
}return this},registerDependentKey:function(h,c){var e=this._kvo_dependents,b=this[h],k,g,a,f,d;
if(typeof c==="object"&&(c instanceof Array)){k=c;a=0}else{k=arguments;a=1}g=k.length;
if(!e){this._kvo_dependents=e={}}while(--g>=a){f=k[g];d=e[f];if(!d){d=e[f]=[]}d.push(h)
}},_kvo_addCachedDependents:function(b,f,h,c){var a=f.length,e,d,g;while(--a>=0){d=f[a];
c.add(d);e=this[d];if(e&&(e instanceof Function)&&e.isProperty){if(e.isCacheable){b.push(e)
}if((g=h[d])&&g.length>0){this._kvo_addCachedDependents(b,g,h,c)}}}},_kvo_computeCachedDependentsFor:function(c){var d=this._kvo_cachedep,f=this._kvo_dependents,e=f?f[c]:null,a,b;
if(!d){d=this._kvo_cachedep={}}if(!e||e.length===0){return d[c]=null}a=d[c]=[];b=SC._TMP_SEEN_SET=(SC._TMP_SEEN_SET||SC.CoreSet.create());
b.add(c);this._kvo_addCachedDependents(a,e,f,b);b.clear();if(a.length===0){a=d[c]=null
}return a},_kvo_for:function(c,b){var a=this[c];if(!this._kvo_cloned){this._kvo_cloned={}
}if(!a){a=this[c]=(b===undefined)?[]:b.create();this._kvo_cloned[c]=YES}else{if(!this._kvo_cloned[c]){a=this[c]=a.copy();
this._kvo_cloned[c]=YES}}return a},addObserver:function(c,f,h,b){var d,a,e,g;if(h===undefined){h=f;
f=this}if(!f){f=this}if(typeof h==="string"){h=f[h]}if(!h){throw"You must pass a method to addObserver()"
}c=c.toString();if(c.indexOf(".")>=0){a=SC._ChainObserver.createChain(this,c,f,h,b);
a.masterTarget=f;a.masterMethod=h;this._kvo_for(SC.keyFor("_kvo_chains",c)).push(a)
}else{if((this[c]===undefined)&&(c.indexOf("@")===0)){this.get(c)}if(f===this){f=null
}d=SC.keyFor("_kvo_observers",c);this._kvo_for(d,SC.ObserverSet).add(f,h,b);this._kvo_for("_kvo_observed_keys",SC.CoreSet).add(c)
}if(this.didAddObserver){this.didAddObserver(c,f,h)}return this},removeObserver:function(c,f,h){var d,e,b,g,a;
if(h===undefined){h=f;f=this}if(!f){f=this}if(typeof h==="string"){h=f[h]}if(!h){throw"You must pass a method to removeObserver()"
}c=c.toString();if(c.indexOf(".")>=0){d=SC.keyFor("_kvo_chains",c);if(e=this[d]){e=this._kvo_for(d);
a=e.length;while(--a>=0){b=e[a];if(b&&(b.masterTarget===f)&&(b.masterMethod===h)){e[a]=b.destroyChain()
}}}}else{if(f===this){f=null}d=SC.keyFor("_kvo_observers",c);if(g=this[d]){g=this._kvo_for(d);
g.remove(f,h);if(g.targets<=0){this._kvo_for("_kvo_observed_keys",SC.CoreSet).remove(c)
}}}if(this.didRemoveObserver){this.didRemoveObserver(c,f,h)}return this},hasObserverFor:function(b){SC.Observers.flush(this);
var d=this[SC.keyFor("_kvo_observers",b)],c=this[SC.keyFor("_kvo_local",b)],a;if(c&&c.length>0){return YES
}if(d&&d.getMembers().length>0){return YES}return NO},initObservable:function(){if(this._observableInited){return
}this._observableInited=YES;var f,q,m,l,h,e,n,g,c,r,b,k,d,a;if(q=this._observers){g=q.length;
for(f=0;f<g;f++){m=q[f];h=this[m];e=h.propertyPaths;n=(e)?e.length:0;for(c=0;c<n;
c++){r=e[c];b=r.indexOf(".");if(b<0){this.addObserver(r,this,h)}else{if(r.indexOf("*")===0){this.addObserver(r.slice(1),this,h)
}else{k=null;if(b===0){k=this;r=r.slice(1)}else{if(b===4&&r.slice(0,5)==="this."){k=this;
r=r.slice(5)}else{if(b<0&&r.length===4&&r==="this"){k=this;r=""}}}SC.Observers.addObserver(r,this,h,k)
}}}}}this.bindings=[];if(q=this._bindings){for(f=0,a=q.length;f<a;f++){m=q[f];l=this[m];
d=m.slice(0,-7);this[m]=this.bind(d,l)}}if(q=this._properties){for(f=0,a=q.length;
f<a;f++){m=q[f];if(l=this[m]){if(l.isCacheable){this._kvo_cacheable=YES}if(l.dependentKeys&&(l.dependentKeys.length>0)){this.registerDependentKey(m,l.dependentKeys)
}}}}},observersForKey:function(a){var b=this._kvo_for("_kvo_observers",a);return b.getMembers()||[]
},_notifyPropertyObservers:function(y){if(!this._observableInited){this.initObservable()
}SC.Observers.flush(this);var g=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO),s,w,q,d,r,n,v,u,l,a,f,x,c,k,e,b,h,m;
if(g){h=SC.KVO_SPACES=(SC.KVO_SPACES||"")+"  ";console.log('%@%@: notifying observers after change to key "%@"'.fmt(h,this,y))
}d=this["_kvo_observers_*"];this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;while(((w=this._kvo_changes)&&(w.length>0))||y){v=++this.propertyRevision;
if(!w){w=SC.CoreSet.create()}this._kvo_changes=null;if(y==="*"){w.add("*");w.addEach(this._kvo_for("_kvo_observed_keys",SC.CoreSet))
}else{if(y){w.add(y)}}if(q=this._kvo_dependents){for(r=0;r<w.length;r++){y=w[r];n=q[y];
if(n&&(k=n.length)){if(g){console.log("%@...including dependent keys for %@: %@".fmt(h,y,n))
}m=this._kvo_cache;if(!m){m=this._kvo_cache={}}while(--k>=0){w.add(y=n[k]);if(e=this[y]){this[e.cacheKey]=undefined;
m[e.cacheKey]=m[e.lastSetValueKey]=undefined}}}}}while(w.length>0){y=w.pop();s=this[SC.keyFor("_kvo_observers",y)];
if(s){u=s.getMembers();l=u.length;for(f=0;f<l;f++){a=u[f];if(a[3]===v){continue}x=a[0]||this;
c=a[1];b=a[2];a[3]=v;if(g){console.log('%@...firing observer on %@ for key "%@"'.fmt(h,x,y))
}if(b!==undefined){c.call(x,this,y,null,b,v)}else{c.call(x,this,y,null,v)}}}u=this[SC.keyFor("_kvo_local",y)];
if(u){l=u.length;for(f=0;f<l;f++){a=u[f];c=this[a];if(c){if(g){console.log('%@...firing local observer %@.%@ for key "%@"'.fmt(h,this,a,y))
}c.call(this,this,y,null,v)}}}if(d&&y!=="*"){u=d.getMembers();l=u.length;for(f=0;
f<l;f++){a=u[f];x=a[0]||this;c=a[1];b=a[2];if(g){console.log('%@...firing * observer on %@ for key "%@"'.fmt(h,x,y))
}if(b!==undefined){c.call(x,this,y,null,b,v)}else{c.call(x,this,y,null,v)}}}if(this.propertyObserver){if(g){console.log('%@...firing %@.propertyObserver for key "%@"'.fmt(h,this,y))
}this.propertyObserver(this,y,null,v)}}if(w){w.destroy()}y=null}this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
if(g){SC.KVO_SPACES=h.slice(0,-2)}return YES},bind:function(a,c,e){var d,b;if(e!==undefined){c=[c,e]
}b=typeof c;if(b==="string"||(b==="object"&&(c instanceof Array))){d=this[a+"BindingDefault"]||SC.Binding;
d=d.beget().from(c)}else{d=c}d=d.to(a,this).connect();this.bindings.push(d);return d
},didChangeFor:function(a){var b,f,e,l,d,c,h,k,g;a=SC.hashFor(a);b=this._kvo_didChange_valueCache;
if(!b){b=this._kvo_didChange_valueCache={}}f=this._kvo_didChange_revisionCache;if(!f){f=this._kvo_didChange_revisionCache={}
}e=b[a]||{};l=f[a]||{};d=false;c=this._kvo_revision||0;h=arguments.length;while(--h>=1){k=arguments[h];
if(l[k]!=c){g=this.get(k);if(e[k]!==g){d=true;e[k]=g}}l[k]=c}b[a]=e;f[a]=l;return d
},setIfChanged:function(a,b){return(this.get(a)!==b)?this.set(a,b):this},getPath:function(b){var a=SC.tupleForPropertyPath(b,this);
if(a===null||a[0]===null){return undefined}return a[0].get(a[1])},setPath:function(c,b){if(c.indexOf(".")>=0){var a=SC.tupleForPropertyPath(c,this);
if(!a||!a[0]){return null}a[0].set(a[1],b)}else{this.set(c,b)}return this},setPathIfChanged:function(c,b){if(c.indexOf(".")>=0){var a=SC.tupleForPropertyPath(c,this);
if(!a||!a[0]){return null}if(a[0].get(a[1])!==b){a[0].set(a[1],b)}}else{this.setIfChanged(c,b)
}return this},getEach:function(){var d=SC.A(arguments),c=[],a,b;for(a=0,b=d.length;
a<b;a++){c[c.length]=this.getPath(d[a])}return c},incrementProperty:function(b,a){if(!a){a=1
}this.set(b,(this.get(b)||0)+a);return this.get(b)},decrementProperty:function(b,a){if(!a){a=1
}this.set(b,(this.get(b)||0)-a);return this.get(b)},toggleProperty:function(a,b,c){if(b===undefined){b=true
}if(c===undefined){c=false}b=(this.get(a)==b)?c:b;this.set(a,b);return this.get(a)
},notifyPropertyChange:function(a,b){this.propertyWillChange(a);this.propertyDidChange(a,b);
return this},allPropertiesDidChange:function(){this._kvo_cache=null;this._notifyPropertyObservers("*");
return this},addProbe:function(a){this.addObserver(a,SC.logChange)},removeProbe:function(a){this.removeObserver(a,SC.logChange)
},logProperty:function(){var b=SC.$A(arguments),d,c,a;for(a=0,c=b.length;a<c;a++){d=b[a];
console.log("%@:%@: ".fmt(SC.guidFor(this),d),this.get(d))}},propertyRevision:1};
SC.logChange=function logChange(c,a,b){console.log("CHANGE: %@[%@] =>".fmt(c,a),c.get(a))
};SC.mixin(SC,{get:function(a,b){if(!a){return undefined}if(b===undefined){return this[a]
}if(a.get){return a.get(b)}return a[b]}});SC.mixin(Array.prototype,SC.Observable);
SC.Enumerator=function(a){this.enumerable=a;this.reset();return this};SC.Enumerator.prototype={nextObject:function(){var c=this._index;
var a=this._length;if(c>=a){return undefined}var b=this.enumerable.nextObject(c,this._previousObject,this._context);
this._previousObject=b;this._index=c+1;if(c>=a){this._context=SC.Enumerator._pushContext(this._context)
}return b},reset:function(){var b=this.enumerable;if(!b){throw SC.$error("Enumerator has been destroyed")
}this._length=b.get?b.get("length"):b.length;var a=this._length;this._index=0;this._previousObject=null;
this._context=(a>0)?SC.Enumerator._popContext():null},destroy:function(){this.enumerable=this._length=this._index=this._previousObject=this._context=null
}};SC.Enumerator.create=function(a){return new SC.Enumerator(a)};SC.Enumerator._popContext=function(){var a=this._contextCache?this._contextCache.pop():null;
return a||{}};SC.Enumerator._pushContext=function(b){this._contextCache=this._contextCache||[];
var a=this._contextCache;a.push(b);return null};require("core");require("system/enumerator");
SC.Enumerable={isEnumerable:YES,nextObject:function(a,c,b){return this.objectAt?this.objectAt(a):this[a]
},firstObject:function(){if(this.get("length")===0){return undefined}if(this.objectAt){return this.objectAt(0)
}var b=SC.Enumerator._popContext(),a;a=this.nextObject(0,null,b);b=SC.Enumerator._pushContext(b);
return a}.property(),lastObject:function(){var a=this.get("length");if(a===0){return undefined
}if(this.objectAt){return this.objectAt(a-1)}}.property(),enumerator:function(){return SC.Enumerator.create(this)
},forEach:function(g,f){if(typeof g!=="function"){throw new TypeError()}var b=this.get?this.get("length"):this.length;
if(f===undefined){f=null}var e=null;var c=SC.Enumerator._popContext();for(var a=0;
a<b;a++){var d=this.nextObject(a,e,c);g.call(f,d,a,this);e=d}e=null;c=SC.Enumerator._pushContext(c);
return this},getEach:function(a){return this.map(function(b){return b?(b.get?b.get(a):b[a]):null
},this)},setEach:function(a,b){this.forEach(function(c){if(c){if(c.set){c.set(a,b)
}else{c[a]=b}}},this);return this},map:function(h,g){if(typeof h!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(g===undefined){g=null}var c=[];
var f=null;var d=SC.Enumerator._popContext();for(var a=0;a<b;a++){var e=this.nextObject(a,f,d);
c[a]=h.call(g,e,a,this);f=e}f=null;d=SC.Enumerator._pushContext(d);return c},mapProperty:function(a){return this.map(function(b){return b?(b.get?b.get(a):b[a]):null
})},filter:function(h,g){if(typeof h!=="function"){throw new TypeError()}var b=this.get?this.get("length"):this.length;
if(g===undefined){g=null}var c=[];var f=null;var d=SC.Enumerator._popContext();for(var a=0;
a<b;a++){var e=this.nextObject(a,f,d);if(h.call(g,e,a,this)){c.push(e)}f=e}f=null;
d=SC.Enumerator._pushContext(d);return c},sortProperty:function(b){var c=(typeof b===SC.T_STRING)?arguments:b,a=c.length,d;
if(this instanceof Array){d=this}else{d=[];this.forEach(function(e){d.push(e)})}if(!d){return[]
}return d.sort(function(g,f){var e,k,m,l,h=0;for(e=0;h===0&&e<a;e++){k=c[e];m=g?(g.get?g.get(k):g[k]):null;
l=f?(f.get?f.get(k):f[k]):null;h=SC.compare(m,l)}return h})},filterProperty:function(l,f){var d=this.get?this.get("length"):this.length;
var e=[];var k=null;var b=SC.Enumerator._popContext();for(var g=0;g<d;g++){var c=this.nextObject(g,k,b);
var h=c?(c.get?c.get(l):c[l]):null;var a=(f===undefined)?!!h:SC.isEqual(h,f);if(a){e.push(c)
}k=c}k=null;b=SC.Enumerator._pushContext(b);return e},find:function(h,d){var c=this.get?this.get("length"):this.length;
if(d===undefined){d=null}var g=null,b,k=NO,e=null;var a=SC.Enumerator._popContext();
for(var f=0;f<c&&!k;f++){b=this.nextObject(f,g,a);if(k=h.call(d,b,f,this)){e=b}g=b
}b=g=null;a=SC.Enumerator._pushContext(a);return e},findProperty:function(k,f){var c=this.get?this.get("length"):this.length;
var l=NO,d=null,h=null,b,g;var a=SC.Enumerator._popContext();for(var e=0;e<c&&!l;
e++){b=this.nextObject(e,h,a);g=b?(b.get?b.get(k):b[k]):null;l=(f===undefined)?!!g:SC.isEqual(g,f);
if(l){d=b}h=b}h=b=null;a=SC.Enumerator._pushContext(a);return d},every:function(h,g){if(typeof h!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(g===undefined){g=null}var c=YES;
var f=null;var d=SC.Enumerator._popContext();for(var a=0;c&&(a<b);a++){var e=this.nextObject(a,f,d);
if(!h.call(g,e,a,this)){c=NO}f=e}f=null;d=SC.Enumerator._pushContext(d);return c},everyProperty:function(k,e){var c=this.get?this.get("length"):this.length;
var d=YES;var h=null;var a=SC.Enumerator._popContext();for(var f=0;d&&(f<c);f++){var b=this.nextObject(f,h,a);
var g=b?(b.get?b.get(k):b[k]):null;d=(e===undefined)?!!g:SC.isEqual(g,e);h=b}h=null;
a=SC.Enumerator._pushContext(a);return d},some:function(h,g){if(typeof h!=="function"){throw new TypeError()
}var b=this.get?this.get("length"):this.length;if(g===undefined){g=null}var c=NO;
var f=null;var d=SC.Enumerator._popContext();for(var a=0;(!c)&&(a<b);a++){var e=this.nextObject(a,f,d);
if(h.call(g,e,a,this)){c=YES}f=e}f=null;d=SC.Enumerator._pushContext(d);return c},someProperty:function(k,e){var c=this.get?this.get("length"):this.length;
var d=NO;var h=null;var a=SC.Enumerator._popContext();for(var f=0;!d&&(f<c);f++){var b=this.nextObject(f,h,a);
var g=b?(b.get?b.get(k):b[k]):null;d=(e===undefined)?!!g:SC.isEqual(g,e);h=b}h=null;
a=SC.Enumerator._pushContext(a);return d},reduce:function(g,h,k){if(typeof g!=="function"){throw new TypeError()
}var c=this.get?this.get("length"):this.length;if(c===0&&h===undefined){throw new TypeError()
}var d=h;var f=null;var a=SC.Enumerator._popContext();for(var e=0;e<c;e++){var b=this.nextObject(e,f,a);
if(b!==null){if(d===undefined){d=b}else{d=g.call(null,d,b,e,this,k)}}f=b}f=null;a=SC.Enumerator._pushContext(a);
if(d===undefined){throw new TypeError()}return d},invoke:function(h){var e=this.get?this.get("length"):this.length;
if(e<=0){return[]}var k;var g=[];var c=arguments.length;if(c>1){for(k=1;k<c;k++){g.push(arguments[k])
}}var f=[];var l=null;var b=SC.Enumerator._popContext();for(k=0;k<e;k++){var d=this.nextObject(k,l,b);
var a=d?d[h]:null;if(a){f[k]=a.apply(d,g)}l=d}l=null;b=SC.Enumerator._pushContext(b);
return f},invokeWhile:function(d,k){var f=this.get?this.get("length"):this.length;
if(f<=0){return null}var l;var h=[];var c=arguments.length;if(c>2){for(l=2;l<c;l++){h.push(arguments[l])
}}var g=d;var m=null;var b=SC.Enumerator._popContext();for(l=0;(g===d)&&(l<f);l++){var e=this.nextObject(l,m,b);
var a=e?e[k]:null;if(a){g=a.apply(e,h)}m=e}m=null;b=SC.Enumerator._pushContext(b);
return g},toArray:function(){var a=[];this.forEach(function(b){a.push(b)},this);return a
},groupBy:function(l){var d=this.get?this.get("length"):this.length,e=[],k=null,a=SC.Enumerator._popContext(),f=[],m=[];
for(var g=0;g<d;g++){var c=this.nextObject(g,k,a);var h=c?(c.get?c.get(l):c[l]):null;
if(SC.none(f[h])){f[h]=[];m.push(h)}f[h].push(c);k=c}k=null;a=SC.Enumerator._pushContext(a);
for(var g=0,b=m.length;g<b;g++){e.push(f[m[g]])}return e}};SC._buildReducerFor=function(a,b){return function(d,e){var f=this[a];
if(SC.typeOf(f)!==SC.T_FUNCTION){return this.unknownProperty?this.unknownProperty(d,e):null
}else{var c=SC.Enumerable.reduce.call(this,f,null,b);return c}}.property("[]")};SC.Reducers={"[]":function(a,b){return this
}.property(),enumerableContentDidChange:function(b,a){this.notifyPropertyChange("[]");
return this},reducedProperty:function(k,g,f){if(!k||k.charAt(0)!=="@"){return undefined
}var d=k.match(/^@([^(]*)(\(([^)]*)\))?$/);if(!d||d.length<2){return undefined}var h=d[1];
var l=d[3];h="reduce"+h.slice(0,1).toUpperCase()+h.slice(1);var a=this[h];if(SC.typeOf(a)!==SC.T_FUNCTION){return undefined
}if(f===NO){return SC.Enumerable.reduce.call(this,a,null,l)}var c=SC._buildReducerFor(h,l);
var b=this.constructor.prototype;if(b){b[k]=c;var e=b._properties||[];e.push(k);b._properties=e;
this.registerDependentKey(k,"[]")}return SC.Enumerable.reduce.call(this,a,null,l)
},reduceMax:function(a,d,b,f,c){if(c&&d){d=d.get?d.get(c):d[c]}if(a===null){return d
}return(d>a)?d:a},reduceMaxObject:function(b,f,c,g,d){var a=b,h=f;if(d){if(f){h=f.get?f.get(d):f[d]
}if(b){a=b.get?b.get(d):b[d]}}if(a===null){return f}return(h>a)?f:b},reduceMin:function(a,d,b,f,c){if(c&&d){d=d.get?d.get(c):d[c]
}if(a===null){return d}return(d<a)?d:a},reduceMinObject:function(b,f,c,g,d){var a=b,h=f;
if(d){if(f){h=f.get?f.get(d):f[d]}if(b){a=b.get?b.get(d):b[d]}}if(a===null){return f
}return(h<a)?f:b},reduceAverage:function(b,g,d,h,f){if(f&&g){g=g.get?g.get(f):g[f]
}var c=(b||0)+g;var a=h.get?h.get("length"):h.length;if(d>=a-1){c=c/a}return c},reduceSum:function(a,d,b,f,c){if(c&&d){d=d.get?d.get(c):d[c]
}return(a===null)?d:a+d}};SC.mixin(SC.Enumerable,SC.Reducers);SC.mixin(Array.prototype,SC.Reducers);
Array.prototype.isEnumerable=YES;(function(){var a={nextObject:SC.Enumerable.nextObject,enumerator:SC.Enumerable.enumerator,firstObject:SC.Enumerable.firstObject,lastObject:SC.Enumerable.lastObject,sortProperty:SC.Enumerable.sortProperty,mapProperty:function(g){var e=this.length;
var f=[];for(var d=0;d<e;d++){var h=this[d];f[d]=h?(h.get?h.get(g):h[g]):null}return f
},filterProperty:function(h,l){var f=this.length;var g=[];for(var e=0;e<f;e++){var k=this[e];
var m=k?(k.get?k.get(h):k[h]):null;var d=(l===undefined)?!!m:SC.isEqual(m,l);if(d){g.push(k)
}}return g},groupBy:function(m){var f=this.length,g=[],h=[],n=[];for(var k=0;k<f;
k++){var e=this[k];var l=e?(e.get?e.get(m):e[m]):null;if(SC.none(h[l])){h[l]=[];n.push(l)
}h[l].push(e)}for(var k=0,d=n.length;k<d;k++){g.push(h[n[k]])}return g},find:function(l,k){if(typeof l!=="function"){throw new TypeError()
}var e=this.length;if(k===undefined){k=null}var g,f=null,h=NO;for(var d=0;d<e&&!h;
d++){g=this[d];if(h=l.call(k,g,d,this)){f=g}}g=null;return f},findProperty:function(g,l){var e=this.length;
var h,m,k=NO,f=null;for(var d=0;d<e&&!k;d++){m=(h=this[d])?(h.get?h.get(g):h[g]):null;
k=(l===undefined)?!!m:SC.isEqual(m,l);if(k){f=h}}h=null;return f},everyProperty:function(g,k){var e=this.length;
var f=YES;for(var d=0;f&&(d<e);d++){var h=this[d];var l=h?(h.get?h.get(g):h[g]):null;
f=(k===undefined)?!!l:SC.isEqual(l,k)}return f},someProperty:function(g,k){var e=this.length;
var f=NO;for(var d=0;!f&&(d<e);d++){var h=this[d];var l=h?(h.get?h.get(g):h[g]):null;
f=(k===undefined)?!!l:SC.isEqual(l,k)}return f},invoke:function(f){var e=this.length;
if(e<=0){return[]}var d;var h=[];var l=arguments.length;if(l>1){for(d=1;d<l;d++){h.push(arguments[d])
}}var g=[];for(d=0;d<e;d++){var k=this[d];var m=k?k[f]:null;if(m){g[d]=m.apply(k,h)
}}return g},invokeWhile:function(f,m){var h=this.length;if(h<=0){return null}var n;
var l=[];var e=arguments.length;if(e>2){for(n=2;n<e;n++){l.push(arguments[n])}}var k=f;
for(n=0;(k===f)&&(n<h);n++){var g=this[n];var d=g?g[m]:null;if(d){k=d.apply(g,l)}}return k
},toArray:function(){var e=this.length;if(e<=0){return[]}var f=[];for(var d=0;d<e;
d++){var g=this[d];f.push(g)}return f},getEach:function(g){var f=[];var e=this.length;
for(var d=0;d<e;d++){var h=this[d];f[d]=h?(h.get?h.get(g):h[g]):null}return f},setEach:function(f,g){var e=this.length;
for(var d=0;d<e;d++){var h=this[d];if(h){if(h.set){h.set(f,g)}else{h[f]=g}}}return this
}};var c={forEach:function(h,g){if(typeof h!=="function"){throw new TypeError()}var e=this.length;
if(g===undefined){g=null}for(var d=0;d<e;d++){var f=this[d];h.call(g,f,d,this)}return this
},map:function(k,h){if(typeof k!=="function"){throw new TypeError()}var e=this.length;
if(h===undefined){h=null}var f=[];for(var d=0;d<e;d++){var g=this[d];f[d]=k.call(h,g,d,this)
}return f},filter:function(k,h){if(typeof k!=="function"){throw new TypeError()}var e=this.length;
if(h===undefined){h=null}var f=[];for(var d=0;d<e;d++){var g=this[d];if(k.call(h,g,d,this)){f.push(g)
}}return f},every:function(k,h){if(typeof k!=="function"){throw new TypeError()}var e=this.length;
if(h===undefined){h=null}var f=YES;for(var d=0;f&&(d<e);d++){var g=this[d];if(!k.call(h,g,d,this)){f=NO
}}return f},some:function(k,h){if(typeof k!=="function"){throw new TypeError()}var e=this.length;
if(h===undefined){h=null}var f=NO;for(var d=0;(!f)&&(d<e);d++){var g=this[d];if(k.call(h,g,d,this)){f=YES
}}return f},reduce:function(l,f,k){if(typeof l!=="function"){throw new TypeError()
}var e=this.length;if(e===0&&f===undefined){throw new TypeError()}var g=f;for(var d=0;
d<e;d++){var h=this[d];if(h!==null){if(g===undefined){g=h}else{g=l.call(null,g,h,d,this,k)
}}}if(g===undefined){throw new TypeError()}return g}};for(var b in c){if(!c.hasOwnProperty(b)){continue
}if(!Array.prototype[b]||((typeof Prototype==="object")&&Prototype.Version.match(/^1\.6/))){Array.prototype[b]=c[b]
}}SC.mixin(Array.prototype,a)})();SC.RangeObserver={isRangeObserver:YES,toString:function(){var a=this.indexes?this.indexes.toString():"SC.IndexSet<..>";
return a.replace("IndexSet","RangeObserver(%@)".fmt(SC.guidFor(this)))},create:function(d,f,e,g,c,a){var b=SC.beget(this);
b.source=d;b.indexes=f?f.frozenCopy():null;b.target=e;b.method=g;b.context=c;b.isDeep=a||NO;
b.beginObserving();return b},extend:function(e){var d=SC.beget(this),c=arguments,b=c.length,a;
for(a=0;a<b;a++){SC.mixin(d,c[a])}return d},destroy:function(a){this.endObserving();
return this},update:function(a,b){if(this.indexes&&this.indexes.isEqual(b)){return this
}this.indexes=b?b.frozenCopy():null;this.endObserving().beginObserving();return this
},beginObserving:function(){if(!this.isDeep){return this}var b=this.observing;if(!b){b=this.observing=SC.CoreSet.create()
}var a=this._beginObservingForEach;if(!a){a=this._beginObservingForEach=function(c){var d=this.source.objectAt(c);
if(d&&d.addObserver){b.push(d);d._kvo_needsRangeObserver=YES}}}this.indexes.forEach(a,this);
this.isObserving=NO;SC.Observers.addPendingRangeObserver(this);return this},setupPending:function(a){var d=this.observing;
if(this.isObserving||!d||(d.get("length")===0)){return YES}if(d.contains(a)){this.isObserving=YES;
var b=this._setupPendingForEach;if(!b){var c=this.source,e=this.objectPropertyDidChange;
b=this._setupPendingForEach=function(f){var k=this.source.objectAt(f),g=SC.guidFor(k),h;
if(k&&k.addObserver){d.push(k);k.addObserver("*",this,e);h=this[g];if(h===undefined||h===null){this[g]=f
}else{if(h.isIndexSet){h.add(f)}else{h=this[g]=SC.IndexSet.create(h).add(f)}}}}}this.indexes.forEach(b,this);
return YES}else{return NO}},endObserving:function(){if(!this.isDeep){return this}var e=this.observing;
if(this.isObserving){var b=this.objectPropertyDidChange,c=this.source,a,f,d;if(e){f=e.length;
for(a=0;a<f;a++){d=e[a];d.removeObserver("*",this,b);this[SC.guidFor(d)]=null}e.length=0
}this.isObserving=NO}if(e){e.clear()}return this},rangeDidChange:function(b){var a=this.indexes;
if(!b||!a||a.intersects(b)){this.endObserving();this.method.call(this.target,this.source,null,"[]",b,this.context);
this.beginObserving()}return this},objectPropertyDidChange:function(d,f,g,a){var e=this.context,h=this.method,c=SC.guidFor(d),b=this[c];
if(b&&!b.isIndexSet){b=this[c]=SC.IndexSet.create(b).freeze()}if(e){h.call(this.target,this.source,d,f,b,e,a)
}else{h.call(this.target,this.source,d,f,b,a)}}};sc_require("mixins/observable");
sc_require("mixins/enumerable");sc_require("system/range_observer");SC.OUT_OF_RANGE_EXCEPTION="Index out of range";
SC.Array={isSCArray:YES,replace:function(a,c,b){throw"replace() must be implemented to support SC.Array"
},objectAt:function(a){if(a<0){return undefined}if(a>=this.get("length")){return undefined
}return this.get(a)},"[]":function(a,b){if(b!==undefined){this.replace(0,this.get("length"),b)
}return this}.property(),insertAt:function(a,b){if(a>this.get("length")){throw SC.OUT_OF_RANGE_EXCEPTION
}this.replace(a,0,[b]);return this},removeAt:function(d,a){var c=0,b=[];if(typeof d===SC.T_NUMBER){if((d<0)||(d>=this.get("length"))){throw SC.OUT_OF_RANGE_EXCEPTION
}if(a===undefined){this.replace(d,1,b);return this}else{d=SC.IndexSet.create(d,a)
}}this.beginPropertyChanges();d.forEachRange(function(f,e){f-=c;c+=e;this.replace(f,e,b)
},this);this.endPropertyChanges();return this},removeObject:function(b){var c=this.get("length")||0;
while(--c>=0){var a=this.objectAt(c);if(a==b){this.removeAt(c)}}return this},removeObjects:function(a){this.beginPropertyChanges();
a.forEach(function(b){this.removeObject(b)},this);this.endPropertyChanges();return this
},pushObject:function(a){this.insertAt(this.get("length"),a);return a},pushObjects:function(a){this.beginPropertyChanges();
a.forEach(function(b){this.pushObject(b)},this);this.endPropertyChanges();return this
},popObject:function(){var a=this.get("length");if(a===0){return null}var b=this.objectAt(a-1);
this.removeAt(a-1);return b},shiftObject:function(){if(this.get("length")===0){return null
}var a=this.objectAt(0);this.removeAt(0);return a},unshiftObject:function(a){this.insertAt(0,a);
return a},unshiftObjects:function(a){this.beginPropertyChanges();a.forEach(function(b){this.unshiftObject(b)
},this);this.endPropertyChanges();return this},isEqual:function(a){if(!a){return false
}if(a==this){return true}var b=a.get("length");if(b!=this.get("length")){return false
}while(--b>=0){if(!SC.isEqual(a.objectAt(b),this.objectAt(b))){return false}}return true
},compact:function(){return this.without(null)},without:function(b){if(this.indexOf(b)<0){return this
}var a=[];this.forEach(function(c){if(c!==b){a[a.length]=c}});return a},uniq:function(){var a=[];
this.forEach(function(b){if(a.indexOf(b)<0){a[a.length]=b}});return a},max:function(){return Math.max.apply(Math,this)
},min:function(){return Math.min.apply(Math,this)},rangeObserverClass:SC.RangeObserver,addRangeObserver:function(d,f,h,e){var a=this._array_rangeObservers;
if(!a){a=this._array_rangeObservers=SC.CoreSet.create()}if(this._array_oldLength===undefined){this._array_oldLength=this.get("length")
}var g=this.rangeObserverClass;var b=NO;var c=g.create(this,d,f,h,e,b);a.add(c);if(!this._array_isNotifyingRangeObservers){this._array_isNotifyingRangeObservers=YES;
this.addObserver("[]",this,this._array_notifyRangeObservers)}return c},updateRangeObserver:function(b,a){return b.update(this,a)
},removeRangeObserver:function(c){var b=c.destroy(this);var a=this._array_rangeObservers;
if(a){a.remove(c)}return b},enumerableContentDidChange:function(h,g,f){var a=this._array_rangeObservers,d=this._array_oldLength,e,c,b;
this.beginPropertyChanges();this.notifyPropertyChange("length");if(a&&a.length>0){if(d===undefined){d=0
}this._array_oldLength=e=this.get("length");if(h===undefined){h=0}if(f===undefined){f=e-d
}if(f!==0||g===undefined){c=e-h;if(f<0){c-=f}}else{c=g}b=this._array_rangeChanges;
if(!b){b=this._array_rangeChanges=SC.IndexSet.create()}b.add(h,c)}this.notifyPropertyChange("[]");
this.endPropertyChanges();return this},_array_notifyRangeObservers:function(){var c=this._array_rangeObservers,d=this._array_rangeChanges,b=c?c.length:0,a,e;
if(b>0&&d&&d.length>0){for(a=0;a<b;a++){c[a].rangeDidChange(d)}d.clear()}}};SC.mixin(Array.prototype,SC.Array);
SC.Array=SC.mixin({},SC.Enumerable,SC.Array);SC.Array.slice=function(b,d){var a=[];
var c=this.get("length");if(SC.none(b)){b=0}if(SC.none(d)||(d>c)){d=c}while(b<d){a[a.length]=this.objectAt(b++)
}return a};SC.Array.indexOf=function(d,c){var b,a=this.get("length");if(c===undefined){c=0
}else{c=(c<0)?Math.ceil(c):Math.floor(c)}if(c<0){c+=a}for(b=c;b<a;b++){if(this.objectAt(b)===d){return b
}}return -1};if(!Array.prototype.indexOf){Array.prototype.indexOf=SC.Array.indexOf
}SC.Array.lastIndexOf=function(d,c){var b,a=this.get("length");if(c===undefined){c=a-1
}else{c=(c<0)?Math.ceil(c):Math.floor(c)}if(c<0){c+=a}for(b=c;b>=0;b--){if(this.objectAt(b)===d){return b
}}return -1};if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=SC.Array.lastIndexOf
}(function(){SC.mixin(Array.prototype,{replace:function(d,g,f){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(!f||f.length===0){this.splice(d,g)}else{var e=[d,g].concat(f);this.splice.apply(this,e)
}var c=f?(f.get?f.get("length"):f.length):0;this.enumerableContentDidChange(d,g,c-g);
return this},unknownProperty:function(d,e){var c=this.reducedProperty(d,e);if((e!==undefined)&&c===undefined){c=this[d]=e
}return c}});var b=Array.prototype.indexOf;if(!b||(b===SC.Array.indexOf)){Array.prototype.indexOf=function(f,e){var d,c=this.length;
if(e===undefined){e=0}else{e=(e<0)?Math.ceil(e):Math.floor(e)}if(e<0){e+=c}for(d=e;
d<c;d++){if(this[d]===f){return d}}return -1}}var a=Array.prototype.lastIndexOf;if(!a||(a===SC.Array.lastIndexOf)){Array.prototype.lastIndexOf=function(f,e){var d,c=this.length;
if(e===undefined){e=c-1}else{e=(e<0)?Math.ceil(e):Math.floor(e)}if(e<0){e+=c}for(d=e;
d>=0;d--){if(this[d]===f){return d}}return -1}}})();SC.Comparable={isComparable:YES,compare:function(d,c){throw"%@.compare() is not implemented".fmt(this.toString())
}};SC.Copyable={isCopyable:YES,copy:function(a){throw"%@.copy() is not implemented"
},frozenCopy:function(){var a=this.get?this.get("isFrozen"):this.isFrozen;if(a===YES){return this
}else{if(a===undefined){throw"%@ does not support freezing".fmt(this)}else{return this.copy().freeze()
}}}};SC.mixin(Array.prototype,SC.Copyable);Array.prototype.copy=function(b){var c=this.slice(),a;
if(b){a=c.length;while(a--){c[a]=SC.copy(c[a],true)}}return c};SC.DelegateSupport={delegateFor:function(c){var b=1,a=arguments.length,d;
while(b<a){d=arguments[b];if(d&&d[c]!==undefined){return d}b++}return(this[c]!==undefined)?this:null
},invokeDelegateMethod:function(c,a,b){b=SC.A(arguments);b=b.slice(2,b.length);if(!c||!c[a]){c=this
}var d=c[a];return d?d.apply(c,b):null},getDelegateProperty:function(d,e){var b=1,a=arguments.length,c;
while(b<a){c=arguments[b++];if(c&&c[d]!==undefined){return c.get?c.get(d):c[d]}}return(this[d]!==undefined)?this.get(d):undefined
}};SC.FROZEN_ERROR=new Error("Cannot modify a frozen object");SC.Freezable={isFreezable:YES,isFrozen:NO,freeze:function(){if(this.set){this.set("isFrozen",YES)
}else{this.isFrozen=YES}return this}};SC.mixin(Array.prototype,SC.Freezable);sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.Set=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,{create:function(b){var c,a,d=SC.Set._pool,e=this.isObservable;
if(!e&&b===undefined&&d.length>0){c=d.pop()}else{c=SC.beget(this);if(e){c.initObservable()
}if(b&&b.isEnumerable&&b.get("length")>0){c.isObservable=NO;if(b.isSCArray){a=b.get?b.get("length"):b.length;
while(--a>=0){c.add(b.objectAt(a))}}else{if(b.isSet){a=b.length;while(--a>=0){c.add(b[a])
}}else{b.forEach(function(f){c.add(f)},this)}}c.isObservable=e}}return c},isSet:YES,length:0,firstObject:function(){return(this.length>0)?this[0]:undefined
}.property(),clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}this.length=0;
return this},contains:function(b){if(b===null){return NO}var a=this[SC.hashFor(b)];
return(!SC.none(a)&&(a<this.length)&&(this[a]===b))},isEqual:function(a){if(!a||!a.isSet||(a.get("length")!==this.get("length"))){return NO
}var b=this.get("length");while(--b>=0){if(!a.contains(this[b])){return NO}}return YES
},addSetObserver:function(a){if(!this.setObservers){this.setObservers=SC.CoreSet.create()
}this.setObservers.add(a)},removeSetObserver:function(a){if(!this.setObservers){return
}this.setObservers.remove(a)},add:function(e){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(e===null||e===undefined){return this}var c,d=(e&&(c=e.hash)&&(typeof c===SC.T_FUNCTION))?c.call(e):SC.guidFor(e),b=this[d],a=this.length;
if((b===null||b===undefined)||(b>=a)||(this[b]!==e)){this[a]=e;this[d]=a;this.length=a+1;
if(this.setObservers){this.didAddItem(e)}}if(this.isObservable){this.enumerableContentDidChange()
}return this},addEach:function(c){if(this.isFrozen){throw SC.FROZEN_ERROR}if(!c||!c.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)
}var a,b=this.isObservable;if(b){this.beginPropertyChanges()}if(c.isSCArray){a=c.get("length");
while(--a>=0){this.add(c.objectAt(a))}}else{if(c.isSet){a=c.length;while(--a>=0){this.add(c[a])
}}else{c.forEach(function(d){this.add(d)},this)}}if(b){this.endPropertyChanges()}return this
},remove:function(e){if(this.isFrozen){throw SC.FROZEN_ERROR}if(e===null||e===undefined){return this
}var c,d=(e&&(c=e.hash)&&(typeof c===SC.T_FUNCTION))?c.call(e):SC.guidFor(e),b=this[d],a=this.length;
if((b===null||b===undefined)||(b>=a)||(this[b]!==e)){return this}delete this[d];if(b<(a-1)){tmp=this[b]=this[a-1];
d=(tmp&&(c=tmp.hash)&&(typeof c===SC.T_FUNCTION))?c.call(tmp):SC.guidFor(tmp);this[d]=b
}this.length=a-1;if(this.isObservable){this.enumerableContentDidChange()}if(this.setObservers){this.didRemoveItem(e)
}return this},pop:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}var a=(this.length>0)?this[this.length-1]:null;
if(a){this.remove(a)}return a},removeEach:function(c){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(!c||!c.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)}var a,b=this.isObservable;
if(b){this.beginPropertyChanges()}if(c.isSCArray){a=c.get("length");while(--a>=0){this.remove(c.objectAt(a))
}}else{if(c.isSet){a=c.length;while(--a>=0){this.remove(c[a])}}else{c.forEach(function(d){this.remove(d)
},this)}}if(b){this.endPropertyChanges()}return this},copy:function(){return this.constructor.create(this)
},destroy:function(){this.isFrozen=NO;if(!this.isObservable){SC.Set._pool.push(this.clear())
}return this},forEach:function(c,d){var b=this.length;if(!d){d=this}for(var a=0;a<b;
a++){c.call(d,this[a],a,this)}return this},toString:function(){var b=this.length,a,c=[];
for(a=0;a<b;a++){c[a]=this[a]}return"SC.Set<%@>".fmt(c.join(","))},didAddItem:function(c){var d=this.setObservers;
if(!d){return}var b=d.length,a;for(a=0;a<b;a++){d[a].didAddItem(this,c)}},didRemoveItem:function(c){var d=this.setObservers;
if(!d){return}var b=d.length,a;for(a=0;a<b;a++){d[a].didRemoveItem(this,c)}},_pool:[],isObservable:YES});
SC.Set.constructor=SC.Set;SC.Set.clone=SC.Set.copy;SC.Set.push=SC.Set.unshift=SC.Set.add;
SC.Set.shift=SC.Set.pop;SC.Set.addObject=SC.Set.add;SC.Set.removeObject=SC.Set.remove;
SC.Set._pool=[];SC.CoreSet=SC.beget(SC.Set);SC.CoreSet.isObservable=NO;SC.CoreSet.constructor=SC.CoreSet;
sc_require("mixins/observable");sc_require("system/set");SC.Observers={queue:[],addObserver:function(c,d,e,b){var a;
if(typeof c==="string"){a=SC.tupleForPropertyPath(c,b)}else{a=c}if(a){a[0].addObserver(a[1],d,e)
}else{this.queue.push([c,d,e,b])}},removeObserver:function(f,g,h,d){var c,b,a,e;a=SC.tupleForPropertyPath(f,d);
if(a){a[0].removeObserver(a[1],g,h)}c=this.queue.length;b=this.queue;while(--c>=0){e=b[c];
if((e[0]===f)&&(e[1]===g)&&(e[2]==h)&&(e[3]===d)){b[c]=null}}},addPendingRangeObserver:function(a){var b=this.rangeObservers;
if(!b){b=this.rangeObservers=SC.CoreSet.create()}b.add(a);return this},_TMP_OUT:[],flush:function(a){var e=this.queue;
if(e&&e.length>0){var h=(this.queue=[]);var k=e.length;while(--k>=0){var l=e[k];if(!l){continue
}var f=SC.tupleForPropertyPath(l[0],l[3]);if(f){f[0].addObserver(f[1],l[1],l[2])}else{h.push(l)
}}}if(a._kvo_needsRangeObserver){var g=this.rangeObservers,d=g?g.get("length"):0,b=this._TMP_OUT,c;
for(k=0;k<d;k++){c=g[k];if(c.setupPending(a)){b.push(c)}}if(b.length>0){g.removeEach(b)
}b.length=0;a._kvo_needsRangeObserver=NO}},isObservingSuspended:0,_pending:SC.CoreSet.create(),objectHasPendingChanges:function(a){this._pending.add(a)
},suspendPropertyObserving:function(){this.isObservingSuspended++},resumePropertyObserving:function(){var c;
if(--this.isObservingSuspended<=0){c=this._pending;this._pending=SC.CoreSet.create();
var b,a=c.length;for(b=0;b<a;b++){c[b]._notifyPropertyObservers()}c.clear();c=null
}}};sc_require("core");sc_require("mixins/observable");sc_require("private/observer_queue");
sc_require("mixins/array");sc_require("system/set");SC.BENCHMARK_OBJECTS=NO;SC._object_extend=function _object_extend(g,f){if(!f){throw"SC.Object.extend expects a non-null value.  Did you forget to 'sc_require' something?  Or were you passing a Protocol to extend() as if it were a mixin?"
}g._kvo_cloned=null;var B,q,x,e,h=g.concatenatedProperties,m=SC.K;var c,b;q=(h)?h.length:0;
var a=(q>0)?{}:null;while(--q>=0){B=h[q];c=g[B];b=f[B];if(c){if(!(c instanceof Array)){c=SC.$A(c)
}a[B]=(b)?c.concat(b):b}else{if(!(b instanceof Array)){b=SC.$A(b)}a[B]=b}}var A=g._bindings,n=NO;
var y=g._observers,z=NO;var k=g._properties,d=NO;var u,l,r;var w=g.outlets,v=NO;if(f.outlets){w=(w||SC.EMPTY_ARRAY).concat(f.outlets);
v=YES}for(B in f){if(B==="_kvo_cloned"){continue}if(!f.hasOwnProperty(B)){continue
}var s=(a.hasOwnProperty(B)?a[B]:null)||f[B];if(B.length>7&&B.slice(-7)==="Binding"){if(!n){A=(A||SC.EMPTY_ARRAY).slice();
n=YES}if(A===null){A=(g._bindings||SC.EMPTY_ARRAY).slice()}A[A.length]=B}else{if(s&&(s instanceof Function)){if(!s.superclass&&(s!==(e=g[B]))){s.superclass=s.base=e||m
}if(s.propertyPaths){if(!z){y=(y||SC.EMPTY_ARRAY).slice();z=YES}y[y.length]=B}if(u=s.localPropertyPaths){l=u.length;
while(--l>=0){r=g._kvo_for(SC.keyFor("_kvo_local",u[l]),SC.CoreSet);r.add(B);g._kvo_for("_kvo_observed_keys",SC.CoreSet).add(u[l])
}}if(s.dependentKeys){if(!d){k=(k||SC.EMPTY_ARRAY).slice();d=YES}k[k.length]=B}if(s.autoconfiguredOutlet){if(!v){w=(w||SC.EMPTY_ARRAY).slice();
v=YES}w[w.length]=B}}}g[B]=s}if(f.hasOwnProperty("toString")){B="toString";s=(a.hasOwnProperty(B)?a[B]:null)||f[B];
if(!s.superclass&&(s!==(e=g[B]))){s.superclass=s.base=e||m}g[B]=s}g._bindings=A||[];
g._observers=y||[];g._properties=k||[];g.outlets=w||[];return g};SC.Object=function(a){return this._object_init(a)
};SC.mixin(SC.Object,{mixin:function(b){var a=arguments.length,c;for(c=0;c<a;c++){SC.mixin(this,arguments[c])
}return this},superclass:null,extend:function(e){var d=SC.BENCHMARK_OBJECTS;if(d){SC.Benchmark.start("SC.Object.extend")
}var g,c=function(h){return this._object_init(h)};for(g in this){if(!this.hasOwnProperty(g)){continue
}c[g]=this[g]}if(this.hasOwnProperty("toString")){c.toString=this.toString}c.superclass=this;
SC.generateGuid(c);c.subclasses=SC.Set.create();this.subclasses.add(c);var f=(c.prototype=SC.beget(this.prototype));
var b,a=arguments.length;for(b=0;b<a;b++){SC._object_extend(f,arguments[b])}f.constructor=c;
if(d){SC.Benchmark.end("SC.Object.extend")}return c},create:function(){var b=this,a=new b(arguments);
if(SC.ObjectDesigner){SC.ObjectDesigner.didCreateObject(a,SC.$A(arguments))}return a
},isClass:YES,subclasses:SC.Set.create(),toString:function(){return SC._object_className(this)
},subclassOf:function(b){if(this===b){return NO}var a=this;while(a=a.superclass){if(a===b){return YES
}}return NO},hasSubclass:function(a){return(a&&a.subclassOf)?a.subclassOf(this):NO
},kindOf:function(a){return(this===a)||this.subclassOf(a)},design:function(){if(this.isDesign){return this
}var a=this.extend.apply(this,arguments);a.isDesign=YES;if(SC.ObjectDesigner){SC.ObjectDesigner.didLoadDesign(a,this,SC.A(arguments))
}return a}});SC.Object.prototype={_kvo_enabled:YES,_object_init:function(c){var b,a=(c)?c.length:0;
for(b=0;b<a;b++){SC._object_extend(this,c[b])}SC.generateGuid(this);this.init();var d=this.initMixin;
a=(d)?d.length:0;for(b=0;b<a;b++){d[b].call(this)}return this},mixin:function(){var b,a=arguments.length;
for(b=0;b<a;b++){SC.mixin(this,arguments[b])}for(b=0;b<a;b++){var c=arguments[b].initMixin;
if(c){c.call(this)}}return this},init:function(){this.initObservable();return this
},isDestroyed:NO,destroy:function(){if(this.get("isDestroyed")){return this}this.set("isDestroyed",YES);
var b,c=this.destroyMixin,a=(c)?c.length:0;for(b=0;b<a;b++){c[b].call(this)}return this
},isObject:true,respondsTo:function(a){return !!(this[a] instanceof Function)},tryToPerform:function(b,c,a){return this.respondsTo(b)&&(this[b](c,a)!==NO)
},superclass:function(b){var a=arguments.callee.caller;if(!a){throw"superclass cannot determine the caller method"
}return a.superclass?a.superclass.apply(this,arguments):null},instanceOf:function(a){return this.constructor===a
},kindOf:function(a){return this.constructor.kindOf(a)},toString:function(){if(!this._object_toString){var a=SC._object_className(this.constructor);
var b="%@:%@".fmt(a,SC.guidFor(this));if(a){this._object_toString=b}else{return b
}}return this._object_toString},awake:function(c){var e=this.outlets,b,a,d;for(b=0,a=e.length;
b<a;++b){d=e[b];this.get(d)}this.bindings.invoke("sync")},invokeOnce:function(a){SC.RunLoop.currentRunLoop.invokeOnce(this,a);
return this},invokeLast:function(a){SC.RunLoop.currentRunLoop.invokeLast(this,a);
return this},concatenatedProperties:["concatenatedProperties","initMixin","destroyMixin"]};
SC.Object.prototype.constructor=SC.Object;SC.mixin(SC.Object.prototype,SC.Observable);
function findClassNames(){if(SC._object_foundObjectClassNames){return}SC._object_foundObjectClassNames=true;
var b=[];var c=false;var a=function(d,e,h){h--;if(b.indexOf(e)>=0){return}b.push(e);
for(var f in e){if(f=="__scope__"){continue}if(f=="superclass"){continue}if(f=="__SC__"){f="SC"
}if(!f.match(/^[A-Z0-9]/)){continue}if(f=="SC"){if(c){continue}c=true}var k=(d)?[d,f].join("."):f;
var g=e[f];switch(SC.typeOf(g)){case SC.T_CLASS:if(!g._object_className){g._object_className=k
}if(h>=0){a(k,g,h)}break;case SC.T_OBJECT:if(h>=0){a(k,g,h)}break;case SC.T_HASH:if(((d)||(k==="SC"))&&(h>=0)){a(k,g,h)
}break;default:break}}};window.__SC__=SC;a(null,window,2)}SC.instanceOf=function(a,b){return !!(a&&a.constructor===b)
};SC.kindOf=function(a,b){if(a&&!a.isClass){a=a.constructor}return !!(a&&a.kindOf&&a.kindOf(b))
};SC._object_className=function(b){if(SC.isReady===NO){return""}if(!b._object_className){findClassNames()
}if(b._object_className){return b._object_className}var a=b;while(a&&!a._object_className){a=a.superclass
}return(a&&a._object_className)?a._object_className:"Anonymous"};require("system/object");
SC._ChainObserver=function(a){this.property=a};SC._ChainObserver.createChain=function(d,l,f,a,b){var c=l.split("."),h=new SC._ChainObserver(c[0]),g=h,e=c.length;
for(var k=1;k<e;k++){g=g.next=new SC._ChainObserver(c[k])}h.objectDidChange(d);g.target=f;
g.method=a;g.context=b;return h};SC._ChainObserver.prototype={isChainObserver:true,object:null,property:null,next:null,target:null,method:null,objectDidChange:function(a){if(a===this.object){return
}if(this.object&&this.object.removeObserver){this.object.removeObserver(this.property,this,this.propertyDidChange)
}this.object=a;if(this.object&&this.object.addObserver){this.object.addObserver(this.property,this,this.propertyDidChange)
}this.propertyDidChange()},propertyDidChange:function(){var b=this.object;var e=this.property;
var d=(b&&b.get)?b.get(e):null;if(this.next){this.next.objectDidChange(d)}var f=this.target,g=this.method,c=this.context;
if(f&&g){var a=b?b.propertyRevision:null;if(c){g.call(f,b,e,d,c,a)}else{g.call(f,b,e,d,a)
}}},destroyChain:function(){var a=this.object;if(a&&a.removeObserver){a.removeObserver(this.property,this,this.propertyDidChange)
}if(this.next){this.next.destroyChain()}this.next=this.target=this.method=this.object=this.context=null;
return null}};sc_require("system/object");SC.LOG_BINDINGS=NO;SC.BENCHMARK_BINDING_NOTIFICATIONS=NO;
SC.BENCHMARK_BINDING_SETUP=NO;SC.MULTIPLE_PLACEHOLDER="@@MULT@@";SC.NULL_PLACEHOLDER="@@NULL@@";
SC.EMPTY_PLACEHOLDER="@@EMPTY@@";SC.Binding={beget:function(b){var a=SC.beget(this);
a.parentBinding=this;if(b!==undefined){a=a.from(b)}return a},builder:function(){var b=this,a=function(c){return b.beget().from(c)
};a.beget=function(){return b.beget()};return a},from:function(b,a){if(!b){return this
}var c=(this===SC.Binding)?this.beget():this;c._fromPropertyPath=b;c._fromRoot=a;
c._fromTuple=null;return c},to:function(b,a){var c=(this===SC.Binding)?this.beget():this;
c._toPropertyPath=b;c._toRoot=a;c._toTuple=null;return c},connect:function(){if(this.isConnected){return this
}this.isConnected=YES;this._connectionPending=YES;this._syncOnConnect=YES;SC.Binding._connectQueue.add(this);
return this},_connect:function(){if(!this._connectionPending){return}this._connectionPending=NO;
var c,a,b=SC.BENCHMARK_BINDING_SETUP;if(b){SC.Benchmark.start("SC.Binding.connect()")
}c=this._fromPropertyPath;a=this._fromRoot;if(typeof c==="string"){if(c.indexOf(".")===0){c=c.slice(1);
if(!a){a=this._toRoot}}else{if(c.indexOf("*")===0){c=[this._fromRoot||this._toRoot,c.slice(1)];
a=null}}}this._fromObserverData=[c,this,this.fromPropertyDidChange,a];SC.Observers.addObserver.apply(SC.Observers,this._fromObserverData);
if(!this._oneWay){c=this._toPropertyPath;a=this._toRoot;this._toObserverData=[c,this,this.toPropertyDidChange,a];
SC.Observers.addObserver.apply(SC.Observers,this._toObserverData)}if(b){SC.Benchmark.end("SC.Binding.connect()")
}if(this._syncOnConnect){this._syncOnConnect=NO;if(b){SC.Benchmark.start("SC.Binding.connect().sync")
}this.sync();if(b){SC.Benchmark.end("SC.Binding.connect().sync")}}},disconnect:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._connectionPending=NO}else{SC.Observers.removeObserver.apply(SC.Observers,this._fromObserverData);
if(!this._oneWay){SC.Observers.removeObserver.apply(SC.Observers,this._toObserverData)
}}this.isConnected=NO;return this},fromPropertyDidChange:function(c,b){var a=c?c.get(b):null;
if(a!==this._bindingValue||b==="[]"){this._setBindingValue(c,b);this._changePending=YES;
SC.Binding._changeQueue.add(this)}},toPropertyDidChange:function(c,b){if(this._oneWay){return
}var a=c.get(b);if(a!==this._transformedBindingValue){this._setBindingValue(c,b);
this._changePending=YES;SC.Binding._changeQueue.add(this)}},_setBindingValue:function(b,a){this._bindingSource=b;
this._bindingKey=a},_computeBindingValue:function(){var g=this._bindingSource,e=this._bindingKey,c,b;
this._bindingValue=c=(g?g.getPath(e):null);var f=this._transforms;if(f){var a=f.length,d;
for(b=0;b<a;b++){d=f[b];c=d(c,this)}}if(this._noError&&SC.typeOf(c)===SC.T_ERROR){c=null
}this._transformedBindingValue=c},_connectQueue:SC.CoreSet.create(),_alternateConnectQueue:SC.CoreSet.create(),_changeQueue:SC.CoreSet.create(),_alternateChangeQueue:SC.CoreSet.create(),_changePending:NO,flushPendingChanges:function(){if(this._isFlushing){return NO
}this._isFlushing=YES;SC.Observers.suspendPropertyObserving();var b=NO,c=SC.LOG_BINDINGS,a,d;
while((a=this._connectQueue).length>0){this._connectQueue=this._alternateConnectQueue;
this._alternateConnectQueue=a;while(d=a.pop()){d._connect()}}while((a=this._changeQueue).length>0){if(c){console.log("Begin: Trigger changed bindings")
}b=YES;this._changeQueue=this._alternateChangeQueue;this._alternateChangeQueue=a;
while(d=a.pop()){d.applyBindingValue()}if(c){console.log("End: Trigger changed bindings")
}}this._isFlushing=NO;SC.Observers.resumePropertyObserving();return b},applyBindingValue:function(){this._changePending=NO;
this._computeBindingTargets();this._computeBindingValue();var a=this._bindingValue,b=this._transformedBindingValue,c=SC.BENCHMARK_BINDING_NOTIFICATIONS,d=SC.LOG_BINDINGS;
if(!this._oneWay&&this._fromTarget){if(d){console.log("%@: %@ -> %@".fmt(this,a,b))
}if(c){SC.Benchmark.start(this.toString()+"->")}this._fromTarget.setPathIfChanged(this._fromPropertyKey,a);
if(c){SC.Benchmark.end(this.toString()+"->")}}if(this._toTarget){if(d){console.log("%@: %@ <- %@".fmt(this,a,b))
}if(c){SC.Benchmark.start(this.toString()+"<-")}this._toTarget.setPathIfChanged(this._toPropertyKey,b);
if(c){SC.Benchmark.start(this.toString()+"<-")}}},sync:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._syncOnConnect=YES}else{this._computeBindingTargets();
var c=this._fromTarget,b=this._fromPropertyKey;if(!c||!b){return this}var a=c.getPath(b);
if(a!==this._bindingValue||b==="[]"){this._setBindingValue(c,b);this._changePending=YES;
SC.Binding._changeQueue.add(this)}}return this},_syncOnConnect:NO,_computeBindingTargets:function(){if(!this._fromTarget){var c,b,a;
c=this._fromPropertyPath;b=this._fromRoot;if(typeof c==="string"){if(c.indexOf(".")===0){c=c.slice(1);
if(!b){b=this._toRoot}}else{if(c.indexOf("*")===0){c=[b||this._toRoot,c.slice(1)];
b=null}}}a=SC.tupleForPropertyPath(c,b);if(a){this._fromTarget=a[0];this._fromPropertyKey=a[1]
}}if(!this._toTarget){c=this._toPropertyPath;b=this._toRoot;a=SC.tupleForPropertyPath(c,b);
if(a){this._toTarget=a[0];this._toPropertyKey=a[1]}}},oneWay:function(c,a){if((a===undefined)&&(SC.typeOf(c)===SC.T_BOOL)){a=c;
c=null}var b=this.from(c);if(b===SC.Binding){b=b.beget()}b._oneWay=(a===undefined)?YES:a;
return b},transform:function(b){var c=(this===SC.Binding)?this.beget():this;var a=c._transforms;
if(a&&(a===c.parentBinding._transform)){a=c._transforms=a.slice()}if(!a){a=c._transforms=[]
}a.push(b);return c},resetTransforms:function(){var a=(this===SC.Binding)?this.beget():this;
a._transforms=null;return a},noError:function(c,a){if((a===undefined)&&(SC.typeOf(c)===SC.T_BOOL)){a=c;
c=null}var b=this.from(c);if(b===SC.Binding){b=b.beget()}b._noError=(a===undefined)?YES:a;
return b},single:function(b,a){if(a===undefined){a=SC.MULTIPLE_PLACEHOLDER}return this.from(b).transform(function(e,d){if(e&&e.isEnumerable){var c=e.get("length");
e=(c>1)?a:(c<=0)?null:e.firstObject()}return e})},notEmpty:function(b,a){if(a===undefined){a=SC.EMPTY_PLACEHOLDER
}return this.from(b).transform(function(d,c){if(SC.none(d)||(d==="")||(SC.isArray(d)&&d.length===0)){d=a
}return d})},notNull:function(b,a){if(a===undefined){a=SC.EMPTY_PLACEHOLDER}return this.from(b).transform(function(d,c){if(SC.none(d)){d=a
}return d})},multiple:function(a){return this.from(a).transform(function(b){if(!SC.isArray(b)){b=(b==null)?[]:[b]
}return b})},bool:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
if(c===SC.T_ERROR){return b}return(c==SC.T_ARRAY)?(b.length>0):(b==="")?NO:!!b})},and:function(b,a){var c=SC.Object.create({valueABinding:b,valueBBinding:a,and:function(){return(this.get("valueA")&&this.get("valueB"))
}.property("valueA","valueB").cacheable()});return this.from("and",c).oneWay()},or:function(b,a){var c=SC.Object.create({valueABinding:b,valueBBinding:a,or:function(){return(this.get("valueA")||this.get("valueB"))
}.property("valueA","valueB").cacheable()});return this.from("or",c).oneWay()},not:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
if(c===SC.T_ERROR){return b}return !((c==SC.T_ARRAY)?(b.length>0):(b==="")?NO:!!b)
})},isNull:function(a){return this.from(a).transform(function(b){var c=SC.typeOf(b);
return(c===SC.T_ERROR)?b:SC.none(b)})},toString:function(){var c=this._fromRoot?"<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath):this._fromPropertyPath;
var b=this._toRoot?"<%@>:%@".fmt(this._toRoot,this._toPropertyPath):this._toPropertyPath;
var a=this._oneWay?"[oneWay]":"";return"SC.Binding%@(%@ -> %@)%@".fmt(SC.guidFor(this),c,b,a)
}};SC.binding=function(b,a){return SC.Binding.from(b,a)};SC.Cookie=SC.Object.extend({name:null,value:"",expires:null,path:null,domain:null,secure:NO,isCookie:YES,destroy:function(){this.set("expires",-1);
this.write();arguments.callee.base.apply(this,arguments)},write:function(){var b=this.get("name"),k=this.get("value"),c=this.get("expires"),m=this.get("path"),e=this.get("domain"),a=this.get("secure");
var h="";if(c&&(SC.typeOf(c)===SC.T_NUMBER||(SC.DateTime&&c.get&&c.get("milliseconds"))||SC.typeOf(c.toUTCString)===SC.T_FUNCTION)){var d;
if(SC.typeOf(c)===SC.T_NUMBER){d=new Date();d.setTime(d.getTime()+(c*24*60*60*1000))
}else{if(SC.DateTime&&c.get&&c.get("milliseconds")){d=new Date(c.get("milliseconds"))
}else{if(SC.typeOf(c.toUTCString)===SC.T_FUNCTION){d=c}}}if(d){h="; expires="+d.toUTCString()
}}var l=m?"; path="+m:"";var g=e?"; domain="+e:"";var f=a?"; secure":"";document.cookie=[b,"=",encodeURIComponent(k),h,l,g,f].join("");
return this}});SC.Cookie.mixin({find:function(a){if(document.cookie&&document.cookie!=""){var d=document.cookie.split(";");
for(var c=0;c<d.length;c++){var b=String(d[c]).trim();if(b.substring(0,a.length+1)===(a+"=")){return SC.Cookie.create({name:a,value:decodeURIComponent(b.substring(a.length+1))})
}}}return null}});SC.Error=SC.Object.extend({code:-1,message:"",errorValue:null,errorObject:function(){return this
}.property().cacheable(),label:null,toString:function(){return"SC.Error:%@:%@ (%@)".fmt(SC.guidFor(this),this.get("message"),this.get("code"))
},isError:YES});SC.Error.desc=function(d,a,e,c){var b={message:d};if(a!==undefined){b.label=a
}if(c!==undefined){b.code=c}if(e!==undefined){b.errorValue=e}return this.create(b)
};SC.$error=function(b,a,d,e){return SC.Error.desc(b,a,d,e)};SC.ok=function(a){return(a!==false)&&!(a&&a.isError)
};SC.$ok=SC.ok;SC.val=function(a){if(a&&a.isError){return a.get?a.get("errorValue"):null
}else{return a}};SC.$val=SC.val;SC.Error.HAS_MULTIPLE_VALUES=-100;sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.IndexSet=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,SC.Copyable,{_sc_sliceContent:function(e){if(e.length<1000){return e.slice()
}var d=0,a=[],b=e[0];while(b!==0){a[d]=b;d=(b<0)?(0-b):b;b=e[d]}a[d]=0;this._hint(0,d,a);
return a},create:function(c,b){var a=SC.beget(this);a.initObservable();a.registerDependentKey("min","[]");
if(c&&c.isIndexSet){a._content=this._sc_sliceContent(c._content);a.max=c.max;a.length=c.length;
a.source=c.source}else{a._content=[0];if(c!==undefined){a.add(c,b)}}return a},isIndexSet:YES,HINT_SIZE:256,length:0,max:0,min:function(){var a=this._content,b=a[0];
return(b===0)?-1:(b>0)?0:Math.abs(b)}.property("[]").cacheable(),firstObject:function(){return(this.get("length")>0)?this.get("min"):undefined
}.property(),rangeStartForIndex:function(c){var f=this._content,a=this.get("max"),b,e,d;
if(c>=a){return a}if(Math.abs(f[c])>c){return c}d=c-(c%SC.IndexSet.HINT_SIZE);b=f[d];
if(b<0||b>c){b=d}e=Math.abs(f[b]);while(e<c){b=e;e=Math.abs(f[b])}return b},isEqual:function(c){if(c===this){return YES
}if(!c||!c.isIndexSet||(c.max!==this.max)||(c.length!==this.length)){return NO}var e=this._content,b=c._content,d=0,a=e[d];
do{if(b[d]!==a){return NO}d=Math.abs(a);a=e[d]}while(d!==0);return YES},indexBefore:function(b){if(b===0){return -1
}b--;var c=this._content,a=this.get("max"),d=this.rangeStartForIndex(b);if(!c){return null
}while((d===a)||(c[d]<0)){if(d===0){return -1}b=d-1;d=this.rangeStartForIndex(b)}return b
},indexAfter:function(b){var d=this._content,a=this.get("max"),e,c;if(!d||(b>=a)){return -1
}b++;e=this.rangeStartForIndex(b);c=d[e];while(c<0){if(c===0){return -1}b=e=Math.abs(c);
c=d[e]}return b},contains:function(g,c){var b,f,a,e,d;if(c===undefined){if(g===null||g===undefined){return NO
}if(typeof g===SC.T_NUMBER){c=1}else{if(g&&g.isIndexSet){if(g===this){return YES}b=g._content;
f=0;a=b[f];while(a!==0){if((a>0)&&!this.contains(f,a-f)){return NO}f=Math.abs(a);
a=b[f]}return YES}else{c=g.length;g=g.start}}}e=this.rangeStartForIndex(g);d=this._content[e];
return(d>0)&&(e<=g)&&(d>=(g+c))},intersects:function(f,c){var b,e,a,d;if(c===undefined){if(typeof f===SC.T_NUMBER){c=1
}else{if(f&&f.isIndexSet){if(f===this){return YES}b=f._content;e=0;a=b[e];while(a!==0){if((a>0)&&this.intersects(e,a-e)){return YES
}e=Math.abs(a);a=b[e]}return NO}else{c=f.length;f=f.start}}}e=this.rangeStartForIndex(f);
b=this._content;a=b[e];d=f+c;while(e<d){if(a===0){return NO}if((a>0)&&(a>f)){return YES
}e=Math.abs(a);a=b[e]}return NO},without:function(b,a){if(b===this){return SC.IndexSet.create()
}return this.clone().remove(b,a)},replace:function(c,a){if(a===undefined){if(typeof c===SC.T_NUMBER){a=1
}else{if(c&&c.isIndexSet){this._content=this._sc_sliceContent(c._content);this.beginPropertyChanges().set("max",c.max).set("length",c.length).set("source",c.source).enumerableContentDidChange().endPropertyChanges();
return this}else{a=c.length;c=c.start}}}var b=this.length;this._content.length=1;
this._content[0]=0;this.length=this.max=0;return this.add(c,a)},add:function(a,b){if(this.isFrozen){throw SC.FROZEN_ERROR
}var e,k,d;if(a&&a.isIndexSet){e=a._content;if(!e){return this}k=0;d=e[0];while(d!==0){if(d>0){this.add(k,d-k)
}k=d<0?0-d:d;d=e[k]}return this}else{if(b===undefined){if(a===null||a===undefined){return this
}else{if(typeof a===SC.T_NUMBER){b=1}else{b=a.length;a=a.start}}}else{if(b===null){b=1
}}}if(b<=0){return this}var f=this.get("max"),c=f,h,g;e=this._content;if(a===f){if(a>0){k=this.rangeStartForIndex(a-1);
d=e[k];if(d>0){delete e[f];e[k]=f=a+b;a=k}else{e[f]=f=a+b}}else{e[a]=f=b}e[f]=0;this.set("max",f);
this.set("length",this.length+b);b=f-a}else{if(a>f){e[f]=0-a;e[a]=a+b;e[a+b]=0;this.set("max",a+b);
this.set("length",this.length+b);b=a+b-f;a=f}else{k=this.rangeStartForIndex(a);d=e[k];
f=a+b;h=0;if((a>0)&&(k===a)&&(d<=0)){k=this.rangeStartForIndex(a-1);d=e[k]}if(d<0){e[k]=0-a;
if(Math.abs(d)>f){e[a]=0-f;e[f]=d}else{e[a]=d}}else{a=k;if(d>f){f=d}}k=a;while(k<f){g=e[k];
if(g===0){e[f]=0;d=f;h+=f-k}else{d=Math.abs(g);if(d>f){e[f]=g;d=f}if(g<0){h+=d-k}}delete e[k];
k=d}if((k=e[f])>0){delete e[f];f=k}e[a]=f;if(f>c){this.set("max",f)}this.set("length",this.get("length")+h);
b=f-a}}this._hint(a,b);if(h!==0){this.enumerableContentDidChange()}return this},remove:function(a,b){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(b===undefined){if(a===null||a===undefined){return this}else{if(typeof a===SC.T_NUMBER){b=1
}else{if(a.isIndexSet){a.forEachRange(this.remove,this);return this}else{b=a.length;
a=a.start}}}}if(b<=0){return this}var f=this.get("max"),c=f,e=this._content,l,d,k,g,h;
if(a>=f){return this}l=this.rangeStartForIndex(a);d=e[l];h=a+b;k=0;if((a>0)&&(l===a)&&(d>0)){l=this.rangeStartForIndex(a-1);
d=e[l]}if(d>0){e[l]=a;if(d>h){e[a]=h;e[h]=d}else{e[a]=d}}else{a=l;d=Math.abs(d);if(d>h){h=d
}}l=a;while(l<h){g=e[l];if(g===0){e[h]=0;d=h}else{d=Math.abs(g);if(d>h){e[h]=g;d=h
}if(g>0){k+=d-l}}delete e[l];l=d}if((l=e[h])<0){delete e[h];h=Math.abs(l)}if(e[h]===0){delete e[h];
e[a]=0;this.set("max",a)}else{e[a]=0-h}this.set("length",this.get("length")-k);b=h-a;
this._hint(a,b);if(k!==0){this.enumerableContentDidChange()}return this},_hint:function(g,d,c){if(c===undefined){c=this._content
}var b=SC.IndexSet.HINT_SIZE,a=Math.abs(c[g]),f=g-(g%b)+b,e=g+d;while(f<e){while((a!==0)&&(a<=f)){g=a;
a=Math.abs(c[g])}if(a===0){delete c[f]}else{if(f!==g){c[f]=g}}f+=b}},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR
}var a=this.length;this._content.length=1;this._content[0]=0;this.set("length",0).set("max",0);
if(a>0){this.enumerableContentDidChange()}},addEach:function(b){if(this.isFrozen){throw SC.FROZEN_ERROR
}this.beginPropertyChanges();var a=b.get("length");if(b.isSCArray){while(--a>=0){this.add(b.objectAt(a))
}}else{if(b.isEnumerable){b.forEach(function(c){this.add(c)},this)}}this.endPropertyChanges();
return this},removeEach:function(b){if(this.isFrozen){throw SC.FROZEN_ERROR}this.beginPropertyChanges();
var a=b.get("length");if(b.isSCArray){while(--a>=0){this.remove(b.objectAt(a))}}else{if(b.isEnumerable){b.forEach(function(c){this.remove(c)
},this)}}this.endPropertyChanges();return this},clone:function(){return SC.IndexSet.create(this)
},inspect:function(){var e=this._content,b=e.length,a=0,c=[],d;for(a=0;a<b;a++){d=e[a];
if(d!==undefined){c.push("%@:%@".fmt(a,d))}}return"SC.IndexSet<%@>".fmt(c.join(" , "))
},forEachRange:function(f,d){var b=this._content,e=0,a=b[e],c=this.source;if(d===undefined){d=null
}while(a!==0){if(a>0){f.call(d,e,a-e,this,c)}e=Math.abs(a);a=b[e]}return this},forEachIn:function(b,c,l,f){var g=this._content,k=0,h=0,d=b+c,a=this.source,e=g[k];
if(f===undefined){f=null}while(e!==0){if(k<b){k=b}while((k<e)&&(k<d)){l.call(f,k++,h++,this,a)
}if(k>=d){k=e=0}else{k=Math.abs(e);e=g[k]}}return this},lengthIn:function(g,d){var a=0;
if(d===undefined){if(g===null||g===undefined){return 0}else{if(typeof g===SC.T_NUMBER){d=1
}else{if(g.isIndexSet){g.forEachRange(function(k,h){a+=this.lengthIn(k,h)},this);
return a}else{d=g.length;g=g.start}}}}if(this.get("length")===0){return 0}var c=this._content,f=0,b=c[f],e=g+d;
while(f<e&&b!==0){if(b>0){a+=(b>e)?e-f:b-f}f=Math.abs(b);b=c[f]}return a},source:null,indexOf:function(d,c){var f=this.source;
if(!f){throw"%@.indexOf() requires source".fmt(this)}var b=f.get("length"),e=this._content,g=e[0]<0?Math.abs(e[0]):0,a;
while(g>=0&&g<b){a=f.indexOf(d,g);if(a<0){return -1}if(this.contains(a)){return a
}g=a+1}return -1},lastIndexOf:function(d,c){var e=this.source;if(!e){throw"%@.lastIndexOf() requires source".fmt(this)
}var b=e.get("length"),f=this.max-1,a;if(f>=b){f=b-1}while(f>=0){a=e.lastIndexOf(d,f);
if(a<0){return -1}if(this.contains(a)){return a}f=a+1}return -1},forEachObject:function(g,e){var d=this.source;
if(!d){throw"%@.forEachObject() requires source".fmt(this)}var c=this._content,f=0,a=0,b=c[f];
if(e===undefined){e=null}while(b!==0){while(f<b){g.call(e,d.objectAt(f),f,d,this);
f++}f=Math.abs(b);b=c[f]}return this},addObject:function(c,d){var e=this.source;if(!e){throw"%@.addObject() requires source".fmt(this)
}var b=e.get("length"),f=0,a;while(f>=0&&f<b){a=e.indexOf(c,f);if(a>=0){this.add(a);
if(d){return this}f=a++}else{return this}}return this},addObjects:function(b,a){b.forEach(function(c){this.addObject(c,a)
},this);return this},removeObject:function(c,d){var e=this.source;if(!e){throw"%@.removeObject() requires source".fmt(this)
}var b=e.get("length"),f=0,a;while(f>=0&&f<b){a=e.indexOf(c,f);if(a>=0){this.remove(a);
if(d){return this}f=a+1}else{return this}}return this},removeObjects:function(b,a){b.forEach(function(c){this.removeObject(c,a)
},this);return this},LOG_OBSERVING:NO,forEach:function(g,e){var c=this._content,f=0,a=0,d=this.source,b=c[f];
if(e===undefined){e=null}while(b!==0){while(f<b){g.call(e,f++,a++,this,d)}f=Math.abs(b);
b=c[f]}return this},nextObject:function(f,b,c){var e=this._content,d=c.next,a=this.get("max");
if(b===null){b=d=0}else{if(b>=a){delete c.next;return null}else{b++}}if(b===d){do{b=Math.abs(d);
d=e[b]}while(d<0);c.next=d}return b},toString:function(){var a=[];this.forEachRange(function(c,b){a.push(b===1?c:"%@..%@".fmt(c,c+b-1))
},this);return"SC.IndexSet<%@>".fmt(a.join(","))},max:0});SC.IndexSet.slice=SC.IndexSet.copy=SC.IndexSet.clone;
SC.IndexSet.EMPTY=SC.IndexSet.create().freeze();SC.LOGGER_LOG_DELIMITER=", ";SC.LOGGER_LOG_ERROR="ERROR: ";
SC.LOGGER_LOG_INFO="INFO: ";SC.LOGGER_LOG_WARN="WARNING: ";SC.LOGGER_LOG_DEBUG="DEBUG: ";
SC.Logger=SC.Object.create({debugEnabled:NO,exists:function(){return typeof(this.get("reporter"))!=="undefined"&&this.get("reporter")!=null
}.property("reporter").cacheable(),fallBackOnAlert:NO,fallBackOnLog:YES,format:YES,reporter:console,log:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.log)==="function"){if(this.get("format")){a.log(this._argumentsToString.apply(this,arguments))
}else{a.log.apply(a,arguments)}return true}else{if(this.fallBackOnAlert){var b=this.get("format")?this._argumentsToString.apply(this,arguments):arguments;
if(this.get("exists")&&typeof(a.alert)==="function"){a.alert(b)}else{alert(b)}return true
}}return false},debug:function(){var c=this.get("reporter");if(this.get("debugEnabled")!==YES){return false
}if(this.get("exists")&&(typeof c.debug==="function")){c.debug.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_DEBUG)
}return this.log.apply(this,b)}}return false},dir:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.dir)==="function"){a.dir.apply(a,arguments);return true
}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},dirxml:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.dirxml)==="function"){a.dirxml.apply(a,arguments);
return true}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},error:function(){var c=this.get("reporter");
if(this.get("exists")&&typeof(c.error)==="function"){c.error.apply(c,arguments);return true
}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_ERROR)
}return this.log.apply(this,b)}}return false},group:function(b){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.group)==="function"){a.group(b);return true}return false
},groupEnd:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.groupEnd)==="function"){a.groupEnd();
return true}return false},info:function(){var c=this.get("reporter");if(this.get("exists")&&typeof(c.info)==="function"){c.info.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_INFO)
}return this.log.apply(this,b)}}return false},profile:function(){var a=this.get("reporter");
if(this.get("exists")&&typeof(a.profile)==="function"){a.profile();return true}return false
},profileEnd:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.profileEnd)==="function"){a.profileEnd();
return true}return false},time:function(b){var a=this.get("reporter");if(this.get("exists")&&typeof(a.time)==="function"){a.time(b);
return true}return false},timeEnd:function(b){var a=this.get("reporter");if(this.get("exists")&&typeof(a.timeEnd)==="function"){a.timeEnd(b);
return true}return false},trace:function(){var a=this.get("reporter");if(this.get("exists")&&typeof(a.trace)==="function"){a.trace();
return true}return false},warn:function(){var c=this.get("reporter");if(this.get("exists")&&typeof(c.warn)==="function"){c.warn.apply(c,arguments);
return true}else{if(this.fallBackOnLog){var b=this._argumentsToArray(arguments);if(typeof(b.unshift)==="function"){b.unshift(SC.LOGGER_LOG_WARN)
}return this.log.apply(this,b)}}return false},_argumentsToArray:function(d){if(!d){return[]
}var b=[];for(var c=0;c<d.length;c++){b[c]=d[c]}return b},_argumentsToString:function(){var b="";
for(var a=0;a<arguments.length-1;a++){b+=arguments[a]+SC.LOGGER_LOG_DELIMITER}b+=arguments[arguments.length-1];
return b}});sc_require("private/observer_set");SC.RunLoop=SC.Object.extend({beginRunLoop:function(){this._start=new Date().getTime();
if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.beginRunLoop at %@".fmt(this._start))
}this._runLoopInProgress=YES;return this},isRunLoopInProgress:function(){return this._runLoopInProgress
}.property(),endRunLoop:function(){var a;if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ flushing application queues")
}do{a=this.flushApplicationQueues();if(!a){a=this._flushinvokeLastQueue()}}while(a);
this._start=null;if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ End")
}SC.RunLoop.lastRunLoopEnd=Date.now();this._runLoopInProgress=NO;return this},invokeOnce:function(a,b){if(b===undefined){b=a;
a=this}if(typeof b==="string"){b=a[b]}if(!this._invokeQueue){this._invokeQueue=SC.ObserverSet.create()
}this._invokeQueue.add(a,b);return this},invokeLast:function(a,b){if(b===undefined){b=a;
a=this}if(typeof b==="string"){b=a[b]}if(!this._invokeLastQueue){this._invokeLastQueue=SC.ObserverSet.create()
}this._invokeLastQueue.add(a,b);return this},flushApplicationQueues:function(){var b=NO,a=this._invokeQueue;
if(a&&a.targets>0){this._invokeQueue=null;b=YES;a.invokeMethods()}return SC.Binding.flushPendingChanges()||b
},_flushinvokeLastQueue:function(){var a=this._invokeLastQueue,b=NO;if(a&&a.targets>0){this._invokeLastQueue=null;
b=YES;if(b){a.invokeMethods()}}return b}});SC.RunLoop.currentRunLoop=null;SC.RunLoop.runLoopClass=SC.RunLoop;
SC.RunLoop.begin=function(){var a=this.currentRunLoop;if(!a){a=this.currentRunLoop=this.runLoopClass.create()
}a.beginRunLoop();return this};SC.RunLoop.end=function(){var a=this.currentRunLoop;
if(!a){throw"SC.RunLoop.end() called outside of a runloop!"}a.endRunLoop();return this
};SC.RunLoop.isRunLoopInProgress=function(){if(this.currentRunLoop){return this.currentRunLoop.get("isRunLoopInProgress")
}return NO};SC.run=function(f,d,b){if(b){var a=SC.RunLoop.isRunLoopInProgress();if(!a){SC.RunLoop.begin()
}f.call(d);if(!a){SC.RunLoop.end()}}else{try{SC.RunLoop.begin();if(f){f.call(d)}SC.RunLoop.end()
}catch(c){if(SC.ExceptionHandler){SC.ExceptionHandler.handleException(c)}if(!SC.browser.msie){throw c
}}}};sc_require("system/object");sc_require("mixins/enumerable");sc_require("mixins/copyable");
sc_require("mixins/freezable");SC.SelectionSet=SC.Object.extend(SC.Enumerable,SC.Freezable,SC.Copyable,{isSelectionSet:YES,length:function(){var a=0,b=this._sets,c=this._objects;
if(c){a+=c.get("length")}if(b){b.forEach(function(d){a+=d.get("length")})}return a
}.property().cacheable(),sources:function(){var c=[],d=this._sets,b=d?d.length:0,a,f,e;
for(a=0;a<b;a++){f=d[a];if(f&&f.get("length")>0&&f.source){c.push(f.source)}}return c
}.property().cacheable(),indexSetForSource:function(e){if(!e||!e.isSCArray){return null
}var b=this._indexSetCache,d=this._objects,c,a;if(!b){b=this._indexSetCache={}}c=b[SC.guidFor(e)];
if(c&&c._sourceRevision&&(c._sourceRevision!==e.propertyRevision)){c=null}if(!c){c=this._indexSetForSource(e,NO);
if(c&&c.get("length")===0){c=null}if(d){if(c){c=c.copy()}d.forEach(function(f){if((a=e.indexOf(f))>=0){if(!c){c=SC.IndexSet.create()
}c.add(a)}},this)}if(c){c=b[SC.guidFor(e)]=c.frozenCopy();c._sourceRevision=e.propertyRevision
}}return c},_indexSetForSource:function(f,g){if(g===undefined){g=YES}var d=SC.guidFor(f),c=this[d],e=this._sets,a=e?e.length:0,b=null;
if(c>=a){c=null}if(SC.none(c)){if(g&&!this.isFrozen){this.propertyWillChange("sources");
if(!e){e=this._sets=[]}b=e[a]=SC.IndexSet.create();b.source=f;this[d]=a;this.propertyDidChange("sources")
}}else{b=e?e[c]:null}return b},add:function(a,b,d){if(this.isFrozen){throw SC.FROZEN_ERROR
}var g,f,l,k,c,e,h,m;if(b===undefined&&d===undefined){if(!a){throw"Must pass params to SC.SelectionSet.add()"
}if(a.isIndexSet){return this.add(a.source,a)}if(a.isSelectionSet){g=a._sets;m=a._objects;
f=g?g.length:0;this.beginPropertyChanges();for(l=0;l<f;l++){k=g[l];if(k&&k.get("length")>0){this.add(k.source,k)
}}if(m){this.addObjects(m)}this.endPropertyChanges();return this}}k=this._indexSetForSource(a,YES);
c=this.get("length");h=k.get("length");e=c-h;k.add(b,d);this._indexSetCache=null;
e+=k.get("length");if(e!==c){this.propertyDidChange("length");this.enumerableContentDidChange();
if(h===0){this.notifyPropertyChange("sources")}}return this},remove:function(a,b,d){if(this.isFrozen){throw SC.FROZEN_ERROR
}var g,f,l,k,c,e,h,m;if(b===undefined&&d===undefined){if(!a){throw"Must pass params to SC.SelectionSet.remove()"
}if(a.isIndexSet){return this.remove(a.source,a)}if(a.isSelectionSet){g=a._sets;m=a._objects;
f=g?g.length:0;this.beginPropertyChanges();for(l=0;l<f;l++){k=g[l];if(k&&k.get("length")>0){this.remove(k.source,k)
}}if(m){this.removeObjects(m)}this.endPropertyChanges();return this}}k=this._indexSetForSource(a,YES);
c=this.get("length");e=c-k.get("length");if(k&&(m=this._objects)){if(d!==undefined){b=SC.IndexSet.create(b,d);
d=undefined}m.forEach(function(n){l=a.indexOf(n);if(b.contains(l)){m.remove(n);e--
}},this)}k.remove(b,d);h=k.get("length");e+=h;this._indexSetCache=null;if(e!==c){this.propertyDidChange("length");
this.enumerableContentDidChange();if(h===0){this.notifyPropertyChange("sources")}}return this
},contains:function(b,d,a){if(d===undefined&&a===undefined){return this.containsObject(b)
}var c=this.indexSetForSource(b);if(!c){return NO}return c.contains(d,a)},intersects:function(b,d,a){var c=this.indexSetForSource(b,NO);
if(!c){return NO}return c.intersects(d,a)},_TMP_ARY:[],addObject:function(b){var c=this._TMP_ARY,a;
c[0]=b;a=this.addObjects(c);c.length=0;return a},addObjects:function(a){var d=this._objects,b,c;
if(!d){d=this._objects=SC.CoreSet.create()}b=d.get("length");d.addEach(a);c=d.get("length");
this._indexSetCache=null;if(c!==b){this.propertyDidChange("length");this.enumerableContentDidChange()
}return this},removeObject:function(b){var c=this._TMP_ARY,a;c[0]=b;a=this.removeObjects(c);
c.length=0;return a},removeObjects:function(b){var e=this._objects,c,d,a;if(!e){return this
}c=e.get("length");e.removeEach(b);d=e.get("length");if(a=this._sets){a.forEach(function(f){c+=f.get("length");
f.removeObjects(b);d+=f.get("length")},this)}this._indexSetCache=null;if(d!==c){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},containsObject:function(c){var e=this._objects;
if(e&&e.contains(c)){return YES}var d=this._sets,b=d?d.length:0,a,f;for(a=0;a<b;a++){f=d[a];
if(f&&f.indexOf(c)>=0){return YES}}return NO},constrain:function(d){var e,b,a,c;this.beginPropertyChanges();
this.get("sources").forEach(function(f){if(f===d){return}var g=this._indexSetForSource(d,NO);
if(g){this.remove(d,g)}},this);e=this._indexSetForSource(d,NO);if(e&&((a=e.get("max"))>(b=d.get("length")))){this.remove(d,b,a-b)
}if(c=this._objects){c.forEach(function(f){if(d.indexOf(f)<0){this.removeObject(f)
}},this)}this.endPropertyChanges();return this},isEqual:function(g){var f,d,b,a,c,e;
if(!g||!g.isSelectionSet){return NO}if(g===this){return YES}if((this._sets===g._sets)&&(this._objects===g._objects)){return YES
}if(this.get("length")!==g.get("length")){return NO}f=this._objects;d=g._objects;
if(f||d){if((f?f.get("length"):0)!==(d?d.get("length"):0)){return NO}if(f&&!f.isEqual(d)){return NO
}}c=this.get("sources");a=c.get("length");for(b=0;b<a;b++){e=c.objectAt(b);f=this._indexSetForSource(e,NO);
d=this._indexSetForSource(e,NO);if(!!d!==!!f){return NO}if(f&&!f.isEqual(d)){return NO
}}return YES},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}if(this._sets){this._sets.length=0
}if(this._objects){this._objects=null}this._indexSetCache=null;this.propertyDidChange("length");
this.enumerableContentDidChange();this.notifyPropertyChange("sources");return this
},copy:function(){var c=this.constructor.create(),d=this._sets,b=d?d.length:0,a,e;
if(d&&b>0){d=c._sets=d.slice();for(a=0;a<b;a++){if(!(e=d[a])){continue}e=d[a]=e.copy();
c[SC.guidFor(e.source)]=a}}if(this._objects){c._objects=this._objects.copy()}return c
},freeze:function(){if(this.isFrozen){return this}var a=this._sets,b=a?a.length:0,c;
while(--b>=0){if(c=a[b]){c.freeze()}}if(this._objects){this._objects.freeze()}return arguments.callee.base.apply(this,arguments)
},toString:function(){var a=this._sets||[];a=a.map(function(b){return b.toString().replace("SC.IndexSet",SC.guidFor(b.source))
},this);if(this._objects){a.push(this._objects.toString())}return"SC.SelectionSet:%@<%@>".fmt(SC.guidFor(this),a.join(","))
},firstObject:function(){var b=this._sets,c=this._objects;if(b&&b.get("length")>0){var e=b?b[0]:null,d=e?e.source:null,a=e?e.firstObject():-1;
if(d&&a>=0){return d.objectAt(a)}}return c?c.firstObject():undefined}.property(),nextObject:function(c,e,b){var d,a;
if(c===0){d=b.objects=[];this.forEach(function(f){d.push(f)},this);b.max=d.length
}d=b.objects;a=d[c];if(c+1>=b.max){b.objects=b.max=null}return a},forEach:function(g,e){var c=this._sets,d=this._objects,b=c?c.length:0,f,a;
for(a=0;a<b;a++){f=c[a];if(f){f.forEachObject(g,e)}}if(d){d.forEach(g,e)}return this
}});SC.SelectionSet.prototype.clone=SC.SelectionSet.prototype.copy;SC.SelectionSet.EMPTY=SC.SelectionSet.create().freeze();
sc_require("mixins/enumerable");sc_require("mixins/array");sc_require("mixins/observable");
sc_require("mixins/delegate_support");SC.SparseArray=SC.Object.extend(SC.Observable,SC.Enumerable,SC.Array,SC.DelegateSupport,{_requestingLength:0,_requestingIndex:0,length:function(){var a=this.delegate;
if(a&&SC.none(this._length)&&a.sparseArrayDidRequestLength){this._requestingLength++;
a.sparseArrayDidRequestLength(this);this._requestingLength--}return this._length||0
}.property().cacheable(),provideLength:function(a){if(SC.none(a)){this._sa_content=null
}if(a!==this._length){this._length=a;if(this._requestingLength<=0){this.enumerableContentDidChange()
}}return this},rangeWindowSize:1,requestedRangeIndex:[],objectAt:function(a){var c=this._sa_content,b;
if(!c){c=this._sa_content=[]}if((b=c[a])===undefined){this.requestIndex(a);b=c[a]
}return b},definedIndexes:function(d){var c=SC.IndexSet.create(),e=this._sa_content,b,a;
if(!e){return c.freeze()}if(d){d.forEach(function(f){if(e[f]!==undefined){c.add(f)
}})}else{a=e.length;for(b=0;b<a;b++){if(e[b]!==undefined){c.add(b)}}}return c.freeze()
},_TMP_RANGE:{},requestIndex:function(b){var c=this.delegate;if(!c){return this}var a=this.get("rangeWindowSize"),e=b;
if(a>1){e=e-Math.floor(e%a)}if(a<1){a=1}this._requestingIndex++;if(c.sparseArrayDidRequestRange){var d=this._TMP_RANGE;
if(this.wasRangeRequested(e)===-1){d.start=e;d.length=a;c.sparseArrayDidRequestRange(this,d);
this.requestedRangeIndex.push(e)}}else{if(c.sparseArrayDidRequestIndex){while(--a>=0){c.sparseArrayDidRequestIndex(this,e+a)
}}}this._requestingIndex--;return this},wasRangeRequested:function(c){var b,a;for(b=0,a=this.requestedRangeIndex.length;
b<a;b++){if(this.requestedRangeIndex[b]===c){return b}}return -1},rangeRequestCompleted:function(b){var a=this.wasRangeRequested(b);
if(a>=0){this.requestedRangeIndex.removeAt(a,1);return YES}return NO},provideObjectsInRange:function(b,e){var c=this._sa_content;
if(!c){c=this._sa_content=[]}var d=b.start,a=b.length;while(--a>=0){c[d+a]=e[a]}if(this._requestingIndex<=0){this.enumerableContentDidChange()
}return this},_TMP_PROVIDE_ARRAY:[],_TMP_PROVIDE_RANGE:{length:1},provideObjectAtIndex:function(c,b){var d=this._TMP_PROVIDE_ARRAY,a=this._TMP_PROVIDE_RANGE;
d[0]=b;a.start=c;return this.provideObjectsInRange(a,d)},objectsDidChangeInRange:function(a){var b=this._sa_content;
if(b){if(a.start===0&&SC.maxRange(a)>=b.length){this._sa_content=null}else{var d=a.start,c=Math.min(d+a.length,b.length);
while(--c>=d){b[c]=undefined}}}this.enumerableContentDidChange(a);return this},indexOf:function(c){var a=this.delegate;
if(a&&a.sparseArrayDidRequestIndexOf){return a.sparseArrayDidRequestIndexOf(this,c)
}else{var b=this._sa_content;if(!b){b=this._sa_content=[]}return b.indexOf(c)}},replace:function(b,g,e){e=e||[];
var c=this.delegate;if(c){if(!c.sparseArrayShouldReplace||!c.sparseArrayShouldReplace(this,b,g,e)){return this
}}var d=this._sa_content;if(!d){d=this._sa_content=[]}d.replace(b,g,e);var a=e?(e.get?e.get("length"):e.length):0;
var f=a-g;if(!SC.none(this._length)){this.propertyWillChange("length");this._length+=f;
this.propertyDidChange("length")}this.enumerableContentDidChange(b,g,f);return this
},reset:function(){this._sa_content=null;this._length=null;this.enumerableContentDidChange();
this.invokeDelegateMethod(this.delegate,"sparseArrayDidReset",this);return this}});
SC.SparseArray.array=function(a){return this.create({_length:a||0})};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/runtime")
}SC.Locale=SC.Object.extend({init:function(){if(!this.language){SC.Locale._assignLocales()
}if(!this.hasStrings){var c=this._deprecatedLanguageCodes||[];c.push(this.language);
var b=c.length;var a=null;while(!a&&--b>=0){a=String[c[b]]}if(a){this.hasStrings=YES;
this.strings=a}}},hasStrings:NO,strings:{},toString:function(){if(!this.language){SC.Locale._assignLocales()
}return"SC.Locale["+this.language+"]"+SC.guidFor(this)},locWithDefault:function(b,c){var a=this.strings[b];
if(SC.typeOf(a)===SC.T_STRING){return a}else{if(SC.typeOf(c)===SC.T_STRING){return c
}}return b}});SC.Locale.mixin({useAutodetectedLanguage:NO,preferredLanguage:null,createCurrentLocale:function(){var c=(String.useAutodetectedLanguage!==undefined)?String.useAutodetectedLanguage:this.useAutodetectedLanguage;
var b=(String.preferredLanguage!==undefined)?String.preferredLanguage:this.preferredLanguage;
var d=((c)?SC.browser.language:null)||b||SC.browser.language||"en";d=SC.Locale.normalizeLanguage(d);
var a=this.localeClassFor(d);if(d!=this.currentLanguage){this.currentLanguage=d;this.currentLocale=a.create()
}return this.currentLocale},localeClassFor:function(c){c=SC.Locale.normalizeLanguage(c);
var b,a=this.locales[c];if(!a&&((b=c.split("-")[0])!==c)&&(a=this.locales[b])){a=this.locales[c]=a.extend()
}if(!a){a=this.locales[c]=this.locales.en.extend()}return a},define:function(b,c){var a;
if(c===undefined&&(SC.typeOf(b)!==SC.T_STRING)){a=this;c=b}else{a=SC.Locale.localeClassFor(b)
}SC.mixin(a.prototype,c);return a},options:function(){return this.prototype},addStrings:function(b){var a=this.prototype.strings;
if(a){if(!this.prototype.hasOwnProperty("strings")){this.prototype.strings=SC.clone(a)
}}else{a=this.prototype.strings={}}if(b){this.prototype.strings=SC.mixin(a,b)}this.prototype.hasStrings=YES;
return this},_map:{english:"en",french:"fr",german:"de",japanese:"ja",jp:"ja",spanish:"es"},normalizeLanguage:function(a){if(!a){return"en"
}return SC.Locale._map[a.toLowerCase()]||a},_assignLocales:function(){for(var a in this.locales){this.locales[a].prototype.language=a
}},toString:function(){if(!this.prototype.language){SC.Locale._assignLocales()}return"SC.Locale["+this.prototype.language+"]"
},extend:function(){var a=SC.Object.extend.apply(this,arguments);a.addStrings=SC.Locale.addStrings;
a.define=SC.Locale.define;a.options=SC.Locale.options;a.toString=SC.Locale.toString;
return a}});SC.Locale.locales={en:SC.Locale.extend({_deprecatedLanguageCodes:["English"]}),fr:SC.Locale.extend({_deprecatedLanguageCodes:["French"]}),de:SC.Locale.extend({_deprecatedLanguageCodes:["German"]}),ja:SC.Locale.extend({_deprecatedLanguageCodes:["Japanese","jp"]}),es:SC.Locale.extend({_deprecatedLanguageCodes:["Spanish"]})};
SC.stringsFor=function(c,b){var a=SC.Locale.localeClassFor(c);a.addStrings(b);return this
};sc_require("system/locale");SC.stringsFor("English",{"_SC.DateTime.dayNames":"Sunday Monday Tuesday Wednesday Thursday Friday Saturday","_SC.DateTime.abbreviatedDayNames":"Sun Mon Tue Wed Thu Fri Sat","_SC.DateTime.monthNames":"January February March April May June July August September October November December","_SC.DateTime.abbreviatedMonthNames":"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"});
SC.DROP_ON=1;SC.DROP_BEFORE=2;SC.DROP_AFTER=4;SC.DROP_ANY=7;SC.SAFARI_FOCUS_BEHAVIOR=YES;
SC.mixin({data:function(c,b,d){c=(c===window)?"@window":c;var e=SC.hashFor(c);var a=SC._data_cache;
if(!a){SC._data_cache=a={}}var f=a[e];if(b&&!f){a[e]=f={}}if(f&&(d!==undefined)){f[b]=d
}return(b)?f[b]:f},removeData:function(d,c){d=(d===window)?"@window":d;var e=SC.hashFor(d);
var a=SC._data_cache;if(!a){return undefined}var f=a[e];if(!f){return undefined}var b=(c)?f[c]:f;
if(c){delete f[c]}else{delete a[e]}return b}});SC.mixin(Function.prototype,{invokeLater:function(g,a){if(a===undefined){a=1
}var e=this;if(arguments.length>2){var b=SC.$A(arguments).slice(2,arguments.length);
b.unshift(g);var d=this,c=e;e=function(){return c.apply(d,b.slice(1))}}return SC.Timer.schedule({target:g,action:e,interval:a})
}});SC.Controller=SC.Object.extend({isEditable:YES});SC.SelectionSupport={hasSelectionSupport:YES,allowsSelection:YES,allowsMultipleSelection:YES,allowsEmptySelection:YES,firstSelectableObject:function(){return this.get("firstObject")
}.property(),selection:function(c,f){var b=this._scsel_selection,g=b?b.get("length"):0,d,e,a;
if((f===undefined)||!this.get("allowsSelection")){f=b}a=(f&&f.isEnumerable)?f.get("length"):0;
if((a>1)&&!this.get("allowsMultipleSelection")){if(g>1){f=SC.SelectionSet.create().addObject(b.get("firstObject")).freeze();
a=1}else{f=b;a=g}}if((a===0)&&!this.get("allowsEmptySelection")){if(g===0){f=this.get("firstSelectableObject");
if(f){f=SC.SelectionSet.create().addObject(f).freeze()}else{f=SC.SelectionSet.EMPTY
}a=f.get("length")}else{f=b;a=g}}if(a===0){f=SC.SelectionSet.EMPTY}f=f.frozenCopy();
this._scsel_selection=f;return f}.property("arrangedObjects","allowsEmptySelection","allowsMultipleSelection","allowsSelection").cacheable(),hasSelection:function(){var a=this.get("selection");
return !!a&&(a.get("length")>0)}.property("selection").cacheable(),selectObjects:function(b,c){if(!b||b.get("length")===0){if(!c){this.set("selection",SC.SelectionSet.EMPTY)
}return this}var a=this.get("selection");if(c&&a){a=a.copy()}else{a=SC.SelectionSet.create()
}a.addObjects(b).freeze();this.set("selection",a);return this},selectObject:function(a,b){if(a===null){if(!b){this.set("selection",null)
}return this}else{return this.selectObjects([a],b)}},deselectObjects:function(b){if(!b||b.get("length")===0){return this
}var a=this.get("selection");if(!a||a.get("length")===0){return this}a=a.copy().removeObjects(b).freeze();
this.set("selection",a.freeze());return this},deselectObject:function(a){if(!a){return this
}else{return this.deselectObjects([a])}},updateSelectionAfterContentChange:function(){var a=this.get("arrangedObjects");
var b=this.get("selection");var d=this.get("allowsEmptySelection");var c;if(!b){return this
}c=b.indexSetForSource(a);if((c&&(c.get("length")!==b.get("length")))||(!c&&(b.get("length")>0))){b=b.copy().constrain(a).freeze();
this.set("selection",b)}if((b.get("length")===0)&&a&&(a.get("length")>0)&&!d){this.selectObject(this.get("firstSelectableObject"),NO)
}return this}};sc_require("controllers/controller");sc_require("mixins/selection_support");
SC.ArrayController=SC.Controller.extend(SC.Array,SC.SelectionSupport,{content:null,isEditable:YES,orderBy:null,allowsSingleContent:YES,destroyOnRemoval:NO,arrangedObjects:function(){return this
}.property().cacheable(),canRemoveContent:function(){var b=this.get("content"),a;
a=!!b&&this.get("isEditable")&&this.get("hasContent");if(a){return !b.isEnumerable||(SC.typeOf(b.removeObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable","hasContent"),canReorderContent:function(){var b=this.get("content"),a;
a=!!b&&this.get("isEditable")&&!this.get("orderBy");return a&&!!b.isSCArray}.property("content","isEditable","orderBy"),canAddContent:function(){var b=this.get("content"),a;
a=b&&this.get("isEditable")&&b.isEnumerable;if(a){return(SC.typeOf(b.addObject)===SC.T_FUNCTION)||(SC.typeOf(b.pushObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable"),hasContent:function(){var a=this.get("content");
return !!a&&(!!a.isEnumerable||!!this.get("allowsSingleContent"))}.property("content","allowSingleContent"),status:function(){var b=this.get("content"),a=b?b.get("status"):null;
return a?a:SC.Record.READY}.property().cacheable(),addObject:function(a){if(!this.get("canAddContent")){throw"%@ cannot add content".fmt(this)
}var b=this.get("content");if(b.isSCArray){b.pushObject(a)}else{if(b.addObject){b.addObject(a)
}else{throw"%@.content does not support addObject".fmt(this)}}return this},removeObject:function(a){if(!this.get("canRemoveContent")){throw"%@ cannot remove content".fmt(this)
}var b=this.get("content");if(b.isEnumerable){b.removeObject(a)}else{this.set("content",null)
}if(this.get("destroyOnRemoval")&&a.destroy){a.destroy()}return this},length:function(){var a=this._scac_observableContent();
return a?a.get("length"):0}.property().cacheable(),objectAt:function(a){var b=this._scac_observableContent();
return b?b.objectAt(a):undefined},replace:function(g,f,d){if(!d||d.get("length")===0){if(!this.get("canRemoveContent")){throw"%@ cannot remove objects from the current content".fmt(this)
}}else{if(!this.get("canReorderContent")){throw"%@ cannot add or reorder the current content".fmt(this)
}}var c=this.get("content");var b=[],a,e;if(this.get("destroyOnRemoval")){for(a=0;
a<f;a++){b.push(c.objectAt(a+g))}}if(c){c.replace(g,f,d)}for(a=0,e=b.length;a<e;a++){b[a].destroy()
}b=null;return this},indexOf:function(b,a){var c=this._scac_observableContent();return c?c.indexOf(b,a):-1
},init:function(){arguments.callee.base.apply(this,arguments);this._scac_contentDidChange()
},_scac_cached:NO,_scac_observableContent:function(){var b=this._scac_cached;if(b!==NO){return b
}var e=this.get("content"),f,d,c,a;if(SC.none(e)){return this._scac_cached=[]}if(!e.isEnumerable){b=this.get("allowsSingleContent")?[e]:[];
return(this._scac_cached=b)}f=this.get("orderBy");if(!f){if(e.isSCArray){return(this._scac_cached=e)
}else{throw"%@.orderBy is required for unordered content".fmt(this)}}switch(SC.typeOf(f)){case SC.T_STRING:f=[f];
break;case SC.T_FUNCTION:d=f;break;case SC.T_ARRAY:break;default:throw"%@.orderBy must be Array, String, or Function".fmt(this)
}if(!d){a=f.get("length");d=function(l,h){var g=0,k=0,m,q,n,r;for(g=0;(g<a)&&(k===0);
g++){m=f.objectAt(g);r=NO;if(m.indexOf("ASC")>-1){m=m.split("ASC ")[1]}else{if(m.indexOf("DESC")>-1){m=m.split("DESC ")[1];
r=YES}}if(!l){q=l}else{if(l.isObservable){q=l.get(m)}else{q=l[m]}}if(!h){n=h}else{if(h.isObservable){n=h.get(m)
}else{n=h[m]}}k=SC.compare(q,n);if(r){k=(-1)*k}}return k}}b=[];e.forEach(function(g){b.push(g)
});b.sort(d);d=null;return(this._scac_cached=b)},_scac_contentDidChange:function(){this._scac_cached=NO;
var h=this.get("content"),d=!!this.get("orderBy"),k=this._scac_content,a=this._scac_length||0,g=this._scac_rangeObserver,b=this._scac_rangeDidChange,f=this._scac_enumerableDidChange,c=this._scac_contentStatusDidChange,e;
if(k===h){return this}if(k){if(g&&k.isSCArray){k.removeRangeObserver(g)}else{if(k.isEnumerable){k.removeObserver("[]",this,f)
}}k.removeObserver("status",this,c)}g=null;this._scac_cached=NO;this._scac_content=h;
if(h){if(!d&&h.isSCArray){g=h.addRangeObserver(null,this,b)}else{if(h.isEnumerable){h.addObserver("[]",this,f)
}}e=h.isEnumerable?h.get("length"):1;h.addObserver("status",this,c)}else{e=SC.none(h)?0:1
}this._scac_rangeObserver=g;this._scac_length=e;this._scac_contentStatusDidChange();
this.enumerableContentDidChange(0,e,e-a);this.updateSelectionAfterContentChange()
}.observes("content"),_scac_enumerableDidChange:function(){var a=this.get("content"),c=a?a.get("length"):0,b=this._scac_length;
this._scac_length=c;this.beginPropertyChanges();this._scac_cached=NO;this.enumerableContentDidChange(0,c,c-b);
this.endPropertyChanges();this.updateSelectionAfterContentChange()}.observes("orderBy"),_scac_rangeDidChange:function(e,d,b,a){if(b!=="[]"){return
}var c=this.get("content");this._scac_length=c.get("length");this._scac_cached=NO;
if(a){this.beginPropertyChanges();a.forEachRange(function(g,f){this.enumerableContentDidChange(g,f,0)
},this);this.endPropertyChanges();this.updateSelectionAfterContentChange()}},_scac_contentStatusDidChange:function(){this.notifyPropertyChange("status")
}});require("controllers/controller");SC.ObjectController=SC.Controller.extend({content:null,allowsMultipleContent:NO,hasContent:function(){return !SC.none(this.get("observableContent"))
}.property("observableContent"),isEditable:YES,observableContent:function(){var b=this.get("content"),a,c;
if(b&&b.isEnumerable){a=b.get("length");c=this.get("allowsMultipleContent");if(a===1){b=b.firstObject()
}else{if(a===0||!c){b=null}}if(b&&!c&&b.isEnumerable){b=null}}return b}.property("content","allowsMultipleContent").cacheable(),destroy:function(){var a=this.get("observableContent");
if(a&&SC.typeOf(a.destroy)===SC.T_FUNCTION){a.destroy()}this.set("content",null);
return this},contentPropertyDidChange:function(b,a){if(a==="*"){this.allPropertiesDidChange()
}else{this.notifyPropertyChange(a)}},unknownProperty:function(b,d){if(b==="content"){if(d!==undefined){this.content=d
}return this.content}var c=this.get("observableContent"),f,e,a;if(c===null||c===undefined){return undefined
}if(d===undefined){if(c.isEnumerable){d=c.getEach(b);f=d.get("length");if(f>0){a=YES;
e=d.objectAt(0);while((--f>0)&&a){if(e!==d.objectAt(f)){a=NO}}if(a){d=e}}else{d=undefined
}}else{d=(c.isObservable)?c.get(b):c[b]}}else{if(!this.get("isEditable")){throw"%@.%@ is not editable".fmt(this,b)
}if(c.isEnumerable){c.setEach(b,d)}else{if(c.isObservable){c.set(b,d)}else{c[b]=d
}}}return d},init:function(){arguments.callee.base.apply(this,arguments);if(this.get("content")){this._scoc_contentDidChange()
}if(this.get("observableContent")){this._scoc_observableContentDidChange()}},_scoc_contentDidChange:function(){var b=this._scoc_content,c=this.get("content");
if(b!==c){this._scoc_content=c;var a=this._scoc_enumerableContentDidChange;if(b&&b.isEnumerable){b.removeObserver("[]",this,a)
}if(c&&c.isEnumerable){c.addObserver("[]",this,a)}}}.observes("content"),_scoc_observableContentDidChange:function(){var b=this._scoc_observableContent,d=this.get("observableContent"),a=this.contentPropertyDidChange,c=this._scoc_enumerableContentDidChange;
if(b===d){return this}this._scoc_observableContent=d;if(b){if(b.isEnumerable){b.removeObserver("[]",this,c)
}else{if(b.isObservable){b.removeObserver("*",this,a)}}}if(d){if(d.isEnumerable){d.addObserver("[]",this,c)
}else{if(d.isObservable){d.addObserver("*",this,a)}}}if((b&&b.isEnumerable)||(d&&d.isEnumerable)){this._scoc_enumerableContentDidChange()
}else{this.contentPropertyDidChange(d,"*")}}.observes("observableContent"),_scoc_enumerableContentDidChange:function(){var b=this.get("observableContent"),c=this._scoc_observableContentItems,a=this.contentPropertyDidChange;
if(c){c.forEach(function(d){if(d.isObservable){d.removeObserver("*",this,a)}},this);
c.clear()}if(b&&b.isEnumerable){if(!c){c=SC.Set.create()}b.forEach(function(d){if(c.contains(d)){return
}c.add(d);if(d.isObservable){d.addObserver("*",this,a)}},this)}else{c=null}this._scoc_observableContentItems=c;
this.contentPropertyDidChange(b,"*");return this}});SC.TreeItemContent={isTreeItemContent:YES,treeItemChildren:null,treeItemIsExpanded:YES,treeItemIsGrouped:NO,treeItemDisclosureState:function(b,a){return this.get("treeItemIsExpanded")?SC.BRANCH_OPEN:SC.BRANCH_CLOSED
},treeItemCollapse:function(b,a){this.setIfChanged("treeItemIsExpanded",NO)},treeItemExpand:function(b,a){this.setIfChanged("treeItemIsExpanded",YES)
},treeItemBranchIndexes:function(e,c){var d=this.get("treeItemChildren"),b,g,a,f;
if(!d){return null}b=SC.IndexSet.create();g=d.get("length");for(a=0;a<g;a++){if(!(f=d.objectAt(a))){continue
}if(!f.get("treeItemChildren")){continue}if(f.treeItemDisclosureState(this,a)!==SC.LEAF_NODE){b.add(a)
}}return b.get("length")>0?b:null}};SC.BRANCH_OPEN=17;SC.BRANCH_CLOSED=18;SC.LEAF_NODE=32;
SC.CollectionContent={isCollectionContent:YES,contentIndexIsSelected:function(b,c,a){var d=b.get("selection");
return d?d.contains(c,a):NO},contentIndexIsEnabled:function(b,c,a){return b.get("isEnabled")
},contentGroupIndexes:function(a,b){return null},contentIndexIsGroup:function(b,c,a){return NO
},contentIndexOutlineLevel:function(b,c,a){return -1},contentIndexDisclosureState:function(b,c,a){return SC.LEAF_NODE
},contentIndexExpand:function(b,c,a){console.log("contentIndexExpand(%@, %@, %@)".fmt(b,c,a))
},contentIndexCollapse:function(b,c,a){console.log("contentIndexCollapse(%@, %@, %@)".fmt(b,c,a))
}};sc_require("mixins/tree_item_content");sc_require("mixins/collection_content");
SC.TreeItemObserver=SC.Object.extend(SC.Array,SC.CollectionContent,{item:null,delegate:null,parentObserver:null,parentItem:function(){var a=this.get("parentObserver");
return a?a.get("item"):null}.property("parentObserver").cacheable(),index:null,outlineLevel:0,children:null,disclosureState:SC.BRANCH_OPEN,branchIndexes:function(){var e=this.get("item"),b,f,a,d,c;
if(!e){return SC.IndexSet.EMPTY}else{if(e.isTreeItemContent){f=this.get("parentItem");
a=this.get("index");return e.treeItemBranchIndexes(f,a)}else{d=this.get("children");
if(!d){return null}c=SC.IndexSet.create();b=d.get("length");f=e;for(a=0;a<b;a++){if(!(e=d.objectAt(a))){continue
}if(!this._computeChildren(e,f,a)){continue}if(this._computeDisclosureState(e,f,a)!==SC.LEAF_NODE){c.add(a)
}}return c.get("length")>0?c:null}}}.property("children").cacheable(),isHeaderVisible:function(){return !!this.get("parentObserver")
}.property("parentObserver").cacheable(),length:0,objectAt:function(d){var a=this.get("length"),f=this.get("item"),b=this._objectAtCache,h=d,g=0,c,e;
if(d>=a){return undefined}if(this.get("isHeaderVisible")){if(d===0){return f}else{h--
}}f=null;if(!b){b=this._objectAtCache=[]}if((f=b[d])!==undefined){return f}e=this.get("children");
if(!e){return undefined}if(c=this.get("branchIndexes")){c.forEach(function(m){if(f||(m>h)){return
}var l=this.branchObserverAt(m),k;if(!l){return}k=l.get("length");if(m+k>h){f=l.objectAt(h-m);
h=-1}else{h-=k-1}},this)}if(h>=0){f=e.objectAt(h)}b[d]=f;return f},replace:function(a,b,l,d){var k=a,g=null,e,f,h;
if(d===undefined){d=SC.DROP_BEFORE}if(this.get("isHeaderVisible")){k--}if(k<0){throw"Tree Item cannot replace itself"
}if(e=this.get("branchIndexes")){e.forEach(function(m){if(g||(m>=k)){return}if(!(g=this.branchObserverAt(m))){return
}f=g.get("length");if((m+f===k)&&d===SC.DROP_AFTER){k-=m}else{if(m+f>k){k-=m}else{k-=f-1;
g=null}}},this)}if(g){g.replace(k,b,l,d);return this}h=k+b;if(b>1&&e){e.forEachIn(k,e.get("max")-k,function(m){if(m>h){return
}if(!(g=this.branchObserverAt(m))){return}f=g.get("length");h-=f-1},this)}b=h-k;var c=this.get("children");
if(!c){throw"cannot replace() tree item with no children"}if((b<0)||(h>c.get("length"))){throw"replace() range must lie within a single tree item"
}c.replace(k,b,l,d);return this},observerContentDidChange:function(g,f,e){this.invalidateBranchObserversAt(g);
this._objectAtCache=this._outlineLevelCache=null;this._disclosureStateCache=null;
this._contentGroupIndexes=NO;this.notifyPropertyChange("branchIndexes");var b=this.get("length"),c=this._computeLength(),a=this.get("parentObserver"),d;
if(b!==c){this.set("length",c)}if(!this._notifyParent){return this}if(a){d=SC.IndexSet.create(this.get("index"));
a._childrenRangeDidChange(a.get("children"),null,"[]",d)}else{if(b===c){f=this.expandChildIndex(g+f);
g=this.expandChildIndex(g);f=f-g;e=0}else{g=this.expandChildIndex(g);f=c-g;e=c-b}this.enumerableContentDidChange(g,f,e)
}},expandChildIndex:function(c){var b=c;if(this.get("isHeaderVisible")){c++}var a=this.get("branchIndexes");
if(!a||a.get("length")===0){return b}a.forEachIn(0,c,function(d){b+=this.branchObserverAt(d).get("length")-1
},this);return b},_contentGroupIndexes:NO,contentGroupIndexes:function(g,e){if(e!==this){return null
}var f=this._contentGroupIndexes;if(f!==NO){return f}if(this.get("parentObserver")){return null
}var l=this.get("item"),k,b,d,h,c,a;if(l&&l.isTreeItemContent){k=l.get("treeItemIsGrouped")
}else{k=!!this.delegate.get("treeItemIsGrouped")}if(k){f=SC.IndexSet.create();b=this.get("branchIndexes");
a=this.get("children");d=a?a.get("length"):0;h=c=0;if(b){b.forEach(function(n){f.add(h,(n+1)-c);
h+=(n+1)-c;c=n+1;var m=this.branchObserverAt(n);if(m){h+=m.get("length")-1}},this)
}if(c<d){f.add(h,d-c)}}else{f=null}this._contentGroupIndexes=f;return f},contentIndexIsGroup:function(b,d,a){var c=this.contentGroupIndexes(b,d);
return c?c.contains(a):NO},contentIndexOutlineLevel:function(l,g,e){if(g!==this){return -1
}var a=this._outlineLevelCache;if(a&&(a[e]!==undefined)){return a[e]}if(!a){a=this._outlineLevelCache=[]
}var f=this.get("length"),m=e,d=0,h=null,c,b,k;if(e>=f){return -1}if(this.get("isHeaderVisible")){if(e===0){return a[0]=this.get("outlineLevel")-1
}else{m--}}if(c=this.get("branchIndexes")){c.forEach(function(r){if((h!==null)||(r>m)){return
}var q=this.branchObserverAt(r),n;if(!q){return}n=q.get("length");if(r+n>m){h=q.contentIndexOutlineLevel(l,q,m-r);
m=-1}else{m-=n-1}},this)}if(m>=0){h=this.get("outlineLevel")}a[e]=h;return h},contentIndexDisclosureState:function(l,g,e){if(g!==this){return -1
}var a=this._disclosureStateCache;if(a&&(a[e]!==undefined)){return a[e]}if(!a){a=this._disclosureStateCache=[]
}var f=this.get("length"),m=e,d=0,h=null,c,b,k;if(e>=f){return SC.LEAF_NODE}if(this.get("isHeaderVisible")){if(e===0){return a[0]=this.get("disclosureState")
}else{m--}}if(c=this.get("branchIndexes")){c.forEach(function(r){if((h!==null)||(r>m)){return
}var q=this.branchObserverAt(r),n;if(!q){return}n=q.get("length");if(r+n>m){h=q.contentIndexDisclosureState(l,q,m-r);
m=-1}else{m-=n-1}},this)}if(m>=0){h=SC.LEAF_NODE}a[e]=h;return h},contentIndexExpand:function(b,f,a){var c,g=a,d,e;
if(f!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._expand(this.get("item"));
return}else{g--}}if(c=this.get("branchIndexes")){c.forEach(function(l){if(l>=g){return
}var k=this.branchObserverAt(l),h;if(!k){return}h=k.get("length");if(l+h>g){k.contentIndexExpand(b,k,g-l);
g=-1}else{g-=h-1}},this)}if(g>=0){d=this.get("children");e=d?d.objectAt(g):null;if(e){this._expand(e,this.get("item"),g)
}}},contentIndexCollapse:function(b,f,a){var c,d,e,g=a;if(f!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._collapse(this.get("item"));
return}else{g--}}if(c=this.get("branchIndexes")){c.forEach(function(l){if(l>=g){return
}var k=this.branchObserverAt(l),h;if(!k){return}h=k.get("length");if(l+h>g){k.contentIndexCollapse(b,k,g-l);
g=-1}else{g-=h-1}},this)}if(g>=0){d=this.get("children");e=d?d.objectAt(g):null;if(e){this._collapse(e,this.get("item"),g)
}}},branchObserverAt:function(d){var g=this._branchObserversByIndex,c=this._branchObserverIndexes,e,h,b,l,a,f,k;
if(!g){g=this._branchObserversByIndex=[]}if(!c){c=this._branchObserverIndexes=SC.IndexSet.create()
}if(e=g[d]){return e}a=this.get("children");l=a?a.objectAt(d):null;if(!l){return null
}g[d]=e=SC.TreeItemObserver.create({item:l,delegate:this.get("delegate"),parentObserver:this,index:d,outlineLevel:this.get("outlineLevel")+1});
c.add(d);return e},invalidateBranchObserversAt:function(c){var b=this._branchObserversByIndex,a=this._branchObserverIndexes;
if(!b||b.length<=c){return this}if(c<0){c=0}a.forEachIn(c,a.get("max")-c,function(e){var d=b[e];
if(d){d.destroy()}},this);b.length=c;return this},init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("item");if(!a){throw"SC.TreeItemObserver.item cannot be null"}a.addObserver("*",this,this._itemPropertyDidChange);
this._itemPropertyDidChange(a,"*");this._notifyParent=YES},destroy:function(){this.invalidateBranchObserversAt(0);
this._objectAtCache=null;var c=this.get("item");if(c){c.removeObserver("*",this,this._itemPropertyDidChange)
}var a=this._children,b=this._childrenRangeObserver;if(a&&b){a.removeRangeObserver(b)
}arguments.callee.base.apply(this,arguments)},_itemPropertyDidChange:function(f,b){var a=this.get("children"),e=this.get("disclosureState"),d=this.get("item"),c;
this.beginPropertyChanges();c=this._computeDisclosureState(d);if(e!==c){this.set("disclosureState",c)
}c=this._computeChildren(d);if(a!==c){this.set("children",c)}this.endPropertyChanges()
},_childrenDidChange:function(){var c=this.get("disclosureState"),d=c===SC.BRANCH_OPEN?this.get("children"):null,b=this._children,a=this._childrenRangeObserver;
if(b===d){return this}if(a){b.removeRangeObserver(a)}if(d){this._childrenRangeObserver=d.addRangeObserver(null,this,this._childrenRangeDidChange)
}else{this._childrenRangeObserver=null}this._children=d;this._childrenRangeDidChange(d,null,"[]",null)
}.observes("children","disclosureState"),_childrenRangeDidChange:function(f,k,h,d){var a=this.get("children"),e=a?a.get("length"):0,c=d?d.get("min"):0,g=d?d.get("max"):e,b=this._childrenLen||0;
this._childrenLen=e;this.observerContentDidChange(c,g-c,e-b)},_computeDisclosureState:function(d,e,b){var c,a;
if(!d||!this._computeChildren(d)){return SC.LEAF_NODE}else{if(d.isTreeItemContent){if(e===undefined){e=this.get("parentItem")
}if(b===undefined){b=this.get("index")}return d.treeItemDisclosureState(e,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}return d.get(c)?SC.BRANCH_OPEN:SC.BRANCH_CLOSED}}},_collapse:function(d,e,b){var c,a;
if(!d||!this._computeChildren(d)){return this}else{if(d.isTreeItemContent){if(e===undefined){e=this.get("parentItem")
}if(b===undefined){b=this.get("index")}d.treeItemCollapse(e,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}d.setIfChanged(c,NO)}}return this},_expand:function(d,e,b){var c,a;
if(!d||!this._computeChildren(d)){return this}else{if(d.isTreeItemContent){if(e===undefined){e=this.get("parentItem")
}if(b===undefined){b=this.get("index")}d.treeItemExpand(e,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}d.setIfChanged(c,YES)}}return this},_computeChildren:function(c){var a,b;
if(!c){return null}else{if(c.isTreeItemContent){return c.get("treeItemChildren")}else{b=this._treeItemChildrenKey;
if(!b){a=this.get("delegate");b=a?a.get("treeItemChildrenKey"):"treeItemChildren";
this._treeItemChildrenKey=b}return c.get(b)}}},_computeLength:function(){var b=this.get("isHeaderVisible")?1:0,d=this.get("disclosureState"),c=this.get("children"),a;
if((d===SC.BRANCH_OPEN)&&c){b+=c.get("length");if(a=this.get("branchIndexes")){a.forEach(function(e){var f=this.branchObserverAt(e);
b+=f.get("length")-1},this)}}return b}});sc_require("controllers/object");sc_require("mixins/selection_support");
sc_require("private/tree_item_observer");SC.TreeController=SC.ObjectController.extend(SC.SelectionSupport,{treeItemIsGrouped:NO,treeItemIsExpandedKey:"treeItemIsExpanded",treeItemChildrenKey:"treeItemChildren",arrangedObjects:function(){var a,b=this.get("content");
if(b){a=SC.TreeItemObserver.create({item:b,delegate:this})}else{a=null}this._sctc_arrangedObjects=a;
return a}.property().cacheable(),_sctc_invalidateArrangedObjects:function(){this.propertyWillChange("arrangedObjects");
var a=this._sctc_arrangedObjects;if(a){a.destroy()}this._sctc_arrangedObjects=null;
this.propertyDidChange("arrangedObjects")}.observes("content","treeItemIsExpandedKey","treeItemChildrenKey","treeItemIsGrouped"),_sctc_arrangedObjectsContentDidChange:function(){this.updateSelectionAfterContentChange()
}.observes("*arrangedObjects.[]"),firstSelectableObject:function(){var d=this.get("arrangedObjects"),c,b,a=0;
if(!d){return null}c=d.contentGroupIndexes(null,d);b=d.get("length");while(c.contains(a)&&(a<b)){a++
}return a>=b?null:d.objectAt(a)}.property()});SC.mixin(SC.Object.prototype,{invokeLater:function(b,a){if(a===undefined){a=1
}var e=b,c,d;if(arguments.length>2){c=SC.$A(arguments).slice(2);if(SC.typeOf(e)===SC.T_STRING){e=this[b]
}d=e;e=function(){return d.apply(this,c)}}return SC.Timer.schedule({target:this,action:e,interval:a})
},invokeWith:function(b,c,d){if(d===undefined){d=c;c=this}if(!c){c=this}if(SC.typeOf(d)===SC.T_STRING){d=c[d]
}var a=this.getPath(b);d.call(c,a,this);return this}});SC.RunLoop=SC.RunLoop.extend({startTime:function(){if(!this._start){this._start=Date.now()
}return this._start}.property(),endRunLoop:function(){this.fireExpiredTimers();var a=arguments.callee.base.apply(this,arguments);
this.scheduleNextTimeout();return a},scheduleTimer:function(b,a){this._timerQueue=b.removeFromTimerQueue(this._timerQueue);
this._timerQueue=b.scheduleInTimerQueue(this._timerQueue,a);return this},cancelTimer:function(a){this._timerQueue=a.removeFromTimerQueue(this._timerQueue);
return this},TIMER_ARRAY:[],fireExpiredTimers:function(){if(!this._timerQueue||this._firing){return NO
}var d=this.get("startTime"),e=this.TIMER_ARRAY,c,b,a;this._firing=YES;this._timerQueue=this._timerQueue.collectExpiredTimers(e,d);
b=e.length;for(c=0;c<b;c++){e[c].fire()}a=e.length>0;e.length=0;this._firing=NO;return a
},scheduleNextTimeout:function(){var d=this._timerQueue;var b=NO;if(!d){if(this._timeout){clearTimeout(this._timeout)
}}else{var c=d._timerQueueRunTime;if(this._timeoutAt!==c){if(this._timeout){clearTimeout(this._timeout)
}var a=Math.max(0,c-Date.now());this._timeout=setTimeout(this._timeoutDidFire,a);
this._timeoutAt=c}b=YES}return b},_timeoutDidFire:function(){var a=SC.RunLoop.currentRunLoop;
a._timeout=a._timeoutAt=null;SC.run()}});SC.RunLoop.currentRunLoop=SC.RunLoop.create();
/* @license

Portions of this software are copyright Yahoo, Inc, used under the following license:

Software License Agreement (BSD License)
Copyright (c) 2009, Yahoo! Inc.
All rights reserved.
Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the
following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Yahoo! Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Yahoo! Inc.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Sources of Intellectual Property Included in the YUI Library
Where not otherwise indicated, all YUI content is authored by Yahoo! engineers and consists of Yahoo!-owned intellectual property. YUI is issued by Yahoo! under the BSD license above. In some specific instances, YUI will incorporate work done by developers outside of Yahoo! with their express permission.

*/
/* @license
  jQuery 1.2.6 - New Wave Javascript

  Copyright (c) 2008 John Resig (jquery.com)
  Dual licensed under the MIT (MIT-LICENSE.txt)
  and GPL (GPL-LICENSE.txt) licenses.
  
  $Date: 2008-05-24 14:22:17 -0400 (Sat, 24 May 2008) $
  $Rev: 5685 $
*/
SC.Button={value:null,toggleOnValue:YES,toggleOffValue:NO,localize:NO,localizeBindingDefault:SC.Binding.bool(),title:"",contentTitleKey:null,icon:null,contentIconKey:null,needsEllipsis:YES,displayTitle:function(){var a=this.get("title");
return(a&&this.get("localize"))?a.loc():(a||"")}.property("title","localize").cacheable(),keyEquivalent:null,renderTitle:function(b,a){var g=this.get("icon"),d="",h=this.get("displayTitle"),k=(!SC.none(h)&&h.length>0),c,l,e;
if(this.get("escapeHTML")){h=SC.RenderContext.escapeHTML(h)}if(g){var f=SC.BLANK_IMAGE_URL;
if(g.indexOf("/")>=0){d='<img src="'+g+'" alt="" class="icon" />'}else{d='<img src="'+f+'" alt="" class="'+g+'" />'
}k=YES}e=d+h;if(a){if(this.get("needsEllipsis")){b.push('<label class="sc-button-label ellipsis">'+e+"</label>")
}else{b.push('<label class="sc-button-label">'+e+"</label>")}this._ImageTitleCached=e
}else{c=this.$("label");if((l=c[0])){if(k){c.setClass("ellipsis",this.get("needsEllipsis"));
if(this._ImageTitleCached!==e){this._ImageTitleCached=e;l.innerHTML=e}}else{l.innerHTML=""
}}}return b},contentPropertyDidChange:function(h,c){var b=this.get("displayDelegate"),e=this.get("content"),g;
var d=this.getDelegateProperty("contentValueKey",b);if(d&&(c===d||c==="*")){this.set("value",e?(e.get?e.get(d):e[d]):null)
}var a=this.getDelegateProperty("contentTitleKey",b);if(a&&(c===a||c==="*")){this.set("title",e?(e.get?e.get(a):e[a]):null)
}var f=this.getDelegateProperty("contentIconKey",b);if(f&&(c===f||c==="*")){this.set("icon",e?(e.get?e.get(f):e[f]):null)
}return this},_button_displayObserver:function(){this.displayDidChange()}.observes("title","icon","value"),performKeyEquivalent:function(c,b){if(!this.get("isVisibleInWindow")){return NO
}if(!this.get("isEnabled")){return NO}var a=this.get("keyEquivalent");if(a){if(a===c){return this.triggerAction(b)
}}else{if((this.get("isDefault")&&(c==="return"))||(this.get("isCancel")&&(c==="escape"))){return this.triggerAction(b)
}}return NO},triggerAction:function(a){throw"SC.Button.triggerAction() is not defined in %@".fmt(this)
},computeIsSelectedForValue:function(d){var b=this.get("toggleOnValue"),c,a;if(SC.typeOf(d)===SC.T_ARRAY){if(d.length===1){c=(d[0]==b)
}else{c=null;d.find(function(e){a=(e==b);if(c===null){c=a}else{if(a!==c){c=SC.MIXED_STATE
}}return c===SC.MIXED_STATE})}}else{if(d===SC.MIXED_STATE){c=SC.MIXED_STATE}else{c=(d===b)
}}return c},initMixin:function(){if(!SC.none(this.get("value"))){this._button_valueDidChange()
}},_button_valueDidChange:function(){var b=this.get("value"),a=this.computeIsSelectedForValue(b);
this.set("isSelected",a)}.observes("value"),_button_isSelectedDidChange:function(){var c=this.get("isSelected"),b=this.computeIsSelectedForValue(this.get("value"));
if((c!==SC.MIXED_STATE)&&(b!==c)){var a=(c)?"toggleOnValue":"toggleOffValue";this.set("value",this.get(a))
}}.observes("isSelected")};SC.ContentDisplay={concatenatedProperties:"contentDisplayProperties",displayProperties:["content"],contentDisplayProperties:[],initMixin:function(){this._display_contentDidChange()
},_display_contentDidChange:function(e,a,d){if((d=this.get("content"))!=this._display_content){var c=this._display_contentPropertyDidChange;
var b=this._display_content;if(b){if(SC.isArray(b)){b.invoke("removeObserver","*",this,c)
}else{if(b.removeObserver){b.removeObserver("*",this,c)}}}b=this._display_content=d;
if(b){if(SC.isArray(b)){b.invoke("addObserver","*",this,c)}else{if(b.addObserver){b.addObserver("*",this,c)
}}}this.displayDidChange()}}.observes("content","contentDisplayProperties"),_display_contentPropertyDidChange:function(e,c,d,b){if(c==="*"){this.displayDidChange()
}else{var a=this.get("contentDisplayProperties");if(a&&a.indexOf(c)>=0){this.displayDidChange()
}}}};sc_require("system/locale");SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);
SC.STRING_DECAMELIZE_REGEXP=(/([a-z])([A-Z])/g);SC.STRING_DASHERIZE_REGEXP=(/[ _]/g);
SC.STRING_HUMANIZE_REGEXP=(/[\-_]/g);SC.STRING_TRIM_REGEXP=(/^\s+|\s+$/g);SC.STRING_TRIM_LEFT_REGEXP=(/^\s+/g);
SC.STRING_TRIM_RIGHT_REGEXP=(/\s+$/g);SC.STRING_REGEXP_ESCAPED_REGEXP=(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g);
SC.STRING_DASHERIZE_CACHE={top:"top",left:"left",right:"right",bottom:"bottom",width:"width",height:"height",minWidth:"min-width",maxWidth:"max-width"};
SC.INFLECTION_CONSTANTS={PLURAL:[[/(quiz)$/i,"$1zes"],[/^(ox)$/i,"$1en"],[/([m|l])ouse$/i,"$1ice"],[/(matr|vert|ind)ix|ex$/i,"$1ices"],[/(x|ch|ss|sh)$/i,"$1es"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(hive)$/i,"$1s"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/sis$/i,"ses"],[/([ti])um$/i,"$1a"],[/(buffal|tomat)o$/i,"$1oes"],[/(bu)s$/i,"$1ses"],[/(alias|status)$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(ax|test)is$/i,"$1es"],[/s$/i,"s"],[/$/,"s"]],SINGULAR:[[/(quiz)zes$/i,"$1"],[/(matr)ices$/i,"$1ix"],[/(vert|ind)ices$/i,"$1ex"],[/^(ox)en/i,"$1"],[/(alias|status)es$/i,"$1"],[/(octop|vir)i$/i,"$1us"],[/(cris|ax|test)es$/i,"$1is"],[/(shoe)s$/i,"$1"],[/(o)es$/i,"$1"],[/(bus)es$/i,"$1"],[/([m|l])ice$/i,"$1ouse"],[/(x|ch|ss|sh)es$/i,"$1"],[/(m)ovies$/i,"$1ovie"],[/(s)eries$/i,"$1eries"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/([lr])ves$/i,"$1f"],[/(tive)s$/i,"$1"],[/(hive)s$/i,"$1"],[/([^f])ves$/i,"$1fe"],[/(^analy)ses$/i,"$1sis"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i,"$1$2sis"],[/([ti])a$/i,"$1um"],[/(n)ews$/i,"$1ews"],[/s$/i,""]],IRREGULAR:[["move","moves"],["sex","sexes"],["child","children"],["man","men"],["person","people"]],UNCOUNTABLE:["sheep","fish","series","species","money","rice","information","info","equipment"]};
SC.String={loc:function(){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var a=SC.Locale.currentLocale.locWithDefault(this);if(SC.typeOf(a)!==SC.T_STRING){a=this
}return a.fmt.apply(a,arguments)},locWithDefault:function(b){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var c=SC.Locale.currentLocale.locWithDefault(this,b);if(SC.typeOf(c)!==SC.T_STRING){c=this
}var a=SC.$A(arguments);a.shift();return c.fmt.apply(c,a)},capitalize:function(){return this.charAt(0).toUpperCase()+this.slice(1)
},capitalizeEach:function(){return this.replace(SC.STRING_TITLEIZE_REGEXP,function(c,a,b){return(b)?(a+b.toUpperCase()):a
}).capitalize()},titleize:function(){var a=this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2");
return a.replace(SC.STRING_TITLEIZE_REGEXP,function(c,d,b){return(b)?(" "+b.toUpperCase()):" "
}).capitalize()},camelize:function(){var b=this.replace(SC.STRING_TITLEIZE_REGEXP,function(e,f,d){return(d)?d.toUpperCase():""
});var c=b.charAt(0),a=c.toLowerCase();return(c!==a)?(a+b.slice(1)):b},classify:function(){var a=this.replace(SC.STRING_TITLEIZE_REGEXP,function(e,f,d){return(d)?d.toUpperCase():""
});var c=a.charAt(0),b=c.toUpperCase();return(c!==b)?(b+a.slice(1)):a},decamelize:function(){return this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2").toLowerCase()
},dasherize:function(){var a=SC.STRING_DASHERIZE_CACHE,b=a[this];if(b){return b}else{b=this.decamelize().replace(SC.STRING_DASHERIZE_REGEXP,"-");
a[this]=b}return b},humanize:function(){return this.decamelize().replace(SC.STRING_HUMANIZE_REGEXP," ")
},escapeForRegExp:function(){return this.replace(SC.STRING_REGEXP_ESCAPED_REGEXP,"\\$1")
},removeDiacritics:function(){var a=SC.diacriticMappingTable;if(!a){SC.diacriticMappingTable={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ā":"A","Ă":"A","Ą":"A","Ǎ":"A","Ǟ":"A","Ǡ":"A","Ǻ":"A","Ȁ":"A","Ȃ":"A","Ȧ":"A","Ḁ":"A","Ạ":"A","Ả":"A","Ấ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ậ":"A","Ắ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Å":"A","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ç":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ḉ":"C","Ď":"D","Ḋ":"D","Ḍ":"D","Ḏ":"D","Ḑ":"D","Ḓ":"D","È":"E","É":"E","Ê":"E","Ë":"E","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ȩ":"E","Ḕ":"E","Ḗ":"E","Ḙ":"E","Ḛ":"E","Ḝ":"E","Ẹ":"E","Ẻ":"E","Ẽ":"E","Ế":"E","Ề":"E","Ể":"E","Ễ":"E","Ệ":"E","Ḟ":"F","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","Ǧ":"G","Ǵ":"G","Ḡ":"G","Ĥ":"H","Ȟ":"H","Ḣ":"H","Ḥ":"H","Ḧ":"H","Ḩ":"H","Ḫ":"H","Ì":"I","Í":"I","Î":"I","Ï":"I","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ḭ":"I","Ḯ":"I","Ỉ":"I","Ị":"I","Ĵ":"J","Ķ":"K","Ǩ":"K","Ḱ":"K","Ḳ":"K","Ḵ":"K","Ĺ":"L","Ļ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ḻ":"L","Ḽ":"L","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ñ":"N","Ń":"N","Ņ":"N","Ň":"N","Ǹ":"N","Ṅ":"N","Ṇ":"N","Ṉ":"N","Ṋ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ō":"O","Ŏ":"O","Ő":"O","Ơ":"O","Ǒ":"O","Ǫ":"O","Ǭ":"O","Ȍ":"O","Ȏ":"O","Ȫ":"O","Ȭ":"O","Ȯ":"O","Ȱ":"O","Ṍ":"O","Ṏ":"O","Ṑ":"O","Ṓ":"O","Ọ":"O","Ỏ":"O","Ố":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ộ":"O","Ớ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ợ":"O","Ṕ":"P","Ṗ":"P","Ŕ":"R","Ŗ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ṟ":"R","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṥ":"S","Ṧ":"S","Ṩ":"S","Ţ":"T","Ť":"T","Ț":"T","Ṫ":"T","Ṭ":"T","Ṯ":"T","Ṱ":"T","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","Ư":"U","Ǔ":"U","Ǖ":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ȕ":"U","Ȗ":"U","Ṳ":"U","Ṵ":"U","Ṷ":"U","Ṹ":"U","Ṻ":"U","Ụ":"U","Ủ":"U","Ứ":"U","Ừ":"U","Ử":"U","Ữ":"U","Ự":"U","Ṽ":"V","Ṿ":"V","Ŵ":"W","Ẁ":"W","Ẃ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẋ":"X","Ẍ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ȳ":"Y","Ẏ":"Y","Ỳ":"Y","Ỵ":"Y","Ỷ":"Y","Ỹ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","Ẑ":"Z","Ẓ":"Z","Ẕ":"Z","`":"`","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ā":"a","ă":"a","ą":"a","ǎ":"a","ǟ":"a","ǡ":"a","ǻ":"a","ȁ":"a","ȃ":"a","ȧ":"a","ḁ":"a","ạ":"a","ả":"a","ấ":"a","ầ":"a","ẩ":"a","ẫ":"a","ậ":"a","ắ":"a","ằ":"a","ẳ":"a","ẵ":"a","ặ":"a","ḃ":"b","ḅ":"b","ḇ":"b","ç":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ḉ":"c","ď":"d","ḋ":"d","ḍ":"d","ḏ":"d","ḑ":"d","ḓ":"d","è":"e","é":"e","ê":"e","ë":"e","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","ȅ":"e","ȇ":"e","ȩ":"e","ḕ":"e","ḗ":"e","ḙ":"e","ḛ":"e","ḝ":"e","ẹ":"e","ẻ":"e","ẽ":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e","ḟ":"f","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","ǧ":"g","ǵ":"g","ḡ":"g","ĥ":"h","ȟ":"h","ḣ":"h","ḥ":"h","ḧ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ì":"i","í":"i","î":"i","ï":"i","ĩ":"i","ī":"i","ĭ":"i","į":"i","ǐ":"i","ȉ":"i","ȋ":"i","ḭ":"i","ḯ":"i","ỉ":"i","ị":"i","ĵ":"j","ǰ":"j","ķ":"k","ǩ":"k","ḱ":"k","ḳ":"k","ḵ":"k","ĺ":"l","ļ":"l","ľ":"l","ḷ":"l","ḹ":"l","ḻ":"l","ḽ":"l","ḿ":"m","ṁ":"m","ṃ":"m","ñ":"n","ń":"n","ņ":"n","ň":"n","ǹ":"n","ṅ":"n","ṇ":"n","ṉ":"n","ṋ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ō":"o","ŏ":"o","ő":"o","ơ":"o","ǒ":"o","ǫ":"o","ǭ":"o","ȍ":"o","ȏ":"o","ȫ":"o","ȭ":"o","ȯ":"o","ȱ":"o","ṍ":"o","ṏ":"o","ṑ":"o","ṓ":"o","ọ":"o","ỏ":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o","ṕ":"p","ṗ":"p","ŕ":"r","ŗ":"r","ř":"r","ȑ":"r","ȓ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ṟ":"r","ś":"s","ŝ":"s","ş":"s","š":"s","ș":"s","ṡ":"s","ṣ":"s","ṥ":"s","ṧ":"s","ṩ":"s","ţ":"t","ť":"t","ț":"t","ṫ":"t","ṭ":"t","ṯ":"t","ṱ":"t","ẗ":"t","ù":"u","ú":"u","û":"u","ü":"u","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","ư":"u","ǔ":"u","ǖ":"u","ǘ":"u","ǚ":"u","ǜ":"u","ȕ":"u","ȗ":"u","ṳ":"u","ṵ":"u","ṷ":"u","ṹ":"u","ṻ":"u","ụ":"u","ủ":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u","ṽ":"v","ṿ":"v","ŵ":"w","ẁ":"w","ẃ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẘ":"w","ẋ":"x","ẍ":"x","ý":"y","ÿ":"y","ŷ":"y","ȳ":"y","ẏ":"y","ẙ":"y","ỳ":"y","ỵ":"y","ỷ":"y","ỹ":"y","ź":"z","ż":"z","ž":"z","ẑ":"z","ẓ":"z","ẕ":"z"};
a=SC.diacriticMappingTable}var d,e,b="",f=this.length;for(var c=0;c<=f;++c){d=this.charAt(c);
e=a[d];if(e){b+=e}else{b+=d}}return b},trim:function(){return this.replace(SC.STRING_TRIM_REGEXP,"")
},trimLeft:function(){return this.replace(SC.STRING_TRIM_LEFT_REGEXP,"")},trimRight:function(){return this.replace(SC.STRING_TRIM_RIGHT_REGEXP,"")
},pluralize:function(){var l,e,b=this.split(/\s/).pop(),g=this.replace(b,""),a=b.charAt(0).match(/[A-Z]/)?true:false;
b=b.toLowerCase();for(l=0,e=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;l<e;l++){var f=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[l];
if(b==f){return this.toString()}}for(l=0,e=SC.INFLECTION_CONSTANTS.IRREGULAR.length;
l<e;l++){var c=SC.INFLECTION_CONSTANTS.IRREGULAR[l][0],k=SC.INFLECTION_CONSTANTS.IRREGULAR[l][1];
if((b==c)||(b==k)){if(a){k=k.capitalize()}return g+k}}for(l=0,e=SC.INFLECTION_CONSTANTS.PLURAL.length;
l<e;l++){var h=SC.INFLECTION_CONSTANTS.PLURAL[l][0],d=SC.INFLECTION_CONSTANTS.PLURAL[l][1];
if(h.test(b)){return this.replace(h,d)}}},singularize:function(){var l,e,b=this.split(/\s/).pop(),g=this.replace(b,""),a=b.charAt(0).match(/[A-Z]/)?true:false;
b=b.toLowerCase();for(l=0,e=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;l<e;l++){var f=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[l];
if(b==f){return this.toString()}}for(l=0,e=SC.INFLECTION_CONSTANTS.IRREGULAR.length;
l<e;l++){var c=SC.INFLECTION_CONSTANTS.IRREGULAR[l][0],k=SC.INFLECTION_CONSTANTS.IRREGULAR[l][1];
if((b==c)||(b==k)){if(a){c=c.capitalize()}return g+c}}for(l=0,e=SC.INFLECTION_CONSTANTS.SINGULAR.length;
l<e;l++){var h=SC.INFLECTION_CONSTANTS.SINGULAR[l][0],d=SC.INFLECTION_CONSTANTS.SINGULAR[l][1];
if(h.test(b)){return this.replace(h,d)}}}};SC.String.strip=SC.String.trim;SC.supplement(String.prototype,SC.String);
String.prototype.loc=SC.String.loc;SC.String.fmt=String.prototype.fmt;sc_require("mixins/string");
SC.MIXED_STATE="__MIXED__";SC.HUGE_CONTROL_SIZE="sc-huge-size";SC.LARGE_CONTROL_SIZE="sc-large-size";
SC.REGULAR_CONTROL_SIZE="sc-regular-size";SC.SMALL_CONTROL_SIZE="sc-small-size";SC.TINY_CONTROL_SIZE="sc-tiny-size";
SC.Control={initMixin:function(){this._control_contentDidChange()},isSelected:NO,isSelectedBindingDefault:SC.Binding.oneWay().bool(),isActive:NO,isActiveBindingDefault:SC.Binding.oneWay().bool(),value:null,content:null,contentValueKey:null,contentPropertyDidChange:function(b,a){return this.updatePropertyFromContent("value",a,"contentValueKey")
},updatePropertyFromContent:function(f,b,e,d){var c=b==="*";if(e===undefined){e="content"+f.capitalize()+"Key"
}if(d===undefined){d=this.get("content")}e=this[e]?this.get(e):this.getDelegateProperty(e,this.displayDelegate);
if(e&&(c||b===e)){var a=(d)?(d.get?d.get(e):d[e]):null;this.set(f,a)}return this},updateContentWithValueObserver:function(){var a=this.contentValueKey?this.get("contentValueKey"):this.getDelegateProperty("contentValueKey",this.displayDelegate),b=this.get("content");
if(!a||!b){return}var c=this.get("value");if(typeof b.setIfChanged===SC.T_FUNCTION){b.setIfChanged(a,c)
}else{if(b[a]!==c){b[a]=c}}}.observes("value"),fieldKey:null,fieldLabel:null,errorLabel:function(){var a,c,b;
if(a=this.get("fieldLabel")){return a}c=this.get("fieldKey")||this.constructor.toString();
b=(c||"").humanize().capitalize();return"ErrorLabel."+c.locWithDefault(("FieldKey."+c).locWithDefault(b))
}.property("fieldLabel","fieldKey").cacheable(),controlSize:SC.REGULAR_CONTROL_SIZE,displayProperties:"isEnabled isSelected isActive controlSize".w(),_CONTROL_TMP_CLASSNAMES:{},renderMixin:function(a,e){var c=this.get("isSelected"),b=!this.get("isEnabled"),d=this._CONTROL_TMP_CLASSNAMES;
d.mixed=c===SC.MIXED_STATE;d.sel=c&&(c!==SC.MIXED_STATE);d.active=this.get("isActive");
a.setClass(d).addClass(this.get("controlSize"))},_control_content:null,_control_contentDidChange:function(){var b=this.get("content");
if(this._control_content===b){return}var c=this.contentPropertyDidChange,a=this._control_content;
if(a&&a.removeObserver){a.removeObserver("*",this,c)}this._control_content=b;if(b&&b.addObserver){b.addObserver("*",this,c)
}this.contentPropertyDidChange(b,"*")}.observes("content")};SC.Editable={isEditable:NO,isEditing:NO,beginEditing:function(){if(!this.get("isEditable")){return NO
}if(this.get("isEditing")){return YES}this.beginPropertyChanges();this.set("isEditing",YES);
this.becomeFirstResponder();this.endPropertyChanges();return YES},discardEditing:function(){return !this.get("isEditing")
},commitEditing:function(){if(!this.get("isEditing")){return YES}this.set("isEditing",NO);
this.resignFirstResponder();return YES}};SC.mixin(SC.browser,(function(){var a=window.innerWidth,c=SC.browser,b=navigator.standalone;
SC.extend(c,{isOpera:!!c.opera,isIe:!!c.msie,isIE:!!c.msie,isSafari:!!c.safari,isMobileSafari:(!!c.mobileSafari||!!c.standalone),isMozilla:!!c.mozilla,isWindows:!!c.windows,isMac:!!c.mac,isiPhone:((!!c.mobileSafari||!!c.standalone)&&(a==320||a==480)),current:c.msie?"msie":c.mozilla?"mozilla":c.safari?"safari":c.opera?"opera":"unknown",compareVersion:function(){if(this._versionSplit===undefined){var g=function(h){return Number(h.match(/^[0-9]+/))
};this._versionSplit=SC.A(this.version.split(".")).map(g)}var f=SC.A(arguments).map(Number);
for(var e=0;e<f.length;e++){var d=this._versionSplit[e]-f[e];if(isNaN(d)){return 0
}if(d!==0){return d}}return 0}});return c})());SC.Builder=function(a){return SC.Builder.create(a)
};SC.Builder.create=function create(c){var b=SC.mixin(SC.beget(this.fn),c||{});if(c.hasOwnProperty("toString")){b.toString=c.toString
}var a=function(){var d=SC.beget(b);d.defaultClass=this;d.constructor=a;return d.init.apply(d,arguments)
};a.fn=a.prototype=b;a.extend=SC.Builder.create;a.mixin=SC.Builder.mixin;return a
};SC.Builder.mixin=function(){var b=arguments.length,a;for(a=0;a<b;a++){SC.mixin(this,arguments[a])
}return this};SC.Builder.fn={init:function(a){if(a!==undefined){if(SC.typeOf(a)===SC.T_ARRAY){var b=a.length;
while(--b>=0){this[b]=a.objectAt?a.objectAt(b):a[b]}this.length=a.length}else{this[0]=a;
this.length=1}}return this},size:function(){return this.length},pushStack:function(){var a=this.constructor.apply(this,arguments);
a.prevObject=this;return a},end:function(){return this.prevObject||this.constructor()
},toString:function(){return"%@$(%@)".fmt(this.defaultClass.toString(),SC.A(this).invoke("toString").join(","))
},mixin:SC.Builder.mixin};(function(){var a=SC.Enumerable,c=SC.Builder.fn,b,d;for(b in a){if(!a.hasOwnProperty(b)){continue
}d=Array.prototype[b]||a[b];c[b]=d}})();require("system/builder");SC.CoreQuery=(function(){var I=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,k=/^.[^:#\[\.]*$/;
var A=/ CQ\d+="(?:\d+|null)"/g,e=/(<(\w+)[^>]*?)\/>/g,u=/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i,b=/\s+/,f=/^\s+/,h=/^body|html$/i,G=/href|src|style/,l=/(button|input|object|select|textarea)/i,B=/alpha\([^)]*\)/,w=/opacity=([^)]*)/;
var F=SC.browser.msie?"styleFloat":"cssFloat";var x=(SC.browser.safari&&parseInt(SC.browser.version,0)<417)?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
var C=new RegExp("^("+x+"+)(#)("+x+"+)");var r=new RegExp("^([#.]?)("+x+"*)");var g=new RegExp("([#.]?)("+x+"*)","g");
var q=["Left","Right"];var d=["Top","Bottom"];var s={position:"absolute",visibility:"hidden",display:"block"};
var E=function E(L,K,R){var Q=K==="width"?L.offsetWidth:L.offsetHeight;var O=0,J=0,P=R.length,N;
while(--P>=0){N=R[P];O+=parseFloat(c.curCSS(L,"padding"+N,true))||0;J+=parseFloat(c.curCSS(L,"border"+N+"Width",true))||0
}Q-=Math.round(O+J);return Q};var m=SC.guidKey,D=0,H={},a=/z-?index|font-?weight|opacity|zoom|line-?height/i,y=document.defaultView||{};
var v=function v(K){if(!SC.browser.safari){return false}var J=y.getComputedStyle(K,null);
return !J||J.getPropertyValue("color")===""};function n(J,K){return J[0]&&parseInt(c.curCSS(J[0],K,true),10)||0
}var z,c;c=z=SC.Builder.create({jquery:"SC.CoreQuery",init:function(J,L){J=J||document;
if(J.nodeType){this[0]=J;this.length=1;return this}else{if(typeof J==="string"){var K=I.exec(J);
if(K&&(K[1]||!L)){if(K[1]){J=c.clean([K[1]],L)}else{var N=document.getElementById(K[3]);
if(N){if(N.id!=K[3]){return c().find(J)}return c(N)}J=[]}}else{return c(L).find(J)
}}else{if(SC.typeOf(J)===SC.T_FUNCTION){return SC.ready(J)}}}return this.setArray(c.makeArray(J))
},size:function(){return this.length},get:function(J){return J===undefined?c.makeArray(this):this[J]
},find:function(J){var K=c.map(this,function(L){return c.find(J,L)});return this.pushStack(K)
},filter:function(J){return this.pushStack((SC.typeOf(J)===SC.T_FUNCTION)&&c.grep(this,function(L,K){return J.call(L,K)
})||c.multiFilter(J,this))},not:function(J){if(typeof J==="string"){if(k.test(J)){return this.pushStack(c.multiFilter(J,this,true))
}else{J=c.multiFilter(J,this)}}var K=J.length&&J[J.length-1]!==undefined&&!J.nodeType;
return this.filter(function(){return K?c.inArray(this,J)<0:this!=J})},setArray:function(J){this.length=0;
Array.prototype.push.apply(this,J);return this},map:function(J){return this.pushStack(c.map(this,function(L,K){return J.call(L,K,L)
}))},each:function(K,J){return c.each(this,K,J)},index:function(J){if(J&&J.jquery){J=J[0]
}return Array.prototype.indexOf.call(this,J)},eq:function(J){return this.slice(J,+J+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))
},add:function(J){return this.pushStack(c.merge(this.get(),typeof J==="string"?c(J):c.makeArray(J)).uniq())
},attr:function(K,N,L){var J=K;if(typeof K==="string"){if(N===undefined){return this[0]&&c[L||"attr"](this[0],K)
}else{J={};J[K]=N}}return this.each(function(O){for(K in J){c.attr((L)?this.style:this,K,c.prop(this,J[K],L,O,K))
}})},html:function(J){return J===undefined?(this[0]?this[0].innerHTML.replace(A,""):null):this.empty().append(J)
},andSelf:function(){return this.add(this.prevObject)},is:function(J){return !!J&&c.multiFilter(J,this).length>0
},hasClass:function(J){return Array.prototype.every.call(this,function(K){return(K.nodeType===1)&&c.className.has(K,J)
})},val:function(Q){if(Q===undefined){var J=this[0];if(J){if(c.nodeName(J,"option")){return(J.attributes.value||{}).specified?J.value:J.text
}if(c.nodeName(J,"select")){var O=J.selectedIndex,R=[],S=J.options,N=J.type==="select-one",L;
if(O<0){return null}var K,P=N?O+1:S.length;for(K=N?O:0;K<P;K++){L=S[K];if(L.selected){Q=c(L).val();
if(N){return Q}R.push(Q)}}return R}return(J.value||"").replace(/\r/g,"")}return undefined
}else{if(typeof Q==="number"){Q+=""}this.each(function(){if(this.nodeType!==1){return
}if(SC.typeOf(Q)===SC.T_ARRAY&&(/radio|checkbox/).test(this.type)){this.checked=(c.inArray(this.value,Q)>=0||c.inArray(this.name,Q)>=0)
}else{if(c.nodeName(this,"select")){var T=c.makeArray(Q);c("option",this).each(function(){this.selected=(c.inArray(this.value,T)>=0||c.inArray(this.text,T)>=0)
});if(!T.length){this.selectedIndex=-1}}else{this.value=Q}}})}return this},clone:function(){var J=this.map(function(){if(SC.browser.msie&&!c.isXMLDoc(this)){var N=this.cloneNode(true),L=document.createElement("div");
L.appendChild(N);return c.clean([L.innerHTML])[0]}else{return this.cloneNode(true)
}});var K=J.find("*").andSelf().each(function(){if(this[SC.guidKey]!==undefined){this[SC.guidKey]=null
}});return J},css:function(J,K){if((J==="width"||J==="height")&&parseFloat(K,0)<0){K=undefined
}return this.attr(J,K,"curCSS")},text:function(K){if(K!==undefined&&typeof K!=="object"&&K!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(K))
}var J="";c.each(K||this,function(){c.each(this.childNodes,function(){if(this.nodeType!==8){J+=this.nodeType!==1?this.nodeValue:c.fn.text([this])
}})});return J},show:function(){var J=SC.$.isVisible;this.each(function(){if(!J(this)){this.style.display=this.oldblock||"";
if(c.css(this,"display")==="none"){var K=c("<"+this.tagName+"/>");c("body").append(K);
this.style.display=K.css("display");if(this.style.display==="none"){this.style.display="block"
}K.remove();K=null}}});return this},hide:function(){var J=SC.$.isVisible;this.each(function(){if(J(this)){this.oldblock=this.oldblock||c.css(this,"display");
this.style.display="none"}});return this},domManip:function(L,N,K,P){var O=this.length>1,J;
return this.each(function(){if(!J){J=c.clean(L,this.ownerDocument);if(K){J.reverse()
}}var Q=this;if(N&&c.nodeName(this,"table")&&c.nodeName(J[0],"tr")){Q=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}c.each(J,function(){var R=O?c(this).clone(true)[0]:this;P.call(Q,R)})})},append:function(){return this.domManip(arguments,true,false,function(J){if(this.nodeType===1){this.appendChild(J)
}})},prepend:function(){return this.domManip(arguments,true,true,function(J){if(this.nodeType===1){this.insertBefore(J,this.firstChild)
}})},before:function(){return this.domManip(arguments,false,false,function(J){this.parentNode.insertBefore(J,this)
})},after:function(){return this.domManip(arguments,false,true,function(J){this.parentNode.insertBefore(J,this.nextSibling)
})},replaceWith:function(J){return this.after(J).remove()},removeData:function(J){return this.each(function(){SC.removeData(this,J)
})}});z.mixin({nodeName:function(K,J){return K.nodeName&&K.nodeName.toUpperCase()===J.toUpperCase()
},map:function(J,P){var K=[],O,L,N;for(L=0,N=J.length;L<N;L++){O=P(J[L],L);if(O!=null){K[K.length]=O
}}return K.concat.apply([],K)},each:function(L,Q,K){var J,N=0,O=L.length;if(K){if(O===undefined){for(J in L){if(Q.apply(L[J],K)===false){break
}}}else{for(;N<O;){if(Q.apply(L[N++],K)===false){break}}}}else{if(O===undefined){for(J in L){if(Q.call(L[J],J,L[J])===false){break
}}}else{for(var P=L[0];N<O&&Q.call(P,N,P)!==false;P=L[++N]){}}}return L},isXMLDoc:function(J){return J.documentElement&&!J.body||J.tagName&&J.ownerDocument&&!J.ownerDocument.body
},clean:function(J,L){var K=[];L=L||document;if(typeof L.createElement=="undefined"){L=L.ownerDocument||L[0]&&L[0].ownerDocument||document
}c.each(J,function(Q,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(e,function(V,W,U){return U.match(u)?V:W+"></"+U+">"
});var P=S.replace(f,"").substring(0,10).toLowerCase(),T=L.createElement("div");var R=!P.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!P.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||P.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!P.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!P.indexOf("<td")||!P.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!P.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||SC.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
T.innerHTML=R[1]+S+R[2];while(R[0]--){T=T.lastChild}if(SC.browser.msie){var O=!P.indexOf("<table")&&P.indexOf("<tbody")<0?T.firstChild&&T.firstChild.childNodes:R[1]==="<table>"&&P.indexOf("<tbody")<0?T.childNodes:[];
for(var N=O.length-1;N>=0;--N){if(c.nodeName(O[N],"tbody")&&!O[N].childNodes.length){O[N].parentNode.removeChild(O[N])
}}if(/^\s/.test(S)){T.insertBefore(L.createTextNode(S.match(/^\s*/)[0]),T.firstChild)
}}S=c.makeArray(T.childNodes)}if(S.length===0&&(!c.nodeName(S,"form")&&!c.nodeName(S,"select"))){return
}if(S[0]===undefined||c.nodeName(S,"form")||S.options){K.push(S)}else{K=c.merge(K,S)
}});return K},find:function(X,K){var S;if(typeof X!=="string"){return[X]}if(X.indexOf(",")>=0){S=X.split(",").map(function(Z){return c.find(Z,K)
});return S.concat.apply([],S).uniq()}if(K&&K.nodeType!==1&&K.nodeType!==9){return[]
}K=K||document;S=[K];var U,J=YES,O=X.match(g),R=O.length,N;for(var V=0;V<R;V++){X=O[V];
if(X===" "||X===""){J=YES}else{if(J){N=r.exec(X);if((N[1]==="")&&(V<(R-1))&&(O[V+1].charAt(0)==="#")){X=O[V+1];
O[V+1]=O[V];N=r.exec(X)}var Q=[],P=S.length,T,W,L=N[2],Y;for(T=0;T<P;T++){W=S[T];
switch(N[1]){case"":if(!L){L="*"}if(L==="*"&&W.nodeName.toLowerCase()==="object"){L="param"
}Q=c.merge(Q,W.getElementsByTagName(L));break;case"#":if(W===document){Y=document.getElementById(L);
if(SC.browser.msie&&Y&&Y.getAttribute("id")!==L){Y=NO}else{if(Y){Q.push(Y)}Y=YES}}else{Y=NO
}if(!Y){Y=W.getElementsByTagName("*");Y=Array.prototype.find.call(Y,function(Z){return Z.getAttribute&&(Z.getAttribute("id")===L)
});if(Y){Q.push(Y)}}break;case".":if(W.getElementsByClassName){Q=c.merge(Q,W.getElementsByClassName(L))
}else{Q=c.merge(Q,c.classFilter(W.getElementsByTagName("*"),L))}break;default:}}delete S;
S=Q;J=NO}else{S=c.filter(X,S)}}}if(S&&S[0]==K){S.shift()}return S.uniq()},classFilter:function(P,J,O){J=" "+J+" ";
var L=[],N;for(var K=0;P[K];K++){N=(" "+P[K].className+" ").indexOf(J)>=0;if(!O&&N||O&&!N){L.push(P[K])
}}return L},filter:function(K,P,O){var J=r.exec(K),Q=J[2],N=J[1],L;if(N==="."){return c.classFilter(c.makeArray(P),Q,O)
}else{if(N==="#"){L=function(S){var R=S&&S.getAttribute&&(S.getAttribute("id")===Q);
return(O)?!R:R}}else{L=function(S){var R=c.nodeName(S,Q);return(O)?!R:R}}return Array.prototype.filter.call(c.makeArray(P),L)
}},multiFilter:function(N,J,L){N=N.indexOf(",")?N.split(","):[N];var P=N.length,O,K=[];
while(--P>=0){O=c.filter(N[P].trim(),J,L);K=L?J=O:c.merge(O,K)}return K},merge:function(N,J){var K=0,L,O=N.length;
if(SC.browser.msie){while(L=J[K++]){if(L.nodeType!==8){N[O++]=L}}}else{while(L=J[K++]){N[O++]=L
}}return N},makeArray:function(L){var J=[];if(!SC.none(L)){var K=L.length;if(K==null||typeof L==="string"||L.setInterval){J[0]=L
}else{while(K){J[--K]=L[K]}}}return J},inArray:function(J,K){return K.indexOf?K.indexOf(J):Array.prototype.indexOf.call(K,J)
},boxModel:!SC.browser.msie||document.compatMode==="CSS1Compat",props:{"for":"htmlFor","class":"className","float":F,cssFloat:F,styleFloat:F,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan"},prop:function(N,O,L,K,J){if(SC.typeOf(O)===SC.T_FUNCTION){O=O.call(N,K)
}return O&&(typeof O==="number")&&L==="curCSS"&&!a.test(J)?O+"px":O},grep:function(K,P,J){var L=[];
for(var N=0,O=K.length;N<O;N++){if(!J!=!P(K[N],N)){L.push(K[N])}}return L},className:{add:function(K,L){var J=c.className.has;
c.each((L||"").split(b),function(N,O){if(K.nodeType===1&&!J(K.className,O)){K.className+=(K.className?" ":"")+O
}})},remove:function(J,K){if(J.nodeType===1){J.className=K!==undefined?c.grep(J.className.split(b),function(L){return !c.className.has(K,L)
}).join(" "):""}},has:function(K,J){return K&&c.inArray(J,(K.className||K).toString().split(b))>-1
}},swap:function(P,O,R,Q,J){var K={},N;for(N in O){K[N]=P.style[N];P.style[N]=O[N]
}var L=R(P,Q,J);for(N in O){P.style[N]=K[N]}return L},css:function(L,J,N){if(J==="width"||J==="height"){var P,O=(J==="width")?q:d,K=s;
P=SC.$.isVisible(L)?E(L,J,O):c.swap(L,K,E,J,O);return Math.max(0,P)}return c.curCSS(L,J,N)
},curCSS:function(Q,K,L){var V,J=Q.style;if(K==="opacity"&&SC.browser.msie){V=c.attr(J,"opacity");
return V===""?"1":V}if(SC.browser.opera&&K==="display"){var W=J.outline;J.outline="0 solid black";
J.outline=W}var N=K.match(/float/i);if(N){K=F}if(!L&&J&&J[K]){V=J[K]}else{if(y.getComputedStyle){if(N){K="float"
}K=K.replace(/([A-Z])/g,"-$1").toLowerCase();var X=y.getComputedStyle(Q,null);if(X&&!v(Q,y)){V=X.getPropertyValue(K)
}else{var P=[],Y=[],Z=Q,S=0,U,R;for(;Z&&v(Z);Z=Z.parentNode){Y.unshift(Z)}for(R=Y.length;
S<R;S++){var aa=Y[S];if(aa&&aa.style&&v(aa)){P[S]=aa.style.display;aa.style.display="block"
}}V=(K==="display"&&P[Y.length-1]!==null)?"none":(X&&X.getPropertyValue(K))||"";for(S=0,U=P.length;
S<U;S++){if(P[S]!==null){Y[S].style.display=P[S]}}}if(K==="opacity"&&V===""){V="1"
}}else{if(Q.currentStyle){V=Q.currentStyle[K]||Q.currentStyle[K.camelize()];if(!(/^\d+(px)?$/i).test(V)&&(/^\d/).test(V)){var O=J.left,T=Q.runtimeStyle.left;
Q.runtimeStyle.left=Q.currentStyle.left;J.left=V||0;V=J.pixelLeft+"px";J.left=O;Q.runtimeStyle.left=T
}}}}return V},dir:function(L,K){var J=[],N=L[K];while(N&&N!=document){if(N.nodeType===1){J.push(N)
}N=N[K]}return J},nth:function(O,J,L,N){J=J||1;var K=0;for(;O;O=O[L]){if(O.nodeType===1&&++K==J){break
}}return O},sibling:function(L,K){var J=[];for(;L;L=L.nextSibling){if(L.nodeType===1&&L!=K){J.push(L)
}}return J},attr:function(K,J,R){if(!K||K.nodeType===3||K.nodeType===8){return undefined
}var L=!c.isXMLDoc(K),Q=R!==undefined,O=SC.browser.msie;J=L&&c.props[J]||J;if(K.tagName){var P=G.test(J);
if(J==="selected"&&K.parentNode){K.parentNode.selectedIndex}if(J in K&&L&&!P){if(Q){if(J==="type"&&c.nodeName(K,"input")&&K.parentNode){throw"type property can't be changed"
}K[J]=R}if(c.nodeName(K,"form")&&K.getAttributeNode(J)){return K.getAttributeNode(J).nodeValue
}if(J==="tabIndex"){var S=K.getAttributeNode("tabIndex");return S&&S.specified?S.value:K.nodeName.match(l)?0:K.nodeName.match(/^(a|area)$/i)&&K.href?0:undefined
}return K[J]}if(O&&L&&J==="style"){return c.attr(K.style,"cssText",R)}if(Q){K.setAttribute(J,""+R)
}var N=(O&&L&&P)?K.getAttribute(J,2):K.getAttribute(J);return N===null?undefined:N
}if(O&&J==="opacity"){if(Q){K.zoom=1;K.filter=(K.filter||"").replace(B,"")+(parseInt(R,0)+""=="NaN"?"":"alpha(opacity="+R*100+")")
}return K.filter&&K.filter.indexOf("opacity=")>=0?(parseFloat(K.filter.match(w)[1])/100)+"":""
}J=J.camelize();if(Q){K[J]=R}return K[J]}});c.fn.init.prototype=c.fn;c.each({parent:function(J){return J.parentNode
},parents:function(J){return c.dir(J,"parentNode")},next:function(J){return c.nth(J,2,"nextSibling")
},prev:function(J){return c.nth(J,2,"previousSibling")},nextAll:function(J){return c.dir(J,"nextSibling")
},prevAll:function(J){return c.dir(J,"previousSibling")},siblings:function(J){return c.sibling(J.parentNode.firstChild,J)
},children:function(J){return c.sibling(J.firstChild)},contents:function(J){return c.nodeName(J,"iframe")?J.contentDocument||J.contentWindow.document:c.makeArray(J.childNodes)
}},function(J,K){c.fn[J]=function(L){var N=c.map(this,K);if(L&&typeof L==="string"){N=c.multiFilter(L,N)
}return this.pushStack(N.uniq())}});c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(J,K){c.fn[J]=function(){var L=arguments;
return this.each(function(){for(var N=0,O=L.length;N<O;N++){c(L[N])[K](this)}})}});
c.each({removeAttr:function(J){c.attr(this,J,"");if(this.nodeType===1){this.removeAttribute(J)
}},addClass:function(J){c.className.add(this,J)},removeClass:function(J){c.className.remove(this,J)
},toggleClass:function(J){c.className[c.className.has(this,J)?"remove":"add"](this,J)
},remove:function(J){if(!J||c.filter(J,[this]).length){if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){while(this.firstChild){this.removeChild(this.firstChild)}}},function(J,K){c.fn[J]=function(){return this.each(K,arguments)
}});c.each(["Height","Width"],function(O,L){var P=L.toLowerCase(),K;c.fn[P]=function(Q){if(this[0]===window){if(SC.browser.opera){K=document.body["client"+L]
}else{if(SC.browser.safari){K=window["inner"+L]}else{if(document.compatMode){K=documentElement["client"+L]
}else{K=document.body["client"+L]}}}}else{if(this[0]===document){K=Math.max(Math.max(document.body["scroll"+L],document.documentElement["scroll"+L]),Math.max(document.body["offset"+L],document.documentElement["offset"+L]))
}else{if(Q===undefined){return this.length?c.css(this[0],P):null}else{return this.css(P,(typeof Q==="string")?Q:Q+"px")
}}}return K};var J=O?"Left":"Top",N=O?"Right":"Bottom";c.fn["inner"+L]=function(){return this[L.toLowerCase()]()+n(this,"padding"+J)+n(this,"padding"+N)
};c.fn["outer"+L]=function(Q){return this["inner"+L]()+n(this,"border"+J+"Width")+n(this,"border"+N+"Width")+(Q?n(this,"margin"+J)+n(this,"margin"+N):0)
}});z.fn.offset=function(){var K=0,T=0,L=this[0],Y=SC.browser,P;if(!L){return undefined
}function O(Z){X(c.curCSS(Z,"borderLeftWidth",true),c.curCSS(Z,"borderTopWidth",true))
}function X(Z,aa){K+=parseInt(Z,10)||0;T+=parseInt(aa,10)||0}var V=L.parentNode,S=L,J=L.offsetParent,U=L.ownerDocument,W=Y.safari&&parseInt(Y.version,0)<522&&!(/adobeair/i).test(Y.userAgent),R=c.curCSS,N=c.css(L,"position")==="fixed";
if(!(Y.mozilla&&L==document.body)&&L.getBoundingClientRect){var Q=L.getBoundingClientRect();
X(Q.left+Math.max(U.documentElement.scrollLeft,U.body.scrollLeft),Q.top+Math.max(U.documentElement.scrollTop,U.body.scrollTop));
X(-U.documentElement.clientLeft,-U.documentElement.clientTop)}else{X(L.offsetLeft,L.offsetTop);
while(J){X(J.offsetLeft,J.offsetTop);if(Y.mozilla&&!(/^t(able|d|h)$/i).test(J.tagName)||Y.safari&&!W){O(J)
}if(!N&&R(J,"position")==="fixed"){N=true}S=(/^body$/i).test(J.tagName)?S:J;J=J.offsetParent
}while(V&&V.tagName&&!(h).test(V.tagName)){if(!(/^inline|table.*$/i).test(R(V,"display"))){X(-V.scrollLeft,-V.scrollTop)
}if(Y.mozilla&&R(V,"overflow")!=="visible"){O(V)}V=V.parentNode}if((W&&(N||R(S,"position")==="absolute"))||(Y.mozilla&&R(S,"position")!=="absolute")){X(-U.body.offsetLeft,-U.body.offsetTop)
}if(N){X(Math.max(U.documentElement.scrollLeft,U.body.scrollLeft),Math.max(U.documentElement.scrollTop,U.body.scrollTop))
}}P={top:T,left:K};return P};z.fn.mixin({position:function(){var O=0,N=0,K;if(this[0]){var L=this.offsetParent(),P=this.offset(),J=h.test(L[0].tagName)?{top:0,left:0}:L.offset();
P.top-=n(this,"marginTop");P.left-=n(this,"marginLeft");J.top+=n(L,"borderTopWidth");
J.left+=n(L,"borderLeftWidth");K={top:P.top-J.top,left:P.left-J.left}}return K},offsetParent:function(){var J=this[0].offsetParent||document.body;
while(J&&(!(h).test(J.tagName)&&c.css(J,"position")==="static")){J=J.offsetParent
}return c(J)}});c.each(["Left","Top"],function(K,J){var L="scroll"+J;c.fn[L]=function(N){if(!this[0]){return
}return N!==undefined?this.each(function(){this==window||this==document?window.scrollTo(!K?N:c(window).scrollLeft(),K?N:c(window).scrollTop()):this[L]=N
}):this[0]==window||this[0]==document?self[K?"pageYOffset":"pageXOffset"]||c.boxModel&&document.documentElement[L]||document.body[L]:this[0][L]
}});return z}());SC.$=(typeof jQuery=="undefined")?SC.CoreQuery:jQuery;SC.mixin(SC.$.fn,{isCoreQuery:YES,toString:function(){var c=[],b=this.length,a=0;
for(a=0;a<b;a++){c[a]="%@: %@".fmt(a,this[a]?this[a].toString():"(null)")}return"<$:%@>(%@)".fmt(SC.guidFor(this),c.join(" , "))
},isVisible:function(){return Array.prototype.every.call(this,function(a){return SC.$.isVisible(a)
})},first:function(){return this.pushStack([this[0]])},last:function(){return this.pushStack([this[this.length-1]])
},view:function(){return this.map(function(){var b=null,a=SC.viewKey,d=this,c;while(!b&&d&&(d!==document)){if(d.nodeType===1&&(c=d.getAttribute("id"))){b=SC.View.views[c]
}d=d.parentNode}d=null;return b})},setClass:function(d,c){if(SC.none(d)){return this
}var e=SC.typeOf(d)!==SC.T_STRING,a=this._fixupClass,b;this.each(function(){if(this.nodeType!==1){return
}var h=this.className.split(/\s+/),g=NO;if(e){for(var f in d){if(!d.hasOwnProperty(f)){continue
}g=a(h,f,d[f])||g}}else{g=a(h,d,c)}if(g){this.className=h.join(" ")}});return this
},_fixupClass:function(d,a,c){var b=d.indexOf(a);if(c){if(b<0){d.push(a);return YES
}}else{if(b>=0){d[b]=null;return YES}}return NO},within:function(e){e=SC.$(e);var d,c,g,b,a=e.length,f=this.length;
while(!d&&(--f>=0)){g=this[f];for(b=0;!d&&(b<a);b++){c=e[b];while(c&&(c!==g)){c=c.parentNode
}d=c===g}}g=c=null;return d}});(function(){var c={},f={find:function(k,h){return(h!==undefined)?SC.Enumerable.find.call(this,k,h):c.find.call(this,k)
},filter:function(k,h){return(h!==undefined)?this.pushStack(SC.Enumerable.filter.call(this,k,h)):c.filter.call(this,k)
},filterProperty:function(h,k){return this.pushStack(SC.Enumerable.filterProperty.call(this,h,k))
},indexOf:SC.$.index,map:function(k,h){return(h!==undefined)?SC.Enumerable.map.call(this,k,h):c.map.call(this,k)
}};var g=SC.$.jquery==="SC.CoreQuery",d=SC.$.fn,a=g?f:SC.Enumerable,e;for(var b in a){if(!a.hasOwnProperty(b)){continue
}e=a[b];if(b in f){c[b]=d[b];e=f[b]}d[b]=e}})();SC.mixin(SC.$,{isVisible:function(a){var b=SC.$;
return("hidden"!=a.type)&&(b.css(a,"display")!="none")&&(b.css(a,"visibility")!="hidden")
}});sc_require("system/core_query");SC.Event=function(a){if(a){this.originalEvent=a;
var f=SC.Event._props,d=f.length,h=d,k;while(--h>=0){k=f[h];this[k]=a[k]}}this.timeStamp=this.timeStamp||Date.now();
if(!this.target){this.target=this.srcElement||document}if(this.target.nodeType===3){this.target=this.target.parentNode
}if(!this.relatedTarget&&this.fromElement){this.relatedTarget=(this.fromElement===this.target)?this.toElement:this.fromElement
}if(SC.none(this.pageX)&&!SC.none(this.clientX)){var g=document.documentElement,c=document.body;
this.pageX=this.clientX+(g&&g.scrollLeft||c&&c.scrollLeft||0)-(g.clientLeft||0);this.pageY=this.clientY+(g&&g.scrollTop||c&&c.scrollTop||0)-(g.clientTop||0)
}if(!this.which&&((this.charCode||a.charCode===0)?this.charCode:this.keyCode)){this.which=this.charCode||this.keyCode
}if(!this.metaKey&&this.ctrlKey){this.metaKey=this.ctrlKey}if(!this.which&&this.button){this.which=((this.button&1)?1:((this.button&2)?3:((this.button&4)?2:0)))
}if(this.type==="mousewheel"||this.type==="DOMMouseScroll"){var b=1,e=parseFloat(SC.browser.version);
if(SC.browser.safari&&a.wheelDelta!==undefined){this.wheelDelta=0-(a.wheelDeltaY||a.wheelDeltaX);
this.wheelDeltaY=0-(a.wheelDeltaY||0);this.wheelDeltaX=0-(a.wheelDeltaX||0);if(e===533.17){b=0.004
}else{if(e<533||e>=534){b=40}}}else{if(!SC.none(a.detail)){b=10;if(a.axis&&(a.axis===a.HORIZONTAL_AXIS)){this.wheelDeltaX=a.detail;
this.wheelDeltaY=this.wheelDelta=0}else{this.wheelDeltaY=this.wheelDelta=a.detail;
this.wheelDeltaX=0}}else{this.wheelDelta=this.wheelDeltaY=SC.browser.msie?0-a.wheelDelta:a.wheelDelta;
this.wheelDeltaX=0}}this.wheelDelta*=b;this.wheelDeltaX*=b;this.wheelDeltaY*=b}return this
};SC.mixin(SC.Event,{create:function(a){return new SC.Event(a)},add:function(e,d,f,g,c){if(e&&e.isCoreQuery){if(e.length>0){e.forEach(function(h){this.add(h,d,f,g,c)
},this);return this}else{e=e[0]}}if(!e){return this}if(e.nodeType===3||e.nodeType===8){return SC.Event
}if(SC.browser.msie&&e.setInterval){e=window}if(SC.typeOf(f)===SC.T_FUNCTION){c=g;
g=f;f=null}else{if(f&&SC.typeOf(g)===SC.T_STRING){g=f[g]}}var b=SC.data(e,"events")||SC.data(e,"events",{}),a=b[d];
if(!a){a=b[d]={};this._addEventListener(e,d)}a[SC.hashFor(f,g)]=[f,g,c];SC.Event._global[d]=YES;
e=b=a=null;return this},remove:function(f,e,g,h){if(f&&f.isCoreQuery){if(f.length>0){f.forEach(function(k){this.remove(k,e,g,h)
},this);return this}else{f=f[0]}}if(!f){return this}if(f.nodeType===3||f.nodeType===8){return SC.Event
}if(SC.browser.msie&&f.setInterval){f=window}var a,d,c=SC.data(f,"events");if(!c){return this
}if(e===undefined){for(e in c){this.remove(f,e)}}else{if(a=c[e]){var b=NO;if(g||h){if(SC.typeOf(g)===SC.T_FUNCTION){h=g;
g=null}else{if(SC.typeOf(h)===SC.T_STRING){h=g[h]}}delete a[SC.hashFor(g,h)];d=null;
for(d in a){break}if(d===null){b=YES}}else{b=YES}if(b){delete c[e];this._removeEventListener(f,e)
}d=null;for(d in c){break}if(!d){SC.removeData(f,"events");delete this._elements[SC.guidFor(f)]
}}}f=c=a=null;return this},NO_BUBBLE:["blur","focus","change"],simulateEvent:function(d,c,b){var a=SC.Event.create({type:c,target:d,preventDefault:function(){this.cancelled=YES
},stopPropagation:function(){this.bubbles=NO},allowDefault:function(){this.hasCustomEventHandling=YES
},timeStamp:Date.now(),bubbles:(this.NO_BUBBLE.indexOf(c)<0),cancelled:NO,normalized:YES});
if(b){SC.mixin(a,b)}return a},trigger:function(c,b,k,l){if(c&&c.isCoreQuery){if(c.length>0){c.forEach(function(q){this.trigger(q,b,k,l)
},this);return this}else{c=c[0]}}if(!c){return this}if(c.nodeType===3||c.nodeType===8){return undefined
}k=SC.A(k);var h,m=SC.typeOf(c[b]||null)===SC.T_FUNCTION,a,g,d,n;a=k[0];if(!a||!a.preventDefault){a=this.simulateEvent(c,b);
k.unshift(a)}a.type=b;g=c;do{h=SC.Event.handle.apply(g,k);g=(g===document)?null:(g.parentNode||document)
}while(!h&&a.bubbles&&g);g=null;d=c["on"+b];n=SC.CoreQuery.nodeName(c,"a")&&b==="click";
if((!m||n)&&d&&d.apply(c,k)===NO){h=NO}if(m&&l!==NO&&h!==NO&&!n){this.triggered=YES;
try{c[b]()}catch(f){}}this.triggered=NO;return h},handle:function(b){if((typeof SC==="undefined")||SC.Event.triggered){return YES
}var c,g,e,k,d,h,l,m,a,f;h=SC.A(arguments);h[0]=b=SC.Event.normalizeEvent(b||window.event);
d=(SC.data(this,"events")||{})[b.type];if(!d){return NO}for(l in d){m=d[l];a=m[1];
b.handler=a;b.data=b.context=m[2];f=m[0]||this;g=a.apply(f,h);if(c!==NO){c=g}if(g===NO){b.preventDefault();
b.stopPropagation()}}return c},unload:function(){var a,b=this._elements;for(a in b){this.remove(b[a])
}for(a in b){delete b[a]}delete this._elements},special:{ready:{setup:function(){SC._bindReady();
return},teardown:function(){return}},mouseenter:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseover",SC.Event.special.mouseenter.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseover",SC.Event.special.mouseenter.handler);return YES
},handler:function(a){if(SC.Event._withinElement(a,this)){return YES}a.type="mouseenter";
return SC.Event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},handler:function(a){if(SC.Event._withinElement(a,this)){return YES
}a.type="mouseleave";return SC.Event.handle.apply(this,arguments)}}},KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,_withinElement:function(d,c){var b=d.relatedTarget;
while(b&&b!=c){try{b=b.parentNode}catch(a){b=c}}return b===c},_addEventListener:function(d,c){var e,b=this.special[c];
if(!b||b.setup.call(d)===NO){var a=SC.guidFor(d);this._elements[a]=d;e=SC.data(d,"listener")||SC.data(d,"listener",function(){return SC.Event.handle.apply(SC.Event._elements[a],arguments)
});if(d.addEventListener){d.addEventListener(c,e,NO)}else{if(d.attachEvent){d.attachEvent("on"+c,e)
}}}d=b=e=null},_removeEventListener:function(c,b){var d,a=SC.Event.special[b];if(!a||(a.teardown.call(c)===NO)){d=SC.data(c,"listener");
if(d){if(c.removeEventListener){c.removeEventListener(b,d,NO)}else{if(c.detachEvent){c.detachEvent("on"+b,d)
}}}}c=a=d=null},_elements:{},normalizeEvent:function(a){if(a===window.event){return SC.Event.create(a)
}else{return a.normalized?a:SC.Event.create(a)}},_global:{},_props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view which touches targetTouches changedTouches animationName elapsedTime".split(" ")});
SC.Event.prototype={hasCustomEventHandling:NO,touchesForView:function(a){if(this.touchContext){return this.touchContext.touchesForView(a)
}},averagedTouchesForView:function(a){if(this.touchContext){return this.touchContext.averagedTouchesForView(a)
}return null},allowDefault:function(){this.hasCustomEventHandling=YES;return this
},preventDefault:function(){var a=this.originalEvent;if(a){if(a.preventDefault){a.preventDefault()
}a.returnValue=NO}this.hasCustomEventHandling=YES;return this},stopPropagation:function(){var a=this.originalEvent;
if(a){if(a.stopPropagation){a.stopPropagation()}a.cancelBubble=YES}this.hasCustomEventHandling=YES;
return this},stop:function(){return this.preventDefault().stopPropagation()},normalized:YES,getCharString:function(){if(SC.browser.msie){if(this.keyCode==8||this.keyCode==9||(this.keyCode>=37&&this.keyCode<=40)){return String.fromCharCode(0)
}else{return(this.keyCode>0)?String.fromCharCode(this.keyCode):null}}else{return(this.charCode>0)?String.fromCharCode(this.charCode):null
}},commandCodes:function(){var e=this.keyCode,b=null,c=null,a="",d;if(e){b=SC.FUNCTION_KEYS[e];
if(!b&&(this.altKey||this.ctrlKey||this.metaKey)){b=SC.PRINTABLE_KEYS[e]}if(b){if(this.altKey){a+="alt_"
}if(this.ctrlKey||this.metaKey){a+="ctrl_"}if(this.shiftKey){a+="shift_"}}}if(!b){e=this.which;
c=b=String.fromCharCode(e);d=b.toLowerCase();if(this.metaKey){a="meta_";b=d}else{b=null
}}if(b){b=a+b}return[b,c]}};SC.Event.observe=SC.Event.add;SC.Event.stopObserving=SC.Event.remove;
SC.Event.fire=SC.Event.trigger;if(SC.browser.msie){SC.Event.add(window,"unload",SC.Event.prototype,SC.Event.unload)
}SC.MODIFIER_KEYS={16:"shift",17:"ctrl",18:"alt"};SC.FUNCTION_KEYS={8:"backspace",9:"tab",13:"return",19:"pause",27:"escape",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"printscreen",45:"insert",46:"delete",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock"};
SC.PRINTABLE_KEYS={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'};
SC.SYSTEM_CURSOR="default";SC.AUTO_CURSOR=SC.DEFAULT_CURSOR="auto";SC.CROSSHAIR_CURSOR="crosshair";
SC.HAND_CURSOR=SC.POINTER_CURSOR="pointer";SC.MOVE_CURSOR="move";SC.E_RESIZE_CURSOR="e-resize";
SC.NE_RESIZE_CURSOR="ne-resize";SC.NW_RESIZE_CURSOR="nw-resize";SC.N_RESIZE_CURSOR="n-resize";
SC.SE_RESIZE_CURSOR="se-resize";SC.SW_RESIZE_CURSOR="sw-resize";SC.S_RESIZE_CURSOR="s-resize";
SC.W_RESIZE_CURSOR="w-resize";SC.IBEAM_CURSOR=SC.TEXT_CURSOR="text";SC.WAIT_CURSOR="wait";
SC.HELP_CURSOR="help";SC.Cursor=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("cursorStyle")||SC.DEFAULT_CURSOR,c=this.constructor.sharedStyleSheet(),b=SC.guidFor(this);
if(c.insertRule){c.insertRule("."+b+" {cursor: "+a+";}",c.cssRules?c.cssRules.length:0)
}else{if(c.addRule){c.addRule("."+b,"cursor: "+a)}}this.cursorStyle=a;this.className=b;
return this},className:null,cursorStyle:SC.DEFAULT_CURSOR,cursorStyleDidChange:function(){var d,f,c,e,g,b,a;
d=this.get("cursorStyle")||SC.DEFAULT_CURSOR;f=this._rule;if(f){f.style.cursor=d;
return}c="."+this.get("className");e=this.constructor.sharedStyleSheet();g=(e.cssRules?e.cssRules:e.rules)||[];
for(b=0,a=g.length;b<a;++b){f=g[b];if(f.selectorText===c){this._rule=f;f.style.cursor=d;
break}}}.observes("cursorStyle")});SC.Cursor.sharedStyleSheet=function(){var b,a=this._styleSheet;
if(!a){a=document.createElement("style");a.type="text/css";b=document.getElementsByTagName("head")[0];
if(!b){b=document.documentElement}b.appendChild(a);a=document.styleSheets[document.styleSheets.length-1];
this._styleSheet=a}return a};SC.Responder=SC.Object.extend({isResponder:YES,pane:null,responderContext:null,nextResponder:null,isFirstResponder:NO,hasFirstResponder:NO,acceptsFirstResponder:YES,becomingFirstResponder:NO,becomeFirstResponder:function(){var a=this.get("pane")||this.get("responderContext")||this.pane();
if(a&&this.get("acceptsFirstResponder")){if(a.get("firstResponder")!==this){a.makeFirstResponder(this)
}}return this},resignFirstResponder:function(a){var b=this.get("pane")||this.get("responderContext");
if(b&&(b.get("firstResponder")===this)){b.makeFirstResponder(null,a)}return YES},willLoseFirstResponder:function(a){},didBecomeFirstResponder:function(a){}});
sc_require("system/browser");sc_require("system/event");sc_require("system/cursor");
sc_require("system/responder");sc_require("mixins/string");SC.viewKey=SC.guidKey+"_view";
SC.LAYOUT_HORIZONTAL="sc-layout-horizontal";SC.LAYOUT_VERTICAL="sc-layout-vertical";
SC._VIEW_DEFAULT_DIMS="marginTop marginLeft".w();SC.ANCHOR_TOP={top:0};SC.ANCHOR_LEFT={left:0};
SC.ANCHOR_TOP_LEFT={top:0,left:0};SC.ANCHOR_BOTTOM={bottom:0};SC.ANCHOR_RIGHT={right:0};
SC.ANCHOR_BOTTOM_RIGHT={bottom:0,right:0};SC.FULL_WIDTH={left:0,right:0};SC.FULL_HEIGHT={top:0,bottom:0};
SC.ANCHOR_CENTER={centerX:0,centerY:0};SC.LAYOUT_AUTO="auto";SC.CONTEXT_MENU_ENABLED=YES;
SC.TABBING_ONLY_INSIDE_DOCUMENT=YES;SC.EMPTY_CHILD_VIEWS_ARRAY=[];SC.EMPTY_CHILD_VIEWS_ARRAY.needsClone=YES;
SC.View=SC.Responder.extend(SC.DelegateSupport,{concatenatedProperties:"outlets displayProperties layoutProperties classNames renderMixin didCreateLayerMixin willDestroyLayerMixin".w(),pane:function(){var a=this;
while(a&&!a.isPane){a=a.get("parentView")}return a}.property("parentView").cacheable(),page:null,splitView:function(){var a=this;
while(a&&!a.isSplitView){a=a.get("parentView")}return a}.property("parentView").cacheable(),parentView:null,backgroundColor:null,useStaticLayout:NO,isEnabled:YES,isEnabledBindingDefault:SC.Binding.oneWay().bool(),isEnabledInPane:function(){var a=this.get("isEnabled"),b;
if(a&&(b=this.get("parentView"))){a=b.get("isEnabledInPane")}return a}.property("parentView","isEnabled"),_sc_view_isEnabledDidChange:function(){if(!this.get("isEnabled")&&this.get("isFirstResponder")){this.resignFirstResponder()
}}.observes("isEnabled"),isVisible:YES,isVisibleBindingDefault:SC.Binding.bool(),isVisibleInWindow:NO,isContextMenuEnabled:function(){return SC.CONTEXT_MENU_ENABLED
}.property(),recomputeIsVisibleInWindow:function(c){var e=this.get("isVisibleInWindow"),g=this.get("isVisible"),d;
if(g){if(c===undefined){d=this.get("parentView");c=d?d.get("isVisibleInWindow"):NO
}g=g&&c}if(e!==g){this.set("isVisibleInWindow",g);var f=this.get("childViews"),b=f.length,a;
for(a=0;a<b;a++){f[a].recomputeIsVisibleInWindow(g)}if(g){if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{if(this.get("isFirstResponder")){this.resignFirstResponder()}}}this.updateLayerIfNeeded(YES);
return this},_sc_isVisibleDidChange:function(){this.displayDidChange();this.recomputeIsVisibleInWindow()
}.observes("isVisible"),childViews:SC.EMPTY_CHILD_VIEWS_ARRAY,insertBefore:function(b,d){b.beginPropertyChanges();
if(b.get("parentView")){b.removeFromParent()}if(this.willAddChild){this.willAddChild(b,d)
}if(b.willAddToParent){b.willAddToParent(this,d)}b.set("parentView",this);var a,c=this.get("childViews");
if(c.needsClone){this.set(c=[])}a=(d)?c.indexOf(d):c.length;if(a<0){a=c.length}c.insertAt(a,b);
b.parentViewDidChange();b.layoutDidChange();var e=b.get("pane");if(e&&e.get("isPaneAttached")){b._notifyDidAppendToDocument()
}if(this.didAddChild){this.didAddChild(b,d)}if(b.didAddToParent){b.didAddToParent(this,d)
}b.endPropertyChanges();return this},removeChild:function(b){if(!b){return this}if(b.parentView!==this){throw"%@.removeChild(%@) must belong to parent".fmt(this,b)
}if(b.willRemoveFromParent){b.willRemoveFromParent()}if(this.willRemoveChild){this.willRemoveChild(b)
}b.set("parentView",null);var c=this.get("childViews"),a=c.indexOf(b);if(a>=0){c.removeAt(a)
}b.parentViewDidChange();if(this.didRemoveChild){this.didRemoveChild(b)}if(b.didRemoveFromParent){b.didRemoveFromParent(this)
}return this},removeAllChildren:function(){var b=this.get("childViews"),a;while(a=b.objectAt(b.get("length")-1)){this.removeChild(a)
}return this},removeFromParent:function(){var a=this.get("parentView");if(a){a.removeChild(this)
}return this},replaceChild:function(a,b){a.beginPropertyChanges();b.beginPropertyChanges();
this.beginPropertyChanges();this.insertBefore(a,b).removeChild(b);this.endPropertyChanges();
b.endPropertyChanges();a.endPropertyChanges();return this},replaceAllChildren:function(c){var b=c.get("length"),a;
this.beginPropertyChanges();this.destroyLayer().removeAllChildren();for(a=0;a<b;a++){this.appendChild(c.objectAt(a))
}this.replaceLayer();this.endPropertyChanges();return this},appendChild:function(a){return this.insertBefore(a,null)
},parentViewDidChange:function(){this.recomputeIsVisibleInWindow();this.set("layerLocationNeedsUpdate",YES);
this.invokeOnce(this.updateLayerLocationIfNeeded);this._invalidatePaneCacheForSelfAndAllChildViews();
return this},_invalidatePaneCacheForSelfAndAllChildViews:function(){var d,c=this.get("childViews"),b=c.length,a;
this.notifyPropertyChange("pane");for(a=0;a<b;++a){d=c[a];if(d._invalidatePaneCacheForSelfAndAllChildViews){d._invalidatePaneCacheForSelfAndAllChildViews()
}}},layer:function(a,c){if(c!==undefined){this._view_layer=c}else{c=this._view_layer;
if(!c){var b=this.get("parentView");if(b){b=b.get("layer")}if(b){this._view_layer=c=this.findLayerInParentLayer(b)
}b=null}}return c}.property("isVisibleInWindow").cacheable(),$:function(c){var a,b=this.get("layer");
a=!b?SC.$([]):(c===undefined)?SC.$(b):SC.$(c,b);b=null;return a},containerLayer:function(){return this.get("layer")
}.property("layer").cacheable(),layerId:function(a,b){if(b){this._layerId=b}if(this._layerId){return this._layerId
}return SC.guidFor(this)}.property().cacheable(),_lastLayerId:null,layerIdDidChange:function(){var a=this.get("layer"),b=this.get("layerId"),c=this._lastLayerId;
if(b!==c){if(c&&SC.View.views[c]===this){delete SC.View.views[c]}this._lastLayerId=b;
SC.View.views[b]=this;if(a){a.id=b}}}.observes("layerId"),findLayerInParentLayer:function(e){var f=this.get("layerId"),c,h,b,k,d,g;
d=document.getElementById(f);if(SC.browser.msie&&d&&d.id!==f){d=null}if(!d){d=e.firstChild;
var a=[];a.push(e);while(a.length!==0){c=a.shift();if(c.id===f){return c}k=c.childNodes;
for(h=0,b=k.length;h<b;++h){a.push(k[h])}}d=null}return d},isDescendantOf:function(a){var b=this.get("parentView");
if(this===a){return YES}else{if(b){return b.isDescendantOf(a)}else{return NO}}},displayDidChange:function(){this.set("layerNeedsUpdate",YES);
return this},layerNeedsUpdate:NO,_view_layerNeedsUpdateDidChange:function(){if(this.get("layerNeedsUpdate")){this.invokeOnce(this.updateLayerIfNeeded)
}}.observes("layerNeedsUpdate"),updateLayerIfNeeded:function(b){var c=this.get("layerNeedsUpdate"),a=c&&(b||this.get("isVisibleInWindow"));
if(a){if(this.get("layer")){this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);
this.updateLayer();this.endPropertyChanges()}}return this},updateLayer:function(){var a=this.renderContext(this.get("layer"));
this.prepareContext(a,NO);a.update();if(a._innerHTMLReplaced){var b=this.get("pane");
if(b&&b.get("isPaneAttached")){this._notifyDidAppendToDocument()}}if(this.useStaticLayout){this.viewDidResize()
}if(this.didUpdateLayer){this.didUpdateLayer()}if(this.designer&&this.designer.viewDidUpdateLayer){this.designer.viewDidUpdateLayer()
}return this},renderContext:function(a){return SC.RenderContext(a)},createLayer:function(){if(this.get("layer")){return this
}var a=this.renderContext(this.get("tagName"));this.prepareContext(a,YES);this.set("layer",a.element());
this._notifyDidCreateLayer();return this},_notifyDidCreateLayer:function(){if(this.didCreateLayer){this.didCreateLayer()
}var c=this.didCreateLayerMixin,b,a,d=this.get("childViews"),e;if(c){b=c.length;for(a=0;
a<b;++a){c[a].call(this)}}b=d.length;for(a=0;a<b;++a){e=d[a];if(!e){continue}e.notifyPropertyChange("layer");
e._notifyDidCreateLayer()}},destroyLayer:function(){var a=this.get("layer");if(a){this._notifyWillDestroyLayer();
if(a.parentNode){a.parentNode.removeChild(a)}a=null}return this},replaceLayer:function(){this.destroyLayer();
this.set("layerLocationNeedsUpdate",YES);this.invokeOnce(this.updateLayerLocationIfNeeded)
},_notifyWillDestroyLayer:function(){if(this.willDestroyLayer){this.willDestroyLayer()
}var c=this.willDestroyLayerMixin,b,a,d=this.get("childViews");if(c){b=c.length;for(a=0;
a<b;++a){c[a].call(this)}}b=d.length;for(a=0;a<b;++a){d[a]._notifyWillDestroyLayer()
}this.set("layer",null)},prepareContext:function(c,b){var e,f,g,d,k,h,a;if(b){d=this.layerId?this.get("layerId"):SC.guidFor(this);
c.id(d).classNames(this.get("classNames"),YES);this.renderLayout(c,b)}else{c.resetClassNames();
c.classNames(this.get("classNames"),YES)}a=[];if(this.get("isTextSelectable")){a.push("allow-select")
}if(!this.get("isEnabled")){a.push("disabled")}if(!this.get("isVisible")){a.push("hidden")
}if(this.get("isFirstResponder")){a.push("focus")}if(this.get("useStaticLayout")){a.push("sc-static-layout")
}k=this.get("backgroundColor");if(k){c.addStyle("backgroundColor",k)}h=this.get("cursor");
if(!h&&this.get("shouldInheritCursor")){h=this.getPath("parentView.cursor")}if(SC.typeOf(h)===SC.T_STRING){h=SC.objectForPropertyPath(h)
}if(h instanceof SC.Cursor){a.push(h.get("className"))}c.addClass(a);this.beginPropertyChanges();
this.set("layerNeedsUpdate",NO);this.render(c,b);if(e=this.renderMixin){f=e.length;
for(g=0;g<f;++g){e[g].call(this,c,b)}}this.endPropertyChanges()},renderChildViews:function(e,f){var d=this.get("childViews"),b=d.length,a,c;
for(a=0;a<b;++a){c=d[a];if(!c){continue}e=e.begin(c.get("tagName"));c.prepareContext(e,f);
e=e.end()}return e},render:function(a,b){if(b){this.renderChildViews(a,b)}},_notifyDidAppendToDocument:function(){if(this.didAppendToDocument){this.didAppendToDocument()
}var c=0,d,a,b=this.get("childViews");for(c=0,a=b.length;c<a;c++){d=b[c];if(d._notifyDidAppendToDocument){d._notifyDidAppendToDocument()
}}},childViewsObserver:function(){var c=this.get("childViews"),b,a,d;for(b=0,a=c.length;
b<a;b++){d=c[b];if(d._notifyDidAppendToDocument){d._notifyDidAppendToDocument()}}}.observes("childViews"),tagName:"div",classNames:["sc-view"],toolTip:null,isTextSelectable:NO,displayProperties:["isFirstResponder"],cursor:null,shouldInheritCursor:YES,layerLocationNeedsUpdate:NO,updateLayerLocationIfNeeded:function(a){if(this.get("layerLocationNeedsUpdate")){this.updateLayerLocation()
}return this},updateLayerLocation:function(){var e=this.get("layer"),d=this.get("parentView"),b=d?d.get("containerLayer"):null;
if(e&&e.parentNode&&e.parentNode!==b){e.parentNode.removeChild(e)}if(!d){if(e&&e.parentNode){e.parentNode.removeChild(e)
}}else{if(!b){if(e){if(e.parentNode){e.parentNode.removeChild(e)}this.destroyLayer()
}}else{if(!e){this.createLayer();e=this.get("layer");if(!e){return}}var f=d.get("childViews"),c=f.objectAt(f.indexOf(this)+1),a=(c)?c.get("layer"):null;
if(c&&(!a||a.parentNode!==b)){c.updateLayerLocationIfNeeded();a=c.get("layer")}if((e.parentNode!==b)||(e.nextSibling!==a)){b.insertBefore(e,a)
}}}b=d=e=a=null;this.set("layerLocationNeedsUpdate",NO);return this},nextResponder:function(){return this.get("parentView")
}.property("parentView").cacheable(),acceptsFirstResponder:NO,isKeyResponder:NO,willLoseKeyResponderTo:function(a){},willBecomeKeyResponderFrom:function(a){},didLoseKeyResponderTo:function(a){},didBecomeKeyResponderFrom:function(a){},interpretKeyEvents:function(b){var a=b.commandCodes(),d=a[0],e=a[1],g;
if(!d&&!e){return null}if(d){var h=SC.MODIFIED_KEY_BINDINGS[d]||SC.BASE_KEY_BINDINGS[d.match(/[^_]+$/)[0]];
if(h){var f=this,c=this.get("pane"),k=null;while(f&&!(k=f.tryToPerform(h,b))){f=(f===c)?null:f.get("nextResponder")
}return k}}if(e&&this.respondsTo("insertText")){g=this.insertText(e,b);return g?(g===YES?this:g):null
}return null},insertText:function(a){return NO},performKeyEquivalent:function(e,c){var d=NO,f=this.get("childViews"),b=f.length,a=-1;
while(!d&&(++a<b)){d=f[a].performKeyEquivalent(e,c)}return d},nextKeyView:null,nextValidKeyView:function(){var a=[],c=this.get("pane"),b=this.get("nextKeyView");
if(!b){b=c._computeNextValidKeyView(this,a)}if(SC.TABBING_ONLY_INSIDE_DOCUMENT&&!b){b=c._computeNextValidKeyView(c,a)
}return b}.property("nextKeyView"),_computeNextValidKeyView:function(g,b){var c=this.get("nextKeyView"),e,d,a,f;
if(this!==g&&b.indexOf(g)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}b.push(this);if(!c){e=this.get("childViews");for(d=0,a=e.length;d<a;d++){f=e[d];
if(f.get("isVisibleInWindow")&&f.get("isVisible")){c=f._computeNextValidKeyView(g,b)
}if(c){return c}}c=null}return c},previousKeyView:null,previousValidKeyView:function(){var a=[],c=this.pane(),b=this.get("previousKeyView");
if(!b){b=c._computePreviousValidKeyView(this,a)}return b}.property("previousKeyView"),_computePreviousValidKeyView:function(f,a){var b=this.get("previousKeyView"),d,c,e;
if(this!==f&&a.indexOf(f)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}a.push(this);if(!b){d=this.get("childViews");for(c=d.length-1;0<=c;c--){e=d[c];if(e.get("isVisibleInWindow")&&e.get("isVisible")){b=e._computePreviousValidKeyView(f,a)
}if(b){return b}}b=null}return b},init:function(){var e,g,c,b,a,d,h;arguments.callee.base.apply(this,arguments);
SC.View.views[this.get("layerId")]=this;var f=this.get("childViews");this.childViews=f?f.slice():[];
this.createChildViews();h=this.get("displayProperties");b=h.length;while(--b>=0){this.addObserver(h[b],this,this.displayDidChange)
}if(this.get("isDropTarget")){SC.Drag.addDropTarget(this)}if(this.get("isScrollable")){SC.Drag.addScrollableView(this)
}},awake:function(){arguments.callee.base.apply(this,arguments);var c=this.get("childViews"),b=c.length,a;
for(a=0;a<b;++a){if(!c[a]){continue}c[a].awake()}},destroy:function(){if(this.get("isDestroyed")){return this
}this._destroy();this.removeFromParent();if(this.get("isDropTarget")){SC.Drag.removeDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.removeScrollableView(this)}arguments.callee.base.apply(this,arguments);
return this},_destroy:function(){if(this.get("isDestroyed")){return this}this.destroyLayer();
var c=this.get("childViews"),b=c.length,a;if(b){c=c.slice();for(a=0;a<b;++a){c[a].destroy()
}}delete SC.View.views[this.get("layerId")];delete this._CQ;delete this.page;return this
},createChildViews:function(){var f=this.get("childViews"),b=f.length,a,e,d,c;this.beginPropertyChanges();
for(a=0;a<b;++a){if(e=(c=f[a])){if(typeof e===SC.T_STRING){c=this[e]}else{e=null}if(!c){console.error("No view with name "+e+" has been found in "+this.toString());
continue}if(c.isClass){c=this.createChildView(c);if(e){this[e]=c}}}f[a]=c}this.endPropertyChanges();
return this},createChildView:function(a,b){if(!b){b={}}b.owner=b.parentView=this;
b.isVisibleInWindow=this.get("isVisibleInWindow");if(!b.page){b.page=this.page}a=a.create(b);
return a},propertyDidChange:function(b,d,c){var a=false;if(typeof this.layout==="function"&&this._kvo_dependents){var e=this._kvo_dependents[b];
if(e&&e.indexOf("layout")!=-1){a=true}}if(b==="layout"||a){this.layoutDidChange()
}arguments.callee.base.apply(this,arguments)},adjust:function(a,d){var b=SC.clone(this.get("layout")),c=NO,f;
if(a===undefined){return this}if(SC.typeOf(a)===SC.T_STRING){f=b[a];if(SC.none(d)){if(f!==undefined){c=YES
}delete b[a]}else{if(f!==d){c=YES}b[a]=d}}else{var e=a;for(a in e){if(!e.hasOwnProperty(a)){continue
}d=e[a];f=b[a];if(d===null){if(f!==undefined){c=YES}delete b[a]}else{if(d!==undefined){if(f!==d){c=YES
}b[a]=d}}}}if(c){this.set("layout",b)}return this},layout:{top:0,left:0,bottom:0,right:0},convertFrameToView:function(k,d){var c=0,b=0,g=0,e=0,a=this,h;
while(a){h=a.get("frame");c+=h.x;b+=h.y;a=a.get("layoutView")}if(d){a=d;while(a){h=a.get("frame");
g+=h.x;e+=h.y;a=a.get("layoutView")}}c=k.x+c-g;b=k.y+b-e;return{x:c,y:b,width:k.width,height:k.height}
},convertFrameFromView:function(k,d){var c=0,b=0,g=0,e=0,a=this,h;while(a&&(h=a.get("frame"))){c+=h.x;
b+=h.y;a=a.get("parentView")}if(d){a=d;while(a){h=a.get("frame");g+=h.x;e+=h.y;a=a.get("parentView")
}}c=k.x-c+g;b=k.y-b+e;return{x:c,y:b,width:k.width,height:k.height}},scrollToVisible:function(){var a=this.get("parentView");
while(a&&!a.get("isScrollable")){a=a.get("parentView")}if(a){a.scrollToVisible();
return a.scrollToVisible(this)}else{return NO}},frame:function(){return this.computeFrameWithParentFrame(null)
}.property("useStaticLayout").cacheable(),computeFrameWithParentFrame:function(h){var w=this.get("layout"),v={},s,z,r=SC.LAYOUT_AUTO,u=this.get("useStaticLayout"),q=this.get("parentView"),k,d,n,b,a=w.right,c=w.left,y=w.top,g=w.bottom,x=w.width,e=w.height,m=w.centerX,l=w.centerY;
if(x!==undefined&&x===SC.LAYOUT_AUTO&&u!==undefined&&!u){s=SC.Error.desc(("%@.layout() cannot use width:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
console.error(s.toString());throw s}if(e!==undefined&&e===SC.LAYOUT_AUTO&&u!==undefined&&!u){s=SC.Error.desc(("%@.layout() cannot use height:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
console.error(s.toString());throw s}if(u){if(z=this.get("layer")){v=SC.viewportOffset(z);
if(q){v=q.convertFrameFromView(v,null)}v.width=z.offsetWidth;v.height=z.offsetHeight;
return v}return null}if(!h){h=this.computeParentDimensions(w)}k=h.height;d=h.width;
if(!SC.none(c)){if(SC.isPercentage(c)){v.x=d*c}else{v.x=c}if(x!==undefined){if(x===r){v.width=r
}else{if(SC.isPercentage(x)){v.width=d*x}else{v.width=x}}}else{v.width=d-v.x;if(a&&SC.isPercentage(a)){v.width=v.width-(a*d)
}else{v.width=v.width-(a||0)}}}else{if(!SC.none(a)){if(SC.none(x)){if(SC.isPercentage(a)){v.width=d-(d*a)
}else{v.width=d-a}v.x=0}else{if(x===r){v.width=r}else{if(SC.isPercentage(x)){v.width=d*x
}else{v.width=(x||0)}}if(SC.isPercentage(x)){v.x=d-(a*d)-v.width}else{v.x=d-a-v.width
}}}else{if(!SC.none(m)){if(x===r){v.width=r}else{if(SC.isPercentage(x)){v.width=x*d
}else{v.width=(x||0)}}if(SC.isPercentage(m)){v.x=(d-v.width)/2+(m*d)}else{v.x=(d-v.width)/2+m
}}else{v.x=0;if(SC.none(x)){v.width=d}else{if(x===r){v.width=r}if(SC.isPercentage(x)){v.width=x*d
}else{v.width=(x||0)}}}}}if(!SC.none(y)){if(SC.isPercentage(y)){v.y=y*k}else{v.y=y
}if(e!==undefined){if(e===r){v.height=r}else{if(SC.isPercentage(e)){v.height=e*k}else{v.height=e
}}}else{if(g&&SC.isPercentage(g)){v.height=k-v.y-(g*k)}else{v.height=k-v.y-(g||0)
}}}else{if(!SC.none(g)){if(SC.none(e)){if(SC.isPercentage(g)){v.height=k-(g*k)}else{v.height=k-g
}v.y=0}else{if(e===r){v.height=r}if(e&&SC.isPercentage(e)){v.height=e*k}else{v.height=(e||0)
}if(SC.isPercentage(g)){v.y=k-(g*k)-v.height}else{v.y=k-g-v.height}}}else{if(!SC.none(l)){if(e===r){v.height=r
}if(e&&SC.isPercentage(e)){v.height=e*k}else{v.height=(e||0)}if(SC.isPercentage(l)){v.y=(k-v.height)/2+(l*k)
}else{v.y=(k-v.height)/2+l}}else{v.y=0;if(SC.none(e)){v.height=k}else{if(e===r){v.height=r
}if(SC.isPercentage(e)){v.height=e*k}else{v.height=e||0}}}}}v.x=Math.floor(v.x);v.y=Math.floor(v.y);
if(v.height!==r){v.height=Math.floor(v.height)}if(v.width!==r){v.width=Math.floor(v.width)
}if(v.height===r||v.width===r){z=this.get("layer");if(v.height===r){v.height=z?z.clientHeight:0
}if(v.width===r){v.width=z?z.clientWidth:0}}if(this.get("hasBorder")){n=this.get("borderTop");
b=this.get("borderLeft");v.height-=n+this.get("borderBottom");v.y+=n;v.width-=b+this.get("borderRight");
v.x+=b}if(q&&q.isScrollContainer){q=q.get("parentView");v.x-=q.get("horizontalScrollOffset");
v.y-=q.get("verticalScrollOffset")}if(!SC.none(w.maxHeight)&&(v.height>w.maxHeight)){v.height=w.maxHeight
}if(!SC.none(w.minHeight)&&(v.height<w.minHeight)){v.height=w.minHeight}if(!SC.none(w.maxWidth)&&(v.width>w.maxWidth)){v.width=w.maxWidth
}if(!SC.none(w.minWidth)&&(v.width<w.minWidth)){v.width=w.minWidth}if(v.height<0){v.height=0
}if(v.width<0){v.width=0}return v},computeParentDimensions:function(e){var b,c=this.get("parentView"),a=(c)?c.get("frame"):null;
if(a){b={width:a.width,height:a.height}}else{var d=e;b={width:(d.left||0)+(d.width||0)+(d.right||0),height:(d.top||0)+(d.height||0)+(d.bottom||0)}
}return b},clippingFrame:function(){var d=this.get("frame"),a=d,b,c;if(!d){return null
}b=this.get("parentView");if(b){c=b.get("contentClippingFrame");if(!c){return d}a=SC.intersectRects(c,d)
}a.x-=d.x;a.y-=d.y;return a}.property("parentView","frame").cacheable(),contentClippingFrame:function(){return this.get("clippingFrame")
}.property("clippingFrame").cacheable(),_sc_view_clippingFrameDidChange:function(){var d=this.get("childViews"),b=d.length,a,c;
for(a=0;a<b;++a){c=d[a];if(!c.hasStaticLayout){c.notifyPropertyChange("clippingFrame");
c._sc_view_clippingFrameDidChange()}}},parentViewDidResize:function(){var b,c,d,a,e;
if(this.useStaticLayout){b=YES}else{c=this.get("layout");d=((c.left!==undefined)&&(c.top!==undefined)&&(c.width!==undefined)&&(c.height!==undefined));
if(d){a=SC.isPercentage;e=(a(c.left)||a(c.top)||a(c.width)||a(c.right)||a(c.centerX)||a(c.centerY))
}b=(!d||e)}if(b){this.viewDidResize()}},viewDidResize:function(){this._viewFrameDidChange();
var d=this.childViews,b=d.length,a,c;for(a=0;a<b;++a){c=d[a];c.parentViewDidResize()
}},_viewFrameDidChange:function(){this.notifyPropertyChange("frame");this._sc_view_clippingFrameDidChange()
},beginLiveResize:function(){if(this.willBeginLiveResize){this.willBeginLiveResize()
}var d=this.get("childViews"),b=d.length,a,c;for(a=0;a<b;++a){c=d[a];if(c.beginLiveResize){c.beginLiveResize()
}}return this},endLiveResize:function(){var d=this.get("childViews"),b=d.length,a,c;
for(a=b-1;a>=0;--a){c=d[a];if(c.endLiveResize){c.endLiveResize()}}if(this.didEndLiveResize){this.didEndLiveResize()
}return this},wantsAcceleratedLayer:NO,hasAcceleratedLayer:function(){return this.get("wantsAcceleratedLayer")&&SC.platform.supportsAcceleratedLayers
}.property("wantsAcceleratedLayer").cacheable(),layoutStyle:function(){var A=this.get("layout"),D={},l=null,w,s=SC.LAYOUT_AUTO,u=SC._VIEW_DEFAULT_DIMS,k=u.length,m,v,E,y=this.get("useStaticLayout"),a=A.right,e=A.left,C=A.top,g=A.bottom,B=A.width,f=A.height,c=A.maxWidth,h=A.maxHeight,r=A.centerX,q=A.centerY,d=this.get("hasAcceleratedLayer"),b=0,z=0;
if(B!==undefined&&B===SC.LAYOUT_AUTO&&!y){w=SC.Error.desc("%@.layout() you cannot use width:auto if "+"staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(w.toString());throw w}if(f!==undefined&&f===SC.LAYOUT_AUTO&&!y){w=SC.Error.desc("%@.layout() you cannot use height:auto if "+"staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(w.toString());throw w}if(!SC.none(e)){if(SC.isPercentage(e)){D.left=(e*100)+"%"
}else{if(d&&!SC.empty(B)){z=Math.floor(e);D.left=0}else{D.left=Math.floor(e)}}D.marginLeft=0;
if(B!==undefined){if(B===SC.LAYOUT_AUTO){D.width=SC.LAYOUT_AUTO}else{if(SC.isPercentage(B)){D.width=(B*100)+"%"
}else{D.width=Math.floor(B)}}D.right=null}else{D.width=null;if(a&&SC.isPercentage(a)){D.right=(a*100)+"%"
}else{D.right=Math.floor(a||0)}}}else{if(!SC.none(a)){if(SC.isPercentage(a)){D.right=Math.floor(a*100)+"%"
}else{D.right=Math.floor(a)}D.marginLeft=0;if(SC.none(B)){if(SC.none(c)){D.left=0
}D.width=null}else{D.left=null;if(B===SC.LAYOUT_AUTO){D.width=SC.LAYOUT_AUTO}else{if(B&&SC.isPercentage(B)){D.width=(B*100)+"%"
}else{D.width=Math.floor(B||0)}}}}else{if(!SC.none(r)){D.left="50%";if(B&&SC.isPercentage(B)){D.width=(B*100)+"%"
}else{D.width=Math.floor(B||0)}if(B&&SC.isPercentage(B)&&(SC.isPercentage(r)||SC.isPercentage(r*-1))){D.marginLeft=Math.floor((r-B/2)*100)+"%"
}else{if(B&&B>=1&&!SC.isPercentage(r)){D.marginLeft=Math.floor(r-D.width/2)}else{console.warn("You have to set width and centerX usign both percentages or pixels");
D.marginLeft="50%"}}D.right=null}else{if(!SC.none(B)){D.left=0;D.right=null;if(B===SC.LAYOUT_AUTO){D.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(B)){D.width=(B*100)+"%"}else{D.width=Math.floor(B)}}D.marginLeft=0
}else{D.left=0;D.right=0;D.width=null;D.marginLeft=0}}}}D.minWidth=(A.minWidth===undefined)?null:A.minWidth;
D.maxWidth=(A.maxWidth===undefined)?null:A.maxWidth;if(!SC.none(C)){if(SC.isPercentage(C)){D.top=(C*100)+"%"
}else{if(d&&!SC.empty(f)){b=Math.floor(C);D.top=0}else{D.top=Math.floor(C)}}if(f!==undefined){if(f===SC.LAYOUT_AUTO){D.height=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(f)){D.height=(f*100)+"%"}else{D.height=Math.floor(f)}}D.bottom=null
}else{D.height=null;if(g&&SC.isPercentage(g)){D.bottom=(g*100)+"%"}else{D.bottom=Math.floor(g||0)
}}D.marginTop=0}else{if(!SC.none(g)){D.marginTop=0;if(SC.isPercentage(g)){D.bottom=(g*100)+"%"
}else{D.bottom=Math.floor(g)}if(SC.none(f)){if(SC.none(h)){D.top=0}D.height=null}else{D.top=null;
if(f===SC.LAYOUT_AUTO){D.height=SC.LAYOUT_AUTO}else{if(f&&SC.isPercentage(f)){D.height=(f*100)+"%"
}else{D.height=Math.floor(f||0)}}}}else{if(!SC.none(q)){D.top="50%";D.bottom=null;
if(f&&SC.isPercentage(f)){D.height=(f*100)+"%"}else{D.height=Math.floor(f||0)}if(f&&SC.isPercentage(f)&&(SC.isPercentage(q)||SC.isPercentage(q*-1))){D.marginTop=Math.floor((q-f/2)*100)+"%"
}else{if(f&&f>=1&&!SC.isPercentage(q)){D.marginTop=Math.floor(q-D.height/2)}else{console.warn("You have to set height and centerY to use both percentages or pixels");
D.marginTop="50%"}}}else{if(!SC.none(f)){D.top=0;D.bottom=null;if(f===SC.LAYOUT_AUTO){D.height=SC.LAYOUT_AUTO
}else{if(f&&SC.isPercentage(f)){D.height=(f*100)+"%"}else{D.height=Math.floor(f||0)
}}D.marginTop=0}else{D.top=0;D.bottom=0;D.height=null;D.marginTop=0}}}}D.minHeight=(A.minHeight===undefined)?null:A.minHeight;
D.maxHeight=(A.maxHeight===undefined)?null:A.maxHeight;D.zIndex=SC.none(A.zIndex)?null:A.zIndex.toString();
D.backgroundPosition=SC.none(A.backgroundPosition)?null:A.backgroundPosition.toString();
while(--k>=0){m=u[k];if(D[m]===0){D[m]=null}}if(d){var n="translateX("+z+"px) translateY("+b+"px)";
if(SC.platform.supportsCSS3DTransforms){n+=" translateZ(0px)"}D[SC.platform.domCSSPrefix+"Transform"]=n
}for(E in D){v=D[E];if(typeof v===SC.T_NUMBER){D[E]=(v+"px")}}return D}.property().cacheable(),layoutView:function(){return this.get("parentView")
}.property("parentView").cacheable(),layoutDidChange:function(){var c=this._previousLayout,e=this.get("layout"),a=YES,h,f,d,g;
if(c&&c!==e){h=c.width;if(h!==undefined){d=e.width;if(h===d){f=c.height;if(c!==undefined){g=e.height;
if(f===g){a=NO}}}}}this.beginPropertyChanges();this.notifyPropertyChange("layoutStyle");
if(a){this.viewDidResize()}else{this._viewFrameDidChange()}this.endPropertyChanges();
var b=this.get("layoutView");if(b){b.set("childViewsNeedLayout",YES);b.layoutDidChangeFor(this);
if(b.get("childViewsNeedLayout")){b.invokeOnce(b.layoutChildViewsIfNeeded)}}return this
},childViewsNeedLayout:NO,layoutDidChangeFor:function(b){var a=this._needLayoutViews;
if(!a){a=this._needLayoutViews=SC.CoreSet.create()}a.add(b)},layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){this.set("childViewsNeedLayout",NO);this.layoutChildViews()
}return this},layoutChildViews:function(){var c=this._needLayoutViews,a=c?c.length:0,b;
for(b=0;b<a;++b){c[b].updateLayout()}c.clear()},updateLayout:function(){var b=this.get("layer"),a;
if(b){a=this.renderContext(b);this.renderLayout(a);a.update();if(this.useStaticLayout){this.viewDidResize()
}}b=null;return this},renderLayout:function(a,b){a.addStyle(this.get("layoutStyle"))
},isView:YES,selectStart:function(a){return this.get("isTextSelectable")},contextMenu:function(a){if(!this.get("isContextMenuEnabled")){a.stop()
}return true},touchBoundary:{left:50,right:50,top:50,bottom:50},_touchBoundaryFrame:function(){return this.get("parentView").convertFrameToView(this.get("frame"),null)
}.property("frame","parentView").cacheable(),touchIsInBoundary:function(h){var c=this.get("_touchBoundaryFrame"),d=0,b=0,g=this.get("touchBoundary");
var a=h.pageX,e=h.pageY;if(a<c.x){a=c.x-a;d=g.left}else{if(a>c.x+c.width){a=a-(c.x+c.width);
d=g.right}else{a=0;d=1}}if(e<c.y){e=c.y-e;b=g.top}else{if(e>c.y+c.height){e=e-(c.y+c.height);
b=g.bottom}else{e=0;b=1}}if(a>100||e>100){return NO}return YES}});SC.View.mixin({isViewClass:YES,design:function(){if(this.isDesign){return this
}var a=this.extend.apply(this,arguments);a.isDesign=YES;if(SC.ViewDesigner){SC.ViewDesigner.didLoadDesign(a,this,SC.A(arguments))
}return a},layout:function(a){this.prototype.layout=a;return this},convertLayoutToAnchoredLayout:function(f,q){var h={top:0,left:0,width:q.width,height:q.height},d=q.width,m=q.height,n=f.right,a=f.left,l=f.top,g=f.bottom,k=f.width,e=f.height,c=f.centerX,b=f.centerY;
if(!SC.none(a)){if(SC.isPercentage(a)){h.left=a*d}else{h.left=a}if(k!==undefined){if(k===SC.LAYOUT_AUTO){h.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(k)){h.width=k*d}else{h.width=k}}}else{if(n&&SC.isPercentage(n)){h.width=d-h.left-(n*d)
}else{h.width=d-h.left-(n||0)}}}else{if(!SC.none(n)){if(SC.none(k)){h.left=0;if(n&&SC.isPercentage(n)){h.width=d-(n*d)
}else{h.width=d-(n||0)}}else{if(k===SC.LAYOUT_AUTO){h.width=SC.LAYOUT_AUTO}else{if(SC.isPercentage(k)){h.width=k*d
}else{h.width=k}if(SC.isPercentage(n)){h.left=d-(h.width+n)}else{h.left=d-(h.width+n)
}}}}else{if(!SC.none(c)){if(k&&SC.isPercentage(k)){h.width=(k*d)}else{h.width=(k||0)
}h.left=((d-h.width)/2);if(SC.isPercentage(c)){h.left=h.left+c*d}else{h.left=h.left+c
}}else{if(!SC.none(k)){h.left=0;if(k===SC.LAYOUT_AUTO){h.width=SC.LAYOUT_AUTO}else{if(SC.isPercentage(k)){h.width=k*d
}else{h.width=k}}}else{h.left=0;h.width=0}}}}if(f.minWidth!==undefined){h.minWidth=f.minWidth
}if(f.maxWidth!==undefined){h.maxWidth=f.maxWidth}if(!SC.none(l)){if(SC.isPercentage(l)){h.top=l*m
}else{h.top=l}if(e!==undefined){if(e===SC.LAYOUT_AUTO){h.height=SC.LAYOUT_AUTO}else{if(SC.isPercentage(e)){h.height=e*m
}else{h.height=e}}}else{h.height=m-h.top;if(g&&SC.isPercentage(g)){h.height=h.height-(g*m)
}else{h.height=h.height-(g||0)}}}else{if(!SC.none(g)){if(SC.none(e)){h.top=0;if(g&&SC.isPercentage(g)){h.height=m-(g*m)
}else{h.height=m-(g||0)}}else{if(e===SC.LAYOUT_AUTO){h.height=SC.LAYOUT_AUTO}else{if(SC.isPercentage(e)){h.height=e*m
}else{h.height=e}h.top=m-h.height;if(SC.isPercentage(g)){h.top=h.top-(g*m)}else{h.top=h.top-g
}}}}else{if(!SC.none(b)){if(e&&SC.isPercentage(e)){h.height=(e*m)}else{h.height=(e||0)
}h.top=((m-h.height)/2);if(SC.isPercentage(b)){h.top=h.top+b*m}else{h.top=h.top+b
}}else{if(!SC.none(e)){h.top=0;if(e===SC.LAYOUT_AUTO){h.height=SC.LAYOUT_AUTO}else{if(SC.isPercentage(e)){h.height=e*m
}else{h.height=e}}}else{h.top=0;h.height=0}}}}if(h.top){h.top=Math.floor(h.top)}if(h.bottom){h.bottom=Math.floor(h.bottom)
}if(h.left){h.left=Math.floor(h.left)}if(h.right){h.right=Math.floor(h.right)}if(h.width!==SC.LAYOUT_AUTO){h.width=Math.floor(h.width)
}if(h.height!==SC.LAYOUT_AUTO){h.height=Math.floor(h.height)}if(f.minHeight!==undefined){h.minHeight=f.minHeight
}if(f.maxHeight!==undefined){h.maxHeight=f.maxHeight}return h},convertLayoutToCustomLayout:function(b,a,c){},classNames:function(a){a=(this.prototype.classNames||[]).concat(a);
this.prototype.classNames=a;return this},tagName:function(a){this.prototype.tagName=a;
return this},childView:function(a){var b=this.prototype.childViews||[];if(b===this.superclass.prototype.childViews){b=b.slice()
}b.push(a);this.prototype.childViews=b;return this},bind:function(b,d){var c=this.prototype,a=this.superclass.prototype;
var e=c._bindings;if(!e||e===a._bindings){e=c._bindings=(e||[]).slice()}b=b+"Binding";
c[b]=d;e.push(b);return this},prop:function(a,b){this.prototype[a]=b;return this},localization:function(b,a){if(a){b.rootElement=SC.$(a)[0]
}return b},viewFor:function(d,c){var b=SC.$A(arguments);if(SC.none(d)){b.shift()}else{b[0]={rootElement:SC.$(d)[0]}
}var a=this.create.apply(this,arguments);b=b[0]=null;return a},create:function(){var b=this,a=new b(arguments);
if(SC.ViewDesigner){SC.ViewDesigner.didCreateView(a,SC.$A(arguments))}return a},loc:function(e){var b=e.childViews;
delete e.childViews;this.applyLocalizedAttributes(e);if(SC.ViewDesigner){SC.ViewDesigner.didLoadLocalization(this,SC.$A(arguments))
}var d=this.prototype.childViews,a=d.length,c;while(--a>=0){c=d[a];e=b[a];if(e&&c&&c.loc){c.loc(e)
}}return this},applyLocalizedAttributes:function(a){SC.mixin(this.prototype,a)},views:{}});
SC.outlet=function(b,a){return function(c){return(this[c]=SC.objectForPropertyPath(b,(a!==undefined)?a:this))
}.property()};SC.View.unload=function(){var a=SC.View.views;if(a){for(var b in a){if(!a.hasOwnProperty(b)){continue
}delete a[b]}}};if(SC.browser.msie){SC.Event.add(window,"unload",SC.View,SC.View.unload)
}SC.Validatable={initMixin:function(){this._validatable_validatorDidChange()},validator:null,errorLabel:null,isValid:function(){return SC.typeOf(this.get("value"))!==SC.T_ERROR
}.property("value"),ownerForm:null,performValidate:function(c){var a=SC.VALIDATE_OK;
if(this._validator){var b=this.get("ownerForm");if(c){a=this._validator.validatePartial(b,this);
if((a==SC.VALIDATE_NO_CHANGE)&&(this._validator.validateChange(b,this)==SC.VALIDATE_OK)){a=SC.VALIDATE_OK
}}else{a=this._validator.validateChange(b,this)}}return a},performValidateSubmit:function(){return this._validator?this._validator.validateSubmit(this.get("ownerForm"),this):SC.VALIDATE_OK
},performValidateKeyDown:function(a){var b=a.getCharString();if(!b){return YES}return this._validator?this._validator.validateKeyDown(this.get("ownerForm"),this,b):YES
},validatorObject:function(){return this._validator}.property(),validateSubmit:function(){return this.performValidateSubmit()
},objectForFieldValue:function(b,a){return this._validator?this._validator.objectForFieldValue(b,this.get("ownerForm"),this):b
},fieldValueForObject:function(a){return this._validator?this._validator.fieldValueForObject(a,this.get("ownerForm"),this):a
},_validatable_displayObserver:function(){this.displayDidChange()}.observes("isValid"),renderMixin:function(a){a.setClass("invalid",!this.get("isValid"))
},_validatable_validatorDidChange:function(){var a=this.get("ownerForm");var b=SC.Validator.findFor(a,this,this.get("validator"));
if(b!=this._validator){this.propertyWillChange("validatorObject");if(this._validator){this._validator.detachFrom(a,this)
}this._validator=b;if(this._validator){this._validator.attachTo(a,this)}this.propertyDidChange("validatorObject")
}}.observes("validator","ownerForm")};sc_require("views/view");sc_require("mixins/control");
sc_require("mixins/validatable");SC.FieldView=SC.View.extend(SC.Control,SC.Validatable,{isTextArea:NO,_field_isMouseDown:NO,fieldValue:function(){var a=this.get("value");
if(SC.typeOf(a)===SC.T_ERROR){a=a.get("errorValue")}return this.fieldValueForObject(a)
}.property("value","validator").cacheable(),$input:function(){if(this.get("isTextArea")){return this.$("textarea").andSelf().filter("textarea")
}else{return this.$("input").andSelf().filter("input")}},setFieldValue:function(b){if(SC.none(b)){b=""
}var a=this.$input();if(a.val()!==b){a.val(b)}return this},getFieldValue:function(){return this.$input().val()
},_field_fieldValueDidChange:function(a){SC.run(function(){this.fieldValueDidChange(NO)
},this)},fieldValueDidChange:function(a){var c=this.getFieldValue();var b=this.objectForFieldValue(c,a);
this.setIfChanged("value",b)},_field_valueDidChange:function(){this.setFieldValue(this.get("fieldValue"))
}.observes("fieldValue"),didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)},didAppendToDocument:function(){if(this.get("isTextArea")){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)}},willDestroyLayer:function(){SC.Event.remove(this.$input(),"change",this,this._field_fieldValueDidChange)
},mouseDown:function(a){this._field_isMouseDown=YES;a.allowDefault();return YES},mouseOut:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}a.allowDefault();return YES},mouseOver:function(a){this.set("isActive",this._field_isMouseDown);
a.allowDefault();return YES},mouseUp:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}this._field_isMouseDown=NO;a.allowDefault();return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$input()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},_field_setFieldValue:function(b){this.propertyWillChange("fieldValue");
if(this.fieldValueForObject){b=this.fieldValueForObject(b)}var a=this.setFieldValue(b);
this.propertyDidChange("fieldValue");return a},_field_getFieldValue:function(){var a=this.getFieldValue();
if(this.objectForFieldValue){a=this.objectForFieldValue(a)}return a}});SC.TextSelection=SC.Object.extend(SC.Copyable,SC.Freezable,{start:-1,end:-1,length:function(){var b=this.get("start");
var a=this.get("end");if((b)===-1||(a===-1)){return -1}else{return a-b}}.property("start","end").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.freeze()},copy:function(){return SC.TextSelection.create({start:this.get("start"),end:this.get("end")})
},toString:function(){var a=this.get("length");if(a&&a>0){if(a===1){return"[%@ character selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}else{return"[%@ characters selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}}else{return"[no text selected; caret at %@]".fmt(this.get("start"))}}});SC.StaticLayout={hasStaticLayout:YES};
sc_require("views/field");sc_require("system/text_selection");sc_require("mixins/static_layout");
sc_require("mixins/editable");SC.TextFieldView=SC.FieldView.extend(SC.StaticLayout,SC.Editable,{tagName:"label",classNames:["sc-text-field-view"],isTextField:YES,applyImmediately:YES,isPassword:NO,isTextArea:NO,hint:"",isEditing:NO,hintON:YES,defaultTabbingEnabled:YES,isContextMenuEnabled:YES,leftAccessoryView:null,rightAccessoryView:null,spellCheckEnabled:YES,maxLength:5096,_isFocused:NO,init:function(){var a=this.get("hintON"),b=this.get("value");
if(!b||b&&b.length===0){this.set("hintON",YES)}else{this.set("hintON",NO)}return arguments.callee.base.apply(this,arguments)
},isEditable:function(){return this.get("isEnabled")}.property("isEnabled").cacheable(),selection:function(l,h){var d=this.$input()[0],e,a,c;
if(h===undefined){if(d){a=null;c=null;if(!d.value){a=c=0}else{if("selectionStart" in d){a=d.selectionStart
}if("selectionEnd" in d){c=d.selectionEnd}if(a===null||c===null){var k=document.selection;
if(k){var g=k.type;if(g&&(g==="None"||g==="Text")){e=k.createRange();if(!this.get("isTextArea")){var b=e.text.length;
a=Math.abs(e.moveStart("character",0-(d.value.length+1)));c=a+b}else{var f=e.duplicate();
f.moveToElementText(d);f.setEndPoint("EndToStart",e);a=f.text.length;c=a+e.text.length
}}}}}return SC.TextSelection.create({start:a,end:c})}else{return null}}else{if(!h||!h.kindOf||!h.kindOf(SC.TextSelection)){throw"When setting the selection, you must specify an SC.TextSelection instance."
}if(d){if(d.setSelectionRange){d.setSelectionRange(h.get("start"),h.get("end"))}else{e=d.createTextRange();
a=h.get("start");e.move("character",a);e.moveEnd("character",h.get("end")-a);e.select()
}}return h}}.property("fieldValue").cacheable(),displayProperties:"hint fieldValue isEditing leftAccessoryView rightAccessoryView isTextArea".w(),createChildViews:function(){arguments.callee.base.apply(this,arguments);
this.accessoryViewObserver()},acceptsFirstResponder:function(){return this.get("isEnabled")
}.property("isEnabled"),accessoryViewObserver:function(){var f,h=["leftAccessoryView","rightAccessoryView"],a=h.length,b,e,d,g;
for(b=0;b<a;b++){e=h[b];d=this["_"+e];g=this.get(e);if(!(d&&g&&(d===g))){if(d){f=d.get("classNames");
f=f.without("sc-text-field-accessory-view");d.set("classNames",f);this.removeChild(d);
d=null;this["_"+e]=null}if(g){if(g.isClass){g=g.create({layoutView:this})}f=g.get("classNames");
var c="sc-text-field-accessory-view";if(f.indexOf(c)<0){f=SC.clone(f);f.push(c);g.set("classNames",f)
}this.appendChild(g);this["_"+e]=g}}}}.observes("leftAccessoryView","rightAccessoryView"),layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){var b=this.get("rightAccessoryView");if(b&&b.get){var c=b.get("layout");
if(c){c.left=null;if(!c.right){c.right=0}b.adjust({layout:c})}}}arguments.callee.base.apply(this,arguments)
},render:function(e,f){arguments.callee.base.apply(this,arguments);var a,d,c,b;a=this.get("fieldValue");
if(SC.none(a)){a=""}a=String(a);e.setClass("not-empty",a.length>0);d=this._getAccessoryViewWidths();
c=d.left;b=d.right;if(c){c+="px"}if(b){b+="px"}this._renderField(e,f,a,c,b);if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}},_forceRenderFirstTime:NO,_renderFieldLikeFirstTime:function(){this.set("_forceRenderFirstTime",YES)
}.observes("isTextArea"),_renderField:function(c,k,s,g,n){var q=this.get("hint"),e,y,u,d,v,b,l,f,r=this.get("spellCheckEnabled"),x,h=this.get("maxLength"),a;
c.setClass("text-area",this.get("isTextArea"));a=(parseInt(SC.browser.safari,0)<532);
c.setClass("oldWebKitFieldPadding",a);x=r?' spellcheck="true"':' spellcheck="false"';
if(k||this._forceRenderFirstTime){this._forceRenderFirstTime=NO;e=this.get("isEnabled")?"":'disabled="disabled"';
y=this.get("layerId");c.push('<span class="border"></span>');u="";if(g||n){u='style="';
if(g){u+="left: "+g+"; "}if(n){u+="right: "+n+";"}u+='"'}c.push('<span class="padding" '+u+">");
s=this.get("escapeHTML")?SC.RenderContext.escapeHTML(s):s;if(!this.get("_supportsPlaceHolder")&&(!s||(s&&s.length===0))){s=this.get("hint");
c.setClass("sc-hint",YES)}f=(SC.browser.mozilla&&(parseFloat(SC.browser.mozilla)<1.9||SC.browser.mozilla.match(/1\.9\.0|1\.9\.1/)))?"field oldGecko":"field";
if(this.get("isTextArea")){c.push('<textarea class="',f,'" name="',y,'" ',e,' placeholder="',q,'"',x,' maxlength="',h,'">',s,"</textarea></span>")
}else{d=this.get("isPassword")?"password":"text";c.push('<input class="',f,'" type="',d,'" name="',y,'" ',e,' value="',s,'" placeholder="',q,'"',x,' maxlength="',h,'" /></span>')
}}else{var m=this.$input();if(!this.get("_supportsPlaceHolder")){var w=this.get("value");
if((!w||(w&&w.length===0))){if(this.get("hintON")&&!this.get("isFirstResponder")){c.setClass("sc-hint",YES);
m.val(q)}else{c.setClass("sc-hint",NO);m.val("")}}}else{m.attr("placeholder",q)}b=m[0];
if(b){if(!this.get("isEnabled")){b.disabled="true"}else{b.disabled=null}l=b.parentNode.style;
if(g){if(l.left!==g){l.left=g}}else{l.left=null}if(n){if(l.right!==n){l.right=n}}else{l.right=null
}}}},_getAccessoryViewWidths:function(){var c={},l=["left","right"],d=l.length,f,g,m,k,a,h,e,b;
for(f=0;f<d;f++){g=l[f];m=this.get(g+"AccessoryView");if(m){if(m.isClass){m=m.create({layoutView:this})
}if(m.get){b=m.get("frame");if(b){a=b.width;if(a){h=m.get("layout");if(h){e=h[g];
a+=e}c[g]=a}}}}}return c},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);
if(!this.get("_supportsPlaceHolder")&&this.get("hintON")){var b=this.$input().val();
if(!b||(b&&b.length===0)){this.$input().val(this.get("hint"))}}if(this.get("isTextArea")){this.invokeLast(this._addTextAreaEvents)
}else{this._addTextAreaEvents();if(SC.browser.mozilla){var a=this.$input();SC.Event.add(a,"keypress",this,this._firefox_dispatch_keypress)
}}},_addTextAreaEvents:function(){var a=this.$input();SC.Event.add(a,"focus",this,this._textField_fieldDidFocus);
SC.Event.add(a,"blur",this,this._textField_fieldDidBlur);SC.Event.add(a,"select",this,this._textField_selectionDidChange);
if(SC.browser.mozilla){this._cacheInputElement=this.$input();this._cachePaddingElement=this.$(".padding")
}},willDestroyLayer:function(){arguments.callee.base.apply(this,arguments);var a=this.$input();
SC.Event.remove(a,"focus",this,this._textField_fieldDidFocus);SC.Event.remove(a,"blur",this,this._textField_fieldDidBlur);
SC.Event.remove(a,"select",this,this._textField_selectionDidChange);SC.Event.remove(a,"focus",this,this._firefox_dispatch_keypress)
},_textField_fieldDidFocus:function(a){SC.run(function(){this.set("focused",YES);
this.fieldDidFocus(a);var b=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!b)||(b&&b.length===0))){this.set("hintON",NO)
}},this)},_textField_fieldDidBlur:function(a){SC.run(function(){this.set("focused",NO);
this.fieldDidBlur(this._origEvent);var b=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!b)||(b&&b.length===0))){this.set("hintON",YES)
}},this)},fieldDidFocus:function(a){this.beginEditing(a);if(this._didHideInterceptForPane){this._didHideInterceptForPane.showTouchIntercept();
this._didHideInterceptForPane=null}var b=this.get("pane");if(b&&b.get("usingTouchIntercept")){b.hideTouchIntercept();
this._didHideInterceptForPane=this.get("pane")}},fieldDidBlur:function(a){this.commitEditing(a);
var b=this._didHideInterceptForPane;if(b){b.showTouchIntercept();b=null}},_field_fieldValueDidChange:function(a){if(this.get("focused")){SC.run(function(){this.fieldValueDidChange(NO)
},this)}},_topOffsetForFirefoxCursorFix:3,_applyFirefoxCursorFix:function(){if(parseFloat(SC.browser.mozilla)<1.9&&!this.get("useStaticLayout")){var h,d,c,k,b,g,e,f;
e=this._cacheInputElement;f=this._cachePaddingElement;if(f&&f[0]){g=f[0];b=SC.$(g).offset();
if(SC.browser.compareVersion(1,9,2)<0&&e[0].tagName.toLowerCase()==="input"){h=b.top+this._topOffsetForFirefoxCursorFix
}else{h=b.top}d=b.left;c=g.offsetWidth;k=g.offsetHeight;var a="position: fixed; top: %@px; left: %@px; width: %@px; height: %@px;".fmt(h,d,c,k);
if(!this._prevStyle||this._prevStyle!=a){e.attr("style",a)}this._prevStyle=a}}return this
},_firefox_dispatch_keypress:function(a){var d=this.get("selection"),e=this.get("value"),c=e?e.length:0,b;
if(!d||((d.get("length")===0&&(d.get("start")===0)||d.get("end")===c))){b=SC.RootResponder.responder;
b.keypress.call(b,a);a.stopPropagation()}},_textField_selectionDidChange:function(){this.notifyPropertyChange("selection")
},willBecomeKeyResponderFrom:function(a){if(this.get("isVisibleInWindow")){var b=this.$input()[0];
try{if(b){b.focus()}}catch(c){}if(!this._txtFieldMouseDown){this.invokeLast(this._selectRootElement)
}}},willLoseKeyResponderTo:function(a){},_selectRootElement:function(){var a=this.$input()[0];
if(a){a.select()}else{this._textField_selectionDidChange()}},didLoseKeyResponderTo:function(a){var b=this.$input()[0];
if(b){b.blur()}this.invokeLater("scrollToOriginIfNeeded",100)},scrollToOriginIfNeeded:function(){var b=this.get("pane");
if(!b){return}var a=b.get("firstResponder");if(!a||!a.get("isTextField")){document.body.scrollTop=document.body.scrollLeft=0
}},parentViewDidResize:function(){if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}arguments.callee.base.apply(this,arguments)},keyDown:function(b){var e=b.which,c=false;
if((e===13&&!b.isIMEInput)&&!this.get("isTextArea")){return NO}if(e===27){return NO
}if(e===9&&this.get("defaultTabbingEnabled")){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(!SC.browser.safari&&this.get("isTextArea")){var d=this.get("value");
if(d&&b.which>47&&(d.length>=this.get("maxLength"))){c=true}}if((this.performValidateKeyDown(b)||SC.platform.touch)&&!c){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}if(this.get("applyImmediately")){this.invokeLater(this.fieldValueDidChange,1)
}return YES},keyUp:function(a){if(SC.browser.mozilla&&a.keyCode===13){this.fieldValueDidChange()
}this.notifyPropertyChange("selection");this._isKeyDown=NO;a.allowDefault();return YES
},mouseDown:function(a){var b=this.get("fieldValue");this._txtFieldMouseDown=YES;
if(!this.get("isEnabled")){a.stop();return YES}else{return arguments.callee.base.apply(this,arguments)
}},mouseUp:function(a){this._txtFieldMouseDown=NO;this.notifyPropertyChange("selection");
if(!this.get("isEnabled")){a.stop();return YES}return arguments.callee.base.apply(this,arguments)
},mouseWheel:function(a){a.allowDefault();return YES},selectStart:function(a){return YES
},_supportsPlaceHolder:function(){return SC.browser.safari&&!this.get("isTextArea")
}.property("isTextArea").cacheable(),valueObserver:function(){var a=this.get("value");
if(a&&a.length>0){this.set("hintON",NO)}else{this.set("hintON",YES)}}.observes("value")});
sc_require("views/text_field");SC.InlineTextFieldView=SC.TextFieldView.extend(SC.DelegateSupport,{_topOffsetForFirefoxCursorFix:0,beginEditing:function(b){if(!b){throw"InlineTextField.beginEditing() requires options"
}if(this.get("isEditing")){return NO}var d={},f,c,e,a;a=this._delegate=b.delegate;
this.set("delegate",a);if(!this.invokeDelegateMethod(a,"inlineEditorShouldBeginEditing",this)){SC.Logger.warn("InlineTextField.beginEditing() cannot begin without inlineEditorShouldBeginEditing() on the delegate.");
return NO}this.beginPropertyChanges();this.set("isEditing",YES);this.set("escapeHTML",b.escapeHTML);
this._optframe=b.frame;this._optIsCollection=b.isCollection;this._exampleElement=b.exampleElement;
if(!this._optframe||!a){throw"At least frame and delegate options are required for inline editor"
}this._originalValue=b.value;if(SC.none(this._originalValue)){this._originalValue=""
}this._multiline=(b.multiline!==undefined)?b.multiline:NO;if(this._multiline){this.set("isTextArea",YES)
}else{this.set("isTextArea",NO)}this._commitOnBlur=(b.commitOnBlur!==undefined)?b.commitOnBlur:YES;
this.set("validator",b.validator);this.set("value",this._originalValue);f=a.get("pane");
d.height=this._optframe.height;d.width=this._optframe.width;c=this._delegate.get("layout");
e=f.$()[0];if(this._optIsCollection&&c.left){d.left=this._optframe.x-c.left-e.offsetLeft-1;
if(SC.browser.msie==7){d.left--}}else{d.left=this._optframe.x-e.offsetLeft-1;if(SC.browser.msie==7){d.left--
}}if(this._optIsCollection&&c.top){d.top=this._optframe.y-c.top-e.offsetTop;if(SC.browser.msie==7){d.top=d.top-2
}}else{d.top=this._optframe.y-e.offsetTop;if(SC.browser.msie==7){d.top=d.top-2}}this.set("layout",d);
this.set("parentNode",f);f.appendChild(this);this._className=this.getDelegateProperty(a,"inlineEditorClassName");
if(this._className&&!this.hasClassName(this._className)){this.setClassName(this._className,true)
}this.invokeDelegateMethod(a,"inlineEditorWillBeginEditing",this);this._previousFirstResponder=f?f.get("firstResponder"):null;
this.becomeFirstResponder();this.endPropertyChanges();this.invokeLast(function(){this.invokeDelegateMethod(a,"inlineEditorDidBeginEditing",this)
});return this},commitEditing:function(a){if(!SC.$ok(this.validateSubmit())){return NO
}return this._endEditing(this.get("value"),a)},discardEditing:function(){return this._endEditing(this._originalValue,null,YES)
},blurEditor:function(a){if(!this.get("isEditing")){return YES}return this._commitOnBlur?this.commitEditing(a):this.discardEditing(a)
},_endEditing:function(d,b,c){if(!this.get("isEditing")){return YES}var a=this._delegate;
if(!this.invokeDelegateMethod(a,"inlineEditorShouldEndEditing",this,d,b,c)){SC.Logger.warn("InlineTextField._endEditing() cannot end without inlineEditorShouldEndEditing() on the delegate.");
return NO}this.invokeDelegateMethod(a,"inlineEditorDidEndEditing",this,d,b,c);if(this._className){this.setClassName(this._className,false)
}this._originalValue=this._delegate=this._exampleElement=this._optframe=this._className=null;
this.set("isEditing",NO);if(this.get("isFirstResponder")){var e=this.get("pane");
if(e&&this._previousFirstResponder){e.makeFirstResponder(this._previousFirstResponder)
}else{this.resignFirstResponder()}}this._previousFirstResponder=null;if(this.get("parentNode")){this.removeFromParent()
}return YES},isEditing:NO,mouseDown:function(a){arguments.callee.base.call(this,a);
return this.get("isEditing")},touchStart:function(a){this.mouseDown(a)},keyDown:function(a){var b=this.interpretKeyEvents(a);
this.fieldValueDidChange(true);return !b?NO:b},insertText:null,_scitf_blurInput:function(){var a=this.$input()[0];
if(a){a.blur()}a=null},willRemoveFromParent:function(){return this._scitf_blurInput()
},willLoseFirstResponder:function(b,a){if(b!==this){return}this._previousFirstResponder=null;
this._origEvent=a;this._scitf_blurInput();return this.blurEditor(a)},cancel:function(){this.discardEditing();
return YES},fieldValueDidChange:function(a){arguments.callee.base.call(this,a)},insertNewline:function(a){if(this._multiline){a.allowDefault();
return arguments.callee.base.call(this,a)}else{if(this.get("value")!=this.$input().val()){this.set("value",this.$input().val())
}this.commitEditing();return YES}},insertTab:function(a){var c=this._delegate;this.resignFirstResponder();
this.commitEditing();if(c){var b=c.get("nextValidKeyView");if(b&&b.beginEditing){b.beginEditing()
}}return YES},insertBacktab:function(a){var b=this._delegate;this.resignFirstResponder();
this.commitEditing();if(b){var c=b.get("previousValidKeyView");if(c&&c.beginEditing){c.beginEditing()
}}return YES},deleteForward:function(a){a.allowDefault();return YES},deleteBackward:function(a){a.allowDefault();
return YES}});SC.InlineTextFieldView.mixin({beginEditing:function(b){this._exampleElement=b.exampleElement;
var a=b.exampleInlineTextFieldView?b.exampleInlineTextFieldView:this,f=b.delegate.get("layout"),e=this.updateViewStyle(),g=this.updateViewPaddingStyle();
var h=".inline-editor input{"+e+"} ";h=h+".inline-editor textarea{"+e+"} .inline-editor .padding{"+g+"}";
var d=document.getElementsByTagName("head")[0],c=document.createElement("style");
c.type="text/css";c.media="screen";if(c.styleSheet){c.styleSheet.cssText=h}else{c.appendChild(document.createTextNode(h))
}d.appendChild(c);this.editor=a.create({classNames:"inline-editor",layout:f});return this.editor.beginEditing(b)
},commitEditing:function(){return this.editor?this.editor.commitEditing():YES},discardEditing:function(){return this.editor?this.editor.discardEditing():YES
},updateViewStyle:function(){var b=this._exampleElement[0],c="",a=SC.getStyle(b,"font-size");
if(a&&a.length>0){c=c+"font-size: "+a+" !important; "}a=SC.getStyle(b,"font-family");
if(a&&a.length>0){c=c+"font-family: "+a+" !important; "}a=SC.getStyle(b,"font-weight");
if(a&&a.length>0){c=c+"font-weight: "+a+" !important; "}a=SC.getStyle(b,"z-index");
if(a&&a.length>0){c=c+"z-index: "+a+" !important; "}a=SC.getStyle(b,"line-height");
if(a&&a.length>0){c=c+"line-height: "+a+" !important; "}a=SC.getStyle(b,"text-align");
if(a&&a.length>0){c=c+"text-align: "+a+" !important; "}a=SC.getStyle(b,"top-margin");
if(a&&a.length>0){c=c+"top-margin: "+a+" !important; "}a=SC.getStyle(b,"bottom-margin");
if(a&&a.length>0){c=c+"bottom-margin: "+a+" !important; "}a=SC.getStyle(b,"left-margin");
if(a&&a.length>0){c=c+"left-margin: "+a+" !important; "}a=SC.getStyle(b,"right-margin");
if(a&&a.length>0){c=c+"right-margin: "+a+" !important; "}return c},updateViewPaddingStyle:function(){var b=this._exampleElement[0];
var c="";var a=SC.getStyle(b,"padding-top");if(a&&a.length>0){c=c+"top: "+a+" !important; "
}a=SC.getStyle(b,"padding-bottom");if(a&&a.length>0){c=c+"bottom: "+a+" !important; "
}a=SC.getStyle(b,"padding-left");if(a&&a.length>0){c=c+"left: "+a+" !important; "
}a=SC.getStyle(b,"padding-right");if(a&&a.length>0){c=c+"right: "+a+" !important; "
}return c},editor:null});sc_require("system/responder");SC.ResponderContext={isResponderContext:YES,trace:NO,defaultResponder:null,nextResponder:function(){return this.get("defaultResponder")
}.property("defaultResponder").cacheable(),firstResponder:null,nextResponderFor:function(a){var b=a.get("nextResponder");
if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b,this)}else{if(!b&&(a!==this)){b=this
}}return b},responderNameFor:function(a){if(!a){return"(No Responder)"}else{if(a._scrc_name){return a._scrc_name
}}var b=this.NAMESPACE;this._findResponderNamesFor(this,3,b?[this.NAMESPACE]:[]);
return a._scrc_name||a.toString()},_findResponderNamesFor:function(a,e,d){var b,c;
for(b in a){if(b==="nextResponder"){continue}c=a[b];if(c&&c.isResponder){if(c._scrc_name){continue
}d.push(b);c._scrc_name=d.join(".");if(e>0){this._findResponderNamesFor(c,e-1,d)}d.pop()
}}},makeFirstResponder:function(b,a){var f=this.get("firstResponder"),d=this.get("nextResponder"),e=this.get("trace"),c;
if(this._locked){if(e){console.log("%@: AFTER ACTION: makeFirstResponder => %@".fmt(this,this.responderNameFor(b)))
}this._pendingResponder=b;return}if(e){console.log("%@: makeFirstResponder => %@".fmt(this,this.responderNameFor(b)))
}if(b){b.set("becomingFirstResponder",YES)}this._locked=YES;this._pendingResponder=null;
c=b?b:null;while(c){if(c.get("hasFirstResponder")){break}c=(c===d)?null:this.nextResponderFor(c)
}if(!c){c=d}this._notifyWillLoseFirstResponder(f,f,c,a);if(f){f.set("isFirstResponder",NO)
}this.beginPropertyChanges();this.set("firstResponder",b);if(b){b.set("isFirstResponder",YES)
}this._notifyDidBecomeFirstResponder(b,b,c);this.endPropertyChanges();this._locked=NO;
if(this._pendingResponder){this.makeFirstResponder(this._pendingResponder);this._pendingResponder=null
}if(b){b.set("becomingFirstResponder",NO)}return this},_notifyWillLoseFirstResponder:function(c,e,b,a){if(e===b){return
}e.willLoseFirstResponder(c,a);e.set("hasFirstResponder",NO);var d=this.nextResponderFor(e);
if(d){this._notifyWillLoseFirstResponder(c,d,b)}},_notifyDidBecomeFirstResponder:function(b,d,a){if(d===a){return
}var c=this.nextResponderFor(d);if(c){this._notifyDidBecomeFirstResponder(b,c,a)}d.set("hasFirstResponder",YES);
d.didBecomeFirstResponder(b)},resetFirstResponder:function(){var a=this.get("firstResponder");
if(!a){return}a.willLoseFirstResponder();a.didBecomeFirstResponder()},sendAction:function(g,d,c){var a=this.get("firstResponder"),e=this.get("nextResponder"),f=this.get("trace"),h=NO,b;
this._locked=YES;if(f){console.log("%@: begin action '%@' (%@, %@)".fmt(this,g,d,c))
}if(!h&&!a&&this.tryToPerform){h=this.tryToPerform(g,d,c)}while(!h&&a){if(a.tryToPerform){h=a.tryToPerform(g,d,c)
}if(!h){a=(a===e)?null:this.nextResponderFor(a)}}if(f){if(!h){console.log("%@:  action '%@' NOT HANDLED".fmt(this,g))
}else{console.log("%@: action '%@' handled by %@".fmt(this,g,this.responderNameFor(a)))
}}this._locked=NO;if(b=this._pendingResponder){this._pendingResponder=null;this.makeFirstResponder(b)
}return a}};sc_require("views/view");sc_require("mixins/responder_context");SC.Pane=SC.View.extend(SC.ResponderContext,{isPane:YES,page:null,rootResponder:null,currentWindowSize:null,computeParentDimensions:function(g){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var d=this.get("currentWindowSize"),h={x:0,y:0,width:1000,height:1000},f=this.get("layout");
if(d){h.width=d.width;h.height=d.height}else{if(SC.RootResponder.responder){var b=SC.RootResponder.responder.get("currentWindowSize");
if(b){h.width=b.width;h.height=b.height}}else{var e,a,c;if(!this._bod||!this._docElement){a=document.body;
c=document.documentElement;this._body=a;this._docElement=c}else{a=this._body;c=this._docElement
}if(window.innerHeight){h.width=window.innerWidth;h.height=window.innerHeight}else{if(c&&c.clientHeight){h.width=c.clientWidth;
h.height=c.clientHeight}else{if(a){h.width=a.clientWidth;h.height=a.clientHeight}}}this.windowSizeDidChange(null,h)
}}if(f.minHeight||f.minWidth){if(f.minHeight){h.height=Math.max(h.height,f.minHeight)
}if(f.minWidth){h.width=Math.max(h.width,f.minWidth)}}return h},frame:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this.computeFrameWithParentFrame(null)}.property(),windowSizeDidChange:function(b,a){this.set("currentWindowSize",a);
this.parentViewDidResize();return this},paneLayoutDidChange:function(){this.invokeOnce(this.updateLayout)
}.observes("layout"),sendEvent:function(c,a,d){var b;if(!d){d=this.get("firstResponder")
}while(d&&!d.tryToPerform(c,a)){d=(d===this)?null:d.get("nextResponder")}if(!d&&(d=this.get("defaultResponder"))){if(typeof d===SC.T_STRING){d=SC.objectForPropertyPath(d)
}if(!d){d=null}else{d=d.tryToPerform(c,a)?d:null}}else{if(!d&&!(d=this.get("defaultResponder"))){d=this.tryToPerform(c,a)?this:null
}}return a.mouseHandler||d},performKeyEquivalent:function(c,a){var b=arguments.callee.base.apply(this,arguments);
if(!b){var d=this.get("defaultResponder");if(d){if(d.performKeyEquivalent){b=d.performKeyEquivalent(c,a)
}if(!b&&d.tryToPerform){b=d.tryToPerform(c,a)}}}return b},nextResponder:function(){return null
}.property().cacheable(),firstResponder:null,acceptsKeyPane:YES,isKeyPane:NO,becomeKeyPane:function(){if(this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(this)}return this},resignKeyPane:function(){if(!this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(null)}return this},makeFirstResponder:function(b,a){var d=this.get("firstResponder"),c=this.get("isKeyPane");
if(d===b){return this}if(SC.platform.touch&&b&&b.kindOf(SC.TextFieldView)&&!b.get("focused")){return this
}if(d){d.willLoseFirstResponder(d,a)}if(c){if(d){d.willLoseKeyResponderTo(b)}if(b){b.willBecomeKeyResponderFrom(d)
}}if(d){d.beginPropertyChanges().set("isFirstResponder",NO).set("isKeyResponder",NO).endPropertyChanges()
}this.set("firstResponder",b);if(b){b.beginPropertyChanges().set("isFirstResponder",YES).set("isKeyResponder",c).endPropertyChanges()
}if(c){if(b){b.didBecomeKeyResponderFrom(d)}if(d){d.didLoseKeyResponderTo(b)}}if(b){b.didBecomeFirstResponder(b)
}return this},keyDown:function(a){var b;if(a.which===9&&!this.get("firstResponder")){if(a.shiftKey){b=this.get("previousValidKeyView")
}else{b=this.get("nextValidKeyView")}if(b){this.makeFirstResponder(b);return YES}}return NO
},_forwardKeyChange:function(d,b,g,f){var c,a,e;if(d&&(a=this.get("firstResponder"))){e=(g)?g.get("firstResponder"):null;
c=this.get("firstResponder");if(c){c[b](e)}if((f!==undefined)&&a){a.set("isKeyResponder",f)
}}},willLoseKeyPaneTo:function(a){this._forwardKeyChange(this.get("isKeyPane"),"willLoseKeyResponderTo",a,NO);
return this},willBecomeKeyPaneFrom:function(a){this._forwardKeyChange(!this.get("isKeyPane"),"willBecomeKeyResponderFrom",a,YES);
return this},didLoseKeyPaneTo:function(b){var a=this.get("isKeyPane");this.set("isKeyPane",NO);
this._forwardKeyChange(a,"didLoseKeyResponderTo",b);return this},didBecomeKeyPaneFrom:function(b){var a=this.get("isKeyPane");
this.set("isKeyPane",YES);this._forwardKeyChange(!a,"didBecomeKeyResponderFrom",b,YES);
return this},isMainPane:NO,focusFrom:function(a){},blurTo:function(a){},blurMainTo:function(a){this.set("isMainPane",NO)
},focusMainFrom:function(a){this.set("isMainPane",YES)},append:function(){return this.appendTo(document.body)
},remove:function(){if(!this.get("isVisibleInWindow")){return this}if(!this.get("isPaneAttached")){return this
}var b=this.get("layer");if(b&&b.parentNode){b.parentNode.removeChild(b)}b=null;this._removeIntercept();
this.resignKeyPane();var a=this.rootResponder;if(this.get("isMainPane")){a.makeMainPane(null)
}a.panes.remove(this);this.rootResponder=null;this.set("isPaneAttached",NO);this.parentViewDidChange();
return this},appendTo:function(b){var a=this.get("layer");if(!a){a=this.createLayer().get("layer")
}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,null);
b=a=null;return this.paneDidAttach()},prependTo:function(b){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,b.firstChild);b=a=null;return this.paneDidAttach()},before:function(c){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;
if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,c);
b=c=a=null;return this.paneDidAttach()},after:function(c){var a=this.get("layer");
if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,c.nextSibling);b=c=a=null;return this.paneDidAttach()},removeFromParent:function(){},paneDidAttach:function(){var a=(this.rootResponder=SC.RootResponder.responder);
a.panes.add(this);this.set("currentWindowSize",a.computeWindowSize());this.set("isPaneAttached",YES);
this.parentViewDidChange();this._notifyDidAppendToDocument();this._addIntercept();
return this},isPaneAttached:NO,hasTouchIntercept:NO,zIndex:0,touchZ:99,_addIntercept:function(){if(this.get("hasTouchIntercept")&&SC.platform.touch){this.set("usingTouchIntercept",YES);
var b=document.createElement("div");var a=b.style;a.position="absolute";a.left="0px";
a.top="0px";a.right="0px";a.bottom="0px";a.webkitTransform="translateZ(0px)";a.zIndex=this.get("zIndex")+this.get("touchZ");
b.className="touch-intercept";b.id="touch-intercept-"+SC.guidFor(this);this._touchIntercept=b;
document.body.appendChild(b)}},_removeIntercept:function(){if(this._touchIntercept){document.body.removeChild(this._touchIntercept);
this._touchIntercept=null}},hideTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="none"
}},showTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="block"
}},recomputeIsVisibleInWindow:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var c=this.get("isVisibleInWindow"),e=this.get("isVisible")&&this.get("isPaneAttached");
if(c!==e){this.set("isVisibleInWindow",e);var d=this.get("childViews"),b=d.length,a;
for(a=0;a<b;a++){d[a].recomputeIsVisibleInWindow(e)}if(e){if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{if(this.get("isKeyPane")){this.resignKeyPane()}}}this.updateLayerIfNeeded(YES);
return this},updateLayerLocation:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this},init:function(){var a=!!this.get("layer");arguments.callee.base.apply(this,arguments);
if(a){this.paneDidAttach()}},classNames:"sc-pane".w()});sc_require("mixins/responder_context");
SC.Application=SC.Responder.extend(SC.ResponderContext,{});sc_require("core");SC.Benchmark={verbose:NO,enabled:YES,stats:{},globalStartTime:null,start:function(b,a,e,d){if(!this.enabled){return
}var f=(e||Date.now()),c;if(a){c=this._subStatFor(b,a)}else{c=this._statFor(b)}if(d&&c._starts.length>0){c._starts.push("ignore")
}else{c._starts.push(f)}c._times.push({start:f,_subStats:{}});return b},end:function(c,b,f){var e;
if(!this.enabled){return}if(b){e=this._subStatFor(c,b)}else{e=this._statFor(c)}var g=e._starts.pop();
if(!g){console.log('SC.Benchmark "%@" ended without a matching start.  No information was saved.'.fmt(c));
return}if(g=="ignore"){return}var a=(f||Date.now());var d=a-g;e._times[e._times.length-1].end=a;
e._times[e._times.length-1].dur=d;e.amt+=d;e.runs++;if(this.verbose){this.log(c)}},setGlobalStartTime:function(a){this.globalStartTime=a
},bench:function(e,d,a){if(!d){d="bench%@".fmt(this._benchCount++)}if(!a){a=1}var b;
while(--a>=0){var c=SC.Benchmark.start(d);b=e();SC.Benchmark.end(c)}return b},install:function(a,d,b){a["b__"+d]=a[d];
var c=a["b__"+d];a[d]=function(){var f="%@(%@)".fmt(d,$A(arguments).join(", "));SC.Benchmark.start(f,b);
var e=c.apply(this,arguments);SC.Benchmark.end(f);return e}},restore:function(a,b){a[b]=a["b__"+b]
},report:function(c){if(c){return this._genReport(c)}var b=[];for(var a in this.stats){if(!this.stats.hasOwnProperty(a)){continue
}b.push(this._genReport(a))}return b.join("\n")},timelineReport:function(a){a=(a)?"SproutCore Application":a;
var b=[a,"User-Agent: %@".fmt(navigator.userAgent),"Report Generated: %@ (%@)".fmt(new Date().toString(),Date.now()),""];
var d=this._compileChartData(true);for(var c=0;c<d.length;c++){if(d[c][4]){b.push(this._timelineGenSubReport(d[c]))
}else{b.push(this._timelineGenReport(d[c]))}}return b.join("\n")},timelineChart:function(w){var r=0;
this.hideChart();var n=this._compileChartData(false);var k=n.length;if(k===0){return
}var b=this.globalStartTime?this.globalStartTime:n[0][1];var d=n[k-1][2]-b;var q=50+k*30;
var s=Math.ceil(d/200)+1;var v=s*50;var c=document.createElement("div");c.className="sc-benchmark-graph";
document.body.appendChild(c);var x=document.createElement("div");x.innerHTML=((w)?w:"SproutCore Application")+(" - Total Captured Time: "+d+" ms - Points Captured: "+k)+' [<a href="javascript:SC.Benchmark.hideChart();">Hide Chart</a>]';
x.className="sc-benchmark-title";c.appendChild(x);var f=document.createElement("div");
f.className="sc-benchmark-top";f.style.width=v+"px";c.appendChild(f);for(r=0;r<s;
r++){var u=document.createElement("div");u.className="sc-benchmark-tick";u.style.left=(r*50)+"px";
u.style.height=q+"px";var e=document.createElement("div");e.className="sc-benchmark-tick-label";
e.style.left=(r*50)+"px";e.innerHTML=r*200+" ms";c.appendChild(u);c.appendChild(e)
}for(r=0;r<k;r++){var l=document.createElement("div");l.style.top=(75+(r*30))+"px";
l.style.width=v+"px";l.className=(r%2===0)?"sc-benchmark-row even":"sc-benchmark-row";
c.appendChild(l);var m=document.createElement("div");var h=n[r][1];var g=n[r][2];
var a=n[r][3];m.innerHTML="&nbsp;"+(n[r][0]+" <span class='sc-benchmark-emphasis'>"+a+"ms</span>");
m.className="sc-benchmark-bar";m.style.cssText="left:"+(((h-b)/4))+"px; width: "+((a/4))+"px; top: "+(53+(r*30))+"px;";
m.title="start: "+(h-b)+" ms, end: "+(g-b)+" ms, duration: "+a+" ms";c.appendChild(m)
}this._graph=c},hideChart:function(){if(this._graph){try{document.body.removeChild(this._graph)
}catch(a){}}},log:function(d){var c=this.report(d).split("\n"),b=c.length,a;for(a=0;
a<b;a++){console.log(c[a])}},startProfile:function(a){if(!this.enabled){return}if(console&&console.profile){console.profile(a)
}},endProfile:function(a){if(!this.enabled){return}if(console&&console.profileEnd){console.profileEnd(a)
}},_compileChartData:function(g){var l=[],a;for(var m in this.stats){var e=this.stats[m];
for(var f=0;f<e._times.length;f++){var n=e._times[f];a=(e._times.length>1)?(f+1)+" - "+m:m;
l.push([a,n.start,n.end,n.dur,false]);if(g){var b=n._subStats;for(var c in b){var h=b[c];
for(var d=0;d<h._times.length;d++){var q=h._times[d];a=(h._times.length>1)?(d+1)+" - "+c:c;
l.push([a,q.start,q.end,q.dur,true])}}}}}l.sort(function(r,k){if(r[1]<k[1]){return -1
}else{if(r[1]==k[1]){if(r[3]&&!k[3]){return -1}if(!r[3]&&k[3]){return 1}return 0}}return 1
});return l},_genReport:function(a){var b=this._statFor(a);var c=(b.runs>0)?(Math.floor(b.amt*1000/b.runs)/1000):0;
return"BENCH %@ msec: %@ (%@x)".fmt(c,(b.name||a),b.runs)},_timelineGenReport:function(a){if(this.globalStartTime){return"BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_timelineGenSubReport:function(a){if(this.globalStartTime){return"   CHECKPOINT BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"   CHECKPOINT BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_subStatFor:function(d,c){var e=this.stats[c]._times.length;
if(e===0){return}var a=this.stats[c]._times[this.stats[c]._times.length-1]._subStats;
var b=a[d];if(!b){a[d]={runs:0,amt:0,name:d,_starts:[],_times:[]};b=a[d]}return b
},_statFor:function(b){var a=this.stats[b];if(!a){a=this.stats[b]={runs:0,amt:0,name:b,_starts:[],_times:[]};
a=this.stats[b]}return a},reset:function(){this.stats={}},_bench:function(b,a){SC.Benchmark.bench(b,a,1)
},_benchCount:1};SC.Benchmark=SC.Benchmark;SC.mixin({logBundleLoading:NO,bundleIsLoaded:function(a){var b=SC.BUNDLE_INFO[a];
return b?!!b.loaded:NO},_scb_bundleDidLoad:function(b,h,a,k){var d=a,q=h;if(SC.typeOf(h)===SC.T_STRING){q=SC.objectForPropertyPath(h)
}if(SC.typeOf(a)===SC.T_STRING){d=SC.objectForPropertyPath(a,q)}if(!d){if(SC.LAZY_INSTANTIATION[b]){var n=SC.LAZY_INSTANTIATION[b];
if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' is marked for lazy instantiation, instantiating it now…".fmt(b))
}for(var f=0,c=n.length;f<c;f++){try{n[f]()}catch(g){console.error("SC.loadBundle(): Failted to lazily instatiate entry for  '%@'".fmt(b))
}}delete SC.LAZY_INSTANTIATION[b];if(SC.typeOf(h)===SC.T_STRING){q=SC.objectForPropertyPath(h)
}if(SC.typeOf(a)===SC.T_STRING){d=SC.objectForPropertyPath(a,q)}if(!a){throw"SC.loadBundle(): could not find callback for lazily instantiated bundle '%@'".fmt(b)
}}else{throw"SC.loadBundle(): could not find callback for '%@'".fmt(b)}}if(!k){k=[]
}k.push(b);var l=!!SC.RunLoop.currentRunLoop;if(l){SC.run(function(){d.apply(q,k)
})}else{d.apply(q,k)}},tryToLoadBundle:function(d,e,f,b){var a,c;if(SC.typeOf(e)===SC.T_STRING){c=SC.objectForPropertyPath(e)
}if(SC.typeOf(f)===SC.T_STRING){a=SC.objectForPropertyPath(f,c)}if(a||SC.LAZY_INSTANTIATION[d]){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' found through other means, will attempt to load…".fmt(d))
}SC.BUNDLE_INFO[d]={loaded:YES};return SC.BUNDLE_INFO[d]}return NO},loadBundle:function(y,C,d){var w,z;
if(d===undefined&&SC.typeOf(C)===SC.T_FUNCTION){d=C;C=null}var s=SC.BUNDLE_INFO[y],B,A,c=SC.A(arguments).slice(3),l=SC.logBundleLoading;
if(l){console.log("SC.loadBundle(): Attempting to load '%@'".fmt(y))}if(!s){if(l){console.log("SC.loadBundle(): Attemping to load %@ without SC.BUNDLE_INFO entry… could be loaded through other means.".fmt(y))
}s=this.tryToLoadBundle(y,C,d,c)}if(!s){throw"SC.loadBundle(): could not find bundle '%@'".fmt(y)
}else{if(s.loaded){if(l){console.log("SC.loadBundle(): Bundle '%@' already loaded, skipping.".fmt(y))
}if(d){if(SC.isReady){SC._scb_bundleDidLoad(y,C,d,c)}else{SC.ready(SC,function(){SC._scb_bundleDidLoad(y,C,d,c)
})}}}else{if(l){console.log("SC.loadBundle(): Bundle '%@' is not loaded, loading now.".fmt(y))
}B=s.callbacks||[];if(d){B.push(function(){SC._scb_bundleDidLoad(y,C,d,c)});s.callbacks=B
}if(!s.loading){var b=s.requires||[];var g=YES;for(w=0,z=b.length;w<z;++w){var u=b[w];
var m=SC.BUNDLE_INFO[u];if(!m){throw"SC.loadBundle(): could not find required bundle '%@' for bundle '%@'".fmt(u,y)
}else{if(m.loading){g=NO;break}else{if(m.loaded){continue}else{g=NO;var v=m.dependents;
if(!v){m.dependents=v=[]}v.push(y);if(l){console.log("SC.loadBundle(): '%@' depends on '%@', loading dependency…".fmt(y,u))
}SC.loadBundle(u);break}}}}if(g){var n,e,f,a,h,r;h=document.getElementsByTagName("head")[0];
if(!h){h=document.documentElement}n=s.styles||[];for(w=0,z=n.length;w<z;++w){f=n[w];
if(f.length>0){a=document.createElement("link");a.setAttribute("href",f);a.setAttribute("rel","stylesheet");
a.setAttribute("type","text/css");h.appendChild(a)}}var k=this._jsBundleLoadQueue;
if(!k){this._jsBundleLoadQueue=k={}}k[y]=[];var x=k[y];e=s.scripts||[];for(w=0,z=e.length;
w<z;++w){f=e[w];if(f.length>0){x.push(f)}}s.loading=YES;this.scriptDidLoad(y)}}}}},scriptDidLoad:function(c){var a=this._jsBundleLoadQueue;
if(a){var e=a[c];if(e){var b=e.shift();if(SC.logBundleLoading){console.log("SC.scriptDidLoad(): Loading next file in '%@' -> '%@'".fmt(c,b))
}var d=document.createElement("script");d.setAttribute("type","text/javascript");
d.setAttribute("src",b);document.body.appendChild(d)}}},bundleDidLoad:function(d){var g=SC.BUNDLE_INFO[d],e=SC.logBundleLoading,f,c;
if(!g){g=SC.BUNDLE_INFO[d]={loaded:YES};return}if(g.loaded&&e){console.log("SC.bundleDidLoad() called more than once for bundle '%@'. Skipping.".fmt(d));
return}delete g.loading;g.loaded=YES;if(SC.isReady){SC._invokeCallbacksForBundle(d)
}else{SC.ready(SC,function(){SC._invokeCallbacksForBundle(d)})}var h=g.dependents||[];
for(var b=0,a=h.length;b<a;++b){if(e){console.log("SC.loadBundle(): Bundle '%@' has completed loading, loading '%@' that depended on it.".fmt(d,h[b]))
}SC.loadBundle(h[b])}},_invokeCallbacksForBundle:function(c){var e=SC.BUNDLE_INFO[c],d;
if(!e){return}if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' has completed loading, invoking callbacks.".fmt(c))
}d=e.callbacks||[];SC.RunLoop.begin();for(var b=0,a=d.length;b<a;++b){d[b]()}SC.RunLoop.end()
}});SC.SCANNER_OUT_OF_BOUNDS_ERROR=new Error("Out of bounds.");SC.SCANNER_INT_ERROR=new Error("Not an int.");
SC.SCANNER_SKIP_ERROR=new Error("Did not find the string to skip.");SC.SCANNER_SCAN_ARRAY_ERROR=new Error("Did not find any string of the given array to scan.");
SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR=new Error("Can't compare the dates of two DateTimes that don't have the same timezone.");
SC.DATETIME_ISO8601="%Y-%m-%dT%H:%M:%S%Z";SC.Scanner=SC.Object.extend({string:null,scanLocation:0,scan:function(a){if(this.scanLocation+a>this.length){throw SC.SCANNER_OUT_OF_BOUNDS_ERROR
}var b=this.string.substr(this.scanLocation,a);this.scanLocation+=a;return b},scanInt:function(c,e){if(e===undefined){e=c
}var d=this.scan(e);var b=new RegExp("^\\d{"+c+","+e+"}");var a=d.match(b);if(!a){throw SC.SCANNER_INT_ERROR
}if(a[0].length<e){this.scanLocation+=a[0].length-e}return parseInt(a[0],10)},skipString:function(a){if(this.scan(a.length)!==a){throw SC.SCANNER_SKIP_ERROR
}return YES},scanArray:function(c){for(var b=0,a=c.length;b<a;b++){if(this.scan(c[b].length)===c[b]){return b
}this.scanLocation-=c[b].length}throw SC.SCANNER_SCAN_ARRAY_ERROR}});SC.DateTime=SC.Object.extend(SC.Freezable,SC.Copyable,{_ms:0,timezone:0,isFrozen:YES,adjust:function(b,a){var c;
b=b?SC.clone(b):{};c=(b.timezone!==undefined)?b.timezone:(this.timezone!==undefined)?this.timezone:0;
return this.constructor._adjust(b,this._ms,c,a)._createFromCurrentState()},advance:function(a){return this.constructor._advance(a,this._ms,this.timezone)._createFromCurrentState()
},unknownProperty:function(a){return this.constructor._get(a,this._ms,this.timezone)
},toFormattedString:function(a){return this.constructor._toFormattedString(a,this._ms,this.timezone)
},toISO8601:function(){return this.constructor._toFormattedString(SC.DATETIME_ISO8601,this._ms,this.timezone)
},toString:function(){return"UTC: "+new Date(this._ms).toUTCString()+", timezone: "+this.timezone
},isEqual:function(a){return SC.DateTime.compare(this,a)===0},copy:function(){return this
},toTimezone:function(a){if(a===undefined){a=0}return this.advance({timezone:a-this.timezone})
}});SC.DateTime.mixin(SC.Comparable,{recordFormat:SC.DATETIME_ISO8601,dayNames:"_SC.DateTime.dayNames".loc().w(),_englishDayNames:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".w(),abbreviatedDayNames:"_SC.DateTime.abbreviatedDayNames".loc().w(),monthNames:"_SC.DateTime.monthNames".loc().w(),abbreviatedMonthNames:"_SC.DateTime.abbreviatedMonthNames".loc().w(),_date:new Date(),_tz:0,timezone:new Date().getTimezoneOffset(),_dt_cache:{},_dt_cache_index:-1,_DT_CACHE_MAX_LENGTH:1000,_setCalcState:function(a,c){var b={milliseconds:this._date.getTime(),timezone:this._tz};
if(a!==undefined){this._date.setTime(a)}if(c!==undefined){this._tz=c}return b},_setCalcStateFromHash:function(c,b){var d=(b!==undefined)?b:this._tz;
var a=this._toMilliseconds(c,this._ms,d);return this._setCalcState(a,d)},_get:function(B,b,r){var q,z,h,s,e,l,n,f,u,a;
var c,k;var x=this._date;var w,g=null;w=this._setCalcState(b,r);if(B==="milliseconds"){g=x.getTime()
}else{if(B==="timezone"){g=this._tz}}if(g===null){u=B.slice(0,4);a=B.slice(4);if(u==="last"||u==="next"){c=this._get("dayOfWeek",b,r);
k=this._englishDayNames.indexOf(a);if(k>=0){var A=k-c;if(u==="last"&&A>=0){A-=7}if(u==="next"&&A<0){A+=7
}this._advance({day:A},b,r);g=this._createFromCurrentState()}}}if(g===null){if(r!==undefined){this._setCalcState(x.getTime()-(r*60000),0)
}switch(B){case"year":g=x.getUTCFullYear();break;case"month":g=x.getUTCMonth()+1;
break;case"day":g=x.getUTCDate();break;case"dayOfWeek":g=x.getUTCDay();break;case"hour":g=x.getUTCHours();
break;case"minute":g=x.getUTCMinutes();break;case"second":g=x.getUTCSeconds();break;
case"millisecond":g=x.getUTCMilliseconds();break}if((g===null)&&(B==="isLeapYear")){e=this._get("year");
g=(e%4===0&&e%100!==0)||e%400===0}if((g===null)&&(B==="daysInMonth")){switch(this._get("month")){case 4:case 6:case 9:case 11:g=30;
break;case 2:g=this._get("isLeapYear")?29:28;break;default:g=31;break}}if((g===null)&&(B==="dayOfYear")){q=x.getTime();
h=this._get("day");this._setCalcStateFromHash({day:1});for(s=this._get("month")-1;
s>0;s--){this._setCalcStateFromHash({month:s});h+=this._get("daysInMonth")}x.setTime(q);
g=h}if((g===null)&&(B.slice(0,4)==="week")){l=B.length===4?1:parseInt(B.slice("4"),10);
n=this._get("dayOfWeek");f=this._get("dayOfYear")-1;if(l===0){g=parseInt((f-n+7)/7,10)
}else{g=parseInt((f-(n-1+7)%7+7)/7,10)}}}this._setCalcState(w.milliseconds,w.timezone);
return g},_adjust:function(c,f,e,a){var d=c?SC.clone(c):{};var b=this._toMilliseconds(c,f,e,a);
this._setCalcState(b,e);return this},_advance:function(a,f,d){var c=a?SC.clone(a):{};
var e;for(var b in c){c[b]+=this._get(b,f,d)}e=(c.timezone!==undefined)?c.timezone:d;
return this._adjust(c,f,e,NO)},_toMilliseconds:function(l,c,h,f){var a=l?SC.clone(l):{};
var k=this._date;var g=k.getTime();var b,e;if(!SC.none(c)){k.setTime(c)}e=(h!==undefined)?h:(this.timezone!==undefined)?this.timezone:0;
k.setTime(k.getTime()-(e*60000));if(f===undefined||f===YES){if(!SC.none(a.hour)&&SC.none(a.minute)){a.minute=0
}if(!(SC.none(a.hour)&&SC.none(a.minute))&&SC.none(a.second)){a.second=0}if(!(SC.none(a.hour)&&SC.none(a.minute)&&SC.none(a.second))&&SC.none(a.millisecond)){a.millisecond=0
}}if(SC.none(a.year)){a.year=k.getUTCFullYear()}if(SC.none(a.month)){a.month=k.getUTCMonth()+1
}if(SC.none(a.day)){a.day=k.getUTCDate()}if(SC.none(a.hour)){a.hour=k.getUTCHours()
}if(SC.none(a.minute)){a.minute=k.getUTCMinutes()}if(SC.none(a.second)){a.second=k.getUTCSeconds()
}if(SC.none(a.millisecond)){a.millisecond=k.getUTCMilliseconds()}b=Date.UTC(a.year,a.month-1,a.day,a.hour,a.minute,a.second,a.millisecond);
k.setTime(b+(e*60000));b=k.getTime();k.setTime(g);return b},create:function(){var k=arguments.length===0?{}:arguments[0];
var d;if(SC.typeOf(k)===SC.T_NUMBER){k={milliseconds:k}}d=(k.timezone!==undefined)?k.timezone:this.timezone;
if(d===undefined){d=0}if(!SC.none(k.milliseconds)){var h="nu"+k.milliseconds+d,a=this._dt_cache;
var e=a[h];if(!e){var f,g=this._dt_cache_index,b=this;e=a[h]=new b([{_ms:k.milliseconds,timezone:d}]);
g=this._dt_cache_index=(g+1)%this._DT_CACHE_MAX_LENGTH;f=a[g];if(f!==undefined&&a[f]){delete a[f]
}a[g]=h}return e}else{var c=new Date();return this.create({milliseconds:this._toMilliseconds(k,c.getTime(),d,k.resetCascadingly),timezone:d})
}},_createFromCurrentState:function(){return this.create({milliseconds:this._date.getTime(),timezone:this._tz})
},parse:function(s,c){var u=new RegExp("(?:%([aAbBcdHIjmMpSUWwxXyYZ%])|(.))","g");
var r,l,a={},b={},k=SC.Scanner.create({string:s});if(SC.none(c)){c=SC.DATETIME_ISO8601
}try{while((l=u.exec(c))!==null){switch(l[1]){case"a":b.dayOfWeek=k.scanArray(this.abbreviatedDayNames);
break;case"A":b.dayOfWeek=k.scanArray(this.dayNames);break;case"b":a.month=k.scanArray(this.abbreviatedMonthNames)+1;
break;case"B":a.month=k.scanArray(this.monthNames)+1;break;case"c":throw"%c is not implemented";
case"d":a.day=k.scanInt(1,2);break;case"H":a.hour=k.scanInt(1,2);break;case"I":a.hour=k.scanInt(1,2);
break;case"j":throw"%j is not implemented";case"m":a.month=k.scanInt(1,2);break;case"M":a.minute=k.scanInt(1,2);
break;case"p":a.meridian=k.scanArray(["AM","PM"]);break;case"S":a.second=k.scanInt(1,2);
break;case"U":throw"%U is not implemented";case"W":throw"%W is not implemented";case"w":throw"%w is not implemented";
case"x":throw"%x is not implemented";case"X":throw"%X is not implemented";case"y":a.year=k.scanInt(2);
a.year+=(a.year>70?1900:2000);break;case"Y":a.year=k.scanInt(4);break;case"Z":var g=k.scan(1);
if(g==="Z"){a.timezone=0}else{if(g==="+"||g==="-"){var n=k.scanInt(2);if(k.scan(1)!==":"){k.scan(-1)
}var f=k.scanInt(2);a.timezone=(g==="+"?-1:1)*(n*60+f)}}break;case"%":k.skipString("%");
break;default:k.skipString(l[0]);break}}}catch(q){console.log("SC.DateTime.createFromString "+q.toString());
return null}if(!SC.none(a.meridian)&&!SC.none(a.hour)){if(a.meridian===1){a.hour=(a.hour+12)%24
}delete a.meridian}r=SC.DateTime.create(a);if(!SC.none(b.dayOfWeek)&&r.get("dayOfWeek")!==b.dayOfWeek){return null
}return r},_pad:function(b,a){var c=""+b;if(a===undefined){a=2}while(c.length<a){c="0"+c
}return c},__toFormattedString:function(b,e,c){var a,d;switch(b[1]){case"a":return this.abbreviatedDayNames[this._get("dayOfWeek")];
case"A":return this.dayNames[this._get("dayOfWeek")];case"b":return this.abbreviatedMonthNames[this._get("month")-1];
case"B":return this.monthNames[this._get("month")-1];case"c":return this._date.toString();
case"d":return this._pad(this._get("day"));case"D":return this._get("day");case"h":return this._get("hour");
case"H":return this._pad(this._get("hour"));case"i":a=this._get("hour");return(a===12||a===0)?12:(a+12)%12;
case"I":a=this._get("hour");return this._pad((a===12||a===0)?12:(a+12)%12);case"j":return this._pad(this._get("dayOfYear"),3);
case"m":return this._pad(this._get("month"));case"M":return this._pad(this._get("minute"));
case"p":return this._get("hour")>11?"PM":"AM";case"S":return this._pad(this._get("second"));
case"u":return this._pad(this._get("utc"));case"U":return this._pad(this._get("week0"));
case"W":return this._pad(this._get("week1"));case"w":return this._get("dayOfWeek");
case"x":return this._date.toDateString();case"X":return this._date.toTimeString();
case"y":return this._pad(this._get("year")%100);case"Y":return this._get("year");
case"Z":d=-1*c;return(d>=0?"+":"-")+this._pad(parseInt(Math.abs(d)/60,10))+":"+this._pad(Math.abs(d)%60);
case"%":return"%"}},_toFormattedString:function(c,e,b){var a=this;var d=(b!==undefined)?b:(this.timezone!==undefined)?this.timezone:0;
this._setCalcState(e-(b*60000),0);return c.replace(/\%([aAbBcdDHiIjmMpSUWwxXyYZ\%])/g,function(){var f=a.__toFormattedString.call(a,arguments,e,b);
return f})},compare:function(d,c){var f=d.get("milliseconds");var e=c.get("milliseconds");
return f<e?-1:f===e?0:1},compareDate:function(d,c){if(d.get("timezone")!==c.get("timezone")){throw SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR
}var f=d.adjust({hour:0}).get("milliseconds");var e=c.adjust({hour:0}).get("milliseconds");
return f<e?-1:f===e?0:1}});SC.Binding.dateTime=function(a){return this.transform(function(b,c){return b?b.toFormattedString(a):null
})};if(SC.RecordAttribute&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(c,a){if(SC.none(c)||SC.instanceOf(c,SC.DateTime)){return c
}var b=a.get("format");return SC.DateTime.parse(c,b?b:SC.DateTime.recordFormat)},from:function(b,a){if(SC.none(b)){return b
}var c=a.get("format");return b.toFormattedString(c?c:SC.DateTime.recordFormat)}})
}SC.BENCHMARK_LOG_READY=YES;sc_require("system/event");SC.mixin({_isReadyBound:NO,_bindReady:function(){if(this._isReadyBound){return
}this._isReadyBound=YES;if(document.addEventListener&&!SC.browser.opera){document.addEventListener("DOMContentLoaded",SC._didBecomeReady,NO)
}if(SC.browser.msie&&(window===top)){(function(){if(SC.isReady){return}try{document.documentElement.doScroll("left")
}catch(a){setTimeout(arguments.callee,0);return}SC._didBecomeReady()})()}if(SC.browser.opera){document.addEventListener("DOMContentLoaded",function(){if(SC.isReady){return
}for(var a=0;a<document.styleSheets.length;a++){if(document.styleSheets[a].disabled){setTimeout(arguments.callee,0);
return}}SC._didBecomeReady()},NO)}if(SC.browser.safari&&SC.browser.safari<530){console.error("ready() is not yet supported on Safari 3.1 and earlier")
}SC.Event.add(window,"load",SC._didBecomeReady)},_readyQueue:[],_afterReadyQueue:[],isReady:NO,_didBecomeReady:function(){if(SC.isReady){return
}if(typeof SC.mapDisplayNames===SC.T_FUNCTION){SC.mapDisplayNames()}if(typeof SC.addInvokeOnceLastDebuggingInfo===SC.T_FUNCTION){SC.addInvokeOnceLastDebuggingInfo()
}SC.Locale.createCurrentLocale();if(document&&document.getElementsByTagName){var a=document.getElementsByTagName("body")[0];
if(a){var b=a.className;var c=SC.Locale.currentLanguage.toLowerCase();a.className=(b&&b.length>0)?[b,c].join(" "):c
}}SC.Benchmark.start("ready");SC.run(function(){var g,f,e,d;do{f=SC._readyQueue;SC._readyQueue=[];
for(e=0,d=f.length;e<d;e++){g=f[e];var h=g[0]||document;var k=g[1];if(k){k.call(h)
}}}while(SC._readyQueue.length>0);SC.isReady=YES;SC._readyQueue=null;SC.Event.trigger(document,"ready",null,NO);
if(SC.removeLoading){SC.$("#loading").remove()}if(SC.userDefaults.get("ready")){if((SC.mode===SC.APP_MODE)&&(typeof main!="undefined")&&(main instanceof Function)&&!SC.suppressMain){main()
}}else{SC.userDefaults.readyCallback(window,main)}},this);SC.Benchmark.end("ready");
if(SC.BENCHMARK_LOG_READY){SC.Benchmark.log()}},ready:function(b,c){var a=this._readyQueue;
if(c===undefined){c=b;b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]}}if(!c){return this
}if(this.isReady){return c.call(b||document)}a.push([b,c]);return this}});SC._bindReady();
SC.removeLoading=YES;SC.APP_MODE="APP_MODE";SC.TEST_MODE="TEST_MODE";SC.mode=SC.APP_MODE;
require("system/ready");SC.CAPTURE_BACKSPACE_KEY=NO;SC.RootResponder=SC.Object.extend({panes:null,init:function(){arguments.callee.base.apply(this,arguments);
this.panes=SC.Set.create()},mainPane:null,makeMainPane:function(b){var a=this.get("mainPane");
if(a===b){return this}this.beginPropertyChanges();if(this.get("keyPane")===a){this.makeKeyPane(b)
}this.set("mainPane",b);if(a){a.blurMainTo(b)}if(b){b.focusMainFrom(a)}this.endPropertyChanges();
return this},menuPane:null,makeMenuPane:function(b){if(b&&!b.get("acceptsMenuPane")){return this
}else{var a=this.get("menuPane");if(a===b){return this}this.set("menuPane",b)}return this
},keyPane:null,previousKeyPanes:[],makeKeyPane:function(f){var e,a,d;if(f){if(!f.get("acceptsKeyPane")){return this
}else{a=this.get("keyPane");if(a===f){return this}else{if(a){d=this.get("previousKeyPanes");
d.push(a)}e=f}}}else{a=this.get("keyPane");d=this.get("previousKeyPanes");e=null;
while(d.length>0){var c=d.pop();if(c.get("isPaneAttached")&&c.get("acceptsKeyPane")){e=c;
break}}}if(!e){var b=this.get("mainPane");if(b&&b.get("acceptsKeyPane")){e=b}}if(a){a.willLoseKeyPaneTo(e)
}if(e){e.willBecomeKeyPaneFrom(a)}this.set("keyPane",e);if(e){e.didBecomeKeyPaneFrom(a)
}if(a){a.didLoseKeyPaneTo(e)}return this},currentWindowSize:null,computeWindowSize:function(){var c,b,a;
if(!this._bod||!this._docElement){b=document.body;a=document.documentElement;this._bod=b;
this._docElement=a}else{b=this._bod;a=this._docElement}if(window.innerHeight){c={width:window.innerWidth,height:window.innerHeight}
}else{if(a&&a.clientHeight){c={width:a.clientWidth,height:a.clientHeight}}else{if(b){c={width:b.clientWidth,height:b.clientHeight}
}}}return c},resize:function(){this._resize();return YES},_resize:function(){var b=this.computeWindowSize(),c=this.get("currentWindowSize");
this.set("currentWindowSize",b);if(!SC.rectsEqual(b,c)){if(SC.platform.touch){var a=SC.$(document.body);
if(b.height>=b.width){SC.device.set("orientation","portrait")}else{SC.device.set("orientation","landscape")
}}if(this.panes){SC.run(function(){this.panes.invoke("windowSizeDidChange",c,b)},this)
}}},hasFocus:NO,focus:function(){if(!this.get("hasFocus")){SC.$("body").addClass("sc-focus").removeClass("sc-blur");
SC.run(function(){this.set("hasFocus",YES)},this)}return YES},focusin:function(){this.focus()
},focusout:function(){this.blur()},blur:function(){if(this.get("hasFocus")){SC.$("body").addClass("sc-blur").removeClass("sc-focus");
SC.run(function(){this.set("hasFocus",NO)},this)}return YES},dragDidStart:function(a){this._mouseDownView=a;
this._drag=a},defaultResponder:null,sendAction:function(c,d,b,e,a){d=this.targetForAction(c,d,b,e);
if(d&&d.isResponderContext){return !!d.sendAction(c,b,a)}else{return d&&d.tryToPerform(c,b)
}},_responderFor:function(c,a){var b=c?c.get("defaultResponder"):null;if(c){c=c.get("firstResponder")||c;
do{if(c.respondsTo(a)){return c}}while((c=c.get("nextResponder")))}if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if(!b){return null}else{if(b.isResponderContext){return b}else{if(b.respondsTo(a)){return b
}else{return null}}}},targetForAction:function(b,e,d,f){if(!b||(SC.typeOf(b)!==SC.T_STRING)){return null
}if(e){if(SC.typeOf(e)===SC.T_STRING){e=SC.objectForPropertyPath(e)||SC.objectForPropertyPath(e,d)
}if(e&&!e.isResponderContext){if(e.respondsTo&&!e.respondsTo(b)){e=null}else{if(SC.typeOf(e[b])!==SC.T_FUNCTION){e=null
}}}return e}if(f){return this._responderFor(f,b)}var a=this.get("keyPane"),c=this.get("mainPane");
if(a&&(a!==f)){e=this._responderFor(a,b)}if(!e&&c&&(c!==a)){e=this._responderFor(c,b)
}if(!e&&(e=this.get("defaultResponder"))){if(SC.typeOf(e)===SC.T_STRING){e=SC.objectForPropertyPath(e);
if(e){this.set("defaultResponder",e)}}if(e){if(e.respondsTo&&!e.respondsTo(b)){e=null
}else{if(SC.typeOf(e[b])!==SC.T_FUNCTION){e=null}}}}return e},targetViewForEvent:function(a){return a.target?SC.$(a.target).view()[0]:null
},sendEvent:function(c,a,d){var e,b;SC.run(function(){if(d){e=d.get("pane")}else{e=this.get("menuPane")||this.get("keyPane")||this.get("mainPane")
}b=(e)?e.sendEvent(c,a,d):null},this);return b},listenFor:function(c,b,a){a=a?a:this;
c.forEach(function(d){var e=a[d];if(e){SC.Event.add(b,d,a,e)}},this);b=null;return a
},setup:function(){this.listenFor("touchstart touchmove touchend touchcancel".w(),document);
this.listenFor("keydown keyup beforedeactivate mousedown mouseup click dblclick mouseout mouseover mousemove selectstart contextmenu".w(),document).listenFor("resize".w(),window);
if(SC.browser.msie){this.listenFor("focusin focusout".w(),document)}else{this.listenFor("focus blur".w(),window)
}this.listenFor("webkitAnimationStart webkitAnimationIteration webkitAnimationEnd".w(),document);
if(this.keypress){if(SC.CAPTURE_BACKSPACE_KEY&&SC.browser.mozilla){var d=this;document.onkeypress=function(f){f=SC.Event.normalizeEvent(f);
return d.keypress.call(d,f)}}else{SC.Event.add(document,"keypress",this,this.keypress)
}}"drag selectstart".w().forEach(function(h){var k=this[h];if(k){if(SC.browser.msie){var f=this;
document.body["on"+h]=function(l){return k.call(f,SC.Event.normalizeEvent(event||window.event))
};SC.Event.add(window,"unload",this,function(){document.body["on"+h]=null})}else{SC.Event.add(document,h,this,k)
}}},this);var b=SC.browser.mozilla?"DOMMouseScroll":"mousewheel";SC.Event.add(document,b,this,this.mousewheel);
if(SC.browser&&SC.platform&&SC.browser.mobileSafari&&!SC.platform.touch){SC.platform.simulateTouchEvents()
}this.set("currentWindowSize",this.computeWindowSize());this.focus();if(SC.browser.mobileSafari){var e=SC.RunLoop.prototype.endRunLoop,g;
g=function(){if(e){e.apply(this,arguments)}var m=SC.RootResponder.responder._touches,l,f,n,h,r,s=NO;
if(m){for(l in m){if(m[l]._rescuedElement){continue}n=f=m[l].target;while(f&&(f=f.parentNode)&&!s){s=(f===document.body)
}if(!s&&n){if(n.parentNode&&n.cloneNode){var q=n.cloneNode(true);n.parentNode.replaceChild(q,n);
n.swapNode=q}var k=SC.touchHoldingPen;if(!k){k=SC.touchHoldingPen=document.createElement("div");
k.style.display="none";document.body.appendChild(k)}k.appendChild(n);m[l]._rescuedElement=n
}}}};SC.RunLoop.prototype.endRunLoop=g}if(SC.platform.touch){var c=this.computeWindowSize(),a=SC.$(document.body);
if(c.height>=c.width){SC.device.set("orientation","portrait")}else{SC.device.set("orientation","landscape")
}}},_touchedViews:{},_touches:{},touchesForView:function(a){if(this._touchedViews[SC.guidFor(a)]){return this._touchedViews[SC.guidFor(a)].touches
}},averagedTouchesForView:function(f,e){var l=this.touchesForView(f);if((!l||l.length===0)&&!e){return{x:0,y:0,d:0,touchCount:0}
}var c;if(l){c=l.toArray()}else{c=[]}if(e){c.push(e)}var g,d=c.length,b,a=0,n=0,m,k,h=0;
for(g=0;g<d;g++){b=c[g];a+=b.pageX;n+=b.pageY}a/=d;n/=d;for(g=0;g<d;g++){b=c[g];m=Math.abs(b.pageX-a);
k=Math.abs(b.pageY-n);h+=Math.pow(m*m+k*k,0.5)}h/=d;return{x:a,y:n,d:h,touchCount:d}
},assignTouch:function(b,a){if(b.hasEnded){throw"Attemt to assign a touch that is already finished."
}if(b.view===a){return}if(b.view){this.unassignTouch(b)}if(!this._touchedViews[SC.guidFor(a)]){this._touchedViews[SC.guidFor(a)]={view:a,touches:SC.CoreSet.create([]),touchCount:0};
a.set("hasTouch",YES)}b.view=a;this._touchedViews[SC.guidFor(a)].touches.add(b);this._touchedViews[SC.guidFor(a)].touchCount++
},unassignTouch:function(c){var a,b;if(!c.view){return}a=c.view;b=this._touchedViews[SC.guidFor(a)];
b.touches.remove(c);b.touchCount--;if(b.touchCount<1){a.set("hasTouch",NO);b.view=null;
delete this._touchedViews[SC.guidFor(a)]}c.view=undefined},makeTouchResponder:function(f,d,c,m){var h=f.touchResponders,b;
if(f.touchResponder===d){return}var a;if(d){a=d.get("pane")}else{a=this.get("keyPane")||this.get("mainPane")
}if(h.indexOf(d)<0){if(m){try{d=(a)?a.sendEvent("touchStart",f,d):null}catch(g){SC.Logger.error("Error in touchStart: "+g);
d=null}}else{if((d.get?d.get("acceptsMultitouch"):d.acceptsMultitouch)||!d.hasTouch){if(!d.touchStart(f)){d=null
}}else{}}}if(!c||(h.indexOf(d)>-1&&h[h.length-1]!==d)){this.unassignTouch(f);var k=h.length-1,l=h[k];
while(l&&l!==d){b=this.touchesForView(l);if((l.get?l.get("acceptsMultitouch"):l.acceptsMultitouch)||!b){if(l.touchCancelled){l.touchCancelled(f)
}}k--;l=h[k];h.pop();f.touchResponder=h[k];f.nextTouchResponder=h[k-1]}}if(d){this.assignTouch(f,d);
if(d!==f.touchResponder){h.push(d);f.touchResponder=d;f.nextTouchResponder=h[h.length-2]
}}},captureTouch:function(h,e,g){if(!e){e=this}var f=h.targetView,c=f,d=[],b,a;if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Received one touch on %@".fmt(f.toString()))
}while(c&&(c!==e)){d.unshift(c);c=c.get("nextResponder")}for(a=d.length,b=0;b<a;b++){c=d[b];
if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Checking %@ for captureTouch response…".fmt(c.toString()))
}if(c.tryToPerform("captureTouch",h)){if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Making %@ touch responder because it returns YES to captureTouch".fmt(c.toString()))
}this.makeTouchResponder(h,c,g,YES);return}}if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Didn't find a view that returned YES to captureTouch, so we're calling touchStart")
}this.makeTouchResponder(h,f,g,YES)},endMissingTouches:function(e){var b,a=e.length,d={},c=[];
for(b=0;b<a;b++){d[e[b].identifier]=YES}for(b in this._touches){var f=this._touches[b].identifier;
if(!d[f]){c.push(this._touches[b])}}for(b=0,a=c.length;b<a;b++){this.endTouch(c[b]);
this.finishTouch(c[b])}},_touchCount:0,endTouch:function(b,h,c){if(!h){h="touchEnd"
}var a,g,d,f;this.unassignTouch(b);if(b.touchResponder){f=b.touchResponder;g=b.touchResponders;
a=g.length-1;d=g[a];while(d){try{if(d[h]){d[h](b,c)}}catch(k){console.error("crashed on endTouch")
}if(b.touchResponder!==f){break}a--;d=g[a];h="touchCancelled"}}},finishTouch:function(b){var a;
this.unassignTouch(b);if(a=b._rescuedElement){if(a.swapNode&&a.swapNode.parentNode){a.swapNode.parentNode.replaceChild(a,a.swapNode)
}else{if(a.parentNode===SC.touchHoldingPen){SC.touchHoldingPen.removeChild(a)}}delete b._rescuedElement;
a.swapNode=null;a=null}b.touchResponders=null;b.touchResponder=null;b.nextTouchResponder=null;
b.hasEnded=YES;if(this._touches[b.identifier]){delete this._touches[b.identifier]
}},touchstart:function(a){var b=NO;SC.run(function(){this.endMissingTouches(a.touches);
var e,h=a.changedTouches,d=h.length,g,f,k,c;a.touchContext=this;for(e=0;e<d;e++){k=h[e];
c=SC.Touch.create(k,this);if(!c.targetView){continue}if(c.hidesTouchIntercept){b=YES
}c.timeStamp=a.timeStamp;this._touches[k.identifier]=c;c.event=a;this.captureTouch(c,this);
c.event=null}},this);if(b){return YES}return a.hasCustomEventHandling},touchmove:function(a){SC.run(function(){var c=a.changedTouches,b,r,n,f=c.length,m,l,k,q,g={},e,h,d=NO;
if(this._drag){b=SC.Touch.create(a.changedTouches[0],this);this._drag.tryToPerform("mouseDragged",b)
}for(n=0;n<f;n++){b=c[n];r=this._touches[b.identifier];if(!r){continue}if(r.hidesTouchIntercept){d=YES
}r.pageX=b.pageX;r.pageY=b.pageY;r.timeStamp=a.timeStamp;r.event=a;if(r.touchResponder){m=r.touchResponder;
h=SC.guidFor(m);if(!g[h]){g[h]={view:m,touches:[]}}g[h].touches.push(r)}}if(d){a.allowDefault();
return YES}for(n in g){m=g[n].view;l=g[n].touches;a.viewChangedTouches=l;k=this.touchesForView(m);
q=k.firstObject();a.pageX=q.pageX;a.pageY=q.pageY;a.touchContext=this;m.tryToPerform("touchesDragged",a,k)
}c=a.changedTouches;f=c.length;for(n=0;n<f;n++){b=c[n];r=this._touches[b.identifier];
r.event=null}},this);return a.hasCustomEventHandling},touchend:function(a){var b=NO;
SC.run(function(){var h=a.changedTouches,g,r,n,k=h.length,l,c,f=a.isCancel?"touchCancelled":"touchEnd",m,q,d,e;
for(n=0;n<k;n++){g=h[n];g.type="touchend";r=this._touches[g.identifier];if(!r){continue
}r.timeStamp=a.timeStamp;r.pageX=g.pageX;r.pageY=g.pageY;r.type="touchend";r.event=a;
if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("-- Received touch end")}if(r.hidesTouchIntercept){r.unhideTouchIntercept();
b=YES}if(this._drag){this._drag.tryToPerform("mouseUp",g);this._drag=null}this.endTouch(r,f,a);
this.finishTouch(r)}},this);if(b){return YES}return a.hasCustomEventHandling},touchcancel:function(a){a.isCancel=YES;
this.touchend(a)},attemptKeyEquivalent:function(b){var d=null;var c=b.commandCodes()[0];
if(!c){return NO}var f=this.get("menuPane"),a=this.get("keyPane"),e=this.get("mainPane");
if(f){d=f.performKeyEquivalent(c,b);if(d){return d}}if(a){d=a.performKeyEquivalent(c,b);
if(d||a.get("isModal")){return d}}if(!d&&e&&(e!==a)){d=e.performKeyEquivalent(c,b);
if(d||e.get("isModal")){return d}}return d},_lastModifiers:null,_handleModifierChanges:function(b){var a;
a=this._lastModifiers=(this._lastModifiers||{alt:false,ctrl:false,shift:false});var c=false;
if(b.altKey!==a.alt){a.alt=b.altKey;c=true}if(b.ctrlKey!==a.ctrl){a.ctrl=b.ctrlKey;
c=true}if(b.shiftKey!==a.shift){a.shift=b.shiftKey;c=true}b.modifiers=a;return(c)?(this.sendEvent("flagsChanged",b)?b.hasCustomEventHandling:YES):YES
},_isFunctionOrNonPrintableKey:function(a){return !!(a.altKey||a.ctrlKey||a.metaKey||((a.charCode!==a.which)&&SC.FUNCTION_KEYS[a.which]))
},_isModifierKey:function(a){return !!SC.MODIFIER_KEYS[a.charCode]},keydown:function(a){if(SC.none(a)){return YES
}var e=a.keyCode;if(e===229){this._IMEInputON=YES;return this.sendEvent("keyDown",a)
}if(e===27&&this._drag){this._drag.cancelDrag();this._drag=null;this._mouseDownView=null;
return YES}if(SC.browser.mozilla&&(a.which===8)){return true}var b=this._handleModifierChanges(a),d=a.target||a.srcElement,c=(a.which===8)&&!SC.allowsBackspaceToPreviousPage&&(d===document.body);
if(this._isModifierKey(a)){return(c?NO:b)}b=YES;if(this._isFunctionOrNonPrintableKey(a)){if(e>=37&&e<=40&&SC.browser.mozilla){return YES
}b=this.sendEvent("keyDown",a);if(!b){b=!this.attemptKeyEquivalent(a)}else{b=a.hasCustomEventHandling;
if(b){c=NO}}}return c?NO:b},keypress:function(b){var c,e=b.keyCode,f=!!SC.browser.mozilla;
if(f&&(b.which===8)){b.which=e;c=this.sendEvent("keyDown",b);return c?(SC.allowsBackspaceToPreviousPage||b.hasCustomEventHandling):YES
}else{var d=(e>=37&&e<=40&&f),a=b.charCode;if((a!==undefined&&a===0)&&!d){return YES
}if(d){b.which=e}return this.sendEvent("keyDown",b)?b.hasCustomEventHandling:YES}},keyup:function(a){if(this._ffevt){this._ffevt=null
}var b=this._handleModifierChanges(a);if(this._isModifierKey(a)){return b}if(this._IMEInputON&&a.keyCode===13){a.isIMEInput=YES;
this.sendEvent("keyDown",a);this._IMEInputON=NO}return this.sendEvent("keyUp",a)?a.hasCustomEventHandling:YES
},beforedeactivate:function(c){var b=c.toElement;if(b&&b.tagName&&b.tagName!=="IFRAME"){var a=SC.$(b).view()[0];
if(a&&a.get("blocksIEDeactivate")){return NO}}return YES},mousedown:function(e){if(SC.platform.touch){e.allowDefault();
return YES}if(!SC.browser.msie){window.focus()}this._clickCount+=1;if(!this._lastMouseUpAt||((Date.now()-this._lastMouseUpAt)>200)){this._clickCount=1
}else{var d=this._lastMouseDownX-e.clientX,a=this._lastMouseDownY-e.clientY,f=Math.sqrt(d*d+a*a);
if(f>8){this._clickCount=1}}e.clickCount=this._clickCount;this._lastMouseDownX=e.clientX;
this._lastMouseDownY=e.clientY;var c,b=this.targetViewForEvent(e);if(b){c=b.getPath("pane.firstResponder")
}if(c&&c.kindOf(SC.InlineTextFieldView)&&c!==b){c.resignFirstResponder()}b=this._mouseDownView=this.sendEvent("mouseDown",e,b);
if(b&&b.respondsTo("mouseDragged")){this._mouseCanDrag=YES}return b?e.hasCustomEventHandling:YES
},mouseup:function(b){if(SC.platform.touch){b.allowDefault();return YES}this.targetViewForEvent(b);
if(this._drag){this._drag.tryToPerform("mouseUp",b);this._drag=null}var d=null,a=this._mouseDownView,c=this.targetViewForEvent(b);
this._lastMouseUpAt=Date.now();b.clickCount=this._clickCount;if(a){d=this.sendEvent("mouseUp",b,a);
if(!d&&(this._clickCount===2)){d=this.sendEvent("doubleClick",b,a)}if(!d){d=this.sendEvent("click",b,a)
}}if(!d){if(this._clickCount===2){d=this.sendEvent("doubleClick",b,c)}if(!d){d=this.sendEvent("click",b,c)
}}this._mouseCanDrag=NO;this._mouseDownView=null;return(d)?b.hasCustomEventHandling:YES
},dblclick:function(a){if(SC.browser.isIE){this._clickCount=2;this.mouseup(a)}},mousewheel:function(b){var a=this.targetViewForEvent(b),c=this.sendEvent("mouseWheel",b,a);
return(c)?b.hasCustomEventHandling:YES},_lastHovered:null,mousemove:function(a){if(SC.platform.touch){a.allowDefault();
return YES}if(SC.browser.msie){if(this._lastMoveX===a.clientX&&this._lastMoveY===a.clientY){return
}}this._lastMoveX=a.clientX;this._lastMoveY=a.clientY;SC.run(function(){if(this._drag){if(SC.browser.msie){if(this._lastMouseDownX!==a.clientX||this._lastMouseDownY!==a.clientY){this._drag.tryToPerform("mouseDragged",a)
}}else{this._drag.tryToPerform("mouseDragged",a)}}else{var d=this._lastHovered||[],e=[],g,f,b,c=this.targetViewForEvent(a);
while(c&&(c!==this)){e.push(c);c=c.get("nextResponder")}for(f=0,b=d.length;f<b;f++){c=d[f];
g=c.respondsTo("mouseExited");if(g&&e.indexOf(c)===-1){c.tryToPerform("mouseExited",a)
}}for(f=0,b=e.length;f<b;f++){c=e[f];if(d.indexOf(c)!==-1){c.tryToPerform("mouseMoved",a)
}else{c.tryToPerform("mouseEntered",a)}}this._lastHovered=e;if(this._mouseDownView){if(SC.browser.msie){if(this._lastMouseDownX!==a.clientX&&this._lastMouseDownY!==a.clientY){this._mouseDownView.tryToPerform("mouseDragged",a)
}}else{this._mouseDownView.tryToPerform("mouseDragged",a)}}}},this)},_mouseCanDrag:YES,selectstart:function(b){var c=this.targetViewForEvent(b),a=this.sendEvent("selectStart",b,c);
if(c&&c.respondsTo("mouseDragged")){return(a!==null?YES:NO)&&!this._mouseCanDrag}else{return(a!==null?YES:NO)
}},drag:function(){return false},contextmenu:function(b){var a=this.targetViewForEvent(b);
return this.sendEvent("contextMenu",b,a)},webkitAnimationStart:function(b){try{var a=this.targetViewForEvent(b);
this.sendEvent("animationDidStart",b,a)}catch(c){console.warn("Exception during animationDidStart: %@".fmt(c));
throw c}return a?b.hasCustomEventHandling:YES},webkitAnimationIteration:function(b){try{var a=this.targetViewForEvent(b);
this.sendEvent("animationDidIterate",b,a)}catch(c){console.warn("Exception during animationDidIterate: %@".fmt(c));
throw c}return a?b.hasCustomEventHandling:YES},webkitAnimationEnd:function(b){try{var a=this.targetViewForEvent(b);
this.sendEvent("animationDidEnd",b,a)}catch(c){console.warn("Exception during animationDidEnd: %@".fmt(c));
throw c}return a?b.hasCustomEventHandling:YES}});SC.Touch=function(d,a){this.touchContext=a;
this.identifier=d.identifier;var c=d.target,b;if(c&&SC.$(c).hasClass("touch-intercept")){d.target.style.webkitTransform="translate3d(0px,-5000px,0px)";
c=document.elementFromPoint(d.pageX,d.pageY);if(c){b=SC.$(c).view()[0]}this.hidesTouchIntercept=NO;
if(c.tagName==="INPUT"){this.hidesTouchIntercept=d.target}else{d.target.style.webkitTransform="translate3d(0px,0px,0px)"
}}else{b=d.target?SC.$(d.target).view()[0]:null}this.targetView=b;this.target=c;this.hasEnded=NO;
this.type=d.type;this.clickCount=1;this.view=undefined;this.touchResponder=this.nextTouchResponder=undefined;
this.touchResponders=[];this.startX=this.pageX=d.pageX;this.startY=this.pageY=d.pageY
};SC.Touch.prototype={unhideTouchIntercept:function(){var a=this.hidesTouchIntercept;
if(a){setTimeout(function(){a.style.webkitTransform="translate3d(0px,0px,0px)"},500)
}},allowDefault:function(){if(this.event){this.event.hasCustomEventHandling=YES}},preventDefault:function(){if(this.event){this.event.preventDefault()
}},stopPropagation:function(){if(this.event){this.event.stopPropagation()}},stop:function(){if(this.event){this.event.stop()
}},end:function(){this.touchContext.endTouch(this)},makeTouchResponder:function(b,c,a){this.touchContext.makeTouchResponder(this,b,c,a)
},captureTouch:function(a,b){this.touchContext.captureTouch(this,a,b)},touchesForView:function(a){return this.touchContext.touchesForView(a)
},touchesForResponder:function(a){return this.touchContext.touchesForView(a)},averagedTouchesForView:function(a,b){return this.touchContext.averagedTouchesForView(a,(b?this:null))
}};SC.mixin(SC.Touch,{create:function(b,a){return new SC.Touch(b,a)}});SC.ready(SC.RootResponder,SC.RootResponder.ready=function(){var a;
a=SC.RootResponder.responder=SC.RootResponder.create();a.setup()});SC.platform={touch:("createTouch" in document)&&!navigator.userAgent.match("Chrome/9"),bounceOnScroll:(/iPhone|iPad|iPod/).test(navigator.platform),pinchToZoom:(/iPhone|iPad|iPod/).test(navigator.platform),input:function(d){var e={},c=d.length,f=document.createElement("input"),b,a;
for(a=0;a<c;a++){b=d[a];e[b]=!!(b in f)}return e}(("autocomplete readonly list size required multiple maxlength pattern min max step placeholder").w()),standalone:!!navigator.standalone,cssPrefix:null,domCSSPrefix:null,simulateTouchEvents:function(){if(this.touch){SC.Logger.info("Can't simulate touch events in an environment that supports them.");
return}SC.platform.touch=YES;document.body.className=document.body.className+" touch";
this._simtouch_counter=1;this.removeEvents("click dblclick mouseout mouseover mousewheel".w());
this.replaceEvent("mousemove",this._simtouch_mousemove);this.replaceEvent("mousedown",this._simtouch_mousedown);
this.replaceEvent("mouseup",this._simtouch_mouseup)},removeEvents:function(d){var b,a=d.length,c;
for(b=0;b<a;b++){c=d[b];SC.Event.remove(document,c,SC.RootResponder.responder,SC.RootResponder.responder[c])
}},replaceEvent:function(a,b){SC.Event.remove(document,a,SC.RootResponder.responder,SC.RootResponder.responder[a]);
SC.Event.add(document,a,this,b)},_simtouch_mousemove:function(a){if(!this._mousedown){return NO
}var b=this.manufactureTouchEvent(a,"touchmove");return SC.RootResponder.responder.touchmove(b)
},_simtouch_mousedown:function(a){this._mousedown=YES;var b=this.manufactureTouchEvent(a,"touchstart");
return SC.RootResponder.responder.touchstart(b)},_simtouch_mouseup:function(a){var c=this.manufactureTouchEvent(a,"touchend"),b=SC.RootResponder.responder.touchend(c);
this._mousedown=NO;this._simtouch_counter++;return b},manufactureTouchEvent:function(a,c){var d,b=this._simtouch_counter;
d={type:c,target:a.target,identifier:b,pageX:a.pageX,pageY:a.pageY,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY};
a.changedTouches=a.touches=[d];return a},supportsCSSTransitions:NO,supportsCSSTransforms:NO,understandsCSS3DTransforms:NO,supportsCSS3DTransforms:NO,supportsAcceleratedLayers:NO,supportsHashChange:function(){return("onhashchange" in window)&&(document.documentMode===undefined||document.documentMode>7)
}()};(function(){var a=navigator.userAgent.toLowerCase();if((/webkit/).test(a)){SC.platform.cssPrefix="webkit";
SC.platform.domCSSPrefix="Webkit"}else{if((/opera/).test(a)){SC.platform.cssPrefix="opera";
SC.platform.domCSSPrefix="O"}else{if((/msie/).test(a)&&!(/opera/).test(a)){SC.platform.cssPrefix="ms";
SC.platform.domCSSPrefix="ms"}else{if((/mozilla/).test(a)&&!(/(compatible|webkit)/).test(a)){SC.platform.cssPrefix="moz";
SC.platform.domCSSPrefix="Moz"}}}}})();(function(){var d=document.createElement("div");
var e=["-moz-","-moz-","-o-","-ms-","-webkit-"];var a=["moz","Moz","o","ms","webkit"];
var c="",b=null;for(b=0;b<e.length;b++){c+=e[b]+"transition:all 1s linear;";c+=e[b]+"transform: translate(1px, 1px);";
c+=e[b]+"perspective: 500px;"}d.style.cssText=c;for(b=0;b<a.length;b++){if(d.style[a[b]+"TransitionProperty"]!==undefined){SC.platform.supportsCSSTransitions=YES
}if(d.style[a[b]+"Transform"]!==undefined){SC.platform.supportsCSSTransforms=YES}if(d.style[a[b]+"Perspective"]!==undefined||d.style[a[b]+"PerspectiveProperty"]!==undefined){SC.platform.understandsCSS3DTransforms=YES;
SC.platform.supportsCSS3DTransforms=YES}}if(window.media&&window.media.matchMedium){if(!window.media.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}else{if(window.styleMedia&&window.styleMedia.matchMedium){if(!window.styleMedia.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}}if(SC.platform.supportsCSSTransforms&&SC.platform.cssPrefix==="webkit"){SC.platform.supportsAcceleratedLayers=YES
}})();require("system/ready");require("system/root_responder");require("system/platform");
SC.device=SC.Object.create({orientation:"desktop",isOffline:NO,mouseLocation:function(){var a=SC.RootResponder.responder,c=a._lastMoveX,b=a._lastMoveY;
if(SC.empty(c)||SC.empty(b)){return null}return{x:c,y:b}}.property(),init:function(){arguments.callee.base.apply(this,arguments);
if(SC.platform.touch){this.orientationchange()}if(navigator&&navigator.onLine===false){this.set("isOffline",YES)
}this.panes=SC.Set.create()},setup:function(){var a=SC.RootResponder.responder;a.listenFor("orientationchange".w(),window,this);
a.listenFor("online offline".w(),document,this)},orientationchange:function(a){if(window.orientation===0||window.orientation===180){this.set("orientation","portrait")
}else{this.set("orientation","landscape")}},orientationObserver:function(){var a=SC.$(document.body),b=this.get("orientation");
if(b==="portrait"){a.setClass("portrait",YES);a.setClass("landscape",NO)}if(b==="landscape"){a.setClass("portrait",NO);
a.setClass("landscape",YES)}}.observes("orientation"),online:function(a){this.set("isOffline",NO)
},offline:function(a){this.set("isOffline",YES)}});SC.ready(function(){SC.device.setup()
});SC.ExceptionHandler={handleException:function(a){if(this.isShowingErrorDialog){return
}this._displayErrorDialog(a)},_displayErrorDialog:function(b){var a=this._errorDialogHTMLForException(b),c=document.createElement("div");
c.style.cssText="left: 0px; right: 0px; top: 0px; bottom: 0px; position: absolute; background-color: white; background-color: rgba(255,255,255,0.6); z-index:100;";
c.innerHTML=a;document.body.appendChild(c);this.isShowingErrorDialog=YES},_errorDialogHTMLForException:function(b){var a;
a=['<div id="sc-error-dialog" style="position: absolute; width: 500px; left: 50%; top: 50%; margin-left: -250px; background-color: white; border: 1px solid black; font-family: Monaco, monospace; font-size: 9px; letter-spacing: 1px; padding: 10px">',"An error has occurred which prevents the application from running:","<br><br>",b.message,'<div id="sc-error-dialog-reload-button" onclick="window.location.reload();" style="float: right; font-family: Monaco, monospace; font-size: 9px; letter-spacing: 1px; border: 1px solid black; padding: 3px; clear: both; margin-top: 20px; cursor: pointer;">',"Reload","</div>","</div>"];
return a.join("")},isShowingErrorDialog:NO};sc_require("system/locale");SC.IMAGE_ABORTED_ERROR=SC.$error("SC.Image.AbortedError","Image",-100);
SC.IMAGE_FAILED_ERROR=SC.$error("SC.Image.FailedError","Image",-101);SC.imageCache=SC.Object.create({loadLimit:4,activeRequests:0,loadImage:function(a,e,f,d){var b=SC.typeOf(e);
if(SC.none(f)&&SC.typeOf(e)===SC.T_FUNCTION){e=null;f=e}if(SC.typeOf(f)===SC.T_STRING){f=e[f]
}if(SC.none(d)){d=SC.none(e)&&SC.none(f)}var c=this._imageEntryFor(a);if(c.status===this.IMAGE_LOADED){if(f){f.call(e||c.image,c.url,c.image)
}}else{if(e||f){this._addCallback(c,e,f)}c.retainCount++;this._scheduleImageEntry(c,d)
}},releaseImage:function(a,d,e){var c=this._imageEntryFor(a,NO);if(!c){return this
}if(--c.retainCount<=0){this._deleteEntry(c)}else{if(d||e){var b=SC.typeOf(d);if(SC.none(e)&&SC.typeOf(d)===SC.T_FUNCTION){d=null;
e=d}if(SC.typeOf(e)===SC.T_STRING){e=d[e]}this._removeCallback(c,d,e)}}},reloadImage:function(a){var b=this._imageEntryFor(a,NO);
if(b&&b.status===this.IMAGE_LOADED){b.status=this.IMAGE_WAITING}},loadNextImage:function(){var c=null,a;
if(this.get("activeRequests")>=this.get("loadLimit")){return}a=this._foregroundQueue;
while(a.length>0&&!c){c=a.shift()}if(!c){a=this._backgroundQueue;while(a.length>0&&!c){c=a.shift()
}}this.set("isLoading",!!c);if(c){var b=c.image;b.onabort=this._imageDidAbort;b.onerror=this._imageDidError;
b.onload=this._imageDidLoad;b.src=c.url;this._loading.push(c);this.incrementProperty("activeRequests");
this.loadNextImage()}},_imageEntryFor:function(c,a){if(a===undefined){a=YES}var d=this._images[c];
if(!d&&a){var b=new Image();d=this._images[c]={url:c,status:this.IMAGE_WAITING,callbacks:[],retainCount:0,image:b};
b.entry=d}return d},_deleteEntry:function(a){this._unscheduleImageEntry(a);delete this._images[a.url]
},_addCallback:function(c,d,e){var b=c.callbacks;var a=b.find(function(f){return f[0]===d&&f[1]===e
},this);if(!a){b.push([d,e])}b=null;return this},_removeCallback:function(b,c,d){var a=b.callbacks;
a.forEach(function(f,e){if(f[0]===c&&f[1]===d){a[e]=null}},this);a=null;return this
},_scheduleImageEntry:function(d,c){var b=this._backgroundQueue;var e=this._foregroundQueue;
if(d.status===this.IMAGE_LOADED){return this}if((d.status===this.IMAGE_QUEUED)&&!c&&d.isBackground){b[b.indexOf(d)]=null;
d.status=this.IMAGE_WAITING}if(d.status!==this.IMAGE_QUEUED){var a=(c)?b:e;a.push(d);
d.status=this.IMAGE_QUEUED;d.isBackground=c}if(!this.isLoading){this.invokeLater(this.loadNextImage,100)
}this.set("isLoading",YES);return this},_unscheduleImageEntry:function(b){if(b.status!==this.IMAGE_QUEUED){return this
}var a=b.isBackground?this._backgroundQueue:this._foregroundQueue;a[a.indexOf(b)]=null;
if(this._loading.indexOf(b)>=0){a.image.abort();this.imageStatusDidChange(b,this.ABORTED)
}return this},_imageDidAbort:function(){SC.run(function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ABORTED)
},this)},_imageDidError:function(){SC.run(function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ERROR)
},this)},_imageDidLoad:function(){SC.run(function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.LOADED)
},this)},imageStatusDidChange:function(c,a){if(!c){return}var b=c.url;var d;switch(a){case this.LOADED:d=c.image;
break;case this.ABORTED:d=SC.IMAGE_ABORTED_ERROR;break;case this.ERROR:d=SC.IMAGE_FAILED_ERROR;
break;default:d=SC.IMAGE_FAILED_ERROR;break}c.callbacks.forEach(function(f){var g=f[0],h=f[1];
h.call(g,b,d)},this);c.callbacks=[];c.status=(a===this.LOADED)?this.IMAGE_LOADED:this.IMAGE_WAITING;
var e=c.image;if(e){e.onload=e.onerror=e.onabort=null;if(a!==this.LOADED){c.image=null
}}this._loading[this._loading.indexOf(c)]=null;if(this._loading.length>this.loadLimit*2){this._loading=this._loading.compact()
}this.decrementProperty("activeRequests");this.loadNextImage()},init:function(){arguments.callee.base.apply(this,arguments);
this._images={};this._loading=[];this._foregroundQueue=[];this._backgroundQueue=[]
},IMAGE_LOADED:"loaded",IMAGE_QUEUED:"queued",IMAGE_WAITING:"waiting",ABORTED:"aborted",ERROR:"error",LOADED:"loaded"});
SC.json={encode:function(a){return JSON.stringify(a)},decode:function(a){return JSON.parse(a)
}};if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;
i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space
}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)
}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")
}}}());SC.Math=SC.Object.create({near:function(c,b,a){if(!a){a=0.00001}return Math.abs(c-b)<=a
},round:function(d,a){if(!a){a=0}var b=Math.pow(10,a);if(a<0){var c=b.toString();
b=c.substring(0,c.indexOf("1")+1)}d=d.valueOf();return Math.round(d*b)/b}});SC.Page=SC.Object.extend({owner:null,get:function(a){var b=this[a];
if(b&&b.isClass){this[a]=b=b.create({page:this});if(!this.get("inDesignMode")){b.awake()
}return b}else{return arguments.callee.base.apply(this,arguments)}},awake:function(){var b,a;
for(a in this){if(!this.hasOwnProperty(a)){continue}b=this[a];if(b&&b.isViewClass){this[a]=b=b.create({page:this})
}}return this},getIfConfigured:function(b){var a=this[b];return(a&&a.isViewClass)?null:this.get(b)
},loc:function(c){var a,b;for(b in c){if(!c.hasOwnProperty(b)){continue}a=this[b];
if(!a||!a.isViewClass){continue}a.loc(c[b])}return this}});SC.Page.design=SC.Page.create;
SC.Page.localization=function(a){return a};sc_require("system/builder");SC.MODE_REPLACE="replace";
SC.MODE_APPEND="append";SC.MODE_PREPEND="prepend";SC.RenderContext=SC.Builder.create({SELF_CLOSING:SC.CoreSet.create().addEach("area base basefront br hr input img link meta".w()),init:function(e,d){var b,a;
if(d){this.prevObject=d;this.strings=d.strings;this.offset=d.length+d.offset}if(!this.strings){this.strings=[]
}if(e===undefined){e="div";a=YES}else{if(e==="div"||e==="label"||e==="a"){a=YES}else{if(SC.typeOf(e)===SC.T_STRING){e=e.toLowerCase();
a=YES}}}if(a){this._tagName=e;this._needsTag=YES;this.needsContent=YES;var f=this;
while(f){f.length++;f=f.prevObject}this.strings.push(null);this._selfClosing=this.SELF_CLOSING.contains(e)
}else{this._elem=e;this._needsTag=NO;this.length=0;this.needsContent=NO}return this
},strings:null,offset:0,length:0,updateMode:SC.MODE_REPLACE,needsContent:NO,get:function(b){var a=this.strings||[];
return(b===undefined)?a.slice(this.offset,this.length):a[b+this.offset]},push:function(d){var b=this.strings,a=arguments.length;
if(!b){this.strings=b=[]}if(a>1){b.push.apply(b,arguments)}else{b.push(d)}var e=this;
while(e){e.length+=a;e=e.prevObject}this.needsContent=YES;return this},text:function(c){var b=arguments.length,a=0;
for(a=0;a<b;a++){this.push(SC.RenderContext.escapeHTML(arguments[a]))}return this
},join:function(b){if(this._needsTag){this.end()}var a=this.strings;return a?a.join(b||""):""
},begin:function(a){return SC.RenderContext(a,this)},element:function(){if(this._elem){return this._elem
}var a=SC.RenderContext,b=a.factory,c,d;if(!b){b=a.factory=document.createElement("div")
}b.innerHTML=this.join();if(SC.browser.msie){if(b.innerHTML.length>0){d=b.firstChild.cloneNode(true);
b.innerHTML=""}else{d=null}}else{d=b.firstChild}return d},remove:function(a){if(!a){return
}var b,c=this._elem;if(!c||!c.removeChild){return}b=document.getElementById(a);if(b){b=c.removeChild(b);
b=null}},update:function(){var a=this._elem,e=this.updateMode,g,m,k,f,q,c,l,d,h;this._innerHTMLReplaced=NO;
if(!a){return}g=SC.$(a);if(this.length>0){this._innerHTMLReplaced=YES;if(e===SC.MODE_REPLACE){a.innerHTML=this.join()
}else{c=a.cloneNode(false);c.innerHTML=this.join();h=(e===SC.MODE_APPEND)?null:a.firstChild;
l=c.firstChild;while(l){d=l.nextSibling;a.insertBefore(l,d);l=d}l=d=c=h=null}}if(this._attrsDidChange&&(k=this._attrs)){for(m in k){if(!k.hasOwnProperty(m)){continue
}f=k[m];if(f===null){a.removeAttribute(m)}else{g.attr(m,f)}}}if(this._classNamesDidChange&&(k=this._classNames)){g.attr("class",k.join(" "))
}if(this._idDidChange&&(k=this._id)){g.attr("id",k)}if(this._stylesDidChange&&(q=this._styles)){var b=this._STYLE_PAIR_ARRAY,n=this._JOIN_ARRAY;
for(m in q){if(!q.hasOwnProperty(m)){continue}k=q[m];if(k===null){continue}if(typeof k===SC.T_NUMBER&&m!=="zIndex"){k+="px"
}b[0]=this._dasherizeStyleName(m);b[1]=k;n.push(b.join(": "))}g.attr("style",n.join("; "));
n.length=0}a=this._elem=null;return this.prevObject||this},_DEFAULT_ATTRS:{},_TAG_ARRAY:[],_JOIN_ARRAY:[],_STYLE_PAIR_ARRAY:[],end:function(){var q=this._TAG_ARRAY,b,m,k,g,l=this._attrs,d=this._classNames,a=this._id,n=this._styles;
q[0]="<";q[1]=this._tagName;if(l||d||n||a){if(!l){l=this._DEFAULT_ATTRS}if(a){l.id=a
}if(d){l["class"]=d.join(" ")}if(n){m=this._JOIN_ARRAY;b=this._STYLE_PAIR_ARRAY;for(k in n){if(!n.hasOwnProperty(k)){continue
}g=n[k];if(g===null){continue}if(!isNaN(g)&&k!=="zIndex"){g+="px"}b[0]=this._dasherizeStyleName(k);
b[1]=g;m.push(b.join(": "))}l.style=m.join("; ");m.length=0}q.push(" ");for(k in l){if(!l.hasOwnProperty(k)){continue
}g=l[k];if(g===null){continue}q.push(k,'="',g,'" ')}if(l===this._DEFAULT_ATTRS){delete l.style;
delete l["class"];delete l.id}}var h=this.strings;var f=(this._selfClosing===NO)?NO:(this.length===1);
q.push(f?" />":">");h[this.offset]=q.join("");q.length=0;if(!f){q[0]="</";q[1]=this._tagName;
q[2]=">";h.push(q.join(""));var e=this;while(e){e.length++;e=e.prevObject}q.length=0
}this._elem=null;return this.prevObject||this},tag:function(a,b){return this.begin(a,b).end()
},tagName:function(a){if(a===undefined){if(!this._tagName&&this._elem){this._tagName=this._elem.tagName
}return this._tagName}else{this._tagName=a;this._tagNameDidChange=YES;return this
}},id:function(a){if(a===undefined){if(!this._id&&this._elem){this._id=this._elem.id
}return this._id}else{this._id=a;this._idDidChange=YES;return this}},classNames:function(b,a){if(b===undefined){if(!this._classNames&&this._elem){this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(this._cloneClassNames){this._classNames=(this._classNames||[]).slice();this._cloneClassNames=NO
}if(!this._classNames){this._classNames=[]}return this._classNames}else{this._classNames=b;
this._cloneClassNames=a||NO;this._classNamesDidChange=YES;return this}},hasClass:function(a){return this.classNames().indexOf(a)>=0
},addClass:function(d){if(d===undefined||d===null){console.warn("You are adding an undefined or empty class"+this.toString());
return this}var e=this.classNames();if(SC.typeOf(d)===SC.T_STRING){if(e.indexOf(d)<0){e.push(d);
this._classNamesDidChange=YES}}else{for(var c=0,a=d.length;c<a;c++){var b=d[c];if(e.indexOf(b)<0){e.push(b);
this._classNamesDidChange=YES}}}return this},removeClass:function(b){var c=this._classNames,a;
if(!c&&this._elem){c=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(c&&(a=c.indexOf(b))>=0){if(this._cloneClassNames){c=this._classNames=c.slice();
this._cloneClassNames=NO}c[a]=null;this._classNamesDidChange=YES}return this},resetClassNames:function(){this._classNames=[];
this._classNamesDidChange=YES;return this},setClass:function(d,c){var f,a,b,e;if(c!==undefined){return c?this.addClass(d):this.removeClass(d)
}else{f=this._classNames;if(!f&&this._elem){f=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(!f){f=this._classNames=[]}if(this._cloneClassNames){f=this._classNames=f.slice();
this._cloneClassNames=NO}e=NO;for(b in d){if(!d.hasOwnProperty(b)){continue}a=f.indexOf(b);
if(d[b]){if(a<0){f.push(b);e=YES}}else{if(a>=0){f[a]=null;e=YES}}}if(e){this._classNamesDidChange=YES
}}return this},_STYLE_REGEX:/-?\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g,styles:function(d,e){var a,c,b;
if(d===undefined){if(!this._styles&&this._elem){a=SC.$(this._elem).attr("style");
if(a&&(a=a.toString()).length>0){if(SC.browser.msie){a=a.toLowerCase()}d={};c=this._STYLE_REGEX;
c.lastIndex=0;while(b=c.exec(a)){d[this._camelizeStyleName(b[1])]=b[2]}this._styles=d;
this._cloneStyles=NO}else{this._styles={}}}else{if(!this._styles){this._styles={}
}else{if(this._cloneStyles){this._styles=SC.beget(this._styles);this._cloneStyles=NO
}}}return this._styles}else{this._styles=d;this._cloneStyles=e||NO;this._stylesDidChange=YES;
return this}},addStyle:function(a,e){var b,d=NO,c=this.styles();if(typeof a===SC.T_STRING){if(e===undefined){return c[a]
}else{if(c[a]!==e){c[a]=e;this._stylesDidChange=YES}}}else{for(b in a){if(!a.hasOwnProperty(b)){continue
}e=a[b];if(c[b]!==e){c[b]=e;d=YES}}if(d){this._stylesDidChange=YES}}return this},removeStyle:function(a){if(!this._styles&&!this._elem){return this
}var b=this.styles();if(b[a]){b[a]=null;this._stylesDidChange=YES}},attr:function(a,e){var c,b=this._attrs,d=NO;
if(!b){this._attrs=b={}}if(typeof a===SC.T_STRING){if(e===undefined){return b[a]}else{if(b[a]!==e){b[a]=e;
this._attrsDidChange=YES}}}else{for(c in a){if(!a.hasOwnProperty(c)){continue}e=a[c];
if(b[c]!==e){b[c]=e;d=YES}}if(d){this._attrsDidChange=YES}}return this},_camelizeStyleName:function(a){var b=a.match(/^-(webkit|moz|o)-/),c=a.camelize();
if(b){return c.substr(0,1).toUpperCase()+c.substr(1)}else{return c}},_dasherizeStyleName:function(a){var b=a.dasherize();
if(b.match(/^(webkit|moz|ms|o)-/)){b="-"+b}return b}});SC.RenderContext.fn.html=SC.RenderContext.fn.push;
SC.RenderContext.fn.css=SC.RenderContext.fn.addStyle;if(!SC.browser.isSafari||parseInt(SC.browser.version,10)<526){SC.RenderContext._safari3=YES
}SC.RenderContext.escapeHTML=function(d){var c,b,a;if(SC.none(d)){return d}c=this.escapeHTMLElement;
if(!c){c=this.escapeHTMLElement=document.createElement("div")}b=this.escapeTextNode;
if(!b){b=this.escapeTextNode=document.createTextNode("");c.appendChild(b)}b.data=d;
a=c.innerHTML;if(SC.RenderContext._safari3){a=a.replace(/>/g,"&gt;")}b=c=null;return a
};SC.Response=SC.Object.extend({isError:NO,errorValue:function(){return this}.property().cacheable(),errorObject:null,request:null,originalRequest:function(){var a=this.get("request");
while(a.get("source")){a=a.get("source")}return a}.property("request").cacheable(),type:function(){return this.getPath("request.type")
}.property("request").cacheable(),address:function(){return this.getPath("request.address")
}.property("request").cacheable(),isJSON:function(){return this.getPath("request.isJSON")||NO
}.property("request").cacheable(),isXML:function(){return this.getPath("request.isXML")||NO
}.property("request").cacheable(),listeners:function(){return this.getPath("request.listeners")
}.property("request").cacheable(),status:-100,headers:null,body:function(){var a=this.get("encodedBody");
if(a&&this.get("isJSON")){try{a=SC.json.decode(a)}catch(b){return SC.Error.create({message:b.name+": "+b.message,label:"Response",errorValue:this})
}}return a}.property("encodedBody").cacheable(),response:function(){return this.get("body")
}.property("body").cacheable(),isCancelled:NO,timedOut:null,timeoutTimer:null,fire:function(){var a=this.get("request"),c=a?a.get("source"):null;
if(c&&c.willSend){c.willSend(a,this)}a.freeze();if(!this.get("isCancelled")){this.invokeTransport()
}var b=a.get("timeout");if(b){var d=SC.Timer.schedule({target:this,action:"timeoutReached",interval:b,repeats:NO});
this.set("timeoutTimer",d)}if(!this.get("isCancelled")&&c&&c.didSend){c.didSend(a,this)
}},invokeTransport:function(){this.receive(function(a){this.set("status",200)},this)
},receive:function(e,a){if(!this.get("timedOut")){var d=this.get("timeoutTimer");
if(d){d.invalidate()}this.set("timedOut",NO);var b=this.get("request");var c=b?b.get("source"):null;
SC.run(function(){if(c&&c.willReceive){c.willReceive(b,this)}e.call(a,!this.get("isCancelled"));
if(!this.get("isCancelled")&&c&&c.didReceive){c.didReceive(b,this)}if(!this.get("isCancelled")){this.notify()
}},this)}SC.Request.manager.transportDidClose(this);return this},cancel:function(){if(!this.get("isCancelled")){this.set("isCancelled",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this)}},timeoutReached:function(){if(this.get("timedOut")===null){this.set("timedOut",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this);var a=SC.$error("HTTP Request timed out","Request",408);
a.set("errorValue",this);this.set("isError",YES);this.set("errorObject",a);var b=this.get("request");
var c=b?b.get("source"):null;if(!this.get("isCancelled")&&c&&c.didTimeout){c.didTimeout(b,this)
}}},cancelTransport:function(){},_notifyListener:function(b,a){var e=b[a],f,d,c;if(!e){return NO
}f=(e.params||[]).copy();f.unshift(this);d=e.target;c=e.action;if(SC.typeOf(c)===SC.T_STRING){c=d[c]
}return c.apply(d,f)},notify:function(){var b=this.get("listeners"),a=this.get("status"),c=Math.floor(a/100)*100,d=NO;
if(!b){return this}d=this._notifyListener(b,a);if(!d){d=this._notifyListener(b,c)
}if(!d){d=this._notifyListener(b,0)}return this},toString:function(){var a=arguments.callee.base.apply(this,arguments);
return"%@<%@ %@, status=%@".fmt(a,this.get("type"),this.get("address"),this.get("status"))
}});SC.XHRResponse=SC.Response.extend({headers:function(){var c=this.get("rawRequest"),b=c?c.getAllResponseHeaders():null,a={};
if(!b){return a}b.split("\n").forEach(function(g){var d=g.indexOf(":"),e,f;if(d>=0){e=g.slice(0,d);
f=g.slice(d+1).trim();a[e]=f}},this);return a}.property("status").cacheable(),header:function(a){var b=this.get("rawRequest");
return b?b.getResponseHeader(a):null},encodedBody:function(){var b=this.get("rawRequest"),a;
if(!b){a=null}else{if(this.get("isXML")){a=b.responseXML}else{a=b.responseText}}return a
}.property("status").cacheable(),cancelTransport:function(){var a=this.get("rawRequest");
if(a){a.abort()}this.set("rawRequest",null)},invokeTransport:function(){var d,g,b,c,f;
function e(){for(var h=0;h<arguments.length;h++){try{var k=arguments[h]();return k
}catch(l){}}return NO}d=e(function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")});this.set("rawRequest",d);
c=!!this.getPath("request.isAsynchronous");if(c){if(!SC.browser.msie&&!SC.browser.opera){SC.Event.add(d,"readystatechange",this,this.finishRequest,d)
}else{g=this;b=function(){if(!g){return null}var h=g.finishRequest();if(h){g=null
}return h};d.onreadystatechange=b}}d.open(this.get("type"),this.get("address"),c);
f=this.getPath("request.headers");for(var a in f){d.setRequestHeader(a,f[a])}d.send(this.getPath("request.encodedBody"));
if(!c){this.finishRequest()}return d},finishRequest:function(c){var e=this.get("rawRequest"),a=e.readyState,d,b,f;
if(a===4){this.receive(function(g){if(!g){return}b=-1;try{b=e.status||0}catch(k){}if((b<200)||(b>=300)){try{f=e.statusText||""
}catch(h){f=""}d=SC.$error(f||"HTTP Request failed","Request",b);d.set("errorValue",this);
this.set("isError",YES);this.set("errorObject",d)}this.set("status",b)},this);if(!SC.browser.msie){SC.Event.remove(e,"readystatechange",this,this.finishRequest)
}else{e.onreadystatechange=null}return YES}return NO}});sc_require("system/response");
SC.Request=SC.Object.extend(SC.Copyable,SC.Freezable,{isAsynchronous:YES,isJSON:NO,isXML:NO,init:function(){arguments.callee.base.apply(this,arguments);
this.header("X-Requested-With","XMLHttpRequest");this.header("X-SproutCore-Version","1.4")
},headers:function(){var a=this._headers;if(!a){a=this._headers={}}return a}.property().cacheable(),responseClass:SC.XHRResponse,source:null,address:null,type:"GET",timeout:null,body:null,encodedBody:function(){var a=this.get("body");
if(a&&this.get("isJSON")){a=SC.json.encode(a)}return a}.property("isJSON","isXML","body").cacheable(),willSend:function(b,a){},didSend:function(b,a){},willReceive:function(b,a){},didReceive:function(b,a){},didTimeout:function(b,a){},COPY_KEYS:"isAsynchronous isJSON isXML address type timeout body responseClass willSend didSend willReceive didReceive".w(),copy:function(){var a={},d=this.COPY_KEYS,f=d.length,b,c,e;
while(--f>=0){b=d[f];if(this.hasOwnProperty(b)){a[b]=this.get(b)}}if(this.hasOwnProperty("listeners")){a.listeners=SC.copy(this.get("listeners"))
}if(this.hasOwnProperty("_headers")){a._headers=SC.copy(this._headers)}a.source=this.get("source")||this;
return this.constructor.create(a)},header:function(a,b){var c;if(SC.typeOf(a)===SC.T_STRING){c=this._headers;
if(arguments.length===1){return c?c[a]:null}else{this.propertyWillChange("headers");
if(!c){c=this._headers={}}c[a]=b;this.propertyDidChange("headers");return this}}else{if(b===undefined){c=a;
this.beginPropertyChanges();for(a in c){if(!c.hasOwnProperty(a)){continue}this.header(a,c[a])
}this.endPropertyChanges();return this}}return this},async:function(a){if(a===undefined){a=YES
}return this.set("isAsynchronous",a)},json:function(a){if(a===undefined){a=YES}if(a){this.set("isXML",NO)
}return this.set("isJSON",a)},xml:function(a){if(a===undefined){a=YES}if(a){this.set("isJSON",NO)
}return this.set("isXML",a)},_prep:function(){var a=!!this.header("Content-Type");
if(this.get("isJSON")&&!a){this.header("Content-Type","application/json")}else{if(this.get("isXML")&&!a){this.header("Content-Type","text/xml")
}}return this},send:function(a){var b=this.get("timeout");if(b){if(!this.get("isAsynchronous")){throw"Timeout values cannot be used with synchronous requests"
}}else{if(b===0){throw"The timeout value must either not be specified or must be greater than 0"
}}if(a){this.set("body",a)}return SC.Request.manager.sendRequest(this.copy()._prep())
},resend:function(){var a=this.get("source")?this:this.copy()._prep();return SC.Request.manager.sendRequest(a)
},notify:function(a,e,d,f){var c=YES;if(SC.typeOf(a)!==SC.T_NUMBER){f=SC.A(arguments).slice(2);
d=e;e=a;a=0;c=NO}else{f=SC.A(arguments).slice(3)}var b=this.get("listeners");if(!b){this.set("listeners",b={})
}b[a]={target:e,action:d,params:f};return this}});SC.Request.mixin({getUrl:function(a){return this.create().set("address",a).set("type","GET")
},postUrl:function(b,a){var c=this.create().set("address",b).set("type","POST");if(a){c.set("body",a)
}return c},deleteUrl:function(a){return this.create().set("address",a).set("type","DELETE")
},putUrl:function(b,a){var c=this.create().set("address",b).set("type","PUT");if(a){c.set("body",a)
}return c}});SC.Request.manager=SC.Object.create(SC.DelegateSupport,{maxRequests:6,inflight:[],pending:[],sendRequest:function(b){if(!b){return null
}var a=b.get("responseClass").create({request:b});this.get("pending").pushObject(a);
this.fireRequestIfNeeded();return a},cancel:function(b){var d=this.get("pending"),c=this.get("inflight"),a;
if(d.indexOf(b)>=0){this.propertyWillChange("pending");d.removeObject(b);this.propertyDidChange("pending");
return YES}else{if(c.indexOf(b)>=0){b.cancel();c.removeObject(b);this.fireRequestIfNeeded();
return YES}else{return NO}}},cancelAll:function(){if(this.get("pending").length||this.get("inflight").length){this.set("pending",[]);
this.get("inflight").forEach(function(a){a.cancel()});this.set("inflight",[]);return YES
}else{return NO}},fireRequestIfNeeded:function(){var d=this.get("pending"),c=this.get("inflight"),a=this.get("maxRequests"),b;
if((d.length>0)&&(c.length<a)){b=d.shiftObject();c.pushObject(b);b.fire()}},transportDidClose:function(a){this.get("inflight").removeObject(a);
this.fireRequestIfNeeded()}});require("system/platform");SC.routes=SC.Object.create({_didSetup:NO,_location:null,_firstRoute:null,_extractParametersAndRoute:function(c){var a={},h=c.route||"",e,b,d,g,f,k;
e=(h.indexOf("?")<0&&h.indexOf("&")>=0)?"&":"?";b=h.split(e);h=b[0];if(b.length===1){b=[]
}else{if(b.length===2){b=b[1].split("&")}else{if(b.length>2){b.shift()}}}g=b.length;
for(d=0;d<g;++d){f=b[d].split("=");a[f[0]]=f[1]}for(k in c){if(c.hasOwnProperty(k)&&k!=="route"){a[k]=""+c[k]
}}b=[];for(k in a){b.push([k,a[k]].join("="))}a.params=e+b.join("&");a.route=h;return a
},location:function(b,c){var a;if(c!==undefined){if(c===null){c=""}if(typeof(c)==="object"){a=this._extractParametersAndRoute(c);
c=a.route+a.params}if(!SC.empty(c)||(this._location&&this._location!==c)){window.location.hash=encodeURI(c)
}this._location=c;return this}return this._location}.property(),ping:function(){var a;
if(!this._didSetup){this._didSetup=YES;if(SC.platform.supportsHashChange){this.hashChange();
SC.Event.add(window,"hashchange",this,this.hashChange)}else{a=this;this._invokeHashChange=function(){a.hashChange();
setTimeout(a._invokeHashChange,100)};this._invokeHashChange()}}},hashChange:function(a){var b=window.location.hash;
b=(b&&b.length>0)?b.slice(1,b.length):"";if(!SC.browser.isMozilla){b=decodeURI(b)
}if(this.get("location")!==b){SC.run(function(){this.set("location",b)},this)}},add:function(a,b,c){if(!this._didSetup){this.invokeLast(this.ping)
}if(c===undefined&&SC.typeOf(b)===SC.T_FUNCTION){c=b;b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]
}}if(!this._firstRoute){this._firstRoute=this._Route.create()}this._firstRoute.add(a.split("/"),b,c);
return this},locationDidChange:function(){this.trigger()}.observes("location"),trigger:function(){var a=this._firstRoute,b=this.get("location"),d,c;
if(a){d=this._extractParametersAndRoute({route:b});b=d.route;delete d.route;delete d.params;
c=a.routeForParts(b.split("/"),d);if(c&&c.target&&c.method){c.method.call(c.target,d)
}}},_Route:SC.Object.extend({target:null,method:null,staticRoutes:null,dynamicRoutes:null,wildcardRoutes:null,add:function(c,b,e){var a,d;
c=SC.clone(c);if(!c||c.length===0){this.target=b;this.method=e}else{a=c.shift();switch(a.slice(0,1)){case":":a=a.slice(1,a.length);
if(!this.dynamicRoutes){this.dynamicRoutes={}}if(!this.dynamicRoutes[a]){this.dynamicRoutes[a]=this.constructor.create()
}d=this.dynamicRoutes[a];break;case"*":a=a.slice(1,a.length);if(!this.wildcardRoutes){this.wildcardRoutes={}
}d=this.wildcardRoutes[a]=this.constructor.create();break;default:if(!this.staticRoutes){this.staticRoutes={}
}if(!this.staticRoutes[a]){this.staticRoutes[a]=this.constructor.create()}d=this.staticRoutes[a]
}if(d){d.add(c,b,e)}}},routeForParts:function(d,e){var b,c,a;d=SC.clone(d);if(!d||d.length===0){return this.method?this:null
}else{b=d.shift();if(this.staticRoutes&&this.staticRoutes[b]){return this.staticRoutes[b].routeForParts(d,e)
}else{for(c in this.dynamicRoutes){a=this.dynamicRoutes[c].routeForParts(d,e);if(a){e[c]=b;
return a}}for(c in this.wildcardRoutes){d.unshift(b);e[c]=d.join("/");return this.wildcardRoutes[c].routeForParts(null,e)
}return null}}}})});SC.Task=SC.Object.extend({run:function(a){}});sc_require("tasks/task");
SC.TaskQueue=SC.Task.extend({runWhenIdle:NO,runLimit:50,interval:50,isRunning:NO,minimumIdleDuration:500,_tasks:[],hasTasks:function(){return this._tasks.length>0
}.property("taskCount").cacheable(),taskCount:function(){return this._tasks.length
}.property().cacheable(),push:function(a){this._tasks.push(a);this.notifyPropertyChange("taskCount")
},next:function(){if(this._tasks.length<1){return null}var a=this._tasks.shift();
this.notifyPropertyChange("taskCount");return a},_taskCountDidChange:function(){this._setupIdle()
}.observes("taskCount"),_setupIdle:function(){if(this.get("runWhenIdle")&&!this._idleIsScheduled&&this.get("taskCount")>0){var a=this;
setTimeout(function(){a._idleEntry()},this.get("interval"));this._idleIsScheduled=YES
}},_idleEntry:function(){this._idleIsScheduled=NO;var a=SC.RunLoop.lastRunLoopEnd;
if(Date.now()-a>this.get("minimumIdleDuration")){this.run()}else{SC.run(function(){this._setupIdle()
},this);SC.RunLoop.lastRunLoopEnd=a}},run:function(a){this.set("isRunning",YES);if(!a){a=this.get("runLimit")
}var b,c=Date.now();while(b=this.next()){b.run(this);if(Date.now()-c>a){break}}this._setupIdle();
this.set("isRunning",NO)}});SC.backgroundTaskQueue=SC.TaskQueue.create({runWhenIdle:YES});
SC.time=function(a){var b=SC.beget(fn);b.value=timeOffset;return b};(function(){var a=new Date();
SC.mixin(SC.time,{month:function(c,b){a.setTime(c);if(b===undefined){return a.getMonth()
}a.setMonth(b);return a.getTime()},utc:function(b){a.setTime(b);return b+(a.getTimezoneOffset()*60*1000)
},local:function(b){a.setTime(b);return b-(a.getTimezoneOffset()*60*1000)},parse:function(b){},format:function(b){}})
})();SC.time.fmt=SC.time.format;SC.time.fn={done:function(){return this.value}};"month day year".split(" ").forEach(function(a){SC.time.fn[a]=function(b){if(b===undefined){return SC.time[a](this.value)
}else{this.value=SC.time[a](this.value,b);return this}}});var MONTH_NAMES=new Array("January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var DAY_NAMES=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat");
function LZ(a){return(a<0||a>9?"":"0")+a}SC.Locale.define("en",{longMonthNames:"January February March April May".split(" "),shortMonthNames:[],shortDateFormat:"dd/mm/yy",longDateFormat:""});
SC.mixin(Date,{isDate:function(c,b){var a=Date.getDateFromFormat(c,b);if(a==0){return false
}return true},compareDates:function(e,f,c,d){var b=Date.getDateFromFormat(e,f);var a=Date.getDateFromFormat(c,d);
if(b==0||a==0){return -1}else{if(b>a){return 1}}return 0},getDateFromFormat:function(D,u){D=D+"";
u=u+"";var C=0;var m=0;var w="";var f="";var B="";var h,g;var b=new Date();var k=b.getFullYear();
var A=b.getMonth()+1;var z=1;var d=b.getHours();var v=b.getMinutes();var q=b.getSeconds();
var l="";var r=SC.Locale.currentLocale;while(m<u.length){w=u.charAt(m);f="";while((u.charAt(m)==w)&&(m<u.length)){f+=u.charAt(m++)
}if(f=="yyyy"||f=="yy"||f=="y"){if(f=="yyyy"){h=4;g=4}if(f=="yy"){h=2;g=2}if(f=="y"){h=2;
g=4}k=Date._getInt(D,C,h,g);if(k==null){return 0}C+=k.length;if(k.length==2){if(k>70){k=1900+(k-0)
}else{k=2000+(k-0)}}}else{if(f=="MMM"||f=="NNN"){A=0;for(var s=0;s<MONTH_NAMES.length;
s++){var e=MONTH_NAMES[s];if(D.substring(C,C+e.length).toLowerCase()==e.toLowerCase()){if(f=="MMM"||(f=="NNN"&&s>11)){A=s+1;
if(A>12){A-=12}C+=e.length;break}}}if((A<1)||(A>12)){return 0}}else{if(f=="EE"||f=="E"){for(var s=0;
s<DAY_NAMES.length;s++){var n=DAY_NAMES[s];if(D.substring(C,C+n.length).toLowerCase()==n.toLowerCase()){C+=n.length;
break}}}else{if(f=="MM"||f=="M"){A=Date._getInt(D,C,f.length,2);if(A==null||(A<1)||(A>12)){return 0
}C+=A.length}else{if(f=="dd"||f=="d"){z=Date._getInt(D,C,f.length,2);if(z==null||(z<1)||(z>31)){return 0
}C+=z.length}else{if(f=="hh"||f=="h"){d=Date._getInt(D,C,f.length,2);if(d==null||(d<1)||(d>12)){return 0
}C+=d.length}else{if(f=="HH"||f=="H"){d=Date._getInt(D,C,f.length,2);if(d==null||(d<0)||(d>23)){return 0
}C+=d.length}else{if(f=="KK"||f=="K"){d=Date._getInt(D,C,f.length,2);if(d==null||(d<0)||(d>11)){return 0
}C+=d.length}else{if(f=="kk"||f=="k"){d=Date._getInt(D,C,f.length,2);if(d==null||(d<1)||(d>24)){return 0
}C+=d.length;d--}else{if(f=="mm"||f=="m"){v=Date._getInt(D,C,f.length,2);if(v==null||(v<0)||(v>59)){return 0
}C+=v.length}else{if(f=="ss"||f=="s"){q=Date._getInt(D,C,f.length,2);if(q==null||(q<0)||(q>59)){return 0
}C+=q.length}else{if(f=="a"){if(D.substring(C,C+2).toLowerCase()=="am"){l="AM"}else{if(D.substring(C,C+2).toLowerCase()=="pm"){l="PM"
}else{return 0}}C+=2}else{if(D.substring(C,C+f.length)!=f){return 0}else{C+=f.length
}}}}}}}}}}}}}}if(C!=D.length){return 0}if(A==2){if(((k%4==0)&&(k%100!=0))||(k%400==0)){if(z>29){return 0
}}else{if(z>28){return 0}}}if((A==4)||(A==6)||(A==9)||(A==11)){if(z>30){return 0}}if(d<12&&l=="PM"){d=d-0+12
}else{if(d>11&&l=="AM"){d-=12}}var a=new Date(k,A-1,z,d,v,q);return a.getTime()},parseDate:function(k){var g=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("E NNN dd HH:mm:ss UTC yyyy","y-M-d","y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d","d MMM y","d.MMM.y","y MMM d","y.MMM.d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var b=new Array("generalFormats",g?"dateFirst":"monthFirst",g?"monthFirst":"dateFirst");
var h=null;h=0;var e=new Date().getTime();switch(k.toLowerCase()){case"yesterday".loc():h=e-(24*60*60*1000);
break;case"today".loc():case"now".loc():h=e;break;case"tomorrow".loc():h=e+(24*60*60*1000);
break}if(h>0){return new Date(h)}for(var f=0;f<b.length;f++){var a=window[b[f]];for(var c=0;
c<a.length;c++){h=Date.getDateFromFormat(k,a[c]);if(h==0){h=Date.getDateFromFormat(k,a[c]+" H:m:s")
}if(h==0){h=Date.getDateFromFormat(k,a[c]+" h:m:s a")}if(h!=0){return new Date(h)
}}}return null},_isInteger:function(c){var b="1234567890";for(var a=0;a<c.length;
a++){if(b.indexOf(c.charAt(a))==-1){return false}}return true},_getInt:function(f,d,e,c){for(var a=c;
a>=e;a--){var b=f.substring(d,d+a);if(b.length<e){return null}if(Date._isInteger(b)){return b
}}return null}});SC.mixin(Date.prototype,{format:function(L){L=L+"";var P=this;var q="";
var B=0;var O="";var f="";var n=P.getFullYear()+"";var g=P.getMonth()+1;var N=P.getDate();
var u=P.getDay();var r=P.getHours();var D=P.getMinutes();var w=P.getSeconds();var z,A,b,x,Q,e,J,I,F,v,S,r,R,l,a,G;
var C=new Object();if(n.length<4){n=""+(n-0+1900)}C.y=""+n;C.yyyy=n;C.yy=n.substring(2,4);
C.M=g;C.MM=LZ(g);C.MMM=MONTH_NAMES[g-1];C.NNN=MONTH_NAMES[g+11];C.d=N;C.dd=LZ(N);
C.E=DAY_NAMES[u+7];C.EE=DAY_NAMES[u];C.H=r;C.HH=LZ(r);if(r==0){C.h=12}else{if(r>12){C.h=r-12
}else{C.h=r}}C.hh=LZ(C.h);if(r>11){C.K=r-12}else{C.K=r}C.k=r+1;C.KK=LZ(C.K);C.kk=LZ(C.k);
if(r>11){C.a="PM"}else{C.a="AM"}C.m=D;C.mm=LZ(D);C.s=w;C.ss=LZ(w);while(B<L.length){O=L.charAt(B);
f="";while((L.charAt(B)==O)&&(B<L.length)){f+=L.charAt(B++)}if(C[f]!=null){q=q+C[f]
}else{q=q+f}}return q},utcFormat:function(){return(new Date(this.getTime()+(this.getTimezoneOffset()*60*1000))).format("E NNN dd HH:mm:ss UTC yyyy")
}});SC.Timer=SC.Object.extend({target:null,action:null,isPooled:NO,interval:0,startTime:null,repeats:NO,until:null,isPaused:NO,isScheduled:NO,isValid:YES,lastFireTime:0,fireTime:function(){if(!this.get("isValid")){return -1
}var e=this.get("startTime");if(!e||e===0){return -1}var a=this.get("interval"),c=this.get("lastFireTime");
if(c<e){c=e}var b;if(this.get("repeats")){if(a===0){b=c}else{b=e+(Math.floor((c-e)/a)+1)*a
}}else{b=e+a}var d=this.get("until");if(d&&d>0&&b>d){b=d}return b}.property("interval","startTime","repeats","until","isValid","lastFireTime").cacheable(),schedule:function(){if(!this.get("isValid")){return this
}this.beginPropertyChanges();if(!this.startTime){this.set("startTime",SC.RunLoop.currentRunLoop.get("startTime"))
}var a=this.get("fireTime"),b=this.get("lastFireTime");if(a>=b){this.set("isScheduled",YES);
SC.RunLoop.currentRunLoop.scheduleTimer(this,a)}this.endPropertyChanges();return this
},invalidate:function(){this.beginPropertyChanges();this.set("isValid",NO);SC.RunLoop.currentRunLoop.cancelTimer(this);
this.action=this.target=null;this.endPropertyChanges();if(this.get("isPooled")){SC.Timer.returnTimerToPool(this)
}return this},fire:function(){var b=Date.now();this.set("lastFireTime",b);var a=this.get("fireTime");
if(!this.get("isPaused")){this.performAction()}if(a>b){this.schedule()}else{this.invalidate()
}},performAction:function(){var a=SC.typeOf(this.action);if(a==SC.T_FUNCTION){this.action.call((this.target||this),this)
}else{if(a===SC.T_STRING){if(this.action.indexOf(".")>=0){var e=this.action.split(".");
var c=e.pop();var d=SC.objectForPropertyPath(e,window);var b=d.get?d.get(c):d[c];
if(b&&SC.typeOf(b)==SC.T_FUNCTION){b.call(d,this)}else{throw"%@: Timer could not find a function at %@".fmt(this,this.action)
}}else{SC.RootResponder.responder.sendAction(this.action,this.target,this)}}}},init:function(){arguments.callee.base.apply(this,arguments);
if(this.startTime instanceof Date){this.startTime=this.startTime.getTime()}if(this.until instanceof Date){this.until=this.until.getTime()
}},RESET_DEFAULTS:{target:null,action:null,isPooled:NO,isPaused:NO,isScheduled:NO,isValid:YES,interval:0,repeats:NO,until:null,startTime:null,lastFireTime:0},reset:function(b){if(!b){b=SC.EMPTY_HASH
}this.propertyWillChange("fireTime");var c=this.RESET_DEFAULTS;for(var a in c){if(!c.hasOwnProperty(a)){continue
}this[a]=SC.none(b[a])?c[a]:b[a]}this.propertyDidChange("fireTime");return this},removeFromTimerQueue:function(c){var b=this._timerQueuePrevious,a=this._timerQueueNext;
if(!b&&!a&&c!==this){return c}if(b){b._timerQueueNext=a}if(a){a._timerQueuePrevious=b
}this._timerQueuePrevious=this._timerQueueNext=null;return(c===this)?a:c},scheduleInTimerQueue:function(c,b){this._timerQueueRunTime=b;
var a=c;var d=null;while(a&&a._timerQueueRunTime<b){d=a;a=a._timerQueueNext}if(d){d._timerQueueNext=this;
this._timerQueuePrevious=d}if(a){a._timerQueuePrevious=this;this._timerQueueNext=a
}return(a===c)?this:c},collectExpiredTimers:function(c,a){if(this._timerQueueRunTime>a){return this
}c.push(this);var b=this._timerQueueNext;this._timerQueueNext=null;if(b){b._timerQueuePrevious=null
}return b?b.collectExpiredTimers(c,a):null}});SC.Timer.schedule=function(a){var b;
if(!a||SC.none(a.isPooled)||a.isPooled){b=this.timerFromPool(a)}else{b=this.create(a)
}return b.schedule()};SC.Timer.timerFromPool=function(a){var b=this._timerPool;if(!b){b=this._timerPool=[]
}var c=b.pop();if(!c){c=this.create()}return c.reset(a)};SC.Timer.returnTimerToPool=function(a){if(!this._timerPool){this._timerPool=[]
}this._timerPool.push(a);return this};SC.UserDefaults=SC.Object.extend({ready:NO,userDomain:null,appDomain:null,_defaults:null,_safari3DB:null,defaults:function(a){this._defaults=a;
this.allPropertiesDidChange()},readDefault:function(h){var c=undefined,a,k,g,l,f;
h=this._normalizeKeyName(h);a=this._userKeyName(h);if(this._written){c=this._written[a]
}if(SC.browser.msie=="7.0"){k=document.body;try{k.load("SC.UserDefaults")}catch(b){console.err("Couldn't load userDefaults in IE7: "+b.description)
}}else{if(this.HTML5DB_noLocalStorage){f=this._safari3DB}else{k=window.localStorage;
if(!k&&window.globalStorage){k=window.globalStorage[window.location.hostname]}}}if(k||f){g=["SC.UserDefaults",a].join("-at-");
if(SC.browser.msie=="7.0"){c=k.getAttribute(g.replace(/\W/gi,""))}else{if(f){c=this.dataHash[g]
}else{c=k[g]}}if(!SC.none(c)){try{c=SC.json.decode(c)}catch(d){c=undefined}}else{c=undefined
}}l=this.delegate;if(l&&l.userDefaultsNeedsDefault){c=l.userDefaultsNeedsDefault(this,h,a)
}if((c===undefined)&&this._defaults){c=this._defaults[a]||this._defaults[h]}return c
},writeDefault:function(l,h){var d,b,m,k,n,g;l=this._normalizeKeyName(l);d=this._userKeyName(l);
b=this._written;if(!b){b=this._written={}}b[d]=h;if(SC.browser.msie=="7.0"){m=document.body
}else{if(this.HTML5DB_noLocalStorage){g=this._safari3DB}else{m=window.localStorage;
if(!m&&window.globalStorage){m=window.globalStorage[window.location.hostname]}}}k=["SC.UserDefaults",d].join("-at-");
if(m||g){var a=SC.json.encode(h);if(SC.browser.msie=="7.0"){m.setAttribute(k.replace(/\W/gi,""),a);
m.save("SC.UserDefaults")}else{if(g){var c=this;g.transaction(function(e){e.executeSql("delete from SCLocalStorage where key = ?",[k],function(){e.executeSql("insert into SCLocalStorage(key, value) VALUES ('"+k+"', '"+a+"');",[],c._nullDataHandler,c.killTransaction)
})});this.dataHash[k]=a}else{try{m[k]=a}catch(f){console.error("Failed using localStorage. "+f)
}}}}n=this.delegate;if(n&&n.userDefaultsDidChange){n.userDefaultsDidChange(this,l,h,d)
}return this},resetDefault:function(g){var f,a,b,d,e,c;f=this._normalizeKeyName(g);
a=this._userKeyName(f);this.propertyWillChange(g);this.propertyWillChange(f);b=this._written;
if(b){delete b[a]}if(SC.browser.msie=="7.0"){d=document.body}else{if(this.HTML5DB_noLocalStorage){c=this._safari3DB
}else{d=window.localStorage;if(!d&&window.globalStorage){d=window.globalStorage[window.location.hostname]
}}}e=["SC.UserDefaults",a].join("-at-");if(d){if(SC.browser.msie=="7.0"){d.setAttribute(e.replace(/\W/gi,""),null);
d.save("SC.UserDefaults")}else{if(c){var h=this;c.transaction(function(k){k.executeSql("delete from SCLocalStorage where key = ?",[e],null)
});delete this.dataHash[e]}else{delete d[e]}}}this.propertyDidChange(g);this.propertyDidChange(f);
return this},unknownProperty:function(a,b){if(b===undefined){return this.readDefault(a)
}else{this.writeDefault(a,b);return b}},_normalizeKeyName:function(a){if(a.indexOf(":")<0){var b=this.get("appDomain")||"app";
a=[b,a].join(":")}return a},_userKeyName:function(b){var a=this.get("userDomain")||"(anonymous)";
return[a,b].join("-at-")},_domainDidChange:function(){var a=NO;if(this.get("userDomain")!==this._scud_userDomain){this._scud_userDomain=this.get("userDomain");
a=YES}if(this.get("appDomain")!==this._scud_appDomain){this._scud_appDomain=this.get("appDomain");
a=YES}if(a){this.allPropertiesDidChange()}}.observes("userDomain","appDomain"),init:function(){arguments.callee.base.apply(this,arguments);
if(SC.userDefaults&&SC.userDefaults.get("dataHash")){var f=SC.userDefaults.get("dataHash");
if(f){this.dataHash=SC.userDefaults.get("dataHash")}}this._scud_userDomain=this.get("userDomain");
this._scud_appDomain=this.get("appDomain");if(SC.browser.msie=="7.0"){document.body.addBehavior("#default#userData")
}this.HTML5DB_noLocalStorage=((parseInt(SC.browser.safari,0)>523)&&(parseInt(SC.browser.safari,0)<528));
if(this.HTML5DB_noLocalStorage){var d;try{if(!window.openDatabase){console.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}else{var a="scdb",c="1.0",b="SproutCore database",k=65536;d=openDatabase(a,c,b,k)
}}catch(h){console.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}if(d){var g=this;d.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS SCLocalStorage(key TEXT NOT NULL PRIMARY KEY, value TEXT NOT NULL);",[],g._nullDataHandler,g.killTransaction)
});d.transaction(function(e){e.parent=g;e.executeSql("SELECT * from SCLocalStorage;",[],function(s,n){var q={},r;
for(var m=0,l=n.rows.length;m<l;m++){r=n.rows.item(m);q[r.key]=r.value}s.parent.dataHash=q;
SC.run(function(){SC.userDefaults.set("ready",YES)})},g.killTransaction)});this._safari3DB=d
}}else{this.set("ready",YES)}},_killTransaction:function(b,a){return true},_nullDataHandler:function(b,a){},readyCallback:function(a,b){this.func=b;
this.ob=a},readyChanged:function(){if(this.ready===YES){var a=this.func;if(a){a.apply(this.ob)
}}}.observes("ready")});SC.userDefaults=SC.UserDefaults.create();sc_require("system/browser");
SC.mixin({_downloadFrames:0,_copy_computed_props:["maxWidth","maxHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","fontFamily","fontSize","fontStyle","fontWeight","fontVariant","lineHeight","whiteSpace"],download:function(d){var a=document.createElement("iframe"),c="DownloadFrame_"+this._downloadFrames;
SC.$(a).attr("id",c);a.style.border="10px";a.style.width="0px";a.style.height="0px";
a.style.position="absolute";a.style.top="-10000px";a.style.left="-10000px";if(!SC.browser.isSafari){SC.$(a).attr("src",d)
}document.getElementsByTagName("body")[0].appendChild(a);if(SC.browser.isSafari){SC.$(a).attr("src",d)
}this._downloadFrames=this._downloadFrames+1;if(!SC.browser.isSafari){var b=function(){document.body.removeChild(document.getElementById(c));
c=null};b.invokeLater(null,2000)}a=null},normalizeURL:function(a){if(a.slice(0,1)=="/"){a=window.location.protocol+"//"+window.location.host+a
}else{if((a.slice(0,5)=="http:")||(a.slice(0,6)=="https:")){}else{a=window.location.href+"/"+a
}}return a},isPercentage:function(a){return(a<1&&a>0)},minX:function(a){return a.x||0
},maxX:function(a){return(a.x||0)+(a.width||0)},midX:function(a){return(a.x||0)+((a.width||0)/2)
},minY:function(a){return a.y||0},maxY:function(a){return(a.y||0)+(a.height||0)},midY:function(a){return(a.y||0)+((a.height||0)/2)
},centerX:function(b,a){return(a.width-b.width)/2},centerY:function(b,a){return(a.height-b.height)/2
},pointInRect:function(a,b){return(a.x>=SC.minX(b))&&(a.y>=SC.minY(b))&&(a.x<=SC.maxX(b))&&(a.y<=SC.maxY(b))
},rectsEqual:function(b,a,c){if(!b||!a){return(b==a)}if(!c&&c!==0){c=0.1}if((b.y!=a.y)&&(Math.abs(b.y-a.y)>c)){return NO
}if((b.x!=a.x)&&(Math.abs(b.x-a.x)>c)){return NO}if((b.width!=a.width)&&(Math.abs(b.width-a.width)>c)){return NO
}if((b.height!=a.height)&&(Math.abs(b.height-a.height)>c)){return NO}return YES},intersectRects:function(b,a){var c={x:Math.max(SC.minX(b),SC.minX(a)),y:Math.max(SC.minY(b),SC.minY(a)),width:Math.min(SC.maxX(b),SC.maxX(a)),height:Math.min(SC.maxY(b),SC.maxY(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},unionRects:function(b,a){var c={x:Math.min(SC.minX(b),SC.minX(a)),y:Math.min(SC.minY(b),SC.minY(a)),width:Math.max(SC.maxX(b),SC.maxX(a)),height:Math.max(SC.maxY(b),SC.maxY(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},cloneRect:function(a){return{x:a.x,y:a.y,width:a.width,height:a.height}
},stringFromRect:function(a){if(!a){return"(null)"}else{return"{x:"+a.x+", y:"+a.y+", width:"+a.width+", height:"+a.height+"}"
}},stringFromLayout:function(e){var d=["maxHeight","maxWidth","minHeight","minWidth","centerY","centerX","width","height","bottom","right","top","left"],a=[],c,b=d.length;
while(--b>=0){c=d[b];if(e.hasOwnProperty(c)){a.push(c+":"+e[c])}}return"{"+a.join(", ")+"}"
},heightForString:function(h,c,b,a,g){var e=this._heightCalcElement,f,k;if(!g){h=SC.RenderContext.escapeHTML(h)
}f=(a&&SC.typeOf(a)===SC.T_ARRAY)?a.join(" "):"";if(!c){c=100}if(!e){e=this._heightCalcElement=document.createElement("div");
document.body.insertBefore(e,null)}b=b+"; width: "+c+"px; left: "+(-1*c)+"px; position: absolute";
var d=SC.$(e);d.attr("style",b);if(f!==""){d.attr("class",f)}e.innerHTML=h;k=e.clientHeight;
e=null;return k},prepareStringMeasurement:function(q,a){var l=this._metricsCalculationElement,h,r,c,d;
h=SC.A(a).join(" ");if(!l){l=this._metricsCalculationElement=document.createElement("div");
document.body.insertBefore(l,null)}d=SC.$(l);if(SC.typeOf(q)!=SC.T_STRING){var g=null;
if(document.defaultView&&document.defaultView.getComputedStyle){g=document.defaultView.getComputedStyle(q,null)
}else{g=q.currentStyle}c=g.cssText;if(!c||c.trim()===""){var n=this._copy_computed_props;
for(var k=0;k<n.length;k++){var b=n[k],f=g[b];l.style[b]=f}var m=l.style;if(m.font===""){var e="";
if(m.fontStyle){e+=m.fontStyle+" "}if(m.fontVariant){e+=m.fontVariant+" "}if(m.fontWeight){e+=m.fontWeight+" "
}if(m.fontSize){e+=m.fontSize}else{e+="10px"}if(m.lineHeight){e+="/"+m.lineHeight
}e+=" ";if(m.fontFamily){e+=m.fontFamily}else{m+="sans-serif"}l.style.font=e}SC.mixin(l.style,{left:"0px",top:"0px",position:"absolute",bottom:"auto",right:"auto",width:"auto",height:"auto"})
}else{d.attr("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}g=null}else{c=q;d.attr("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}l.className=h;l=null},teardownStringMeasurement:function(){var a=this._metricsCalculationElement;
a.innerHTML="";a.className="";a.setAttribute("style","");a=null},measureString:function(c,b){if(!b){c=SC.RenderContext.escapeHTML(c)
}var d=this._metricsCalculationElement;if(!d){throw"measureString requires a string measurement environment to be set up. Did you mean metricsForString?"
}if(typeof d.innerText!="undefined"){d.innerText=c}else{d.textContent=c}var a={width:d.clientWidth,height:d.clientHeight};
d=null;return a},metricsForString:function(c,d,e,b){if(!b){c=SC.RenderContext.escapeHTML(c)
}SC.prepareStringMeasurement(d,e);var a=SC.measureString(c);SC.teardownStringMeasurement();
return a},viewportOffset:function(c){if(c.getBoundingClientRect){var d=c.getBoundingClientRect();
return{x:d.left,y:d.top}}var k=0,e=0,l,g,f,m,b,h=c,a=SC.browser.mozilla>=3;while(h){l=SC.$(h);
e+=(h.offsetTop||0);if(!a||(h!==c)){e+=(h.clientTop||0)}k+=(h.offsetLeft||0);if(!a||(h!==c)){k+=(h.clientLeft||0)
}if(SC.browser.mozilla){g=l.attr("overflow");if(g!=="visible"){f=parseInt(l.attr("borderLeftWidth"),0)||0;
m=parseInt(l.attr("borderTopWidth"),0)||0;if(c!==h){f*=2;m*=2}k+=f;e+=m}b=h.offsetParent;
if(SC.browser.mozilla.match(/1[.]9/)&&b){e-=b.clientTop;k-=b.clientLeft}}if(h.offsetParent==document.body&&l.attr("position")==="absolute"){break
}h=h.offsetParent}h=c;while(h){if(!SC.browser.isOpera||h.tagName==="BODY"){e-=h.scrollTop||0;
k-=h.scrollLeft||0}h=h.parentNode}return{x:k,y:e}},ZERO_POINT:{x:0,y:0},ZERO_RANGE:{start:0,length:0},RANGE_NOT_FOUND:{start:0,length:-1},valueInRange:function(b,a){return(b>=0)&&(b>=a.start)&&(b<(a.start+a.length))
},minRange:function(a){return a.start},maxRange:function(a){return(a.length<0)?-1:(a.start+a.length)
},unionRanges:function(c,b){if((c==null)||(c.length<0)){return b}if((b==null)||(b.length<0)){return c
}var d=Math.min(c.start,b.start),a=Math.max(SC.maxRange(c),SC.maxRange(b));return{start:d,length:a-d}
},intersectRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var d=Math.max(SC.minRange(c),SC.minRange(b)),a=Math.min(SC.maxRange(c),SC.maxRange(b));
if(a<d){return SC.RANGE_NOT_FOUND}return{start:d,length:a-d}},subtractRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var a=Math.max(SC.minRange(c),SC.minRange(b)),d=Math.min(SC.maxRange(c),SC.maxRange(b));
if(a<d){return SC.RANGE_NOT_FOUND}return{start:d,length:a-d}},cloneRange:function(a){return{start:a.start,length:a.length}
},rangesEqual:function(b,a){if(b===a){return true}if(b==null){return a.length<0}if(a==null){return b.length<0
}return(b.start==a.start)&&(b.length==a.length)},convertHsvToHex:function(k,y,w){var a=0,l=0,u=0;
if(w>0){var e=(k==1)?0:Math.floor(k*6),m=(k==1)?0:(k*6)-e,d=w*(1-y),c=w*(1-(y*m)),x=w*(1-(y*(1-m))),n=[[w,x,d],[c,w,d],[d,w,x],[d,c,w],[x,d,w],[w,d,c]];
a=Math.round(255*n[e][0]);l=Math.round(255*n[e][1]);u=Math.round(255*n[e][2])}return this.parseColor("rgb("+a+","+l+","+u+")")
},convertHexToHsv:function(g){var c=this.expandColor(g),a=Math.max(Math.max(c[0],c[1]),c[2]),d=Math.min(Math.min(c[0],c[1]),c[2]),f=(a===0)?0:(1-d/a),b=a/255,e=(a==d)?0:((a==c[0])?((c[1]-c[2])/(a-d)/6):((a==c[1])?((c[2]-c[0])/(a-d)/6+1/3):((c[0]-c[1])/(a-d)/6+2/3)));
e=(e<0)?(e+1):((e>1)?(e-1):e);return[e,f,b]},PARSE_COLOR_RGBRE:/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i,PARSE_COLOR_HEXRE:/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,expandColor:function(b){var c,e,d,a;
c=this.parseColor(b);if(c){e=parseInt(c.slice(1,3),16);d=parseInt(c.slice(3,5),16);
a=parseInt(c.slice(5,7),16);return[e,d,a]}},parseColor:function(d){var e=0,a="#",c,b;
if(c=this.PARSE_COLOR_RGBRE.exec(d)){for(e=1;e<=3;e++){b=Math.max(0,Math.min(255,parseInt(c[e],0)));
a+=this.toColorPart(b)}return a}if(c=this.PARSE_COLOR_HEXRE.exec(d)){if(c[1].length==3){for(e=0;
e<3;e++){a+=c[1].charAt(e)+c[1].charAt(e)}return a}return"#"+c[1]}return false},toColorPart:function(a){if(a>255){a=255
}var b=a.toString(16);if(a<16){return"0"+b}return b},getStyle:function(a,b){var c="";
if(document.defaultView&&document.defaultView.getComputedStyle){c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)
}else{if(a.currentStyle){b=b.replace(/\-(\w)/g,function(d,e){return e.toUpperCase()
});c=a.currentStyle[b]}}return c},uniJapaneseConvert:function(e){var a,c="",b,d;for(b=0,d=e.length;
b<d;b++){a=e.charCodeAt(b);a=((a>=65281&&a<=65392)?a-65248:a);a=(a===12540?45:a);
c=c+String.fromCharCode(a)}return c}});require("tasks/task");SC.didPreloadBundle=function(){};
SC.PreloadBundleTask=SC.Task.extend({bundle:null,target:"SC",action:"preloaded",run:function(a){var b;
if(b=this.get("bundle")){var c=Date.now();SC.loadBundle(this.get("bundle"),this.get("target"),this.get("action"))
}}});SC.VALIDATE_OK=YES;SC.VALIDATE_NO_CHANGE=NO;SC.Validator=SC.Object.extend({fieldValueForObject:function(b,c,a){return b
},objectForFieldValue:function(c,b,a){return c},validate:function(a,b){return true
},validateError:function(a,b){return SC.$error("Invalid.General(%@)".loc(b.get("fieldValue")),b.get("fieldKey"))
},validateChange:function(b,c,a){return this.validate(b,c)?SC.VALIDATE_OK:this.validateError(b,c)
},validateSubmit:function(a,b){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
},validatePartial:function(a,b){if(!b.get("isValid")){return this.validate(a,b)?SC.VALIDATE_OK:this.validateError(a,b)
}else{return SC.VALIDATE_NO_CHANGE}},validateKeyDown:function(b,c,a){return true},attachTo:function(a,b){},detachFrom:function(a,b){}});
SC.Validator.mixin({OK:true,NO_CHANGE:false,findFor:function(e,g,f){var c;if(!f){return
}if(f instanceof SC.Validator){c=f}else{if(f.isClass){c=f.create()}else{if(SC.typeOf(f)===SC.T_STRING){var b=null;
var a=f.match(/^(.+)\[(.*)\]/);if(a){f=a[1];b=a[2]}f=f.classify();var d=SC.Validator[f];
if(SC.none(d)){throw"validator %@ not found for %@".fmt(f,g)}else{if(b){if(!e){throw"named validator (%@) could not be found for field %@ because the field does not belong to a form".fmt(b,g)
}if(!e._validatorHash){e._validatorHash={}}c=(b)?e._validatorHash[b]:null;if(!c){c=d.create()
}if(b){e._validatorHash[b]=c}}else{c=d.create()}}}}}return c},fieldValueForObject:function(a,b,c){if(this.prototype&&this.prototype.fieldValueForObject){return this.prototype.fieldValueForObject(a,b,c)
}else{return null}},objectForFieldValue:function(b,a,c){if(this.prototype&&this.prototype.objectForFieldValue){return this.prototype.objectForFieldValue(b,a,c)
}else{return null}}});sc_require("validators/validator");SC.Validator.CreditCard=SC.Validator.extend({fieldValueForObject:function(a,b,c){if(typeof(a)=="string"&&a.length==16){a=[a.slice(0,4),a.slice(4,8),a.slice(8,12),a.slice(12,16)].join(" ")
}return a},objectForFieldValue:function(b,a,c){return b.replace(/[\s-\.\:]/g,"")},validate:function(a,b){return this.checkNumber(b.get("fieldValue"))
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.CreditCard(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){return !!a.match(/[0-9\- ]/)},checkNumber:function(h){if(!h||h.length===0){return YES
}h=h.replace(/[^0-9]/g,"");var a="0123456789";var g=h.length;var f=parseInt(h,0);
var l=h.toString();l=l.replace(/^\s+|\s+$/g,"");var k=0;var n=true;var b=false;var m;
var d;for(var c=0;c<g;c++){m=""+l.substring(c,c+1);if(a.indexOf(m)=="-1"){n=false
}}if(!n){b=false}if((g===0)&&(b)){b=false}else{if(g>=15){for(var e=g;e>0;e--){d=parseInt(f,0)%10;
d=parseInt(d,0);k+=d;e--;f=f/10;d=parseInt(f,0)%10;d=d*2;switch(d){case 10:d=1;break;
case 12:d=3;break;case 14:d=5;break;case 16:d=7;break;case 18:d=9;break;default:d=d
}f=f/10;k+=d}if((k%10)===0){b=true}else{b=false}}}return b}});sc_require("validators/validator");
SC.Validator.Date=SC.Validator.extend({format:"NNN d, yyyy h:mm:ss a",fieldValueForObject:function(b,c,d){var a;
if(typeof(b)==="number"){a=new Date(b)}else{if(b instanceof Date){a=b}}if(a){b=a.format(this.get("format"))
}return b},objectForFieldValue:function(c,b,d){if(c){var a=Date.parseDate(c);c=(a)?a.getTime():null
}return c}});require("validators/validator");SC.Validator.DateTime=SC.Validator.extend({format:"%d/%m/%Y",fieldValueForObject:function(a,b,c){if(SC.kindOf(a,SC.DateTime)){a=a.toFormattedString(this.get("format"))
}else{a=null}return a},objectForFieldValue:function(b,a,c){if(b){b=SC.DateTime.parse(b,this.get("format"))
}return b}});sc_require("validators/validator");SC.Validator.Email=SC.Validator.extend({validate:function(a,b){return(b.get("fieldValue")||"").match(/.+@.+\...+/)
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Email(%@)".loc(a),a)
}});SC.Validator.EmailOrEmpty=SC.Validator.Email.extend({validate:function(a,c){var b=c.get("fieldValue");
return(b&&b.length>0)?b.match(/.+@.+\...+/):true}});sc_require("validators/validator");
SC.Validator.NotEmpty=SC.Validator.extend({validate:function(a,c){var b=c.get("fieldValue");
if(SC.none(b)){return NO}if(!SC.none(b.length)){return b.length>0}return YES},validateError:function(b,c){var a=c.get("errorLabel")||"Field";
return SC.$error("Invalid.NotEmpty(%@)".loc(a.capitalize()),c.get("errorLabel"))}});
sc_require("validators/validator");SC.Validator.Number=SC.Validator.extend({places:0,fieldValueForObject:function(a,b,c){switch(SC.typeOf(a)){case SC.T_NUMBER:a=a.toFixed(this.get("places"));
break;case SC.T_NULL:case SC.T_UNDEFINED:a="";break}return a},objectForFieldValue:function(c,b,d){var a;
c=c.replace(/,/g,"");switch(SC.typeOf(c)){case SC.T_STRING:if(c.length===0){c=null
}else{if(this.get("places")>0){c=parseFloat(c)}else{if(c.length==1&&c.match(/-/)){c=null
}else{a=parseInt(c,0);if(isNaN(a)){c=SC.uniJapaneseConvert(c);c=parseInt(c,0);if(isNaN(c)){c=""
}}else{c=a}}}}break;case SC.T_NULL:case SC.T_UNDEFINED:c=null;break}return c},validate:function(a,c){var b=c.get("fieldValue");
return(b==="")||!(isNaN(b)||isNaN(parseFloat(b)))},validateError:function(b,c){var a=c.get("errorLabel")||"Field";
return SC.$error("Invalid.Number(%@)".loc(a),a)},validateKeyDown:function(b,c,a){var d=c.$input().val();
if(!d){d=""}d+=a;if(this.get("places")===0){if(a.length===0){return true}else{return d.match(/^[\-{0,1}]?[0-9,\0]*/)[0]===d
}}else{if(a.length===0){return true}else{return d.match(/^[\-{0,1}]?[0-9,\0]*\.?[0-9\0]+/)===d
}}}});sc_require("validators/validator");SC.Validator.Password=SC.Validator.extend({attachTo:function(a,b){arguments.callee.base.apply(this,arguments);
if(!this.fields){this.fields=[]}this.fields.push(b)},validate:function(e){if(!this.fields||this.fields.length===0){return true
}var d=false;var b=false;var a=true;var c=this.fields[0].get("fieldValue");this.fields.forEach(function(g){var f=g.get("fieldValue");
if(f!=c){a=false}if(!f||f.length===0){d=true}if(f&&f.length>0){b=true}});if(e){return(b===false)?false:a
}else{return(d===true)?true:a}},updateFields:function(c,b){if(!this.fields||this.fields.length===0){return true
}var a="Invalid.Password".loc();var d=this._field;this.fields.forEach(function(e){var g=(b)?null:((e==d)?a:"");
c.setErrorFor(e,g)});return(b)?SC.VALIDATE_OK:a},validateChange:function(b,c,a){return this.updateFields(b,this.validate(false))
},validateSubmit:function(a,b){return this.updateFields(a,this.validate(true))},validatePartial:function(b,c){var a=!this._field.get("isValid");
if(a){return this.updateFields(b,this.validate(false))}else{return SC.VALIDATE_NO_CHANGE
}}});sc_require("validators/validator");SC.Validator.PositiveInteger=SC.Validator.extend({defaultValue:null,fieldValueForObject:function(a,b,c){switch(SC.typeOf(a)){case SC.T_NUMBER:a=a.toFixed(0);
break;case SC.T_NULL:case SC.T_UNDEFINED:a=this.get("defaultValue");break}return a
},objectForFieldValue:function(b,a,c){b=b.replace(/,/g,"");switch(SC.typeOf(b)){case SC.T_STRING:if(b.length===0){b=this.get("defaultValue")
}else{b=parseInt(b,0)}break;case SC.T_NULL:case SC.T_UNDEFINED:b=this.get("defaultValue");
break}return b},validate:function(a,c){var b=c.get("fieldValue");return(b==="")||!isNaN(b)
},validateError:function(b,c){var a=c.get("errorLabel")||"Field";return SC.$error("Invalid.Number(%@)".loc(a),a)
},validateKeyDown:function(b,c,a){var d=c.$input().val();if(!d){d=""}d+=a;if(a.length===0){return true
}else{return d.match(/^[0-9\0]*/)[0]===d}}});sc_require("views/view");SC.ContainerView=SC.View.extend({classNames:["sc-container-view"],nowShowing:null,contentView:null,contentViewBindingDefault:SC.Binding.single(),replaceContent:function(a){this.removeAllChildren();
if(a){this.appendChild(a)}},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("nowShowing");if(a&&a.length>0){this.nowShowingDidChange()}},nowShowingDidChange:function(){var a=this.get("nowShowing");
if(a===SC.CONTENT_SET_DIRECTLY){return}if(SC.typeOf(a)===SC.T_STRING&&a.length>0){if(a.indexOf(".")>0){a=SC.objectForPropertyPath(a)
}else{a=SC.objectForPropertyPath(a,this.get("page"))}}if(SC.typeOf(a)===SC.T_CLASS){if(a.kindOf(SC.View)){a=a.create()
}else{a=null}}if(a&&!(a instanceof SC.View)){a=null}this.set("contentView",a)}.observes("nowShowing"),contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView")});sc_require("views/view");sc_require("mixins/control");
SC.IMAGE_STATE_NONE="none";SC.IMAGE_STATE_LOADING="loading";SC.IMAGE_STATE_LOADED="loaded";
SC.IMAGE_STATE_FAILED="failed";SC.IMAGE_STATE_SPRITE="sprite";SC.BLANK_IMAGE_DATAURL="data:image/gif;base64,R0lGODlhAQABAJAAAP///wAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==";
SC.BLANK_IMAGE_URL=SC.browser.msie&&SC.browser.msie<8?"/static/sproutcore/foundation/es/757bdc6c237186fc87cf1b608e6dceb70c4542b6/blank.gif":SC.BLANK_IMAGE_DATAURL;
SC.ImageView=SC.View.extend(SC.Control,{classNames:"sc-image-view",tagName:"img",status:SC.IMAGE_STATE_NONE,value:null,useImageCache:YES,canLoadInBackground:NO,localize:YES,displayProperties:"status toolTip".w(),render:function(c,f){var a=this.get("status"),d=this.get("value");
if(a===SC.IMAGE_STATE_NONE&&d){this._image_valueDidChange()}a=this.get("status");
var e=(a===SC.IMAGE_STATE_LOADED)?d:SC.BLANK_IMAGE_URL;if(a===SC.IMAGE_STATE_SPRITE){c.addClass(d)
}c.attr("src",e);var b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}c.attr("title",b);c.attr("alt",b)}},_image_valueDidChange:function(){var b=this.get("value"),c;
if(b&&b.isEnumerable){b=b.firstObject()}c=SC.ImageView.valueIsUrl(b);if(c&&this.get("useImageCache")){var a=this.get("isVisibleInWindow")||this.get("canLoadInBackground");
this._loadingUrl=b;SC.imageCache.loadImage(b,this,this.imageDidLoad,a);if(this._loadingUrl){this.set("status",SC.IMAGE_STATE_LOADING)
}}else{this._loadingUrl=null;this.set("status",(c)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_SPRITE);
this.displayDidChange()}}.observes("value"),imageDidLoad:function(a,b){if(a===this._loadingUrl){this._loadingUrl=null
}if(this.get("value")===a){this.set("status",SC.$ok(b)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_FAILED);
this.displayDidChange()}}});SC.ImageView.valueIsUrl=function(a){return a?a.indexOf("/")>=0:NO
};sc_require("views/view");sc_require("mixins/control");SC.ALIGN_LEFT="left";SC.ALIGN_RIGHT="right";
SC.ALIGN_CENTER="center";SC.REGULAR_WEIGHT="normal";SC.BOLD_WEIGHT="bold";SC.LabelView=SC.View.extend(SC.Control,{classNames:["sc-label-view"],fontWeight:SC.REGULAR_WEIGHT,escapeHTML:true,escapeHTMLBindingDefault:SC.Binding.oneWay().bool(),localize:false,localizeBindingDefault:SC.Binding.oneWay().bool(),formatter:null,value:"",hint:null,exampleInlineTextFieldView:SC.InlineTextFieldView,icon:null,textAlign:SC.ALIGN_LEFT,isInlineEditorMultiline:NO,displayValue:function(){var g,e;
g=this.get("value");e=this.getDelegateProperty("formatter",this.displayDelegate);
if(e){var f=(SC.typeOf(e)===SC.T_FUNCTION)?e(g,this):e.fieldValueForObject(g,this);
if(!SC.none(f)){g=f}}if(SC.typeOf(g)===SC.T_ARRAY){var d=[];for(var b=0,c=g.get("length");
b<c;b++){var a=g.objectAt(b);if(!SC.none(a)&&a.toString){a=a.toString()}d.push(a)
}g=d.join(",")}if(!SC.none(g)&&g.toString){g=g.toString()}if(g&&this.getDelegateProperty("localize",this.displayDelegate)){g=g.loc()
}if(this.get("escapeHTML")){g=SC.RenderContext.escapeHTML(g)}return g}.property("value","localize","formatter","escapeHTML").cacheable(),hintValue:function(){var a=this.get("hint");
if(this.get("escapeHTML")){a=SC.RenderContext.escapeHTML(a)}return a}.property("hint","escapeHTML").cacheable(),isEditable:NO,isEditableBindingDefault:SC.Binding.bool(),isEditing:NO,validator:null,doubleClick:function(a){return this.beginEditing()
},beginEditing:function(){if(this.get("isEditing")){return YES}if(!this.get("isEditable")){return NO
}var b=this.$(),d=this.get("value"),c=SC.viewportOffset(b[0]),a=this.convertFrameFromView(this.get("frame"),null);
c.width=a.width;c.height=a.height;SC.InlineTextFieldView.beginEditing({frame:c,delegate:this,exampleElement:b,value:d,multiline:this.get("isInlineEditorMultiline"),isCollection:NO,validator:this.get("validator"),exampleInlineTextFieldView:this.get("exampleInlineTextFieldView")})
},discardEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.discardEditing()
},commitEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.commitEditing()
},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)},inlineEditorDidBeginEditing:function(b){var a=this.$();
this._oldOpacity=a.css("opacity");a.css("opacity",0)},inlineEditorShouldBeginEditing:function(){return this.get("isEditable")
},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(a,b){this.setIfChanged("value",b);
this.$().css("opacity",this._oldOpacity);this._oldOpacity=null;this.set("isEditing",NO)
},displayProperties:"displayValue textAlign fontWeight icon".w(),_TEMPORARY_CLASS_HASH:{},render:function(d,a){var m=this.get("displayValue"),l=this.get("icon"),g=this.get("hintValue"),f,e,n,h=false,c=false;
if(l){var b=(l.indexOf("/")>=0)?l:SC.BLANK_IMAGE_URL,k=(b===l)?"":l;l='<img src="'+b+'" alt="" class="icon '+k+'" />';
if(l!==this._iconCache){this._iconCache=l;h=true}}if(g&&(!m||m==="")){n='<span class="sc-hint">'+g+"</span>"
}else{n=m}if(n!==this._textCache){this._textCache=n;c=true}if(a||c||h){d.push(l,n)
}e={"text-align":this.get("textAlign"),"font-weight":this.get("fontWeight")};if(this.get("isEditing")){e.opacity=0
}d.addStyle(e);f=this._TEMPORARY_CLASS_HASH;f.icon=!!this.get("icon");d.setClass(f)
}});require("panes/pane");SC.MainPane=SC.Pane.extend({layout:{top:0,left:0,bottom:0,right:0,minHeight:200,minWidth:200},paneDidAttach:function(){var b=arguments.callee.base.apply(this,arguments);
var a=this.rootResponder;a.makeMainPane(this);if(!a.get("keyRootView")){a.makeKeyPane(this)
}return b},acceptsKeyPane:YES,classNames:["sc-main"]});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/foundation")
}SC.stringsFor("English",{"Invalid.CreditCard(%@)":"%@ is not a valid credit card number","Invalid.Email(%@)":"%@ is not a valid email address","Invalid.NotEmpty(%@)":"%@ must not be empty","Invalid.Password":"Your passwords do not match.  Please try typing them again.","Invalid.General(%@)":"%@ is invalid.  Please try again.","Invalid.Number(%@)":"%@ is not a number."});
SC.allowsBackspaceToPreviousPage=NO;SC.BORDER_BEZEL="sc-bezel-border";SC.BORDER_BLACK="sc-black-border";
SC.BORDER_GRAY="sc-gray-border";SC.BORDER_TOP="sc-top-border";SC.BORDER_BOTTOM="sc-bottom-border";
SC.BORDER_NONE=null;SC.Border={borderTop:0,borderRight:0,borderBottom:0,borderLeft:0,borderStyle:SC.BORDER_GRAY,hasBorder:YES,displayProperties:["borderStyle"],_BORDER_REGEXP:(/-border$/),initMixin:function(){this._sc_border_borderStyleDidChange()
},renderMixin:function(a,c){var b=this.get("borderStyle");if(b){if(this._BORDER_REGEXP.exec(b)){a.addClass(b)
}else{a.addStyle("border","1px "+b+" solid")}}},_sc_border_borderStyleDidChange:function(){var a=this.get("borderStyle"),b=SC.Border.dimensions[a];
if(b){this.borderTop=b;this.borderRight=b;this.borderBottom=b;this.borderLeft=b}}};
SC.mixin(SC.Border,{dimensions:{"sc-bezel-border":1,"sc-black-border":1,"sc-gray-border":1,"sc-top-border":1,"sc-bottom-border":1}});
SC.CollectionFastPath={initMixin:function(){this._indexMap={}},poolForExampleView:function(a){var b="_pool_"+SC.guidFor(a);
if(!this[b]){this[b]=[]}return this[b]},createItemViewFromExampleView:function(c,b){var a=c.create(b);
if(a.isPoolable){a.owningPool=this.poolForExampleView(c)}a.createdFromExampleView=c;
return a},configureItemView:function(b,a){b.beginPropertyChanges();b.setIfChanged("content",a.content);
b.setIfChanged("contentIndex",a.contentIndex);b.setIfChanged("parentView",a.parentView);
b.setIfChanged("layerId",a.layerId);b.setIfChanged("isEnabled",a.isEnabled);b.setIfChanged("isSelected",a.isSelected);
b.setIfChanged("outlineLevel",a.outlineLevel);b.setIfChanged("layout",a.layout);b.setIfChanged("disclosureState",a.disclosureState);
b.setIfChanged("isVisibleInWindow",a.isVisibleInWindow);b.setIfChanged("isGroupView",a.isGroupView);
b.setIfChanged("page",this.page);b.endPropertyChanges()},wakePooledView:function(b,a){this.configureItemView(b,a);
if(b.awakeFromPool){b.awakeFromPool(b.owningPool,this)}},allocateItemView:function(d,b){var a;
if(d.prototype.isPoolable){var c=this.poolForExampleView(d);if(c.length>0){a=c.pop();
this.wakePooledView(a,b)}}if(!a){a=this.createItemViewFromExampleView(d,b)}return a
},releaseItemView:function(b){if(!b.isPoolable){b.destroy();return}var a=b.owningPool;
a.push(b);if(b.hibernateInPool){b.hibernateInPool(a,this)}},contentIndexIsGroup:function(b,d){var c=this.get("contentDelegate");
var a=this.get("_contentGroupIndexes"),e=NO;e=a&&a.contains(b);if(e){e=c.contentIndexIsGroup(this,this.get("content"),b)
}return e},exampleViewForItem:function(f,d){var b=this.get("contentDelegate"),c=this.get("_contentGroupIndexes"),e,a,g=this.contentIndexIsGroup(d,f);
if(g){e=this.get("contentGroupExampleViewKey");if(e&&f){a=f.get(e)}if(!a){a=this.get("groupExampleView")||this.get("exampleView")
}}else{e=this.get("contentExampleViewKey");if(e&&f){a=f.get(e)}if(!a){a=this.get("exampleView")
}}return a},setAttributesForItem:function(f,d,c){var b=this.get("contentDelegate"),g=this.contentIndexIsGroup(d),a=this.exampleViewForItem(f,d),e=this.get("content");
c.createdFromExampleView=a;c.parentView=this.get("containerView")||this;c.contentIndex=d;
c.owner=c.displayDelegate=this;c.content=f;c.page=this.page;c.layerId=this.layerIdFor(d);
c.isEnabled=b.contentIndexIsEnabled(this,e,d);c.isSelected=b.contentIndexIsSelected(this,e,d);
c.outlineLevel=b.contentIndexOutlineLevel(this,e,d);c.disclosureState=b.contentIndexDisclosureState(this,e,d);
c.isVisibleInWindow=this.get("isVisibleInWindow");c.isGroupView=g;c.layout=this.layoutForContentIndex(d);
if(!c.layout){c.layout=a.prototype.layout}},mappedViewsForItem:function(a,b){if(!b){b=this._viewMap
}return b[SC.guidFor(a)]},mappedViewForItem:function(c,b,d){if(!d){d=this._viewMap
}var a=d[SC.guidFor(c)];if(!a){return undefined}return a[b]},mapView:function(e,c,b,f){if(!f){f=this._viewMap
}var d=SC.guidFor(e),a=f[d];if(!a){a=f[d]={_length:0}}a[c]=b;a._length++},unmapView:function(e,c,f){if(!f){f=this._viewMap
}var d=SC.guidFor(e),a=f[d];if(!a){return}if(a[c]){var b=a[c];delete a[c];a._length--;
if(a._length<=0){delete f[d]}}},itemViewForContentIndex:function(b){var d=this.get("content");
if(!d){return}var c=d.objectAt(b);if(!c){return null}var e=this.exampleViewForItem(c,b),a=this._indexMap[b];
if(a&&a.createdFromExampleView!==e){this.removeItemView(a);this.unmapView(c,b);a=null
}if(!a){a=this.addItemView(e,c,b)}return a},nearestMappedViewIndexForItem:function(e,c,f){var b=this.mappedViewsForItem(e,f);
if(!b){return null}var d=null,h=-1,g=0;for(var a in b){a=parseInt(a,10);if(isNaN(a)){continue
}g=Math.abs(c-a);if(h<0||g<h){h=g;d=a}}return d},remapItemViews:function(b){var l=this._viewMap||{},a=(this._viewMap={}),k=(this._indexMap={}),m=[],h=this.get("content"),r;
if(!h){return}var f=this._itemsToAdd;b.forEach(function(s){r=h.objectAt(s);var w=this.mappedViewsForItem(r,l);
if(w){if(w[s]){var u=w[s];this.unmapView(r,s,l);this.mapView(r,s,u,a);k[s]=u}else{m.push(s)
}}else{f.push(s)}},this);for(var q=0,g=m.length;q<g;q++){var n=m[q];r=h.objectAt(n);
var e=this.nearestMappedViewIndexForItem(r,n,l),c;if(!SC.none(e)){c=this.mappedViewForItem(r,e,l);
var d=this.exampleViewForItem(r,n);if(d===c.createdFromExampleView){this.unmapView(r,e,l);
this.mapView(r,n,c,a);k[n]=c}else{f.push(n)}}else{f.push(n)}}return l},reloadIfNeeded:function(f,b){var d=this.get("content"),e;
if(!f||!f.isIndexSet){f=this.get("nowShowing")}if(!b){e=this._invalidIndexes;if(!e||!this.get("isVisibleInWindow")){return this
}this._invalidIndexes=NO;if(e.isIndexSet&&e.contains(f)){e=YES}if(this.willReload){this.willReload(e===YES?null:e)
}}var g=this._itemsToAdd||(this._itemsToAdd=[]);var a=this.remapItemViews(f);this.processRemovals(a);
if(e){this.processUpdates(e===YES?f:e)}this.processAdds();if(!b){this.clearDOMPools()
}g.length=0;if(!b){var c=this.computeLayout();if(c){this.adjust(c)}if(this.didReload){this.didReload(e===YES?null:e)
}}return this},processRemovals:function(c){var f=this.get("content");for(var d in c){var b=c[d];
for(var e in b){e=parseInt(e,10);if(isNaN(e)){continue}var a=b[e];if(this._indexMap[e]===a){delete this._indexMap[e]
}a._isInCollection=NO;this.removeItemView(a)}}},processUpdates:function(e){var b=this._itemsToUpdate,d=this.get("content"),c,a;
e.forEach(function(f){c=d.objectAt(f);if(a=this.mappedViewForItem(c,f)){if(!a._isInCollection){return
}var g=this.exampleViewForItem(c,f);this.updateItemView(a,g,c,f)}},this)},processAdds:function(){var f=this.get("content");
var g=this._itemsToAdd,b,a=g.length,e,d;for(b=0;b<a;b++){e=g[b];d=f.objectAt(e);var h=this.exampleViewForItem(d,e);
var c=this.addItemView(h,d,e)}},clearDOMPools:function(){var a=this._domPools||(this._domPools={});
for(var b in a){this.clearDOMPool(a[b])}},domPoolSize:10,clearDOMPool:function(c){var b,a=c.length,d;
for(b=this.domPoolSize;b<a;b++){d=c[b];this.removeChild(d);this.releaseItemView(d)
}c.length=Math.min(c.length,this.domPoolSize)},domPoolForExampleView:function(d){var c=this._domPools||(this._domPools={}),a=SC.guidFor(d);
var b=c[a];if(!b){b=c[a]=[]}return b},itemFromDOMPool:function(c){var b=this.domPoolForExampleView(c);
if(b.length<1){return null}var a=b.shift();if(a.wakeFromDOMPool){a.wakeFromDOMPool()
}return a},sendToDOMPool:function(a){var b=this.domPoolForExampleView(a.createdFromExampleView);
b.push(a);var c=a.get("frame");a.adjust({top:-c.height});a.set("layerId",SC.guidFor(a));
if(a.sleepInDOMPool){a.sleepInDOMPool()}},addItemView:function(e,d,c){var a,b=this._TMP_ATTRS||(this._TMP_ATTRS={});
this.setAttributesForItem(d,c,b);if(a=this.itemFromDOMPool(e)){this.configureItemView(a,b);
a._isInCollection=YES;this.mapView(d,c,a);this._indexMap[c]=a;return a}a=this.allocateItemView(e,b);
this.appendChild(a);a._isInCollection=YES;this.mapView(d,c,a);this._indexMap[c]=a;
return a},removeItemView:function(a){if(a.get("layerIsCacheable")){this.sendToDOMPool(a)
}else{this.removeChild(a)}a._isInCollection=NO},updateItemView:function(d,e,c,b){if(!d.get("layerIsCacheable")||d.createdFromExampleView!==e){this.unmapView(d,b);
delete this._indexMap[b];this.removeItemView(d,c,b);var f=this.addItemView(e,c,b)
}else{var a=this._TMP_ATTRS||(this._TMP_ATTRS={});this.setAttributesForItem(c,b,a);
this.configureItemView(d,a)}},_lastTopUpdate:0,_lastLeftUpdate:0,_tolerance:100,touchScrollDidChange:function(g,f){if(Date.now()-this._lastTouchScrollTime<25){return
}var h=this.get("clippingFrame");var e=this._inScrollClippingFrame||(this._inScrollClippingFrame={x:0,y:0,width:0,height:0});
e.x=h.x;e.y=h.y;e.width=h.width;e.height=h.height;e.x=g;e.y=f;var d=this.contentIndexesInRect(e);
if(!d){return}var b=this.get("length"),a=d.get("max"),c=d.get("min");if(a>b||c<0){d=d.copy();
d.remove(b,a-b).remove(c,0-c).freeze()}if(this._lastNowShowing){if(d.contains(this._lastNowShowing)&&this._lastNowShowing.contains(d)){return
}}this._lastNowShowing=d;this.reloadIfNeeded(d,YES);this._lastTouchScrollTime=Date.now()
}};SC.CollectionGroup={classNames:["sc-collection-group"]};SC.CollectionRowDelegate={isCollectionRowDelegate:YES,rowHeight:18,customRowHeightIndexes:null,contentIndexRowHeight:function(a,b,c){return this.get("rowHeight")
}};SC.CollectionViewDelegate={isCollectionViewDelegate:YES,collectionViewSelectionForProposedSelection:function(a,b){return b
},collectionViewShouldSelectIndexes:function(a,b,c){return b},collectionViewShouldDeselectIndexes:function(a,b){return b
},collectionViewShouldDeleteIndexes:function(a,b){return b},collectionViewDeleteContent:function(a,c,b){if(!c){return NO
}if(SC.typeOf(c.destroyAt)===SC.T_FUNCTION){c.destroyAt(b);a.selectPreviousItem(NO,1);
return YES}else{if(SC.typeOf(c.removeAt)===SC.T_FUNCTION){c.removeAt(b);a.selectPreviousItem(NO,1);
return YES}else{return NO}}},collectionViewShouldBeginDrag:function(a){return YES
},collectionViewDragDataTypes:function(a){return[]},collectionViewDragDataForType:function(a,c,b){return null
},collectionViewComputeDragOperations:function(a,b,c){return c},collectionViewValidateDragOperation:function(b,d,e,c,a){return(a&SC.DROP_ON)?SC.DRAG_NONE:e
},collectionViewPerformDragOperation:function(b,d,e,c,a){return SC.DRAG_NONE},collectionViewDragViewFor:function(a,b){return null
},ghostActsLikeCursor:NO};SC.Scrollable={initMixin:function(){console.warn("SC.Scrollable is deprecated and will be removed in a future version of SproutCore.  Consider pulling the mixin into your own app if you want to keep using it.")
},isScrollable:true,verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("innerFrame").height
}.property("innerFrame"),horizontalPageScroll:function(){return this.get("innerFrame").width
}.property("innerFrame"),hasVerticalScroller:function(){return this.get("scrollFrame").height>this.get("innerFrame").height
}.property("scrollFrame"),hasHorizontalScroller:function(){return this.get("scrollFrame").width>this.get("innerFrame").width
}.property("scrollFrame"),scrollBy:function(a){var b=this.get("scrollFrame");var c=this.get("innerFrame");
if(!this.get("hasVerticalScroller")){a.y=0}if(b.height<=c.height){a.y=0}if(!this.get("hasHorizontalScroller")){a.x=0
}if(b.width<=c.width){a.x=0}var d={x:b.x-(a.x||0),y:b.y-(a.y||0)};this.set("scrollFrame",d);
d=this.get("scrollFrame");return{x:d.x-b.x,y:d.y-b.y}},scrollTo:function(a,b){this.set("scrollFrame",{x:0-a,y:0-b})
},scrollToVisible:function(b){var e=this.get("innerFrame");var d=this.get("scrollFrame");
var a=this.convertFrameFromView(b.get("frame"),b);a.x-=(e.x+d.x);a.y-=(e.y+d.y);var c={x:0-d.x,y:0-d.y,width:e.width,height:e.height};
c.y-=Math.max(0,SC.minY(c)-SC.minY(a));c.x-=Math.max(0,SC.minX(c)-SC.minX(a));c.y+=Math.max(0,SC.maxY(a)-SC.maxY(c));
c.x+=Math.max(0,SC.maxX(a)-SC.maxX(c));this.scrollTo(c.x,c.y)},scrollDownLine:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalLineScroll")*a}).y},scrollUpLine:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalLineScroll")*a}).y},scrollRightLine:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalLineScroll")*a}).x},scrollLeftLine:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalLineScroll")*a}).x},scrollDownPage:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalPageScroll")*a}).y},scrollUpPage:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalPageScroll")*a}).y},scrollRightPage:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalPageScroll")*a}).x},scrollLeftPage:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalPageScroll")*a}).x}};SC.ModalPane=SC.Pane.extend({classNames:"sc-modal",layout:{top:0,left:0,bottom:0,right:0},_openPaneCount:0,paneWillAppend:function(a){this._openPaneCount++;
if(!this.get("isVisibleInWindow")){this.append()}return this},paneDidRemove:function(a){this._openPaneCount--;
if(this._openPaneCount<=0){this._openPaneCount=0;if(this.get("isVisibleInWindow")){this.remove()
}}},mouseDown:function(b){var a=this.get("owner");if(a&&a.modalPaneDidClick){a.modalPaneDidClick(b)
}},touchStart:function(a){this.mouseDown(a)}});sc_require("panes/modal");SC.PanelPane=SC.Pane.extend({layout:{left:0,right:0,top:0,bottom:0},classNames:["sc-panel"],acceptsKeyPane:YES,isModal:YES,modalPane:SC.ModalPane.extend({classNames:"for-sc-panel"}),contentView:null,contentViewBindingDefault:SC.Binding.single(),render:function(a,b){if(a.needsContent){this.renderChildViews(a,b);
a.push("<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>")
}},replaceContent:function(a){this.removeAllChildren();if(a){this.appendChild(a)}},createChildViews:function(){var a=this.contentView;
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView"),_modalPane:function(){var a=this.get("modalPane");if(a&&a.isClass){a=a.create({owner:this});
this.set("modalPane",a)}return a},appendTo:function(a){var b;if(!this.get("isVisibleInWindow")&&this.get("isModal")&&(b=this._modalPane())){this._isShowingModal=YES;
b.paneWillAppend(this)}return arguments.callee.base.apply(this,arguments)},remove:function(){var b,a=arguments.callee.base.apply(this,arguments);
if(this._isShowingModal){this._isShowingModal=NO;if(b=this._modalPane()){b.paneDidRemove(this)
}}return a},_isModalDidChange:function(){var b,a=this.get("isModal");if(a){if(!this._isShowingModal&&this.get("isVisibleInWindow")&&(b=this._modalPane())){this._isShowingModal=YES;
b.paneWillAppend(this)}}else{if(this._isShowingModal&&(b=this._modalPane())){this._isShowingModal=NO;
b.paneDidRemove(this)}}}.observes("isModal"),paneDidAttach:function(){var a=arguments.callee.base.apply(this,arguments);
this.becomeKeyPane();return a}});SC.ButtonView=SC.View.extend(SC.Control,SC.Button,SC.StaticLayout,{tagName:"div",classNames:["sc-button-view"],theme:"square",buttonBehavior:SC.PUSH_BEHAVIOR,holdInterval:100,isDefault:NO,isDefaultBindingDefault:SC.Binding.oneWay().bool(),isCancel:NO,isCancelBindingDefault:SC.Binding.oneWay().bool(),href:"",action:null,target:null,supportFocusRing:NO,_labelMinWidthIE7:0,triggerAction:function(a){if(!this.get("isEnabled")){return NO
}this.set("isActive",YES);this.invokeLater("_triggerActionAfterDelay",200,a);return YES
},_triggerActionAfterDelay:function(a){this._action(a,YES);this.didTriggerAction();
this.set("isActive",NO)},didTriggerAction:function(){},titleMinWidth:80,init:function(){arguments.callee.base.apply(this,arguments);
if(this.get("keyEquivalent")){this._defaultKeyEquivalent=this.get("keyEquivalent")
}},_TEMPORARY_CLASS_HASH:{},displayProperties:["href","icon","title","value","toolTip"],renderStyle:"renderDefault",render:function(d,f){var a,b,c,e;
if(this.get("tagName")==="a"){a=this.get("href");if(!a||(a.length===0)){a="javascript:;"
}d.attr("href",a)}b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}d.attr("title",b);d.attr("alt",b)}c=this._TEMPORARY_CLASS_HASH;c.def=this.get("isDefault");
c.cancel=this.get("isCancel");c.icon=!!this.get("icon");d.attr("role","button").setClass(c);
e=this.get("theme");if(e&&!d.hasClass(e)){d.addClass(e)}this[this.get("renderStyle")](d,f)
},renderDefault:function(a,b){if(b){a=a.push("<span class='sc-button-inner' style = 'min-width:",this.get("titleMinWidth"),"px'>");
this.renderTitle(a,b);a.push("</span>");if(this.get("supportFocusRing")){a.push('<div class="focus-ring">','<div class="focus-left"></div>','<div class="focus-middle"></div>','<div class="focus-right"></div></div>')
}}else{this.renderTitle(a,b)}},renderImage:function(a,c){var b=this.get("icon");a.addClass("no-min-width");
if(b){a.push("<div class='img "+b+"'></div>")}else{a.push("<div class='img'></div>")
}},_defaultKeyEquivalent:null,_isDefaultOrCancelDidChange:function(){var a=!!this.get("isDefault"),b=!a&&this.get("isCancel");
if(this.didChangeFor("defaultCancelChanged","isDefault","isCancel")){this.displayDidChange();
if(a){this.set("keyEquivalent","return")}else{if(b){this.setIfChanged("keyEquivalent","escape")
}else{this.set("keyEquivalent",this._defaultKeyEquivalent)}}}}.observes("isDefault","isCancel"),isMouseDown:false,mouseDown:function(a){var b=this.get("buttonBehavior");
if(!this.get("isEnabled")){return YES}this.set("isActive",YES);this._isMouseDown=YES;
if(b===SC.HOLD_BEHAVIOR){this._action(a)}else{if(!this._isFocused&&(b!==SC.PUSH_BEHAVIOR)){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}}return YES},mouseExited:function(a){if(this._isMouseDown){this.set("isActive",NO)
}return YES},mouseEntered:function(a){if(this._isMouseDown){this.set("isActive",YES)
}return YES},mouseUp:function(b){if(this._isMouseDown){this.set("isActive",NO)}this._isMouseDown=false;
if(this.get("buttonBehavior")!==SC.HOLD_BEHAVIOR){var a=this.$().within(b.target);
if(a&&this.get("isEnabled")){this._action(b)}}return YES},touchStart:function(b){var a=this.get("buttonBehavior");
if(!this.get("isEnabled")){return YES}this.set("isActive",YES);if(a===SC.HOLD_BEHAVIOR){this._action(b)
}else{if(!this._isFocused&&(a!==SC.PUSH_BEHAVIOR)){this._isFocused=YES;this.becomeFirstResponder();
if(this.get("isVisibleInWindow")){this.$()[0].focus()}}}b.preventDefault();return YES
},touchesDragged:function(a,b){if(!this.touchIsInBoundary(a)){if(!this._touch_exited){this.set("isActive",NO)
}this._touch_exited=YES}else{if(this._touch_exited){this.set("isActive",YES)}this._touch_exited=NO
}a.preventDefault();return YES},touchEnd:function(a){this._touch_exited=NO;this.set("isActive",NO);
if(this.get("buttonBehavior")!==SC.HOLD_BEHAVIOR){if(this.touchIsInBoundary(a)){this._action()
}}a.preventDefault();return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(a){a.becomeFirstResponder()}else{b.allowDefault()}return YES}if(b.which===13){this.triggerAction(b);
return YES}return NO},_action:function(a,c){switch(this.get("buttonBehavior")){case SC.TOGGLE_BEHAVIOR:var b=this.get("isSelected");
if(b){this.set("value",this.get("toggleOffValue"))}else{this.set("value",this.get("toggleOnValue"))
}break;case SC.TOGGLE_ON_BEHAVIOR:this.set("value",this.get("toggleOnValue"));break;
case SC.TOGGLE_OFF_BEHAVIOR:this.set("value",this.get("toggleOffValue"));break;case SC.HOLD_BEHAVIOR:this._runHoldAction(a,c);
break;default:this._runAction(a)}},_runAction:function(a){var c=this.get("action"),d=this.get("target")||null,b=this.getPath("pane.rootResponder");
if(c){if(this._hasLegacyActionHandler()){this._triggerLegacyActionHandler(a)}else{if(b){b.sendAction(c,d,this,this.get("pane"))
}}}},_runHoldAction:function(a,b){if(this.get("isActive")){this._runAction();if(!b){SC.RunLoop.begin();
this.invokeLater("_runHoldAction",this.get("holdInterval"),a);SC.RunLoop.end()}}},_hasLegacyActionHandler:function(){var a=this.get("action");
if(a&&(SC.typeOf(a)===SC.T_FUNCTION)){return true}if(a&&(SC.typeOf(a)===SC.T_STRING)&&(a.indexOf(".")!=-1)){return true
}return false},_triggerLegacyActionHandler:function(evt){if(!this._hasLegacyActionHandler()){return false
}var action=this.get("action");if(SC.typeOf(action)===SC.T_FUNCTION){this.action(evt)
}if(SC.typeOf(action)===SC.T_STRING){eval("this.action = function(e) { return "+action+"(this, e); };");
this.action(evt)}},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){var b=this.$()[0];if(b){b.focus()
}}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},didAppendToDocument:function(){if(parseInt(SC.browser.msie,0)===7&&this.get("useStaticLayout")){var e=this.get("layout"),d=this.$(),a=0;
if(d&&d[0]&&(a=d[0].clientWidth)&&a!==0&&this._labelMinWidthIE7===0){var c=this.$(".sc-button-label"),h=parseInt(c.css("paddingRight"),0),b=parseInt(c.css("paddingLeft"),0),g=parseInt(c.css("marginRight"),0),f=parseInt(c.css("marginLeft"),0);
if(g=="auto"){console.log(g+","+f+","+h+","+b)}if(!h&&isNaN(h)){h=0}if(!b&&isNaN(b)){b=0
}if(!g&&isNaN(g)){g=0}if(!f&&isNaN(f)){f=0}this._labelMinWidthIE7=a-(h+b)-(g+f);c.css("minWidth",this._labelMinWidthIE7+"px")
}else{this.invokeLater(this.didAppendToDocument,1)}}}});SC.TOGGLE_BEHAVIOR="toggle";
SC.PUSH_BEHAVIOR="push";SC.TOGGLE_ON_BEHAVIOR="on";SC.TOGGLE_OFF_BEHAVIOR="off";SC.HOLD_BEHAVIOR="hold";
SC.ButtonView.CLICK_AND_HOLD_DELAY=SC.browser.msie?600:300;SC.REGULAR_BUTTON_HEIGHT=24;
sc_require("panes/panel");sc_require("views/button");SC.BUTTON1_STATUS="button1";
SC.BUTTON2_STATUS="button2";SC.BUTTON3_STATUS="button3";SC.AlertPane=SC.PanelPane.extend({classNames:"sc-alert",delegate:null,icon:"sc-icon-alert-48",message:"",description:"",displayDescription:function(){var a=this.get("description");
if(!a||a.length===0){return a}a=SC.RenderContext.escapeHTML(a);return'<p class="description">'+a.split("\n").join('</p><p class="description">')+"</p>"
}.property("description").cacheable(),caption:"",displayCaption:function(){var a=this.get("caption");
if(!a||a.length===0){return a}a=SC.RenderContext.escapeHTML(a);return'<p class="caption">'+a.split("\n").join('</p><p class="caption">')+"</p>"
}.property("caption").cacheable(),buttonOne:SC.outlet("contentView.childViews.1.childViews.1"),buttonTwo:SC.outlet("contentView.childViews.1.childViews.0"),buttonThree:SC.outlet("contentView.childViews.2.childViews.0"),buttonThreeWrapper:SC.outlet("contentView.childViews.2"),layout:{top:0.3,centerX:0,width:500},contentView:SC.View.extend({useStaticLayout:YES,layout:{left:0,right:0,top:0,height:"auto"},childViews:[SC.View.extend(SC.StaticLayout,{classNames:["info"],render:function(a,d){var c=this.get("pane");
var b=SC.BLANK_IMAGE_URL;if(c.get("icon")=="blank"){a.addClass("plain")}a.push('<img src="'+b+'" class="icon '+c.get("icon")+'" />');
a.begin("h1").attr("class","header").text(c.get("message")||"").end();a.push(c.get("displayDescription")||"");
a.push(c.get("displayCaption")||"");a.push('<div class="separator"></div>')}}),SC.View.extend({layout:{bottom:13,height:24,right:18,width:466},childViews:["cancelButton","okButton"],classNames:["text-align-right"],cancelButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON2_STATUS,localize:YES,titleMinWidth:64,layout:{right:5,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Cancel",isCancel:YES,action:"dismiss",isVisible:NO}),okButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON1_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"OK",isDefault:YES,action:"dismiss"})}),SC.View.extend({layout:{bottom:13,height:24,left:18,width:150},isVisible:NO,childViews:[SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON3_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Extra",action:"dismiss",isVisible:NO})]})]}),dismiss:function(b){var a=this.delegate;
if(a&&a.alertPaneDidDismiss){a.alertPaneDidDismiss(this,b.get("actionKey"))}this.remove()
},alertInfoDidChange:function(){var a=this.getPath("contentView.childViews.0");if(a){a.displayDidChange()
}}.observes("icon","message","displayDescription","displayCaption")});SC.AlertPane._normalizeArguments=function(b){b=SC.A(b);
var a=b.length,c=b[a-1];if(SC.typeOf(c)!==SC.T_STRING){b[a-1]=null}else{c=null}b[7]=c;
return b};SC.AlertPane.show=function(u,n,r,b,c,s,a,g){var f=this._normalizeArguments(arguments);
var e=this.create({message:f[0]||"",description:f[1]||null,caption:f[2]||null,icon:f[6]||"sc-icon-alert-48",delegate:f[7]});
var m="buttonOne buttonTwo buttonThree".w(),d,h;for(var l=0;l<3;l++){d=e.get(m[l]);
h=f[l+3];if(h){d.set("title",h).set("isVisible",YES);if(h=="?"){d.set("titleMinWidth",0)
}if(l==2){var q=e.get("buttonThreeWrapper");q.set("isVisible",YES)}}}var k=e.append();
e.adjust("height",e.childViews[0].$().height());e.updateLayout();return k};SC.AlertPane.warn=function(e,d,a,h,f,g,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-alert-48";return this.show.apply(this,b)};SC.AlertPane.info=function(e,d,a,h,f,g,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-info-48";return this.show.apply(this,b)};SC.AlertPane.error=function(e,d,a,h,f,g,c){var b=this._normalizeArguments(arguments);
b[6]="sc-icon-error-48";return this.show.apply(this,b)};SC.AlertPane.plain=function(e,d,a,h,f,g,c){var b=this._normalizeArguments(arguments);
b[6]="blank";return this.show.apply(this,b)};sc_require("panes/panel");SC.PalettePane=SC.PanelPane.extend({classNames:"sc-palette",isModal:NO,modalPane:SC.ModalPane,isAnchored:NO,_mouseOffsetX:null,_mouseOffsetY:null,mouseDown:function(a){var b=this.get("frame");
this._mouseOffsetX=b?(b.x-a.pageX):0;this._mouseOffsetY=b?(b.y-a.pageY):0;return YES
},mouseDragged:function(a){if(!this.isAnchored){this.set("layout",{width:this.layout.width,height:this.layout.height,left:this._mouseOffsetX+a.pageX,top:this._mouseOffsetY+a.pageY});
this.updateLayout()}return YES},touchStart:function(a){return this.mouseDown(a)},touchesDragged:function(a){return this.mouseDragged(a)
}});sc_require("panes/palette");SC.PICKER_MENU="menu";SC.PICKER_FIXED="fixed";SC.PICKER_POINTER="pointer";
SC.PICKER_MENU_POINTER="menu-pointer";SC.POINTER_LAYOUT=["perfectRight","perfectLeft","perfectTop","perfectBottom"];
SC.PickerPane=SC.PalettePane.extend({classNames:"sc-picker",isAnchored:YES,isModal:YES,pointerPos:"perfectRight",pointerPosX:0,pointerPosY:0,anchorElement:null,anchorCached:null,preferType:null,preferMatrix:null,pointerOffset:null,extraRightOffset:0,popup:function(d,c,e,a){var b;
if(d){b=d.isView?d.get("layer"):d}this.beginPropertyChanges();this.set("anchorElement",b);
if(c){this.set("preferType",c)}if(e){this.set("preferMatrix",e)}if(a){this.set("pointerOffset",a)
}this.endPropertyChanges();this.positionPane();this.append()},positionPane:function(f){var f=f&&this.get("anchorCached"),b=f?this.get("anchorCached"):this.get("anchorElement"),c=this.get("preferType"),d=this.get("preferMatrix"),e=this.get("layout"),a;
if(b){if(!f){b=this.computeAnchorRect(b);this.set("anchorCached",b)}if(b.x===0&&b.y===0){return
}a=SC.cloneRect(b);if(c){switch(c){case SC.PICKER_MENU:case SC.PICKER_FIXED:if(!d||d.length!==3){this.set("preferMatrix",[1,4,3])
}a.x+=((this.preferMatrix[2]===0)?a.width:0)+this.preferMatrix[0];a.y+=((this.preferMatrix[2]===3)?a.height:0)+this.preferMatrix[1];
break;default:a.y+=a.height;break}}else{a.y+=a.height}a=this.fitPositionToScreen(a,this.get("frame"),b);
this.adjust({width:a.width,height:a.height,left:a.x,top:a.y})}else{this.adjust({width:e.width,height:e.height,centerX:0,centerY:0})
}this.updateLayout();return this},computeAnchorRect:function(c){var e,b,d,a=SC.RootResponder.responder.computeWindowSize();
if(c.getBoundingClientRect){e=c.getBoundingClientRect();b={x:e.left,y:e.top,width:e.width,height:e.height};
if(b.width===undefined||b.height===undefined){d=SC.$(c);b.width=d.outerWidth();b.height=d.outerHeight()
}}else{b=SC.viewportOffset(c);d=SC.$(c);b.width=d.outerWidth();b.height=d.outerHeight()
}b.height=(a.height-b.y)<b.height?(a.height-b.y):b.height;if(!SC.browser.msie&&window.scrollX>0||window.scrollY>0){b.x+=window.scrollX;
b.y+=window.scrollY}else{if(SC.browser.msie&&(document.documentElement.scrollTop>0||document.documentElement.scrollLeft>0)){b.x+=document.documentElement.scrollLeft;
b.y+=document.documentElement.scrollTop}}return b},fitPositionToScreen:function(e,c,b){var a=SC.RootResponder.responder.computeWindowSize(),d={x:0,y:0,width:a.width,height:a.height};
c.x=e.x;c.y=e.y;if(this.preferType){switch(this.preferType){case SC.PICKER_MENU:c=this.fitPositionToScreenMenu(d,c,this.get("isSubMenu"));
break;case SC.PICKER_MENU_POINTER:this.setupPointer(b);c=this.fitPositionToScreenMenuPointer(d,c,b);
break;case SC.PICKER_POINTER:this.setupPointer(b);c=this.fitPositionToScreenPointer(d,c,b);
break;case SC.PICKER_FIXED:break;default:break}}else{c=this.fitPositionToScreenDefault(d,c,b)
}this.displayDidChange();this._hideOverflow();return c},fitPositionToScreenDefault:function(c,d,b){if(SC.maxX(d)>c.width){var e=Math.max(SC.maxX(b),d.width);
d.x=Math.min(e,c.width)-d.width}if(SC.minX(d)<0){d.x=SC.minX(Math.max(b,0));if(SC.maxX(d)>c.width){d.x=Math.max(0,c.width-d.width)
}}if(SC.maxY(d)>c.height){e=Math.max((b.y-d.height),0);if(e>c.height){d.y=Math.max(0,c.height-d.height)
}else{d.y=e}}if(SC.minY(d)<0){e=Math.min(SC.maxY(b),(c.height-b.height));d.y=Math.max(e,0)
}return d},fitPositionToScreenMenu:function(c,b,a){if(a){b.x-=this.get("submenuOffsetX");
b.y-=Math.floor(this.get("menuHeightPadding")/2)}if((b.x+b.width)>(c.width-20)){if(a){b.x=b.x-(b.width*2)
}else{b.x=c.width-b.width-20}}if(b.x<7){b.x=7}if(b.y<7){b.height+=b.y;b.y=7}if(b.height+b.y+35>=c.height){if(b.height+50>=c.height){b.y=SC.MenuPane.VERTICAL_OFFSET;
b.height=c.height-(SC.MenuPane.VERTICAL_OFFSET*2)}else{b.y+=(c.height-(b.height+b.y+35))
}}return b},fitPositionToScreenMenuPointer:function(c,d,b){d=this.fitPositionToScreenPointer(c,d,b);
if(d.height+d.y+35>=c.height){d.height=c.height-d.y-(SC.MenuPane.VERTICAL_OFFSET*2)
}return d},fitPositionToScreenPointer:function(r,n,q){var h=[this.pointerOffset[0],this.pointerOffset[1],this.pointerOffset[2],this.pointerOffset[3]];
var e=[[q.x+q.width+h[0],q.y+parseInt(q.height/2,0)-40],[q.x-n.width+h[1],q.y+parseInt(q.height/2,0)-40],[q.x+parseInt((q.width/2)-(n.width/2),0),q.y-n.height+h[2]],[q.x+parseInt((q.width/2)-(n.width/2),0),q.y+q.height+h[3]]];
var c=[[q.x+q.width+n.width+h[0],q.y+parseInt(q.height/2,0)+n.height-24],[q.x+h[1],q.y+parseInt(q.height/2,0)+n.height-24],[q.x+parseInt((q.width/2)-(n.width/2),0)+n.width,q.y+h[2]],[q.x+parseInt((q.width/2)-(n.width/2),0)+n.width,q.y+q.height+n.height+h[3]]];
var g=[[e[0][1]>0?0:0-e[0][1],c[0][0]<r.width?0:c[0][0]-r.width,c[0][1]<r.height?0:c[0][1]-r.height,e[0][0]>0?0:0-e[0][0]],[e[1][1]>0?0:0-e[1][1],c[1][0]<r.width?0:c[1][0]-r.width,c[1][1]<r.height?0:c[1][1]-r.height,e[1][0]>0?0:0-e[1][0]],[e[2][1]>0?0:0-e[2][1],c[2][0]<r.width?0:c[2][0]-r.width,c[2][1]<r.height?0:c[2][1]-r.height,e[2][0]>0?0:0-e[2][0]],[e[3][1]>0?0:0-e[3][1],c[3][0]<r.width?0:c[3][0]-r.width,c[3][1]<r.height?0:c[3][1]-r.height,e[3][0]>0?0:0-e[3][0]]];
var d=this.preferMatrix;if(d[4]===-1){n.x=q.x+parseInt(q.width/2,0);n.y=q.y+parseInt(q.height/2,0)-parseInt(n.height/2,0);
this.set("pointerPos",SC.POINTER_LAYOUT[0]+" fallback");this.set("pointerPosY",parseInt(n.height/2,0)-40)
}else{n.x=e[d[4]][0];n.y=e[d[4]][1];this.set("pointerPos",SC.POINTER_LAYOUT[d[4]]);
this.set("pointerPosY",0)}this.set("pointerPosX",0);for(var k=0,b,l=SC.POINTER_LAYOUT.length;
k<l;k++){b=d[k];if(g[b][0]===0&&g[b][1]===0&&g[b][2]===0&&g[b][3]===0){if(d[4]!==b){n.x=e[b][0];
n.y=e[b][1];this.set("pointerPosY",0);this.set("pointerPos",SC.POINTER_LAYOUT[b])
}k=SC.POINTER_LAYOUT.length}else{if((b===0||b===1)&&g[b][0]===0&&g[b][1]===0&&g[b][2]<n.height-91&&g[b][3]===0){if(d[4]!==b){n.x=e[b][0];
this.set("pointerPos",SC.POINTER_LAYOUT[b])}n.y=e[b][1]-g[b][2];this.set("pointerPosY",g[b][2]);
k=SC.POINTER_LAYOUT.length}else{if((b===0||b===1)&&g[b][0]===0&&g[b][1]===0&&g[b][2]<=n.height-51&&g[b][3]===0){if(d[4]!==b){n.x=e[b][0]
}n.y=e[b][1]-(n.height-51);this.set("pointerPosY",(n.height-53));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-low");
k=SC.POINTER_LAYOUT.length}else{if((b===2||b===3)&&g[b][0]===0&&g[b][1]<=parseInt(n.width/2,0)-this.get("extraRightOffset")&&g[b][2]===0&&g[b][3]===0){if(d[4]!==b){n.y=e[b][1]
}n.x=e[b][0]-(parseInt(n.width/2,0)-this.get("extraRightOffset"));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-right");
k=SC.POINTER_LAYOUT.length}else{if((b===2||b===3)&&g[b][0]===0&&g[b][1]===0&&g[b][2]===0&&g[b][3]<=parseInt(n.width/2,0)-this.get("extraRightOffset")){if(d[4]!==b){n.y=e[b][1]
}n.x=e[b][0]+(parseInt(n.width/2,0)-this.get("extraRightOffset"));this.set("pointerPos",SC.POINTER_LAYOUT[b]+" extra-left");
k=SC.POINTER_LAYOUT.length}}}}}}return n},setupPointer:function(f){var g=this.pointerOffset,e=SC.PickerPane;
if(!g||g.length!==4){if(this.get("preferType")==SC.PICKER_MENU_POINTER){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.set("pointerOffset",e.TINY_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",e.TINY_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.SMALL_CONTROL_SIZE:this.set("pointerOffset",e.SMALL_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",e.SMALL_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.REGULAR_CONTROL_SIZE:this.set("pointerOffset",e.REGULAR_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",e.REGULAR_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.LARGE_CONTROL_SIZE:this.set("pointerOffset",e.LARGE_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",e.LARGE_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.HUGE_CONTROL_SIZE:this.set("pointerOffset",e.HUGE_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",e.HUGE_PICKER_MENU_EXTRA_RIGHT_OFFSET);break}}else{var d=(f.width<16)?((f.width<4)?9:6):0,b=(f.height<16)?((f.height<4)?9:6):0,c=e.PICKER_POINTER_OFFSET;
var h=[c[0]+d,c[1]-d,c[2]-b,c[3]+b];this.set("pointerOffset",h);this.set("extraRightOffset",e.PICKER_EXTRA_RIGHT_OFFSET)
}}if(!this.preferMatrix||this.preferMatrix.length!==5){this.set("preferMatrix",this.get("preferType")==SC.PICKER_MENU_POINTER?[3,0,1,2,3]:[0,1,2,3,2])
}},displayProperties:["pointerPosY"],render:function(b,d){var a=arguments.callee.base.apply(this,arguments);
if(b.needsContent){if(this.get("preferType")==SC.PICKER_POINTER||this.get("preferType")==SC.PICKER_MENU_POINTER){b.push('<div class="sc-pointer '+this.get("pointerPos")+'" style="margin-top: '+this.get("pointerPosY")+'px"></div>');
b.addClass(this.get("pointerPos"))}}else{if(this.get("preferType")==SC.PICKER_POINTER||this.get("preferType")==SC.PICKER_MENU_POINTER){var c=this.$(".sc-pointer");
c.attr("class","sc-pointer "+this.get("pointerPos"));c.attr("style","margin-top: "+this.get("pointerPosY")+"px");
b.addClass(this.get("pointerPos"))}}return a},modalPaneDidClick:function(a){var b=this.get("frame");
if(!this.clickInside(b,a)){this.remove()}return YES},mouseDown:function(a){return this.modalPaneDidClick(a)
},clickInside:function(b,a){return SC.pointInRect({x:a.pageX,y:a.pageY},b)},windowSizeDidChange:function(b,a){this.positionPane()
},remove:function(){this._showOverflow();return arguments.callee.base.apply(this,arguments)
},_hideOverflow:function(){var b=SC.$(document.body),a=SC.$(".sc-main"),d=parseInt(a.css("minWidth"),0),e=parseInt(a.css("minHeight"),0),c=SC.RootResponder.responder.get("currentWindowSize");
if(c.width>=d&&c.height>=e){b.css("overflow","hidden")}},_showOverflow:function(){var a=SC.$(document.body);
a.css("overflow","visible")}});SC.PickerPane.PICKER_POINTER_OFFSET=[9,-9,-18,18];
SC.PickerPane.PICKER_EXTRA_RIGHT_OFFSET=20;SC.PickerPane.TINY_PICKER_MENU_POINTER_OFFSET=[9,-9,-18,18];
SC.PickerPane.TINY_PICKER_MENU_EXTRA_RIGHT_OFFSET=12;SC.PickerPane.SMALL_PICKER_MENU_POINTER_OFFSET=[9,-9,-8,8];
SC.PickerPane.SMALL_PICKER_MENU_EXTRA_RIGHT_OFFSET=11;SC.PickerPane.REGULAR_PICKER_MENU_POINTER_OFFSET=[9,-9,-12,12];
SC.PickerPane.REGULAR_PICKER_MENU_EXTRA_RIGHT_OFFSET=13;SC.PickerPane.LARGE_PICKER_MENU_POINTER_OFFSET=[9,-9,-16,16];
SC.PickerPane.LARGE_PICKER_MENU_EXTRA_RIGHT_OFFSET=17;SC.PickerPane.HUGE_PICKER_MENU_POINTER_OFFSET=[9,-9,-18,18];
SC.PickerPane.HUGE_PICKER_MENU_EXTRA_RIGHT_OFFSET=12;SC.SeparatorView=SC.View.extend({classNames:["sc-separator-view"],tagName:"span",layoutDirection:SC.LAYOUT_HORIZONTAL,render:function(a,b){if(b){a.push("<span></span>")
}a.addClass(this.get("layoutDirection"))}});sc_require("views/button");sc_require("views/separator");
SC.MenuItemView=SC.View.extend(SC.ContentDisplay,{displayProperties:["title","isEnabled","isSeparator"],classNames:["sc-menu-item"],escapeHTML:YES,acceptsFirstResponder:YES,blocksIEDeactivate:YES,isContextMenuEnabled:NO,content:null,isSeparator:function(){return this.getContentProperty("itemSeparatorKey")===YES
}.property("content").cacheable(),isEnabled:function(){return this.getContentProperty("itemIsEnabledKey")!==NO&&this.getContentProperty("itemSeparatorKey")!==YES
}.property("content.isEnabled").cacheable(),subMenu:function(){var c=this.get("content"),b,a;
if(!c){return null}a=this.get("parentMenu");b=c.get(a.itemSubMenuKey);if(b){if(SC.kindOf(b,SC.MenuPane)){b.set("isModal",NO);
b.set("isSubMenu",YES);b.set("parentMenu",a);return b}else{return SC.MenuPane.create({layout:{width:200},items:b,isModal:NO,isSubMenu:YES,parentMenu:a,controlSize:a.get("controlSize")})
}}return null}.property("content").cacheable(),hasSubMenu:function(){return !!this.get("subMenu")
}.property("subMenu").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.contentDidChange()},render:function(b,h){var c=this.get("content"),a,f,e=this.get("parentMenu"),d=this.get("itemWidth")||e.layout.width,g=this.get("itemHeight")||SC.DEFAULT_MENU_ITEM_HEIGHT;
this.set("itemWidth",d);this.set("itemHeight",g);b=b.begin("a").addClass("menu-item");
if(c.get(e.itemSeparatorKey)){b.push('<span class="separator"></span>');b.addClass("disabled")
}else{f=c.get(e.itemIconKey);if(f){this.renderImage(b,f);b.addClass("has-icon")}f=this.get("title");
if(SC.typeOf(f)!==SC.T_STRING){f=f.toString()}this.renderLabel(b,f);if(this.getContentProperty("itemCheckboxKey")){b.push('<div class="checkbox"></div>')
}if(this.get("hasSubMenu")){this.renderBranch(b)}f=this.getContentProperty("itemShortCutKey");
if(f){this.renderShortcut(b,f)}}b=b.end()},renderImage:function(b,d){var a,c;if(d&&SC.ImageView.valueIsUrl(d)){a=d;
c=""}else{c=d;a=SC.BLANK_IMAGE_URL}b.begin("img").addClass("image").addClass(c).attr("src",a).end()
},renderLabel:function(b,a){if(this.get("escapeHTML")){a=SC.RenderContext.escapeHTML(a)
}b.push("<span class='value ellipsis'>"+a+"</span>")},renderBranch:function(a){a.push('<span class="has-branch"></span>')
},renderShortcut:function(b,a){b.push('<span class = "shortcut">'+a+"</span>")},showSubMenu:function(){var a=this.get("subMenu");
if(a){a.set("mouseHasEntered",NO);a.popup(this,[0,0,0])}this._subMenuTimer=null},title:function(){var b=this.getContentProperty("itemTitleKey"),a=this.getPath("parentMenu.localize");
if(a&&b){b=b.loc()}return b||""}.property("content.title").cacheable(),getContentProperty:function(b){var a=this.get("content"),c=this.get("parentMenu");
if(a){return a.get(c.get(b))}},mouseUp:function(b){var a;a=this.getPath("parentMenu.rootMenu.targetMenuItem");
if(a){a.performAction()}return YES},performAction:function(){if(!this.get("isEnabled")||this.get("hasSubMenu")){return NO
}var b=this.getContentProperty("itemDisableMenuFlashKey"),a;if(b){this.sendAction()
}else{this._flashCounter=0;a=this.getPath("parentMenu.rootMenu");a._isFlashing=YES;
this.invokeLater(this.flashHighlight,25);this.invokeLater(this.sendAction,150)}return YES
},sendAction:function(){var c=this.getContentProperty("itemActionKey"),d=this.getContentProperty("itemTargetKey"),b=this.getPath("parentMenu.rootMenu"),a;
this.getPath("parentMenu.rootMenu").remove();b._isFlashing=NO;c=(c===undefined)?b.get("action"):c;
d=(d===undefined)?b.get("target"):d;b.set("selectedItem",this.get("content"));if(SC.typeOf(c)===SC.T_FUNCTION){c.apply(d,[b]);
SC.Logger.warn("Support for menu item action functions has been deprecated. Please use target and action.")
}else{a=this.getPath("pane.rootResponder")||SC.RootResponder.responder;if(a){a.sendAction(c,d,this)
}}},flashHighlight:function(){var a=this._flashCounter,b=this.$();if(a%2===0){b.addClass("focus")
}else{b.removeClass("focus")}if(a<=2){this.invokeLater(this.flashHighlight,50);this._flashCounter++
}},mouseDown:function(a){return YES},mouseEntered:function(a){var c=this.get("parentMenu"),b=c.get("rootMenu");
if(b._isFlashing){return}c.set("mouseHasEntered",YES);this.set("mouseHasEntered",YES);
c.set("currentMenuItem",this);if(this.get("isEnabled")){this.becomeFirstResponder()
}if(this.get("hasSubMenu")){this._subMenuTimer=this.invokeLater(this.showSubMenu,100)
}return YES},mouseExited:function(a){var b,c;if(this.get("hasSubMenu")){c=this._subMenuTimer;
if(c){c.invalidate()}else{this.invokeLater(this.checkMouseLocation,100)}}else{b=this.get("parentMenu");
if(b.get("currentMenuItem")===this){b.set("currentMenuItem",null)}}return YES},touchStart:function(a){this.mouseEntered(a);
return YES},touchEnd:function(a){return this.mouseUp(a)},touchEntered:function(a){return this.mouseEntered(a)
},touchExited:function(a){return this.mouseExited(a)},checkMouseLocation:function(){var b=this.get("subMenu"),c=this.get("parentMenu"),a,d;
if(!b.get("mouseHasEntered")){a=c.get("currentMenuItem");if(a===this||a===null){d=c.get("previousMenuItem");
if(d){d.resignFirstResponder()}this.resignFirstResponder();b.remove()}}},moveUp:function(b,a){var c=this.get("parentMenu");
if(c){c.moveUp(this)}return YES},moveDown:function(b,a){var c=this.get("parentMenu");
if(c){c.moveDown(this)}return YES},moveRight:function(b,a){this.showSubMenu();return YES
},insertText:function(b,a){var c=this.get("parentMenu");if(c){c.insertText(b,a)}},keyDown:function(a){return this.interpretKeyEvents(a)
},keyUp:function(a){return YES},cancel:function(a){this.getPath("parentMenu.rootMenu").remove();
return YES},didBecomeFirstResponder:function(a){if(a!==this){return}var b=this.get("parentMenu");
if(b){b.set("currentSelectedMenuItem",this)}},willLoseFirstResponder:function(a){if(a!==this){return
}var b=this.get("parentMenu");if(b){b.set("currentSelectedMenuItem",null);b.set("previousSelectedMenuItem",this)
}},insertNewline:function(b,a){this.mouseUp(a)},closeParent:function(){this.$().removeClass("focus");
var a=this.get("parentMenu");if(a){a.remove()}},clickInside:function(b,a){return SC.pointInRect({x:a.pageX,y:a.pageY},b)
},contentDidChange:function(){var b=this.get("content"),a=this._content;if(b===a){return
}var c=this.contentPropertyDidChange;if(a&&a.removeObserver){a.removeObserver("*",this,c)
}this._content=b;if(b&&b.addObserver){b.addObserver("*",this,c)}this.contentPropertyDidChange(b,"*")
}.observes("content"),contentPropertyDidChange:function(g,k){var b=this.get("parentMenu");
if(!b){return}var a=SC.MenuItemView._contentPropertyToMenuItemPropertyMapping,h=SC.keys(a),e,f,d,c;
if(k==="*"){for(e=0,f=h.length;e<f;++e){d=h[e];c=a[d];this.notifyPropertyChange(c)
}}else{for(e=0,f=h.length;e<f;++e){d=h[e];if(b.get(d)===k){c=a[d];this.notifyPropertyChange(c)
}}}}});SC.MenuItemView._contentPropertyToMenuItemPropertyMapping={itemTitleKey:"title",itemIsEnabledKey:"isEnabled",itemSeparatorKey:"isSeparator",itemSubMenuKey:"subMenu"};
require("panes/picker");require("views/menu_item");SC.MenuPane=SC.PickerPane.extend({classNames:["sc-menu"],items:[],controlSize:SC.REGULAR_CONTROL_SIZE,itemHeight:null,itemSeparatorHeight:null,menuHeight:0,menuHeightPadding:null,submenuOffsetX:null,selectedItem:null,exampleView:SC.MenuItemView,anchor:null,isSubMenu:NO,localize:YES,acceptsMenuPane:YES,isContextMenuEnabled:NO,popup:function(b,c){var a;
this.beginPropertyChanges();if(b){a=b.isView?b.get("layer"):b}this.set("anchorElement",a);
this.set("anchor",b);if(c){this.set("preferMatrix",c)}this.adjust("height",this.get("menuHeight"));
this.positionPane();this.set("defaultResponder",this);this.endPropertyChanges();this.append()
},remove:function(){var a=this.get("parentMenu");this.set("currentMenuItem",null);
this.closeOpenMenus();this.resignMenuPane();if(a){a.becomeMenuPane()}return arguments.callee.base.apply(this,arguments)
},itemTitleKey:"title",itemIsEnabledKey:"isEnabled",itemValueKey:"value",itemIconKey:"icon",itemHeightKey:"height",itemSubMenuKey:"subMenu",itemSeparatorKey:"separator",itemTargetKey:"target",itemActionKey:"action",itemCheckboxKey:"checkbox",itemShortCutKey:"shortcut",itemKeyEquivalentKey:"keyEquivalent",itemDisableMenuFlashKey:"disableMenuFlash",menuItemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemSeparatorKey itemActionKey itemCheckboxKey itemShortCutKey itemHeightKey itemSubMenuKey itemKeyEquivalentKey itemTargetKey".w(),preferType:SC.PICKER_MENU,isModal:YES,_menuView:null,init:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.TINY_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.TINY_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.TINY_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.TINY_SUBMENU_OFFSET_X);
break;case SC.SMALL_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.SMALL_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.SMALL_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.SMALL_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.SMALL_SUBMENU_OFFSET_X);
break;case SC.REGULAR_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.REGULAR_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.REGULAR_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.REGULAR_SUBMENU_OFFSET_X);
break;case SC.LARGE_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.LARGE_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.LARGE_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.LARGE_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.LARGE_SUBMENU_OFFSET_X);
break;case SC.HUGE_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.HUGE_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.HUGE_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.HUGE_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.HUGE_SUBMENU_OFFSET_X);
break}return arguments.callee.base.apply(this,arguments)},setIfNull:function(a,b){if(this.get(a)===null){this.set(a,b)
}},render:function(a,b){a.addClass(this.get("controlSize"));return arguments.callee.base.apply(this,arguments)
},createChildViews:function(){var b,a,c;b=this.createChildView(SC.MenuScrollView,{borderStyle:SC.BORDER_NONE,controlSize:this.get("controlSize")});
a=this._menuView=SC.View.create();c=this.get("menuItemViews");a.set("layout",{top:0,left:0,height:this.get("menuHeight")});
a.replaceAllChildren(c);b.set("contentView",a);this.childViews=[b];return this},paneDidAttach:function(){var a=(this.rootResponder=SC.RootResponder.responder);
a.panes.add(this);this.set("currentWindowSize",a.computeWindowSize());this.set("isPaneAttached",YES);
this.parentViewDidChange();this._notifyDidAppendToDocument();this.becomeMenuPane();
return this},becomeMenuPane:function(){if(this.rootResponder){this.rootResponder.makeMenuPane(this)
}return this},resignMenuPane:function(){if(this.rootResponder){this.rootResponder.makeMenuPane(null)
}return this},menuItemViews:function(){var s=[],n=this.get("displayItems"),l=this.get("exampleView"),v,q,u,c,m,b,f,e,h,a,g,d,r,k;
if(!n){return s}c=this.get("itemHeightKey");m=this.get("itemSeparatorKey");b=this.get("itemHeight");
a=this.get("itemKeyEquivalentKey");f=this.get("itemSeparatorHeight");h=Math.floor(this.get("menuHeightPadding")/2);
e=h;d=this.menuItemKeys.map(SC._menu_fetchKeys,this);k=n.get("length");for(r=0;r<k;
r++){v=n[r];u=v.get(c);if(!u){u=v.get(m)?f:b}q=this._menuView.createChildView(l,{layout:{height:u,top:e},contentDisplayProperties:d,content:v,parentMenu:this});
s[r]=q;e+=u;g=v.get(a);if(g){this._keyEquivalents[g]=q}}this.set("menuHeight",e+h);
return s}.property("displayItems").cacheable(),menuItemViewForContentIndex:function(a){var b=this.get("menuItemViews");
if(!b){return undefined}return b.objectAt(a)},_keyEquivalents:{},rootMenu:function(){if(this.get("isSubMenu")){return this.getPath("parentMenu.rootMenu")
}return this}.property("isSubMenu").cacheable(),windowSizeDidChange:function(b,a){this.remove();
return arguments.callee.base.apply(this,arguments)},displayItems:function(){var d=this.get("items"),c=this.get("localize"),h=this.get("itemHeight"),b,e=[],a,f,g;
if(!d){return null}b=d.get("length");for(a=0;a<b;a++){f=d.objectAt(a);if(!f){continue
}g=SC.typeOf(f);if(g===SC.T_STRING){f=SC.Object.create({title:f,value:f,isEnabled:YES})
}else{if(g===SC.T_HASH){f=SC.Object.create(f)}else{if(g===SC.T_ARRAY){f=this.convertArrayMenuItemToObject(f)
}}}f.contentIndex=a;e.push(f)}return e}.property("items").cacheable(),_sc_menu_itemsDidChange:function(){var a=this.get("menuItemViews");
this._menuView.replaceAllChildren(a);this._menuView.adjust("height",this.get("menuHeight"))
}.observes("items"),convertArrayMenuItemToObject:function(f){SC.Logger.warn("Support for Array-based menu items has been deprecated.  Please update your menus to use a hash.");
var e,c=SC._menu_fetchKeys,b=SC._menu_fetchItem,h,d=SC.Object.create(),a,g;e=this.menuItemKeys.map(c,this);
d[e[0]]=f[0];d[e[1]]=f[1];d[e[2]]=f[2];d[e[3]]=f[3];d[e[4]]=f[4];d[e[5]]=f[5];d[e[6]]=f[6];
d[e[7]]=f[7];d[e[8]]=f[8];d[e[9]]=f[9];d[e[10]]=f[10];d[e[11]]=f[11];d[e[12]]=f[12];
return d},currentMenuItem:function(a,b){if(b!==undefined){if(this._currentMenuItem!==null){this.set("previousMenuItem",this._currentMenuItem)
}this._currentMenuItem=b;this.setPath("rootMenu.targetMenuItem",b);return b}return this._currentMenuItem
}.property().cacheable(),_sc_menu_currentMenuItemDidChange:function(){var a=this.get("currentMenuItem"),b=this.get("previousMenuItem");
if(b){if(b.get("hasSubMenu")&&a===null){}else{b.resignFirstResponder();this.closeOpenMenusFor(b)
}}if(a&&a.get("isEnabled")){a.scrollToVisible()}}.observes("currentMenuItem"),closeOpenMenusFor:function(a){if(!a){return
}var b=a.get("parentMenu");while(b&&a){b=a.get("subMenu");if(b){b.remove();a.resignFirstResponder();
a=b.get("previousMenuItem")}}},closeOpenMenus:function(){this.closeOpenMenusFor(this.get("previousMenuItem"))
},mouseDown:function(a){this.modalPaneDidClick();return YES},mouseEntered:function(a){this.set("mouseHasEntered",YES)
},keyUp:function(a){var b=this.interpretKeyEvents(a);return !b?NO:b},moveUp:function(){var c=this.get("currentMenuItem"),d=this.get("menuItemViews"),b,e,a;
if(!c){a=d.get("length")-1}else{b=c.getPath("content.contentIndex");if(b===0){return YES
}a=b-1}while(a>=0){if(d[a].get("isEnabled")){this.set("currentMenuItem",d[a]);d[a].becomeFirstResponder();
break}a--}return YES},moveDown:function(){var d=this.get("currentMenuItem"),e=this.get("menuItemViews"),b=e.get("length"),c,f,a;
if(!d){a=0}else{c=d.getPath("content.contentIndex");if(c===b){return YES}a=c+1}while(a<b){if(e[a].get("isEnabled")){this.set("currentMenuItem",e[a]);
e[a].becomeFirstResponder();break}a++}return YES},insertText:function(b,a){var d=this._timer,c=this._keyBuffer;
if(d){d.invalidate()}d=this._timer=SC.Timer.schedule({target:this,action:"clearKeyBuffer",interval:500,isPooled:NO});
c=c||"";c+=b.toUpperCase();this.selectMenuItemForString(c);this._keyBuffer=c;return YES
},performKeyEquivalent:function(b){if(!this.get("isVisibleInWindow")){return NO}var a=this._keyEquivalents[b];
if(a){a.performAction(YES);return YES}if(b==="escape"||b==="return"){this.remove();
return YES}return NO},selectMenuItemForString:function(c){var d=this.get("menuItemViews"),f,g,b,a,e;
if(!d){return}e=c.length;a=d.get("length");for(b=0;b<a;b++){f=d.objectAt(b);g=f.get("title");
if(!g){continue}g=g.replace(/ /g,"").substr(0,e).toUpperCase();if(g===c){this.set("currentMenuItem",f);
f.becomeFirstResponder();break}}},clearKeyBuffer:function(){this._keyBuffer=""},modalPaneDidClick:function(a){this.remove();
return YES}});SC._menu_fetchKeys=function(a){return this.get(a)};SC._menu_fetchItem=function(a){if(!a){return null
}return this.get?this.get(a):this[a]};SC.MenuPane.TINY_MENU_ITEM_HEIGHT=10;SC.MenuPane.TINY_MENU_ITEM_SEPARATOR_HEIGHT=2;
SC.MenuPane.TINY_MENU_HEIGHT_PADDING=2;SC.MenuPane.TINY_SUBMENU_OFFSET_X=0;SC.MenuPane.SMALL_MENU_ITEM_HEIGHT=16;
SC.MenuPane.SMALL_MENU_ITEM_SEPARATOR_HEIGHT=7;SC.MenuPane.SMALL_MENU_HEIGHT_PADDING=4;
SC.MenuPane.SMALL_SUBMENU_OFFSET_X=2;SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT=20;SC.MenuPane.REGULAR_MENU_ITEM_SEPARATOR_HEIGHT=9;
SC.MenuPane.REGULAR_MENU_HEIGHT_PADDING=6;SC.MenuPane.REGULAR_SUBMENU_OFFSET_X=2;
SC.MenuPane.LARGE_MENU_ITEM_HEIGHT=60;SC.MenuPane.LARGE_MENU_ITEM_SEPARATOR_HEIGHT=20;
SC.MenuPane.LARGE_MENU_HEIGHT_PADDING=0;SC.MenuPane.LARGE_SUBMENU_OFFSET_X=4;SC.MenuPane.HUGE_MENU_ITEM_HEIGHT=20;
SC.MenuPane.HUGE_MENU_ITEM_SEPARATOR_HEIGHT=9;SC.MenuPane.HUGE_MENU_HEIGHT_PADDING=0;
SC.MenuPane.HUGE_SUBMENU_OFFSET_X=0;SC.MenuPane.VERTICAL_OFFSET=23;sc_require("views/button");
SC.SelectButtonView=SC.ButtonView.extend({escapeHTML:YES,objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,iconKey:null,isEnabledKey:"isEnabled",localize:YES,disableSort:YES,classNames:["select-button"],menu:null,itemList:[],itemIdx:null,value:null,checkboxEnabled:YES,separatorPostion:null,_defaultVal:null,_defaultTitle:null,_defaultIcon:null,theme:"popup",displayProperties:["icon","value","controlSize","objects"],preferMatrix:null,SELECT_BUTTON_SPRITE_WIDTH:28,isActiveBinding:"*menu.isVisibleInWindow",isDefaultPosition:NO,lastMenuWidth:null,customView:null,customViewClassName:null,customViewMenuOffsetWidth:0,needsEllipsis:YES,menuPaneHeightPadding:0,supportFocusRing:YES,isContextMenuEnabled:NO,leftAlign:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:return SC.SelectButtonView.TINY_OFFSET_X;
case SC.SMALL_CONTROL_SIZE:return SC.SelectButtonView.SMALL_OFFSET_X;case SC.REGULAR_CONTROL_SIZE:return SC.SelectButtonView.REGULAR_OFFSET_X;
case SC.LARGE_CONTROL_SIZE:return SC.SelectButtonView.LARGE_OFFSET_X;case SC.HUGE_CONTROL_SIZE:return SC.SelectButtonView.HUGE_OFFSET_X
}return 0}.property("controlSize"),sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("sortKey")||this.get("nameKey");
b=b.sort(function(d,c){if(a){d=d.get?d.get(a):d[a];c=c.get?c.get(a):c[a]}return(d<c)?-1:((d>c)?1:0)
})}return b},render:function(b,e){arguments.callee.base.apply(this,arguments);var c,a,r,v,y,f,x,g,n,s,m,d,k,z,u,q,w,l,h;
c=this.layout.width;if(e&&c){this.adjust({width:c-this.SELECT_BUTTON_SPRITE_WIDTH})
}a=this.get("objects");a=this.sortObjects(a);r=a.length;v=this.get("nameKey");y=this.get("iconKey");
f=this.get("valueKey");h=this.get("isEnabledKey");x=this.get("checkboxEnabled");g=this.get("value");
n=this.get("localize");s=this.get("separatorPostion");m=[];d=YES;k=0;a.forEach(function(A){if(A){z=v?(A.get?A.get(v):A[v]):A.toString();
z=n?z.loc():z;u=y?(A.get?A.get(y):A[y]):null;if(SC.none(A[y])){u=null}q=(f)?(A.get?A.get(f):A[f]):A;
if(!SC.none(g)&&!SC.none(q)){if(g===q){this.set("title",z);this.set("icon",u)}}if(q===this.get("value")){this.set("itemIdx",k);
d=!x?NO:YES}else{d=NO}l=(h)?(A.get?A.get(h):A[h]):A;if(NO!==l){l=YES}if(k===0){this._defaultVal=q;
this._defaultTitle=z;this._defaultIcon=u}var B=SC.Object.create({title:z,icon:u,value:q,isEnabled:l,checkbox:d,target:this,action:"displaySelectedItem"});
m.push(B)}k+=1;if(s&&k===(r-s)){var C=SC.Object.create({separator:YES});m.push(C)
}this.set("itemList",m)},this);if(e){this.invokeLast(function(){var A=this.get("value");
if(SC.none(A)){this.set("value",this._defaultVal);this.set("title",this._defaultTitle);
this.set("icon",this._defaultIcon)}})}this.changeSelectButtonPreferMatrix(this.itemIdx)
},_action:function(s){var k,a,n,q,y,v,F,e,E,c,u,z,w,C,f,g,r,b,D,h,m,G,l;k=this.$(".sc-button-label")[0];
G=SC.SelectButtonView.MENU_WIDTH_OFFSET;if(!this.get("isDefaultPosition")){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:G+=SC.SelectButtonView.TINY_POPUP_MENU_WIDTH_OFFSET;
break;case SC.SMALL_CONTROL_SIZE:G+=SC.SelectButtonView.SMALL_POPUP_MENU_WIDTH_OFFSET;
break;case SC.REGULAR_CONTROL_SIZE:G+=SC.SelectButtonView.REGULAR_POPUP_MENU_WIDTH_OFFSET;
break;case SC.LARGE_CONTROL_SIZE:G+=SC.SelectButtonView.LARGE_POPUP_MENU_WIDTH_OFFSET;
break;case SC.HUGE_CONTROL_SIZE:G+=SC.SelectButtonView.HUGE_POPUP_MENU_WIDTH_OFFSET;
break}}a=this.get("layer").offsetWidth+G;n=k.scrollWidth;q=this.get("lastMenuWidth");
if(n){y=k.offsetWidth;if(n&&y){a=a+n-y}}if(!q||(a>q)){q=a}v=this.get("itemList");
var A=this.get("customViewClassName"),x=this.get("customViewMenuOffsetWidth"),d="sc-view sc-pane sc-panel sc-palette sc-picker sc-menu select-button sc-scroll-view sc-menu-scroll-view sc-container-view menuContainer sc-button-view sc-menu-item sc-regular-size";
d=A?(d+" "+A):d;h=(this.get("customView")||SC.MenuItemView).create();m=h.get("escapeHTML");
var l=document.body;for(u=0,D=v.length;u<D;++u){E=v.objectAt(u);c=document.createElement("div");
c.style.cssText="top:-10000px; left: -10000px;  position: absolute;";c.className=d;
c.innerHTML=m?SC.RenderContext.escapeHTML(E.title):E.title;l.appendChild(c);F=c.offsetWidth+x;
if(!e||(F>e)){e=F}l.removeChild(c)}e=(e>q)?e:q;var B=SC.RootResponder.responder.get("currentWindowSize").width;
if(e>B){e=(B-25)}this.set("lastMenuWidth",q);z=this.get("value");w=this.get("itemList");
C=this.get("controlSize");g=this.get("customView");r=g?g:SC.MenuItemView;b=SC.MenuPane.create({classNames:["select-button"],items:w,exampleView:r,isEnabled:YES,preferType:SC.PICKER_MENU,itemHeightKey:"height",layout:{width:e},controlSize:C,itemWidth:q,performKeyEquivalent:function(I,H){switch(I){case"tab":case"shift_tab":return YES;
default:return arguments.callee.base.apply(this,arguments)}}});if(!b){return NO}b.popup(this,this.preferMatrix);
this.set("menu",b);g=b.menuItemViewForContentIndex(this.get("itemIdx"));b.set("currentMenuItem",g);
if(g){g.becomeFirstResponder()}this.set("isActive",YES);return YES},displaySelectedItem:function(a){var b=this.getPath("menu.selectedItem");
if(!b){return NO}this.set("value",b.get("value"));this.set("title",b.get("title"));
this.set("itemIdx",b.get("contentIndex"));return YES},changeSelectButtonPreferMatrix:function(){var c=0,g=0;
switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:c=SC.SelectButtonView.TINY_OFFSET_Y;
g=SC.MenuPane.TINY_MENU_ITEM_HEIGHT;break;case SC.SMALL_CONTROL_SIZE:c=SC.SelectButtonView.SMALL_OFFSET_Y;
g=SC.MenuPane.SMALL_MENU_ITEM_HEIGHT;break;case SC.REGULAR_CONTROL_SIZE:c=SC.SelectButtonView.REGULAR_OFFSET_Y;
g=SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT;break;case SC.LARGE_CONTROL_SIZE:c=SC.SelectButtonView.LARGE_OFFSET_Y;
g=SC.MenuPane.LARGE_MENU_ITEM_HEIGHT;break;case SC.HUGE_CONTROL_SIZE:c=SC.SelectButtonView.HUGE_OFFSET_Y;
g=SC.MenuPane.HUGE_MENU_ITEM_HEIGHT;break}var e=c,b=this.get("itemIdx"),a=this.get("leftAlign"),f,d;
if(this.get("isDefaultPosition")){f=[1,0,3];this.set("preferMatrix",f)}else{if(b){e=b*g+c
}d=[a,-e,2];this.set("preferMatrix",d)}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;this.becomeFirstResponder();this._action();
this.invokeLast(this._recordMouseDownTimestamp);return YES},_recordMouseDownTimestamp:function(){this._menuRenderedTimestamp=new Date().getTime()
},mouseUp:function(b){var d=new Date().getTime(),c=this._menuRenderedTimestamp,e=this.get("menu"),f=SC.platform.touch,a;
if(e){a=e.getPath("rootMenu.targetMenuItem");if(a&&a.get("mouseHasEntered")){if(!a.performAction()){e.remove()
}}else{if(!f&&(d-c>SC.ButtonView.CLICK_AND_HOLD_DELAY)){if(!e.get("mouseHasEntered")&&!this.get("isDefaultPosition")){a=e.get("currentMenuItem");
if(a&&!a.performAction()){e.remove()}}else{e.remove()}}}}this._isMouseDown=NO;return YES
},mouseExited:function(){return YES},keyDown:function(a){if(this.interpretKeyEvents(a)){return YES
}else{return arguments.callee.base.apply(this,arguments)}},interpretKeyEvents:function(a){if(a){if((a.keyCode===38||a.keyCode===40)){this._action()
}else{if(a.keyCode===27){this.resignFirstResponder()}}}return arguments.callee.base.apply(this,arguments)
},acceptsFirstResponder:function(){return this.get("isEnabled")}.property("isEnabled"),_button_isSelectedDidChange:function(){}.observes("isSelected"),didAppendToDocument:function(){}});
SC.SelectButtonView.TINY_OFFSET_X=0;SC.SelectButtonView.TINY_OFFSET_Y=0;SC.SelectButtonView.TINY_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectButtonView.SMALL_OFFSET_X=-18;SC.SelectButtonView.SMALL_OFFSET_Y=3;SC.SelectButtonView.SMALL_POPUP_MENU_WIDTH_OFFSET=7;
SC.SelectButtonView.REGULAR_OFFSET_X=-17;SC.SelectButtonView.REGULAR_OFFSET_Y=3;SC.SelectButtonView.REGULAR_POPUP_MENU_WIDTH_OFFSET=4;
SC.SelectButtonView.LARGE_OFFSET_X=-17;SC.SelectButtonView.LARGE_OFFSET_Y=6;SC.SelectButtonView.LARGE_POPUP_MENU_WIDTH_OFFSET=3;
SC.SelectButtonView.HUGE_OFFSET_X=0;SC.SelectButtonView.HUGE_OFFSET_Y=0;SC.SelectButtonView.HUGE_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectButtonView.MENU_WIDTH_OFFSET=-2;sc_require("panes/panel");SC.SheetPane=SC.PanelPane.extend({classNames:"sc-sheet",modalPane:SC.ModalPane,transitionDuration:200,_state:"NO_VIEW",init:function(){arguments.callee.base.apply(this,arguments);
if(SC.Animatable){SC.SheetPane.ANIMATABLE_AVAILABLE=YES;this.mixin(SC.Animatable);
if(!this.transitions){this.transitions={}}if(!this.transitions.top){this.transitions.top={duration:this.transitionDuration===200?0.3:this.transitionDuration/1000,action:"_complete",target:this}
}}},append:function(){var a=this.get("layout");if(!a.height||!a.top){a=SC.View.convertLayoutToAnchoredLayout(a,this.computeParentDimensions())
}a.top=-1*a.height;if(this.disableAnimation){this.disableAnimation()}this.adjust(a);
this.updateLayout();if(this.enableAnimation){this.enableAnimation()}return arguments.callee.base.apply(this,arguments)
},remove:function(){var b=this,a=arguments;this.invokeLater(function(){a.callee.base.apply(b,a)
},this.transitionDuration);this.slideUp();return this},paneDidAttach:function(){var a=arguments.callee.base.apply(this,arguments);
this.slideDown();return a},slideDown:function(){this._state=SC.SheetPane.ANIMATING;
this._direction=SC.SheetPane.SLIDE_DOWN;if(SC.SheetPane.ANIMATABLE_AVAILABLE){this.transitions.top.timing=SC.Animatable.TRANSITION_EASE_OUT;
this.adjust("top",0)}else{this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this.tick()}},slideUp:function(){this._state=SC.SheetPane.ANIMATING;this._direction=SC.SheetPane.SLIDE_UP;
if(SC.SheetPane.ANIMATABLE_AVAILABLE){var a=this.get("layout");this.transitions.top.timing=SC.Animatable.TRANSITION_EASE_IN;
this.adjust("top",-1*a.height)}else{this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this.tick()}},_complete:function(){var a=this._direction;if(a===SC.SheetPane.SLIDE_DOWN){if(!SC.SheetPane.ANIMATABLE_AVAILABLE){this.adjust("top",0)
}this.adjust({centerX:0,left:null});if(SC.browser.mozilla){this.parentViewDidChange()
}}else{var b=this.get("layout");if(!SC.SheetPane.ANIMATABLE_AVAILABLE){this.adjust("top",-1*b.height)
}}this._state=SC.SheetPane.READY;this.updateLayout()},blurTo:function(a){this.setFirstResponder("")
},tick:function(){this._timer=null;var b=Date.now();var e=(b-this._start)/(this._end-this._start),g=this,a=this._direction,c=this.get("layout"),d,f;
if(e<0){e=0}if(e>=1){this._complete();return this}f=Math.floor(c.height*e);if(a==SC.SheetPane.SLIDE_DOWN){g.adjust("top",0-(c.height-f))
}else{if(a==SC.SheetPane.SLIDE_UP){g.adjust("top",0-f)}}this._timer=this.invokeLater(this.tick,20);
g.updateLayout();return this}});SC.SheetPane.mixin({ANIMATABLE_AVAILABLE:NO,NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",SLIDE_DOWN:"SLIDEDOWN",SLIDE_UP:"SLIDEUP"});
SC.DRAG_LINK=4;SC.DRAG_COPY=1;SC.DRAG_MOVE=2;SC.DRAG_NONE=0;SC.DRAG_ANY=7;SC.DRAG_AUTOSCROLL_ZONE_THICKNESS=20;
SC.Drag=SC.Object.extend({source:null,ghostView:null,ghostActsLikeCursor:NO,dragView:null,ghost:YES,slideBack:YES,mouseDownEvent:null,ghostOffset:{x:0,y:0},location:{},dataTypes:function(){if(this.dataSource){return this.dataSource.get("dragDataTypes")||[]
}var d=this.data;if(d){var a=[];for(var b in d){if(d.hasOwnProperty(b)){a.push(b)
}}return a}var c=this.get("source");if(c&&c.dragDataTypes){return c.get("dragDataTypes")||[]
}return[]}.property().cacheable(),hasDataType:function(a){return(this.get("dataTypes").indexOf(a)>=0)
},dataForType:function(a){if(this.dataSource){return this.dataSource.dragDataForType(this,a)
}else{if(this.data){return this.data[a]}else{var b=this.get("source");if(b&&SC.typeOf(b.dragDataForType)==SC.T_FUNCTION){return b.dragDataForType(this,a)
}else{return null}}}},dataSource:null,data:null,allowedDragOperations:SC.DRAG_ANY,_dragInProgress:YES,_dragViewWasVisible:null,startDrag:function(){this._createGhostView();
var h=this.event;var e={x:h.pageX,y:h.pageY};this.set("location",e);var b=this._getDragView();
var k=b.get("parentView");var f=k?k.convertFrameToView(b.get("frame"),null):b.get("frame");
if(this.get("ghost")){this._dragViewWasVisible=b.get("isVisible");b.set("isVisible",NO)
}if(this.ghostActsLikeCursor){this.ghostOffset={x:14,y:14}}else{this.ghostOffset={x:(e.x-f.x),y:(e.y-f.y)}
}if(!this._ghostViewHidden){this._positionGhostView(h)}this.ghostView.rootResponder.dragDidStart(this);
var a=this.source;if(a&&a.dragDidBegin){a.dragDidBegin(this,e)}var c=this._dropTargets();
for(var g=0,d=c.length;g<d;g++){c[g].tryToPerform("dragStarted",this,h)}},cancelDrag:function(){var b=this._lastTarget,c=this.get("location");
if(b&&b.dragExited){b.dragExited(this,this._lastMouseDraggedEvent)}this._destroyGhostView();
if(this.get("ghost")){if(this._dragViewWasVisible){this._getDragView().set("isVisible",YES)
}this._dragViewWasVisible=null}var a=this.source;if(a&&a.dragDidEnd){a.dragDidEnd(this,c,SC.DRAG_NONE)
}this._lastTarget=null;this._dragInProgress=NO},mouseDragged:function(a){var b=this._autoscroll(a);
var f=this.get("location");if(!b&&(a.pageX===f.x)&&(a.pageY===f.y)){return}f={x:a.pageX,y:a.pageY};
this.set("location",f);this._lastMouseDraggedEvent=a;var d=this.source;var c=this._lastTarget;
var e=this._findDropTarget(a);var g=SC.DRAG_NONE;while(e&&(e!==c)&&(g===SC.DRAG_NONE)){if(e&&d&&d.dragSourceOperationMaskFor){g=d.dragSourceOperationMaskFor(this,e)
}else{g=SC.DRAG_ANY}if((g!==SC.DRAG_NONE)&&e&&e.computeDragOperations){g=g&e.computeDragOperations(this,a,g)
}else{g=SC.DRAG_NONE}this.allowedDragOperations=g;if(g===SC.DRAG_NONE){e=this._findNextDropTarget(e)
}}if(e!==c){if(c&&c.dragExited){c.dragExited(this,a)}if(e){if(e.dragEntered){e.dragEntered(this,a)
}if(e.dragUpdated){e.dragUpdated(this,a)}}this._lastTarget=e}else{if(e&&e.dragUpdated){e.dragUpdated(this,a)
}}if(d&&d.dragDidMove){d.dragDidMove(this,f)}if(!this._ghostViewHidden){this._positionGhostView(a)
}},mouseUp:function(n){var g={x:n.pageX,y:n.pageY},h=this._lastTarget,d=this.allowedDragOperations;
this.set("location",g);try{if(h&&h.acceptDragOperation&&h.acceptDragOperation(this,d)){d=h.performDragOperation?h.performDragOperation(this,d):SC.DRAG_NONE
}else{d=SC.DRAG_NONE}}catch(k){console.error("Exception in SC.Drag.mouseUp(acceptDragOperation|performDragOperation): %@".fmt(k))
}try{if(h&&h.dragExited){h.dragExited(this,n)}}catch(l){console.error("Exception in SC.Drag.mouseUp(target.dragExited): %@".fmt(l))
}var c=this._dropTargets();for(var m=0,f=c.length;m<f;m++){try{c[m].tryToPerform("dragEnded",this,n)
}catch(b){console.error("Exception in SC.Drag.mouseUp(dragEnded on %@): %@".fmt(c[m],b))
}}this._destroyGhostView();if(this.get("ghost")){if(this._dragViewWasVisible){this._getDragView().set("isVisible",YES)
}this._dragViewWasVisible=null}var a=this.source;if(a&&a.dragDidEnd){a.dragDidEnd(this,g,d)
}this._lastTarget=null;this._dragInProgress=NO},_getDragView:function(){if(!this.dragView){if(!this.source||!this.source.isView){throw"Source can't be used as dragView, because it's not a view."
}this.dragView=this.source}return this.dragView},_createGhostView:function(){var c=this,b=this._getDragView(),d=b.get("frame"),a;
a=this.ghostView=SC.Pane.create({classNames:["sc-ghost-view"],layout:{top:d.y,left:d.x,width:d.width,height:d.height},owner:this,didCreateLayer:function(){if(b){var e=b.get("layer");
if(e){e=e.cloneNode(true);e.style.top="0px";e.style.left="0px";this.get("layer").appendChild(e)
}}}});a.append()},_positionGhostView:function(a){var c=this.get("location");c.x-=this.ghostOffset.x;
c.y-=this.ghostOffset.y;var b=this.ghostView;if(b){b.adjust({top:c.y,left:c.x});b.invokeOnce("updateLayout")
}},_ghostViewHidden:NO,hideGhostView:function(){if(this.ghostView&&!this._ghostViewHidden){this.ghostView.remove();
this._ghostViewHidden=YES}},unhideGhostView:function(){if(this._ghostViewHidden){this._ghostViewHidden=NO;
this._createGhostView()}},_destroyGhostView:function(){if(this.ghostView){this.ghostView.remove();
this.ghostView=null;this._ghostViewHidden=NO}},_dropTargets:function(){if(this._cachedDropTargets){return this._cachedDropTargets
}var b=[];var d=SC.Drag._dropTargets;for(var c in d){if(d.hasOwnProperty(c)){b.push(d[c])
}}var f={};var e=SC.Drag._dropTargets;var a=function(g){if(!g){return 0}var k=SC.guidFor(g);
var h=f[k];if(!h){h=1;while(g=g.get("parentView")){if(e[SC.guidFor(g)]!==undefined){h++
}}f[k]=h}return h};b.sort(function(h,g){if(h===g){return 0}h=a(h);g=a(g);return(h>g)?-1:1
});this._cachedDropTargets=b;return b},_findDropTarget:function(c){var g={x:c.pageX,y:c.pageY};
var e,f;var d=this._dropTargets();for(var b=0,a=d.length;b<a;b++){e=d[b];if(!e.get("isVisibleInWindow")){continue
}f=e.convertFrameToView(e.get("clippingFrame"),null);if(SC.pointInRect(g,f)){return e
}}return null},_findNextDropTarget:function(a){var b=SC.Drag._dropTargets;while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a
}}return null},_autoscroll:function(n){if(!n){n=this._lastAutoscrollEvent}if(!this._dragInProgress){return NO
}var g=n?{x:n.pageX,y:n.pageY}:this.get("location"),h=this._findScrollableView(g),q=null,m,c,d,k,b,a,e;
while(h&&!q){m=h.get("canScrollVertical")?1:0;c=h.get("canScrollHorizontal")?1:0;
if(m||c){a=h.get("containerView");if(a){e=h.convertFrameToView(a.get("frame"),null)
}else{m=c=0}}if(m){k=SC.maxY(e);d=k-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(g.y>=d&&g.y<=k){m=1
}else{d=SC.minY(e);k=d+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(g.y>=d&&g.y<=k){m=-1}else{m=0
}}}if(c){k=SC.maxX(e);d=k-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(g.x>=d&&g.x<=k){c=1
}else{d=SC.minX(e);k=d+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(g.x>=d&&g.x<=k){c=-1}else{c=0
}}}if(m||c){q=h}else{h=this._findNextScrollableView(h)}}if(q&&(this._lastScrollableView===q)){if((Date.now()-this._hotzoneStartTime)>100){this._horizontalScrollAmount*=1.05;
this._verticalScrollAmount*=1.05}}else{this._lastScrollableView=q;this._horizontalScrollAmount=15;
this._verticalScrollAmount=15;this._hotzoneStartTime=(q)?Date.now():null;c=m=0}if(q&&(c||m)){var l={x:c*this._horizontalScrollAmount,y:m*this._verticalScrollAmount};
q.scrollBy(l)}if(q){if(n){this._lastAutoscrollEvent={pageX:n.pageX,pageY:n.pageY}
}this.invokeLater(this._autoscroll,100,null);return YES}else{this._lastAutoscrollEvent=null;
return NO}},_scrollableViews:function(){if(this._cachedScrollableView){return this._cachedScrollableView
}var a=[];var c=SC.Drag._scrollableViews;for(var b in c){if(c.hasOwnProperty(b)){a.push(c[b])
}}a=a.sort(function(f,d){var e=f;while(e=e.get("parentView")){if(d==e){return -1}}return 1
});this._cachedScrollableView=a;return a},_findScrollableView:function(f){var c=this._scrollableViews(),b=c?c.length:0,d,e,a;
for(a=0;a<b;a++){d=c[a];if(!d.get("isVisibleInWindow")){continue}e=d.convertFrameToView(d.get("clippingFrame"),null);
if(SC.pointInRect(f,e)){return d}}return null},_findNextScrollableView:function(a){var b=SC.Drag._scrollableViews;
while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a}}return null}});SC.Drag.mixin({start:function(b){var a=this.create(b);
a.startDrag();return a},_dropTargets:{},_scrollableViews:{},addDropTarget:function(a){this._dropTargets[SC.guidFor(a)]=a
},removeDropTarget:function(a){delete this._dropTargets[SC.guidFor(a)]},addScrollableView:function(a){this._scrollableViews[SC.guidFor(a)]=a
},removeScrollableView:function(a){delete this._scrollableViews[SC.guidFor(a)]}});
SC.MODIFIED_KEY_BINDINGS={"ctrl_.":"cancel",shift_tab:"insertBacktab",shift_left:"moveLeftAndModifySelection",shift_right:"moveRightAndModifySelection",shift_up:"moveUpAndModifySelection",shift_down:"moveDownAndModifySelection",alt_left:"moveLeftAndModifySelection",alt_right:"moveRightAndModifySelection",alt_up:"moveUpAndModifySelection",alt_down:"moveDownAndModifySelection",ctrl_a:"selectAll"};
SC.BASE_KEY_BINDINGS={escape:"cancel",backspace:"deleteBackward","delete":"deleteForward","return":"insertNewline",tab:"insertTab",left:"moveLeft",right:"moveRight",up:"moveUp",down:"moveDown",home:"moveToBeginningOfDocument",end:"moveToEndOfDocument",pagedown:"pageDown",pageup:"pageUp"};
require("core");SC.UndoManager=SC.Object.extend({undoActionName:function(){return this.undoStack?this.undoStack.name:null
}.property("undoStack"),redoActionName:function(){return this.redoStack?this.redoStack.name:null
}.property("redoStack"),canUndo:function(){return this.undoStack!=null}.property("undoStack"),canRedo:function(){return this.redoStack!=null
}.property("redoStack"),undo:function(){this._undoOrRedo("undoStack","isUndoing")
},redo:function(){this._undoOrRedo("redoStack","isRedoing")},isUndoing:false,isRedoing:false,groupingLevel:0,registerUndo:function(b,a){this.beginUndoGroup(a);
this._activeGroup.actions.push(b);this.endUndoGroup(a)},beginUndoGroup:function(b){if(this._activeGroup){this.groupingLevel++
}else{var a=this.isUndoing?"redoStack":"undoStack";this._activeGroup={name:b,actions:[],prev:this.get(a)};
this.set(a,this._activeGroup);this.groupingLevel=1}},endUndoGroup:function(a){if(!this._activeGroup){raise("endUndoGroup() called outside group.")
}if(this.groupingLevel>1){this.groupingLevel--}else{this._activeGroup=null;this.groupingLevel=0
}this.propertyDidChange(this.isUndoing?"redoStack":"undoStack")},setActionName:function(a){if(!this._activeGroup){raise("setActionName() called outside group.")
}this._activeGroup.name=a},_activeGroup:null,undoStack:null,redoStack:null,_undoOrRedo:function(a,c){if(this._activeGroup){return false
}if(this.get(a)==null){return true}this.set(c,true);var e=this.get(a);this.set(a,e.prev);
var b;var d=e.actions.length>1;if(d){this.beginUndoGroup(e.name)}while(b=e.actions.pop()){b()
}if(d){this.endUndoGroup(e.name)}this.set(c,false)}});SC.CheckboxView=SC.ButtonView.extend(SC.StaticLayout,SC.Button,{classNames:["sc-checkbox-view"],tagName:"label",needsEllipsis:NO,render:function(b,a){var c,d,k=this.get("value"),h=k===SC.MIXED_MODE?"mixed":(k===this.get("toggleOnValue")?"true":"false");
if(a){var f=SC.BLANK_IMAGE_URL,e=this.get("isEnabled")?"":'disabled="disabled"',g=SC.guidFor(this);
b.attr("role","checkbox");c=this._field_currentDisplayTitle=this.get("displayTitle");
if(SC.browser.msie){b.attr("for",g)}b.push('<span class="button" ></span>');if(this.get("needsEllipsis")){b.push('<span class="label ellipsis">',c,"</span>")
}else{b.push('<span class="label">',c,"</span>")}b.attr("name",g)}else{c=this.get("displayTitle");
if(c!==this._field_currentDisplayTitle){this._field_currentDisplayTitle=c;this.$("span.label").text(c)
}}b.attr("aria-checked",h)},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;if(a){a.allowDefault()}return YES
},mouseUp:function(a){if(!this.get("isEnabled")||(a&&a.target&&!this.$().within(a.target))){return YES
}var b=this.get("value");if(b===this.get("toggleOnValue")){this.$().attr("aria-checked","false");
this.set("value",this.get("toggleOffValue"))}else{this.$().attr("aria-checked","true");
this.set("value",this.get("toggleOnValue"))}this.set("isActive",NO);this._isMouseDown=NO;
return YES},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
}});SC.LIST_ITEM_ACTION_CANCEL="sc-list-item-cancel-action";SC.LIST_ITEM_ACTION_REFRESH="sc-list-item-cancel-refresh";
SC.LIST_ITEM_ACTION_EJECT="sc-list-item-cancel-eject";SC.ListItemView=SC.View.extend(SC.Control,{classNames:["sc-list-item-view"],content:null,hasContentIcon:NO,hasContentRightIcon:NO,hasContentBranch:NO,contentCheckboxKey:null,contentIconKey:null,contentRightIconKey:null,contentValueKey:null,escapeHTML:YES,contentUnreadCountKey:null,contentIsBranchKey:null,isEditing:NO,outlineIndent:16,outlineLevel:0,disclosureState:SC.LEAF_NODE,validator:null,contentPropertyDidChange:function(){if(this.get("contentIsEditable")!==this.contentIsEditable()){this.notifyPropertyChange("contentIsEditable")
}this.displayDidChange()},contentIsEditable:function(){var a=this.get("content");
return a&&(a.get?a.get("isEditable")!==NO:NO)}.property("content").cacheable(),render:function(c,a){var f=this.get("content"),q=this.displayDelegate,b=this.get("outlineLevel"),e=this.get("outlineIndent"),n,l,k,r=[];
r.push((this.get("contentIndex")%2===0)?"even":"odd");c.setClass("disabled",!this.get("isEnabled"));
k=c.begin("div").addClass("sc-outline");if(b>=0&&e>0){k.addStyle("left",e*(b+1))}l=this.get("disclosureState");
if(l!==SC.LEAF_NODE){this.renderDisclosure(k,l);r.push("has-disclosure")}n=this.getDelegateProperty("contentCheckboxKey",q);
if(n){l=f?(f.get?f.get(n):f[n]):NO;this.renderCheckbox(k,l);r.push("has-checkbox")
}if(this.getDelegateProperty("hasContentIcon",q)){n=this.getDelegateProperty("contentIconKey",q);
l=(n&&f)?(f.get?f.get(n):f[n]):null;this.renderIcon(k,l);r.push("has-icon")}n=this.getDelegateProperty("contentValueKey",q);
l=(n&&f)?(f.get?f.get(n):f[n]):f;if(l&&SC.typeOf(l)!==SC.T_STRING){l=l.toString()
}if(this.get("escapeHTML")){l=SC.RenderContext.escapeHTML(l)}this.renderLabel(k,l);
if(this.getDelegateProperty("hasContentRightIcon",q)){n=this.getDelegateProperty("contentRightIconKey",q);
l=(n&&f)?(f.get?f.get(n):f[n]):null;this.renderRightIcon(k,l);r.push("has-right-icon")
}n=this.getDelegateProperty("contentUnreadCountKey",q);l=(n&&f)?(f.get?f.get(n):f[n]):null;
if(!SC.none(l)&&(l!==0)){this.renderCount(k,l);var d=["zero","one","two","three","four","five"];
var m=l.toString().length;var h=d.length;var g=(m<h)?d[m]:d[h-1];r.push("has-count "+g+"-digit")
}n=this.getDelegateProperty("listItemActionProperty",q);l=(n&&f)?(f.get?f.get(n):f[n]):null;
if(l){this.renderAction(k,l);r.push("has-action")}if(this.getDelegateProperty("hasContentBranch",q)){n=this.getDelegateProperty("contentIsBranchKey",q);
l=(n&&f)?(f.get?f.get(n):f[n]):NO;this.renderBranch(k,l);r.push("has-branch")}c.addClass(r);
c=k.end()},renderDisclosure:function(e,f){var d=(f===SC.BRANCH_OPEN)?"open":"closed",a=this._scli_disclosureHtml,c,b;
if(!a){a=this.constructor.prototype._scli_disclosureHtml={}}c=a[d];if(!c){c=a[d]='<img src="'+SC.BLANK_IMAGE_URL+'" class="disclosure button '+d+'" />'
}e.push(c)},renderCheckbox:function(f,h){var e=(h===SC.MIXED_STATE)?"mixed":h?"sel":"nosel",b=this._scli_checkboxHtml,g=this.get("contentIsEditable")&&this.get("isEnabled"),d,c,a=[];
if(!g){e=SC.keyFor("disabled",e)}if(!b){b=this.constructor.prototype._scli_checkboxHtml={}
}d=b[e];if(!d){c=SC.RenderContext("div").attr("role","button").classNames(SC.clone(SC.CheckboxView.prototype.classNames));
if(h===SC.MIXED_STATE){a.push("mixed")}else{if(h){a.push("sel")}}if(!g){a.push("disabled")
}c.addClass(a);c.push('<span class="button"></span>');d=b[e]=c.join()}f.push(d)},renderIcon:function(c,e){var b=null,d=null,a=[];
if(e&&SC.ImageView.valueIsUrl(e)){b=e;d=""}else{d=e;b=SC.BLANK_IMAGE_URL}a.push(d,"icon");
c.begin("img").addClass(a).attr("src",b).end()},renderLabel:function(b,a){b.push("<label>",a||"","</label>")
},$label:function(){return this.$("label")},renderRightIcon:function(c,e){var b=null,d=null,a=[];
if(e&&SC.ImageView.valueIsUrl(e)){b=e;d=""}else{d=e;b=SC.BLANK_IMAGE_URL}a.push("right-icon",d);
c.begin("img").addClass(a).attr("src",b).end()},renderCount:function(a,b){a.push('<span class="count"><span class="inner">',b.toString(),"</span></span>")
},renderAction:function(a,b){a.push('<img src="',SC.BLANK_IMAGE_URL,'" class="action" />')
},renderBranch:function(c,b){var a=[];a.push("branch",b?"branch-visible":"branch-hidden");
c.begin("span").addClass(a).push("&nbsp;").end()},_isInsideElementWithClassName:function(e,a){var c=this.get("layer");
if(!c){return NO}var d=SC.$(a.target);var b=NO,f;while(!b&&d.length>0&&(d[0]!==c)){if(d.hasClass(e)){b=YES
}d=d.parent()}d=c=null;return b},_isInsideCheckbox:function(b){var a=this.displayDelegate;
var c=this.getDelegateProperty("contentCheckboxKey",a);return c&&this._isInsideElementWithClassName("sc-checkbox-view",b)
},_isInsideDisclosure:function(a){if(this.get("disclosureState")===SC.LEAF_NODE){return NO
}return this._isInsideElementWithClassName("disclosure",a)},_isInsideRightIcon:function(c){var b=this.displayDelegate;
var a=this.getDelegateProperty("hasContentRightIcon",b)||!SC.none(this.rightIcon);
return a&&this._isInsideElementWithClassName("right-icon",c)},mouseDown:function(a){if(!this.get("contentIsEditable")){return NO
}if(this._isInsideCheckbox(a)){this._addCheckboxActiveState();this._isMouseDownOnCheckbox=YES;
this._isMouseInsideCheckbox=YES;return YES}else{if(this._isInsideDisclosure(a)){this._addDisclosureActiveState();
this._isMouseDownOnDisclosure=YES;this._isMouseInsideDisclosure=YES;return YES}else{if(this._isInsideRightIcon(a)){this._addRightIconActiveState();
this._isMouseDownOnRightIcon=YES;this._isMouseInsideRightIcon=YES;return YES}}}return NO
},mouseUp:function(h){var c=NO,k,d,b,a,g,f;if(this._isMouseDownOnCheckbox){if(this._isInsideCheckbox(h)){k=this.displayDelegate;
d=this.getDelegateProperty("contentCheckboxKey",k);b=this.get("content");if(b&&b.get){var e=b.get(d);
e=(e===SC.MIXED_STATE)?YES:!e;b.set(d,e);this.displayDidChange()}}this._removeCheckboxActiveState();
c=YES}else{if(this._isMouseDownOnDisclosure){if(this._isInsideDisclosure(h)){a=this.get("disclosureState");
g=this.get("contentIndex");f=(!SC.none(g))?SC.IndexSet.create(g):null;k=this.get("displayDelegate");
if(a===SC.BRANCH_OPEN){if(f&&k&&k.collapse){k.collapse(f)}else{this.set("disclosureState",SC.BRANCH_CLOSED)
}this.displayDidChange()}else{if(a===SC.BRANCH_CLOSED){if(f&&k&&k.expand){k.expand(f)
}else{this.set("disclosureState",SC.BRANCH_OPEN)}this.displayDidChange()}}}this._removeDisclosureActiveState();
c=YES}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();c=YES
}}}this._isMouseInsideCheckbox=this._isMouseDownOnCheckbox=NO;this._isMouseDownOnDisclosure=this._isMouseInsideDisclosure=NO;
this._isMouseInsideRightIcon=this._isMouseDownOnRightIcon=NO;return c},mouseMoved:function(a){if(this._isMouseDownOnCheckbox&&this._isInsideCheckbox(a)){this._addCheckboxActiveState();
this._isMouseInsideCheckbox=YES}else{if(this._isMouseDownOnCheckbox){this._removeCheckboxActiveState();
this._isMouseInsideCheckbox=NO}else{if(this._isMouseDownOnDisclosure&&this._isInsideDisclosure(a)){this._addDisclosureActiveState();
this._isMouseInsideDisclosure=YES}else{if(this._isMouseDownOnDisclosure){this._removeDisclosureActiveState();
this._isMouseInsideDisclosure=NO}else{if(this._isMouseDownOnRightIcon&&this._isInsideRightIcon(a)){this._addRightIconActiveState();
this._isMouseInsideRightIcon=YES}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();
this._isMouseInsideRightIcon=NO}}}}}}return NO},touchStart:function(a){return this.mouseDown(a)
},touchEnd:function(a){return this.mouseUp(a)},touchEntered:function(a){return this.mouseEntered(a)
},touchExited:function(a){return this.mouseExited(a)},_addCheckboxActiveState:function(){var a=this.get("isEnabled");
this.$(".sc-checkbox-view").setClass("active",a)},_removeCheckboxActiveState:function(){this.$(".sc-checkbox-view").removeClass("active")
},_addDisclosureActiveState:function(){var a=this.get("isEnabled");this.$("img.disclosure").setClass("active",a)
},_removeDisclosureActiveState:function(){this.$("img.disclosure").removeClass("active")
},_addRightIconActiveState:function(){this.$("img.right-icon").setClass("active",YES)
},_removeRightIconActiveState:function(){this.$("img.right-icon").removeClass("active")
},contentHitTest:function(b){var a=this.displayDelegate;var c=this.getDelegateProperty("contentValueKey",a);
if(!c){return NO}var e=this.$label()[0];if(!e){return NO}var f=b.target,d=this.get("layer");
while(f&&(f!==d)&&(f!==window)){if(f===e){return YES}f=f.parentNode}return NO},beginEditing:function(){if(this.get("isEditing")){return YES
}return this._beginEditing(YES)},_beginEditing:function(A){var u=this.get("content"),h=this.get("displayDelegate"),g=this.getDelegateProperty("contentValueKey",h),k=this.get("parentView"),z=k?k.get("frame"):null,a=this.$label(),d=this.get("validator"),x,m,e,n,b,r,c,s,y,w,B;
if(A&&this.scrollToVisible()){var l=this.get("owner"),q=this.get("contentIndex");
this.invokeLast(function(){var f=l.itemViewForContentIndex(q);if(f&&f._beginEditing){f._beginEditing(NO)
}});return YES}if(!k||!a||a.get("length")===0){return NO}m=(g&&u&&u.get)?u.get(g):null;
x=this.computeFrameWithParentFrame(null);e=SC.viewportOffset(a[0]);n=a.css("lineHeight");
b=a.css("fontSize");r=this.$().css("top");if(r){r=parseInt(r.substring(0,r.length-2),0)
}else{r=0}c=n;y=0;if(b&&c){w=b*1.5;if(w<c){a.css({lineHeight:"1.5"});y=(c-w)/2}else{n=null
}}x.x=e.x;x.y=e.y+r+y;x.height=a[0].offsetHeight;x.width=a[0].offsetWidth;s=this.get("escapeHTML");
B=SC.InlineTextFieldView.beginEditing({frame:x,exampleElement:a,delegate:this,value:m,multiline:NO,isCollection:YES,validator:d,escapeHTML:s});
if(n){a.css({lineHeight:n})}return B},commitEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.commitEditing()},discardEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.discardEditing()},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)
},inlineEditorDidBeginEditing:function(b){var a=this.$label();this._oldOpacity=a.css("opacity");
a.css("opacity",0)},inlineEditorShouldBeginEditing:function(a){return YES},inlineEditorShouldBeginEditing:function(a,b){return YES
},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(c,e){this.set("isEditing",NO);
var d=this.get("content");var a=this.displayDelegate;var b=this.getDelegateProperty("contentValueKey",a);
if(b&&d&&d.set){d.set(b,e)}this.displayDidChange()}});sc_require("mixins/collection_view_delegate");
sc_require("views/list_item");SC.DRAG_REORDER=16;SC.HORIZONTAL_ORIENTATION="horizontal";
SC.VERTICAL_ORIENTATION="vertical";SC.BENCHMARK_RELOAD=NO;SC.CollectionView=SC.View.extend(SC.CollectionViewDelegate,SC.CollectionContent,{classNames:["sc-collection-view"],ACTION_DELAY:200,useFastPath:NO,content:null,contentBindingDefault:SC.Binding.multiple(),length:0,nowShowing:function(){return this.computeNowShowing()
}.property("length","clippingFrame").cacheable(),selection:null,isSelectable:YES,isSelectableBindingDefault:SC.Binding.bool(),isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),isEditable:YES,isEditableBindingDefault:SC.Binding.bool(),canReorderContent:NO,canReorderContentBindingDefault:SC.Binding.bool(),canDeleteContent:NO,canDeleteContentBindingDefault:SC.Binding.bool(),canEditContent:NO,canEditContentBindingDefault:SC.Binding.bool(),isDropTarget:NO,useToggleSelection:NO,actOnSelect:NO,selectOnMouseDown:YES,exampleView:SC.ListItemView,contentExampleViewKey:null,groupExampleView:null,contentGroupExampleViewKey:null,action:null,target:null,contentValueKey:null,acceptsFirstResponder:NO,isActive:NO,calculatedHeight:0,calculatedWidth:0,computeLayout:function(){return null
},layoutForContentIndex:function(a){return null},allContentIndexes:function(){return SC.IndexSet.create(0,this.get("length")).freeze()
}.property("length").cacheable(),contentIndexesInRect:function(a){return null},computeNowShowing:function(){var c=this.contentIndexesInRect(this.get("clippingFrame"));
if(!c){c=this.get("allContentIndexes")}else{var b=this.get("length"),a=c.get("max");
if(a>b){c=c.copy().remove(b,a-b).freeze()}}return c},showInsertionPoint:function(a,b){},hideInsertionPoint:function(){},delegate:null,selectionDelegate:function(){var a=this.get("delegate"),b=this.get("content");
return this.delegateFor("isCollectionViewDelegate",a,b)}.property("delegate","content").cacheable(),contentDelegate:function(){var a=this.get("delegate"),b=this.get("content");
return this.delegateFor("isCollectionContent",a,b)}.property("delegate","content").cacheable(),_contentGroupIndexes:function(){return this.get("contentDelegate").contentGroupIndexes(this,this.get("content"))
}.property("contentDelegate","content").cacheable(),contentRangeDidChange:function(d,b,c,a){if(!b&&(c==="[]")){this.notifyPropertyChange("_contentGroupIndexes");
this.reload(a)}else{this.contentPropertyDidChange(b,c,a)}},contentPropertyDidChange:function(c,b,a){},updateContentRangeObserver:function(){var d=this.get("nowShowing"),a=this._cv_contentRangeObserver,c=this.get("content");
if(!c){return}if(a){c.updateRangeObserver(a,d)}else{var b=this.contentRangeDidChange;
a=c.addRangeObserver(d,this,b,null);this._cv_contentRangeObserver=a}},removeContentRangeObserver:function(){var b=this.get("content"),a=this._cv_contentRangeObserver;
if(a){if(b){b.removeRangeObserver(a)}this._cv_contentRangeObserver=null}},contentLengthDidChange:function(){var a=this.get("content");
this.set("length",a?a.get("length"):0)},_cv_contentDidChange:function(){var b=this.get("content"),a=this.contentLengthDidChange;
if(b===this._content){return}this.removeContentRangeObserver();if(this._content){this._content.removeObserver("length",this,a)
}this._content=b;if(b){b.addObserver("length",this,a)}this.contentLengthDidChange();
this.contentRangeDidChange(b,null,"[]",null)}.observes("content"),_invalidIndexes:NO,reload:function(a){var b=this._invalidIndexes;
if(a&&b!==YES){if(b){b.add(a)}else{b=this._invalidIndexes=a.clone()}}else{this._invalidIndexes=YES
}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadIfNeeded)}return this
},reloadIfNeeded:function(){var B=this._invalidIndexes;if(!B||!this.get("isVisibleInWindow")){return this
}this._invalidIndexes=NO;var y=this.get("content"),z,A,q,D=this.computeLayout(),C=SC.BENCHMARK_RELOAD,c=this.get("nowShowing"),E=this._sc_itemViews,r=this.get("containerView")||this,a,v,x,w,m,s,h,u,e,n,l,F,d,b,g,k,f;
if(B.isIndexSet&&B.contains(c)){B=YES}if(this.willReload){this.willReload(B===YES?null:B)
}a=this.get("exampleView");x=a?a.isReusableInCollections:NO;v=this.get("groupExampleView");
w=v?v.isReusableInCollections:NO;if(B.isIndexSet){if(C){SC.Benchmark.start(C="%@#reloadIfNeeded (Partial)".fmt(this),YES)
}s=[];h=[];u=[];B.forEach(function(G){q=E?E[G]:null;if(c.contains(G)){if(q&&q.parentView===r){h.push(G)
}else{u.push(G)}}else{if(q&&q.parentView===r){s.push(G)}}},this);for(z=0,A=s.length;
z<A;++z){n=s[z];q=E?E[n]:null;delete E[n];g=this.get("contentDelegate");k=this.get("_contentGroupIndexes");
f=k&&k.contains(n);if(f){f=g.contentIndexIsGroup(this,y,n)}m=f?w:x;if(m){b=f?this._GROUP_VIEW_POOL:this._VIEW_POOL;
b.push(q);q.destroyLayer()}F=q.get("layer");if(F&&F.parentNode){F.parentNode.removeChild(F)
}r.removeChild(q)}for(z=0,A=h.length;z<A;++z){n=h[z];q=E?E[n]:null;l=this.itemViewForContentIndex(n,YES);
q.destroyLayer();r.replaceChild(l,q)}for(z=0,A=u.length;z<A;++z){n=u[z];l=this.itemViewForContentIndex(n,YES);
r.insertBefore(l,null)}if(C){SC.Benchmark.end(C)}}else{if(C){SC.Benchmark.start(C="%@#reloadIfNeeded (Full)".fmt(this),YES)
}if(E){E.length=0}e=r.get("childViews");if(e){e=e.copy()}r.beginPropertyChanges();
if(this.willRemoveAllChildren){this.willRemoveAllChildren()}r.destroyLayer().removeAllChildren();
if(e){for(z=0,A=e.length;z<A;++z){l=e[z];f=l.get("isGroupView");m=f?w:x;if(m){b=f?this._GROUP_VIEW_POOL:this._VIEW_POOL;
b.push(l);l.destroyLayer()}}}e=[];c.forEach(function(G){e.push(this.itemViewForContentIndex(G,YES))
},this);r.set("childViews",e);r.replaceLayer();r.endPropertyChanges();if(C){SC.Benchmark.end(C)
}}if(D){this.adjust(D)}if(this.didReload){this.didReload(B===YES?null:B)}return this
},displayProperties:"isFirstResponder isEnabled isActive".w(),render:function(a,b){a.setClass("focus",this.get("isFirstResponder"));
a.setClass("disabled",!this.get("isEnabled"));a.setClass("active",this.get("isActive"));
return arguments.callee.base.apply(this,arguments)},_TMP_ATTRS:{},_COLLECTION_CLASS_NAMES:"sc-collection-item".w(),_GROUP_COLLECTION_CLASS_NAMES:"sc-collection-item sc-group-item".w(),_VIEW_POOL:null,_GROUP_VIEW_POOL:null,itemViewForContentIndex:function(n,a){var A;
var z=this._sc_itemViews;if(!z){z=this._sc_itemViews=[]}else{if(!a&&(A=z[n])){return A
}}var r=this.get("content"),u=r.objectAt(n),h=this.get("contentDelegate"),l=this.get("_contentGroupIndexes"),k=NO,B,m,v,f,w,d,b,c,y,g,e,s,x;
k=l&&l.contains(n);if(k){k=h.contentIndexIsGroup(this,r,n)}if(k){B=this.get("contentGroupExampleViewKey");
if(B&&u){m=u.get(B)}if(!m){m=this.get("groupExampleView")||this.get("exampleView")
}w="_GROUP_VIEW_POOL"}else{B=this.get("contentExampleViewKey");if(B&&u){m=u.get(B)
}if(!m){m=this.get("exampleView")}w="_VIEW_POOL"}c=this.get("containerView")||this;
f=this.layerIdFor(n);y=h.contentIndexIsEnabled(this,r,n);g=h.contentIndexIsSelected(this,r,n);
e=h.contentIndexOutlineLevel(this,r,n);s=h.contentIndexDisclosureState(this,r,n);
x=this.isVisibleInWindow;v=this.layoutForContentIndex(n);if(m&&m.isReusableInCollections){d=this[w];
if(!d){d=this[w]=[]}if(d.length>0){A=d.pop();b=A.prepareForReuse;if(b){b.call(A)}A.beginPropertyChanges();
A.set("contentIndex",n);A.set("layerId",f);A.set("isEnabled",y);A.set("isSelected",g);
A.set("outlineLevel",e);A.set("disclosureState",s);A.set("isVisibleInWindow",x);A.set("parentView",c);
SC.View.views[f]=A;if(v){A.set("layout",v)}else{A.set("layout",m.prototype.layout)
}A.set("content",u);A.endPropertyChanges()}}if(!A){var q=this._TMP_ATTRS;q.contentIndex=n;
q.content=u;q.owner=q.displayDelegate=this;q.parentView=c;q.page=this.page;q.layerId=f;
q.isEnabled=y;q.isSelected=g;q.outlineLevel=e;q.disclosureState=s;q.isGroupView=k;
q.isVisibleInWindow=x;if(k){q.classNames=this._GROUP_COLLECTION_CLASS_NAMES}else{q.classNames=this._COLLECTION_CLASS_NAMES
}if(v){q.layout=v}else{delete q.layout}A=this.createItemView(m,n,q)}z[n]=A;return A
},itemViewForContentObject:function(a){return this.itemViewForContentIndex(this.get("content").indexOf(a))
},_TMP_LAYERID:[],createItemView:function(c,a,b){return c.create(b)},layerIdFor:function(a){var b=this._TMP_LAYERID;
b[0]=SC.guidFor(this);b[1]=a;return b.join("-")},contentIndexForLayerId:function(c){if(!c||!(c=c.toString())){return null
}var b=this._baseLayerId;if(!b){b=this._baseLayerId=SC.guidFor(this)+"-"}if((c.length<=b.length)||(c.indexOf(b)!==0)){return null
}var a=Number(c.slice(c.lastIndexOf("-")+1));return isNaN(a)?null:a},itemViewForEvent:function(l){var d=this.getPath("pane.rootResponder");
if(!d){return null}var c=SC.guidFor(this)+"-",a=c.length,e=l.target,g=this.get("layer"),f=null,b,k,h;
while(e&&e!==document&&e!==g){b=e?SC.$(e).attr("id"):null;if(b&&(f=this.contentIndexForLayerId(b))!==null){break
}e=e.parentNode}if(f===null||(e===g)){e=g=null;return null}if(f>=this.get("length")){throw"layout for item view %@ was found when item view does not exist (%@)".fmt(b,this)
}return this.itemViewForContentIndex(f)},expand:function(b){if(!b){return this}var a=this.get("contentDelegate"),c=this.get("content");
b.forEach(function(d){var e=a.contentIndexDisclosureState(this,c,d);if(e===SC.BRANCH_CLOSED){a.contentIndexExpand(this,c,d)
}},this);return this},collapse:function(b){if(!b){return this}var a=this.get("contentDelegate"),c=this.get("content");
b.forEach(function(d){var e=a.contentIndexDisclosureState(this,c,d);if(e===SC.BRANCH_OPEN){a.contentIndexCollapse(this,c,d)
}},this);return this},_cv_selectionDidChange:function(){var c=this.get("selection"),b=this._cv_selection,a=this._cv_selectionContentDidChange;
if(c===b){return}if(b){b.removeObserver("[]",this,a)}if(c){c.addObserver("[]",this,a)
}this._cv_selection=c;this._cv_selectionContentDidChange()}.observes("selection"),_cv_selectionContentDidChange:function(){var c=this.get("selection"),b=this._cv_selindexes,a=this.get("content"),d;
this._cv_selindexes=c?c.frozenCopy():null;if(b){b=b.indexSetForSource(a)}if(c){c=c.indexSetForSource(a)
}if(c&&b){d=c.without(b).add(b.without(c))}else{d=c||b}if(d&&d.get("length")>0){this.reloadSelectionIndexes(d)
}},_invalidSelection:NO,reloadSelectionIndexes:function(a){var b=this._invalidSelection;
if(a&&(b!==YES)){if(b){b.add(a)}else{b=this._invalidSelection=a.copy()}}else{this._invalidSelection=YES
}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)
}return this},reloadSelectionIndexesIfNeeded:function(){var e=this._invalidSelection;
if(!e||!this.get("isVisibleInWindow")){return this}var d=this.get("nowShowing"),b=this._invalidIndexes,a=this.get("content"),c=this.get("selection");
this._invalidSelection=NO;if(b===YES||!d){return this}if(e===YES){e=d}if(b&&b.isIndexSet){e=e.without(b)
}e.forEach(function(f){if(!d.contains(f)){return}var g=this.itemViewForContentIndex(f,NO);
if(g){g.set("isSelected",c?c.contains(a,f):NO)}},this);return this},select:function(c,f){var d=this.get("content"),a=this.get("selectionDelegate"),b=this.get("_contentGroupIndexes"),e;
if(!this.get("isSelectable")){return this}if(SC.typeOf(c)===SC.T_NUMBER){c=SC.IndexSet.create(c,1)
}if(c&&c.get("length")>0){if(b&&b.get("length")>0){c=c.copy().remove(b)}c=a.collectionViewShouldSelectIndexes(this,c,f);
if(!c||c.get("length")===0){return this}}else{c=null}if(f&&(e=this.get("selection"))){e=e.copy()
}else{e=SC.SelectionSet.create()}if(c&&c.get("length")>0){if(c.get("length")===1){e.addObject(d.objectAt(c.get("firstObject")))
}else{e.add(d,c)}}e=a.collectionViewSelectionForProposedSelection(this,e);if(!e){e=SC.SelectionSet.create()
}this._selectionAnchor=null;this.set("selection",e.freeze());return this},deselect:function(b){var d=this.get("selection"),c=this.get("content"),a=this.get("selectionDelegate");
if(!this.get("isSelectable")){return this}if(!d||d.get("length")===0){return this
}if(SC.typeOf(b)===SC.T_NUMBER){b=SC.IndexSet.create(b,1)}b=a.collectionViewShouldDeselectIndexes(this,b);
if(!b||b.get("length")===0){return this}d=d.copy().remove(c,b);d=a.collectionViewSelectionForProposedSelection(this,d);
if(!d){d=SC.SelectionSet.create()}this.set("selection",d.freeze());return this},_findNextSelectableItemFromIndex:function(h,a){var c=this.get("length"),d=SC.IndexSet.create(),e=this.get("content"),k=this.get("selectionDelegate"),g=this.get("_contentGroupIndexes"),f,b;
if(!g&&(k.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return h
}while(h<c){if(!g||!g.contains(h)){d.add(h);f=k.collectionViewShouldSelectIndexes(this,d);
if(f&&f.get("length")>=1){return h}d.remove(h)}h++}if(a===undefined){b=this.get("selection");
a=b?b.get("max"):-1}return a},_findPreviousSelectableItemFromIndex:function(b,h){var c=SC.IndexSet.create(),f=this.get("content"),a=this.get("selectionDelegate"),e=this.get("_contentGroupIndexes"),d;
if(SC.none(b)){b=-1}if(!e&&(a.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return b
}while(b>=0){if(!e||!e.contains(b)){c.add(b);d=a.collectionViewShouldSelectIndexes(this,c);
if(d&&d.get("length")>=1){return b}c.remove(b)}b--}if(h===undefined){var g=this.get("selection");
h=g?g.get("min"):-1}if(SC.none(h)){h=-1}return h},selectPreviousItem:function(h,b){if(SC.none(b)){b=1
}if(SC.none(h)){h=false}var f=this.get("selection"),e=this.get("content");if(f){f=f.indexSetForSource(e)
}var g=f?f.get("min"):-1,a=f?f.get("max")-1:-1,d=this._selectionAnchor;if(SC.none(d)){d=g
}if(h){if(a>d){a=a-b}else{g=this._findPreviousSelectableItemFromIndex(g-b)}if(SC.none(g)||(g<0)){g=0
}if(!e.objectAt(g)){g=f?f.get("min"):-1}if(a<g){a=g}}else{g=this._findPreviousSelectableItemFromIndex(g-b);
if(SC.none(g)||(g<0)){g=0}if(!e.objectAt(g)){g=f?f.get("min"):-1}a=g;d=null}var c=g;
f=SC.IndexSet.create(g,a+1-g);this.scrollToContentIndex(c);this.select(f);this._selectionAnchor=d;
return this},selectNextItem:function(h,k){if(SC.none(k)){k=1}if(SC.none(h)){h=false
}var b=this.get("selection"),g=this.get("content");if(b){b=b.indexSetForSource(g)
}var a=b?b.get("min"):-1,d=b?b.get("max")-1:-1,e=this._selectionAnchor,c=this.get("length");
if(SC.none(e)){e=a}if(h){if(a<e){a=a+k}else{d=this._findNextSelectableItemFromIndex(d+k,d)
}if(d>=c){d=c-1}if(!g.objectAt(d)){d=b?b.get("max")-1:-1}if(a>d){a=d}}else{d=this._findNextSelectableItemFromIndex(d+k,d);
if(d>=c){d=c-1}if(!g.objectAt(d)){d=b?b.get("max")-1:-1}a=d;e=null}var f=d;b=SC.IndexSet.create(a,d-a+1);
this.scrollToContentIndex(f);this.select(b);this._selectionAnchor=e;return this},deleteSelection:function(){if(!this.get("canDeleteContent")){return NO
}var d=this.get("selection"),c=this.get("content"),a=this.get("selectionDelegate"),b=d&&c?d.indexSetForSource(c):null;
if(!c||!b||b.get("length")===0){return NO}b=a.collectionViewShouldDeleteIndexes(this,b);
if(!b||b.get("length")===0){return NO}a.collectionViewDeleteContent(this,this.get("content"),b);
return YES},scrollToContentIndex:function(b){var a=this.itemViewForContentIndex(b);
if(a){this.scrollToItemView(a)}return this},scrollToItemView:function(a){if(a){a.scrollToVisible()
}return this},keyDown:function(a){var b=this.interpretKeyEvents(a);return !b?NO:b
},keyUp:function(){return true},insertText:function(b,a){if(b===" "){var c=this.get("selection");
if(c&&c.get("length")>0){this.invokeLater(this._cv_action,0,null,a)}return YES}else{return NO
}},selectAll:function(a){var b=this.get("content"),c=b?SC.IndexSet.create(0,b.get("length")):null;
this.select(c,NO);return YES},deleteBackward:function(a){return this.deleteSelection()
},deleteForward:function(a){return this.deleteSelection()},moveDown:function(b,a){this.selectNextItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveUp:function(b,a){this.selectPreviousItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveLeft:function(m){if(m.ctrlKey||m.metaKey){return NO
}if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(false,1);this._cv_performSelectAction(null,m,this.ACTION_DELAY)
}else{var c=this.get("selection"),k=this.get("content"),g=c?c.indexSetForSource(k):null;
if(g){var n=undefined,f=false,h=undefined;if(g.get("length")===1){h=g.get("firstObject");
n=this.get("contentDelegate");var b=n.contentIndexDisclosureState(this,k,h);if(b!==SC.BRANCH_OPEN){f=true
}}if(f){var a=n.contentIndexOutlineLevel(this,k,h)-1;if(a>=0){var e=-1;while(e<0){var d=this._findPreviousSelectableItemFromIndex(h-1);
if(d<0){return false}h=d;var l=n.contentIndexOutlineLevel(this,k,h);if(l===a){e=d
}}if(e!==-1){this.select(h)}}}else{this.collapse(g)}}}return true},moveRight:function(a){if(a.ctrlKey||a.metaKey){return NO
}if((this.get("itemsPerRow")||1)>1){this.selectNextItem(false,1);this._cv_performSelectAction(null,a,this.ACTION_DELAY)
}else{var d=this.get("selection"),c=this.get("content"),b=d?d.indexSetForSource(c):null;
if(b){this.expand(b)}}return true},moveDownAndModifySelection:function(b,a){this.selectNextItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveUpAndModifySelection:function(b,a){this.selectPreviousItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY);return true},moveLeftAndModifySelection:function(b,a){if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(true,1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY)}return true},moveRightAndModifySelection:function(b,a){if((this.get("itemsPerRow")||1)>1){this.selectNextItem(true,1);
this._cv_performSelectAction(null,a,this.ACTION_DELAY)}return true},insertNewline:function(d,c){var b=this.get("isEditable")&&this.get("canEditContent"),g,f,h,a,e;
if(b){g=this.get("selection");f=this.get("content");if(g&&g.get("length")===1){h=g.indexSetForSource(f);
a=h?h.get("min"):-1;b=a>=0}}if(b){e=this.itemViewForContentIndex(a);b=e&&SC.typeOf(e.beginEditing)===SC.T_FUNCTION
}if(b){this.scrollToContentIndex(a);e=this.itemViewForContentIndex(a);e.beginEditing()
}else{this.invokeLater(this._cv_action,0,e,null)}return YES},mouseDown:function(k){var g=this.itemViewForEvent(k),f=this.get("content"),e=g?g.get("contentIndex"):-1,c,d,b,a,l,h=f.get("allowsMultipleSelection");
c=this.mouseDownInfo={event:k,itemView:g,contentIndex:e,at:Date.now()};this.becomeFirstResponder();
if(this.get("useToggleSelection")){if(this.get("selectOnMouseDown")){if(!g){return
}b=this.get("selection");a=b&&b.containsObject(g.get("content"));if(a){this.deselect(e)
}else{if(!h){this.select(e,NO)}else{this.select(e,YES)}}}return YES}if(!g){if(this.get("allowDeselectAll")){this.select(null,false)
}return YES}b=this.get("selection");if(b){b=b.indexSetForSource(f)}a=b?b.contains(e):NO;
c.modifierKeyPressed=l=k.ctrlKey||k.metaKey;if(l&&a){c.shouldDeselect=e>=0}else{if(k.shiftKey&&b&&b.get("length")>0&&h){b=this._findSelectionExtendedByShift(b,e);
d=this._selectionAnchor;this.select(b);this._selectionAnchor=d}else{if(!l&&a){c.shouldReselect=e>=0
}else{if((k.shiftKey||l)&&!h){this.select(null,false)}if(this.get("selectOnMouseDown")){this.select(e,l)
}else{c.shouldSelect=e>=0}}}}c.previousContentIndex=e;return YES},mouseUp:function(k){var l=this.itemViewForEvent(k),d=this.mouseDownInfo,f=this.get("content"),e,c,a,b,g,m,h=f.get("allowsMultipleSelection");
if(this.get("useToggleSelection")){if(!l||this.get("selectOnMouseDown")){return NO
}c=this.get("selection");e=(l)?l.get("contentIndex"):-1;a=c&&c.containsObject(l.get("content"));
if(a){this.deselect(e)}else{if(!h){this.select(e,NO)}else{this.select(e,YES)}}}else{if(d){m=d.contentIndex;
e=(l)?l.get("contentIndex"):-1;if(d.shouldSelect){this.select(m,d.modifierKeyPressed)
}if(d.shouldDeselect){this.deselect(m)}if(d.shouldReselect){b=this.get("isEditable")&&this.get("canEditContent");
if(b){c=this.get("selection");b=c&&(c.get("length")===1)}if(b){g=this.itemViewForContentIndex(m);
b=g&&(!g.contentHitTest||g.contentHitTest(k));b=(b&&g.beginEditing)?g.beginEditing():NO
}if(!b){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()}this._cv_reselectTimer=this.invokeLater(this.select,300,m,false)
}}this._cleanupMouseDown()}}this._cv_performSelectAction(l,k,0,k.clickCount);return NO
},_cleanupMouseDown:function(){var b=this.mouseDownInfo,a;if(b){for(a in b){if(!b.hasOwnProperty(a)){continue
}delete b[a]}}this.mouseDownInfo=null},mouseMoved:function(c){var a=this.itemViewForEvent(c),b=this._lastHoveredItem;
if(a!==b){if(b&&b.mouseOut){b.mouseOut(c)}if(a&&a.mouseOver){a.mouseOver(c)}}this._lastHoveredItem=a;
if(a&&a.mouseMoved){a.mouseMoved(c)}return YES},mouseOut:function(b){var a=this._lastHoveredItem;
this._lastHoveredItem=null;if(a&&a.mouseOut){a.mouseOut(b)}return YES},touchStart:function(d){if(this.get("useToggleSelection")){return true
}var b=this.itemViewForEvent(d),c=this.get("content"),f=b?b.get("contentIndex"):-1,e,a;
this.becomeFirstResponder();this.select(f,NO);this._cv_performSelectAction(this,d);
return YES},touchesDragged:function(a,b){b.forEach(function(c){if(Math.abs(c.pageX-c.startX)>5||Math.abs(c.pageY-c.startY)>5){this.select(null,NO);
c.makeTouchResponder(c.nextTouchResponder)}},this)},touchCancelled:function(a){this.select(null,NO)
},_findSelectionExtendedByShift:function(e,h){if(!e||e.get("length")===0){return SC.IndexSet.create(h)
}var d=this.get("content"),g=d.get("length")-1,c=e.get("min"),a=e.get("max")-1,f=this.mouseDownInfo,b=this._selectionAnchor;
if(SC.none(b)){b=-1}if(h<c){c=h;if(b<0){this._selectionAnchor=b=a}}else{if(h>a){a=h;
if(b<0){this._selectionAnchor=b=c}}else{if(h>=c&&h<=a){if(b<0){this._selectionAnchor=b=c
}if(h===b){c=a=h}else{if(h>b){c=b;a=h}else{if(h<b){c=h;a=b}}}}}}return SC.IndexSet.create(c,a-c+1)
},reorderDataType:function(){return"SC.CollectionView.Reorder."+SC.guidFor(this)}.property().cacheable(),dragContent:null,proposedInsertionIndex:null,proposedDropOperation:null,mouseDragged:function(h){var k=this.get("selectionDelegate"),e=this.get("content"),a=this.get("selection"),c=this.mouseDownInfo,f=this.get("_contentGroupIndexes"),d,b,g;
if(!c||c.contentIndex<0){return YES}if((Date.now()-c.at)<123){return YES}if(k.collectionViewShouldBeginDrag(this)){if(!this.get("selectOnMouseDown")){d=SC.IndexSet.create(c.contentIndex)
}else{d=a?a.indexSetForSource(e):null}if(d&&f&&f.get("length")>0){d=d.copy().remove(f);
if(d.get("length")===0){d=null}else{d.freeze()}}if(!d){return YES}else{d=d.frozenCopy()
}d={content:e,indexes:d};this.set("dragContent",d);b=this.get("dragDataTypes");if(b&&b.get("length")>0){g=k.collectionViewDragViewFor(this,d.indexes);
if(!g){g=this._cv_dragViewFor(d.indexes)}g.createLayer();SC.Drag.start({event:c.event,source:this,dragView:g,ghost:NO,ghostActsLikeCursor:k.ghostActsLikeCursor,slideBack:YES,dataSource:this});
this._cleanupMouseDown();this._lastInsertionIndex=null}else{this.set("dragContent",null)
}return YES}},_cv_dragViewFor:function(d){var b=this.get("nowShowing").without(d);
b=this.get("nowShowing").without(b);var c=this.get("layer").cloneNode(false);var a=SC.View.create({layer:c,parentView:this});
SC.$(c).css("backgroundColor","transparent").css("border","none").css("top",0).css("left",0);
b.forEach(function(g){var h=this.itemViewForContentIndex(g),e,f;if(h){e=h.get("isSelected");
h.set("isSelected",NO);h.updateLayerIfNeeded();f=h.get("layer");if(f){f=f.cloneNode(true)
}h.set("isSelected",e);h.updateLayerIfNeeded()}if(f){c.appendChild(f)}f=null},this);
c=null;return a},dragDataTypes:function(){var a=this.get("selectionDelegate"),b=a.collectionViewDragDataTypes(this),c;
if(this.get("canReorderContent")){b=b?b.copy():[];c=this.get("reorderDataType");if(b.indexOf(c)<0){b.push(c)
}}return b?b:[]}.property(),dragDataForType:function(c,b){if(this.get("canReorderContent")){if(b===this.get("reorderDataType")){return this.get("dragContent")
}}var a=this.get("selectionDelegate");return a.collectionViewDragDataForType(this,c,b)
},computeDragOperations:function(c,b){var d=SC.DRAG_NONE,a=this.get("selectionDelegate");
if(this.get("canReorderContent")){if(c.get("dataTypes").indexOf(this.get("reorderDataType"))>=0){d=SC.DRAG_REORDER
}}d=a.collectionViewComputeDragOperations(this,c,d);if(d&SC.DRAG_REORDER){d=SC.DRAG_MOVE
}return d},_computeDropOperationState:function(c,n,e){var g=this.convertFrameFromView(c.get("location"),null),m=SC.DROP_BEFORE,q=this.get("selectionDelegate"),d=this.get("canReorderContent"),r,h,a,k,f,b;
var l=this.insertionIndexForLocation(g,SC.DROP_ON);if(SC.typeOf(l)===SC.T_ARRAY){m=l[1];
l=l[0]}if(m===SC.DROP_ON){this.set("proposedInsertionIndex",l);this.set("proposedDropOperation",m);
b=q.collectionViewValidateDragOperation(this,c,e,l,m);l=this.get("proposedInsertionIndex");
m=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
if(b!==SC.DRAG_NONE){return[l,m,b]}else{m=SC.DROP_BEFORE;l=this.insertionIndexForLocation(g,SC.DROP_BEFORE);
if(SC.typeOf(l)===SC.T_ARRAY){m=l[1];l=l[0]}}}if((l>=0)&&d&&(m!==SC.DROP_ON)){r=c.dataForType(this.get("reorderDataType"));
if(r){h=this.get("content");if(m===SC.DROP_BEFORE){a=r.indexes.contains(l-1);k=r.indexes.contains(l)
}else{a=r.indexes.contains(l);k=r.indexes.contains(l-1)}if(a&&k){if(SC.none(this._lastInsertionIndex)){if(m===SC.DROP_BEFORE){while((l>=0)&&r.indexes.contains(l)){l--
}}else{f=h?h.get("length"):0;while((l<f)&&r.indexes.contains(l)){l++}}}else{l=this._lastInsertionIndex
}}if(l>=0){e=SC.DRAG_REORDER}}}this.set("proposedInsertionIndex",l);this.set("proposedDropOperation",m);
e=q.collectionViewValidateDragOperation(this,c,e,l,m);l=this.get("proposedInsertionIndex");
m=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
return[l,m,e]},dragUpdated:function(f,b){var h=f.get("allowedDragOperations"),g=this._computeDropOperationState(f,b,h),a=g[0],c=g[1],e=g[2];
if(e!==SC.DRAG_NONE){if((this._lastInsertionIndex!==a)||(this._lastDropOperation!==c)){var d=this.itemViewForContentIndex(a);
this.showInsertionPoint(d,c)}this._lastInsertionIndex=a;this._lastDropOperation=c
}else{this.hideInsertionPoint();this._lastInsertionIndex=this._lastDropOperation=null
}return(e&SC.DRAG_REORDER)?SC.DRAG_MOVE:e},dragExited:function(){this.hideInsertionPoint();
this._lastInsertionIndex=this._lastDropOperation=null},acceptDragOperation:function(a,b){return YES
},performDragOperation:function(e,g){var a=this._computeDropOperationState(e,null,g),m=a[0],l=a[1],h=a[2],n=this.get("selectionDelegate"),c,q,d,k,b,f;
if(h&SC.DRAG_REORDER){g=(g&SC.DRAG_MOVE)?SC.DRAG_REORDER:SC.DRAG_NONE}else{g=g&h}if(g===SC.DRAG_NONE){return g
}c=n.collectionViewPerformDragOperation(this,e,g,m,l);if((c===SC.DRAG_NONE)&&(g&SC.DRAG_REORDER)){d=e.dataForType(this.get("reorderDataType"));
if(!d){return SC.DRAG_NONE}k=this.get("content");f=d.indexes;if(f.get("length")===1){if(((l===SC.DROP_BEFORE)||(l===SC.DROP_AFTER))&&(f.get("min")===m)){return SC.DRAG_MOVE
}}k.beginPropertyChanges();q=[];b=0;d.indexes.forEach(function(r){q.push(k.objectAt(r-b));
k.removeAt(r-b);b++;if(r<m){m--}},this);if(l===SC.DROP_AFTER){m++}k.replace(m,0,q,l);
this.select(SC.IndexSet.create(m,q.length));k.endPropertyChanges();g=SC.DRAG_MOVE
}return g},collectionViewShouldBeginDrag:function(a){return this.get("canReorderContent")
},insertionIndexForLocation:function(a,b){return -1},_cv_isVisibleInWindowDidChange:function(){if(this.get("isVisibleInWindow")){if(this._invalidIndexes){this.invokeOnce(this.reloadIfNeeded)
}if(this._invalidSelection){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)}}}.observes("isVisibleInWindow"),collectionViewShouldSelectItem:function(a,b){return this.get("isSelectable")
},_TMP_DIFF1:SC.IndexSet.create(),_TMP_DIFF2:SC.IndexSet.create(),_cv_nowShowingDidChange:function(){var b=this.get("nowShowing"),a=this._sccv_lastNowShowing,d,e,c;
if(a!==b){if(a&&b){e=this._TMP_DIFF1.add(a).remove(b);c=this._TMP_DIFF2.add(b).remove(a);
d=e.add(c)}else{d=a||b}}if(d&&d.get("length")>0){this._sccv_lastNowShowing=b?b.frozenCopy():null;
this.updateContentRangeObserver();this.reload(d)}if(e){e.clear()}if(c){c.clear()}}.observes("nowShowing"),init:function(){arguments.callee.base.apply(this,arguments);
if(this.useFastPath){this.mixin(SC.CollectionFastPath)}if(this.get("canReorderContent")){this._cv_canReorderContentDidChange()
}this._sccv_lastNowShowing=this.get("nowShowing").clone();if(this.content){this._cv_contentDidChange()
}if(this.selection){this._cv_selectionDidChange()}},_cv_canReorderContentDidChange:function(){if(this.get("canReorderContent")){if(!this.get("isDropTarget")){this.set("isDropTarget",YES)
}SC.Drag.addDropTarget(this)}}.observes("canReorderContent"),_cv_performSelectAction:function(b,d,c,a){var e;
if(c===undefined){c=0}if(a===undefined){a=1}if((a>1)||this.get("actOnSelect")){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()
}e=this.get("selection");e=e?e.toArray():[];if(this._cv_actionTimer){this._cv_actionTimer.invalidate()
}this._cv_actionTimer=this.invokeLater(this._cv_action,c,b,d,e)}},_cv_action:function(b,a,c){var d=this.get("action");
var e=this.get("target")||null;this._cv_actionTimer=null;if(d){if(SC.typeOf(d)===SC.T_FUNCTION){return this.action(b,a)
}var f=this.get("pane");if(f){f.rootResponder.sendAction(d,e,this,f,c)}}else{if(!b){return
}else{if(SC.typeOf(b._action)==SC.T_FUNCTION){return b._action(a)}else{if(SC.typeOf(b.action)==SC.T_FUNCTION){return b.action(a)
}}}}}});SC.DateFieldView=SC.TextFieldView.extend({value:null,showDate:YES,showTime:NO,formatTime:"%I:%M %p",formatDate:"%d/%m/%Y",formatDateTime:"%d/%m/%Y %I:%M %p",_dtConstants:"%a %b %d %H %I %j %m %M %p %S %U %W %y %Y".w(),_wtConstants:[3,3,2,2,2,3,2,2,2,2,2,2,2,4],activeSelection:0,format:function(){var a=this.get("showTime");
var b=this.get("showDate");if(a===YES&&b===YES){return this.get("formatDateTime")
}if(a===YES){return this.get("formatTime")}return this.get("formatDate")}.property("showTime","showDate").cacheable(),validator:function(){return SC.Validator.DateTime.extend({format:this.get("format")})
}.property("format").cacheable(),tabsSelections:function(){var f=[];var d=this.get("format");
var k=this.get("_dtConstants");var b=this.get("_wtConstants");if(SC.empty(d)){throw"The format string is empty, and must be a valid string."
}var g,l,c,e=0,a=0,h=0;while(e<d.length&&d.indexOf("%",e)!==-1){g=d.indexOf("%",e);
l=d.substring(g,g+2);e=g+2;c=k.indexOf(l);if(c===-1){throw"SC.DateFieldView: The format's key '%@' is not supported.".fmt(l)
}a=a+g-h;f.push(SC.Object.create({key:l,textSelection:SC.TextSelection.create({start:a,end:a+b[c]})}));
a=a+b[c];h=e}g=l=c=null;return f}.property("format").cacheable(),updateTextSelecitonObserver:function(){var a=this.get("activeSelection");
var b=this.get("tabsSelections");if(this.get("isEditing")){this.selection(null,b[a].get("textSelection"))
}}.observes("activeSelection","value"),updateValue:function(b,c){var e=(c===0)?-1:1;
var d=this.get("value"),a;switch(b){case"%a":case"%d":case"%j":this.set("value",d.advance({day:e}));
break;case"%b":case"%m":this.set("value",d.advance({month:e}));break;case"%H":case"%I":this.set("value",d.advance({hour:e}));
break;case"%M":this.set("value",d.advance({minute:e}));break;case"%p":a=d.get("hour")>=12?-12:12;
this.set("value",d.advance({hour:a}));break;case"%S":this.set("value",d.advance({second:e}));
break;case"%U":this.set("value",d.advance({week1:e}));break;case"%W":this.set("value",d.advance({week0:e}));
break;case"%y":case"%Y":this.set("value",d.advance({year:e}));break}},_selectRootElement:function(){},keyDown:function(a){if(this.interpretKeyEvents(a)){a.stop();
return YES}return arguments.callee.base.apply(this,arguments)},ctrl_a:function(){return YES
},moveUp:function(b){var a=this.get("activeSelection");var c=this.get("tabsSelections");
this.updateValue(c[a].get("key"),1);return YES},moveDown:function(b){var a=this.get("activeSelection");
var c=this.get("tabsSelections");this.updateValue(c[a].get("key"),0);return YES},insertText:function(a){return YES
},moveRight:function(a){var c=this.get("tabsSelections");var b=this.get("activeSelection")+1;
if(b===c.length){b=0}this.set("activeSelection",b);return YES},moveLeft:function(a){var c=this.get("tabsSelections");
var b=this.get("activeSelection")-1;if(b===-1){b=c.length-1}this.set("activeSelection",b);
return YES},insertTab:function(a){var c=this.get("tabsSelections");var b=this.get("activeSelection")+1;
if(b<c.length){this.set("activeSelection",b);return YES}return NO},insertBacktab:function(a){var b=this.get("activeSelection")-1;
if(b!==-1){this.set("activeSelection",b);return YES}return NO},mouseUp:function(b){var c=arguments.callee.base.apply(this,arguments);
var e=this.get("selection");if(SC.none(e)){this.set("activeSelection",0)}else{var h=e.get("start");
var g=this.get("tabsSelections");var a=g.length,f;for(var d=0;d<a;d++){f=g[d].get("textSelection");
if(h>=f.get("start")&&h<=f.get("end")){this.set("activeSelection",d)}}}return c},deleteBackward:function(a){return YES
},deleteForward:function(a){return YES}});SC.DisclosureView=SC.ButtonView.extend({classNames:["sc-disclosure-view"],theme:"disclosure",buttonBehavior:SC.TOGGLE_BEHAVIOR,toggleOnValue:YES,toggleOffValue:NO,valueBindingDefault:SC.Binding.bool(),render:function(a,c){var b=this.get("displayTitle");
if(c){a.push('<img src="',SC.BLANK_IMAGE_URL,'" class="button" alt="" />');if(this.get("needsEllipsis")){a.push('<span class="ellipsis sc-button-label">',b,"</span>")
}else{a.push('<span class="sc-button-label">',b,"</span>")}}else{this.$("label").text(b)
}},keyDown:function(a){if(a.which===37||a.which===38){this.set("value",this.get("toggleOffValue"));
return YES}if(a.which===39||a.which===40){this.set("value",this.get("toggleOnValue"));
return YES}arguments.callee.base.apply(this,arguments)}});sc_require("views/collection");
sc_require("mixins/collection_row_delegate");SC.ListView=SC.CollectionView.extend(SC.CollectionRowDelegate,{classNames:["sc-list-view"],acceptsFirstResponder:YES,showAlternatingRows:NO,render:function(a,b){a.setClass("alternating",this.get("showAlternatingRows"));
return arguments.callee.base.apply(this,arguments)},rowDelegate:function(){var a=this.delegate,b=this.get("content");
return this.delegateFor("isCollectionRowDelegate",a,b)}.property("delegate","content").cacheable(),_sclv_rowDelegateDidChange:function(){var d=this._sclv_rowDelegate,b=this.get("rowDelegate"),c=this._sclv_rowHeightDidChange,a=this._sclv_customRowHeightIndexesDidChange;
if(d===b){return this}this._sclv_rowDelegate=b;if(d){d.removeObserver("rowHeight",this,c);
d.removeObserver("customRowHeightIndexes",this,a)}if(!b){throw"Internal Inconsistancy: ListView must always have CollectionRowDelegate"
}b.addObserver("rowHeight",this,c);b.addObserver("customRowHeightIndexes",this,a);
this._sclv_rowHeightDidChange()._sclv_customRowHeightIndexesDidChange();return this
}.observes("rowDelegate"),_sclv_rowHeightDidChange:function(){var b=this.get("rowDelegate"),a=b.get("rowHeight"),c;
if(a===this._sclv_rowHeight){return this}this._sclv_rowHeight=a;c=SC.IndexSet.create(0,this.get("length"));
this.rowHeightDidChangeForIndexes(c);return this},_sclv_customRowHeightIndexesDidChange:function(){var a=this.get("rowDelegate"),b=a.get("customRowHeightIndexes"),d=this._sclv_customRowHeightIndexes,c=this._sclv_customRowHeightIndexesContentDidChange;
if((b===d)||(d&&d.isEqual(b))){return this}if(d&&this._sclv_isObservingCustomRowHeightIndexes){d.removeObserver("[]",this,c)
}if(this._sclv_isObservingCustomRowHeightIndexes=b&&!b.get("isFrozen")){b.addObserver("[]",this,c)
}this._sclv_customRowHeightIndexesContentDidChange();return this},_sclv_customRowHeightIndexesContentDidChange:function(){var a=this.get("rowDelegate"),b=a.get("customRowHeightIndexes"),c=this._sclv_customRowHeightIndexes,d;
if(b&&c){d=b.copy().add(c)}else{d=b||c}this._sclv_customRowHeightIndexes=b?b.frozenCopy():null;
this.rowHeightDidChangeForIndexes(d);return this},rowOffsetForContentIndex:function(h){if(h===0){return 0
}var l=this.get("rowDelegate"),a=l.get("rowHeight"),f,e,c,b,k,g,d;e=h*a;f=this.get("rowSpacing");
if(f){e+=h*f}if(l.customRowHeightIndexes&&(c=l.get("customRowHeightIndexes"))){b=this._sclv_offsetCache;
if(!b){b=[];k=g=0;c.forEach(function(m){k+=this.rowHeightForContentIndex(m)-a;b[m+1]=k;
g=m},this);this._sclv_max=g+1;this._sclv_offsetCache=b}k=b[h];if(k===undefined){k=b[h]=b[h-1];
if(k===undefined){g=this._sclv_max;if(h<g){g=c.indexBefore(h)+1}k=b[h]=b[g]||0}}e+=k
}return e},rowHeightForContentIndex:function(a){var b=this.get("rowDelegate"),e,c,f,d;
if(b.customRowHeightIndexes&&(d=b.get("customRowHeightIndexes"))){c=this._sclv_heightCache;
if(!c){c=[];f=this.get("content");d.forEach(function(g){c[g]=b.contentIndexRowHeight(this,f,g)
},this);this._sclv_heightCache=c}e=c[a];if(e===undefined){e=b.get("rowHeight")}}else{e=b.get("rowHeight")
}return e},rowHeightDidChangeForIndexes:function(b){var a=this.get("length");this._sclv_heightCache=this._sclv_offsetCache=null;
if(b&&b.isIndexSet){b=b.get("min")}this.reload(SC.IndexSet.create(b,a-b));return this
},computeLayout:function(){var a=this._sclv_layout;if(!a){a=this._sclv_layout={}}a.minHeight=this.rowOffsetForContentIndex(this.get("length"));
this.set("calculatedHeight",a.minHeight);return a},layoutForContentIndex:function(a){return{top:this.rowOffsetForContentIndex(a),height:this.rowHeightForContentIndex(a),left:0,right:0}
},contentIndexesInRect:function(h){var a=this.get("rowDelegate").get("rowHeight"),g=SC.minY(h),b=SC.maxY(h),k=h.height||0,f=this.get("length"),e,c,d;
c=(g-(g%a))/a;e=this.rowOffsetForContentIndex(c);while(c>0&&e>g){c--;e-=this.rowHeightForContentIndex(c)
}e+=this.rowHeightForContentIndex(c);while(c<f&&e<=g){c++;e+=this.rowHeightForContentIndex(c)
}if(c<0){c=0}if(c>=f){c=f}d=c+((k-(k%a))/a);if(d>f){d=f}e=this.rowOffsetForContentIndex(d);
while(d>=c&&e>=b){d--;e-=this.rowHeightForContentIndex(d)}e+=this.rowHeightForContentIndex(d);
while(d<f&&e<b){d++;e+=this.rowHeightForContentIndex(d)}d++;if(d<c){d=c}if(d>f){d=f
}return SC.IndexSet.create(c,d-c)},insertionPointView:SC.View.extend({classNames:"sc-list-insertion-point",render:function(a,b){if(b){a.push('<div class="anchor"></div>')
}}}),showInsertionPoint:function(g,f){var h=this._insertionPointView;if(!h){h=this._insertionPointView=this.get("insertionPointView").create()
}var d=g.get("contentIndex"),e=this.get("length"),c=SC.clone(g.get("layout")),a=g.get("outlineLevel"),b=g.get("outlineIndent")||0,k;
if((d>=e)&&d>0){k=this.itemViewForContentIndex(e-1);if(k.get("isGroupView")){a=1;
b=k.get("outlineIndent")}}if(SC.none(a)){a=-1}if(f&SC.DROP_ON){this.hideInsertionPoint();
g.set("isSelected",YES);this._lastDropOnView=g}else{if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}if(f&SC.DROP_AFTER){c.top+=c.height}c.height=2;c.right=0;
c.left=((a+1)*b)+12;delete c.width;h.set("layout",c);this.appendChild(h)}},hideInsertionPoint:function(){if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}var a=this._insertionPointView;if(a){a.removeFromParent().destroy()
}this._insertionPointView=null},insertionIndexForLocation:function(g,m){var b={x:g.x,y:g.y,width:1,height:1},f=this.contentIndexesInRect(b),h=f.get("min"),k=this.get("length"),c,n,q,e,s,d,r,l,a;
if(SC.none(h)||h<0){if((k===0)||(g.y<=this.rowOffsetForContentIndex(0))){h=0}else{if(g.y>=this.rowOffsetForContentIndex(k)){h=k
}}}c=this.rowOffsetForContentIndex(h);n=c+this.rowHeightForContentIndex(h);if(m==SC.DROP_ON){if(this.get("isEditable")){q=Math.min(Math.floor((n-c)*0.2),5)
}else{q=0}if(g.y>=(c+q)||g.y<=(n+q)){return[h,SC.DROP_ON]}}if((h<k)&&(g.y>=n-10)){h++
}if(h>0){l=this.itemViewForContentIndex(h-1);r=(l?l.get("outlineIndent"):0)||0;d=l?l.get("outlineLevel"):0;
if(h<k){l=this.itemViewForContentIndex(h);e=l?l.get("outlineLevel"):0;s=(l?l.get("outlineIndent"):0)||0;
s*=e}else{e=l.get("isGroupView")?1:0;s=r*e}r*=d;if((e!==d)&&(s!==r)){if(r>s){h--;
m=SC.DROP_AFTER}}}if(m===SC.DROP_BEFORE){l=(h<k)?this.itemViewForContentIndex(h):null;
if(!l||l.get("isGroupView")){if(h>0){l=this.itemViewForContentIndex(h-1);if(!l.get("isGroupView")||(l.get("disclosureState")===SC.BRANCH_OPEN)){h=h-1;
m=SC.DROP_AFTER}else{h=-1}}else{h=-1}}if(h<0){m=SC.DRAG_NONE}}return[h,m]},mouseWheel:function(a){var b=SC.InlineTextFieldView.editor;
if(b&&b.get("isEditing")){if(b.get("delegate").get("displayDelegate")===this){SC.InlineTextFieldView.commitEditing()
}}return NO},init:function(){arguments.callee.base.apply(this,arguments);this._sclv_rowDelegateDidChange()
}});require("views/list");SC.GridView=SC.ListView.extend({classNames:["sc-grid-view"],layout:{left:0,right:0,top:0,bottom:0},rowHeight:48,columnWidth:64,exampleView:SC.LabelView,insertionOrientation:SC.HORIZONTAL_ORIENTATION,itemsPerRow:function(){var b=this.get("frame"),a=this.get("columnWidth")||0;
return(a<=0)?1:Math.floor(b.width/a)}.property("clippingFrame","columnWidth").cacheable(),contentIndexesInRect:function(e){var d=this.get("rowHeight")||48,b=this.get("itemsPerRow"),c=Math.floor(SC.minY(e)/d)*b,a=Math.ceil(SC.maxY(e)/d)*b;
return SC.IndexSet.create(c,a-c)},layoutForContentIndex:function(g){var d=this.get("rowHeight")||48,a=this.get("clippingFrame").width,b=this.get("itemsPerRow"),e=Math.floor(a/b),f=Math.floor(g/b),c=g-(b*f);
return{left:c*e,top:f*d,height:d,width:e}},computeLayout:function(){var e=this.get("content"),d=(e)?e.get("length"):0,c=this.get("rowHeight")||48,a=this.get("itemsPerRow"),f=Math.ceil(d/a);
var b=this._cachedLayoutHash;if(!b){b=this._cachedLayoutHash={}}b.minHeight=f*c;this.calculatedHeight=b.minHeight;
return b},insertionPointClass:SC.View.extend({classNames:["grid-insertion-point"],render:function(a,b){if(b){a.push('<span class="anchor"></span>')
}}}),showInsertionPoint:function(c,e){if(!c){return}if(e===SC.DROP_ON){if(c!==this._dropOnInsertionPoint){this.hideInsertionPoint();
this._dropOnInsertionPoint=c}}else{if(this._dropOnInsertionPoint){this._dropOnInsertionPoint=null
}if(!this._insertionPointView){this._insertionPointView=this.insertionPointClass.create()
}var b=this._insertionPointView;var a=c.get("frame");var d={height:a.height-6,x:a.x,y:a.y+6,width:0};
if(!SC.rectsEqual(b.get("frame"),d)){b.set("frame",d)}if(b.parentNode!==c.parentNode){c.parentNode.appendChild(b)
}}},hideInsertionPoint:function(){var a=this._insertionPointView;if(a){a.removeFromParent()
}if(this._dropOnInsertionPoint){this._dropOnInsertionPoint=null}},insertionIndexForLocation:function(d,l){var e=this.get("frame"),g=this.get("clippingFrame"),m=this.get("itemsPerRow"),a=Math.floor(e.width/m),q=Math.floor((d.y-e.y-g.y)/this.get("rowHeight"));
var k=SC.DROP_BEFORE,c=(d.x-e.x-g.x),b=Math.floor(c/a),n=(c/a)-b;if(l===SC.DROP_ON){if(n>0.8){b++
}if((n>=0.2)&&(n<=0.8)){k=SC.DROP_ON}}else{if(n>0.45){b++}}var h=(q*m)+b;return[h,k]
},_gv_clippingFrameDidChange:function(){var d=this.get("nowShowing"),c,b,a;this.notifyPropertyChange("itemsPerRow");
a=d.get("length");for(b=0;b<a;b++){c=this.itemViewForContentIndex(b);c.adjust(this.layoutForContentIndex(b))
}}.observes("clippingFrame")});SC.ScrollerView=SC.View.extend({classNames:["sc-scroller-view"],shouldScrollToClick:NO,_touchScrollValue:NO,value:function(a,c){var b=this.get("minimum");
if(c!==undefined){this._scs_value=c}c=this._scs_value||b;return Math.max(Math.min(c,this.get("maximum")),b)
}.property("maximum","minimum").cacheable(),displayValue:function(){var a;if(this.get("_touchScrollValue")){a=this.get("_touchScrollValue")
}else{a=this.get("value")}return a}.property("value","_touchScrollValue").cacheable(),proportion:0,maximum:100,minimum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,hasButtons:YES,scrollbarThickness:14,capLength:18,capOverlap:14,buttonLength:41,buttonOverlap:11,displayProperties:"thumbPosition thumbLength isEnabled controlsHidden".w(),render:function(c,a){var b={},k="",e,m,g,f,n,l,h,d,q;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b["sc-vertical"]=YES;
break;case SC.LAYOUT_HORIZONTAL:b["sc-horizontal"]=YES;break}b.disabled=!this.get("isEnabled");
b["controls-hidden"]=this.get("controlsHidden");c.setClass(b);m=this.get("thumbLength");
e=this.get("thumbPosition");if(a){if(this.get("hasButtons")){k='<div class="button-bottom"></div><div class="button-top"></div>'
}else{k='<div class="endcap"></div>'}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:c.push('<div class="track"></div>','<div class="cap"></div>',k,'<div class="thumb" style="height: '+m+"px; top: "+e+'px;">','<div class="thumb-center"></div>','<div class="thumb-top"></div>','<div class="thumb-bottom"></div></div>');
break;case SC.LAYOUT_HORIZONTAL:c.push('<div class="track"></div>','<div class="cap"></div>',k,'<div class="thumb" style="width: '+m+"px; left: "+e+'px;">','<div class="thumb-center"></div>','<div class="thumb-top"></div>','<div class="thumb-bottom"></div></div>')
}}else{if(this.get("controlsHidden")){return}f=this.$(".thumb");this.adjustThumb(f,e,m)
}},touchScrollDidStart:function(a){this.set("_touchScrollValue",a)},touchScrollDidEnd:function(a){this.set("_touchScrollValue",NO)
},touchScrollDidChange:function(a){this.set("_touchScrollValue",a)},adjustThumb:function(b,a,c){this.adjustThumbPosition(b,a);
this.adjustThumbSize(b,c)},adjustThumbPosition:function(b,a){if(this._thumbPosition===a){return
}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.css("top",a);break;
case SC.LAYOUT_HORIZONTAL:b.css("left",a);break}this._thumbPosition=a},adjustThumbSize:function(a,b){if(this._thumbSize===b){return
}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a.css("height",Math.max(b,20));
break;case SC.LAYOUT_HORIZONTAL:a.css("width",Math.max(b,20));break}this._thumbSize=b
},trackLength:function(){var a=this.get("scrollerLength");a-=this.capLength-this.capOverlap;
a-=this.buttonLength-this.buttonOverlap;return a}.property("scrollerLength").cacheable(),scrollerLength:function(){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:return this.get("frame").height;
case SC.LAYOUT_HORIZONTAL:return this.get("frame").width}return 0}.property("frame").cacheable(),thumbLength:function(){var a;
a=Math.floor(this.get("trackLength")*this.get("proportion"));a=isNaN(a)?0:a;return Math.max(a,20)
}.property("trackLength","proportion").cacheable(),thumbPosition:function(){var g=this.get("displayValue"),c=this.get("maximum"),b=this.get("trackLength"),d=this.get("thumbLength"),f=this.get("capLength"),e=this.get("capOverlap"),a;
a=(g/c)*(b-d);a+=f-e;return Math.floor(isNaN(a)?0:a)}.property("displayValue","maximum","trackLength","thumbLength").cacheable(),controlsHidden:function(){return this.get("proportion")>=1
}.property("proportion").cacheable(),valueForPosition:function(g){var b=this.get("maximum"),a=this.get("trackLength"),c=this.get("thumbLength"),f=this.get("capLength"),d=this.get("capOverlap"),e;
e=g-(f-d);e=e/(a-c);e=e*b;return e},mouseDown:function(l){if(!this.get("isEnabled")){return NO
}this._altIsDown=l.altKey;this._shiftIsDown=l.shiftKey;var e=l.target,c=this.get("thumbPosition"),k,d,g,f=this.get("scrollerLength");
if(e.className.indexOf("thumb")>=0){d=this.convertFrameFromView({x:l.pageX,y:l.pageY});
d.x-=c;d.y-=c;this._thumbDragging=YES;this._thumbOffset=d;this._mouseDownLocation={x:l.pageX,y:l.pageY};
this._thumbPositionAtDragStart=this.get("thumbPosition");this._valueAtDragStart=this.get("value")
}else{if(e.className.indexOf("button-top")>=0){this.decrementProperty("value",(this._altIsDown?f:30));
this.makeButtonActive(".button-top");this.startMouseDownTimer("scrollUp");this._isScrollingUp=YES
}else{if(e.className.indexOf("button-bottom")>=0){this.incrementProperty("value",(this._altIsDown?f:30));
this.makeButtonActive(".button-bottom");this.startMouseDownTimer("scrollDown");this._isScrollingDown=YES
}else{var n=this.get("shouldScrollToClick");if(l.altKey){n=!n}var a=this.get("trackLength"),h=this.get("thumbLength"),b=this.convertFrameFromView({x:l.pageX,y:l.pageY}),m;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:this._mouseDownLocation=m=b.y;
break;case SC.LAYOUT_HORIZONTAL:this._mouseDownLocation=m=b.x;break}if(n){this.set("value",this.valueForPosition(m-(h/2)));
c=this.get("thumbPosition");this._thumbDragging=YES;this._thumbOffset={x:b.x-c,y:b.y-c};
this._mouseDownLocation={x:l.pageX,y:l.pageY};this._thumbPositionAtDragStart=c;this._valueAtDragStart=this.get("value")
}else{if(m<c){this.decrementProperty("value",f);this.startMouseDownTimer("page")}else{this.incrementProperty("value",f);
this.startMouseDownTimer("page")}}}}}return YES},mouseUp:function(a){var c=this._scs_buttonActive,b=NO,d;
if(c){c.removeClass("active");b=YES}d=this._mouseDownTimer;if(d){d.invalidate();this._mouseDownTimer=null
}this._thumbDragging=NO;this._isScrollingDown=NO;this._isScrollingUp=NO;return b},mouseDragged:function(q){var m,b,n,c,k=q.target,e=this._thumbPositionAtDragStart,g=this._isScrollingUp,s=this._isScrollingDown,d=this._scs_buttonActive,a;
if(this._thumbDragging){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:n=(q.pageY-this._mouseDownLocation.y);
break;case SC.LAYOUT_HORIZONTAL:n=(q.pageX-this._mouseDownLocation.x);break}if(q.altKey){if(!this._altIsDown||(this._shiftIsDown!==q.shiftKey)){e=this._thumbPositionAtDragStart=e+n;
n=0;this._mouseDownLocation={x:q.pageX,y:q.pageY};this._valueAtDragStart=this.get("value")
}if(q.shiftKey){n=-n}this.set("value",Math.round(this._valueAtDragStart+n*2))}else{c=e+n;
b=this.get("trackLength")-this.get("thumbLength");this.set("value",Math.round((c/b)*this.get("maximum")))
}}else{if(g||s){var r=NO,f=NO;var l=this.$(".button-top")[0].getBoundingClientRect();
var h=this.$(".button-bottom")[0].getBoundingClientRect();switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:if(q.pageY<l.bottom){r=YES
}else{f=YES}break;case SC.LAYOUT_HORIZONTAL:if(q.pageX<l.right){r=YES}else{f=YES}break
}if((r||f)&&r!==g){if(d){d.removeClass("active")}this._mouseDownTimerAction=r?"scrollUp":"scrollDown";
if(r){this.makeButtonActive(".button-top")}else{if(f){this.makeButtonActive(".button-bottom")
}}this._isScrollingUp=r;this._isScrollingDown=f}}}this._altIsDown=q.altKey;this._shiftIsDown=q.shiftKey;
return YES},startMouseDownTimer:function(b,a){var c;this._mouseDownTimerAction=b;
this._mouseDownTimer=SC.Timer.schedule({target:this,action:this.mouseDownTimerDidFire,interval:a?0:300})
},mouseDownTimerDidFire:function(){var d=this.get("scrollerLength"),a=SC.device.get("mouseLocation"),c=this.get("thumbPosition"),b=this.get("thumbLength"),e=50;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a=this.convertFrameFromView(a).y;
break;case SC.LAYOUT_HORIZONTAL:a=this.convertFrameFromView(a).x;break}switch(this._mouseDownTimerAction){case"scrollDown":this.incrementProperty("value",this._altIsDown?d:30);
break;case"scrollUp":this.decrementProperty("value",this._altIsDown?d:30);break;case"page":e=150;
if(a<c){this.decrementProperty("value",d)}else{if(a>c+b){this.incrementProperty("value",d)
}}}this._mouseDownTimer=SC.Timer.schedule({target:this,action:this.mouseDownTimerDidFire,interval:e})
},makeButtonActive:function(a){this._scs_buttonActive=this.$(a).addClass("active")
}});SC.TouchScrollerView=SC.ScrollerView.extend({classNames:["sc-touch-scroller-view"],scrollbarThickness:12,capLength:5,capOverlap:0,hasButtons:NO,buttonOverlap:36,adjustThumb:function(d,b,f){var c=this.$(".thumb-inner");
var a=this.get("scrollerLength")-this.capLength,e=this.get("minimum")+this.capLength;
if(b+f>a){b=Math.min(a-20,b);f=a-b}if(b<e){f-=e-b;b=e}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:if(this._thumbPosition!==b){d.css("-webkit-transform","translate3d(0px,"+b+"px,0px)")
}if(this._thumbSize!==f){c.css("-webkit-transform","translate3d(0px,"+Math.round(f-1044)+"px,0px)")
}break;case SC.LAYOUT_HORIZONTAL:if(this._thumbPosition!==b){d.css("-webkit-transform","translate3d("+b+"px,0px,0px)")
}if(this._thumbSize!==f){c.css("-webkit-transform","translate3d("+Math.round(f-1044)+"px,0px,0px)")
}break}this._thumbPosition=b;this._thumbSize=f},render:function(c,a){var b=[],k="",e,m,g,f,n,l,h,d,q;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.push("sc-vertical");
break;case SC.LAYOUT_HORIZONTAL:b.push("sc-horizontal");break}if(!this.get("isEnabled")){b.push("disabled")
}if(this.get("controlsHidden")){b.push("controls-hidden")}c.addClass(b);m=this.get("thumbLength");
e=this.get("thumbPosition");if(a){if(this.get("hasButtons")){k='<div class="button-bottom"></div><div class="button-top"></div>'
}else{k='<div class="endcap"></div>'}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:c.push('<div class="track"></div>','<div class="cap"></div>',k,'<div class="thumb">','<div class="thumb-top"></div>','<div class="thumb-clip">','<div class="thumb-inner" style="-webkit-transform: translateY('+(m-1044)+'px);">','<div class="thumb-center"></div>','<div class="thumb-bottom"></div></div></div></div>');
break;case SC.LAYOUT_HORIZONTAL:c.push('<div class="track"></div>','<div class="cap"></div>',k,'<div class="thumb">','<div class="thumb-top"></div>','<div class="thumb-clip">','<div class="thumb-inner" style="-webkit-transform: translateX('+(m-1044)+'px);">','<div class="thumb-center"></div>','<div class="thumb-bottom"></div></div></div></div>')
}}else{if(this.get("controlsHidden")){return}f=this.$(".thumb");this.adjustThumb(f,e,m)
}}});sc_require("views/scroller");sc_require("mixins/border");SC.NORMAL_SCROLL_DECELERATION=0.95;
SC.FAST_SCROLL_DECELERATION=0.85;SC.ScrollView=SC.View.extend(SC.Border,{classNames:["sc-scroll-view"],isScrollable:YES,contentView:null,horizontalAlign:SC.ALIGN_LEFT,verticalAlign:SC.ALIGN_TOP,horizontalScrollOffset:function(b,d){if(d!==undefined){var c=this.minimumHorizontalScrollOffset(),a=this.get("maximumHorizontalScrollOffset");
this._scroll_horizontalScrollOffset=Math.max(c,Math.min(a,d))}return this._scroll_horizontalScrollOffset||0
}.property().cacheable(),verticalScrollOffset:function(b,d){if(d!==undefined){var c=this.get("minimumVerticalScrollOffset"),a=this.get("maximumVerticalScrollOffset");
this._scroll_verticalScrollOffset=Math.max(c,Math.min(a,d))}return this._scroll_verticalScrollOffset||0
}.property().cacheable(),maximumScrollOffset:function(b,a,c){if(b>=a){return b-a}if(c===SC.ALIGN_LEFT||c===SC.ALIGN_TOP){return 0
}else{if(c===SC.ALIGN_MIDDLE||c===SC.ALIGN_CENTER){return 0-Math.round((a-b)/2)}else{return 0-(a-b)
}}},minimumScrollOffset:function(b,a,c){if(b>a){return 0}if(c===SC.ALIGN_LEFT||c===SC.ALIGN_TOP){return 0
}else{if(c===SC.ALIGN_MIDDLE||c===SC.ALIGN_CENTER){return 0-Math.round((a-b)/2)}else{return 0-(a-b)
}}},maximumHorizontalScrollOffset:function(){var c=this.get("contentView"),b=0,a=0;
if(c&&c.get("frame")){b=c.get("frame").width}if(c){a=c.calculatedWidth||0}if(c&&c.calculatedWidth&&c.calculatedWidth!==0){b=c.calculatedWidth
}b*=this._scale;var d=this.get("containerView").get("frame").width;if(!this.get("canScrollHorizontal")){b=Math.min(b,d)
}return this.maximumScrollOffset(b,d,this.get("horizontalAlign"))}.property(),maximumVerticalScrollOffset:function(){var a=this.get("contentView"),c=0,b=0;
if(a&&a.get("frame")){c=a.get("frame").height}if(a){b=a.calculatedHeight||0}if(a&&a.calculatedHeight&&a.calculatedHeight!==0){c=a.calculatedHeight
}c*=this._scale;var d=this.get("containerView").get("frame").height;if(!this.get("canScrollVertical")){c=Math.min(c,d)
}return this.maximumScrollOffset(c,d,this.get("verticalAlign"))}.property(),minimumHorizontalScrollOffset:function(){var b=this.get("contentView");
var a=b?b.get("frame").width:0;if(b&&b.calculatedWidth&&b.calculatedWidth!==0){a=b.calculatedWidth
}a*=this._scale;var c=this.get("containerView").get("frame").width;if(!this.get("canScrollHorizontal")){a=Math.min(a,c)
}return this.minimumScrollOffset(a,c,this.get("horizontalAlign"))}.property(),minimumVerticalScrollOffset:function(){var a=this.get("contentView");
var b=(a&&a.get("frame"))?a.get("frame").height:0;if(a&&a.calculatedHeight&&a.calculatedHeight!==0){b=a.calculatedHeight
}b*=this._scale;var c=this.get("containerView").get("frame").height;if(!this.get("canScrollVertical")){b=Math.min(b,c)
}return this.minimumScrollOffset(b,c,this.get("verticalAlign"))}.property(),verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("frame").height
}.property("frame"),horizontalPageScroll:function(){return this.get("frame").width
}.property("frame"),hasHorizontalScroller:YES,horizontalScrollerView:SC.ScrollerView,horizontalTouchScrollerView:SC.TouchScrollerView,isHorizontalScrollerVisible:YES,canScrollHorizontal:function(){return !!(this.get("hasHorizontalScroller")&&this.get("horizontalScrollerView")&&this.get("isHorizontalScrollerVisible"))
}.property("isHorizontalScrollerVisible").cacheable(),autohidesHorizontalScroller:YES,hasVerticalScroller:YES,verticalScrollerView:SC.ScrollerView,verticalTouchScrollerView:SC.TouchScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:function(){return !!(this.get("hasVerticalScroller")&&this.get("verticalScrollerView")&&this.get("isVerticalScrollerVisible"))
}.property("isVerticalScrollerVisible").cacheable(),autohidesVerticalScroller:YES,verticalScrollerBottom:0,verticalOverlay:function(){if(SC.platform.touch){return YES
}return NO}.property().cacheable(),horizontalOverlay:function(){if(SC.platform.touch){return YES
}return NO}.property().cacheable(),verticalScrollerLayout:null,horizontalScrollerLayout:null,containerView:SC.ContainerView.extend({}),scrollTo:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}if(!SC.none(a)){a=Math.max(this.get("minimumHorizontalScrollOffset"),Math.min(this.get("maximumHorizontalScrollOffset"),a));
this.set("horizontalScrollOffset",a)}if(!SC.none(b)){b=Math.max(this.get("minimumVerticalScrollOffset"),Math.min(this.get("maximumVerticalScrollOffset"),b));
this.set("verticalScrollOffset",b)}return this},scrollBy:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}a=(a)?this.get("horizontalScrollOffset")+a:null;b=(b)?this.get("verticalScrollOffset")+b:null;
return this.scrollTo(a,b)},scrollToVisible:function(b){if(arguments.length===0){return arguments.callee.base.apply(this,arguments)
}var c=this.get("contentView");if(!c){return NO}var a=b.get("frame");if(!a){return NO
}a=c.convertFrameFromView(a,b.get("parentView"));return this.scrollToRect(a)},scrollToRect:function(b){var a=SC.cloneRect(this.get("containerView").get("frame"));
a.x=this.get("horizontalScrollOffset");a.y=this.get("verticalScrollOffset");var d=a.x,c=a.y;
a.y-=Math.max(0,SC.minY(a)-SC.minY(b));a.x-=Math.max(0,SC.minX(a)-SC.minX(b));a.y+=Math.max(0,SC.maxY(b)-SC.maxY(a));
a.x+=Math.max(0,SC.maxX(b)-SC.maxX(a));if((d!==a.x)||(c!==a.y)){this.scrollTo(a.x,a.y);
return YES}else{return NO}},scrollDownLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalLineScroll")*a)
},scrollUpLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-this.get("verticalLineScroll")*a)
},scrollRightLine:function(a){if(a===undefined){a=1}return this.scrollTo(this.get("horizontalLineScroll")*a,null)
},scrollLeftLine:function(a){if(a===undefined){a=1}return this.scrollTo(0-this.get("horizontalLineScroll")*a,null)
},scrollDownPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalPageScroll")*a)
},scrollUpPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-(this.get("verticalPageScroll")*a))
},scrollRightPage:function(a){if(a===undefined){a=1}return this.scrollBy(this.get("horizontalPageScroll")*a,null)
},scrollLeftPage:function(a){if(a===undefined){a=1}return this.scrollBy(0-(this.get("horizontalPageScroll")*a),null)
},tile:function(){var c=this.get("hasHorizontalScroller")?this.get("horizontalScrollerView"):null;
var h=c&&this.get("isHorizontalScrollerVisible");var l=this.get("hasVerticalScroller")?this.get("verticalScrollerView"):null;
var f=l&&this.get("isVerticalScrollerVisible");var e=this.get("containerView");var q={left:0,top:0};
var n,g,b,r,d,a;var k=((h)?c.get("scrollbarThickness"):0);var m=(f)?l.get("scrollbarThickness"):0;
if(h){a=this.get("horizontalScrollerLayout");g={left:(a?a.left:0),bottom:(a?a.bottom:0),right:(a?a.right+m-1:m-1),height:k};
c.set("layout",g);r=this.get("horizontalOverlay");q.bottom=r?0:(g.bottom+k)}else{q.bottom=0
}if(c){c.set("isVisible",h)}if(f){k=k+this.get("verticalScrollerBottom");d=this.get("verticalScrollerLayout");
g={top:(d?d.top:0),bottom:(d?d.bottom+k:k),right:(d?d.right:0),width:m};l.set("layout",g);
b=this.get("verticalOverlay");q.right=b?0:(g.right+m)}else{q.right=0}if(l){l.set("isVisible",f)
}e.adjust(q)},scrollerVisibilityDidChange:function(){this.tile()}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible"),_scroll_wheelDeltaX:0,_scroll_wheelDeltaY:0,mouseWheel:function(a){var b=(SC.browser.safari&&SC.browser.version>533)?120:1;
this._scroll_wheelDeltaX+=a.wheelDeltaX/b;this._scroll_wheelDeltaY+=a.wheelDeltaY/b;
this.invokeLater(this._scroll_mouseWheel,10);return this.get("canScrollHorizontal")||this.get("canScrollVertical")
},_scroll_mouseWheel:function(){this.scrollBy(this._scroll_wheelDeltaX,this._scroll_wheelDeltaY);
if(SC.WHEEL_MOMENTUM&&this._scroll_wheelDeltaY>0){this._scroll_wheelDeltaY=Math.floor(this._scroll_wheelDeltaY*0.95);
this._scroll_wheelDeltaY=Math.max(this._scroll_wheelDeltaY,0);this.invokeLater(this._scroll_mouseWheel,10)
}else{if(SC.WHEEL_MOMENTUM&&this._scroll_wheelDeltaY<0){this._scroll_wheelDeltaY=Math.ceil(this._scroll_wheelDeltaY*0.95);
this._scroll_wheelDeltaY=Math.min(this._scroll_wheelDeltaY,0);this.invokeLater(this._scroll_mouseWheel,10)
}else{this._scroll_wheelDeltaY=0;this._scroll_wheelDeltaX=0}}},canScale:NO,_scale:1,scale:function(a,b){if(b!==undefined){this._scale=Math.min(Math.max(this.get("minimumScale"),b),this.get("maximumScale"))
}return this._scale}.property().cacheable(),minimumScale:0.25,maximumScale:2,autoScaleRange:NO,_scale_css:"",updateScale:function(b){var a=this.get("contentView");
if(!a){return}if(a.isScalable){this.get("contentView").applyScale(b);this._scale_css=""
}else{this._scale_css="scale3d("+b+", "+b+", 1)"}},acceptsMultitouch:YES,decelerationRate:SC.NORMAL_SCROLL_DECELERATION,alwaysBounceHorizontal:NO,alwaysBounceVertical:YES,delaysContentTouches:YES,_touchScrollDidChange:function(){if(this.get("contentView").touchScrollDidChange){this.get("contentView").touchScrollDidChange(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidChange){this.verticalScrollerView.touchScrollDidChange(this._scroll_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidChange){this.horizontalScrollerView.touchScrollDidChange(this._scroll_horizontalScrollOffset)
}},_touchScrollDidStart:function(){if(this.get("contentView").touchScrollDidStart){this.get("contentView").touchScrollDidStart(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidStart){this.verticalScrollerView.touchScrollDidStart(this._touch_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidStart){this.horizontalScrollerView.touchScrollDidStart(this._touch_horizontalScrollOffset)
}},_touchScrollDidEnd:function(){if(this.get("contentView").touchScrollDidEnd){this.get("contentView").touchScrollDidEnd(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidEnd){this.verticalScrollerView.touchScrollDidEnd(this._touch_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidEnd){this.horizontalScrollerView.touchScrollDidEnd(this._touch_horizontalScrollOffset)
}},_applyCSSTransforms:function(b){var a="";this.updateScale(this._scale);a+="translate3d("+-this._scroll_horizontalScrollOffset+"px, "+-Math.round(this._scroll_verticalScrollOffset)+"px,0) ";
a+=this._scale_css;b.style.webkitTransform=a;b.style.webkitTransformOrigin="top left"
},captureTouch:function(a){return YES},touchGeneration:0,touchStart:function(b){var a=++this.touchGeneration;
if(!this.tracking&&this.get("delaysContentTouches")){this.invokeLater(this.beginTouchesInContent,150,a)
}else{if(!this.tracking){this.invokeLater(this.beginTouchesInContent,1,a)}}this.beginTouchTracking(b,YES);
return YES},beginTouchesInContent:function(b){if(b!==this.touchGeneration){return
}var c=this.touch,a;if(c&&this.tracking&&!this.dragging&&!c.touch.scrollHasEnded){c.touch.captureTouch(this,YES);
if(!c.touch.touchResponder){c.touch.makeTouchResponder(this)}else{if(c.needsScrollEnd){this._touchScrollDidEnd()
}}}},beginTouchTracking:function(d,r){var g=d.averagedTouchesForView(this,r);var b=this._scroll_verticalScrollOffset||0,c=this._scroll_horizontalScrollOffset||0,k=c,h=b,e=NO;
if(this.touch&&this.touch.timeout){clearTimeout(this.touch.timeout);this.touch.timeout=null;
k=this.touch.startClipOffset.x;h=this.touch.startClipOffset.y;e=YES}var l=this.get("contentView");
var a=l?l.get("frame").width:0,n=l?l.get("frame").height:0;if(l.calculatedWidth&&l.calculatedWidth!==0){a=l.calculatedWidth
}if(l.calculatedHeight&&l.calculatedHeight!==0){n=l.calculatedHeight}var m=this.get("containerView").get("frame").width,u=this.get("containerView").get("frame").height;
var f=this.convertFrameToView(this.get("frame"),null),s=(c+(g.x-f.x))/this._scale,q=(b+(g.y-f.y))/this._scale;
this.touch={startTime:d.timeStamp,notCalculated:YES,enableScrolling:{x:a*this._scale>m||this.get("alwaysBounceHorizontal"),y:n*this._scale>u||this.get("alwaysBounceVertical")},scrolling:{x:NO,y:NO},startClipOffset:{x:k,y:h},lastScrollOffset:{x:c,y:b},startTouchOffset:{x:g.x,y:g.y},scrollVelocity:{x:0,y:0},startTouchOffsetInContent:{x:s,y:q},containerSize:{width:m,height:u},contentSize:{width:a,height:n},startScale:this._scale,startDistance:g.d,canScale:this.get("canScale"),minimumScale:this.get("minimumScale"),maximumScale:this.get("maximumScale"),globalFrame:f,layer:this.get("contentView").get("layer"),resistanceCoefficient:0.998,resistanceAsymptote:320,decelerationFromEdge:0.05,accelerationToEdge:0.1,scrollTolerance:{x:15,y:15},scaleTolerance:5,secondaryScrollTolerance:30,scrollLock:500,decelerationRate:this.get("decelerationRate"),lastEventTime:d.timeStamp,touch:(r?d:(this.touch?this.touch.touch:null)),needsScrollEnd:e};
if(!this.tracking){this.tracking=YES;this.dragging=NO}},_adjustForEdgeResistance:function(f,d,b,c,a){var e;
if(f<d){e=f-d}else{if(f>b){e=b-f}else{return f}}e=Math.pow(c,Math.abs(e))*a;if(f<d){e=e-a
}else{e=-e+a}return Math.min(Math.max(d,f),b)+e},touchesDragged:function(a,c){var b=a.averagedTouchesForView(this);
this.updateTouchScroll(b.x,b.y,b.d,a.timeStamp)},updateTouchScroll:function(l,k,d,g){var f=this.touch,a=l-f.globalFrame.x,m=k-f.globalFrame.y,x,n,y,q,E,C;
var c=((this._scroll_horizontalScrollOffset||0)+a)/this._scale,b=((this._scroll_verticalScrollOffset||0)+m)/this._scale;
var B=c-f.startTouchOffset.x,A=b-f.startTouchOffset.y;var h=f.dragging;if(!f.scrolling.x&&Math.abs(B)>f.scrollTolerance.x&&f.enableScrolling.x){h=YES;
f.scrolling.x=YES;f.scrollTolerance.y=f.secondaryScrollTolerance;f.startTouchOffset.x=l;
B=0}if(!f.scrolling.y&&Math.abs(A)>f.scrollTolerance.y&&f.enableScrolling.y){h=YES;
f.scrolling.y=YES;f.scrollTolerance.x=f.secondaryScrollTolerance;f.startTouchOffset.y=k;
A=0}if(h&&!f.dragging){f.dragging=YES;this.dragging=YES;this._touchScrollDidStart()
}if(!f.scrolling.x&&!f.scrolling.y&&!f.canScale){return}if(f.scrolling.x&&!f.scrolling.y){if(B>f.scrollLock&&!f.scrolling.y){f.enableScrolling.y=NO
}}if(f.scrolling.y&&!f.scrolling.x){if(A>f.scrollLock&&!f.scrolling.x){f.enableScrolling.x=NO
}}if(f.canScale){var s=f.startDistance,z=d-s;if(Math.abs(z)>f.scaleTolerance){f.scrolling.y=YES;
f.scrolling.x=YES;var D=f.startScale*(d/Math.max(s,50));var u=this._adjustForEdgeResistance(D,f.minimumScale,f.maximumScale,f.resistanceCoefficient,f.resistanceAsymptote);
this.dragging=YES;this._scale=u;var w=c*this._scale,v=b*this._scale}}E=this.minimumScrollOffset(f.contentSize.width*this._scale,f.containerSize.width,this.get("horizontalAlign"));
C=this.minimumScrollOffset(f.contentSize.height*this._scale,f.containerSize.height,this.get("verticalAlign"));
q=this.maximumScrollOffset(f.contentSize.width*this._scale,f.containerSize.width,this.get("horizontalAlign"));
n=this.maximumScrollOffset(f.contentSize.height*this._scale,f.containerSize.height,this.get("verticalAlign"));
y=f.startTouchOffsetInContent.x*this._scale-a;x=f.startTouchOffsetInContent.y*this._scale-m;
y=this._adjustForEdgeResistance(y,E,q,f.resistanceCoefficient,f.resistanceAsymptote);
x=this._adjustForEdgeResistance(x,C,n,f.resistanceCoefficient,f.resistanceAsymptote);
if(f.scrolling.x){this._scroll_horizontalScrollOffset=y}if(f.scrolling.y){this._scroll_verticalScrollOffset=x
}this._applyCSSTransforms(f.layer);this._touchScrollDidChange();if(g-f.lastEventTime>=1||f.notCalculated){f.notCalculated=NO;
var e=this._scroll_horizontalScrollOffset;var r=this._scroll_verticalScrollOffset;
f.scrollVelocity.x=((e-f.lastScrollOffset.x)/Math.max(1,g-f.lastEventTime));f.scrollVelocity.y=((r-f.lastScrollOffset.y)/Math.max(1,g-f.lastEventTime));
f.lastScrollOffset.x=e;f.lastScrollOffset.y=r;f.lastEventTime=g}},touchEnd:function(c){var a=this.touch,b=c.averagedTouchesForView(this);
c.scrollHasEnded=YES;if(b.touchCount>0){this.beginTouchTracking(c,NO)}else{if(this.dragging){a.dragging=NO;
a.lastEventTime=c.timeStamp;this.startDecelerationAnimation()}else{if(a.needsScrollEnd){this._touchScrollDidEnd()
}c.captureTouch(this,YES);if(c.touchResponder&&c.touchResponder!==this){c.end()}else{if(!c.touchResponder||c.touchResponder===this){if(c.nextTouchResponder){c.makeTouchResponder(c.nextTouchResponder)
}}else{}}this.touch=null}this.tracking=NO;this.dragging=NO}},touchCancelled:function(c){var a=this.touch,b=c.averagedTouchesForView(this);
if(!this.touch||!this.touch.timeout){this.beginPropertyChanges();this.set("scale",this._scale);
this.set("verticalScrollOffset",this._scroll_verticalScrollOffset);this.set("horizontalScrollOffset",this._scroll_horizontalScrollOffset);
this.endPropertyChanges();this.tracking=NO;if(this.dragging){this._touchScrollDidEnd()
}this.dragging=NO;this.touch=null}},startDecelerationAnimation:function(a){var b=this.touch;
b.decelerationVelocity={x:b.scrollVelocity.x*10,y:b.scrollVelocity.y*10};this.decelerateAnimation()
},bouncyBounce:function(c,e,d,f,g,b,a){if(e<d){if(c<0){c=c+((d-e)*g)}else{c=Math.min((d-e)*b+a,d-e-0.01)
}}else{if(e>f){if(c>0){c=c-((e-f)*g)}else{c=-Math.min((e-f)*b+a,e-f-0.01)}}}return c
},decelerateAnimation:function(){var b=this.touch,x=this._scale,w=this.minimumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign")),v=this.minimumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign")),h=this.maximumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign")),g=this.maximumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign")),a=Date.now(),e=Math.max(a-b.lastEventTime,1),q=this._scroll_horizontalScrollOffset+b.decelerationVelocity.x*(e/10),l=this._scroll_verticalScrollOffset+b.decelerationVelocity.y*(e/10);
var n=b.decelerationFromEdge,r=b.accelerationToEdge;var d=q>=w&&q<=h;var s=l>=v&&l<=g;
q/=this._scale;l/=this._scale;var k=0;k=this.bouncyBounce(k,x,b.minimumScale,b.maximumScale,n,r,0);
this._scale=x=x+k;q*=this._scale;l*=this._scale;w=this.minimumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign"));
v=this.minimumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign"));
h=this.maximumScrollOffset(b.contentSize.width*this._scale,b.containerSize.width,this.get("horizontalAlign"));
g=this.maximumScrollOffset(b.contentSize.height*this._scale,b.containerSize.height,this.get("verticalAlign"));
if(d&&(q<w||q>h)){q=Math.max(w,Math.min(q,h))}if(s&&(l<v||l>g)){l=Math.max(v,Math.min(l,g))
}this._scroll_horizontalScrollOffset=q;this._scroll_verticalScrollOffset=l;this._applyCSSTransforms(b.layer);
SC.RunLoop.begin();this._touchScrollDidChange();SC.RunLoop.end();var u=b.decelerationRate;
b.decelerationVelocity.y*=Math.pow(u,(e/10));b.decelerationVelocity.x*=Math.pow(u,(e/10));
b.decelerationVelocity.x=this.bouncyBounce(b.decelerationVelocity.x,q,w,h,n,r,0.3);
b.decelerationVelocity.y=this.bouncyBounce(b.decelerationVelocity.y,l,v,g,n,r,0.3);
var m=Math.abs(b.decelerationVelocity.x);var c=Math.abs(b.decelerationVelocity.y);
if(c<0.01&&m<0.01&&Math.abs(k)<0.01){b.timeout=null;this.touch=null;SC.RunLoop.begin();
this._touchScrollDidEnd();this.beginPropertyChanges();this.set("scale",this._scale);
this.set("verticalScrollOffset",this._scroll_verticalScrollOffset);this.set("horizontalScrollOffset",this._scroll_horizontalScrollOffset);
this.endPropertyChanges();SC.RunLoop.end();return}var f=this;b.lastEventTime=Date.now();
this.touch.timeout=setTimeout(function(){f.decelerateAnimation()},10)},createChildViews:function(){var b=[],a;
if(SC.none(a=this.containerView)){a=SC.ContainerView}b.push(this.containerView=this.createChildView(a,{contentView:this.contentView,isScrollContainer:YES}));
this.contentView=this.containerView.get("contentView");a=SC.platform.touch?this.get("horizontalTouchScrollerView"):this.get("horizontalScrollerView");
if(a){if(this.get("hasHorizontalScroller")){a=this.horizontalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_HORIZONTAL,valueBinding:"*owner.horizontalScrollOffset"});
b.push(a)}else{this.horizontalScrollerView=null}}a=SC.platform.touch?this.get("verticalTouchScrollerView"):this.get("verticalScrollerView");
if(a){if(this.get("hasVerticalScroller")){a=this.verticalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_VERTICAL,valueBinding:"*owner.verticalScrollOffset"});
b.push(a)}else{this.verticalScrollerView=null}}this.childViews=b;this.contentViewDidChange();
this.tile()},init:function(){arguments.callee.base.apply(this,arguments);this._scroll_contentView=this.get("contentView");
var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewDidChange:function(){var d=this.get("contentView"),a=this._scroll_contentView,b=this.contentViewFrameDidChange,c=this.contentViewLayerDidChange;
if(d!==a){if(a){a.removeObserver("frame",this,b);a.removeObserver("layer",this,c)
}this._scroll_contentView=d;if(d){d.addObserver("frame",this,b);d.addObserver("layer",this,c)
}this.containerView.set("contentView",d);this.contentViewFrameDidChange()}}.observes("contentView"),render:function(a,b){this.invokeLast(this.adjustElementScroll);
if(b){a.push('<div class="corner"></div>')}return arguments.callee.base.apply(this,arguments)
},oldMaxHOffset:0,oldMaxVOffset:0,contentViewFrameDidChange:function(b){var r=this.get("contentView"),n=(r)?r.get("frame"):null,h=this._scale,c=(n)?n.width*h:0,u=(n)?n.height*h:0,l,k,q;
if(!b&&(c===this._scroll_contentWidth)&&(u===this._scroll_contentHeight)){return}this._scroll_contentWidth=c;
this._scroll_contentHeight=u;l=this.getPath("containerView.frame");k=l.width;q=l.height;
if(this.get("hasHorizontalScroller")&&(r=this.get("horizontalScrollerView"))){if(this.get("autohidesHorizontalScroller")){this.set("isHorizontalScrollerVisible",c>k)
}r.setIfChanged("maximum",c-k);r.setIfChanged("proportion",k/c)}if(this.get("hasVerticalScroller")&&(r=this.get("verticalScrollerView"))){if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",u>q)
}r.setIfChanged("maximum",u-q);r.setIfChanged("proportion",q/u)}if(!this.get("isVerticalScrollerVisible")&&(this.get("verticalScrollOffset")!==0)&&this.get("autohidesVerticalScroller")){this.set("verticalScrollOffset",0)
}if(!this.get("isHorizontalScrollerVisible")&&(this.get("horizontalScrollOffset")!==0)&&this.get("autohidesHorizontalScroller")){this.set("horizontalScrollOffset",0)
}var s=this.get("maximumVerticalScrollOffset"),m=this.get("verticalScrollOffset"),g=this.get("maximumHorizontalScrollOffset"),a=this.get("horizontalScrollOffset"),e=s<m,d=g<a;
if(e||d){this.forceDimensionsRecalculation(d,e,m,a)}},frameDidChange:function(){this.contentViewFrameDidChange(YES)
}.observes("frame"),contentViewLayerDidChange:function(){if(this._verticalScrollOffset!==0){this._verticalScrollOffset=-1
}if(this._horizontalScrollOffset!==0){this._horizontalScrollOffset=-1}this.invokeLast(this.adjustElementScroll)
},_scroll_horizontalScrollOffsetDidChange:function(){this.invokeLast(this.adjustElementScroll)
}.observes("horizontalScrollOffset"),_scroll_verticalScrollOffsetDidChange:function(){this.invokeLast(this.adjustElementScroll)
}.observes("verticalScrollOffset"),adjustElementScroll:function(){var a=this.get("containerView"),d=this.get("contentView"),c=this.get("verticalScrollOffset"),b=this.get("horizontalScrollOffset");
if(d){SC.RunLoop.begin();d._viewFrameDidChange();SC.RunLoop.end();if(SC.platform.touch){this._applyCSSTransforms(d.get("layer"))
}}if(a&&!SC.platform.touch){a=a.$()[0];if(a){if(c!==this._verticalScrollOffset){a.scrollTop=c;
this._verticalScrollOffset=c}if(b!==this._horizontalScrollOffset){a.scrollLeft=b;
this._horizontalScrollOffset=b}}}},forceDimensionsRecalculation:function(b,c,e,a){var f=a;
var d=e;this.scrollTo(0,0);if(b&&c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),this.get("maximumVerticalScrollOffset"))
}if(b&&!c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),d)}if(!b&&c){this.scrollTo(f,this.get("maximumVerticalScrollOffset"))
}},_scroll_verticalScrollOffset:0,_scroll_horizontalScrollOffset:0});sc_require("views/scroll");
SC.MenuScrollerView=SC.ScrollerView.extend({classNames:["sc-menu-scroller-view"],scrollDown:NO,value:function(a,c){if(c!==undefined){this._value=c
}else{var b=this._value||0;return Math.min(b,this.get("maximum"))}}.property("maximum").cacheable(),maximum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,verticalLineScroll:20,ownerScrollValueKey:function(){return"verticalScrollOffset"
}.property("layoutDirection").cacheable(),init:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.TINY_SCROLLER_THICKNESS);
break;case SC.SMALL_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.SMALL_SCROLLER_THICKNESS);
break;case SC.REGULAR_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.REGULAR_SCROLLER_THICKNESS);
break;case SC.LARGE_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.LARGE_SCROLLER_THICKNESS);
break;case SC.HUGE_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.HUGE_SCROLLER_THICKNESS);
break}return arguments.callee.base.apply(this,arguments)},render:function(a,c){a.addClass("sc-vertical");
a.addClass(this.get("controlSize"));if(c){var b=this.get("scrollDown")?"arrowDown":"arrowUp";
a.push('<span class="scrollArrow '+b+'">&nbsp;</span>')}a.setClass("disabled",!this.get("isEnabled"))
},didCreateLayer:function(){},willDestroyLayer:function(){var a=this._sc_scroller_scrollDidChange;
SC.Event.remove(this.$(),"scroll",this,a)},mouseEntered:function(a){this.set("isMouseOver",YES);
this._invokeScrollOnMouseOver()},mouseExited:function(a){this.set("isMouseOver",NO)
},_sc_scroller_valueDidChange:function(){}.observes("value"),_sc_scroller_armScrollTimer:function(){if(!this._sc_scrollTimer){SC.RunLoop.begin();
var a=this._sc_scroller_scrollDidChange;this._sc_scrollTimer=this.invokeLater(a,50);
SC.RunLoop.end()}},_sc_scroller_scrollDidChange:function(){var b=Date.now(),d=this._sc_lastScroll,c=this.get("layer"),a=0;
if(d&&(b-d)<50){return this._sc_scroller_armScrollTimer()}this._sc_scrollTimer=null;
this._sc_lastScroll=b;SC.RunLoop.begin();if(!this.get("isEnabled")){return}this._sc_scrollValue=a=c.scrollTop;
this.set("value",a);SC.RunLoop.end()},_scrollMenu:function(){var b=this.get("value"),a;
if(this.get("scrollDown")){a=b+this.verticalLineScroll;if(a<=this.get("maximum")){this.set("value",a)
}}else{a=b-this.verticalLineScroll;if(a>=0){this.set("value",a)}else{if(b<=this.verticalLineScroll&&b>0){this.set("value",0)
}}}return YES},_invokeScrollOnMouseOver:function(){this._scrollMenu();if(this.get("isMouseOver")){this.invokeLater(this._invokeScrollOnMouseOver,100)
}}});SC.MenuScrollerView.REGULAR_SCROLLER_THICKNESS=18;SC.MenuScrollerView.TINY_SCROLLER_THICKNESS=10;
SC.MenuScrollerView.SMALL_SCROLLER_THICKNESS=14;SC.MenuScrollerView.LARGE_SCROLLER_THICKNESS=23;
SC.MenuScrollerView.HUGE_SCROLLER_THICKNESS=26;SC.MenuScrollView=SC.ScrollView.extend({classNames:["sc-menu-scroll-view"],maximumHorizontalScrollOffset:0,hasHorizontalScroller:NO,horizontalScrollerView:SC.MenuScrollerView,isHorizontalScrollerVisible:NO,canScrollHorizontal:NO,autohidesHorizontalScroller:NO,hasVerticalScroller:YES,verticalScrollerView:SC.MenuScrollerView,verticalScrollerView2:SC.MenuScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:YES,autohidesVerticalScroller:YES,verticalScrollerBottom:0,controlSize:SC.REGULAR_CONTROL_SIZE,containerView:SC.ContainerView,tile:function(){var g,x,h,b,v,k,c;
g=this.get("hasVerticalScroller");x=g?this.get("verticalScrollerView"):null;h=g?this.get("verticalScrollerView2"):null;
b=x&&this.get("isVerticalScrollerVisible");v=this.get("containerView");k={left:0,top:0};
if(b){c=0;var a=x.get("scrollerThickness")||h.get("scrollerThickness");var l=this.get("contentView"),s,u=(l)?l.get("frame"):null,m=(u)?u.height:0,w=this.containerView.$()[0],n=this.get("verticalScrollOffset"),e={height:0,top:0,right:0,left:0},r={height:a,top:0,right:0,left:0},d={height:a,bottom:0,right:0,left:0},q={height:0,bottom:0,right:0,left:0};
if(w){c=w.offsetHeight}if(n===0){k.top=0;k.bottom=a;x.set("layout",e);h.set("layout",d)
}else{if(n>=(m-c-a)){k.top=a;k.bottom=0;x.set("layout",r);h.set("layout",q)}else{k.top=a;
k.bottom=a;x.set("layout",r);h.set("layout",d)}}}if(x){x.set("isVisible",b);h.set("isVisible",b)
}v.set("layout",k)},scrollerVisibilityDidChange:function(){this.tile()}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible","verticalScrollOffset"),createChildViews:function(){var c=[],b,a,d=this.get("controlSize");
if(SC.none(b=this.containerView)){b=SC.ContainerView}c.push(this.containerView=this.createChildView(b,{contentView:this.contentView}));
this.contentView=this.containerView.get("contentView");if((b=this.verticalScrollerView)&&(a=this.verticalScrollerView2)){if(this.get("hasVerticalScroller")){b=this.verticalScrollerView=this.createChildView(b,{layout:{top:0,left:0,right:0},controlSize:d,valueBinding:"*owner.verticalScrollOffset"});
c.push(b);a=this.verticalScrollerView2=this.createChildView(a,{scrollDown:YES,layout:{bottom:0,left:0,right:0},controlSize:d,valueBinding:"*owner.verticalScrollOffset"});
c.push(a)}else{this.verticalScrollerView=null;this.verticalScrollerView2=null}}this.childViews=c;
this.contentViewFrameDidChange();this.tile()},init:function(){arguments.callee.base.apply(this,arguments);
this._scroll_contentView=this.get("contentView");var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewFrameDidChange:function(){var c=this.get("contentView"),b,h=(c)?c.get("frame"):null,e=(h)?h.width:0,a=(h)?h.height:0,k=this.get("frame"),d,g;
this._scroll_contentWidth=e;this._scroll_contentHeight=a;if(this.get("hasVerticalScroller")&&(c=this.get("verticalScrollerView"))&&(b=this.get("verticalScrollerView2"))){a-=1;
if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",a>k.height)
}a-=this.get("verticalScrollerBottom");d=0;g=this.containerView.$()[0];if(g){d=g.offsetHeight
}a=a-d;c.setIfChanged("maximum",a);b.setIfChanged("maximum",a)}},_scroll_horizontalScrollOffsetDidChange:function(){},_scroll_verticalScrollOffsetDidChange:function(){var b=this.get("verticalScrollOffset");
var a=this.get("contentView");if(a){a.adjust("top",0-b)}}.observes("verticalScrollOffset")});
sc_require("views/button");SC.PopupButtonView=SC.ButtonView.extend({classNames:["sc-popup-button"],preferMatrix:null,menu:null,shouldLoadInBackground:NO,init:function(){arguments.callee.base.apply(this,arguments);
this._setupMenu();if(this.get("shouldLoadInBackground")){SC.backgroundTaskQueue.push(SC.PopupButtonMenuLoader.create({popupButton:this}))
}},_setupMenu:function(){var a=this.get("instantiatedMenu");if(this.isActiveBinding){this.isActiveBinding.disconnect()
}this.isActiveBinding=null;if(a&&!a.isClass){this.isActiveBinding=this.bind("isActive",a,"isVisibleInWindow")
}},_popup_menuDidChange:function(){this._setupMenu()}.observes("menu"),isActive:NO,_instantiateMenu:function(){var a=this.get("menu");
if(!a.isClass||!a){return}this.menu=a.create();this._setupMenu()},acceptsFirstResponder:YES,instantiatedMenu:function(){var a=this.get("menu");
if(a&&a.isClass){this._instantiateMenu();a=this.get("menu")}return a}.property("menu").cacheable(),action:function(a){var b=this.get("instantiatedMenu");
if(!b){SC.Logger.warn("SC.PopupButton - Unable to show menu because the menu property is set to %@.".fmt(b));
return NO}b.popup(this,this.get("preferMatrix"));return YES},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this._isMouseDown=YES;this._action();this.invokeLast(this._recordMouseDownTimestamp);
this.becomeFirstResponder();return YES},_recordMouseDownTimestamp:function(){this._menuRenderedTimestamp=new Date().getTime()
},mouseUp:function(b){var d=new Date().getTime(),c=this._menuRenderedTimestamp,e=this.get("instantiatedMenu"),f=SC.platform.touch,a;
if(e){a=e.getPath("rootMenu.targetMenuItem");if(a){if(!a.performAction()){e.remove()
}}else{if(!f&&(d-c>SC.ButtonView.CLICK_AND_HOLD_DELAY)){e.remove()}}}this._isMouseDown=NO;
arguments.callee.base.apply(this,arguments);return YES},mouseExited:function(a){return YES
},performKeyEquivalent:function(b,a){if(!this.get("isEnabled")){return NO}var c=this.get("instantiatedMenu");
return(!!c&&c.performKeyEquivalent(b,a))},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled")});SC.PopupButtonMenuLoader=SC.Task.extend({popupButton:null,run:function(){if(this.popupButton){this.popupButton._instantiateMenu()
}}});SC.ProgressView=SC.View.extend(SC.Control,{value:0.5,valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),offsetRange:24,contentMaximumKey:null,isIndeterminate:NO,isIndeterminateBindingDefault:SC.Binding.bool(),isRunning:NO,isRunningBindingDefault:SC.Binding.bool(),animatedBackgroundMatrix:[],contentIsIndeterminateKey:null,classNames:"sc-progress-view",_backgroundOffset:0,_currentBackground:1,_nextBackground:1,init:function(){arguments.callee.base.apply(this,arguments);
this.animateProgressBar()},animateProgressBar:function(){if(this.get("isRunning")&&this.get("isVisibleInWindow")){this._animateProgressBar(500)
}}.observes("isRunning","isVisibleInWindow"),_animateProgressBar:function(a){if(a===0){a=1000/30
}if(this.get("isRunning")&&this.get("isVisibleInWindow")){this.displayDidChange();
this.invokeLater(this._animateProgressBar,a,600)}},displayProperties:"value minimum maximum isIndeterminate".w(),render:function(c,b){var r,e,m,d,h,f=this.get("isIndeterminate"),q=this.get("isRunning"),l=this.get("isEnabled"),n=this.get("offsetRange"),g=(f&&q)?(Math.floor(Date.now()/75)%n-n):0;
if(!l){m="0%"}else{if(f){m="120%"}else{m=(this.get("_percentageNumeric")*100)+"%"
}}var a={"sc-indeterminate":f,"sc-empty":(m<=0),"sc-complete":(m>=100)};if(b){var k=this._createClassNameString(a);
c.push('<div class="sc-inner ',k,'" style="width: ',m,";left: ",g,'px;">','<div class="sc-inner-head">',"</div>",'<div class="sc-inner-tail"></div></div>','<div class="sc-outer-head"></div>','<div class="sc-outer-tail"></div>')
}else{c.setClass(a);r=this.$(".sc-inner");e=this.get("animatedBackgroundMatrix");
d="width: "+m+"; ";d=d+"left: "+g+"px; ";if(e.length===3){r.css("backgroundPosition","0px -"+(e[0]+e[1]*this._currentBackground)+"px");
if(this._currentBackground===e[2]-1||this._currentBackground===0){this._nextBackground*=-1
}this._currentBackground+=this._nextBackground;d=d+"backgroundPosition: "+h+"px; ";
r.attr("style",d)}else{r.attr("style",d)}}},contentPropertyDidChange:function(c,a){var b=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",a,"contentValueKey",b).updatePropertyFromContent("minimum",a,"contentMinimumKey",b).updatePropertyFromContent("maximum",a,"contentMaximumKey",b).updatePropertyFromContent("isIndeterminate",a,"contentIsIndeterminateKey",b).endPropertyChanges()
},_percentageNumeric:function(){var b=this.get("minimum")||0,c=this.get("maximum")||1,a=this.get("value")||0;
a=(a-b)/(c-b);if(a>1){a=1}if(isNaN(a)){a=0}if(a<b){a=0}if(a>c){a=1}return a}.property("value").cacheable(),_createClassNameString:function(c){var b=[],a;
for(a in c){if(!c.hasOwnProperty(a)){continue}if(c[a]){b.push(a)}}return b.join(" ")
}});SC.RadioView=SC.View.extend(SC.Control,{classNames:["sc-radio-view"],value:null,layoutDirection:SC.LAYOUT_VERTICAL,escapeHTML:YES,items:[],itemTitleKey:null,itemWidthKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this._renderAsFirstTime=YES;
this.notifyPropertyChange("_displayItems")},displayProperties:["value","_displayItems"],render:function(b,g){var l=this.get("_displayItems"),q=this.get("value"),h=SC.isArray(q),v,k,s,w,n,u,d,a,c,r,f,m,e;
b.addClass(this.get("layoutDirection"));if(h&&q.length<=0){q=q[0];h=NO}if(this._renderAsFirstTime){g=YES;
this._renderAsFirstTime=NO}if(g){b.attr("role","radiogroup");w=SC.guidFor(this);u=l.length;
for(k=0;k<u;k++){v=l[k];s=v[3];if(s){d=(s.indexOf("/")>=0)?s:SC.BLANK_IMAGE_URL;a=(d===s)?"":s;
s='<img src="'+d+'" class="icon '+a+'" alt="" />'}else{s=""}if(v){r=(h)?(q.indexOf(v[1])>=0):(q===v[1])
}else{r=NO}e=this._getSelectionStateClassNames(v,r,q,h,false);f=this.escapeHTML?SC.RenderContext.escapeHTML(v[0]):v[0];
n=v[4];b.push('<div class="sc-radio-button ',e,'" ',n?'style="width: '+n+'px;" ':"",'aria-checked="',r?"true":"false",'" ','role="radio"',' index="',k,'">','<span class="button"></span>','<span class="sc-button-label">',s,f,"</span></div>")
}}else{this.$(".sc-radio-button").forEach(function(x){x=this.$(x);k=parseInt(x.attr("index"),0);
v=(k>=0)?l[k]:null;if(v){r=(h)?(q.indexOf(v[1])>=0):(q===v[1])}else{r=NO}n=v[4];if(n){x.width(n)
}m=this._getSelectionStateClassNames(v,r,q,h,true);x.attr("aria-checked",r?"true":"false");
x.setClass(m);k=m=null},this)}},_displayItems:function(){var h=this.get("items"),d=this.get("localize"),b=this.get("itemTitleKey"),c=this.get("itemValueKey"),m=this.get("itemWidthKey"),a=this.get("layoutDirection")===SC.LAYOUT_HORIZONTAL,g=this.get("itemIsEnabledKey"),v=this.get("itemIconKey"),u=[],n=(h)?h.get("length"):0,r,w,k,l,f,e,s,q;
for(f=0;f<n;f++){r=h.objectAt(f);if(SC.typeOf(r)===SC.T_ARRAY){w=r[0];l=r[1]}else{if(r){if(b){w=r.get?r.get(b):r[b]
}else{w=(r.toString)?r.toString():null}if(m&&a){k=r.get?r.get(m):r[m]}if(c){l=r.get?r.get(c):r[c]
}else{l=r}if(g){s=r.get?r.get(g):r[g]}else{s=YES}if(v){q=r.get?r.get(v):r[v]}else{q=null
}}else{w=l=q=null;s=NO}}if(d){w=w.loc()}u.push([w,l,s,q,k])}return u}.property("items","itemTitleKey","itemWidthKey","itemValueKey","itemIsEnabledKey","localize","itemIconKey").cacheable(),_getSelectionStateClassNames:function(d,f,e,a,b){var h,c;
h={sel:(f&&!a),mixed:(f&&a),disabled:(!d[2])};if(b){return h}else{var g=[];for(c in h){if(!h.hasOwnProperty(c)){continue
}if(h[c]){g.push(c)}}return g.join(" ")}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}var b=a.target;while(b){if(b.className&&b.className.indexOf("sc-radio-button")>-1){break
}b=b.parentNode}if(!b){return NO}b=this.$(b);if(b.hasClass("disabled")){return YES
}b.addClass("active");this._activeRadioButton=b;a.allowDefault();return YES},mouseUp:function(a){if(!this.get("isEnabled")){return YES
}var f=this._activeRadioButton,e=a.target,b=this.get("_displayItems"),c,d;if(f){f.removeClass("active");
this._activeRadioButton=null}else{return YES}while(e){if(e.className&&e.className.indexOf("sc-radio-button")>-1){break
}e=e.parentNode}e=this.$(e);if(e[0]!==f[0]||e.hasClass("disabled")){return YES}c=parseInt(e.attr("index"),0);
d=b[c];this.set("value",d[1])},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
}});SC.SceneView=SC.ContainerView.extend({scenes:["master","detail"],nowShowing:null,transitionDuration:200,_state:"NO_VIEW",replaceContent:function(a){if(a&&this._state===this.READY){this.animateScene(a)
}else{this.replaceScene(a)}return this},replaceScene:function(c){var d=this._targetView,e=this.STANDARD_LAYOUT,b=this.get("scenes"),a=b?b.indexOf(this.get("nowShowing")):-1;
this._targetView=c;this._targetIndex=a;if(this._timer){this._timer.invalidate()}this._leftView=this._rightView=this._start=this._end=null;
this._timer=null;this.removeAllChildren();if(d){d.set("layout",e)}if(c){c.set("layout",e)
}if(c){this.appendChild(c)}this._state=c?this.READY:this.NO_VIEW},animateScene:function(b){var c=this._targetView,f=this._targetIndex,a=this.get("scenes"),e=a?a.indexOf(this.get("nowShowing")):-1,d;
if(f<0||e<0||f===e){return this.replaceScene(b)}this._targetView=b;this._targetIndex=e;
if(e>f){this._leftView=c;this._rightView=b;this._target=-1}else{this._leftView=b;
this._rightView=c;this._target=1}this.removeAllChildren();if(c){this.appendChild(c)
}if(b){this.appendChild(b)}this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this._state=this.ANIMATING;this.tick()},tick:function(){this._timer=null;var a=Date.now(),d=(a-this._start)/(this._end-this._start),g=this._target,f=this._leftView,b=this._rightView,c,e;
if(d<0){d=0}if(!this.get("isVisibleInWindow")||(d>=1)){return this.replaceScene(this._targetView)
}c=SC.clone(this.get("frame"));e=Math.floor(c.width*d);if(g>0){c.left=0-(c.width-e);
f.set("layout",c);c=SC.clone(c);c.left=e;b.set("layout",c)}else{c.left=0-e;f.set("layout",c);
c=SC.clone(c);c.left=c.width-e;b.set("layout",c)}this._timer=this.invokeLater(this.tick,20);
return this},NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",STANDARD_LAYOUT:{top:0,left:0,bottom:0,right:0}});
SC.SegmentedView=SC.View.extend(SC.Control,{classNames:["sc-segmented-view"],theme:"square",value:null,isEnabled:YES,allowsEmptySelection:NO,allowsMultipleSelection:NO,localize:YES,align:SC.ALIGN_CENTER,layoutDirection:SC.LAYOUT_HORIZONTAL,items:[],itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemActionKey:null,itemTargetKey:null,itemKeyEquivalentKey:null,itemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey".w(),displayItems:function(){var f=this.get("items"),c=this.get("localize"),m=null,d,k,e=[],g=f.get("length"),h,l,b=SC._segmented_fetchKeys,a=SC._segmented_fetchItem;
for(h=0;h<g;h++){l=f.objectAt(h);if(SC.none(l)){continue}d=SC.typeOf(l);if(d===SC.T_STRING){k=[l.humanize().titleize(),l,YES,null,null,null,h]
}else{if(d!==SC.T_ARRAY){if(m===null){m=this.itemKeys.map(b,this)}k=m.map(a,l);k[k.length]=h;
if(!m[0]&&l.toString){k[0]=l.toString()}if(!m[1]){k[1]=l}if(!m[2]){k[2]=YES}}}if(c&&k[0]){k[0]=k[0].loc()
}if(c&&k[5]&&SC.typeOf(k[5])===SC.T_STRING){k[5]=k[5].loc()}e[e.length]=k}return e
}.property("items","itemTitleKey","itemValueKey","itemIsEnabledKey","localize","itemIconKey","itemWidthKey","itemToolTipKey"),itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this.set("renderLikeFirstTime",YES);
this.notifyPropertyChange("displayItems")},init:function(){arguments.callee.base.apply(this,arguments);
this.itemsDidChange()},displayProperties:["displayItems","value","activeIndex"],render:function(b,a){var g=this.get("displayItems");
var c=this.get("theme");if(c){b.addClass(c)}if(a||this.get("renderLikeFirstTime")){this._seg_displayItems=g;
this.renderDisplayItems(b,g);b.addStyle("text-align",this.get("align"));this.set("renderLikeFirstTime",NO)
}else{var m=this.get("activeIndex"),k=this.get("value"),d=SC.isArray(k);if(d&&k.get("length")===1){k=k.objectAt(0);
d=NO}var h={},e=g.length,f=this.$(".sc-segment"),l;while(--e>=0){l=g[e];h.sel=d?(k.indexOf(l[1])>=0):(l[1]===k);
h.active=(m===e);h.disabled=!l[2];SC.$(f[e]).setClass(h)}h=g=k=g=null}},renderDisplayItems:function(d,m){var r=this.get("value"),h=SC.isArray(r),v=this.get("activeIndex"),k=m.length,q,n,b,l,f,u,a,c,g,e,s;
for(g=0;g<k;g++){f=d.begin("a").attr("role","button");u=m[g];q=u[0];n=u[3];a=u[5];
e={};s=[];if(this.get("layoutDirection")==SC.LAYOUT_HORIZONTAL){e.display="inline-block"
}s.push("sc-segment");if(!u[2]){s.push("disabled")}if(g===0){s.push("sc-first-segment")
}if(g===(k-1)){s.push("sc-last-segment")}if(g!==0&&g!==(k-1)){s.push("sc-middle-segment")
}if(h?(r.indexOf(u[1])>=0):(u[1]===r)){s.push("sel")}if(v===g){s.push("active")}if(u[4]){c=u[4];
e.width=c+"px"}f.addClass(s);f.addStyle(e);if(a){f.attr("title",a)}if(n){b=(n.indexOf("/")>=0)?n:SC.BLANK_IMAGE_URL;
l=(b===n)?"":n;n='<img src="'+b+'" alt="" class="icon '+l+'" />'}else{n=""}f.push('<span class="sc-button-inner"><label class="sc-button-label">',n+q,"</label></span>");
f.end()}},displayItemIndexForEvent:function(a){return this.displayItemIndexForPosition(a.pageX,a.pageY)
},displayItemIndexForPosition:function(e,d){var c=this.$(".sc-segment"),b=c.length,a,g,f;
for(a=0;a<b;a++){g=c[a];f=g.getBoundingClientRect();if(this.get("layoutDirection")==SC.LAYOUT_VERTICAL){if(d>f.top&&d<f.bottom){return a
}}else{if(e>f.left&&e<f.right){return a}}}return -1},keyDown:function(d){var f,g,e,a,h,c;
if(d.which===9){var b=d.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(b){b.becomeFirstResponder()}else{d.allowDefault()}return YES}if(!this.get("allowsMultipleSelection")&&!this.get("allowsEmptySelection")){e=this.get("displayItems");
a=e.length;h=this.get("value");c=SC.isArray(h);if(d.which===39||d.which===40){for(f=0;
f<a-1;f++){g=e[f];if(c?(h.indexOf(g[1])>=0):(g[1]===h)){this.triggerItemAtIndex(f+1)
}}return YES}else{if(d.which===37||d.which===38){for(f=1;f<a;f++){g=e[f];if(c?(h.indexOf(g[1])>=0):(g[1]===h)){this.triggerItemAtIndex(f-1)
}}return YES}}}return YES},mouseDown:function(b){if(!this.get("isEnabled")){return YES
}var a=this.displayItemIndexForEvent(b);if(a>=0){this._isMouseDown=YES;this.set("activeIndex",a)
}return YES},mouseUp:function(b){var a=this.displayItemIndexForEvent(b);if(this._isMouseDown&&(a>=0)){this.triggerItemAtIndex(a)
}this._isMouseDown=NO;this.set("activeIndex",-1);return YES},mouseMoved:function(b){if(this._isMouseDown){var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",a)}return YES},mouseExited:function(b){if(this._isMouseDown){var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",a)}return YES},mouseEntered:function(b){if(this._isMouseDown){var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",-1)}return YES},touchStart:function(b){if(!this.get("isEnabled")){return YES
}var a=this.displayItemIndexForEvent(b);if(a>=0){this._isTouching=YES;this.set("activeIndex",a)
}return YES},touchEnd:function(b){var a=this.displayItemIndexForEvent(b);if(this._isTouching&&(a>=0)){this.triggerItemAtIndex(a)
}this._isTouching=NO;this.set("activeIndex",-1);return YES},touchesDragged:function(b,c){var d=this.touchIsInBoundary(b);
if(d){if(!this._isTouching){this._touchDidEnter(b)}var a=this.displayItemIndexForEvent(b);
this.set("activeIndex",a)}else{if(this._isTouching){this._touchDidExit(b)}}this._isTouching=d;
return YES},_touchDidExit:function(b){var a=this.displayItemIndexForEvent(b);this.set("activeIndex",-1);
return YES},_touchDidEnter:function(b){var a=this.displayItemIndexForEvent(b);this.set("activeIndex",a);
return YES},triggerItemAtIndex:function(m){var k=this.get("displayItems"),n=k.objectAt(m),b,l,c,g,f;
if(!n[2]){return this}g=this.get("allowsEmptySelection");f=this.get("allowsMultipleSelection");
b=n[1];l=c=this.get("value");if(!SC.isArray(l)){l=[l]}if(!f){if(g&&(l.get("length")===1)&&(l.objectAt(0)===b)){l=[]
}else{l=[b]}}else{if(l.indexOf(b)>=0){if(l.get("length")>1||(l.objectAt(0)!==b)||g){l=l.without(b)
}}else{l=l.concat([b])}}switch(l.get("length")){case 0:l=null;break;case 1:l=l.objectAt(0);
break;default:break}var q=this.get("itemActionKey"),a=this.get("itemTargetKey"),e,h=null,d=this.getPath("pane.rootResponder");
if(q&&(n=this.get("items").objectAt(n[6]))){e=n.get?n.get(q):n[q];if(a){h=n.get?n.get(a):n[a]
}if(d){d.sendAction(e,h,this,this.get("pane"))}}if(!e&&c!==undefined){this.set("value",l)
}e=this.get("action");if(e&&d){d.sendAction(e,this.get("target"),this,this.get("pane"))
}},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}}});
SC._segmented_fetchKeys=function(a){return this.get(a)};SC._segmented_fetchItem=function(a){if(!a){return null
}return this.get?this.get(a):this[a]};sc_require("views/button");SC.SelectView=SC.ButtonView.extend({items:[],itemsBindingDefault:SC.Binding.multiple(),itemTitleKey:null,itemSortKey:null,itemValueKey:null,itemIconKey:null,itemSeparatorKey:"separator",localize:YES,disableSort:YES,classNames:["sc-select-view"],_itemList:[],_currentSelItem:null,_itemIdx:null,value:null,showCheckbox:YES,_defaultVal:null,_defaultTitle:null,_defaultIcon:null,theme:"popup",displayProperties:["icon","value","controlSize","items"],preferMatrix:null,CUSTOM_MENU_ITEM_HEIGHT:20,isSelectedBinding:"*menu.isVisibleInWindow",positionMenuBelow:NO,lastMenuWidth:null,exampleView:null,customViewMenuOffsetWidth:0,needsEllipsis:YES,menuPaneHeightPadding:0,menuItemPadding:35,isContextMenuEnabled:NO,leftAlign:function(){var b=0,a=this.get("controlSize");
if(a===SC.SMALL_CONTROL_SIZE){b=-14}if(a===SC.REGULAR_CONTROL_SIZE){b=-16}return b
}.property("controlSize"),sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("itemSortKey")||this.get("itemTitleKey");
b=b.sort(function(d,c){if(a){d=d.get?d.get(a):d[a];c=c.get?c.get(a):c[a]}return(d<c)?-1:((d>c)?1:0)
})}return b},render:function(b,f){arguments.callee.base.apply(this,arguments);var c,l,r,u,x,g,e,w,h,n,a,m,d,k,y,s,q,v;
l=this.get("items");l=this.sortObjects(l);r=l.length;u=this.get("itemTitleKey");x=this.get("itemIconKey");
g=this.get("itemValueKey");e=this.get("itemSeparatorKey");w=this.get("showCheckbox");
h=this.get("value");n=this.get("localize");m=[];d=YES;k=0;l.forEach(function(z){if(z){y=u?(z.get?z.get(u):z[u]):z.toString();
y=n?y.loc():y;s=x?(z.get?z.get(x):z[x]):null;if(SC.none(z[x])){s=null}q=(g)?(z.get?z.get(g):z[g]):z;
if(!SC.none(h)&&!SC.none(q)){if(h===q){this.set("title",y);this.set("icon",s)}}if(q===this.get("value")){this.set("_itemIdx",k);
d=!w?NO:YES}else{d=NO}a=e?(z.get?z.get(e):z[e]):NO;if(k===0){this._defaultVal=q;this._defaultTitle=y;
this._defaultIcon=s}var A=SC.Object.create({separator:a,title:y,icon:s,value:q,isEnabled:YES,checkbox:d,action:this.displaySelectedItem});
m.push(A)}k+=1;this.set("_itemList",m)},this);if(f){this.invokeLast(function(){var z=this.get("value");
if(SC.none(z)){this.set("value",this._defaultVal);this.set("title",this._defaultTitle);
this.set("icon",this._defaultIcon)}})}this.changeSelectButtonPreferMatrix(this._itemIdx)
},_action:function(n){var h,a,k,l,v,r,C,e,B,c,q,x,s,z,f,g,m,b,A;h=this.$(".sc-button-label")[0];
a=this.get("layer").offsetWidth;k=h.scrollWidth;l=this.get("lastMenuWidth");if(k){v=h.offsetWidth;
if(k&&v){a=a+k-v}}if(!l||(a>l)){l=a}r=this.get("_itemList");var w=this.get("customViewClassName");
var u=this.get("customViewMenuOffsetWidth");var d="sc-view sc-pane sc-panel sc-palette sc-picker sc-menu select-button sc-scroll-view sc-menu-scroll-view sc-container-view menuContainer sc-button-view sc-menu-item sc-regular-size";
d=w?(d+" "+w):d;SC.prepareStringMeasurement("",d);for(q=0,A=r.length;q<A;++q){B=r.objectAt(q);
C=SC.measureString(B.title).width;if(!e||(C>e)){e=C}}SC.teardownStringMeasurement();
l=(e+this.menuItemPadding>l)?e+this.menuItemPadding:l;var y=SC.RootResponder.responder.get("currentWindowSize").width;
if(l>y){l=(y-25)}this.set("lastMenuWidth",l);x=this.get("_currentSelItem");s=this.get("_itemList");
z=this.get("controlSize");f=this.get("menuPaneHeightPadding");g=this.get("exampleView");
m=g?g:SC.MenuItemView;b=SC.MenuPane.create({classNames:["select-button"],items:s,exampleView:m,isEnabled:YES,menuHeightPadding:f,preferType:SC.PICKER_MENU,itemHeightKey:"height",layout:{width:l},controlSize:z,itemWidth:l,contentView:SC.View.extend({})});
if(!b){return NO}b.popup(this,this.preferMatrix);b.set("currentSelectedMenuItem",x);
return YES},displaySelectedItem:function(){var l,b,f,k,c,a=0,g,e,h,m=null,d;l=this.parentMenu();
b=l.get("currentSelectedMenuItem");f=l.menuItemViews;if(b&&f){a=f.indexOf(b)}g=l.get("anchor");
e=l.get("items");h=e.length;while(!m&&(--h>=0)){d=e[h];k=!SC.none(d.title)?d.title:e.toString();
c=!SC.none(d.value)?d.value:k;if(k===this.get("value")&&(a===h)){m=e;g.set("value",c);
g.set("title",k)}}g.set("icon",this.get("icon")).set("_currentSelItem",b).set("_itemIdx",a)
},changeSelectButtonPreferMatrix:function(){var d=0,b=this.get("_itemIdx"),a=this.get("leftAlign"),e,c;
if(this.get("positionMenuBelow")){e=[a,4,3];this.set("preferMatrix",e)}else{if(b){d=b*this.CUSTOM_MENU_ITEM_HEIGHT
}c=[a,-d,2];this.set("preferMatrix",c)}},mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;this.becomeFirstResponder();this._action();
return YES},keyDown:function(a){if(this.interpretKeyEvents(a)){return YES}else{arguments.callee.base.apply(this,arguments)
}},interpretKeyEvents:function(a){if(a){if((a.keyCode===38||a.keyCode===40)){this._action()
}else{if(a.keyCode===27){this.resignFirstResponder()}}}return arguments.callee.base.apply(this,arguments)
}});SC.SelectFieldView=SC.FieldView.extend({tagName:"select",classNames:["sc-select-field-view"],objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,emptyName:null,localize:false,cpDidChange:YES,disableSort:NO,validateMenuItem:function(b,a){return true
},sortObjects:function(b){if(!this.get("disableSort")){var a=this.get("sortKey")||this.get("nameKey");
if(a){b=b.sortProperty(a)}else{b=b.sort(function(d,c){if(a){d=d.get?d.get(a):d[a];
c=c.get?c.get(a):c[a]}return(d<c)?-1:((d>c)?1:0)})}}return b},render:function(c,a){if(this.get("cpDidChange")){this.set("cpDidChange",NO);
var f=this.get("nameKey");var l=this.get("valueKey");var k=this.get("objects");var b=this.get("value");
var d,g;if(!this.get("isEnabled")){c.attr("disabled","disabled")}var h=this.get("localize");
if(!l&&b){b=SC.guidFor(b)}if((b===null)||(b==="")){b="***"}if(k){k=this.sortObjects(k);
if(!a){g=this.$input()[0];g.innerHTML=""}var e=this.get("emptyName");if(e){if(h){e=e.loc()
}if(a){c.push('<option value="***">'+e+"</option>",'<option disabled="disabled"></option>')
}else{d=document.createElement("option");d.value="***";d.innerHTML=e;g.appendChild(d);
d=document.createElement("option");d.disabled="disabled";g.appendChild(d)}}k.forEach(function(r,q){if(r){var n=f?(r.get?r.get(f):r[f]):r.toString();
if(h){n=n.loc()}var s=(l)?(r.get?r.get(l):r[l]):r;if(!e&&q===0&&b==="***"){this.set("value",s)
}if(s){s=(SC.guidFor(s))?SC.guidFor(s):s.toString()}var m=(this.validateMenuItem&&this.validateMenuItem(s,n))?"":'disabled="disabled" ';
if(a){c.push("<option "+m+'value="'+s+'">'+n+"</option>")}else{d=document.createElement("option");
d.value=s;d.innerHTML=n;if(m.length>0){d.disable="disabled"}g.appendChild(d)}}else{if(a){c.push('<option disabled="disabled"></option>')
}else{d=document.createElement("option");d.disabled="disabled";g.appendChild(d)}}},this);
this.setFieldValue(b)}else{this.set("value",null)}}},displayProperties:["objects","nameKey","valueKey","isEnabled"],_objectsObserver:function(){this.set("cpDidChange",YES)
}.observes("objects"),_objectArrayObserver:function(){this.set("cpDidChange",YES);
this.propertyDidChange("objects")}.observes("*objects.[]"),_nameKeyObserver:function(){this.set("cpDidChange",YES)
}.observes("nameKey"),_valueKeyObserver:function(){this.set("cpDidChange",YES)}.observes("valueKey"),acceptsFirstResponder:function(){return this.get("isEnabled")
}.property("isEnabled"),$input:function(){return this.$()},mouseDown:function(a){if(!this.get("isEnabled")){a.stop();
return YES}else{return arguments.callee.base.apply(this,arguments)}},getFieldValue:function(){var f=arguments.callee.base.apply(this,arguments);
var c=this.get("valueKey");var e=this.get("objects");var d=null;var a;if(f=="***"){f=null
}else{if(f&&e){var g=(SC.typeOf(e.length)===SC.T_FUNCTION)?e.length():e.length;while(!d&&(--g>=0)){a=e.objectAt?e.objectAt(g):e[g];
if(!a){continue}if(c){a=(a.get)?a.get(c):a[c]}var b=(a)?(SC.guidFor(a)?SC.guidFor(a):a.toString()):null;
if(f==b){d=a}}}}return(c||d)?d:f},setFieldValue:function(a){if(SC.none(a)){a="***"
}else{a=((a)?(SC.guidFor(a)?SC.guidFor(a):a.toString()):null)}this.$input().val(a);
return this},fieldDidFocus:function(){var a=this.get("isFocused");if(!a){this.set("isFocused",true)
}},fieldDidBlur:function(){var a=this.get("isFocused");if(a){this.set("isFocused",false)
}},_isFocusedObserver:function(){this.$().setClass("focus",this.get("isFocused"))
}.observes("isFocused"),didCreateLayer:function(){var a=this.$input();if(this.get("isEnabled")===false){this.$()[0].disabled=true
}SC.Event.add(a,"blur",this,this.fieldDidBlur);SC.Event.add(a,"focus",this,this.fieldDidFocus);
return arguments.callee.base.apply(this,arguments)},willDestroyLayer:function(){var a=this.$input();
SC.Event.remove(a,"focus",this,this.fieldDidFocus);SC.Event.remove(a,"blur",this,this.fieldDidBlur);
return arguments.callee.base.apply(this,arguments)}});SC.SliderView=SC.View.extend(SC.Control,{classNames:"sc-slider-view",handleSelector:"img.sc-handle",value:0.5,valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),contentMaximumKey:null,step:0.1,displayProperties:"value minimum maximum".w(),render:function(d,g){arguments.callee.base.apply(this,arguments);
var c=this.get("minimum"),a=this.get("maximum"),f=this.get("value"),e=this.get("step");
f=Math.min(Math.max(f,c),a);if(!SC.none(e)&&e!==0){f=Math.round(f/e)*e}if(f!==0){f=Math.floor((f-c)/(a-c)*100)
}if(g){var b=SC.BLANK_IMAGE_URL;d.push('<span class="sc-inner">','<span class="sc-leftcap"></span>','<span class="sc-rightcap"></span>','<img src="',b,'" class="sc-handle" style="left: ',f,'%" />',"</span>")
}else{this.$(this.get("handleSelector")).css("left",f+"%")}},_isMouseDown:NO,mouseDown:function(a){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;return this._triggerHandle(a,true)
},mouseDragged:function(a){return this._isMouseDown?this._triggerHandle(a):YES},mouseUp:function(a){if(this._isMouseDown){this.set("isActive",NO)
}var b=this._isMouseDown?this._triggerHandle(a):YES;this._isMouseDown=NO;return b
},mouseWheel:function(b){if(!this.get("isEnabled")){return YES}var d=this.get("minimum"),a=this.get("maximum"),c=this.get("value")+((b.wheelDeltaX+b.wheelDeltaY)*0.01),e=this.get("step"),f=Math.round(c/e)*e;
if(c<d){this.setIfChanged("value",d)}else{if(c>a){this.setIfChanged("value",a)}else{this.setIfChanged("value",c)
}}return YES},touchStart:function(a){return this.mouseDown(a)},touchEnd:function(a){return this.mouseUp(a)
},touchesDragged:function(a){return this.mouseDragged(a)},_triggerHandle:function(b,e){var f=this.get("frame").width,d=this.get("minimum"),a=this.get("maximum"),g=this.get("step"),c=this.get("value"),h;
if(e){h=this.convertFrameFromView({x:b.pageX}).x;this._evtDiff=b.pageX-h}else{h=b.pageX-this._evtDiff
}h=Math.max(Math.min(h,f-8),8)-8;f-=16;h=h/f;h=d+((a-d)*h);if(g!==0){h=Math.round(h/g)*g
}if(Math.abs(c-h)>=0.01){this.set("value",h)}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},keyDown:function(c){if(c.which===9){var b=c.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(b){b.becomeFirstResponder()}else{c.allowDefault()}return YES}if(c.which===37||c.which===38||c.which===39||c.which===40){var e=this.get("minimum"),a=this.get("maximum"),f=this.get("step"),d=a-e,h=0,g;
if(c.which===37||c.which===38){if(f===0){if(d<100){h=this.get("value")-1}else{g=Math.abs(d/100);
if(g<2){g=2}h=this.get("value")-Math.abs(d/100)}}else{h=this.get("value")-f}}if(c.which===39||c.which===40){if(f===0){if(d<100){h=this.get("value")+2
}else{g=Math.abs(d/100);if(g<2){g=2}h=this.get("value")+g}}else{h=this.get("value")+f
}}if(h>=e&&h<=a){this.set("value",h)}}SC.RunLoop.begin().end();return YES},contentPropertyDidChange:function(c,a){var b=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",a,"contentValueKey",b).updatePropertyFromContent("minimum",a,"contentMinimumKey",b).updatePropertyFromContent("maximum",a,"contentMaximumKey",b).updatePropertyFromContent("isIndeterminate",a,"contentIsIndeterminateKey",b).endPropertyChanges()
}});sc_require("mixins/collection_group");sc_require("views/disclosure");SC.SourceListGroupView=SC.View.extend(SC.Control,SC.CollectionGroup,{classNames:["sc-source-list-group"],content:null,isGroupVisible:YES,hasGroupTitle:YES,groupTitleKey:null,groupVisibleKey:null,render:function(a,b){a.push('<div role="button" class="sc-source-list-label sc-disclosure-view sc-button-view button disclosure no-disclosure">','<img src="'+SC.BLANK_IMAGE_URL+'" class="button" />','<span class="label"></span></div>')
},createChildViews:function(){},contentPropertyDidChange:function(f,c){var e=this.get("content");
var h=this.outlet("labelView");if(e===null){h.setIfChanged("isVisible",NO);this.setIfChanged("hasGroupTitle",NO);
return}else{h.setIfChanged("isVisible",YES);this.setIfChanged("hasGroupTitle",YES)
}var b=this.getDelegateProperty("groupTitleKey",this.displayDelegate);if((c=="*")||(b&&(c==b))){var g=(e&&e.get&&b)?e.get(b):e;
if(g!=this._title){this._title=g;if(g){g=g.capitalize()}h.set("title",g)}}var d=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if((c=="*")||(d&&(c==d))){if(d){h.removeClassName("no-disclosure");var a=(e&&e.get)?!!e.get(d):YES;
if(a!=this.get("isGroupVisible")){this.set("isGroupVisible",a);h.set("value",a)}}else{h.addClassName("no-disclosure")
}}},disclosureValueDidChange:function(c){if(c==this.get("isGroupVisible")){return
}var b=this.get("content");var a=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if(b&&b.set&&a){b.set(a,c)}this.set("isGroupVisible",c);if(this.owner&&this.owner.updateChildren){this.owner.updateChildren(true)
}},labelView:SC.DisclosureView.extend({value:YES,_valueObserver:function(){if(this.owner){this.owner.disclosureValueDidChange(this.get("value"))
}}.observes("value")})});sc_require("views/list");sc_require("views/source_list_group");
SC.BENCHMARK_SOURCE_LIST_VIEW=YES;SC.SourceListView=SC.ListView.extend({classNames:["sc-source-list"],rowHeight:32,selectOnMouseDown:NO,actOnSelect:YES});
SC.RESIZE_BOTH="resize-both";SC.RESIZE_TOP_LEFT="resize-top-left";SC.RESIZE_BOTTOM_RIGHT="resize-bottom-right";
SC.SplitView=SC.View.extend({classNames:["sc-split-view"],displayProperties:["layoutDirection"],delegate:null,layoutDirection:SC.LAYOUT_HORIZONTAL,canCollapseViews:YES,autoresizeBehavior:SC.RESIZE_BOTTOM_RIGHT,defaultThickness:0.5,isSplitView:YES,topLeftView:SC.View,dividerView:SC.SplitDividerView,bottomRightView:SC.View,topLeftThickness:function(){var a=this.get("topLeftView");
return a?this.thicknessForView(a):0}.property("topLeftView").cacheable(),bottomRightThickness:function(){var a=this.get("bottomRightView");
return a?this.thicknessForView(a):0}.property("bottomRightView").cacheable(),thumbViewCursor:null,canCollapseView:function(a){return this.invokeDelegateMethod(this.delegate,"splitViewCanCollapse",this,a)
},thicknessForView:function(a){var c=this.get("layoutDirection"),b=a.get("frame");
return(c===SC.LAYOUT_HORIZONTAL)?b.width:b.height},createChildViews:function(){var e=[],d=["topLeftView","dividerView","bottomRightView"],c,b,a;
for(b=0,a=d.length;b<a;++b){if(c=this.get(d[b])){c=this[d[b]]=this.createChildView(c,{layoutView:this,rootElementPath:[b]});
e.push(c)}}this.set("childViews",e);return this},updateChildLayout:function(){var a=this.get("topLeftView"),b=this.get("bottomRightView"),h=this.get("dividerView"),k=this.get("layoutDirection"),d=this._desiredTopLeftThickness;
var l=this.get("dividerThickness");l=(!SC.none(l))?l:7;var g=(k===SC.LAYOUT_HORIZONTAL)?this.get("frame").width:this.get("frame").height,m=g-l-d,c=this.get("autoresizeBehavior"),f,e;
e=a.get("isCollapsed")||NO;a.setIfChanged("isVisible",!e);f=SC.clone(a.get("layout"));
if(k===SC.LAYOUT_HORIZONTAL){f.top=0;f.left=0;f.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:f.right=m+l;delete f.width;break;case SC.RESIZE_BOTTOM_RIGHT:delete f.right;
delete f.height;f.width=d;break}}else{f.top=0;f.left=0;f.right=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:f.bottom=m+l;delete f.height;break;case SC.RESIZE_BOTTOM_RIGHT:delete f.bottom;
delete f.width;f.height=d;break}}a.set("layout",f);if(h){f=SC.clone(h.get("layout"));
if(k===SC.LAYOUT_HORIZONTAL){f.width=l;delete f.height;f.top=0;f.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:delete f.left;f.right=m;delete f.centerX;delete f.centerY;
break;case SC.RESIZE_BOTTOM_RIGHT:f.left=d;delete f.right;delete f.centerX;delete f.centerY;
break}}else{delete f.width;f.height=l;f.left=0;f.right=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:delete f.top;f.bottom=m;delete f.centerX;delete f.centerY;
break;case SC.RESIZE_BOTTOM_RIGHT:f.top=d;delete f.bottom;delete f.centerX;delete f.centerY;
break}}h.set("layout",f)}e=b.get("isCollapsed")||NO;b.setIfChanged("isVisible",!e);
f=SC.clone(b.get("layout"));if(k===SC.LAYOUT_HORIZONTAL){f.top=0;f.bottom=0;f.right=0;
switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";case SC.RESIZE_BOTTOM_RIGHT:f.left=d+l;
delete f.width;break;case SC.RESIZE_TOP_LEFT:delete f.left;f.width=m;break}}else{f.left=0;
f.right=0;f.bottom=0;switch(c){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_BOTTOM_RIGHT:f.top=d+l;delete f.height;break;case SC.RESIZE_TOP_LEFT:delete f.top;
f.height=m;break}}b.set("layout",f);this.notifyPropertyChange("topLeftThickness").notifyPropertyChange("bottomRightThickness")
},renderLayout:function(b,a){if(a||this._recalculateDivider){if(!this.get("thumbViewCursor")){this.set("thumbViewCursor",SC.Cursor.create())
}var d=this.get("layoutDirection"),f=this.get("frame"),e,k=this.$(),h=this.get("defaultThickness"),c=this.get("autoresizeBehavior");
var g=this.get("dividerThickness");g=(!SC.none(g))?g:7;if(this._recalculateDivider===undefined&&h<1){this._recalculateDivider=YES
}else{if(this._recalculateDivider){this._recalculateDivider=NO}}if(k[0]){e=(d===SC.LAYOUT_HORIZONTAL)?k[0].offsetWidth:k[0].offsetHeight
}else{e=(d===SC.LAYOUT_HORIZONTAL)?f.width:f.height}if(SC.none(h)||(h>0&&h<1)){h=Math.floor((e-(g))*(h||0.5))
}if(c===SC.RESIZE_BOTTOM_RIGHT){this._desiredTopLeftThickness=h}else{this._desiredTopLeftThickness=e-g-h
}this._topLeftView=this.get("topLeftView");this._bottomRightView=this.get("bottomRightView");
this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));
this._dividerThickness=this.get("dividerThickness");this._layoutDirection=this.get("layoutDirection");
this._updateTopLeftThickness(0);this._setCursorStyle();this.updateChildLayout()}arguments.callee.base.apply(this,arguments)
},render:function(b,c){arguments.callee.base.apply(this,arguments);if(this._inLiveResize){this._setCursorStyle()
}var a=this.get("layoutDirection");if(a===SC.LAYOUT_HORIZONTAL){b.addClass("sc-horizontal")
}else{b.addClass("sc-vertical")}},mouseDownInThumbView:function(a,c){var b=this.getPath("pane.rootResponder");
if(!b){return NO}b.dragDidStart(this);this._mouseDownX=a.pageX;this._mouseDownY=a.pageY;
this._thumbView=c;this._topLeftView=this.get("topLeftView");this._bottomRightView=this.get("bottomRightView");
this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));
this._dividerThickness=this.get("dividerThickness");this._layoutDirection=this.get("layoutDirection");
this.beginLiveResize();this._inLiveResize=YES;return YES},mouseDragged:function(a){var b=(this._layoutDirection===SC.LAYOUT_HORIZONTAL)?a.pageX-this._mouseDownX:a.pageY-this._mouseDownY;
this._updateTopLeftThickness(b);return YES},mouseUp:function(a){if(this._inLiveResize===YES){this._thumbView=null;
this._inLiveResize=NO;this.endLiveResize();return YES}return NO},touchesDragged:function(a){return this.mouseDragged(a)
},touchEnd:function(a){return this.mouseUp(a)},doubleClickInThumbView:function(b,d){var a=this._topLeftView,c=a.get("isCollapsed")||NO;
if(!c&&!this.canCollapseView(a)){a=this._bottomRightView;c=a.get("isCollapsed")||NO;
if(!c&&!this.canCollapseView(a)){return NO}}if(!c){this._uncollapsedThickness=this.thicknessForView(a);
if(a===this._topLeftView){this._updateTopLeftThickness(this.topLeftThickness()*-1)
}else{this._updateBottomRightThickness(this.bottomRightThickness()*-1)}if(!a.get("isCollapsed")){this._uncollapsedThickness=null
}}else{if(a===this._topLeftView){this._updateTopLeftThickness(this._uncollapsedThickness)
}else{this._updateBottomRightThickness(this._uncollapsedThickness)}a._uncollapsedThickness=null
}this._setCursorStyle();return true},_updateTopLeftThickness:function(e){var a=this._topLeftView,c=this._bottomRightView,f=this.thicknessForView(a),g=this.thicknessForView(c),l=this._dividerThickness,k=0,b=this._topLeftViewThickness+e,q=this._layoutDirection,s=this.canCollapseView(c),n=b,m=this.get("topLeftMaxThickness"),d=this.get("topLeftMinThickness"),r,h,u;
if(!a.get("isCollapsed")){k+=f}if(!c.get("isCollapsed")){k+=g}if(!SC.none(m)){n=Math.min(m,n)
}if(!SC.none(d)){n=Math.max(d,n)}m=this.get("bottomRightMaxThickness");d=this.get("bottomRightMinThickness");
r=k-n;if(!SC.none(m)){r=Math.min(m,r)}if(!SC.none(d)){r=Math.max(d,r)}n=k-r;n=this.invokeDelegateMethod(this.delegate,"splitViewConstrainThickness",this,a,n);
n=Math.min(n,k);n=Math.max(0,n);h=a.get("collapseAtThickness");if(!h){h=0}u=c.get("collapseAtThickness");
u=SC.none(u)?k:(k-u);if((b<=h)&&this.canCollapseView(a)){m=c.get("maxThickness");
if(!m||(l+k)<=m){n=0}}else{if(b>=u&&this.canCollapseView(c)){m=a.get("maxThickness");
if(!m||(l+k)<=m){n=k}}}if(n!=this.thicknessForView(a)){this._desiredTopLeftThickness=n;
a.set("isCollapsed",n===0);c.set("isCollapsed",n>=k);this.updateChildLayout();this.displayDidChange()
}},_updateBottomRightThickness:function(e){var a=this._topLeftView,c=this._bottomRightView,f=this.thicknessForView(a),g=this.thicknessForView(c),l=this._dividerThickness,k=0,b=this._topLeftViewThickness+e,q=this._layoutDirection,s=this.canCollapseView(c),n=b,m=this.get("topLeftMaxThickness"),d=this.get("topLeftMinThickness"),r,h,u;
if(!a.get("isCollapsed")){k+=f}if(!c.get("isCollapsed")){k+=g}if(!SC.none(m)){n=Math.min(m,n)
}if(!SC.none(d)){n=Math.max(d,n)}m=this.get("bottomRightMaxThickness");d=this.get("bottomRightMinThickness");
r=k-n;if(!SC.none(m)){r=Math.min(m,r)}if(!SC.none(d)){r=Math.max(d,r)}n=k-r;n=this.invokeDelegateMethod(this.delegate,"splitViewConstrainThickness",this,a,n);
n=Math.min(n,k);n=Math.max(0,n);h=a.get("collapseAtThickness");if(!h){h=0}u=c.get("collapseAtThickness");
u=SC.none(u)?k:(k-u);if((b<=h)&&this.canCollapseView(a)){m=c.get("maxThickness");
if(!m||(l+k)<=m){n=0}}else{if(b>=u&&this.canCollapseView(c)){m=a.get("maxThickness");
if(!m||(l+k)<=m){n=k}}}if(n!=this.thicknessForView(a)){this._desiredTopLeftThickness=n;
a.set("isCollapsed",n===0);c.set("isCollapsed",n>=k);this.updateChildLayout();this.displayDidChange()
}},_setCursorStyle:function(){var d=this._topLeftView,e=this._bottomRightView,a=this.get("thumbViewCursor"),b=this.thicknessForView(d),c=this.thicknessForView(e);
this._layoutDirection=this.get("layoutDirection");if(d.get("isCollapsed")||b===this.get("topLeftMinThickness")||c==this.get("bottomRightMaxThickness")){a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"e-resize":"s-resize")
}else{if(e.get("isCollapsed")||b===this.get("topLeftMaxThickness")||c==this.get("bottomRightMinThickness")){a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"w-resize":"n-resize")
}else{if(SC.browser.msie){a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"e-resize":"n-resize")
}else{a.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"ew-resize":"ns-resize")
}}}}.observes("layoutDirection"),splitViewCanCollapse:function(b,a){if(b.get("canCollapseViews")===NO){return NO
}if(a.get("canCollapse")===NO){return NO}return YES},splitViewConstrainThickness:function(c,a,b){return b
},_forceSplitCalculation:function(){this.updateLayout()}.observes("*pane.isPaneAttached"),viewDidResize:function(){arguments.callee.base.apply(this,arguments);
this.notifyPropertyChange("topLeftThickness").notifyPropertyChange("bottomRightThickness")
}.observes("layout")});sc_require("views/split");SC.SplitDividerView=SC.View.extend({classNames:["sc-split-divider-view"],prepareContext:function(a,c){var b=this.get("splitView");
if(b){this.set("cursor",b.get("thumbViewCursor"))}return arguments.callee.base.apply(this,arguments)
},mouseDown:function(a){var b=this.get("splitView");return(b)?b.mouseDownInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},doubleClick:function(a){var b=this.get("splitView");return(b)?b.doubleClickInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},touchStart:function(a){return this.mouseDown(a)}});sc_require("views/collection");
SC.StackedView=SC.CollectionView.extend({classNames:["sc-stacked-view"],layout:{top:0,left:0,right:0,height:1},computeNowShowing:function(a){return this.get("allContentIndexes")
},updateHeight:function(a){if(a){this._updateHeight()}else{this.invokeLast(this._updateHeight)
}return this},_updateHeight:function(){var e=this.get("childViews"),b=e.get("length"),c,d,a;
if(b===0){a=1}else{c=e.objectAt(b-1);d=c?c.get("layer"):null;a=d?(d.offsetTop+d.offsetHeight):1;
d=null}this.adjust("height",a)},didReload:function(a){return this.updateHeight()},didCreateLayer:function(){return this.updateHeight()
}});SC.StaticContentView=SC.View.extend(SC.StaticLayout,{classNames:["sc-static-content-view"],displayProperties:["content"],content:null,contentLayoutDidChange:function(){this._viewFrameDidChange()
},useStaticLayout:YES,frame:function(){var a=this.get("layer"),b;if(!a){return{x:0,y:0,width:0,height:0}
}if(a.getBoundingClientRect){b=a.getBoundingClientRect();return{x:0,y:0,width:b.width,height:b.height}
}else{return{x:0,y:0,width:a.clientWidth,height:a.clientHeight}}}.property("content").cacheable(),parentViewDidResize:function(){this.contentLayoutDidChange()
},didCreateLayer:function(){this.contentLayoutDidChange()},render:function(a,c){var b=this.get("content");
if(b){a.push(b||"")}},touchStart:function(a){a.allowDefault();return YES},touchEnd:function(a){a.allowDefault();
return YES}});sc_require("views/segmented");SC.TOP_LOCATION="top";SC.TOP_TOOLBAR_LOCATION="top-toolbar";
SC.BOTTOM_LOCATION="bottom";SC.TabView=SC.View.extend({classNames:["sc-tab-view"],displayProperties:["nowShowing"],nowShowing:null,items:[],isEnabled:YES,itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemToolTipKey:null,tabHeight:SC.REGULAR_BUTTON_HEIGHT,tabLocation:SC.TOP_LOCATION,userDefaultKey:null,_tab_nowShowingDidChange:function(){var a=this.get("nowShowing");
this.get("containerView").set("nowShowing",a);this.get("segmentedView").set("value",a);
return this}.observes("nowShowing"),_tab_saveUserDefault:function(){var a=this.get("nowShowing");
var b=this.get("userDefaultKey");if(b){SC.userDefaults.set([b,"nowShowing"].join(":"),a)
}}.observes("nowShowing"),_tab_itemsDidChange:function(){this.get("segmentedView").set("items",this.get("items"));
return this}.observes("items"),init:function(){arguments.callee.base.apply(this,arguments);
this._tab_nowShowingDidChange()._tab_itemsDidChange()},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("userDefaultKey");if(a){a=[a,"nowShowing"].join(":");var b=SC.userDefaults.get(a);
if(!SC.none(b)){this.set("nowShowing",b)}}},createChildViews:function(){var f=[],a,e,d,c=this.get("tabLocation"),b=this.get("tabHeight");
d=(c===SC.TOP_LOCATION)?{top:b/2+1,left:0,right:0,bottom:0}:(c===SC.TOP_TOOLBAR_LOCATION)?{top:b+1,left:0,right:0,bottom:0}:{top:0,left:0,right:0,bottom:b-1};
e=this.containerView.extend(SC.Border,{layout:d,borderStyle:SC.BORDER_BLACK});a=this.containerView=this.createChildView(e);
f.push(a);d=(c===SC.TOP_LOCATION||c===SC.TOP_TOOLBAR_LOCATION)?{height:b,left:0,right:0,top:0}:{height:b,left:0,right:0,bottom:0};
this.segmentedView=this.get("segmentedView").extend({layout:d,_sc_tab_segmented_valueDidChange:function(){var g=this.get("parentView");
if(g){g.set("nowShowing",this.get("value"))}this.set("layerNeedsUpdate",YES);this.invokeOnce(this.updateLayerIfNeeded)
}.observes("value"),init:function(){var g=this.get("parentView");if(g){SC._TAB_ITEM_KEYS.forEach(function(h){this[h]=g.get(h)
},this)}return arguments.callee.base.apply(this,arguments)}});a=this.segmentedView=this.createChildView(this.segmentedView);
f.push(a);this.set("childViews",f);return this},containerView:SC.ContainerView,segmentedView:SC.SegmentedView});
SC._TAB_ITEM_KEYS="itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey itemActionKey itemTargetKey".w();
SC.ThumbView=SC.View.extend({classNames:["sc-thumb-view"],isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),prepareContext:function(a,c){var b=this.get("splitView");
if(b){this.set("cursor",b.get("thumbViewCursor"))}return arguments.callee.base.apply(this,arguments)
},mouseDown:function(a){if(!this.get("isEnabled")){return NO}var b=this.get("splitView");
return(b)?b.mouseDownInThumbView(a,this):arguments.callee.base.apply(this,arguments)
},touchStart:function(a){return this.mouseDown(a)}});SC.ToolbarView=SC.View.extend({classNames:["sc-toolbar-view"],anchorLocation:null,layout:{left:0,height:32,right:0},init:function(){if(this.anchorLocation){this.layout=SC.merge(this.layout,this.anchorLocation)
}arguments.callee.base.apply(this,arguments)}});SC.WebView=SC.View.extend(SC.Control,{classNames:"sc-web-view",displayProperties:["value","shouldAutoResize"],shouldAutoResize:NO,render:function(a,d){var c=this.get("value");
if(d){a.push('<iframe src="'+c+'" style="position: absolute; width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0p;"></iframe>')
}else{var b=this.$("iframe");b.attr("src","javascript:;");b.attr("src",c)}},didCreateLayer:function(){var a=this.$("iframe");
SC.Event.add(a,"load",this,this.iframeDidLoad)},iframeDidLoad:function(){if(this.get("shouldAutoResize")===YES){var a;
var c=this.$("iframe")[0];if(c&&c.contentWindow){a=c.contentWindow;if(a&&a.document&&a.document.documentElement){var b=a.document.documentElement;
if(!SC.browser.isIE){this.$().width(b.scrollWidth);this.$().height(b.scrollHeight)
}else{this.$().width(b.scrollWidth+12);this.$().height(b.scrollHeight+5)}}}}}});SC.WELL_CONTAINER_PADDING=15;
SC.WellView=SC.ContainerView.extend({classNames:"sc-well-view",contentLayout:{top:SC.WELL_CONTAINER_PADDING,bottom:SC.WELL_CONTAINER_PADDING,left:SC.WELL_CONTAINER_PADDING,right:SC.WELL_CONTAINER_PADDING},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);a.set("layout",this.contentLayout);
this.childViews=[a]}},render:function(a,b){if(b){a.push("<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>","<div class='content-background'></div>")
}arguments.callee.base.apply(this,arguments)},contentViewDidChange:function(){var a=this.get("contentView");
a.set("layout",this.contentLayout);this.replaceContent(a)}.observes("contentView")});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/desktop")
}SC.DataSource=SC.Object.extend({fetch:function(a,b){return NO},retrieveRecords:function(a,c,b){return this._handleEach(a,c,this.retrieveRecord,b)
},commitRecords:function(c,b,g,f,h){var d,e,a;if(b.length>0){d=this.createRecords.call(this,c,b,h)
}if(g.length>0){e=this.updateRecords.call(this,c,g,h)}if(f.length>0){a=this.destroyRecords.call(this,c,f,h)
}return((d===e)&&(d===a))?d:SC.MIXED_STATE},cancel:function(a,b){return NO},updateRecords:function(a,b,c){return this._handleEach(a,b,this.updateRecord,null,c)
},createRecords:function(a,b,c){return this._handleEach(a,b,this.createRecord,null,c)
},destroyRecords:function(a,b,c){return this._handleEach(a,b,this.destroyRecord,null,c)
},_handleEach:function(g,d,c,a,b){var e=d.length,h,f,k,l;if(!a){a=[]}for(h=0;h<e;
h++){l=a[h]?a[h]:b;k=c.call(this,g,d[h],l,b);if(f===undefined){f=k}else{if(f===YES){f=(k===YES)?YES:SC.MIXED_STATE
}else{if(f===NO){f=(k===NO)?NO:SC.MIXED_STATE}}}}return f?f:null},updateRecord:function(a,b,c){return NO
},retrieveRecord:function(a,b,c){return NO},createRecord:function(a,b,c){return NO
},destroyRecord:function(a,b,c){return NO}});sc_require("data_sources/data_source");
SC.CascadeDataSource=SC.DataSource.extend({dataSources:null,from:function(a){var b=this.get("dataSources");
if(!b){this.set("dataSources",b=[])}b.push(a);return this},fetch:function(c,g){var e=this.get("dataSources"),b=e?e.length:0,d=NO,h,f,a;
for(a=0;(d!==YES)&&a<b;a++){f=e.objectAt(a);h=f.fetch?f.fetch.call(f,c,g):NO;d=this._handleResponse(d,h)
}return d},retrieveRecords:function(c,f){var e=this.get("dataSources"),b=e?e.length:0,d=NO,h,g,a;
for(a=0;(d!==YES)&&a<b;a++){g=e.objectAt(a);h=g.retrieveRecords.call(g,c,f);d=this._handleResponse(d,h)
}return d},commitRecords:function(k,c,g,d){var b=this.get("dataSources"),e=b?b.length:0,f=NO,l,a,h;
for(h=0;(f!==YES)&&h<e;h++){a=b.objectAt(h);l=a.commitRecords.call(a,k,c,g,d);f=this._handleResponse(f,l)
}return f},cancel:function(c,f){var e=this.get("dataSources"),b=e?e.length:0,d=NO,h,g,a;
for(a=0;(d!==YES)&&a<b;a++){g=e.objectAt(a);h=g.cancel.call(g,c,f);d=this._handleResponse(d,h)
}return d},init:function(){arguments.callee.base.apply(this,arguments);var b=this.get("dataSources"),a=b?b.get("length"):0,c;
while(--a>=0){c=b[a];if(SC.typeOf(c)===SC.T_STRING){b[a]=this.get(c)}}},_handleResponse:function(b,a){if(a===YES){return YES
}else{if(b===NO){return(a===NO)?NO:SC.MIXED_STATE}else{return SC.MIXED_STATE}}}});
SC.Record=SC.Object.extend({isRecord:YES,primaryKey:"guid",id:function(a,b){if(b!==undefined){this.writeAttribute(this.get("primaryKey"),b);
return b}else{return SC.Store.idFor(this.storeKey)}}.property("storeKey").cacheable(),status:function(){return this.store.readStatus(this.storeKey)
}.property("storeKey").cacheable(),store:null,storeKey:null,isDestroyed:function(){return !!(this.get("status")&SC.Record.DESTROYED)
}.property("status").cacheable(),isEditable:function(a,b){if(b!==undefined){this._screc_isEditable=b
}if(this.get("status")&SC.Record.READY){return this._screc_isEditable}else{return NO
}}.property("status").cacheable(),_screc_isEditable:YES,isLoaded:function(){var b=SC.Record,a=this.get("status");
return !((a===b.EMPTY)||(a===b.BUSY_LOADING)||(a===b.ERROR))}.property("status").cacheable(),relationships:null,attributes:function(){var a=this.get("store"),b=this.storeKey;
return a.readEditableDataHash(b)}.property(),readOnlyAttributes:function(){var a=this.get("store"),c=this.storeKey,b=a.readDataHash(c);
if(b){b=SC.clone(b,YES)}return b}.property(),childRecords:null,childRecordNamespace:null,refresh:function(){this.get("store").refreshRecord(null,null,this.get("storeKey"));
return this},destroy:function(){this.get("store").destroyRecord(null,null,this.get("storeKey"));
this.notifyPropertyChange("status");this.propagateToAggregates();return this},recordDidChange:function(a){this.get("store").recordDidChange(null,null,this.get("storeKey"),a);
this.notifyPropertyChange("status");this.propagateToAggregates();return this},_editLevel:0,beginEditing:function(){this._editLevel++;
return this},endEditing:function(a){if(--this._editLevel<=0){this._editLevel=0;this.recordDidChange(a)
}return this},readAttribute:function(c){var a=this.get("store"),d=this.storeKey;var b=a.readDataHash(d);
return b?b[c]:undefined},writeAttribute:function(c,f,e){var a=this.get("store"),d=this.storeKey,b;
b=a.readEditableDataHash(d);if(!b){throw SC.Record.BAD_STATE_ERROR}if(f!==b[c]){if(!e){this.beginEditing()
}b[c]=f;if(c===this.get("primaryKey")){SC.Store.replaceIdFor(d,f);this.propertyDidChange("id")
}if(!e){this.endEditing(c)}}return this},propagateToAggregates:function(){var s=this.get("storeKey"),d=SC.Store.recordTypeFor(s),q,h,r,b,n;
var g=d.aggregates;if(!g){var f=this.get("store").readDataHash(s);g=[];for(var c in f){if(this[c]&&this[c].get&&this[c].get("aggregate")===YES){g.push(c)
}}d.aggregates=g}var m=SC.Record,a=m.DIRTY,e=m.READY_NEW,u=m.DESTROYED,v=m.READY_CLEAN,l;
l=function(x){var k,w;if(x){k=this.get("status");if((k&a)||(k&e)||(k&u)){w=x.get("status");
if(w===v){x.get("store").recordDidChange(x.constructor,null,x.get("storeKey"),null,YES)
}}}};for(q=0,h=g.length;q<h;++q){r=g[q];b=this.get(r);n=SC.kindOf(b,SC.ManyArray)?b:[b];
n.forEach(l,this)}},storeDidChangeProperties:function(a,b){if(a){this.notifyPropertyChange("status")
}else{if(b){this.beginPropertyChanges();b.forEach(function(e){this.notifyPropertyChange(e)
},this);this.notifyPropertyChange("status");this.endPropertyChanges()}else{this.allPropertiesDidChange()
}var d=this.relationships,c=d?d.length:0;while(--c>=0){d[c].recordPropertyDidChange(b)
}}},normalize:function(e){var l=this.primaryKey,c=this.get("id"),m=this.get("store"),q=this.get("storeKey"),n,h,d,u,g,s,b,a,k,r;
var f=m.readEditableDataHash(q)||{};f[l]=c;u=m.readDataHash(q);for(n in this){h=this[n];
if(h){d=h.typeClass;if(d){r=h.get("key")||n;b=SC.typeOf(d.call(h))===SC.T_CLASS;a=h.isChildRecordTransform;
if(!b&&!a){g=this.get(n);if(g!==undefined||(g===null&&e)){f[r]=g}}else{if(a){g=this.get(n);
if(g&&g.normalize){g.normalize()}}else{if(b){g=u[n];if(g!==undefined){f[r]=g}else{k=h.get("defaultValue");
if(SC.typeOf(k)===SC.T_FUNCTION){f[r]=k(this,n,k)}else{f[r]=k}}}}}}}}return this},unknownProperty:function(b,d){if(d!==undefined){var c=this.get("storeKey"),e=SC.Store.recordTypeFor(c);
if(e.ignoreUnknownProperties===YES){this[b]=d;return d}var a=this.get("primaryKey");
this.writeAttribute(b,d);if(b===a){SC.Store.replaceIdFor(c,d)}}return this.readAttribute(b)
},commitRecord:function(b){var a=this.get("store");a.commitRecord(undefined,undefined,this.get("storeKey"),b);
return this},isError:function(){return this.get("status")&SC.Record.ERROR}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var a=this.get("store");
return a.readError(this.get("storeKey"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),set:function(a,c){var b=this[a];if(b&&b.isProperty&&b.get&&!b.get("isEditable")){return this
}return arguments.callee.base.apply(this,arguments)},toString:function(){var a=this.get("store").readDataHash(this.get("storeKey"));
return"%@(%@) %@".fmt(this.constructor.toString(),SC.inspect(a),this.statusString())
},statusString:function(){var b=[],a=this.get("status");for(var c in SC.Record){if(c.match(/[A-Z_]$/)&&SC.Record[c]===a){b.push(c)
}}return b.join(" ")},registerChildRecord:function(f,e){var c=f.primaryKey||"childRecordKey";
var d=e[c];var b=null;var a=this.get("childRecords");if(d&&a){b=a[d]}if(SC.none(b)){b=this.createChildRecord(f,e)
}return b},createChildRecord:function(b,c){var a=null;SC.run(function(){var g=SC.Record._generateChildKey();
c=c||{};var f=b.primaryKey||"childRecordKey";var h=c[f];c[f]=g;var e=this.get("store");
if(SC.none(e)){throw"Error: during the creation of a child record: NO STORE ON PARENT!"
}a=e.createRecord(b,c);a._parentRecord=this;if(this.generateIdForChild){this.generateIdForChild(a)
}var d=this.get("childRecords");if(SC.none(d)){d=SC.Object.create();this.set("childRecords",d)
}d[g]=a},this);return a},generateIdForChild:function(a){}});SC.Record.mixin({ignoreUnknownProperties:NO,CLEAN:1,DIRTY:2,EMPTY:256,ERROR:4096,READY:512,READY_CLEAN:513,READY_DIRTY:514,READY_NEW:515,DESTROYED:1024,DESTROYED_CLEAN:1025,DESTROYED_DIRTY:1026,BUSY:2048,BUSY_LOADING:2052,BUSY_CREATING:2056,BUSY_COMMITTING:2064,BUSY_REFRESH:2080,BUSY_REFRESH_CLEAN:2081,BUSY_REFRESH_DIRTY:2082,BUSY_DESTROYING:2112,BAD_STATE_ERROR:SC.$error("Internal Inconsistency"),RECORD_EXISTS_ERROR:SC.$error("Record Exists"),NOT_FOUND_ERROR:SC.$error("Not found "),BUSY_ERROR:SC.$error("Busy"),GENERIC_ERROR:SC.$error("Generic Error"),_nextChildKey:0,attr:function(a,b){return SC.RecordAttribute.attr(a,b)
},fetch:function(b,a){return SC.FetchedAttribute.attr(b,a)},toMany:function(d,b){b=b||{};
var c=b.nested;var a;if(c){a=SC.ChildrenAttribute.attr(d,b)}else{a=SC.ManyAttribute.attr(d,b)
}return a},toOne:function(d,b){b=b||{};var c=b.nested;var a;if(c){a=SC.ChildAttribute.attr(d,b)
}else{a=SC.SingleAttribute.attr(d,b)}return a},storeKeysById:function(){var b=SC.keyFor("storeKey",SC.guidFor(this)),a=this[b];
if(!a){a=this[b]={}}return a},storeKeyFor:function(c){var b=this.storeKeysById(),a=b[c];
if(!a){a=SC.Store.generateStoreKey();SC.Store.idsByStoreKey[a]=c;SC.Store.recordTypesByStoreKey[a]=this;
b[c]=a}return a},storeKeyExists:function(c){var b=this.storeKeysById(),a=b[c];return a
},find:function(a,b){return a.find(this,b)},extend:function(){var a=SC.Object.extend.apply(this,arguments);
SC.Query._scq_didDefineRecordType(a);return a},_generateChildKey:function(){var a=SC.Record._nextChildKey+1;
SC.Record._nextChildKey=a;return a}});sc_require("data_sources/data_source");sc_require("models/record");
SC.FixturesDataSource=SC.DataSource.extend({simulateRemoteResponse:NO,latency:50,cancel:function(a,b){return NO
},fetch:function(a,b){if(b.get("location")!==SC.Query.LOCAL){throw SC.$error("SC.Fixture data source can only fetch local queries")
}if(!b.get("recordType")&&!b.get("recordTypes")){throw SC.$error("SC.Fixture data source can only fetch queries with one or more record types")
}if(this.get("simulateRemoteResponse")){this.invokeLater(this._fetch,this.get("latency"),a,b)
}else{this._fetch(a,b)}},_fetch:function(a,c){var d=c.get("recordType"),b=c.get("recordTypes")||[d];
b.forEach(function(e){if(SC.typeOf(e)===SC.T_STRING){e=SC.objectForPropertyPath(e)
}if(e){this.loadFixturesFor(a,e)}},this);a.dataSourceDidFetchQuery(c)},retrieveRecords:function(a,c){var d=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._retrieveRecords,d,a,c)
}else{this._retrieveRecords(a,c)}return b},_retrieveRecords:function(a,b){b.forEach(function(d){var c=[],g=SC.Store.recordTypeFor(d),f=a.idFor(d),e=this.fixtureForStoreKey(a,d);
c.push(d);a.dataSourceDidComplete(d,e,f)},this)},updateRecords:function(a,c,e){var d=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._updateRecords,d,a,c)
}else{this._updateRecords(a,c)}return b},_updateRecords:function(a,b){b.forEach(function(c){var d=a.readDataHash(c);
this.setFixtureForStoreKey(a,c,d);a.dataSourceDidComplete(c)},this)},createRecords:function(a,b,d){var c=this.get("latency");
if(this.get("simulateRemoteResponse")){this.invokeLater(this._createRecords,c,a,b)
}else{this._createRecords(a,b)}return YES},_createRecords:function(a,b){b.forEach(function(e){var g=a.idFor(e),f=a.recordTypeFor(e),d=a.readDataHash(e),c=this.fixturesFor(f);
if(!g){g=this.generateIdFor(f,d,a,e)}this._invalidateCachesFor(f,e,g);c[g]=d;a.dataSourceDidComplete(e,null,g)
},this)},destroyRecords:function(a,c,e){var d=this.get("latency"),b=this.hasFixturesFor(c);
if(!b){return b}if(this.get("simulateRemoteResponse")){this.invokeLater(this._destroyRecords,d,a,c)
}else{this._destroyRecords(a,c)}return b},_destroyRecords:function(a,b){b.forEach(function(d){var f=a.idFor(d),e=a.recordTypeFor(d),c=this.fixturesFor(e);
this._invalidateCachesFor(e,d,f);if(f){delete c[f]}a.dataSourceDidDestroy(d)},this)
},loadFixturesFor:function(a,g,c){var b=[],e,d,f;e=this.fixturesFor(g);for(d in e){f=g.storeKeyFor(d);
if(a.peekStatus(f)===SC.Record.EMPTY){b.push(e[d])}if(c){c.push(f)}}if(b&&b.length>0){a.loadRecords(g,b)
}return this},generateIdFor:function(d,b,a,c){return"@id%@".fmt(SC.Store.generateStoreKey())
},fixtureForStoreKey:function(a,c){var e=a.idFor(c),d=a.recordTypeFor(c),b=this.fixturesFor(d);
return b?b[e]:null},setFixtureForStoreKey:function(a,d,c){var f=a.idFor(d),e=a.recordTypeFor(d),b=this.fixturesFor(e);
this._invalidateCachesFor(e,d,f);b[f]=c;return this},fixturesFor:function(h){if(!this._fixtures){this._fixtures={}
}var f=this._fixtures[SC.guidFor(h)];if(f){return f}var e=h?h.FIXTURES:null,b=e?e.length:0,c=h?h.prototype.primaryKey:"guid",a,d,g;
this._fixtures[SC.guidFor(h)]=f={};for(a=0;a<b;a++){d=e[a];g=d[c];if(!g){g=this.generateIdFor(h,d)
}f[g]=d}return f},fixturesLoadedFor:function(c){if(!this._fixtures){return NO}var a=[],b=this._fixtures[SC.guidFor(c)];
return b?YES:NO},hasFixturesFor:function(b){var a=NO;b.forEach(function(d){if(a!==SC.MIXED_STATE){var e=SC.Store.recordTypeFor(d),c=e?e.FIXTURES:null;
if(c&&c.length&&c.length>0){if(a===NO){a=YES}}else{if(a===YES){a=SC.MIXED_STATE}}}},this);
return a},_invalidateCachesFor:function(d,b,c){var a=this._storeKeyCache;if(a){delete a[SC.guidFor(d)]
}return this}});SC.Record.fixtures=SC.FixturesDataSource.create();sc_require("core");
sc_require("models/record");SC.Query=SC.Object.extend(SC.Copyable,SC.Freezable,{isQuery:YES,conditions:null,orderBy:null,recordType:null,recordTypes:null,expandedRecordTypes:function(){var b=SC.CoreSet.create(),a,c;
if(a=this.get("recordType")){this._scq_expandRecordType(a,b)}else{if(a=this.get("recordTypes")){a.forEach(function(d){this._scq_expandRecordType(d,b)
},this)}else{this._scq_expandRecordType(SC.Record,b)}}c=SC.Query._scq_queriesWithExpandedRecordTypes;
if(!c){c=SC.Query._scq_queriesWithExpandedRecordTypes=SC.CoreSet.create()}c.add(this);
return b.freeze()}.property("recordType","recordTypes").cacheable(),_scq_expandRecordType:function(b,a){if(a.contains(b)){return
}a.add(b);if(SC.typeOf(b)===SC.T_STRING){b=SC.objectForPropertyPath(b)}b.subclasses.forEach(function(c){this._scq_expandRecordType(c,a)
},this)},parameters:null,location:"local",scope:null,isRemote:function(){return this.get("location")===SC.Query.REMOTE
}.property("location").cacheable(),isLocal:function(){return this.get("location")===SC.Query.LOCAL
}.property("location").cacheable(),isEditable:NO,contains:function(a,d){var e,b=YES;
if(e=this.get("recordTypes")){b=e.find(function(f){return SC.kindOf(a,f)})}else{if(e=this.get("recordType")){b=SC.kindOf(a,e)
}}if(!b){return NO}var c=this.get("scope");if(c&&!c.contains(a)){return NO}if(!this._isReady){this.parse()
}if(!this._isReady){return NO}if(d===undefined){d=this.parameters||this}return this._tokenTree.evaluate(a,d)
},containsRecordTypes:function(a){var b=this.get("recordType");if(b){return !!a.find(function(c){return SC.kindOf(c,b)
})}else{if(b=this.get("recordTypes")){return !!b.find(function(c){return !!a.find(function(d){return SC.kindOf(d,c)
})})}else{return YES}}},compare:function(f,d){var c=0,e,b,a,g;if(f===d){return 0}if(!this._isReady){this.parse()
}if(!this._isReady){return SC.compare(f.get("id"),d.get("id"))}b=this._order;if(SC.typeOf(b)===SC.T_FUNCTION){c=b.call(null,f,d)
}else{a=b?b.length:0;for(g=0;c===0&&(g<a);g++){e=b[g].propertyName;if(SC.Query.comparisons[e]){c=SC.Query.comparisons[e](f.get(e),d.get(e))
}else{c=SC.compare(f.get(e),d.get(e))}if((c!==0)&&b[g].descending){c=(-1)*c}}}if(c!==0){return c
}else{return SC.compare(f.get("id"),d.get("id"))}},_isReady:NO,parse:function(){var c=this.get("conditions"),d=this.get("queryLanguage"),b,a;
b=this._tokenList=this.tokenizeString(c,d);a=this._tokenTree=this.buildTokenTree(b,d);
this._order=this.buildOrder(this.get("orderBy"));this._isReady=!!a&&!a.error;if(a&&a.error){throw a.error
}return this._isReady},queryWithScope:function(c){var b=SC.keyFor("__query__",SC.guidFor(this)),a=c[b];
if(!a){c[b]=a=this.copy();a.set("scope",c);a.freeze()}return a},copyKeys:"conditions orderBy recordType recordTypes parameters location scope".w(),concatenatedProperties:"copyKeys".w(),copy:function(){var d={},c=this.get("copyKeys"),f=c?c.length:0,b,e,a;
while(--f>=0){b=c[f];e=this.get(b);if(e!==undefined){d[b]=e}}a=this.constructor.create(d);
d=null;return a},queryLanguage:{UNKNOWN:{firstCharacter:/[^\s'"\w\d\(\)\{\}]/,notAllowed:/[\s'"\w\d\(\)\{\}]/},PROPERTY:{firstCharacter:/[a-zA-Z_]/,notAllowed:/[^a-zA-Z_0-9]/,evalType:"PRIMITIVE",evaluate:function(b,a){return b.get(this.tokenValue)
}},NUMBER:{firstCharacter:/[\d\-]/,notAllowed:/[^\d\-\.]/,format:/^-?\d+$|^-?\d+\.\d+$/,evalType:"PRIMITIVE",evaluate:function(b,a){return parseFloat(this.tokenValue)
}},STRING:{firstCharacter:/['"]/,delimeted:true,evalType:"PRIMITIVE",evaluate:function(b,a){return this.tokenValue
}},PARAMETER:{firstCharacter:/\{/,lastCharacter:"}",delimeted:true,evalType:"PRIMITIVE",evaluate:function(b,a){return a[this.tokenValue]
}},"%@":{rememberCount:true,reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return a[this.tokenValue]
}},OPEN_PAREN:{firstCharacter:/\(/,singleCharacter:true},CLOSE_PAREN:{firstCharacter:/\)/,singleCharacter:true},AND:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var d=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return d&&b}},OR:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var d=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return d||b}},NOT:{reservedWord:true,rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(c,a){var b=this.rightSide.evaluate(c,a);
return !b}},"=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var d=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.isEqual(d,b)}},"!=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var d=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return !SC.isEqual(d,b)}},"<":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var d=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(d,b)==-1}},"<=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var d=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(d,b)!=1}},">":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var d=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(d,b)==1}},">=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var d=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return SC.compare(d,b)!=-1}},BEGINS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var b=this.leftSide.evaluate(c,a);
var d=this.rightSide.evaluate(c,a);return(b&&b.indexOf(d)===0)}},ENDS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(d,b){var c=this.leftSide.evaluate(d,b);
var a=this.rightSide.evaluate(d,b);return(c&&c.indexOf(a)===(c.length-a.length))}},CONTAINS:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(d,a){var c=this.leftSide.evaluate(d,a)||[];
var f=this.rightSide.evaluate(d,a);switch(SC.typeOf(c)){case SC.T_STRING:return(c.indexOf(f)!==-1);
case SC.T_ARRAY:var e=false;var b=0;while(e===false&&b<c.length){if(f==c[b]){e=true
}b++}return e;default:break}}},ANY:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(d,a){var f=this.leftSide.evaluate(d,a);
var b=this.rightSide.evaluate(d,a);var e=false;var c=0;while(e===false&&c<b.length){if(f==b[c]){e=true
}c++}return e}},MATCHES:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(c,a){var d=this.leftSide.evaluate(c,a);
var b=this.rightSide.evaluate(c,a);return b.test(d)}},TYPE_IS:{reservedWord:true,rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(d,a){var c=SC.Store.recordTypeFor(d.storeKey);
var b=this.rightSide.evaluate(d,a);var e=SC.objectForPropertyPath(b);return c==e}},"null":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return null
}},"undefined":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return undefined
}},"false":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return false
}},"true":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return true
}},YES:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return true
}},NO:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(b,a){return false
}}},tokenizeString:function(y,u){var l=[],w=null,h=null,f=null,x=null,a=null,k=null,d=null,g=null,v=false,b=false,n=false,q=false,r={};
function e(A,c){h=u[A];if(h.format&&!h.format.test(c)){A="UNKNOWN"}if(h.delimeted){q=true
}if(!h.delimeted){for(var z in u){if(u[z].reservedWord&&z==c){A=z}}}h=u[A];if(h&&h.rememberCount){if(!r[A]){r[A]=0
}c=r[A];r[A]+=1}l.push({tokenType:A,tokenValue:c});a=null;k=null;d=null}if(!y){return[]
}var m=y.length;for(var s=0;s<m;s++){v=(s===m-1);w=y.charAt(s);q=false;if(a){h=u[a];
b=h.delimeted?w===g:h.notAllowed.test(w);if(!b){d+=w}if(b||v){e(a,d)}if(v&&!b){q=true
}}if(!a&&!q){for(f in u){h=u[f];if(h.firstCharacter&&h.firstCharacter.test(w)){a=f
}}if(a){h=u[a];d=w;if(h.delimeted){d="";if(h.lastCharacter){g=h.lastCharacter}else{g=w
}}if(h.singleCharacter||v){e(a,d)}}}}return l},buildTokenTree:function(m,a){var r=m.slice();
var u=0;var w=[];var c=false;var s=[];if(!m||m.length===0){return{evaluate:function(){return true
}}}function v(l){var A=l;if(A<0){return false}var z=a[r[A].tokenType];if(!z){s.push("logic for token '"+r[A].tokenType+"' is not defined");
return false}r[A].evaluate=z.evaluate;return z}function b(A,l){var B=l;var z=v(B);
if(!z){return false}if(A=="left"){return z.leftType}if(A=="right"){return z.rightType
}}function q(l){var A=l;var z=v(A);if(!z){return false}else{return z.evalType}}function f(l){r.splice(l,1);
if(l<=u){u--}}function x(l){var z=l||u;if(z>0){return true}else{return false}}function k(l){var z=l;
if(z<0){return true}return(b("left",z)&&!r[z].leftSide)||(b("right",z)&&!r[z].rightSide)
}function h(z,A){var l=(A<z)?"left":"right";if(z<0||A<0){return false}if(!b(l,z)){return false
}if(!q(A)){return false}if(b(l,z)==q(A)){return true}else{return false}}function n(l){var z=l;
if(!k(z)){return false}if(!x(z)){return false}if(h(z,z-1)){return true}else{return false
}}function d(l){var z=l;if(k(z)){return false}if(!x(z)){return false}if(!k(z-1)){return false
}if(h(z-1,z)){return true}else{return false}}function g(l){var z=l;if(z<1){return false
}r[z].leftSide=r[z-1];f(z-1)}function y(l){var z=l;if(z<1){return false}r[z-1].rightSide=r[z];
f(z)}function e(l){f(l);f(w.pop())}for(u=0;u<r.length;u++){c=false;if(r[u].tokenType=="UNKNOWN"){s.push("found unknown token: "+r[u].tokenValue)
}if(r[u].tokenType=="OPEN_PAREN"){w.push(u)}if(r[u].tokenType=="CLOSE_PAREN"){e(u)
}if(n(u)){g(u)}if(d(u)){y(u);c=true}if(c){u--}}if(r.length==1){r=r[0]}else{s.push("string did not resolve to a single tree")
}if(s.length>0){return{error:s.join(",\n"),tree:r}}else{return r}},buildOrder:function(a){if(!a){return[]
}else{if(SC.typeOf(a)===SC.T_FUNCTION){return a}else{var d=a.split(",");for(var b=0;
b<d.length;b++){var c=d[b];c=c.replace(/^\s+|\s+$/,"");c=c.replace(/\s+/,",");c=c.split(",");
d[b]={propertyName:c[0]};if(c[1]&&c[1]=="DESC"){d[b].descending=true}}return d}}}});
SC.Query.mixin({LOCAL:"local",REMOTE:"remote",storeKeyFor:function(a){return a?a.get("storeKey"):null
},containsRecords:function(g,e,d){var f=[];for(var b=0,a=e.get("length");b<a;b++){var c=e.objectAt(b);
if(c&&g.contains(c)){f.push(c.get("storeKey"))}}f=SC.Query.orderStoreKeys(f,g,d);
return f},orderStoreKeys:function(e,f,b){if(e){var a=SC.Query,d=a._TMP_STORES,g=a._TMP_QUERIES;
if(!d){d=a._TMP_STORES=[]}if(!g){g=a._TMP_QUERIES=[]}d.push(b);g.push(f);var c=e.sort(SC.Query.compareStoreKeys);
a._TMP_STORES.pop();a._TMP_QUERIES.pop()}return e},compareStoreKeys:function(h,f){var q=SC.Query,m=q._TMP_STORES,b=q._TMP_QUERIES,r=m[m.length-1],n=b[b.length-1],c=n.compare,d=r.materializeRecord(h),a=r.materializeRecord(f);
if(c!==q.prototype.compare){return c.call(n,d,a)}else{var s=0,l,e,k,g;if(d===a){return 0
}if(!n._isReady){n.parse()}if(!n._isReady){return SC.compare(d.get("id"),a.get("id"))
}e=n._order;if(SC.typeOf(e)===SC.T_FUNCTION){s=e.call(null,d,a)}else{k=e?e.length:0;
for(g=0;s===0&&(g<k);g++){l=e[g].propertyName;if(SC.Query.comparisons[l]){s=SC.Query.comparisons[l](d.get(l),a.get(l))
}else{s=SC.compare(d.get(l),a.get(l))}if((s!==0)&&e[g].descending){s=(-1)*s}}}if(s!==0){return s
}else{return SC.compare(d.get("id"),a.get("id"))}}},build:function(h,c,g,d){var a=null,f,b,k,e;
if(c&&c.isQuery){if(c.get("location")===h){return c}else{return c.copy().set("location",h).freeze()
}}if(typeof c===SC.T_STRING){f=SC.objectForPropertyPath(c);if(!f){throw"%@ did not resolve to a class".fmt(c)
}c=f}else{if(c&&c.isEnumerable){f=[];c.forEach(function(l){if(typeof l===SC.T_STRING){l=SC.objectForPropertyPath(l)
}if(!l){throw"cannot resolve record types: %@".fmt(c)}f.push(l)},this);c=f}else{if(!c){c=SC.Record
}}}if(d===undefined){d=null}if(g===undefined){g=null}if(!d&&(typeof g!==SC.T_STRING)){a=g;
g=null}if(!d&&!a){e=SC.Query._scq_recordTypeCache;if(!e){e=SC.Query._scq_recordTypeCache={}
}b=e[h];if(!b){b=e[h]={}}if(c.isEnumerable){k=c.map(function(l){return SC.guidFor(l)
});k=k.sort().join(":")}else{k=SC.guidFor(c)}if(g){k=[k,g].join("::")}f=b[k];if(!f){if(c.isEnumerable){a={recordTypes:c.copy()}
}else{a={recordType:c}}a.location=h;a.conditions=g;f=b[k]=SC.Query.create(a).freeze()
}}else{if(!a){a={}}if(!a.location){a.location=h}if(c&&c.isEnumerable){a.recordsTypes=c
}else{a.recordType=c}if(g){a.conditions=g}if(d){a.parameters=d}f=SC.Query.create(a).freeze()
}return f},local:function(c,a,b){return this.build(SC.Query.LOCAL,c,a,b)},remote:function(c,a,b){return this.build(SC.Query.REMOTE,c,a,b)
},_scq_didDefineRecordType:function(){var a=SC.Query._scq_queriesWithExpandedRecordTypes;
if(a){a.forEach(function(b){b.notifyPropertyChange("expandedRecordTypes")},this);
a.clear()}}});SC.Query.comparisons={};SC.Query.registerComparison=function(a,b){SC.Query.comparisons[a]=b
};SC.Query.registerQueryExtension=function(b,a){SC.Query.prototype.queryLanguage[b]=a
};SC.Q=SC.Query.from;sc_require("core");sc_require("models/record");sc_require("system/query");
SC.ChildRecord=SC.Record.extend({isChildRecord:YES,type:null,primaryKey:"childRecordKey",_parentRecord:null,status:function(){var a=SC.Record.EMPTY;
if(this._parentRecord){a=this._parentRecord.get("status");this.store.writeStatus(this.storeKey,a);
this.store.dataHashDidChange(this.storeKey)}else{a=this.store.readStatus(this.storeKey)
}return a}.property("storeKey").cacheable(),recordDidChange:function(){if(this._parentRecord&&this._parentRecord.recordDidChange){this._parentRecord.recordDidChange()
}else{arguments.callee.base.apply(this,arguments)}},createChildRecord:function(d,c){var a,b=this._parentRecord;
if(b){a=b.createChildRecord(d,c)}else{a=arguments.callee.base.apply(this,arguments)
}return a}});sc_require("models/record");sc_require("models/child_record");SC.RecordAttribute=SC.Object.extend({defaultValue:null,type:String,key:null,isRequired:NO,isEditable:YES,useIsoDate:YES,aggregate:NO,typeClass:function(){var a=this.get("type");
if(SC.typeOf(a)===SC.T_STRING){a=SC.objectForPropertyPath(a)}return a}.property("type").cacheable(),transform:function(){var a=this.get("typeClass")||String,c=SC.RecordAttribute.transforms,b;
while(a&&!(b=c[SC.guidFor(a)])){if(a.superclass.hasOwnProperty("create")){a=a.superclass
}else{a=SC.T_FUNCTION}}return b}.property("typeClass").cacheable(),toType:function(a,c,e){var b=this.get("transform"),d=this.get("typeClass");
if(b&&b.to){e=b.to(e,this,d,a,c)}return e},fromType:function(a,c,e){var b=this.get("transform"),d=this.get("typeClass");
if(b&&b.from){e=b.from(e,this,d,a,c)}return e},call:function(a,b,c){var d=this.get("key")||b,e;
if((c!==undefined)&&this.get("isEditable")){e=this.fromType(a,b,c);a.writeAttribute(d,e)
}e=c=a.readAttribute(d);if(SC.none(c)&&(c=this.get("defaultValue"))){if(typeof c===SC.T_FUNCTION){c=this.defaultValue(a,b,this);
if((e!==c)&&a.get("store").readDataHash(a.get("storeKey"))){a.writeAttribute(d,c,true)
}}}else{c=this.toType(a,b,c)}return c},isProperty:YES,isCacheable:YES,dependentKeys:[],init:function(){arguments.callee.base.apply(this,arguments);
this.cacheKey="__cache__"+SC.guidFor(this);this.lastSetValueKey="__lastValue__"+SC.guidFor(this)
}});SC.RecordAttribute.attr=function(a,b){if(!b){b={}}if(!b.type){b.type=a||String
}return this.create(b)};SC.RecordAttribute.transforms={};SC.RecordAttribute.registerTransform=function(a,b){SC.RecordAttribute.transforms[SC.guidFor(a)]=b
};SC.RecordAttribute.registerTransform(Boolean,{to:function(a){return SC.none(a)?null:!!a
}});SC.RecordAttribute.registerTransform(Number,{to:function(a){return SC.none(a)?null:Number(a)
}});SC.RecordAttribute.registerTransform(String,{to:function(a){if(!(typeof a===SC.T_STRING)&&!SC.none(a)&&a.toString){a=a.toString()
}return a}});SC.RecordAttribute.registerTransform(Array,{to:function(a){if(!SC.isArray(a)&&!SC.none(a)){a=[]
}return a}});SC.RecordAttribute.registerTransform(Object,{to:function(a){if(!(typeof a==="object")&&!SC.none(a)){a={}
}return a}});SC.RecordAttribute.registerTransform(SC.Record,{to:function(e,a,d,c){var b=c.get("store");
if(SC.none(e)||(e==="")){return null}else{return b.find(d,e)}},from:function(a){return a?a.get("id"):null
}});SC.RecordAttribute.registerTransform(SC.T_FUNCTION,{to:function(e,a,d,c){d=d.apply(c);
var b=c.get("store");return b.find(d,e)},from:function(a){return a.get("id")}});SC.RecordAttribute.registerTransform(Date,{to:function(k,a){if(k===null){return null
}var c;k=k.toString()||"";if(a.get("useIsoDate")){var e="([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",h=k.match(new RegExp(e)),g=0,b=new Date(h[1],0,1),f;
if(h[3]){b.setMonth(h[3]-1)}if(h[5]){b.setDate(h[5])}if(h[7]){b.setHours(h[7])}if(h[8]){b.setMinutes(h[8])
}if(h[10]){b.setSeconds(h[10])}if(h[12]){b.setMilliseconds(Number("0."+h[12])*1000)
}if(h[14]){g=(Number(h[16])*60)+Number(h[17]);g*=((h[15]=="-")?1:-1)}g-=b.getTimezoneOffset();
f=(Number(b)+(g*60*1000));c=new Date();c.setTime(Number(f))}else{c=new Date(Date.parse(k))
}return c},_dates:{},_zeropad:function(a){return((a<0)?"-":"")+((a<10)?"0":"")+Math.abs(a)
},from:function(b){var a=this._dates[b.getTime()];if(a){return a}var d=this._zeropad,c=0-b.getTimezoneOffset()/60;
c=(c===0)?"Z":"%@:00".fmt(d(c));this._dates[b.getTime()]=a="%@-%@-%@T%@:%@:%@%@".fmt(d(b.getFullYear()),d(b.getMonth()+1),d(b.getDate()),d(b.getHours()),d(b.getMinutes()),d(b.getSeconds()),c);
return a}});if(SC.DateTime&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(c,a){if(SC.none(c)||SC.instanceOf(c,SC.DateTime)){return c
}var b=a.get("format");return SC.DateTime.parse(c,b?b:SC.DateTime.recordFormat)},from:function(b,a){if(SC.none(b)){return b
}var c=a.get("format");return b.toFormattedString(c?c:SC.DateTime.recordFormat)}})
}sc_require("models/record");sc_require("models/record_attribute");SC.ChildAttribute=SC.RecordAttribute.extend({isChildRecordTransform:YES,toType:function(d,c,e){var b=null,f=SC.keyFor("__kid__",SC.guidFor(this)),g=this.get("typeClass");
if(d[f]){return d[f]}if(!d){throw"SC.Child: Error during transform: Unable to retrieve parent record."
}if(e){var a=d.get("childRecordNamespace");if(e.type&&!SC.none(a)){g=a[e.type]}if(!g||SC.typeOf(g)!==SC.T_CLASS){throw"SC.Child: Error during transform: Invalid record type."
}b=d[f]=d.registerChildRecord(g,e)}return b},fromType:function(a,b,c){return c},call:function(a,b,c){var d=this.get("key")||b,f=SC.keyFor("__kid__",SC.guidFor(this)),e;
if(c!==undefined){this.orphan(a);e=this.fromType(a,b,c);a[f]=null;a.writeAttribute(d,e);
c=this.toType(a,b,c)}else{c=a.readAttribute(d);if(SC.none(c)&&(c=this.get("defaultValue"))){if(typeof c===SC.T_FUNCTION){c=this.defaultValue(a,b,this);
if(a.attributes()){a.writeAttribute(d,c,true)}}}else{c=this.toType(a,b,c)}}return c
},orphan:function(e){var h=SC.keyFor("__kid__",SC.guidFor(this)),b,f,c,d,g,a;a=e?e[h]:null;
if(a){c=a.get("readOnlyAttributes");for(d in c){g=a[d];if(g&&g.isChildRecordTransform){g.orphan(e)
}}b=a.get("store");if(b){f=a.storeKey}if(f){b.unloadRecord(undefined,undefined,f)
}}}});sc_require("models/record");sc_require("models/record_attribute");sc_require("models/child_attribute");
SC.ChildrenAttribute=SC.ChildAttribute.extend({toType:function(b,d,e){var g=this.get("key")||d,f=SC.keyFor("__kidsArray__",SC.guidFor(this)),c=b[f],h=this.get("typeClass"),a;
if(!c){c=SC.ChildArray.create({record:b,propertyName:g,defaultRecordType:h});b[f]=this._cachedRef=c;
a=b.get("relationships");if(!a){b.set("relationships",a=[])}a.push(c)}return c},orphan:function(a){var e=this._cachedRef,f,k,h,g,c,b,d;
if(e){e.forEach(function(l){h=l.get("readOnlyAttributes");for(g in h){b=l[g];if(b&&b.isChildRecordTransform){b.orphan(a)
}}f=l.get("store");if(f){k=l.storeKey}if(k){f.unloadRecord(undefined,undefined,k)
}},this)}}});sc_require("models/record");sc_require("models/record_attribute");SC.FetchedAttribute=SC.RecordAttribute.extend({paramValueKey:"link",paramOwnerKey:"owner",paramRelKey:"rel",queryKey:null,isEditable:NO,toType:function(d,k,g){var h=d.get("store");
if(!h){return null}var b=this.get("paramValueKey"),a=this.get("paramOwnerKey"),f=this.get("paramRelKey"),e=this.get("queryKey")||this.get("typeClass"),c={};
if(b){c[b]=g}if(a){c[a]=d}if(f){c[f]=this.get("key")||k}return h.findAll(e,c)},fromType:function(a,b,c){return c
}});sc_require("models/record");sc_require("models/record_attribute");SC.ManyAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,orderBy:null,toType:function(b,d,f){var e=this.get("typeClass"),h=this.get("key")||d,g=SC.keyFor("__manyArray__",SC.guidFor(this)),c=b[g],a;
if(!c){c=SC.ManyArray.create({recordType:e,record:b,propertyName:h,manyAttribute:this});
b[g]=c;a=b.get("relationships");if(!a){b.set("relationships",a=[])}a.push(c)}return c
},fromType:function(b,e,f){var c=[];if(!SC.isArray(f)){throw"Expects toMany attribute to be an array"
}var a=f.get("length");for(var d=0;d<a;d++){c[d]=f.objectAt(d).get("id")}return c
},inverseDidRemoveRecord:function(a,b,c,d){var e=a.get(b);if(e){e.removeInverseRecord(c)
}},inverseDidAddRecord:function(a,b,c,d){var e=a.get(b);if(e){e.addInverseRecord(c)
}}});sc_require("models/record");sc_require("models/record_attribute");SC.SingleAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,call:function(c,k,b){var a=this.get("key")||k,h,g,l,f,e,d;
if(b!==undefined&&this.get("isEditable")){if(b&&!SC.kindOf(b,SC.Record)){throw"%@ is not an instance of SC.Record".fmt(b)
}h=this.get("inverse");if(h){l=this._scsa_call(c,k)}d=this.fromType(c,k,b);c.writeAttribute(a,d,!this.get("isMaster"));
e=b;if(h&&(l!==b)){if(l&&(f=l[h])){f.inverseDidRemoveRecord(l,h,c,k)}if(b&&(f=b[h])){f.inverseDidAddRecord(b,h,c,k)
}}}else{e=this._scsa_call(c,k,b)}return e},_scsa_call:SC.RecordAttribute.prototype.call,inverseDidRemoveRecord:function(c,f,g,h){var b=this.get("inverse"),e=this._scsa_call(c,f),d=this.get("isMaster"),a;
c.writeAttribute(f,null,!d);c.notifyPropertyChange(f);if((e!==g)||(h!==b)){if(e&&(a=e[b])){a.inverseDidRemoveRecord(e,b,c,f)
}}},inverseDidAddRecord:function(a,h,c,g){var e=this.get("inverse"),k=this._scsa_call(a,h),f=this.get("isMaster"),d,b;
b=this.fromType(a,h,c);a.writeAttribute(h,b,!f);a.notifyPropertyChange(h);if((k!==c)||(g!==e)){if(k&&(d=k[e])){d.inverseDidRemoveRecord(k,e,a,h)
}}}});SC.ChildArray=SC.Object.extend(SC.Enumerable,SC.Array,{defaultRecordType:null,record:null,propertyName:null,children:null,store:function(){return this.get("record").get("store")
}.property("record").cacheable(),storeKey:function(){return this.get("record").get("storeKey")
}.property("record").cacheable(),readOnlyChildren:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableChildren:function(){var a=this.get("store"),d=this.get("storeKey"),c=this.get("propertyName"),b,e;
b=a.readEditableProperty(d,c);if(!b){e=a.readEditableDataHash(d);b=e[c]=[]}if(b!==this._prevChildren){this.recordPropertyDidChange()
}return b}.property(),length:function(){var a=this.get("readOnlyChildren");return a?a.length:0
}.property("readOnlyChildren"),objectAt:function(b){var e=this._records,d=this.get("readOnlyChildren"),f,c;
var a=d?d.length:0;if(!d){return undefined}if(e&&(c=e[b])){return c}if(!e){this._records=e=[]
}if(b>=a){return undefined}f=d.objectAt(b);if(!f){return undefined}e[b]=c=this._materializeChild(f);
return c},replace:function(l,a,k){var b=this.get("editableChildren"),g=k?(k.get?k.get("length"):k.length):0,f=this.get("record"),d=this.get("propertyName"),h,c;
b.replace(l,a,k);for(var e=l;e<=l+a;e+=1){this.objectAt(e)}f.recordDidChange(d);return this
},normalize:function(){this.forEach(function(b,a){if(b.normalize){b.normalize()}})
},_materializeChild:function(e){var h=this.get("store"),b=this.get("record"),d=this.get("defaultRecordType"),a,f,k,c;
if(!b){return undefined}var g=b.get("childRecordNamespace");if(e.type&&!SC.none(g)){d=g[e.type]
}if(!d||SC.typeOf(d)!==SC.T_CLASS){throw"ChildrenArray: Error during transform: Invalid record type."
}c=d.prototype.primaryKey||"childRecordKey";a=e[c];k=h.storeKeyExists(d,a);if(k){f=h.materializeRecord(k)
}else{f=b.registerChildRecord(d,e)}return f},recordPropertyDidChange:function(d){if(d&&!d.contains(this.get("propertyName"))){return this
}var b=this.get("readOnlyChildren");var c=this._prevChildren,e=this._childrenContentDidChange;
if(b===c){return this}if(c){c.removeObserver("[]",this,e)}this._prevChildren=b;if(b){b.addObserver("[]",this,e)
}var a=(b)?b.propertyRevision:-1;this._childrenContentDidChange(b,"[]",b,a)},_childrenContentDidChange:function(d,b,c,a){this._records=null;
this.enumerableContentDidChange()},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});SC.ManyArray=SC.Object.extend(SC.Enumerable,SC.Array,{recordType:null,record:null,propertyName:null,manyAttribute:null,store:function(){return this.get("record").get("store")
}.property("record").cacheable(),storeKey:function(){return this.get("record").get("storeKey")
}.property("record").cacheable(),readOnlyStoreIds:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableStoreIds:function(){var a=this.get("store"),d=this.get("storeKey"),c=this.get("propertyName"),b,e;
b=a.readEditableProperty(d,c);if(!b){e=a.readEditableDataHash(d);b=e[c]=[]}if(b!==this._prevStoreIds){this.recordPropertyDidChange()
}return b}.property(),isEditable:function(){var a=this.manyAttribute;return a?a.get("isEditable"):NO
}.property("manyAttribute").cacheable(),inverse:function(){var a=this.manyAttribute;
return a?a.get("inverse"):null}.property("manyAttribute").cacheable(),isMaster:function(){var a=this.manyAttribute;
return a?a.get("isMaster"):null}.property("manyAttribute").cacheable(),orderBy:function(){var a=this.manyAttribute;
return a?a.get("orderBy"):null}.property("manyAttribute").cacheable(),length:function(){var a=this.get("readOnlyStoreIds");
return a?a.get("length"):0}.property("readOnlyStoreIds"),objectAt:function(a){var g=this._records,f=this.get("readOnlyStoreIds"),c=this.get("store"),h=this.get("recordType"),e,d,b;
if(!f||!c){return undefined}if(g&&(d=g[a])){return d}if(!g){this._records=g=[]}b=f.objectAt(a);
if(b){e=c.storeKeyFor(h,b);if(c.readStatus(e)===SC.Record.EMPTY){c.retrieveRecord(h,null,e)
}g[a]=d=c.materializeRecord(e)}return d},replace:function(q,d,n){if(!this.get("isEditable")){throw"%@.%@[] is not editable".fmt(this.get("record"),this.get("propertyName"))
}var c=this.get("editableStoreIds"),l=n?(n.get?n.get("length"):n.length):0,h=this.get("record"),e=this.get("propertyName"),g,r,a,b,f,m,k;
a=[];for(g=0;g<l;g++){a[g]=n.objectAt(g).get("id")}f=this.get("inverse");if(f&&d>0){b=SC.ManyArray._toRemove;
if(b){SC.ManyArray._toRemove=null}else{b=[]}for(g=0;g<d;g++){b[g]=this.objectAt(q+g)
}}c.replace(q,d,a);if(f){for(g=0;g<d;g++){k=b[g];m=k?k[f]:null;if(m&&m.inverseDidRemoveRecord){m.inverseDidRemoveRecord(k,f,h,e)
}}if(b){b.length=0;if(!SC.ManyArray._toRemove){SC.ManyArray._toRemove=b}}for(g=0;
g<l;g++){k=n.objectAt(g);m=k?k[f]:null;if(m&&m.inverseDidAddRecord){m.inverseDidAddRecord(k,f,h,e)
}}}if(h&&(!f||this.get("isMaster"))){h.recordDidChange(e)}return this},removeInverseRecord:function(c){if(!c){return this
}var e=c.get("id"),d=this.get("editableStoreIds"),a=(d&&e)?d.indexOf(e):-1,b;if(a>=0){d.removeAt(a);
if(this.get("isMaster")&&(b=this.get("record"))){b.recordDidChange(this.get("propertyName"))
}}return this},addInverseRecord:function(d){if(!d){return this}var g=d.get("id"),e=this.get("editableStoreIds"),f=this.get("orderBy"),b=e.get("length"),a,c;
if(f){a=this._findInsertionLocation(d,0,b,f)}else{a=b}e.insertAt(a,d.get("id"));if(this.get("isMaster")&&(c=this.get("record"))){c.recordDidChange(this.get("propertyName"))
}return this},_findInsertionLocation:function(g,d,c,f){var b=d+Math.floor((c-d)/2),e=this.objectAt(b),a=this._compare(g,e,f);
if(a<0){if(b===0){return b}else{return this._findInsertionLocation(g,0,b,f)}}else{if(a>0){if(b>=c){return b
}else{return this._findInsertionLocation(g,b,c,f)}}else{return b}}},_compare:function(f,e,k){var h=SC.typeOf(k),g,d,c;
if(h===SC.T_FUNCTION){g=k(f,e)}else{if(h===SC.T_STRING){g=SC.compare(f,e)}else{c=k.get("length");
g=0;for(d=0;(g===0)&&(d<c);d++){g=SC.compare(f,e)}}}return g},recordPropertyDidChange:function(c){if(c&&!c.contains(this.get("propertyName"))){return this
}var e=this.get("readOnlyStoreIds");var b=this._prevStoreIds,d=this._storeIdsContentDidChange;
if(e===b){return this}if(b){b.removeObserver("[]",this,d)}this._prevStoreIds=e;if(e){e.addObserver("[]",this,d)
}var a=(e)?e.propertyRevision:-1;this._storeIdsContentDidChange(e,"[]",e,a)},_storeIdsContentDidChange:function(d,b,c,a){this._records=null;
this.enumerableContentDidChange()},unknownProperty:function(b,c){var a=this.reducedProperty(b,c);
return a===undefined?arguments.callee.base.apply(this,arguments):a},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});sc_require("models/record");SC.Store=SC.Object.extend({name:null,nestedStores:null,dataSource:null,isNested:NO,commitRecordsAutomatically:NO,from:function(a){this.set("dataSource",a);
return this},_getDataSource:function(){var a=this.get("dataSource");if(typeof a===SC.T_STRING){a=SC.objectForPropertyPath(a);
if(a){a=a.create()}if(a){this.set("dataSource",a)}}return a},cascade:function(a){var b=SC.A(arguments);
a=SC.CascadeDataSource.create({dataSources:b});return this.from(a)},chain:function(b,c){if(!b){b={}
}b.parentStore=this;if(c){if(SC.typeOf(c)!=="class"){throw new Error("%@ is not a valid class".fmt(c))
}if(!SC.kindOf(c,SC.NestedStore)){throw new Error("%@ is not a type of SC.NestedStore".fmt(c))
}}else{c=SC.NestedStore}var a=c.create(b),d=this.nestedStores;if(!d){d=this.nestedStores=[]
}d.push(a);return a},willDestroyNestedStore:function(a){if(this.nestedStores){this.nestedStores.removeObject(a)
}return this},hasNestedStore:function(a){while(a&&(a!==this)){a=a.get("parentStore")
}return a===this},dataHashes:null,statuses:null,revisions:null,editables:null,changelog:null,recordArraysWithQuery:null,recordErrors:null,queryErrors:null,storeKeyEditState:function(b){var c=this.editables,a=this.locks;
return(c&&c[b])?SC.Store.EDITABLE:SC.Store.LOCKED},readDataHash:function(a){return this.dataHashes[a]
},readEditableDataHash:function(b){var a=this.dataHashes[b];if(!a){return a}var c=this.editables;
if(!c){c=this.editables=[]}if(!c[b]){c[b]=1;a=this.dataHashes[b]=SC.clone(a,YES)}return a
},readEditableProperty:function(c,a){var e=this.readEditableDataHash(c),d=this.editables[c],b=e[a];
if(d===1){d=this.editables[c]={}}if(!d[a]){b=e[a];if(b&&b.isCopyable){b=e[a]=b.copy()
}d[a]=YES}return b},writeDataHash:function(b,d,a){if(d){this.dataHashes[b]=d}if(a){this.statuses[b]=a
}var c=this.editables;if(!c){c=this.editables=[]}c[b]=1;return this},removeDataHash:function(b,a){this.dataHashes[b]=null;
this.statuses[b]=a||SC.Record.EMPTY;var c=this.editables;if(c){c[b]=0}return this
},readStatus:function(a){this.readDataHash(a);return this.statuses[a]||SC.Record.EMPTY
},peekStatus:function(a){return this.statuses[a]||SC.Record.EMPTY},writeStatus:function(b,a){return this.writeDataHash(b,null,a)
},dataHashDidChange:function(h,d,e,f){if(!d){d=SC.Store.generateStoreKey()}var c,b,a,g;
c=SC.typeOf(h)===SC.T_ARRAY;if(c){b=h.length}else{b=1;g=h}for(a=0;a<b;a++){if(c){g=h[a]
}this.revisions[g]=d;this._notifyRecordPropertyChange(g,e,f)}return this},_notifyRecordPropertyChange:function(q,e,n){var a=this.records,g=this.get("nestedStores"),h=SC.Store,c,b,f,m,l,d,r;
f=g?g.length:0;for(m=0;m<f;m++){l=g[m];d=l.peekStatus(q);b=l.storeKeyEditState(q);
if(b===h.INHERITED){l._notifyRecordPropertyChange(q,e,n)}else{if(d&SC.Record.BUSY){if(l.get("hasChanges")){throw h.CHAIN_CONFLICT_ERROR
}l.reset()}}}var k=this.recordPropertyChanges;if(!k){k=this.recordPropertyChanges={storeKeys:SC.CoreSet.create(),records:SC.CoreSet.create(),hasDataChanges:SC.CoreSet.create(),propertyForStoreKeys:{}}
}k.storeKeys.add(q);if(a&&(c=a[q])){k.records.push(q);if(!e){k.hasDataChanges.push(q)
}if(n){if(!(r=k.propertyForStoreKeys[q])){r=k.propertyForStoreKeys[q]=SC.CoreSet.create()
}if(r!=="*"){r.add(n)}}else{k.propertyForStoreKeys[q]="*"}}this.invokeOnce(this.flush);
return this},flush:function(){if(!this.recordPropertyChanges){return this}var k=this.recordPropertyChanges,h=k.storeKeys,n=k.hasDataChanges,a=k.records,f=k.propertyForStoreKeys,d=SC.CoreSet.create(),c,b,e,l,g,m,q;
h.forEach(function(r){if(a.contains(r)){e=n.contains(r)?NO:YES;c=this.records[r];
q=f?f[r]:null;if(q==="*"){q=null}a.remove(r);if(c){c.storeDidChangeProperties(e,q)
}}b=SC.Store.recordTypeFor(r);d.add(b)},this);if(h.get("length")>0){this._notifyRecordArrays(h,d)
}h.clear();n.clear();a.clear();this.recordPropertyChanges.propertyForStoreKeys={};
return this},reset:function(){this.dataHashes={};this.revisions={};this.statuses={};
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.recordErrors=null;
this.queryErrors=null;var a=this.records,b;if(a){for(b in a){if(!a.hasOwnProperty(b)){continue
}this._notifyRecordPropertyChange(parseInt(b,10),NO)}}this.set("hasChanges",NO)},commitChangesFromNestedStore:function(l,m,c){if(!c){this._verifyLockRevisions(m,l.locks)
}var g=m.length,e,r,f,a,q,b,d,n,k;b=this.revisions;f=this.dataHashes;a=this.statuses;
q=this.editables;if(!q){q=this.editables=[]}d=l.dataHashes;k=l.revisions;n=l.statuses;
for(e=0;e<g;e++){r=m[e];f[r]=d[r];a[r]=n[r];b[r]=k[r];q[r]=0;this._notifyRecordPropertyChange(r,NO)
}var s=this.changelog,h=l.changelog;if(h){if(!s){s=this.changelog=SC.CoreSet.create()
}s.addEach(h)}this.changelog=s;if(!this.get("parentStore")){this.flush()}return this
},_verifyLockRevisions:function(f,h){var a=f.length,c=this.revisions,e,g,d,b;if(h&&c){for(e=0;
e<a;e++){g=f[e];d=h[g]||1;b=c[g]||1;if(d<b){throw SC.Store.CHAIN_CONFLICT_ERROR}}}return this
},find:function(b,a){if(SC.typeOf(b)===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if((arguments.length===1)&&!(b&&b.get&&b.get("isRecord"))){if(!b){throw new Error("SC.Store#find() must pass recordType or query")
}if(!b.isQuery){b=SC.Query.local(b)}return this._findQuery(b,YES,YES)}else{return this._findRecord(b,a)
}},findAll:function(c,a,b){console.warn("SC.Store#findAll() will be removed in a future version of SproutCore.  Use SC.Store#find() instead");
if(!c||!c.isQuery){c=SC.Query.local(c,a,b)}return this._findQuery(c,YES,YES)},_findQuery:function(f,a,e){var b=this._scst_recordArraysByQuery,d=SC.guidFor(f),c,g;
if(!b){b=this._scst_recordArraysByQuery={}}c=b[d];if(!c&&a){b[d]=c=SC.RecordArray.create({store:this,query:f});
g=this.get("recordArrays");if(!g){this.set("recordArrays",g=SC.Set.create())}g.add(c);
if(e){this.refreshQuery(f)}}this.flush();return c},_findRecord:function(c,b){var a;
if(c&&c.get&&c.get("isRecord")){a=c.get("storeKey")}else{a=b?c.storeKeyFor(b):null
}if(a&&(this.readStatus(a)===SC.Record.EMPTY)){a=this.retrieveRecord(c,b)}return a?this.materializeRecord(a):null
},recordArrayWillDestroy:function(b){var a=this._scst_recordArraysByQuery,c=this.get("recordArrays");
if(a){delete a[SC.guidFor(b.get("query"))]}if(c){c.remove(b)}return this},refreshQuery:function(d){if(!d){throw new Error("refreshQuery() requires a query")
}var a=this._scst_recordArraysByQuery,c=a?a[SC.guidFor(d)]:null,b=this._getDataSource();
if(b&&b.fetch){if(c){c.storeWillFetchQuery(d)}b.fetch.call(b,this,d)}return this},_notifyRecordArrays:function(b,a){var c=this.get("recordArrays");
if(!c){return this}c.forEach(function(d){if(d){d.storeDidChangeStoreKeys(b,a)}},this);
return this},recordsFor:function(f){var d=[],a=f.storeKeysById(),e,c,b;for(e in a){c=a[e];
if(this.readStatus(c)!==SC.RECORD_EMPTY){d.push(c)}}if(d.length>0){b=SC.RecordArray.create({store:this,storeKeys:d})
}else{b=d}return b},_TMP_REC_ATTRS:{},materializeRecord:function(d){var a=this.records,c,e,b;
if(!a){a=this.records={}}c=a[d];if(c){return c}e=SC.Store.recordTypeFor(d);if(!e){return null
}b=this._TMP_REC_ATTRS;b.storeKey=d;b.store=this;c=a[d]=e.create(b);return c},createRecord:function(b,d,a){var k,l,c,h=SC.Record,e,g,f;
if(!a&&(k=b.prototype.primaryKey)){a=d[k];g=b.prototype[k]?b.prototype[k].defaultValue:null;
if(!a&&SC.typeOf(g)===SC.T_FUNCTION){a=d[k]=g()}}l=a?b.storeKeyFor(a):SC.Store.generateStoreKey();
c=this.readStatus(l);if((c&h.BUSY)||(c&h.READY)||(c==h.DESTROYED_DIRTY)){throw a?h.RECORD_EXISTS_ERROR:h.BAD_STATE_ERROR
}else{if(!a&&(c==SC.DESTROYED_CLEAN||c==SC.ERROR)){throw h.BAD_STATE_ERROR}}this.writeDataHash(l,(d?d:{}),h.READY_NEW);
SC.Store.replaceRecordTypeFor(l,b);this.dataHashDidChange(l);e=this.changelog;if(!e){e=SC.Set.create()
}e.add(l);this.changelog=e;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}f=this.materializeRecord(l);if(f){f.propagateToAggregates()}return f},createRecords:function(d,k,a){var g=[],c,b,e,f=k.length,h;
e=SC.typeOf(d)===SC.T_ARRAY;if(!e){c=d}for(h=0;h<f;h++){if(e){c=d[h]||SC.Record}b=a?a[h]:undefined;
g.push(this.createRecord(c,k[h],b))}return g},unloadRecord:function(f,e,d,c){if(d===undefined){d=f.storeKeyFor(e)
}var b=this.readStatus(d),a=SC.Record;c=c||a.EMPTY;if((b===a.BUSY_DESTROYING)||(b&a.DESTROYED)){return this
}else{if(b&a.BUSY){throw a.BUSY_ERROR}else{b=c}}this.removeDataHash(d,b);this.dataHashDidChange(d);
return this},unloadRecords:function(d,a,g,e){var h,f,k,b,c,l;if(g===undefined){h=a.length;
f=SC.typeOf(d)===SC.T_ARRAY;if(!f){c=d}for(k=0;k<h;k++){if(f){c=d[k]||SC.Record}b=a?a[k]:undefined;
this.unloadRecord(c,b,undefined,e)}}else{h=g.length;for(k=0;k<h;k++){l=g?g[k]:undefined;
this.unloadRecord(undefined,undefined,l,e)}}return this},destroyRecord:function(f,e,d){if(d===undefined){d=f.storeKeyFor(e)
}var b=this.readStatus(d),c,a=SC.Record;if((b===a.BUSY_DESTROYING)||(b&a.DESTROYED)){return this
}else{if(b==a.EMPTY){throw a.NOT_FOUND_ERROR}else{if(b&a.BUSY){throw a.BUSY_ERROR
}else{if(b==a.READY_NEW){b=a.DESTROYED_CLEAN}else{b=a.DESTROYED_DIRTY}}}}this.writeStatus(d,b);
this.dataHashDidChange(d);c=this.changelog;if(!c){c=this.changelog=SC.Set.create()
}((b&a.DIRTY)?c.add(d):c.remove(d));this.changelog=c;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}return this},destroyRecords:function(d,a,f){var g,e,h,b,c,k;if(f===undefined){g=a.length;
e=SC.typeOf(d)===SC.T_ARRAY;if(!e){c=d}for(h=0;h<g;h++){if(e){c=d[h]||SC.Record}b=a?a[h]:undefined;
this.destroyRecord(c,b,undefined)}}else{g=f.length;for(h=0;h<g;h++){k=f?f[h]:undefined;
this.destroyRecord(undefined,undefined,k)}}return this},recordDidChange:function(h,g,f,d,c){if(f===undefined){f=h.storeKeyFor(g)
}var b=this.readStatus(f),e,a=SC.Record;if(b&a.BUSY){throw a.BUSY_ERROR}else{if(!(b&a.READY)){throw a.NOT_FOUND_ERROR
}else{if(b!=a.READY_NEW){this.writeStatus(f,a.READY_DIRTY)}}}this.dataHashDidChange(f,null,c,d);
e=this.changelog;if(!e){e=this.changelog=SC.Set.create()}e.add(f);this.changelog=e;
if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)}return this
},recordsDidChange:function(d,a,f){var g,e,h,b,c,k;if(f===undefined){g=a.length;e=SC.typeOf(d)===SC.T_ARRAY;
if(!e){c=d}for(h=0;h<g;h++){if(e){c=d[h]||SC.Record}b=a?a[h]:undefined;k=f?f[h]:undefined;
this.recordDidChange(c,b,k)}}else{g=f.length;for(h=0;h<g;h++){k=f?f[h]:undefined;
this.recordDidChange(undefined,undefined,k)}}return this},retrieveRecords:function(f,b,k,c){var a=this._getDataSource(),h=SC.typeOf(f)===SC.T_ARRAY,l=(!k)?b.length:k.length,m=[],g=SC.Store.generateStoreKey(),q=SC.Record,d,r,s,e,n;
if(!h){d=f}for(r=0;r<l;r++){if(k){s=k[r]}else{if(h){d=f[r]}s=d.storeKeyFor(b[r])}e=this.readStatus(s);
if((e==q.EMPTY)||(e==q.ERROR)||(e==q.DESTROYED_CLEAN)){this.writeStatus(s,q.BUSY_LOADING);
this.dataHashDidChange(s,g,YES);m.push(s)}else{if(c){if(e&q.READY){this.writeStatus(s,q.BUSY_REFRESH|(e&3));
this.dataHashDidChange(s,g,YES);m.push(s)}else{if((e==q.BUSY_DESTROYING)||(e==q.BUSY_CREATING)||(e==q.BUSY_COMMITTING)){throw q.BUSY_ERROR
}else{if(e==q.DESTROYED_DIRTY){throw q.BAD_STATE_ERROR}}}}}}n=NO;if(a){n=a.retrieveRecords.call(a,this,m,b)
}if(!n){l=m.length;g=SC.Store.generateStoreKey();for(r=0;r<l;r++){s=m[r];e=this.readStatus(s);
if(e===q.BUSY_LOADING){this.writeStatus(s,q.ERROR);this.dataHashDidChange(s,g,YES)
}else{if(e&q.BUSY_REFRESH){this.writeStatus(s,q.READY|(e&3));this.dataHashDidChange(s,g,YES)
}}}m.length=0}return m},_TMP_RETRIEVE_ARRAY:[],retrieveRecord:function(f,e,b,c){var d=this._TMP_RETRIEVE_ARRAY,a;
if(b){d[0]=b;b=d;e=null}else{d[0]=e;e=d}a=this.retrieveRecords(f,e,b,c);d.length=0;
return a[0]},refreshRecord:function(c,b,a){return !!this.retrieveRecord(c,b,a,YES)
},refreshRecords:function(b,c,d){var a=this.retrieveRecords(b,c,d,YES);return a&&a.length>0
},commitRecords:function(e,n,b,s){var m=this._getDataSource(),g=SC.typeOf(e)===SC.T_ARRAY,c=[],k=[],l=[],u=SC.Store.generateStoreKey(),f=SC.Record,a,h,d,q,w,v,r;
if(!e&&!n&&!b){b=this.changelog}r=b?b.get("length"):(n?n.get("length"):0);for(h=0;
h<r;h++){if(b){d=b[h]}else{if(g){a=e[h]||SC.Record}else{a=e}d=a.storeKeyFor(n[h])
}q=this.readStatus(d);if((q==f.EMPTY)||(q==f.ERROR)){throw f.NOT_FOUND_ERROR}else{if(q==f.READY_NEW){this.writeStatus(d,f.BUSY_CREATING);
this.dataHashDidChange(d,u,YES);c.push(d)}else{if(q==f.READY_DIRTY){this.writeStatus(d,f.BUSY_COMMITTING);
this.dataHashDidChange(d,u,YES);k.push(d)}else{if(q==f.DESTROYED_DIRTY){this.writeStatus(d,f.BUSY_DESTROYING);
this.dataHashDidChange(d,u,YES);l.push(d)}else{if(q==f.DESTROYED_CLEAN){this.dataHashDidChange(d,u,YES)
}}}}}}if(m&&(r>0||s)){v=m.commitRecords.call(m,this,c,k,l,s)}if(v&&!e&&!n){if(b===this.changelog){this.changelog=null
}else{this.changelog.removeEach(b)}}return v},commitRecord:function(f,e,b,c){var d=this._TMP_RETRIEVE_ARRAY,a;
if(e===undefined&&b===undefined){return NO}if(b!==undefined){d[0]=b;b=d;e=null}else{d[0]=e;
e=d}a=this.commitRecords(f,e,b,c);d.length=0;return a},cancelRecords:function(e,b,k){var a=this._getDataSource(),g=SC.typeOf(e)===SC.T_ARRAY,m=SC.Record,l=[],f,h,n,c,d,q;
h=(k===undefined)?b.length:k.length;for(n=0;n<h;n++){if(g){d=e[n]||SC.Record}else{d=e||SC.Record
}c=b?b[n]:undefined;if(k===undefined){q=d.storeKeyFor(c)}else{q=k?k[n]:undefined}if(q){f=this.readStatus(q);
if((f==m.EMPTY)||(f==m.ERROR)){throw m.NOT_FOUND_ERROR}l.push(q)}}if(a){a.cancel.call(a,this,l)
}return this},cancelRecord:function(e,d,b){var c=this._TMP_RETRIEVE_ARRAY,a;if(b!==undefined){c[0]=b;
b=c;d=null}else{c[0]=d;d=c}a=this.cancelRecords(e,d,b);c.length=0;return this},loadRecord:function(g,d,f){var a=SC.Record,c,b,e;
g=g||SC.Record;b=g.prototype.primaryKey;f=f||d[b];c=e=g.storeKeyFor(f);if(this.readStatus(e)&a.BUSY){this.dataSourceDidComplete(e,d,f)
}else{this.pushRetrieve(g,f,d,e)}return c},loadRecords:function(d,q,a){var f=SC.typeOf(d)===SC.T_ARRAY,g=q.get("length"),h=[],k=SC.Record,c,b,m,l,e,n;
if(!f){c=d||SC.Record;m=c.prototype.primaryKey}for(l=0;l<g;l++){e=q.objectAt(l);if(f){c=d.objectAt(l)||SC.Record;
m=c.prototype.primaryKey}b=(a)?a.objectAt(l):e[m];h[l]=this.loadRecord(c,e,b)}return h
},readError:function(a){var b=this.recordErrors;return b?b[a]:undefined},readQueryError:function(a){var b=this.queryErrors;
return b?b[SC.guidFor(a)]:undefined},dataSourceDidCancel:function(c){var b=this.readStatus(c),a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}switch(b){case a.BUSY_LOADING:b=a.EMPTY;break;
case a.BUSY_CREATING:b=a.READY_NEW;break;case a.BUSY_COMMITTING:b=a.READY_DIRTY;break;
case a.BUSY_REFRESH_CLEAN:b=a.READY_CLEAN;break;case a.BUSY_REFRESH_DIRTY:b=a.READY_DIRTY;
break;case a.BUSY_DESTROYING:b=a.DESTROYED_DIRTY;break;default:throw a.BAD_STATE_ERROR
}this.writeStatus(c,b);this.dataHashDidChange(c,null,YES);return this},dataSourceDidComplete:function(f,e,d){var b=this.readStatus(f),a=SC.Record,c;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}if(b===a.BUSY_DESTROYING){throw a.BAD_STATE_ERROR
}else{b=a.READY_CLEAN}this.writeStatus(f,b);if(e){this.writeDataHash(f,e,b)}if(d){SC.Store.replaceIdFor(f,d)
}c=e||d?NO:YES;this.dataHashDidChange(f,null,c);return this},dataSourceDidDestroy:function(c){var b=this.readStatus(c),a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}else{b=a.DESTROYED_CLEAN}this.removeDataHash(c,b);
this.dataHashDidChange(c);return this},dataSourceDidError:function(d,c){var b=this.readStatus(d),e=this.recordErrors,a=SC.Record;
if(!(b&a.BUSY)){throw a.BAD_STATE_ERROR}else{b=a.ERROR}if(c&&c.isError){if(!e){e=this.recordErrors=[]
}e[d]=c}this.writeStatus(d,b);this.dataHashDidChange(d,null,YES);return this},pushRetrieve:function(f,e,c,d){var b=SC.Record,a;
if(d===undefined){d=f.storeKeyFor(e)}a=this.readStatus(d);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.READY_CLEAN;
if(c===undefined){this.writeStatus(d,a)}else{this.writeDataHash(d,c,a)}this.dataHashDidChange(d);
return d}return NO},pushDestroy:function(e,d,c){var b=SC.Record,a;if(c===undefined){c=e.storeKeyFor(d)
}a=this.readStatus(c);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.DESTROYED_CLEAN;
this.removeDataHash(c,a);this.dataHashDidChange(c);return c}return NO},pushError:function(g,f,c,d){var b=SC.Record,a,e=this.recordErrors;
if(d===undefined){d=g.storeKeyFor(f)}a=this.readStatus(d);if(a==b.EMPTY||a==b.ERROR||a==b.READY_CLEAN||a==b.DESTROYED_CLEAN){a=b.ERROR;
if(c&&c.isError){if(!e){e=this.recordErrors=[]}e[d]=c}this.writeStatus(d,a);this.dataHashDidChange(d,null,YES);
return d}return NO},loadQueryResults:function(c,a){if(c.get("location")===SC.Query.LOCAL){throw new Error("Cannot load query results for a local query")
}var b=this._findQuery(c,YES,NO);if(b){b.set("storeKeys",a)}this.dataSourceDidFetchQuery(c);
return this},dataSourceDidFetchQuery:function(a){return this._scstore_dataSourceDidFetchQuery(a,YES)
},_scstore_dataSourceDidFetchQuery:function(d,a){var c=this._findQuery(d,a,NO),b=this.get("nestedStores"),e=b?b.get("length"):0;
if(c){c.storeDidFetchQuery(d)}while(--e>=0){b[e]._scstore_dataSourceDidFetchQuery(d,NO)
}return this},dataSourceDidCancelQuery:function(a){return this._scstore_dataSourceDidCancelQuery(a,YES)
},_scstore_dataSourceDidCancelQuery:function(d,a){var c=this._findQuery(d,a,NO),b=this.get("nestedStores"),e=b?b.get("length"):0;
if(c){c.storeDidCancelQuery(d)}while(--e>=0){b[e]._scstore_dataSourceDidCancelQuery(d,NO)
}return this},dataSourceDidErrorQuery:function(b,a){var c=this.queryErrors;if(a&&a.isError){if(!c){c=this.queryErrors={}
}c[SC.guidFor(b)]=a}return this._scstore_dataSourceDidErrorQuery(b,YES)},_scstore_dataSourceDidErrorQuery:function(d,a){var c=this._findQuery(d,a,NO),b=this.get("nestedStores"),e=b?b.get("length"):0;
if(c){c.storeDidErrorQuery(d)}while(--e>=0){b[e]._scstore_dataSourceDidErrorQuery(d,NO)
}return this},init:function(){arguments.callee.base.apply(this,arguments);this.reset()
},toString:function(){var b=this.get("name");if(!b){return arguments.callee.base.apply(this,arguments)
}else{var a=arguments.callee.base.apply(this,arguments);return"%@ (%@)".fmt(b,a)}},idFor:function(a){return SC.Store.idFor(a)
},recordTypeFor:function(a){return SC.Store.recordTypeFor(a)},storeKeyFor:function(b,a){return b.storeKeyFor(a)
},storeKeyExists:function(b,a){return b.storeKeyExists(a)},storeKeysFor:function(f){var a=[],e=f&&f.isEnumerable,c,d,b;
if(!this.statuses){return a}for(d in SC.Store.recordTypesByStoreKey){c=SC.Store.recordTypesByStoreKey[d];
if(e){b=f.contains(c)}else{b=c===f}if(b&&this.statuses[d]){a.push(parseInt(d,10))
}}return a},storeKeys:function(){var a=[],b;if(!this.statuses){return a}for(b in this.statuses){if(this.statuses[b]!=SC.Record.EMPTY){a.push(parseInt(b,10))
}}return a},statusString:function(a){var b=this.materializeRecord(a);return b.statusString()
}});SC.Store.mixin({CHAIN_CONFLICT_ERROR:new Error("Nested Store Conflict"),NO_PARENT_STORE_ERROR:new Error("Parent Store Required"),NESTED_STORE_UNSUPPORTED_ERROR:new Error("Unsupported In Nested Store"),NESTED_STORE_RETRIEVE_DIRTY_ERROR:new Error("Cannot Retrieve Dirty Record in Nested Store"),EDITABLE:"editable",LOCKED:"locked",INHERITED:"inherited",idsByStoreKey:[],recordTypesByStoreKey:{},queriesByStoreKey:[],nextStoreKey:1,generateStoreKey:function(){return this.nextStoreKey++
},idFor:function(a){return this.idsByStoreKey[a]},queryFor:function(a){return this.queriesByStoreKey[a]
},recordTypeFor:function(a){return this.recordTypesByStoreKey[a]},replaceIdFor:function(c,a){var d=this.idsByStoreKey[c],e,b;
if(d!==a){e=this.recordTypeFor(c);if(!e){throw new Error("replaceIdFor: storeKey %@ does not exist".fmt(c))
}this.idsByStoreKey[c]=a;b=e.storeKeysById();delete b[d];b[a]=c}return this},replaceRecordTypeFor:function(a,b){this.recordTypesByStoreKey[a]=b;
return this}});SC.Store.prototype.nextStoreIndex=1;SC.Store._getDefaultStore=function(){var a=this._store;
if(!a){this._store=a=SC.Store.create()}return a};SC.Store.updateRecords=function(f,g,h,c){console.warn("SC.Store.updateRecords() is deprecated.  Use loadRecords() instead");
var d=this._getDefaultStore(),b=f.length,a,e;if(!h){h=[];for(a=0;a<b;a++){h[a]=f[a].recordType
}}e=d.loadRecords(h,f);b=e.length;for(a=0;a<b;a++){e[a]=d.materializeRecord(e[a])
}return e};SC.Store.find=function(a,b){return this._getDefaultStore().find(b,a)};
SC.Store.findAll=function(a,b){return this._getDefaultStore().findAll(a,b)};sc_require("system/store");
SC.NestedStore=SC.Store.extend({hasChanges:NO,parentStore:null,isNested:YES,lockOnRead:YES,locks:null,chainedChanges:null,find:function(a){if(a&&a.isQuery&&a.get("location")!==SC.Query.LOCAL){throw"SC.Store#find() can only accept LOCAL queries in nested stores"
}return arguments.callee.base.apply(this,arguments)},commitChanges:function(b){if(this.get("hasChanges")){var a=this.get("parentStore");
a.commitChangesFromNestedStore(this,this.chainedChanges,b)}this.reset();return this
},discardChanges:function(){var c,f;if((c=this.records)&&(f=this.locks)){var b=this.get("parentStore"),h=b.revisions;
var g=this.revisions,e,d,a;for(e in c){if(!c.hasOwnProperty(e)){continue}if(!(d=f[e])){continue
}a=h[e];if((a!==d)||(g[e]>a)){this._notifyRecordPropertyChange(parseInt(e,10))}}}this.reset();
this.flush();return this},destroy:function(){this.discardChanges();var a=this.get("parentStore");
if(a){a.willDestroyNestedStore(this)}arguments.callee.base.apply(this,arguments);
return this},reset:function(){var a=this.get("parentStore");if(!a){throw SC.Store.NO_PARENT_STORE_ERROR
}this.dataHashes=SC.beget(a.dataHashes);this.revisions=SC.beget(a.revisions);this.statuses=SC.beget(a.statuses);
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.set("hasChanges",NO)
},refreshQuery:function(b){var a=this.get("parentStore");if(a){a.refreshQuery(b)}return this
},readError:function(b){var a=this.get("parentStore");return a?a.readError(b):null
},readQueryError:function(b){var a=this.get("parentStore");return a?a.readQueryError(b):null
},storeKeyEditState:function(b){var c=this.editables,a=this.locks;return(c&&c[b])?SC.Store.EDITABLE:(a&&a[b])?SC.Store.LOCKED:SC.Store.INHERITED
},_lock:function(e){var d=this.locks,a,f;if(d&&d[e]){return this}if(!d){d=this.locks=[]
}f=this.editables;if(f){f[e]=0}var c=this.get("parentStore"),b;while(c&&(b=c.storeKeyEditState(e))===SC.Store.INHERITED){c=c.get("parentStore")
}if(c&&b===SC.Store.EDITABLE){this.dataHashes[e]=SC.clone(c.dataHashes[e],YES);if(!f){f=this.editables=[]
}f[e]=1}else{this.dataHashes[e]=this.dataHashes[e]}this.statuses[e]=this.statuses[e];
a=this.revisions[e]=this.revisions[e];d[e]=a||1;return this},readDataHash:function(a){if(this.get("lockOnRead")){this._lock(a)
}return this.dataHashes[a]},readEditableDataHash:function(a){this._lock(a);return arguments.callee.base.apply(this,arguments)
},writeDataHash:function(d,f,b){var c=this.locks,g=NO,a;if(f){this.dataHashes[d]=f
}else{this._lock(d);g=YES}if(b){this.statuses[d]=b}else{if(!g){this.statuses[d]=(this.statuses[d]||SC.Record.READY_NEW)
}}if(!g){a=this.revisions[d]=this.revisions[d];if(!c){c=this.locks=[]}if(!c[d]){c[d]=a||1
}}var e=this.editables;if(!e){e=this.editables=[]}e[d]=1;return this},removeDataHash:function(c,a){var b=this.locks;
if(!b){b=this.locks=[]}if(!b[c]){b[c]=this.revisions[c]||1}return arguments.callee.base.apply(this,arguments)
},dataHashDidChange:function(d,b,a,h){if(!b){b=SC.Store.generateStoreKey()}var c,e,g,k;
c=SC.typeOf(d)===SC.T_ARRAY;if(c){e=d.length}else{e=1;k=d}var f=this.chainedChanges;
if(!f){f=this.chainedChanges=SC.Set.create()}for(g=0;g<e;g++){if(c){k=d[g]}this._lock(k);
this.revisions[k]=b;f.add(k);this._notifyRecordPropertyChange(k,a,h)}this.setIfChanged("hasChanges",YES);
return this},commitChangesFromNestedStore:function(e,f,a){arguments.callee.base.apply(this,arguments);
var b=this.get("parentStore"),h=b.revisions,c;var l=this.locks,g=this.chainedChanges,d,k;
if(!l){l=this.locks=[]}if(!g){g=this.chainedChanges=SC.Set.create()}d=f.length;for(c=0;
c<d;c++){k=f[c];if(!l[k]){l[k]=h[k]||1}g.add(k)}this.setIfChanged("hasChanges",g.get("length")>0);
this.flush();return this},queryFor:function(c,a,b){return this.get("parentStore").queryFor(c,a,b)
},findAll:function(e,b,d,c,a){if(!a){a=this}return this.get("parentStore").findAll(e,b,d,c,a)
},retrieveRecords:function(f,q,b,c){var a=this.get("parentStore"),m,d,u,s=(!b)?q.length:b.length,k=SC.Record,r;
if(c){for(m=0;m<s;m++){d=!b?a.storeKeyFor(f,q[m]):b[m];r=this.peekStatus(d);if(r&k.DIRTY){throw SC.Store.NESTED_STORE_RETRIEVE_DIRTY_ERROR
}else{var g=this.dataHashes,l=this.revisions,h=this.statuses,n=this.editables,w=this.locks;
var e=NO;var v=NO;if(g&&g.hasOwnProperty(d)){delete g[d];e=YES}if(l&&l.hasOwnProperty(d)){delete l[d];
e=YES}if(n){delete n[d]}if(w){delete w[d]}if(h&&h.hasOwnProperty(d)){delete h[d];
if(!e){v=YES}e=YES}if(e){this._notifyRecordPropertyChange(d,v)}}}}return a.retrieveRecords(f,q,b,c)
},commitRecords:function(a,b,c){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},commitRecord:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},cancelRecords:function(a,b,c){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},cancelRecord:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidCancel:function(a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},dataSourceDidComplete:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidDestroy:function(a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},dataSourceDidError:function(b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushRetrieve:function(d,c,a,b){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR},pushDestroy:function(c,b,a){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushError:function(d,c,a,b){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR}});sc_require("models/record");
SC.RecordArray=SC.Object.extend(SC.Enumerable,SC.Array,{store:null,query:null,storeKeys:null,status:SC.Record.EMPTY,isEditable:function(){var a=this.get("query");
return a?a.get("isEditable"):NO}.property("query").cacheable(),length:function(){this.flush();
var a=this.get("storeKeys");return a?a.get("length"):0}.property("storeKeys").cacheable(),_scra_records:null,objectAt:function(a){this.flush();
var f=this._scra_records,e=this.get("storeKeys"),b=this.get("store"),d,c;if(!e||!b){return undefined
}if(f&&(c=f[a])){return c}if(!f){this._scra_records=f=[]}d=e.objectAt(a);if(d){if(b.peekStatus(d)===SC.Record.EMPTY){b.retrieveRecord(null,null,d)
}f[a]=c=b.materializeRecord(d)}return c},forEach:function(h,d){this.flush();var e=this._scra_records,b=this.get("storeKeys"),f=this.get("store"),c=b?b.get("length"):0,g,k,a;
if(!b||!f){return this}if(!e){e=this._scra_records=[]}if(!d){d=this}for(g=0;g<c;g++){a=e[g];
if(!a){a=e[g]=f.materializeRecord(b.objectAt(g))}h.call(d,a,g,this)}return this},replace:function(b,h,g){this.flush();
var e=this.get("storeKeys"),a=g?(g.get?g.get("length"):g.length):0,c,d;if(!e){throw"storeKeys required"
}var f=this.get("query");if(f&&!f.get("isEditable")){throw SC.RecordArray.NOT_EDITABLE
}d=[];for(c=0;c<a;c++){d[c]=g.objectAt(c).get("storeKey")}e.replace(b,h,d);return this
},contains:function(a){return this.indexOf(a)>=0},indexOf:function(b,a){if(!SC.kindOf(b,SC.Record)){SC.Logger.warn("Using indexOf on %@ with an object that is not an SC.Record".fmt(b));
return -1}this.flush();var d=b.get("storeKey"),c=this.get("storeKeys");return c?c.indexOf(d,a):-1
},lastIndexOf:function(b,a){if(!SC.kindOf(b,SC.Record)){SC.Logger.warn("Using lastIndexOf on %@ with an object that is not an SC.Record".fmt(b));
return -1}this.flush();var d=b.get("storeKey"),c=this.get("storeKeys");return c?c.lastIndexOf(d,a):-1
},add:function(a){if(!SC.kindOf(a,SC.Record)){return this}if(this.indexOf(a)<0){this.pushObject(a)
}return this},remove:function(a){if(!SC.kindOf(a,SC.Record)){return this}this.removeObject(a);
return this},find:function(a,b){if(a&&a.isQuery){return this.get("store").find(a.queryWithScope(this))
}else{return arguments.callee.base.apply(this,arguments)}},refresh:function(){this.get("store").refreshQuery(this.get("query"));
return this},reload:function(){this.flush(YES);return this},destroy:function(){if(!this.get("isDestroyed")){this.get("store").recordArrayWillDestroy(this)
}arguments.callee.base.apply(this,arguments)},storeWillFetchQuery:function(c){var b=this.get("status"),a=SC.Record;
if((b===a.EMPTY)||(b===a.ERROR)){b=a.BUSY_LOADING}if(b&a.READY){b=a.BUSY_REFRESH}this.setIfChanged("status",b);
return this},storeDidFetchQuery:function(a){this.setIfChanged("status",SC.Record.READY_CLEAN);
return this},storeDidCancelQuery:function(c){var b=this.get("status"),a=SC.Record;
if(b===a.BUSY_LOADING){b=a.EMPTY}else{if(b===a.BUSY_REFRESH){b=a.READY_CLEAN}}this.setIfChanged("status",b);
return this},storeDidErrorQuery:function(a){this.setIfChanged("status",SC.Record.ERROR);
return this},storeDidChangeStoreKeys:function(b,a){var c=this.get("query");if(c.get("location")!==SC.Query.LOCAL){return this
}if(!c.containsRecordTypes(a)){return this}var d=this._scq_changedStoreKeys;if(!d){d=this._scq_changedStoreKeys=SC.IndexSet.create()
}d.addEach(b);this.set("needsFlush",YES);this.enumerableContentDidChange();return this
},flush:function(a){if(this._insideFlush){this.set("needsFlush",YES);return this}if(!this.get("needsFlush")&&!a){return this
}this.set("needsFlush",NO);var k=this.get("query"),n=this.get("store");if(!n||!k||k.get("location")!==SC.Query.LOCAL){return this
}this._insideFlush=YES;var g=this.get("storeKeys"),e=this._scq_changedStoreKeys,f=NO,l=SC.Record,c,d,b,r,q,h;
var m=g;if(g&&!a){if(e){e.forEach(function(s){d=n.peekStatus(s);if(!(d&l.EMPTY)&&!((d&l.DESTROYED)||(d===l.BUSY_DESTROYING))){c=n.materializeRecord(s);
h=!!(c&&k.contains(c))}else{h=NO}if(h){if(g.indexOf(s)<0){if(!f){g=g.copy()}g.pushObject(s)
}}else{if(g.indexOf(s)>=0){if(!f){g=g.copy()}g.removeObject(s)}}},this);f=YES}}else{if(q=k.get("scope")){r=q.flush().get("storeKeys")
}else{if(b=k.get("expandedRecordTypes")){r=SC.IndexSet.create();b.forEach(function(s){r.addEach(n.storeKeysFor(b))
})}}g=[];r.forEach(function(s){d=n.peekStatus(s);if(!(d&l.EMPTY)&&!((d&l.DESTROYED)||(d===l.BUSY_DESTROYING))){c=n.materializeRecord(s);
if(c&&k.contains(c)){g.push(s)}}});f=YES}if(e){e.clear()}if(f){if(g&&(g===m)){g=g.copy()
}g=SC.Query.orderStoreKeys(g,k,n);if(SC.compare(m,g)!==0){this.set("storeKeys",SC.clone(g))
}}this._insideFlush=NO;return this},needsFlush:YES,isError:function(){return this.get("status")&SC.Record.ERROR
}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var a=this.get("store");
return a.readQueryError(this.get("query"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),_storeKeysDidChange:function(){var d=this.get("storeKeys");
var c=this._prevStoreKeys,e=this._storeKeysContentDidChange,a=this._storeKeysStateDidChange;
if(d===c){return}if(c){c.removeObserver("[]",this,e)}this._prevStoreKeys=d;if(d){d.addObserver("[]",this,e)
}var b=(d)?d.propertyRevision:-1;this._storeKeysContentDidChange(d,"[]",d,b)}.observes("storeKeys"),_storeKeysContentDidChange:function(d,b,c,a){if(this._scra_records){this._scra_records.length=0
}this.beginPropertyChanges().notifyPropertyChange("length").enumerableContentDidChange().endPropertyChanges()
},init:function(){arguments.callee.base.apply(this,arguments);this._storeKeysDidChange()
}});SC.RecordArray.mixin({NOT_EDITABLE:SC.Error.desc("SC.RecordArray is not editable")});
if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore/datastore");
/* @license
==========================================================================
SproutCore -- JavaScript Application Framework
copyright 2006-2010, Sprout Systems Inc., Apple Inc. and contributors.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

SproutCore and the SproutCore logo are trademarks of Sprout Systems, Inc.

For more information about SproutCore, visit http://www.sproutcore.com


==========================================================================
@license */
}if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("sproutcore")
}SC.stringsFor("English",{});JsxGraph=SC.Object.create({NAMESPACE:"JsxGraph",VERSION:"0.1.0",});
var JXG={};(function(){var a,b;JXG.countDrawings=0;JXG.countTime=0;JXG.require=function(c){};
JXG.rendererFiles=[];JXG.rendererFiles.svg="SVGRenderer";JXG.rendererFiles.vml="VMLRenderer";
JXG.baseFiles=null;JXG.requirePath="";for(a=0;a<document.getElementsByTagName("script").length;
a++){b=document.getElementsByTagName("script")[a];if(b.src&&b.src.match(/loadjsxgraphInOneFile\.js(\?.*)?$/)){JXG.requirePath=b.src.replace(/loadjsxgraphInOneFile\.js(\?.*)?$/,"")
}}JXG.serverBase=JXG.requirePath+"server/"})();JXG.Math=new Object();JXG.Math.eps=0.000001;
JXG.Math.Vector=function(b){var a;this.length=0;if((typeof b!=undefined)&&(b!=null)){for(a=0;
a<b.length;a++){this.push(b[a])}}};JXG.Math.Vector.prototype=new Array();JXG.Math.Vector.prototype.n=function(){return this.length
};JXG.Math.Vector.prototype.exchange=function(c,b){var a=this[c];this[c]=this[b];
this[b]=a};JXG.Math.Matrix=function(g){var e=0,f=false,d,c,a,b;this.length=0;if((typeof g!=undefined)&&(g!=null)){a=g.length;
for(d=0;d<a;d++){b=g[d].length;this.push(new Array());if(f){if(e!=b){this.length=0;
throw new JXG.DimensionMismatchException("Your array contains arrays with different lengths.")
}}for(c=0;c<b;c++){this[d].push(g[d][c])}e=b;f=true}}};JXG.Math.Matrix.prototype=new Array();
JXG.Math.Matrix.prototype.m=function(){return this.length};JXG.Math.Matrix.prototype.n=function(){if(this.length>0){return this[0].length
}else{return 0}};JXG.Math.Matrix.prototype.exchangeRows=function(c,b){var a=this[c];
this[c]=this[b];this[b]=a};JXG.DimensionMismatchException=function(a){if((typeof a!=undefined)&&(a!=null)){this.message=a
}else{this.message=null}};JXG.DimensionMismatchException.prototype.what=function(){var a="Matrix has incorrect dimensions";
if(this.message!=null){return a+": "+this.message+"."}else{return a+"."}};JXG.SingularMatrixException=function(a){if((typeof a!=undefined)&&(a!=null)){this.message=a
}else{this.message=null}};JXG.SingularMatrixException.prototype.what=function(){var a="Matrix is singular";
if(this.message!=null){return a+": "+this.message+"."}else{return a+"."}};JXG.Math.matVecMult=function(g,e){var a=g.length,h=e.length,d=[],c,f,b;
if(h==3){for(c=0;c<a;c++){d[c]=g[c][0]*e[0]+g[c][1]*e[1]+g[c][2]*e[2]}}else{for(c=0;
c<a;c++){f=0;for(b=0;b<h;b++){f+=g[c][b]*e[b]}d[c]=f}}return d};JXG.Math.matMatMult=function(b,a){var d=b.length,c=a[0].length,l=a.length,h=[],g,f,q,e;
for(g=0;g<d;g++){h[g]=[]}for(g=0;g<d;g++){for(f=0;f<c;f++){q=0;for(e=0;e<l;e++){q+=b[g][e]*a[e][f]
}h[g][f]=q}}return h};JXG.Math.Matrix.transpose=function(f){var c=[],d,b,a,e;a=f.length;
e=(f.length>0)?f[0].length:0;for(d=0;d<e;d++){c.push([]);for(b=0;b<a;b++){c[d].push(f[b][d])
}}return c};JXG.Math.crossProduct=function(b,a){return[b[1]*a[2]-b[2]*a[1],b[2]*a[0]-b[0]*a[2],b[0]*a[1]-b[1]*a[0]]
};JXG.Math.innerProduct=function(d,c,g){var e,f=0;if(typeof g=="undefined"){g=d.length
}for(e=0;e<g;e++){f+=d[e]*c[e]}return f};JXG.memoizer=function(b){var a,c;if(b.memo){return b.memo
}a={};c=Array.prototype.join;return(b.memo=function(){var d=c.call(arguments);return(typeof a[d]!="undefined")?a[d]:a[d]=b.apply(this,arguments)
})};JXG.Math.factorial=JXG.memoizer(function(a){if(a<0){return NaN}if(a==0||a==1){return 1
}return a*arguments.callee(a-1)});JXG.Math.binomial=JXG.memoizer(function(e,c){var a,d;
if(c>e||c<0){return 0}if(c==0||c==e){return 1}a=1;for(d=0;d<c;d++){a*=(e-d);a/=(d+1)
}return a});JXG.Math.round=function(a,d){var c,b;c=a-Math.ceil(a);b=c.toString();
if(c<0){b=b.substr(0,d+3)}else{b=b.substr(0,d+2)}c=parseFloat(b);t=parseInt(a.toString());
return t+c};JXG.Math.cosh=function(a){return(Math.exp(a)+Math.exp(-a))*0.5};JXG.Math.sinh=function(a){return(Math.exp(a)-Math.exp(-a))*0.5
};JXG.Math.Numerics={};JXG.Math.Numerics.INT_TRAPEZ=1;JXG.Math.Numerics.INT_SIMPSON=2;
JXG.Math.Numerics.INT_MILNE=3;JXG.Math.Numerics.number_of_nodes=28;JXG.Math.Numerics.integration_type=JXG.INT_MILNE;
JXG.Math.Numerics.backwardSolve=function(g,d){var c=d,a,h,f,e;if(g.m){a=g.m();h=g.n()
}else{a=g.length;h=(g.length>0)?g[0].length:0}for(f=a-1;f>=0;f--){for(e=h-1;e>f;e--){c[f]-=g[f][e]*c[e]
}c[f]/=g[f][f]}return c};JXG.Math.Numerics.Gauss=function(a,l){var q=JXG.Math.eps,c,f,e,d,g,m,h;
if(a.n){c=a.n()}else{c=(a.length>0)?a[0].length:0}g=new JXG.Math.Vector();for(f=0;
f<c;f++){g.push(f)}for(e=0;e<c;e++){for(f=c-1;f>e;f--){if(Math.abs(a[f][e])>JXG.Math.eps){if(Math.abs(a[e][e])<JXG.Math.eps){a.exchangeRows(f,e);
l.exchange(f,e);g.exchange(f,e)}else{a[f][e]/=a[e][e];l[f]-=a[f][e]*l[e];for(d=e+1;
d<c;d++){a[f][d]-=a[f][e]*a[e][d]}}}if(Math.abs(a[e][e])<JXG.Math.eps){throw new SingularMatrixException()
}}}return JXG.Math.Numerics.backwardSolve(a,l)};JXG.Math.Numerics.Inverse=function(m){var g,f,e,u,q,a,l,d=m.length,c=[],b=[],h=[];
for(g=0;g<d;g++){c[g]=[];for(f=0;f<d;f++){c[g][f]=m[g][f]}b[g]=g}for(f=0;f<d;f++){q=Math.abs(c[f][f]);
a=f;for(g=f+1;g<d;g++){if(Math.abs(c[g][f])>q){q=Math.abs(c[g][f]);a=g}}if(q<=JXG.Math.eps){return false
}if(a>f){for(e=0;e<d;e++){l=c[f][e];c[f][e]=c[a][e];c[a][e]=l}l=b[f];b[f]=b[a];b[a]=l
}u=1/c[f][f];for(g=0;g<d;g++){c[g][f]*=u}c[f][f]=u;for(e=0;e<d;e++){if(e!=f){for(g=0;
g<d;g++){if(g!=f){c[g][e]-=c[g][f]*c[f][e]}}c[f][e]=-u*c[f][e]}}}for(g=0;g<d;g++){for(e=0;
e<d;e++){h[b[e]]=c[g][e]}for(e=0;e<d;e++){c[g][e]=h[e]}}return c};JXG.Math.Numerics.QR=function(c,a){};
JXG.Math.Numerics.Jacobi=function(u){var h,f,e,v,a,l,s,r,q=0,m,g,c=u.length,d=[[0,0,0],[0,0,0],[0,0,0]],b=[[0,0,0],[0,0,0],[0,0,0]];
for(h=0;h<c;h++){for(f=0;f<c;f++){d[h][f]=0;b[h][f]=u[h][f];q+=Math.abs(b[h][f])}d[h][h]=1
}if(c==1){return[b,d]}if(q<=0){return[b,d]}q/=(c*c);do{m=0;g=0;for(f=1;f<c;f++){for(h=0;
h<f;h++){a=Math.abs(b[h][f]);if(a>g){g=a}m+=a;if(a<0.1*g){continue}else{a=Math.atan2(2*b[h][f],b[h][h]-b[f][f])*0.5;
l=Math.sin(a);s=Math.cos(a);for(e=0;e<c;e++){r=b[e][h];b[e][h]=s*r+l*b[e][f];b[e][f]=-l*r+s*b[e][f];
r=d[e][h];d[e][h]=s*r+l*d[e][f];d[e][f]=-l*r+s*d[e][f]}b[h][h]=s*b[h][h]+l*b[f][h];
b[f][f]=-l*b[h][f]+s*b[f][f];b[h][f]=0;for(e=0;e<c;e++){b[h][e]=b[e][h];b[f][e]=b[e][f]
}}}}}while(Math.abs(m)/q>JXG.Math.eps);return[b,d]};JXG.Math.Numerics.NewtonCotes=function(d,g){var b=0,a=(d[1]-d[0])/this.number_of_nodes,h,e,c;
switch(this.integration_type){case JXG.INT_TRAPEZ:b=(g(d[0])+g(d[1]))*0.5;h=d[0];
for(e=0;e<this.number_of_nodes-1;e++){h+=a;b+=g(h)}b*=a;break;case JXG.INT_SIMPSON:if(this.number_of_nodes%2>0){throw new Error("JSXGraph:  INT_SIMPSON requires JXG.Math.Numerics.number_of_nodes dividable by 2.")
}c=this.number_of_nodes/2;b=g(d[0])+g(d[1]);h=d[0];for(e=0;e<c-1;e++){h+=2*a;b+=2*g(h)
}h=d[0]-a;for(e=0;e<c;e++){h+=2*a;b+=4*g(h)}b*=a/3;break;default:if(this.number_of_nodes%4>0){throw new Error("JSXGraph: Error in INT_MILNE: JXG.Math.Numerics.number_of_nodes must be a multiple of 4")
}c=this.number_of_nodes*0.25;b=7*(g(d[0])+g(d[1]));h=d[0];for(e=0;e<c-1;e++){h+=4*a;
b+=14*g(h)}h=d[0]-3*a;for(e=0;e<c;e++){h+=4*a;b+=32*(g(h)+g(h+2*a))}h=d[0]-2*a;for(e=0;
e<c;e++){h+=4*a;b+=12*g(h)}b*=2*a/45}return b};JXG.Math.Numerics.splineDef=function(k,h){var a=k.length,c,e,f,g,b,d=new Array(),r=[],m=[],q;
if(k.length!=h.length){throw new Error("JSXGraph: Error in JXG.Math.Numerics.splineDef: Input vector dimensions do not match.")
}for(e=0;e<a;e++){c={X:k[e],Y:h[e]};d.push(c)}d.sort(function(n,l){return n.X-l.X
});for(e=0;e<a;e++){k[e]=d[e].X;h[e]=d[e].Y}for(e=0;e<a-1;e++){r.push(k[e+1]-k[e])
}for(e=0;e<a-2;e++){m.push(6*(h[e+2]-h[e+1])/(r[e+1])-6*(h[e+1]-h[e])/(r[e]))}f=new Array();
g=new Array();f.push(2*(r[0]+r[1]));g.push(m[0]);for(e=0;e<a-3;e++){b=r[e+1]/f[e];
f.push(2*(r[e+1]+r[e+2])-b*r[e+1]);g.push(m[e+1]-b*g[e])}q=new Array();q[a-3]=g[a-3]/f[a-3];
for(e=a-4;e>=0;e--){q[e]=(g[e]-(r[e+1]*q[e+1]))/f[e]}for(e=a-3;e>=0;e--){q[e+1]=q[e]
}q[0]=0;q[a-1]=0;return q};JXG.Math.Numerics.splineEval=function(f,z,v,B){var g=z.length,k=1,h=false,A,q,m,w,u,s,r,e;
if(g!=v.length){throw new Error("JSXGraph: Error in JXG.Math.Numerics.splineEval: Defining vector dimensions do not match.")
}if(JXG.isArray(f)){k=f.length;h=true}else{f=[f]}A=new Array();for(q=0;q<k;q++){if((f[q]<z[0])||(z[q]>z[g-1])){return"NaN"
}m;for(m=1;m<g;m++){if(f[q]<=z[m]){break}}m--;w=v[m];u=(v[m+1]-v[m])/(z[m+1]-z[m])-(z[m+1]-z[m])/6*(B[m+1]+2*B[m]);
s=B[m]/2;r=(B[m+1]-B[m])/(6*(z[m+1]-z[m]));e=f[q]-z[m];A.push(w+(u+(s+r*e)*e)*e)}if(h){return A
}else{return A[0]}};JXG.Math.Numerics.generatePolynomialTerm=function(a,f,b,c){var e="",d;
for(d=f;d>=0;d--){e+="("+a[d].toPrecision(c)+")";if(d>1){e+="*"+b+"<sup>"+d+"</sup> + "
}else{if(d==1){e+="*"+b+" + "}}}return e};JXG.Math.Numerics.lagrangePolynomial=function(d){var a=[];
var c="";var b=function(q,e){var g,f,m,n,r,h=0,l=0;m=d.length;if(!e){for(g=0;g<m;
g++){a[g]=1;n=d[g].X();for(f=0;f<m;f++){if(f!=g){a[g]*=(n-d[f].X())}}a[g]=1/a[g]}M=[];
for(j=0;j<m;j++){M.push([1])}}for(g=0;g<m;g++){n=d[g].X();if(q==n){return d[g].Y()
}else{r=a[g]/(q-n);l+=r;h+=r*d[g].Y()}}return h/l};b.getTerm=function(){return c};
return b};JXG.Math.Numerics.neville=function(d){var a=[];var c=function(q,e){var g,m,n,r,u=JXG.Math.binomial,l=d.length,f=l-1,h=0,k=0;
if(!e){r=1;for(g=0;g<l;g++){a[g]=u(f,g)*r;r*=(-1)}}m=q;for(g=0;g<l;g++){if(m==0){return d[g].X()
}else{r=a[g]/m;m--;h+=d[g].X()*r;k+=r}}return h/k};var b=function(q,e){var g,m,n,r,u=JXG.Math.binomial,l=d.length,f=l-1,h=0,k=0;
if(!e){r=1;for(g=0;g<l;g++){a[g]=u(f,g)*r;r*=(-1)}}m=q;for(g=0;g<l;g++){if(m==0){return d[g].Y()
}else{r=a[g]/m;m--;h+=d[g].Y()*r;k+=r}}return h/k};return[c,b,0,function(){return d.length-1
}]};JXG.Math.Numerics.regressionPolynomial=function(e,l,k){var a=[],f=0,b,h,g,c,d="";
if(JXG.isPoint(e)&&typeof e.Value=="function"){b=function(){return e.Value()}}else{if(JXG.isFunction(e)){b=e
}else{if(JXG.isNumber(e)){b=function(){return e}}else{throw new Error("JSXGraph: Can't create regressionPolynomial from degree of type'"+(typeof e)+"'.")
}}}if(arguments.length==3&&JXG.isArray(l)&&JXG.isArray(k)){c=0}else{if(arguments.length==2&&JXG.isArray(l)&&JXG.isPoint(l[0])){c=1
}else{throw new Error("JSXGraph: Can't create regressionPolynomial. Wrong parameters.")
}}var m=function(E,n){var u,r,A,w,D,q,C,F,z,v=l.length;z=Math.floor(b());if(!n){if(c==1){h=[];
g=[];for(u=0;u<v;u++){h[u]=l[u].X();g[u]=l[u].Y()}}if(c==0){h=[];g=[];for(u=0;u<v;
u++){if(JXG.isFunction(l[u])){h.push(l[u]())}else{h.push(l[u])}if(JXG.isFunction(k[u])){g.push(k[u]())
}else{g.push(k[u])}}}A=[];for(r=0;r<v;r++){A.push([1])}for(u=1;u<=z;u++){for(r=0;
r<v;r++){A[r][u]=A[r][u-1]*h[r]}}D=g;w=JXG.Math.Matrix.transpose(A);q=JXG.Math.matMatMult(w,A);
C=JXG.Math.matVecMult(w,D);a=JXG.Math.Numerics.Gauss(q,C);d=JXG.Math.Numerics.generatePolynomialTerm(a,z,"x",3)
}F=a[z];for(u=z-1;u>=0;u--){F=(F*E+a[u])}return F};m.getTerm=function(){return d};
return m};JXG.Math.Numerics.bezier=function(b){var a=0;return[function(d,c){var g=Math.floor(d)*3,f=d%1,e=1-f;
if(!c){a=Math.floor(b.length/3)}if(d<0){return b[0].X()}if(d>=a){return b[b.length-1].X()
}if(isNaN(d)){return NaN}return e*e*(e*b[g].X()+3*f*b[g+1].X())+(3*e*b[g+2].X()+f*b[g+3].X())*f*f
},function(d,c){var g=Math.floor(d)*3,f=d%1,e=1-f;if(!c){a=Math.floor(b.length/3)
}if(d<0){return b[0].Y()}if(d>=a){return b[b.length-1].Y()}if(isNaN(d)){return NaN
}return e*e*(e*b[g].Y()+3*f*b[g+1].Y())+(3*e*b[g+2].Y()+f*b[g+3].Y())*f*f},0,function(){return Math.floor(b.length/3)
}]};JXG.Math.Numerics.D=function(c,d){var b=0.00001,a=1/(b*2);if(arguments.length==1||(arguments.length>1&&typeof arguments[1]=="undefined")){return function(e,f){return(c(e+b,f)-c(e-b,f))*a
}}else{return function(e,f){return(c.apply(d,[e+b,f])-c.apply(d,[e-b,f]))*a}}};JXG.Math.Numerics.I=function(a,b){return JXG.Math.Numerics.NewtonCotes(a,b)
};JXG.Math.Numerics.newton=function(e,a,g){var b=0,c=0.000001,d=e.apply(g,[a]),k;
while(b<50&&Math.abs(d)>c){k=this.D(e,g)(a);if(Math.abs(k)>c){a-=d/k}else{a+=(Math.random()*0.2-1)
}d=e.apply(g,[a]);b++}return a};JXG.Math.Numerics.root=function(b,a,c){return this.newton(b,a,c)
};JXG.Math.Numerics.riemann=function(l,e,m,c,g){var d,v,k,u,h,s,q,b,a,r;d=[];v=[];
h=0;s=c;e=Math.floor(e);d[h]=s;v[h]=0;if(e>0){u=(g-c)/e;a=u*0.01;for(k=0;k<e;k++){if(m=="right"){q=l(s+u)
}else{if(m=="middle"){q=l(s+u*0.5)}else{if((m=="left")||(m=="trapezodial")){q=l(s)
}else{if(m=="lower"){q=l(s);for(b=s+a;b<=s+u;b+=a){r=l(b);if(r<q){q=r}}}else{q=l(s);
for(b=s+a;b<=s+u;b+=a){r=l(b);if(r>q){q=r}}}}}}h++;d[h]=s;v[h]=q;h++;s+=u;if(m=="trapezodial"){q=l(s)
}d[h]=s;v[h]=q;h++;d[h]=s;v[h]=0}}return[d,v]};JXG.Math.Numerics.riemannsum=function(h,d,l,c,e){var k,g,s,r,m,b,a,q;
k=0;r=c;d=Math.floor(d);if(d>0){s=(e-c)/d;a=s*0.01;for(g=0;g<d;g++){if(l=="right"){m=h(r+s)
}else{if(l=="middle"){m=h(r+s*0.5)}else{if(l=="trapezodial"){m=0.5*(h(r+s)+h(r))}else{if(l=="left"){m=h(r)
}else{if(l=="lower"){m=h(r);for(b=r+a;b<=r+s;b+=a){q=h(b);if(q<m){m=q}}}else{m=h(r);
for(b=r+a;b<=r+s;b+=a){q=h(b);if(q>m){m=q}}}}}}}k+=s*m;r+=s}}return k};JXG.Math.Numerics.Butcher=function(){this.s=0;
this.A=[];this.b=[];this.c=[]};JXG.Math.Numerics.predefinedButcher={};JXG.Math.Numerics.predefinedButcher.RK4={s:4,A:[[0,0,0,0],[0.5,0,0,0],[0,0.5,0,0],[0,0,1,0]],b:[1/6,1/3,1/3,1/6],c:[0,0.5,0.5,1]};
JXG.Math.Numerics.predefinedButcher.Heun={s:2,A:[[0,0],[1,0]],b:[0.5,0.5],c:[0,1]};
JXG.Math.Numerics.predefinedButcher.Euler={s:1,A:[[0]],b:[1],c:[0]};JXG.Math.Numerics.rungeKutta=function(c,G,m,d,F){var n=[],g=[],E=(m[1]-m[0])/d,u=m[0],H,D,C,A,z,B=G.length,v=c.s,b=1000,a=d/b,q=[],w=0;
for(H=0;H<B;H++){n[H]=G[H]}for(D=0;D<d;D++){q[w]=[];for(H=0;H<B;H++){q[w][H]=n[H]
}w++;A=[];for(C=0;C<v;C++){for(H=0;H<B;H++){g[H]=0}for(z=0;z<C;z++){for(H=0;H<B;H++){g[H]+=(c.A[C][z])*E*A[z][H]
}}for(H=0;H<B;H++){g[H]+=n[H]}A.push(F(u+c.c[C]*E,g))}for(H=0;H<B;H++){g[H]=0}for(z=0;
z<v;z++){for(H=0;H<B;H++){g[H]+=c.b[z]*A[z][H]}}for(H=0;H<B;H++){n[H]=n[H]+E*g[H]
}u+=E}return q};JXG.Math.Statistics={};JXG.Math.Statistics.sum=function(b){var d,a,c=0;
for(d=0,a=b.length;d<a;d++){c+=b[d]}return c};JXG.Math.Statistics.prod=function(b){var d,a,c=1;
for(d=0,a=b.length;d<a;d++){c*=b[d]}return c};JXG.Math.Statistics.mean=function(a){if(a.length>0){return this.sum(a)/a.length
}else{return 0}};JXG.Math.Statistics.median=function(b){var c,a;if(b.length>0){c=b.clone();
c.sort(function(e,d){return e-d});a=c.length;if(a%2==1){return c[parseInt(a*0.5)]
}else{return(c[a*0.5-1]+c[a*0.5])*0.5}}else{return 0}};JXG.Math.Statistics.variance=function(c){var b,e,d,a;
if(c.length>1){b=this.mean(c);e=0;for(d=0,a=c.length;d<a;d++){e+=(c[d]-b)*(c[d]-b)
}return e/(c.length-1)}else{return 0}};JXG.Math.Statistics.sd=function(a){return Math.sqrt(this.variance(a))
};JXG.Math.Statistics.weightedMean=function(a,b){if(a.length!=b.length){return}if(a.length>0){return this.mean(this.multiply(a,b))
}else{return 0}};JXG.Math.Statistics.max=function(b){var d,c,a;if(b.length==0){return NaN
}d=b[0];for(c=1,a=b.length;c<a;c++){d=(b[c]>d)?(b[c]):d}return d};JXG.Math.Statistics.min=function(b){var d,c,a;
if(b.length==0){return NaN}d=b[0];for(c=1,a=b.length;c<a;c++){d=(b[c]<d)?(b[c]):d
}return d};JXG.Math.Statistics.range=function(a){return[this.min(a),this.max(a)]};
JXG.Math.Statistics.diff=function(a){return a};JXG.Math.Statistics.min=function(b){var d,c,a;
if(b.length==0){return NaN}d=b[0];for(c=1,a=b.length;c<a;c++){d=(b[c]<d)?(b[c]):d
}return d};JXG.Math.Statistics.abs=function(b){var d,a,c=[];if(typeof JXG.isArray(arr1)){for(d=0,a=b.length;
d<a;d++){c[d]=Math.abs(b[d])}}else{if(typeof b=="number"){return Math.abs(b)}else{c=null
}}return c};JXG.Math.Statistics.add=function(c,b){var e,a,d=[];if(typeof JXG.isArray(c)&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]+b}}else{if(typeof c=="number"&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c+b[e]}}else{if(typeof JXG.isArray(c)&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]+b[e]}}else{if(typeof c=="number"&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c+b}}else{d=null}}}}return d};JXG.Math.Statistics.divide=function(c,b){var e,a,d=[];
if(typeof JXG.isArray(c)&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]/b}}else{if(typeof c=="number"&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c/b[e]}}else{if(typeof JXG.isArray(c)&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]/b[e]}}else{if(typeof c=="number"&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c/b}}else{d=null}}}}return d};JXG.Math.Statistics.mod=function(c,b){var e,a,d=[];
if(typeof JXG.isArray(c)&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]%b}}else{if(typeof c=="number"&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c%b[e]}}else{if(typeof JXG.isArray(c)&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]%b[e]}}else{if(typeof c=="number"&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c%b}}else{d=null}}}}return d};JXG.Math.Statistics.multiply=function(c,b){var e,a,d=[];
if(typeof JXG.isArray(c)&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]*b}}else{if(typeof c=="number"&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c*b[e]}}else{if(typeof JXG.isArray(c)&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]*b[e]}}else{if(typeof c=="number"&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c*b}}else{d=null}}}}return d};JXG.Math.Statistics.subtract=function(c,b){var e,a,d=[];
if(typeof JXG.isArray(c)&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]-b}}else{if(typeof c=="number"&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c-b[e]}}else{if(typeof JXG.isArray(c)&&typeof JXG.isArray(b)){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c[e]-b[e]}}else{if(typeof c=="number"&&typeof b=="number"){for(e=0,a=Math.min(c.length,b.length);
e<a;e++){d[e]=c-b}}else{d=null}}}}return d};JXG.Math.Symbolic={};JXG.Math.Symbolic.generateSymbolicCoordinatesPartial=function(l,e,d,b){function a(k){if(b=="underscore"){return""+d+"_{"+k+"}"
}else{if(b=="brace"){return""+d+"["+k+"]"}else{return""+d+""+k}}}var g=e.ancestors;
var f=0;var h;for(var m in g){h=0;if(JXG.isPoint(g[m])){for(var c in g[m].ancestors){h++
}if(h==0){g[m].symbolic.x=g[m].coords.usrCoords[1];g[m].symbolic.y=g[m].coords.usrCoords[2]
}else{f++;g[m].symbolic.x=a(f);f++;g[m].symbolic.y=a(f)}}}if(JXG.isPoint(e)){e.symbolic.x="x";
e.symbolic.y="y"}return f};JXG.Math.Symbolic.clearSymbolicCoordinates=function(b){for(var a in b.objects){if(JXG.isPoint(b.objects[a])){b.objects[a].symbolic.x="";
b.objects[a].symbolic.y=""}}};JXG.Math.Symbolic.generatePolynomials=function(g,c,d){if(d){this.generateSymbolicCoordinatesPartial(g,c,"u","brace")
}var f=c.ancestors,h,e=[],m=[],l,a,b;f[c.id]=c;for(l in f){h=0;e=[];if(JXG.isPoint(f[l])){for(a in f[l].ancestors){h++
}if(h>0){e=f[l].generatePolynomial();for(b=0;b<e.length;b++){m.push(e[b])}}}}if(d){this.clearSymbolicCoordinates(g)
}return m};JXG.Math.Symbolic.geometricLocusByGroebnerBase=function(e,g,k){var f=this.generateSymbolicCoordinatesPartial(e,g,"u","brace"),a=this.generatePolynomials(e,g);
var c=a.join(","),b=new JXG.Coords(JXG.COORDS_BY_USR,[0,0],e),d=new JXG.Coords(JXG.COORDS_BY_USR,[e.canvasWidth,e.canvasHeight],e),h;
if(typeof JXG.Server.modules.geoloci=="undefined"){JXG.Server.loadModule("geoloci")
}if(typeof JXG.Server.modules.geoloci=="undefined"){throw new Error("JSXGraph: Unable to load JXG.Server module 'geoloci.py'.")
}this.cbp=function(l){k(l.datax,l.datay,l.polynomial)};this.cb=JXG.bind(this.cbp,this);
JXG.Server.modules.geoloci.lociCoCoA(b.usrCoords[1],d.usrCoords[1],d.usrCoords[2],b.usrCoords[2],f,c,this.cb);
this.clearSymbolicCoordinates(e)};JXG.Complex=function(a,b){this.isComplex=true;if(typeof a=="undefined"){a=0
}if(typeof b=="undefined"){b=0}if(a.isComplex){b=a.imaginary;a=a.real}this.real=a;
this.imaginary=b;this.absval=0;this.angle=0};JXG.Complex.prototype.toString=function(){return""+this.real+" + "+this.imaginary+"i"
};JXG.Complex.prototype.add=function(a){if(typeof a=="number"){this.real+=a}else{this.real+=a.real;
this.imaginary+=a.imaginary}};JXG.Complex.prototype.sub=function(a){if(typeof a=="number"){this.real-=a
}else{this.real-=a.real;this.imaginary-=a.imaginary}};JXG.Complex.prototype.mult=function(a){if(typeof a=="number"){this.real*=a;
this.imaginary*=a}else{this.real=this.real*a.real-this.imaginary*a.imaginary;this.imaginary=this.real*a.imaginary+this.imaginary*a.real
}};JXG.Complex.prototype.div=function(b){var a;if(typeof b=="number"){if(Math.abs(b)<Math.eps){this.real=Infinity;
this.imaginary=Infinity;return}this.real/=b;this.imaginary/=b}else{if((Math.abs(b.real)<Math.eps)&&(Math.abs(b.imaginary)<Math.eps)){this.real=Infinity;
this.imaginary=Infinity;return}a=b.real*b.real+b.imaginary*b.imaginary;this.real=(this.real*b.real+this.imaginary*b.imaginary)/a;
this.imaginary=(this.imaginary*b.real-this.real*b.imaginary)/a}};JXG.C={};JXG.C.add=function(b,a){var c=new JXG.Complex(b);
c.add(a);return c};JXG.C.sub=function(b,a){var c=new JXG.Complex(b);c.sub(a);return c
};JXG.C.mult=function(b,a){var c=new JXG.Complex(b);c.mult(a);return c};JXG.C.div=function(b,a){var c=new JXG.Complex(b);
c.div(a);return c};JXG.AbstractRenderer=function(){this.vOffsetText=8;this.enhancedRendering=true
};JXG.AbstractRenderer.prototype.drawPoint=function(a){var b,c=a.visProp.face;if(c=="cross"||c=="x"){b=this.createPrimitive("path",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"path")}else{if(c=="circle"||c=="o"){b=this.createPrimitive("circle",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"circle")}else{if(c=="square"||c=="[]"){b=this.createPrimitive("rect",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"rect")}else{if(c=="plus"||c=="+"){b=this.createPrimitive("path",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"path")}else{if(c=="diamond"||c=="<>"){b=this.createPrimitive("path",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"path")}else{if(c=="triangleup"||c=="a"){b=this.createPrimitive("path",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"path")}else{if(c=="triangledown"||c=="v"){b=this.createPrimitive("path",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"path")}else{if(c=="triangleleft"||c=="<"){b=this.createPrimitive("path",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"path")}else{if(c=="triangleright"||c==">"){b=this.createPrimitive("path",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"path")}}}}}}}}}a.rendNode=b;
this.setObjectStrokeWidth(a,a.visProp.strokeWidth);this.setObjectStrokeColor(a,a.visProp.strokeColor,a.visProp.strokeOpacity);
this.setObjectFillColor(a,a.visProp.fillColor,a.visProp.fillOpacity);this.updatePoint(a)
};JXG.AbstractRenderer.prototype.updatePoint=function(b){var a=b.visProp.size,c=b.visProp.face;
if(isNaN(b.coords.scrCoords[2])||isNaN(b.coords.scrCoords[1])){return}if(this.enhancedRendering){if(!b.visProp.draft){this.setObjectStrokeWidth(b,b.visProp.strokeWidth);
this.setObjectStrokeColor(b,b.visProp.strokeColor,b.visProp.strokeOpacity);this.setObjectFillColor(b,b.visProp.fillColor,b.visProp.fillOpacity)
}else{this.setDraft(b)}}a*=((!b.board||!b.board.options.point.zoom)?1:Math.sqrt(b.board.zoomX*b.board.zoomY));
if(c=="cross"||c=="x"){this.updatePathPrimitive(b.rendNode,this.updatePathStringPoint(b,a,"x"),b.board)
}else{if(c=="circle"||c=="o"){this.updateCirclePrimitive(b.rendNode,b.coords.scrCoords[1],b.coords.scrCoords[2],a+1)
}else{if(c=="square"||c=="[]"){this.updateRectPrimitive(b.rendNode,b.coords.scrCoords[1]-a,b.coords.scrCoords[2]-a,a*2,a*2)
}else{if(c=="plus"||c=="+"){this.updatePathPrimitive(b.rendNode,this.updatePathStringPoint(b,a,"+"),b.board)
}else{if(c=="diamond"||c=="<>"){this.updatePathPrimitive(b.rendNode,this.updatePathStringPoint(b,a,"diamond"),b.board)
}else{if(c=="triangleup"||c=="a"){this.updatePathPrimitive(b.rendNode,this.updatePathStringPoint(b,a,"A"),b.board)
}else{if(c=="triangledown"||c=="v"){this.updatePathPrimitive(b.rendNode,this.updatePathStringPoint(b,a,"v"),b.board)
}else{if(c=="triangleleft"||c=="<"){this.updatePathPrimitive(b.rendNode,this.updatePathStringPoint(b,a,"<"),b.board)
}else{if(c=="triangleright"||c==">"){this.updatePathPrimitive(b.rendNode,this.updatePathStringPoint(b,a,">"),b.board)
}}}}}}}}}this.setShadow(b)};JXG.AbstractRenderer.prototype.changePointStyle=function(a){var b=this.getElementById(a.id);
if(b!=null){this.remove(b)}this.drawPoint(a);JXG.clearVisPropOld(a);if(!a.visProp.visible){this.hide(a)
}if(a.visProp.draft){this.setDraft(a)}};JXG.AbstractRenderer.prototype.drawLine=function(a){var b=this.createPrimitive("line",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"lines");this.updateLine(a)
};JXG.AbstractRenderer.prototype.updateLine=function(b){var n=new JXG.Coords(JXG.COORDS_BY_USER,b.point1.coords.usrCoords,b.board),l=new JXG.Coords(JXG.COORDS_BY_USER,b.point2.coords.usrCoords,b.board),a,q,f,e,k,d,h,g,c;
this.calcStraight(b,n,l);this.updateLinePrimitive(b.rendNode,n.scrCoords[1],n.scrCoords[2],l.scrCoords[1],l.scrCoords[2],b.board);
if(b.image!=null){a=n.scrCoords[1];q=n.scrCoords[2];f=l.scrCoords[1];e=l.scrCoords[2];
d=(f-a>=0)?1:-1;if(Math.abs(f-a)>1e-7){k=Math.atan2(e-q,f-a)+((d<0)?Math.PI:0)}else{k=((e-q>0)?0.5:-0.5)*Math.PI
}h=250;g=256;c=[[1,0,0],[h*(1-Math.cos(k))+g*Math.sin(k),Math.cos(k),-Math.sin(k)],[g*(1-Math.cos(k))-h*Math.sin(k),Math.sin(k),Math.cos(k)]];
b.imageTransformMatrix=c}this.makeArrows(b);if(this.enhancedRendering){if(!b.visProp.draft){this.setObjectStrokeWidth(b,b.visProp.strokeWidth);
this.setObjectStrokeColor(b,b.visProp.strokeColor,b.visProp.strokeOpacity);this.setDashStyle(b,b.visProp);
this.setShadow(b)}else{this.setDraft(b)}}};JXG.AbstractRenderer.prototype.calcStraight=function(f,r,n){var d,a,l,h,u,e,q,m,x,k,g,w,v;
u=f.visProp.straightFirst;e=f.visProp.straightLast;if(Math.abs(r.scrCoords[0])<JXG.Math.eps){u=true
}if(Math.abs(n.scrCoords[0])<JXG.Math.eps){e=true}if(!u&&!e){return}m=[];m[0]=f.stdform[0]-f.stdform[1]*f.board.origin.scrCoords[1]/f.board.stretchX+f.stdform[2]*f.board.origin.scrCoords[2]/f.board.stretchY;
m[1]=f.stdform[1]/f.board.stretchX;m[2]=f.stdform[2]/(-f.board.stretchY);if(isNaN(m[0]+m[1]+m[2])){return
}x=[];x[0]=JXG.Math.crossProduct(m,[0,0,1]);x[1]=JXG.Math.crossProduct(m,[0,1,0]);
x[2]=JXG.Math.crossProduct(m,[-f.board.canvasHeight,0,1]);x[3]=JXG.Math.crossProduct(m,[-f.board.canvasWidth,1,0]);
for(k=0;k<4;k++){if(Math.abs(x[k][0])>JXG.Math.eps){for(g=2;g>0;g--){x[k][g]/=x[k][0]
}x[k][0]=1}}d=false;a=false;if(!u&&r.scrCoords[1]>=0&&r.scrCoords[1]<=f.board.canvasWidth&&r.scrCoords[2]>=0&&r.scrCoords[2]<=f.board.canvasHeight){d=true
}if(!e&&n.scrCoords[1]>=0&&n.scrCoords[1]<=f.board.canvasWidth&&n.scrCoords[2]>=0&&n.scrCoords[2]<=f.board.canvasHeight){a=true
}if(Math.abs(x[1][0])<JXG.Math.eps){l=x[0];h=x[2]}else{if(Math.abs(x[0][0])<JXG.Math.eps){l=x[1];
h=x[3]}else{if(x[1][2]<0){l=x[0];if(x[3][2]>f.board.canvasHeight){h=x[2]}else{h=x[3]
}}else{if(x[1][2]>f.board.canvasHeight){l=x[2];if(x[3][2]<0){h=x[0]}else{h=x[3]}}else{l=x[1];
if(x[3][2]<0){h=x[0]}else{if(x[3][2]>f.board.canvasHeight){h=x[2]}else{h=x[3]}}}}}}l=new JXG.Coords(JXG.COORDS_BY_SCREEN,l.slice(1),f.board);
h=new JXG.Coords(JXG.COORDS_BY_SCREEN,h.slice(1),f.board);if(!d){if(!a){if(this.isSameDirection(r,n,l)){if(!this.isSameDirection(r,n,h)){v=l;
w=h}else{if(f.board.algebra.affineDistance(n.usrCoords,l.usrCoords)<f.board.algebra.affineDistance(n.usrCoords,h.usrCoords)){w=l;
v=h}else{v=l;w=h}}}else{if(this.isSameDirection(r,n,h)){w=l;v=h}else{if(f.board.algebra.affineDistance(n.usrCoords,l.usrCoords)<f.board.algebra.affineDistance(n.usrCoords,h.usrCoords)){v=l;
w=h}else{w=l;v=h}}}}else{if(this.isSameDirection(n,r,l)){w=l}else{w=h}}}else{if(!a){if(this.isSameDirection(r,n,l)){v=l
}else{v=h}}}if(w){r.setCoordinates(JXG.COORDS_BY_USER,w.usrCoords.slice(1))}if(v){n.setCoordinates(JXG.COORDS_BY_USER,v.usrCoords.slice(1))
}};JXG.AbstractRenderer.prototype.isSameDirection=function(g,d,c){var b,a,f,e;b=d.usrCoords[1]-g.usrCoords[1];
a=d.usrCoords[2]-g.usrCoords[2];f=c.usrCoords[1]-g.usrCoords[1];e=c.usrCoords[2]-g.usrCoords[2];
if(Math.abs(b)<JXG.Math.eps){b=0}if(Math.abs(a)<JXG.Math.eps){a=0}if(Math.abs(f)<JXG.Math.eps){f=0
}if(Math.abs(e)<JXG.Math.eps){e=0}if(b>=0&&f>=0){if((a>=0&&e>=0)||(a<=0&&e<=0)){return true
}}else{if(b<=0&&f<=0){if((a>=0&&e>=0)||(a<=0&&e<=0)){return true}}}return false};
JXG.AbstractRenderer.prototype.updateTicks=function(b,d,a,e,c){};JXG.AbstractRenderer.prototype.removeTicks=function(a){var b=this.getElementById(a.id+"_ticks");
this.remove(b)};JXG.AbstractRenderer.prototype.drawArrow=function(a){var b=this.createPrimitive("line",a.id);
this.setObjectStrokeWidth(a,a.visProp.strokeWidth);this.setObjectStrokeColor(a,a.visProp.strokeColor,a.visProp.strokeOpacity);
this.setObjectFillColor(a,a.visProp.fillColor,a.visProp.fillOpacity);this.setDashStyle(a,a.visProp);
this.makeArrow(b,a);this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"lines");
this.updateArrow(a)};JXG.AbstractRenderer.prototype.updateArrow=function(a){if(this.enhancedRendering){if(!a.visProp.draft){this.setObjectStrokeWidth(a,a.visProp.strokeWidth);
this.setObjectStrokeColor(a,a.visProp.strokeColor,a.visProp.strokeOpacity);this.setObjectFillColor(a,a.visProp.fillColor,a.visProp.fillOpacity);
this.setShadow(a);this.setDashStyle(a,a.visProp)}else{this.setDraft(a)}}this.updateLinePrimitive(a.rendNode,a.point1.coords.scrCoords[1],a.point1.coords.scrCoords[2],a.point2.coords.scrCoords[1],a.point2.coords.scrCoords[2],a.board)
};JXG.AbstractRenderer.prototype.drawCurve=function(a){var b=this.createPrimitive("path",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"path");this.setObjectStrokeWidth(a,a.visProp.strokeWidth);
this.setObjectStrokeColor(a,a.visProp.strokeColor,a.visProp.strokeOpacity);this.setObjectFillColor(a,a.visProp.fillColor,a.visProp.fillOpacity);
this.setDashStyle(a,a.visProp);this.updateCurve(a)};JXG.AbstractRenderer.prototype.updateCurve=function(a){if(this.enhancedRendering){if(!a.visProp.draft){this.setObjectStrokeWidth(a,a.visProp.strokeWidth);
this.setObjectStrokeColor(a,a.visProp.strokeColor,a.visProp.strokeOpacity);this.setObjectFillColor(a,a.visProp.fillColor,a.visProp.fillOpacity);
this.setDashStyle(a,a.visProp);this.setShadow(a)}else{this.setDraft(a)}}this.updatePathPrimitive(a.rendNode,this.updatePathStringPrimitive(a),a.board)
};JXG.AbstractRenderer.prototype.drawCircle=function(a){var b=this.createPrimitive("ellipse",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"ellipse");this.updateCircle(a)
};JXG.AbstractRenderer.prototype.updateCircle=function(b){if(this.enhancedRendering){if(!b.visProp.draft){this.setObjectStrokeWidth(b,b.visProp.strokeWidth);
this.setObjectStrokeColor(b,b.visProp.strokeColor,b.visProp.strokeOpacity);this.setObjectFillColor(b,b.visProp.fillColor,b.visProp.fillOpacity);
this.setDashStyle(b,b.visProp);this.setShadow(b)}else{this.setDraft(b)}}var a=b.Radius();
if(a>0&&!isNaN(b.midpoint.coords.scrCoords[1]+b.midpoint.coords.scrCoords[2])){this.updateEllipsePrimitive(b.rendNode,b.midpoint.coords.scrCoords[1],b.midpoint.coords.scrCoords[2],(a*b.board.stretchX),(a*b.board.stretchY))
}};JXG.AbstractRenderer.prototype.drawPolygon=function(a){var b=this.createPrimitive("polygon",a.id);
a.visProp.fillOpacity=0.3;this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"polygon");
this.updatePolygon(a)};JXG.AbstractRenderer.prototype.updatePolygon=function(a){if(this.enhancedRendering){if(!a.visProp.draft){this.setObjectStrokeWidth(a,a.visProp.strokeWidth);
this.setObjectFillColor(a,a.visProp.fillColor,a.visProp.fillOpacity);this.setShadow(a)
}else{this.setDraft(a)}}this.updatePolygonePrimitive(a.rendNode,a)};JXG.AbstractRenderer.prototype.drawArc=function(a){};
JXG.AbstractRenderer.prototype.updateArc=function(a){};JXG.AbstractRenderer.prototype.drawText=function(a){var b;
if(a.display=="html"){b=this.container.ownerDocument.createElement("div");b.style.position="absolute";
b.style.fontSize=a.board.fontSize+"px";b.style.color=a.visProp.strokeColor;b.className="JXGtext";
b.style.zIndex="10";this.container.appendChild(b);b.setAttribute("id",a.id)}else{b=this.drawInternalText(a)
}a.rendNode=b;a.htmlStr="";this.updateText(a)};JXG.AbstractRenderer.prototype.drawInternalText=function(a){};
JXG.AbstractRenderer.prototype.updateText=function(a){if(a.visProp.visible==false){return
}if(isNaN(a.coords.scrCoords[1]+a.coords.scrCoords[2])){return}this.updateTextStyle(a);
if(a.display=="html"){a.rendNode.style.left=(a.coords.scrCoords[1])+"px";a.rendNode.style.top=(a.coords.scrCoords[2]-this.vOffsetText)+"px";
a.updateText();if(a.htmlStr!=a.plaintextStr){a.rendNode.innerHTML=a.plaintextStr;
if(a.board.options.text.useASCIIMathML){AMprocessNode(a.rendNode,false)}a.htmlStr=a.plaintextStr
}}else{this.updateInternalText(a)}};JXG.AbstractRenderer.prototype.updateInternalText=function(a){};
JXG.AbstractRenderer.prototype.updateTextStyle=function(b){var a;if(b.visProp.fontSize){if(typeof b.visProp.fontSize=="function"){a=b.visProp.fontSize();
b.rendNode.style.fontSize=(a>0?a:0)}else{b.rendNode.style.fontSize=(b.visProp.fontSize)
}}};JXG.AbstractRenderer.prototype.drawAngle=function(a){};JXG.AbstractRenderer.prototype.updateAngle=function(a){};
JXG.AbstractRenderer.prototype.drawImage=function(a){};JXG.AbstractRenderer.prototype.updateImage=function(a){this.updateRectPrimitive(a.rendNode,a.coords.scrCoords[1],a.coords.scrCoords[2]-a.size[1],a.size[0],a.size[1]);
if(a.parent!=null){this.transformImageParent(a,a.parent.imageTransformMatrix)}else{this.transformImageParent(a)
}this.transformImage(a,a.transformations)};JXG.AbstractRenderer.prototype.drawGrid=function(e){var x=e.gridX,v=e.gridY,s=new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],e),f=new JXG.Coords(JXG.COORDS_BY_SCREEN,[e.canvasWidth,e.canvasHeight],e),y=Math.ceil(s.usrCoords[1]),u=0,w,a,q,r,m,h,n,g,b,c,d;
e.hasGrid=true;for(w=0;w<=x+1;w++){if(y-w/x<s.usrCoords[1]){u=w-1;break}}y=Math.floor(f.usrCoords[1]);
a=0;for(w=0;w<=x+1;w++){if(y+w/x>f.usrCoords[1]){a=w-1;break}}y=Math.ceil(f.usrCoords[2]);
r=0;for(w=0;w<=v+1;w++){if(y-w/v<f.usrCoords[2]){r=w-1;break}}y=Math.floor(s.usrCoords[2]);
q=0;for(w=0;w<=v+1;w++){if(y+w/v>s.usrCoords[2]){q=w-1;break}}m=Math.round((1/x)*e.stretchX);
h=Math.round((1/v)*e.stretchY);n=new JXG.Coords(JXG.COORDS_BY_USER,[Math.ceil(s.usrCoords[1])-u/x,Math.floor(s.usrCoords[2])+q/v],e);
g=new JXG.Coords(JXG.COORDS_BY_USER,[Math.floor(f.usrCoords[1])+a/x,Math.ceil(f.usrCoords[2])-r/v],e);
b=this.drawVerticalGrid(n,g,m,e);this.appendChildPrimitive(b,e.options.layer.grid);
if(!e.snapToGrid){c=new Object();c.rendNode=b;c.elementClass=JXG.OBJECT_CLASS_LINE;
c.id="gridx";JXG.clearVisPropOld(c);this.setObjectStrokeColor(c,e.gridColor,e.gridOpacity)
}else{c=new Object();c.rendNode=b;c.elementClass=JXG.OBJECT_CLASS_LINE;c.id="gridx";
JXG.clearVisPropOld(c);this.setObjectStrokeColor(c,"#FF8080",0.5)}this.setPropertyPrimitive(b,"stroke-width","0.4px");
if(e.gridDash){this.setGridDash("gridx")}b=this.drawHorizontalGrid(n,g,h,e);this.appendChildPrimitive(b,e.options.layer.grid);
if(!e.snapToGrid){c=new Object();c.rendNode=b;c.elementClass=JXG.OBJECT_CLASS_LINE;
c.id="gridy";JXG.clearVisPropOld(c);this.setObjectStrokeColor(c,e.gridColor,e.gridOpacity)
}else{c=new Object();c.rendNode=b;c.elementClass=JXG.OBJECT_CLASS_LINE;c.id="gridy";
JXG.clearVisPropOld(c);this.setObjectStrokeColor(c,"#FF8080",0.5)}this.setPropertyPrimitive(b,"stroke-width","0.4px");
if(e.gridDash){this.setGridDash("gridy")}};JXG.AbstractRenderer.prototype.removeGrid=function(a){var b=document.getElementById("gridx");
this.remove(b);b=document.getElementById("gridy");this.remove(b);a.hasGrid=false};
JXG.AbstractRenderer.prototype.hide=function(a){};JXG.AbstractRenderer.prototype.show=function(a){};
JXG.AbstractRenderer.prototype.setObjectStrokeWidth=function(b,a){};JXG.AbstractRenderer.prototype.setObjectStrokeColor=function(c,a,b){};
JXG.AbstractRenderer.prototype.setObjectFillColor=function(c,a,b){};JXG.AbstractRenderer.prototype.setDraft=function(b){if(!b.visProp.draft){return
}var a=b.board.options.elements.draft.color,c=b.board.options.elements.draft.opacity;
if(b.type==JXG.OBJECTT_TYPE_POLYGON){this.setObjectFillColor(b,a,c)}else{if(b.elementClass==JXG.OBJECT_CLASS_POINT){this.setObjectFillColor(b,a,c)
}else{this.setObjectFillColor(b,"none",0)}this.setObjectStrokeColor(b,a,c);this.setObjectStrokeWidth(b,b.board.options.elements.draft.strokeWidth)
}};JXG.AbstractRenderer.prototype.removeDraft=function(a){if(a.type==JXG.OBJECT_TYPE_POLYGON){this.setObjectFillColor(a,a.visProp.fillColor,a.visProp.fillColorOpacity)
}else{if(a.type==JXG.OBJECT_CLASS_POINT){this.setObjectFillColor(a,a.visProp.fillColor,a.visProp.fillColorOpacity)
}this.setObjectStrokeColor(a,a.visProp.strokeColor,a.visProp.strokeColorOpacity);
this.setObjectStrokeWidth(a,a.visProp.strokeWidth)}};JXG.AbstractRenderer.prototype.highlight=function(b){var a;
if(b.visProp.draft==false){if(b.type==JXG.OBJECT_CLASS_POINT){this.setObjectStrokeColor(b,b.visProp.highlightStrokeColor,b.visProp.highlightStrokeOpacity);
this.setObjectFillColor(b,b.visProp.highlightStrokeColor,b.visProp.highlightStrokeOpacity)
}else{if(b.type==JXG.OBJECT_TYPE_POLYGON){this.setObjectFillColor(b,b.visProp.highlightFillColor,b.visProp.highlightFillOpacity);
for(a=0;a<b.borders.length;a++){this.setObjectStrokeColor(b.borders[a],b.borders[a].visProp.highlightStrokeColor,b.visProp.highlightStrokeOpacity)
}}else{this.setObjectStrokeColor(b,b.visProp.highlightStrokeColor,b.visProp.highlightStrokeOpacity);
this.setObjectFillColor(b,b.visProp.highlightFillColor,b.visProp.highlightFillOpacity)
}}}};JXG.AbstractRenderer.prototype.noHighlight=function(b){var a;if(b.visProp.draft==false){if(b.type==JXG.OBJECT_CLASS_POINT){this.setObjectStrokeColor(b,b.visProp.strokeColor,b.visProp.strokeOpacity);
this.setObjectFillColor(b,b.visProp.strokeColor,b.visProp.strokeOpacity)}else{if(b.type==JXG.OBJECT_TYPE_POLYGON){this.setObjectFillColor(b,b.visProp.fillColor,b.visProp.fillOpacity);
for(a=0;a<b.borders.length;a++){this.setObjectStrokeColor(b.borders[a],b.borders[a].visProp.strokeColor,b.visProp.strokeOpacity)
}}else{this.setObjectStrokeColor(b,b.visProp.strokeColor,b.visProp.strokeOpacity);
this.setObjectFillColor(b,b.visProp.fillColor,b.visProp.fillOpacity)}}}};JXG.AbstractRenderer.prototype.remove=function(a){};
JXG.AbstractRenderer.prototype.suspendRedraw=function(){};JXG.AbstractRenderer.prototype.unsuspendRedraw=function(){};
JXG.AbstractRenderer.prototype.drawZoomBar=function(g){var k,c,f,e,b,l,h,a,d;k=this.container.ownerDocument;
c=k.createElement("div");c.className="JXGtext";c.style.color="#aaaaaa";c.style.backgroundColor="#f5f5f5";
c.style.padding="2px";c.style.position="absolute";c.style.fontSize="10px";c.style.cursor="pointer";
c.style.zIndex="100";this.container.appendChild(c);c.style.right="5px";c.style.bottom="5px";
f=k.createElement("span");c.appendChild(f);f.innerHTML="&nbsp;&ndash;&nbsp;";JXG.addEvent(f,"click",g.zoomOut,g);
e=k.createElement("span");c.appendChild(e);e.innerHTML="&nbsp;o&nbsp;";JXG.addEvent(e,"click",g.zoom100,g);
b=k.createElement("span");c.appendChild(b);b.innerHTML="&nbsp;+&nbsp;";JXG.addEvent(b,"click",g.zoomIn,g);
l=k.createElement("span");c.appendChild(l);l.innerHTML="&nbsp;&larr;&nbsp;";JXG.addEvent(l,"click",g.clickLeftArrow,g);
h=k.createElement("span");c.appendChild(h);h.innerHTML="&nbsp;&uarr;&nbsp;";JXG.addEvent(h,"click",g.clickUpArrow,g);
a=k.createElement("span");c.appendChild(a);a.innerHTML="&nbsp;&darr;&nbsp;";JXG.addEvent(a,"click",g.clickDownArrow,g);
d=k.createElement("span");c.appendChild(d);d.innerHTML="&nbsp;&rarr;&nbsp;";JXG.addEvent(d,"click",g.clickRightArrow,g)
};JXG.AbstractRenderer.prototype.getElementById=function(a){return document.getElementById(a)
};JXG.AbstractRenderer.prototype.findSplit=function(w,h,g){var n=0,l=h,m,e,x,v,u,c,s,b,q,r,a;
if(g-h<2){return[-1,0]}x=w[h].scrCoords;v=w[g].scrCoords;if(isNaN(x[1]+x[2]+v[1]+v[2])){return[NaN,g]
}for(e=h+1;e<g;e++){u=w[e].scrCoords;c=u[1]-x[1];s=u[2]-x[2];b=v[1]-x[1];q=v[2]-x[2];
r=b*b+q*q;if(r>=JXG.Math.eps){a=(c*b+s*q)/r;m=c*c+s*s-a*(c*b+s*q)}else{a=0;m=c*c+s*s
}if(a<0){m=c*c+s*s}else{if(a>1){c=u[1]-v[1];s=u[2]-v[2];m=c*c+s*s}}if(m>n){n=m;l=e
}}return[Math.sqrt(n),l]};JXG.AbstractRenderer.prototype.RDP=function(f,e,d,b,c){var a=this.findSplit(f,e,d);
if(a[0]>b){this.RDP(f,e,a[1],b,c);this.RDP(f,a[1],d,b,c)}else{c.push(f[d])}};JXG.AbstractRenderer.prototype.RamenDouglasPeuker=function(f,b){var d=[],e,c,a;
a=f.length;e=0;while(e<a&&isNaN(f[e].scrCoords[1]+f[e].scrCoords[2])){e++}c=a-1;while(c>e&&isNaN(f[c].scrCoords[1]+f[c].scrCoords[2])){c--
}if(e>c||e==a){return[]}d[0]=f[e];this.RDP(f,e,c,b,d);return d};JXG.AbstractRenderer.prototype.setShadow=function(a){};
JXG.AbstractRenderer.prototype.updatePathStringPoint=function(c,a,b){};JXG.AbstractRenderer.prototype.eval=function(a){if(typeof a=="function"){return a()
}else{return a}};JXG.FileReader=new function(){this.parseFileContent=function(a,b,d){this.request=false;
var c;try{this.request=new XMLHttpRequest();if(d.toLowerCase()=="raw"){this.request.overrideMimeType("text/plain; charset=iso-8859-1")
}else{this.request.overrideMimeType("text/xml; charset=iso-8859-1")}}catch(c){try{this.request=new ActiveXObject("Msxml2.XMLHTTP")
}catch(c){try{this.request=new ActiveXObject("Microsoft.XMLHTTP")}catch(c){this.request=false
}}}if(!this.request){alert("AJAX not activated!");return}this.request.open("GET",a,true);
if(d.toLowerCase()=="raw"){this.cbp=function(){var e=this.request;if(e.readyState==4){b(e.responseText)
}}}else{this.cbp=function(){var e=this.request;if(e.readyState==4){this.parseString(e.responseText,b,d,false)
}}}this.cb=JXG.bind(this.cbp,this);this.request.onreadystatechange=this.cb;try{this.request.send(null)
}catch(c){throw new Error("JSXGraph: problems opening "+a+" !")}};this.cleanWhitespace=function(a){var b=a.firstChild;
while(b!=null){if(b.nodeType==3&&!/\S/.test(b.nodeValue)){a.removeChild(b)}else{if(b.nodeType==1){this.cleanWhitespace(b)
}}b=b.nextSibling}};this.stringToXMLTree=function(b){if(typeof DOMParser=="undefined"){DOMParser=function(){};
DOMParser.prototype.parseFromString=function(f,g){if(typeof ActiveXObject!="undefined"){var e=new ActiveXObject("MSXML.DomDocument");
e.loadXML(f);return e}}}var c=new DOMParser();var a=c.parseFromString(b,"text/xml");
this.cleanWhitespace(a);return a};this.parseString=function(d,c,e,b){if(e.toLowerCase()=="geonext"){d=JXG.GeonextReader.prepareString(d)
}if(e.toLowerCase()=="geogebra"){d=JXG.GeogebraReader.prepareString(d,b)}if(e.toLowerCase()=="intergeo"){d=JXG.IntergeoReader.prepareString(d)
}c.xmlString=d;var a=this.stringToXMLTree(d);this.readElements(a,c,e)};this.readElements=function(a,b,c){if(c.toLowerCase()=="geonext"){b.suspendUpdate();
if(a.getElementsByTagName("GEONEXT").length!=0){JXG.GeonextReader.readGeonext(a,b)
}b.unsuspendUpdate()}else{if(a.getElementsByTagName("geogebra").length!=0){JXG.GeogebraReader.readGeogebra(a,b)
}else{if(c.toLowerCase()=="intergeo"){JXG.IntergeoReader.readIntergeo(a,b)}}}b.afterLoad()
}};JXG.Board=function(a,f,b,m,l,k,h,g,c,d,e){this.BOARD_MODE_NONE=0;this.BOARD_MODE_DRAG=1;
this.BOARD_MODE_CONSTRUCT=16;this.BOARD_MODE_MOVE_ORIGIN=2;this.BOARD_QUALITY_LOW=1;
this.BOARD_QUALITY_HIGH=2;this.CONSTRUCTION_TYPE_POINT=1129599060;this.CONSTRUCTION_TYPE_CIRCLE=1129595724;
this.CONSTRUCTION_TYPE_LINE=1129598030;this.CONSTRUCTION_TYPE_GLIDER=1129596740;this.CONSTRUCTION_TYPE_MIDPOINT=1129598288;
this.CONSTRUCTION_TYPE_PERPENDICULAR=1129599044;this.CONSTRUCTION_TYPE_PARALLEL=1129599052;
this.CONSTRUCTION_TYPE_INTERSECTION=1129597267;this.container=a;this.containerObj=document.getElementById(this.container);
if(this.containerObj==null){throw new Error("\nJSXGraph: HTML container element '"+(box)+"' not found.")
}this.renderer=f;this.options=JXG.deepCopy(JXG.Options);this.dimension=2;this.origin={};
this.origin.usrCoords=[1,0,0];this.origin.scrCoords=[1,m[0],m[1]];this.zoomX=l;this.zoomY=k;
this.unitX=h;this.unitY=g;this.stretchX=this.zoomX*this.unitX;this.stretchY=this.zoomY*this.unitY;
this.canvasWidth=c;this.canvasHeight=d;this.fontSize=this.options.fontSize;this.algebra=new JXG.Algebra(this);
if((b!="")&&(b!=null)&&(typeof document.getElementById(b)!="undefined")){this.id=b
}else{this.id=this.generateId()}this.hooks=[];this.dependentBoards=[];this.objects={};
this.animationObjects={};this.highlightedObjects={};this.numObjects=0;this.elementsByName={};
this.mode=this.BOARD_MODE_NONE;this.updateQuality=this.BOARD_QUALITY_HIGH;this.isSuspendedRedraw=false;
this.snapToGrid=this.options.grid.snapToGrid;this.gridX=this.options.grid.gridX;this.gridY=this.options.grid.gridY;
this.gridColor=this.options.grid.gridColor;this.gridOpacity=this.options.grid.gridOpacity;
this.gridDash=this.options.grid.gridDash;this.snapSizeX=this.options.grid.snapSizeX;
this.snapSizeY=this.options.grid.snapSizeY;this.calculateSnapSizes();this.hasGrid=this.options.grid.hasGrid;
this.drag_dx=0;this.drag_dy=0;this.mousePosAbs=[0,0];this.mousePosRel=[0,0];this.drag_obj=null;
this.xmlString="";if((e!=null&&e)||(e==null&&this.options.showCopyright)){this.renderer.displayCopyright(JXG.JSXGraph.licenseText,this.options.fontSize)
}this.needsFullUpdate=false;this.reducedUpdate=false;this.geonextCompatibilityMode=false;
if(this.options.text.useASCIIMathML){if(typeof translateASCIIMath!="undefined"){init()
}else{this.options.text.useASCIIMathML=false}}JXG.addEvent(document,"mousedown",this.mouseDownListener,this);
JXG.addEvent(this.containerObj,"mousemove",this.mouseMoveListener,this);JXG.addEvent(this.containerObj,"touchstart",this.touchStartListener,this);
JXG.addEvent(this.containerObj,"touchmove",this.touchMoveListener,this);JXG.addEvent(this.containerObj,"touchend",this.touchEndListener,this)
};JXG.Board.prototype.generateName=function(c){if(c.type==JXG.OBJECT_TYPE_TICKS){return
}var h;if(c.elementClass==JXG.OBJECT_CLASS_POINT){h=["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
}else{h=["","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
}var e=3;var b="";var l="";var k="";if(c.elementClass==JXG.OBJECT_CLASS_POINT||c.elementClass==JXG.OBJECT_CLASS_LINE){}else{if(c.type==JXG.OBJECT_TYPE_POLYGON){b="P_{";
k="}"}else{if(c.type==JXG.OBJECT_TYPE_CIRCLE){b="k_{";k="}"}else{if(c.type==JXG.OBJECT_TYPE_ANGLE){b="W_{";
k="}"}else{b="s_{";k="}"}}}}var m=[];var a="";var g="";var f=0;var d=0;for(f=0;f<e;
f++){m[f]=0}while(m[e-1]<h.length){for(m[0]=1;m[0]<h.length;m[0]++){a=b;for(f=e;f>0;
f--){a+=h[m[f-1]]}if(this.elementsByName[a+k]==null){return a+k}}m[0]=h.length;for(f=1;
f<e;f++){if(m[f-1]==h.length){m[f-1]=1;m[f]++}}}return""};JXG.Board.prototype.generateId=function(){var a=1;
while(JXG.JSXGraph.boards["gxtBoard"+a]!=null){a=Math.round(Math.random()*33)}return("gxtBoard"+a)
};JXG.Board.prototype.setId=function(d,c){var b=this.numObjects,a=d.id;this.numObjects++;
if((a=="")||(a==null)){a=this.id+c+b}d.id=a;this.objects[a]=d;if(d.hasLabel){d.label.content.id=a+"Label";
this.addText(d.label.content)}return a};JXG.Board.prototype.getRelativeMouseCoordinates=function(b){var c=this.containerObj,a=JXG.getOffset(c),d;
d=parseInt(JXG.getStyle(c,"borderLeftWidth"));if(isNaN(d)){d=0}a[0]+=d;d=parseInt(JXG.getStyle(c,"borderTopWidth"));
if(isNaN(d)){d=0}a[1]+=d;d=parseInt(JXG.getStyle(c,"paddingLeft"));if(isNaN(d)){d=0
}a[0]+=d;d=parseInt(JXG.getStyle(c,"paddingTop"));if(isNaN(d)){d=0}a[1]+=d;return a
};JXG.Board.prototype.clickLeftArrow=function(a){this.origin.scrCoords[1]+=this.canvasWidth*0.1;
this.moveOrigin();return this};JXG.Board.prototype.clickRightArrow=function(a){this.origin.scrCoords[1]-=this.canvasWidth*0.1;
this.moveOrigin();return this};JXG.Board.prototype.clickUpArrow=function(a){this.origin.scrCoords[2]+=this.canvasHeight*0.1;
this.moveOrigin();return this};JXG.Board.prototype.clickDownArrow=function(a){this.origin.scrCoords[2]-=this.canvasHeight*0.1;
this.moveOrigin();return this};JXG.Board.prototype.touchStartListener=function(a){var b=document.createEvent("MouseEvents");
this.options.precision.hasPoint=this.options.precision.touch;b.initMouseEvent("mousedown",true,false,this.containerObj,0,a.targetTouches[0].screenX,a.targetTouches[0].screenY,a.targetTouches[0].clientX,a.targetTouches[0].clientY,false,false,a.targetTouches.length==1?false:true,false,0,null);
this.mouseDownListener(b)};JXG.Board.prototype.touchMoveListener=function(a){a.preventDefault();
var b=document.createEvent("MouseEvents");b.initMouseEvent("mousemove",true,false,this.containerObj,0,a.targetTouches[0].screenX,a.targetTouches[0].screenY,a.targetTouches[0].clientX,a.targetTouches[0].clientY,false,false,a.targetTouches.length==1?false:true,false,0,null);
this.mouseMoveListener(b)};JXG.Board.prototype.touchEndListener=function(a){var b=document.createEvent("MouseEvents");
b.initMouseEvent("mouseup",true,false,this.containerObj,0,0,0,0,0,false,false,false,false,0,null);
this.mouseUpListener(b);this.options.precision.hasPoint=this.options.precision.mouse
};JXG.Board.prototype.mouseUpListener=function(a){this.updateQuality=this.BOARD_QUALITY_HIGH;
JXG.removeEvent(document,"mouseup",this.mouseUpListener,this);this.mode=this.BOARD_MODE_NONE;
if(this.mode==this.BOARD_MODE_MOVE_ORIGIN){this.moveOrigin()}else{this.update()}this.drag_obj=null
};JXG.Board.prototype.mouseDownListener=function(f){var d,g,e,a,c,b;e=this.getRelativeMouseCoordinates(f);
a=JXG.getPosition(f);c=a[0]-e[0];b=a[1]-e[1];this.mousePosAbs=a;this.mousePosRel=[c,b];
if(f.shiftKey){this.drag_dx=c-this.origin.scrCoords[1];this.drag_dy=b-this.origin.scrCoords[2];
this.mode=this.BOARD_MODE_MOVE_ORIGIN;JXG.addEvent(document,"mouseup",this.mouseUpListener,this);
return}if(this.mode==this.BOARD_MODE_CONSTRUCT){return}this.mode=this.BOARD_MODE_DRAG;
if(this.mode==this.BOARD_MODE_DRAG){for(d in this.objects){g=this.objects[d];if((g.hasPoint!=undefined)&&((g.type==JXG.OBJECT_TYPE_POINT)||(g.type==JXG.OBJECT_TYPE_GLIDER))&&(g.visProp.visible)&&(!g.fixed)&&(g.hasPoint(c,b))){if((g.type==JXG.OBJECT_TYPE_POINT)||(g.type==JXG.OBJECT_TYPE_GLIDER)){this.drag_obj=this.objects[d];
if(this.options.takeFirst){break}}}}}if(this.drag_obj==null){this.mode=this.BOARD_MODE_NONE;
return}this.dragObjCoords=new JXG.Coords(JXG.COORDS_BY_SCREEN,[c,b],this);JXG.addEvent(document,"mouseup",this.mouseUpListener,this)
};JXG.Board.prototype.mouseMoveListener=function(f){var b,c,g,a,d,k,h;g=this.getRelativeMouseCoordinates(f);
a=JXG.getPosition(f);k=a[0]-g[0];h=a[1]-g[1];this.mousePosAbs=a;this.mousePosRel=[k,h];
this.updateQuality=this.BOARD_QUALITY_LOW;this.dehighlightAll(k,h);if(this.mode!=this.BOARD_MODE_DRAG){this.renderer.hide(this.infobox)
}if(this.mode==this.BOARD_MODE_MOVE_ORIGIN){this.origin.scrCoords[1]=k-this.drag_dx;
this.origin.scrCoords[2]=h-this.drag_dy;this.moveOrigin()}else{if(this.mode==this.BOARD_MODE_DRAG){d=new JXG.Coords(JXG.COORDS_BY_SCREEN,this.getScrCoordsOfMouse(k,h),this);
if(this.drag_obj.type==JXG.OBJECT_TYPE_POINT||this.drag_obj.type==JXG.OBJECT_TYPE_LINE||this.drag_obj.type==JXG.OBJECT_TYPE_CIRCLE||this.drag_obj.type==JXG.OBJECT_TYPE_CURVE){this.drag_obj.setPositionDirectly(JXG.COORDS_BY_USER,d.usrCoords[1],d.usrCoords[2]);
this.update(this.drag_obj)}else{if(this.drag_obj.type==JXG.OBJECT_TYPE_GLIDER){var e=this.drag_obj.coords;
this.drag_obj.setPositionDirectly(JXG.COORDS_BY_USER,d.usrCoords[1],d.usrCoords[2]);
if(this.drag_obj.slideObject.type==JXG.OBJECT_TYPE_CIRCLE){this.drag_obj.coords=this.algebra.projectPointToCircle(this.drag_obj,this.drag_obj.slideObject)
}else{if(this.drag_obj.slideObject.type==JXG.OBJECT_TYPE_LINE){this.drag_obj.coords=this.algebra.projectPointToLine(this.drag_obj,this.drag_obj.slideObject)
}}if(this.drag_obj.group.length!=0){this.drag_obj.group[this.drag_obj.group.length-1].dX=this.drag_obj.coords.scrCoords[1]-e.scrCoords[1];
this.drag_obj.group[this.drag_obj.group.length-1].dY=this.drag_obj.coords.scrCoords[2]-e.scrCoords[2];
this.drag_obj.group[this.drag_obj.group.length-1].update(this)}else{this.update(this.drag_obj)
}}}this.updateInfobox(this.drag_obj)}else{for(b in this.objects){c=this.objects[b];
if(c.hasPoint!=undefined&&c.visProp.visible==true&&c.hasPoint(k,h)){this.updateInfobox(c);
if(this.highlightedObjects[b]==null){c.highlight();this.highlightedObjects[b]=c}}}}}this.updateQuality=this.BOARD_QUALITY_HIGH
};JXG.Board.prototype.updateInfobox=function(b){var a,e,c,d;if(!b.showInfobox){return this
}if(b.elementClass==JXG.OBJECT_CLASS_POINT){c=b.coords.usrCoords[1]*1;d=b.coords.usrCoords[2]*1;
this.infobox.setCoords(c+this.infobox.distanceX/(this.stretchX),d+this.infobox.distanceY/(this.stretchY));
a=Math.abs(c);if(a>0.1){a=c.toFixed(2)}else{if(a>=0.01){a=c.toFixed(4)}else{if(a>=0.0001){a=c.toFixed(6)
}else{a=c}}}e=Math.abs(d);if(e>0.1){e=d.toFixed(2)}else{if(e>=0.01){e=d.toFixed(4)
}else{if(e>=0.0001){e=d.toFixed(6)}else{e=d}}}this.highlightInfobox(a,e,b);this.renderer.show(this.infobox);
this.renderer.updateText(this.infobox)}return this};JXG.Board.prototype.highlightInfobox=function(a,c,b){this.infobox.setText('<span style="color:#bbbbbb;">('+a+", "+c+")</span>");
return this};JXG.Board.prototype.dehighlightAll=function(a,d){var b,c;for(b in this.highlightedObjects){c=this.highlightedObjects[b];
if((c.hasPoint==undefined)||(!c.hasPoint(a,d))||(c.visProp.visible==false)){c.noHighlight();
delete (this.highlightedObjects[b])}}return this};JXG.Board.prototype.getScrCoordsOfMouse=function(a,c){if(this.snapToGrid){var b=new JXG.Coords(JXG.COORDS_BY_SCREEN,[a,c],this);
b.setCoordinates(JXG.COORDS_BY_USER,[Math.round((b.usrCoords[1])*this.snapSizeX)/this.snapSizeX,Math.round((b.usrCoords[2])*this.snapSizeY)/this.snapSizeY]);
return[b.scrCoords[1],b.scrCoords[2]]}else{return[a,c]}};JXG.Board.prototype.getUsrCoordsOfMouse=function(e){var c=this.getRelativeMouseCoordinates(e);
var b=JXG.getPosition(e);var a=b[0]-c[0];var f=b[1]-c[1];var d=new JXG.Coords(JXG.COORDS_BY_SCREEN,[a,f],this);
if(this.snapToGrid){d.setCoordinates(JXG.COORDS_BY_USER,[Math.round((d.usrCoords[1])*this.snapSizeX)/this.snapSizeX,Math.round((d.usrCoords[2])*this.snapSizeY)/this.snapSizeY])
}return[d.usrCoords[1],d.usrCoords[2]]};JXG.Board.prototype.getAllUnderMouse=function(b){var a=this.getAllObjectsUnderMouse(b);
a.push(this.getUsrCoordsOfMouse(b));return a};JXG.Board.prototype.getAllObjectsUnderMouse=function(g){var f=this.getRelativeMouseCoordinates(g);
var a=JXG.getPosition(g);var c=a[0]-f[0];var b=a[1]-f[1];var d=[];for(var e in this.objects){if(this.objects[e].visProp.visible&&this.objects[e].hasPoint(c,b)){d.push(this.objects[e])
}}return d};JXG.Board.prototype.setBoardMode=function(a){this.mode=a;return this};
JXG.Board.prototype.moveOrigin=function(){for(var a in this.objects){if((this.objects[a].elementClass==JXG.OBJECT_CLASS_POINT)||(this.objects[a].type==JXG.OBJECT_TYPE_CURVE)||(this.objects[a].type==JXG.OBJECT_TYPE_AXIS)||(this.objects[a].type==JXG.OBJECT_TYPE_TEXT)){if((this.objects[a].type!=JXG.OBJECT_TYPE_CURVE)&&(this.objects[a].type!=JXG.OBJECT_TYPE_AXIS)){this.objects[a].coords.usr2screen()
}}}this.clearTraces();this.fullUpdate();if(this.hasGrid){this.renderer.removeGrid(this);
this.renderer.drawGrid(this)}return this};JXG.Board.prototype.finalizeAdding=function(a){if(a.hasLabel){this.renderer.drawText(a.label.content)
}if(!a.visProp.visible){this.renderer.hide(a)}if(a.hasLabel&&!a.label.content.visProp.visible){this.renderer.hide(a.label.content)
}};JXG.Board.prototype.addPoint=function(a){var b=this.setId(a,"P");this.renderer.drawPoint(a);
this.finalizeAdding(a);return b};JXG.Board.prototype.addLine=function(a){var b=this.setId(a,"L");
this.renderer.drawLine(a);this.finalizeAdding(a);return b};JXG.Board.prototype.addCircle=function(a){var b=this.setId(a,"C");
this.renderer.drawCircle(a);this.finalizeAdding(a);return b};JXG.Board.prototype.addPolygon=function(a){var b=this.setId(a,"Py");
this.renderer.drawPolygon(a);this.finalizeAdding(a);return b};JXG.Board.prototype.addArc=function(a){var b=this.setId(a,"Ac");
this.renderer.drawArc(a);this.finalizeAdding(a);return b};JXG.Board.prototype.addSector=function(a){return this.setId(a,"Sc")
};JXG.Board.prototype.addAngle=function(a){var b=this.setId(a,"Ag");this.renderer.drawAngle(a);
this.finalizeAdding(a);return b};JXG.Board.prototype.addCurve=function(a){var b=this.setId(a,"G");
this.renderer.drawCurve(a);this.finalizeAdding(a);return b};JXG.Board.prototype.addChart=function(a){return this.setId(a,"Chart")
};JXG.Board.prototype.addArrow=function(c){var b=this.numObjects,a;this.numObjects++;
a=c.id;if((a=="")||(a==null)){a=this.id+"A"+b}this.objects[a]=c;c.id=a;this.renderer.drawArrow(c);
return a};JXG.Board.prototype.addNormal=function(e,c,b,a){var m=JXG.getReference(this,c);
var n=JXG.getReference(this,e);var f=this.numObjects;f++;if((b=="")||(b==null)){b=this.id+"L"+f
}var k=this.algebra.perpendicular(n,m);var g=k[0].usrCoords.slice(1);var h=new JXG.Point(this,g,b+"P2","",false);
h.fixed=true;m.addChild(h);n.addChild(h);var d;if(k[1]){d=new JXG.Line(this,h.id,m.id,b,a)
}else{d=new JXG.Line(this,m.id,h.id,b,a)}d.changed=k[1];d.update=function(){if(this.needsUpdate){var q=this.board.algebra.perpendicular(n,m);
h.coords=q[0];if(this.changed!=q[1]){var l=this.point1;this.point1=this.point2;this.point2=l
}this.updateStdform();if(this.traced){this.cloneToBackground(true)}}};return d};JXG.Board.prototype.addIntersection=function(c){var b=this.numObjects;
this.numObjects++;var a=c.id;if((a=="")||(a==null)){a=this.id+"I"+b}this.objects[a]=c;
c.id=a;c.intersect1.addChild(c);c.intersect2.addChild(c);return a};JXG.Board.prototype.addText=function(c){var b=this.numObjects;
this.numObjects++;var a=c.id;if((a=="")||(a==null)){a=this.id+"T"+b}this.objects[a]=c;
c.id=a;if(!c.isLabel){this.renderer.drawText(c);if(!c.visProp.visible){this.renderer.hide(c)
}}return a};JXG.Board.prototype.addConditions=function(l){var k=null;var b="var el,x,y,c;\n";
var h=l.indexOf("<data>");var g=l.indexOf("</data>");if(h<0){return}while(h>=0){var f=l.slice(h+6,g);
var e=f.indexOf("=");var d=f.slice(0,e);var q=f.slice(e+1);e=d.indexOf(".");var a=d.slice(0,e);
var c=this.elementsByName[JXG.unescapeHTML(a)];var n=d.slice(e+1).replace(/\s+/g,"").toLowerCase();
q=this.algebra.geonext2JS(q);q=q.replace(/this\.board\./g,"this.");if(typeof this.elementsByName[a]=="undefined"){alert("debug conditions: |"+a+"| undefined")
}b+='el = this.objects["'+c.id+'"];\n';switch(n){case"x":b+="y=el.coords.usrCoords[2];\n";
b+="el.setPositionDirectly(JXG.COORDS_BY_USER,"+(q)+",y);\n";b+="el.update();\n";
break;case"y":b+="x=el.coords.usrCoords[1];\n";b+="el.coords=new JXG.Coords(JXG.COORDS_BY_USER,[x,"+(q)+"],this);\n";
break;case"visible":b+="c="+(q)+";\n";b+="if (c) {el.showElement();} else {el.hideElement();}\n";
break;case"position":b+="el.position = "+(q)+";\n";b+="el.update();\n";break;case"stroke":b+="el.strokeColor = "+(q)+";\n";
break;case"strokewidth":b+="el.strokeWidth = "+(q)+";\n";break;case"label":break;
default:alert("property '"+n+"' in conditions not implemented:"+q);break}l=l.slice(g+7);
h=l.indexOf("<data>");g=l.indexOf("</data>")}b+="this.prepareUpdate();\n";b+="this.updateElements();\n";
b+="return true;\n";this.updateConditions=new Function(b);this.updateConditions()
};JXG.Board.prototype.updateConditions=function(){return false};JXG.Board.prototype.addImage=function(c){var b=this.numObjects;
this.numObjects++;var a=c.id;if((a=="")||(a==null)){a=this.id+"Im"+b}this.objects[a]=c;
this.elementsByName[c.name]=c;c.id=a;this.renderer.drawImage(c);if(!c.visProp.visible){this.renderer.hide(c)
}return a};JXG.Board.prototype.calculateSnapSizes=function(){var c=new JXG.Coords(JXG.COORDS_BY_USER,[0,0],this),b=new JXG.Coords(JXG.COORDS_BY_USER,[1/this.gridX,1/this.gridY],this),a=c.scrCoords[1]-b.scrCoords[1],d=c.scrCoords[2]-b.scrCoords[2];
this.snapSizeX=this.gridX;while(Math.abs(a)>25){this.snapSizeX*=2;a/=2}this.snapSizeY=this.gridY;
while(Math.abs(d)>25){this.snapSizeY*=2;d/=2}return this};JXG.Board.prototype.applyZoom=function(){var a;
for(a in this.objects){if((this.objects[a].elementClass==JXG.OBJECT_CLASS_POINT)||(this.objects[a].type==JXG.OBJECT_TYPE_CURVE)||(this.objects[a].type==JXG.OBJECT_TYPE_AXIS)||(this.objects[a].type==JXG.OBJECT_TYPE_TEXT)){if((this.objects[a].type!=JXG.OBJECT_TYPE_CURVE)&&(this.objects[a].type!=JXG.OBJECT_TYPE_AXIS)){this.objects[a].coords.usr2screen()
}}}this.calculateSnapSizes();this.clearTraces();this.fullUpdate();if(this.hasGrid){this.renderer.removeGrid(this);
this.renderer.drawGrid(this)}return this};JXG.Board.prototype.zoomIn=function(){var b,a;
this.zoomX*=this.options.zoom.factor;this.zoomY*=this.options.zoom.factor;b=this.origin.scrCoords[1]*this.options.zoom.factor;
a=this.origin.scrCoords[2]*this.options.zoom.factor;this.origin=new JXG.Coords(JXG.COORDS_BY_SCREEN,[b,a],this);
this.stretchX=this.zoomX*this.unitX;this.stretchY=this.zoomY*this.unitY;this.applyZoom();
return this};JXG.Board.prototype.zoomOut=function(){var b,a;this.zoomX/=this.options.zoom.factor;
this.zoomY/=this.options.zoom.factor;b=this.origin.scrCoords[1]/this.options.zoom.factor;
a=this.origin.scrCoords[2]/this.options.zoom.factor;this.origin=new JXG.Coords(JXG.COORDS_BY_SCREEN,[b,a],this);
this.stretchX=this.zoomX*this.unitX;this.stretchY=this.zoomY*this.unitY;this.applyZoom();
return this};JXG.Board.prototype.zoom100=function(){var d,b,c,a;c=this.zoomX;a=this.zoomY;
this.zoomX=1;this.zoomY=1;d=this.origin.scrCoords[1]/c;b=this.origin.scrCoords[2]/a;
this.origin=new JXG.Coords(JXG.COORDS_BY_SCREEN,[d,b],this);this.stretchX=this.zoomX*this.unitX;
this.stretchY=this.zoomY*this.unitY;this.applyZoom();return this};JXG.Board.prototype.zoomAllPoints=function(){var m,h,d,g,b,f,k,s,r,q,n,l,e,c,a,u;
m=this.zoomX/this.zoomY;h=0;d=0;g=0;b=0;for(f in this.objects){if((this.objects[f].elementClass==JXG.OBJECT_CLASS_POINT)&&this.objects[f].visProp.visible){if(this.objects[f].coords.usrCoords[1]<h){h=this.objects[f].coords.usrCoords[1]
}else{if(this.objects[f].coords.usrCoords[1]>d){d=this.objects[f].coords.usrCoords[1]
}}if(this.objects[f].coords.usrCoords[2]>b){b=this.objects[f].coords.usrCoords[2]
}else{if(this.objects[f].coords.usrCoords[2]<g){g=this.objects[f].coords.usrCoords[2]
}}}}k=50;s=k/(this.unitX*this.zoomX);r=k/(this.unitY*this.zoomY);q=d-h+2*s;n=b-g+2*r;
l=Math.min(this.canvasWidth/(this.unitX*q),this.canvasHeight/(this.unitY*n));c=l;
e=l*m;a=-(h-s)*this.unitX*e;u=(b+r)*this.unitY*c;this.origin=new JXG.Coords(JXG.COORDS_BY_SCREEN,[a,u],this);
this.zoomX=e;this.zoomY=c;this.stretchX=this.zoomX*this.unitX;this.stretchY=this.zoomY*this.unitY;
this.applyZoom();return this};JXG.Board.prototype.removeObject=function(a){var c,b;
if(JXG.isArray(a)){for(b=0;b<a.length;b++){this.removeObject(a[b])}}a=JXG.getReference(this,a);
if(a==undefined){return this}try{for(c in a.childElements){a.childElements[c].board.removeObject(a.childElements[c])
}for(c in this.objects){if(typeof this.objects[c].childElements!="undefined"){delete (this.objects[c].childElements[a.id])
}}delete (this.objects[a.id]);delete (this.elementsByName[a.name]);if(a.remove!=undefined){a.remove()
}}catch(d){}return this};JXG.Board.prototype.initGeonextBoard=function(){var e,d,c,b,a;
e=new JXG.Point(this,[0,0],this.id+"gOOe0","Ursprung",false);e.fixed=true;d=new JXG.Point(this,[1,0],this.id+"gXOe0","Punkt_1_0",false);
d.fixed=true;c=new JXG.Point(this,[0,1],this.id+"gYOe0","Punkt_0_1",false);c.fixed=true;
b=new JXG.Line(this,this.id+"gOOe0",this.id+"gXOe0",this.id+"gXLe0","X-Achse");b.hideElement();
a=new JXG.Line(this,this.id+"gOOe0",this.id+"gYOe0",this.id+"gYLe0","Y-Achse");a.hideElement();
return this};JXG.Board.prototype.initInfobox=function(){this.infobox=new JXG.Text(this,"0,0","",[0,0],this.id+"__infobox",null,null,false,"html");
this.infobox.distanceX=-20;this.infobox.distanceY=25;this.renderer.hide(this.infobox);
return this};JXG.Board.prototype.resizeContainer=function(a,b){this.canvasWidth=1*a;
this.canvasHeight=1*b;this.containerObj.style.width=(this.canvasWidth)+"px";this.containerObj.style.height=(this.canvasHeight)+"px";
return this};JXG.Board.prototype.showDependencies=function(){var d,b,g,e,a;b="<p>\n";
for(d in this.objects){a=0;for(g in this.objects[d].childElements){a++}if(a>=0){b+="<b>"+this.objects[d].id+":</b> "
}for(g in this.objects[d].childElements){b+=this.objects[d].childElements[g].id+"("+this.objects[d].childElements[g].name+"), "
}b+="<p>\n"}b+="</p>\n";e=window.open();e.document.open();e.document.write(b);e.document.close();
return this};JXG.Board.prototype.showXML=function(){var a=window.open("");a.document.open();
a.document.write("<pre>"+JXG.escapeHTML(this.xmlString)+"</pre>");a.document.close();
return this};JXG.Board.prototype.prepareUpdate=function(b){var a;for(a in this.objects){this.objects[a].needsUpdate=true
}return this};JXG.Board.prototype.updateElements=function(b){var a,d,c=true;b=JXG.getReference(this,b);
if(b==null){c=false}for(a in this.objects){d=this.objects[a];if(b!=null&&d.id!=b.id){c=false
}if(!(c||this.needsFullUpdate||d.needsRegularUpdate)){continue}if(b==null||d.id!=b.id){d.update(true)
}else{d.update(false)}}return this};JXG.Board.prototype.updateRenderer=function(b){var a,c;
b=JXG.getReference(this,b);for(a in this.objects){c=this.objects[a];if(!this.needsFullUpdate&&!c.needsRegularUpdate){continue
}if(b==null||c.id!=b.id){c.updateRenderer()}else{c.updateRenderer()}}return this};
JXG.Board.prototype.addHook=function(a){this.hooks.push(a);a(this);return(this.hooks.length-1)
};JXG.Board.prototype.removeHook=function(a){this.hooks[a]=null;return this};JXG.Board.prototype.updateHooks=function(){var a;
for(a=0;a<this.hooks.length;a++){if(this.hooks[a]!=null){this.hooks[a](this)}}return this
};JXG.Board.prototype.addChild=function(a){this.dependentBoards.push(a);this.update();
return this};JXG.Board.prototype.removeChild=function(b){var a;for(a=this.dependentBoards.length-1;
a>=0;a--){if(this.dependentBoards[a]==b){this.dependentBoards.splice(a,1)}}return this
};JXG.Board.prototype.update=function(c){var b,a,d;if(this.isSuspendedUpdate){return this
}this.prepareUpdate(c).updateElements(c).updateConditions();this.renderer.suspendRedraw();
this.updateRenderer(c);this.renderer.unsuspendRedraw();this.updateHooks();a=this.dependentBoards.length;
for(b=0;b<a;b++){d=this.dependentBoards[b].id;if(JXG.JSXGraph.boards[d]!=this){JXG.JSXGraph.boards[d].updateQuality=this.updateQuality;
JXG.JSXGraph.boards[d].prepareUpdate(c).updateElements(c).updateConditions();JXG.JSXGraph.boards[d].renderer.suspendRedraw();
JXG.JSXGraph.boards[d].updateRenderer(c);JXG.JSXGraph.boards[d].renderer.unsuspendRedraw();
JXG.JSXGraph.boards[d].updateHooks()}}return this};JXG.Board.prototype.fullUpdate=function(){this.needsFullUpdate=true;
this.update();this.needsFullUpdate=false;return this};JXG.Board.prototype.createElement=function(b,c,a){var f,d,e;
if(b!="turtle"&&(c==null||c.length==0)){return null}if(c==null){c=[]}b=b.toLowerCase();
if(a==null){a={}}for(d=0;d<c.length;d++){c[d]=JXG.getReference(this,c[d])}if(JXG.JSXGraph.elements[b]!=null){if(typeof JXG.JSXGraph.elements[b]=="function"){f=JXG.JSXGraph.elements[b](this,c,a)
}else{f=JXG.JSXGraph.elements[b].creator(this,c,a)}}else{throw new Error("JSXGraph: JXG.createElement: Unknown element type given: "+b)
}if(f==undefined){return}if(JXG.isArray(a)){a=a[0]}if(f.multipleElements){for(e in f){if(typeof f[e].setProperty!="undefined"){f[e].setProperty(a)
}}}else{if(typeof f.setProperty!="undefined"){f.setProperty(a)}}this.update(f);return f
};JXG.Board.prototype.create=JXG.Board.prototype.createElement;JXG.Board.prototype.clearTraces=function(){var a;
for(a in this.objects){if(this.objects[a].traced){this.objects[a].clearTrace()}}return this
};JXG.Board.prototype.beforeLoad=function(){};JXG.Board.prototype.afterLoad=function(){};
JXG.Board.prototype.suspendUpdate=function(){this.isSuspendedUpdate=true};JXG.Board.prototype.unsuspendUpdate=function(){this.isSuspendedUpdate=false;
this.update()};JXG.Board.prototype.setBoundingBox=function(f,d){if(!JXG.isArray(f)){return
}var e,c,b,a;c=this.canvasWidth;e=this.canvasHeight;if(d){this.unitX=c/(f[2]-f[0]);
this.unitY=e/(-f[3]+f[1]);if(this.unitX<this.unitY){this.unitY=this.unitX}else{this.unitX=this.unitY
}}else{this.unitX=c/(f[2]-f[0]);this.unitY=e/(-f[3]+f[1])}b=-this.unitX*f[0]*this.zoomX;
a=this.unitY*f[1]*this.zoomY;this.origin=new JXG.Coords(JXG.COORDS_BY_SCREEN,[b,a],this);
this.stretchX=this.zoomX*this.unitX;this.stretchY=this.zoomY*this.unitY;this.moveOrigin();
return this};JXG.Board.prototype.animate=function(){var d=0,a,h,g,b,f,k,e=null;for(a in this.animationObjects){if(this.animationObjects[a]==null){continue
}d++;h=this.animationObjects[a];if(h.animationPath){g=h.animationPath.pop();if(typeof g=="undefined"){delete (h.animationPath)
}else{h.setPositionDirectly(JXG.COORDS_BY_USER,g[0],g[1]);h.prepareUpdate().update().updateRenderer();
e=h}}if(h.animationData){k=0;for(b in h.animationData){f=h.animationData[b].pop();
if(typeof f=="undefined"){delete (h.animationData[f])}else{k++;h.setProperty(b+":"+f)
}}if(k==0){delete (h.animationData)}}if(typeof h.animationData=="undefined"&&typeof h.animationPath=="undefined"){this.animationObjects[a]=null;
delete (this.animationObjects[a])}}if(d==0){window.clearInterval(this.animationIntervalCode);
delete (this.animationIntervalCode)}else{this.update(e)}};JXG.Options={fontSize:12,showCopyright:true,showNavigation:true,takeSizeFromFile:false,renderer:"svg",grid:{hasGrid:false,gridX:2,gridY:2,gridColor:"#C0C0C0",gridOpacity:"0.5",gridDash:true,snapToGrid:false,snapSizeX:2,snapSizeY:2},zoom:{factor:1.25},elements:{strokeColor:"#0000ff",highlightStrokeColor:"#C3D9FF",fillColor:"none",highlightFillColor:"none",strokeOpacity:1,highlightStrokeOpacity:1,fillOpacity:1,highlightFillOpacity:1,strokeWidth:"2px",withLabel:false,draft:{draft:false,color:"#565656",opacity:0.8,strokeWidth:"1px"}},point:{withLabel:true,style:5,fillColor:"#ff0000",highlightFillColor:"#EEEEEE",strokeWidth:"2px",strokeColor:"#ff0000",highlightStrokeColor:"#C3D9FF",zoom:false},line:{firstArrow:false,lastArrow:false,straightFirst:true,straightLast:true,fillColor:"#000000",highlightFillColor:"none",strokeColor:"#0000ff",highlightStrokeColor:"#888888",ticks:{drawLabels:true,drawZero:false,insertTicks:false,minTicksDistance:50,maxTicksDistance:300,minorHeight:4,majorHeight:10,minorTicks:4,defaultDistance:1}},axis:{strokeColor:"#666666",highlightStrokeColor:"#888888"},circle:{fillColor:"none",highlightFillColor:"none",strokeColor:"#0000ff",highlightStrokeColor:"#C3D9FF"},conic:{fillColor:"none",highlightFillColor:"none",strokeColor:"#0000ff",highlightStrokeColor:"#C3D9FF"},angle:{withLabel:true,radius:1,fillColor:"#FF7F00",highlightFillColor:"#FF7F00",strokeColor:"#FF7F00",fillOpacity:0.3,highlightFillOpacity:0.3},arc:{firstArrow:false,lastArrow:false,fillColor:"none",highlightFillColor:"none",strokeColor:"#0000ff",highlightStrokeColor:"#C3D9FF"},polygon:{fillColor:"#00FF00",highlightFillColor:"#00FF00",fillOpacity:0.3,highlightFillOpacity:0.3},sector:{fillColor:"#00FF00",highlightFillColor:"#00FF00",fillOpacity:0.3,highlightFillOpacity:0.3},text:{strokeColor:"#000000",useASCIIMathML:false,defaultDisplay:"html"},curve:{strokeWidth:"1px",strokeColor:"#0000ff",RDPsmoothing:false,numberPointsHigh:1600,numberPointsLow:400,doAdvancedPlot:true},precision:{touch:20,mouse:4,epsilon:0.0001,hasPoint:4},layer:{numlayers:20,text:9,point:9,arc:8,line:7,circle:6,curve:5,polygon:4,sector:3,angle:2,grid:1,image:0}};
JXG.useStandardOptions=function(d){var e=JXG.Options,c=d.hasGrid,b,a;d.hasGrid=e.grid.hasGrid;
d.gridX=e.grid.gridX;d.gridY=e.grid.gridY;d.gridColor=e.grid.gridColor;d.gridOpacity=e.grid.gridOpacity;
d.gridDash=e.grid.gridDash;d.snapToGrid=e.grid.snapToGrid;d.snapSizeX=e.grid.SnapSizeX;
d.snapSizeY=e.grid.SnapSizeY;d.takeSizeFromFile=e.takeSizeFromFile;for(b in d.objects){p=d.objects[b];
if(p.elementClass==JXG.OBJECT_CLASS_POINT){p.visProp.fillColor=e.point.fillColor;
p.visProp.highlightFillColor=e.point.highlightFillColor;p.visProp.strokeColor=e.point.strokeColor;
p.visProp.highlightStrokeColor=e.point.highlightStrokeColor}else{if(p.elementClass==JXG.OBJECT_CLASS_LINE){p.visProp.fillColor=e.line.fillColor;
p.visProp.highlightFillColor=e.line.highlightFillColor;p.visProp.strokeColor=e.line.strokeColor;
p.visProp.highlightStrokeColor=e.line.highlightStrokeColor;for(a in p.ticks){a.majorTicks=e.line.ticks.majorTicks;
a.minTicksDistance=e.line.ticks.minTicksDistance;a.minorHeight=e.line.ticks.minorHeight;
a.majorHeight=e.line.ticks.majorHeight}}else{if(p.elementClass==JXG.OBJECT_CLASS_CIRCLE){p.visProp.fillColor=e.circle.fillColor;
p.visProp.highlightFillColor=e.circle.highlightFillColor;p.visProp.strokeColor=e.circle.strokeColor;
p.visProp.highlightStrokeColor=e.circle.highlightStrokeColor}else{if(p.type==JXG.OBJECT_TYPE_ANGLE){p.visProp.fillColor=e.angle.fillColor;
p.visProp.highlightFillColor=e.angle.highlightFillColor;p.visProp.strokeColor=e.angle.strokeColor
}else{if(p.type==JXG.OBJECT_TYPE_ARC){p.visProp.fillColor=e.arc.fillColor;p.visProp.highlightFillColor=e.arc.highlightFillColor;
p.visProp.strokeColor=e.arc.strokeColor;p.visProp.highlightStrokeColor=e.arc.highlightStrokeColor
}else{if(p.type==JXG.OBJECT_TYPE_POLYGON){p.visProp.fillColor=e.polygon.fillColor;
p.visProp.highlightFillColor=e.polygon.highlightFillColor;p.visProp.fillOpacity=e.polygon.fillOpacity;
p.visProp.highlightFillOpacity=e.polygon.highlightFillOpacity}else{if(p.type==JXG.OBJECT_TYPE_CURVE){p.visProp.strokeColor=e.curve.strokeColor
}}}}}}}}for(b in d.objects){p=d.objects[b];if(p.type==JXG.OBJECT_TYPE_SECTOR){p.arc.visProp.fillColor=e.sector.fillColor;
p.arc.visProp.highlightFillColor=e.sector.highlightFillColor;p.arc.visProp.fillOpacity=e.sector.fillOpacity;
p.arc.visProp.highlightFillOpacity=e.sector.highlightFillOpacity}}d.fullUpdate();
if(c&&d.hasGrid){d.renderer.removeGrid(d);d.renderer.drawGrid(d)}else{if(c&&!d.hasGrid){d.renderer.removeGrid(d)
}else{if(!c&&d.hasGrid){d.renderer.drawGrid(d)}}}};JXG.useBlackWhiteOptions=function(a){o=JXG.Options;
o.point.fillColor=JXG.rgb2bw(o.point.fillColor);o.point.highlightFillColor=JXG.rgb2bw(o.point.highlightFillColor);
o.point.strokeColor=JXG.rgb2bw(o.point.strokeColor);o.point.highlightStrokeColor=JXG.rgb2bw(o.point.highlightStrokeColor);
o.line.fillColor=JXG.rgb2bw(o.line.fillColor);o.line.highlightFillColor=JXG.rgb2bw(o.line.highlightFillColor);
o.line.strokeColor=JXG.rgb2bw(o.line.strokeColor);o.line.highlightStrokeColor=JXG.rgb2bw(o.line.highlightStrokeColor);
o.circle.fillColor=JXG.rgb2bw(o.circle.fillColor);o.circle.highlightFillColor=JXG.rgb2bw(o.circle.highlightFillColor);
o.circle.strokeColor=JXG.rgb2bw(o.circle.strokeColor);o.circle.highlightStrokeColor=JXG.rgb2bw(o.circle.highlightStrokeColor);
o.arc.fillColor=JXG.rgb2bw(o.arc.fillColor);o.arc.highlightFillColor=JXG.rgb2bw(o.arc.highlightFillColor);
o.arc.strokeColor=JXG.rgb2bw(o.arc.strokeColor);o.arc.highlightStrokeColor=JXG.rgb2bw(o.arc.highlightStrokeColor);
o.polygon.fillColor=JXG.rgb2bw(o.polygon.fillColor);o.polygon.highlightFillColor=JXG.rgb2bw(o.polygon.highlightFillColor);
o.sector.fillColor=JXG.rgb2bw(o.sector.fillColor);o.sector.highlightFillColor=JXG.rgb2bw(o.sector.highlightFillColor);
o.curve.strokeColor=JXG.rgb2bw(o.curve.strokeColor);o.grid.gridColor=JXG.rgb2bw(o.grid.gridColor);
JXG.useStandardOptions(a)};JXG.rgb2bw=function(c){if(c=="none"){return c}var b,e="0123456789ABCDEF",d,a;
a=JXG.rgbParser(c);b=0.3*a[0]+0.59*a[1]+0.11*a[2];d=e.charAt((b>>4)&15)+e.charAt(b&15);
c="#"+d+""+d+""+d;return c};JXG.simulateColorBlindness=function(b,a){o=JXG.Options;
o.point.fillColor=JXG.rgb2cb(o.point.fillColor,a);o.point.highlightFillColor=JXG.rgb2cb(o.point.highlightFillColor,a);
o.point.strokeColor=JXG.rgb2cb(o.point.strokeColor,a);o.point.highlightStrokeColor=JXG.rgb2cb(o.point.highlightStrokeColor,a);
o.line.fillColor=JXG.rgb2cb(o.line.fillColor,a);o.line.highlightFillColor=JXG.rgb2cb(o.line.highlightFillColor,a);
o.line.strokeColor=JXG.rgb2cb(o.line.strokeColor,a);o.line.highlightStrokeColor=JXG.rgb2cb(o.line.highlightStrokeColor,a);
o.circle.fillColor=JXG.rgb2cb(o.circle.fillColor,a);o.circle.highlightFillColor=JXG.rgb2cb(o.circle.highlightFillColor,a);
o.circle.strokeColor=JXG.rgb2cb(o.circle.strokeColor,a);o.circle.highlightStrokeColor=JXG.rgb2cb(o.circle.highlightStrokeColor,a);
o.arc.fillColor=JXG.rgb2cb(o.arc.fillColor,a);o.arc.highlightFillColor=JXG.rgb2cb(o.arc.highlightFillColor,a);
o.arc.strokeColor=JXG.rgb2cb(o.arc.strokeColor,a);o.arc.highlightStrokeColor=JXG.rgb2cb(o.arc.highlightStrokeColor,a);
o.polygon.fillColor=JXG.rgb2cb(o.polygon.fillColor,a);o.polygon.highlightFillColor=JXG.rgb2cb(o.polygon.highlightFillColor,a);
o.sector.fillColor=JXG.rgb2cb(o.sector.fillColor,a);o.sector.highlightFillColor=JXG.rgb2cb(o.sector.highlightFillColor,a);
o.curve.strokeColor=JXG.rgb2cb(o.curve.strokeColor,a);o.grid.gridColor=JXG.rgb2cb(o.grid.gridColor,a);
JXG.useStandardOptions(b)};JXG.rgb2cb=function(f,n){if(f=="none"){return f}var r,e,d,w,q,k,c,v,h,b,u,g;
q=JXG.rgb2LMS(f);e=q.l;d=q.m;w=q.s;n=n.toLowerCase();switch(n){case"protanopia":c=-0.06150039994295001;
v=0.08277001656812001;h=-0.013200141220000003;b=0.05858939668799999;u=-0.07934519995360001;
g=0.013289415272000003;inflection=0.6903216543277437;k=w/d;if(k<inflection){e=-(v*d+h*w)/c
}else{e=-(u*d+g*w)/b}break;case"tritanopia":c=-0.00058973116217;v=0.007690316482;
h=-0.01011703519052;b=0.025495080838999994;u=-0.0422740347;g=0.017005316784;inflection=0.8349489908460004;
k=d/e;if(k<inflection){w=-(c*e+v*d)/h}else{w=-(b*e+u*d)/g}break;default:c=-0.06150039994295001;
v=0.08277001656812001;h=-0.013200141220000003;b=0.05858939668799999;u=-0.07934519995360001;
g=0.013289415272000003;inflection=0.5763833686400911;k=w/e;if(k<inflection){d=-(c*e+h*w)/v
}else{d=-(b*e+g*w)/u}break}r=JXG.LMS2rgb(e,d,w);var a="0123456789ABCDEF";k=a.charAt((r.r>>4)&15)+a.charAt(r.r&15);
f="#"+k;k=a.charAt((r.g>>4)&15)+a.charAt(r.g&15);f+=k;k=a.charAt((r.b>>4)&15)+a.charAt(r.b&15);
f+=k;return f};JXG.loadOptionsFromFile=function(b,c,a){this.cbp=function(d){this.parseString(d,c,a)
};this.cb=JXG.bind(this.cbp,this);JXG.FileReader.parseFileContent(b,this.cb,"raw")
};JXG.parseOptionsString=function(text,applyTo,board){var newOptions="";if(text!=""){newOptions=eval("("+text+")")
}else{return}var maxDepth=10;var applyOption=function(base,option,depth){if(depth==10){return
}depth++;for(var key in option){if((JXG.isNumber(option[key]))||(JXG.isArray(option[key]))||(JXG.isString(option[key]))||(option[key]==true)||(option[key]==false)){base[key]=option[key]
}else{applyOption(base[key],option[key],depth)}}};applyOption(this,newOptions,0);
if(applyTo&&typeof board!="undefined"){JXG.useStandardOptions(board)}};JXG.JSXGraph=new function(){var e,b,d,a;
this.licenseText="JSXGraph v0.81rc1 Copyright (C) see http://jsxgraph.org";this.rendererType="";
this.boards={};this.elements={};if((typeof forceRenderer=="undefined")||(forceRenderer==null)||(forceRenderer=="")){e=navigator.appVersion.match(/MSIE (\d\.\d)/);
b=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);if((!e)||(b)){JXG.Options.renderer="svg"
}else{JXG.Options.renderer="vml";function c(f){document.body.scrollLeft;document.body.scrollTop
}document.onmousemove=c}}else{this.rendererType=forceRenderer}a=JXG.rendererFiles[JXG.Options.renderer].split(",");
for(d=0;d<a.length;d++){(function(f){JXG.require(JXG.requirePath+f+".js")})(a[d])
}this.initBoard=function(l,g){var r,C,B,v,s,y,k,f,A,z,x,u,q,m,n;f=JXG.getDimensions(l);
if(typeof g=="undefined"){g={}}if(typeof g.boundingbox!="undefined"){A=g.boundingbox;
y=parseInt(f.width);k=parseInt(f.height);if(g.keepaspectratio){v=y/(A[2]-A[0]);s=k/(-A[3]+A[1]);
if(v<s){s=v}else{v=s}}else{v=y/(A[2]-A[0]);s=k/(-A[3]+A[1])}C=-v*A[0];B=s*A[1]}else{C=((typeof g.originX)=="undefined"?150:g.originX);
B=((typeof g.originY)=="undefined"?150:g.originY);v=((typeof g.unitX)=="undefined"?50:g.unitX);
s=((typeof g.unitY)=="undefined"?50:g.unitY)}z=((typeof g.zoom)=="undefined"?1:g.zoom);
x=z*((typeof g.zoomX)=="undefined"?1:g.zoomX);u=z*((typeof g.zoomY)=="undefined"?1:g.zoomY);
q=((typeof g.showCopyright)=="undefined"?JXG.Options.showCopyright:g.showCopyright);
if(JXG.Options.renderer=="svg"){r=new JXG.SVGRenderer(document.getElementById(l))
}else{if(JXG.Options.renderer=="vml"){r=new JXG.VMLRenderer(document.getElementById(l))
}else{r=new JXG.SilverlightRenderer(document.getElementById(l),f.width,f.height)}}n=new JXG.Board(l,r,"",[C,B],1,1,v,s,f.width,f.height,q);
this.boards[n.id]=n;n.initInfobox();if((typeof g.axis!="undefined")&&g.axis){n.defaultAxes={};
n.defaultAxes.x=n.create("axis",[[0,0],[1,0]],{});n.defaultAxes.y=n.create("axis",[[0,0],[0,1]],{})
}if((typeof g.grid!="undefined")&&g.grid){n.renderer.drawGrid(n)}if(typeof g.shownavigation!="undefined"){g.showNavigation=g.shownavigation
}m=((typeof g.showNavigation)=="undefined"?n.options.showNavigation:g.showNavigation);
if(m){n.renderer.drawZoomBar(n)}return n};this.loadBoardFromFile=function(k,f,m){var l,g,h;
if(JXG.Options.renderer=="svg"){l=new JXG.SVGRenderer(document.getElementById(k))
}else{l=new JXG.VMLRenderer(document.getElementById(k))}h=JXG.getDimensions(k);g=new JXG.Board(k,l,"",[150,150],1,1,50,50,h.width,h.height);
g.initInfobox();g.beforeLoad();JXG.FileReader.parseFileContent(f,g,m);if(g.options.showNavigation){g.renderer.drawZoomBar(g)
}this.boards[g.id]=g;return g};this.loadBoardFromString=function(k,f,m){var l,h,g;
if(JXG.Options.renderer=="svg"){l=new JXG.SVGRenderer(document.getElementById(k))
}else{l=new JXG.VMLRenderer(document.getElementById(k))}h=JXG.getDimensions(k);g=new JXG.Board(k,l,"",[150,150],1,1,50,50,h.width,h.height);
g.initInfobox();g.beforeLoad();JXG.FileReader.parseString(f,g,m,true);if(g.options.showNavigation){g.renderer.drawZoomBar(g)
}this.boards[g.id]=g;return g};this.freeBoard=function(g){var f;if(typeof(g)=="string"){g=this.boards[g]
}JXG.removeEvent(document,"mousedown",g.mouseDownListener,g);JXG.removeEvent(document,"mouseup",g.mouseUpListener,g);
JXG.removeEvent(g.containerObj,"mousemove",g.mouseMoveListener,g);for(f in g.objects){g.removeObject(g.objects[f])
}g.containerObj.innerHTML="";for(f in g.objects){delete (g.objects[f])}delete (g.renderer);
delete (g.algebra);delete (this.boards[g.id])};this.registerElement=function(f,g){f=f.toLowerCase();
this.elements[f]=g;if(JXG.Board.prototype["_"+f]){throw new Error("JSXGraph: Can't create wrapper method in JXG.Board because member '_"+f+"' already exists'")
}JXG.Board.prototype["_"+f]=function(k,h){return this.create(f,k,h)}};this.unregisterElement=function(f){delete (this.elements[f.toLowerCase()]);
delete (JXG.Board.prototype["_"+f.toLowerCase()])}};JXG.getReference=function(b,a){if(typeof(a)=="string"){if(b.objects[a]!=null){a=b.objects[a]
}else{if(b.elementsByName[a]!=null){a=b.elementsByName[a]}}}return a};JXG.isString=function(a){return typeof a=="string"
};JXG.isNumber=function(a){return typeof a=="number"};JXG.isFunction=function(a){return typeof a=="function"
};JXG.isArray=function(a){return a!=null&&typeof a=="object"&&"splice" in a&&"join" in a
};JXG.isPoint=function(a){if(typeof a=="object"){return(a.elementClass==JXG.OBJECT_CLASS_POINT)
}return false};JXG.str2Bool=function(a){if(a==undefined||a==null){return true}if(typeof a=="boolean"){return a
}if(a.toLowerCase()!="true"){return false}else{return true}};JXG._board=function(b,a){return JXG.JSXGraph.initBoard(b,a)
};JXG.createEvalFunction=function(b,e,g){var c=[],a,d;for(a=0;a<g;a++){if(typeof e[a]=="string"){d=b.algebra.geonext2JS(e[a]);
d=d.replace(/this\.board\./g,"board.");c[a]=new Function("","return "+(d)+";")}}return function(h){var f=e[h];
if(typeof f=="string"){return c[h]()}else{if(typeof f=="function"){return f()}else{if(typeof f=="number"){return f
}}}return 0}};JXG.createFunction=function(b,c,d,e){var a;if((e==null||e==true)&&JXG.isString(b)){a=c.algebra.geonext2JS(b);
return new Function(d,"return "+a+";")}else{if(JXG.isFunction(b)){return b}else{if(JXG.isNumber(b)){return function(){return b
}}else{if(JXG.isString(b)){return function(){return b}}}}}return null};JXG.readOption=function(a,c,b){var d=a.elements[b];
if(typeof a[c][b]!="undefined"){d=a[c][b]}return d};JXG.checkAttributes=function(c,b){var a;
if(c==null){c={}}for(a in b){if(c[a]==null||typeof c[a]=="undefined"){c[a]=b[a]}}return c
};JXG.getDimensions=function(f){var e,h,c,k,g,b,a,d;e=document.getElementById(f);
if(e==null){throw new Error("\nJSXGraph: HTML container element '"+(f)+"' not found.")
}h=e.style.display;if(h!="none"&&h!=null){return{width:e.offsetWidth,height:e.offsetHeight}
}c=e.style;k=c.visibility;g=c.position;b=c.display;c.visibility="hidden";c.position="absolute";
c.display="block";a=e.clientWidth;d=e.clientHeight;c.display=b;c.position=g;c.visibility=k;
return{width:a,height:d}};JXG.addEvent=function(d,c,b,a){a["x_internal"+c]=function(){return b.apply(a,arguments)
};if(typeof d.addEventListener!="undefined"){d.addEventListener(c,a["x_internal"+c],false)
}else{d.attachEvent("on"+c,a["x_internal"+c])}};JXG.removeEvent=function(f,c,b,a){try{if(typeof f.addEventListener!="undefined"){f.removeEventListener(c,a["x_internal"+c],false)
}else{f.detachEvent("on"+c,a["x_internal"+c])}}catch(d){}};JXG.bind=function(b,a){return function(){return b.apply(a,arguments)
}};JXG.getPosition=function(b){var a=0,c=0,b;if(!b){b=window.event}if(b.pageX||b.pageY){a=b.pageX;
c=b.pageY}else{if(b.clientX||b.clientY){a=b.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
c=b.clientY+document.body.scrollTop+document.documentElement.scrollTop}}return[a,c]
};JXG.getOffset=function(c){var d=c,a=d.offsetLeft,b=d.offsetTop;while(d=d.offsetParent){a+=d.offsetLeft;
b+=d.offsetTop;if(d.offsetParent){a+=d.clientLeft;b+=d.clientTop}}return[a,b]};JXG.getStyle=function(b,a){return b.style[a]
};JXG.keys=function(a){var b=[],c;for(c in a){b.push(c)}return b};JXG.escapeHTML=function(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
};JXG.unescapeHTML=function(a){return a.replace(/<\/?[^>]+>/gi,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")
};JXG.clone=function(b){var a={};a.prototype=b;return a};JXG.deepCopy=function(d){var f,b,e,a;
if(typeof d!=="object"||d==null){return d}if(this.isArray(d)){f=[];for(b=0;b<d.length;
b++){e=d[b];if(typeof e=="object"){if(this.isArray(e)){f[b]=[];for(a=0;a<e.length;
a++){if(typeof e[a]!="object"){f[b].push(e[a])}else{f[b].push(this.deepCopy(e[a]))
}}}else{f[b]=this.deepCopy(e)}}else{f[b]=e}}}else{f={};for(b in d){e=d[b];if(typeof e=="object"){if(this.isArray(e)){f[b]=[];
for(a=0;a<e.length;a++){if(typeof e[a]!="object"){f[b].push(e[a])}else{f[b].push(this.deepCopy(e[a]))
}}}else{f[b]=this.deepCopy(e)}}else{f[b]=e}}}return f};JXG.cloneAndCopy=function(d,c){var a={},b;
a.prototype=d;for(b in c){a[b]=c[b]}return a};JXG.toJSON=function(c){switch(typeof c){case"object":if(c){var b=[];
if(c instanceof Array){for(var a=0;a<c.length;a++){b.push(JXG.toJSON(c[a]))}return"["+b.join(",")+"]"
}else{for(var d in c){b.push('"'+d+'":'+JXG.toJSON(c[d]))}return"{"+b.join(",")+"}"
}}else{return"null"}case"string":return'"'+c.replace(/(["'])/g,"\\$1")+'"';case"number":case"boolean":return new String(c)
}};JXG.capitalize=function(a){return a.charAt(0).toUpperCase()+a.substring(1).toLowerCase()
};JXG.timedChunk=function(b,d,c,e){var a=b.concat();setTimeout(function(){var f=+new Date();
do{d.call(c,a.shift())}while(a.length>0&&(+new Date()-f<300));if(a.length>0){setTimeout(arguments.callee,1)
}else{e(b)}},1)};JXG.trimNumber=function(a){a=a.replace(/^0+/,"");a=a.replace(/0+$/,"");
if(a[a.length-1]=="."||a[a.length-1]==","){a=a.slice(0,-1)}if(a[0]=="."||a[0]==","){a="0"+a
}return a};JXG.trim=function(a){a=a.replace(/^w+/,"");a=a.replace(/w+$/,"");return a
};JXG.OBJECT_TYPE_ARC=1330921795;JXG.OBJECT_TYPE_ARROW=1330921815;JXG.OBJECT_TYPE_AXIS=1330921816;
JXG.OBJECT_TYPE_TICKS=1330926680;JXG.OBJECT_TYPE_CIRCLE=1330922316;JXG.OBJECT_TYPE_CURVE=1330923344;
JXG.OBJECT_TYPE_GLIDER=1330923340;JXG.OBJECT_TYPE_IMAGE=1330926157;JXG.OBJECT_TYPE_LINE=1330924622;
JXG.OBJECT_TYPE_POINT=1330925652;JXG.OBJECT_TYPE_SLIDER=1330926404;JXG.OBJECT_TYPE_CAS=1330922320;
JXG.OBJECT_TYPE_POLYGON=1330925657;JXG.OBJECT_TYPE_SECTOR=1330926403;JXG.OBJECT_TYPE_TEXT=1330926661;
JXG.OBJECT_TYPE_ANGLE=1330921799;JXG.OBJECT_TYPE_INTERSECTION=1330926158;JXG.OBJECT_TYPE_TURTLE=5198933;
JXG.OBJECT_CLASS_POINT=1;JXG.OBJECT_CLASS_LINE=2;JXG.OBJECT_CLASS_CIRCLE=3;JXG.OBJECT_CLASS_CURVE=4;
JXG.OBJECT_CLASS_AREA=5;JXG.OBJECT_CLASS_OTHER=6;JXG.GeometryElement=function(){this.board=null;
this.id="";this.needsUpdate=true;this.name="";this.visProp={};JXG.clearVisPropOld(this);
this.isReal=true;this.visProp.dash=0;this.childElements={};this.hasLabel=false;this.layer=9;
this.notExistingParents={};this.traced=false;this.traces={};this.numTraces=0;this.transformations=[];
this.baseElement=null;this.descendants={};this.ancestors={};this.symbolic={};this.stdform=[1,0,0,0,1,1,0,0];
this.quadraticform=[[1,0,0],[0,1,0],[0,0,1]];this.needsRegularUpdate=true};JXG.GeometryElement.prototype.init=function(b,c,a){if(typeof(b)=="string"){b=JXG.JSXGraph.boards[b]
}this.board=b;this.id=c;if((a!=null)&&(typeof a!="undefined")){a=a}else{a=this.board.generateName(this)
}this.board.elementsByName[a]=this;this.name=a;this.visProp.strokeColor=this.board.options.elements.strokeColor;
this.visProp.highlightStrokeColor=this.board.options.elements.highlightStrokeColor;
this.visProp.fillColor=this.board.options.elements.fillColor;this.visProp.highlightFillColor=this.board.options.elements.highlightFillColor;
this.visProp.strokeWidth=this.board.options.elements.strokeWidth;this.visProp.strokeOpacity=this.board.options.elements.strokeOpacity;
this.visProp.highlightStrokeOpacity=this.board.options.elements.highlightStrokeOpacity;
this.visProp.fillOpacity=this.board.options.elements.fillOpacity;this.visProp.highlightFillOpacity=this.board.options.elements.highlightFillOpacity;
this.visProp.draft=this.board.options.elements.draft.draft;this.visProp.visible=true;
this.visProp.shadow=false;this.visProp.gradient="none";this.visProp.gradientSecondColor="black";
this.visProp.gradientAngle="270";this.visProp.gradientSecondOpacity=this.visProp.fillOpacity;
this.visProp.gradientPositionX=0.5;this.visProp.gradientPositionY=0.5};JXG.GeometryElement.prototype.addChild=function(c){var b,a;
this.childElements[c.id]=c;this.addDescendants(c);c.ancestors[this.id]=this;for(b in this.descendants){this.descendants[b].ancestors[this.id]=this;
for(a in this.ancestors){this.descendants[b].ancestors[this.ancestors[a].id]=this.ancestors[a]
}}for(b in this.ancestors){for(a in this.descendants){this.ancestors[b].descendants[this.descendants[a].id]=this.descendants[a]
}}return this};JXG.GeometryElement.prototype.addDescendants=function(b){var a;this.descendants[b.id]=b;
for(a in b.childElements){this.addDescendants(b.childElements[a])}return this};JXG.GeometryElement.prototype.generatePolynomial=function(){return[]
};JXG.GeometryElement.prototype.animate=function(d,c){var a,b,f=35,g=Math.ceil(c/(f*1)),e,k=this;
this.animationData={};var l=function(w,v,s){var u,r,q,n,m;u=JXG.rgb2hsv(w);r=JXG.rgb2hsv(v);
q=(r[0]-u[0])/(1*g);n=(r[1]-u[1])/(1*g);m=(r[2]-u[2])/(1*g);k.animationData[s]=new Array(g);
for(e=0;e<g;e++){k.animationData[s][g-e-1]=JXG.hsv2rgb(u[0]+(e+1)*q,u[1]+(e+1)*n,u[2]+(e+1)*m)
}},h=function(r,m,q){r=parseFloat(r);m=parseFloat(m);if(isNaN(r)||isNaN(m)){return
}var n=(m-r)/(1*g);k.animationData[q]=new Array(g);for(e=0;e<g;e++){k.animationData[q][g-e-1]=r+(e+1)*n
}};for(a in d){b=a.toLowerCase();switch(b){case"strokecolor":l(this.visProp.strokeColor,d[a],"strokeColor");
break;case"strokeopacity":h(this.visProp.strokeOpacity,d[a],"strokeOpacity");break;
case"strokewidth":h(this.visProp.strokeWidth,d[a],"strokeWidth");break;case"fillcolor":l(this.visProp.fillColor,d[a],"fillColor");
break;case"fillopacity":h(this.visProp.fillOpacity,d[a],"fillOpacity");break}}this.board.animationObjects[this.id]=this;
if(typeof this.board.animationIntervalCode=="undefined"){this.board.animationIntervalCode=window.setInterval("JXG.JSXGraph.boards['"+this.board.id+"'].animate();",f)
}return this};JXG.GeometryElement.prototype.update=function(){if(this.traced){this.cloneToBackground(true)
}return this};JXG.GeometryElement.prototype.updateRenderer=function(){};JXG.GeometryElement.prototype.hideElement=function(){this.visProp.visible=false;
this.board.renderer.hide(this);if(this.label!=null&&this.hasLabel){this.label.hiddenByParent=true;
if(this.label.content.visProp.visible){this.board.renderer.hide(this.label.content)
}}return this};JXG.GeometryElement.prototype.showElement=function(){this.visProp.visible=true;
this.board.renderer.show(this);if(this.label!=null&&this.hasLabel&&this.label.hiddenByParent){this.label.hiddenByParent=false;
if(this.label.content.visProp.visible){this.board.renderer.show(this.label.content)
}}return this};JXG.GeometryElement.prototype.setProperty=function(){var f,e,c,b,d,g;
for(f=0;f<arguments.length;f++){b=arguments[f];if(typeof b=="string"){g=b.split(":");
g[0]=g[0].replace(/^\s+/,"").replace(/\s+$/,"");g[1]=g[1].replace(/^\s+/,"").replace(/\s+$/,"")
}else{if(!JXG.isArray(b)){for(e in b){this.setProperty([e,b[e]])}return this}else{g=b
}}if(g[1]==null){continue}switch(g[0].replace(/\s+/g).toLowerCase()){case"strokewidth":this.visProp.strokeWidth=g[1];
this.board.renderer.setObjectStrokeWidth(this,this.visProp.strokeWidth);break;case"strokecolor":c=g[1];
if(c.length=="9"&&c.substr(0,1)=="#"){d=c.substr(7,2);c=c.substr(0,7)}else{d="FF"
}this.visProp.strokeColor=c;this.visProp.strokeOpacity=parseInt(d.toUpperCase(),16)/255;
this.board.renderer.setObjectStrokeColor(this,this.visProp.strokeColor,this.visProp.strokeOpacity);
break;case"fillcolor":c=g[1];if(c.length=="9"&&c.substr(0,1)=="#"){d=c.substr(7,2);
c=c.substr(0,7)}else{d="FF"}this.visProp.fillColor=c;this.visProp.fillOpacity=parseInt(d.toUpperCase(),16)/255;
this.board.renderer.setObjectFillColor(this,this.visProp.fillColor,this.visProp.fillOpacity);
break;case"highlightstrokecolor":c=g[1];if(c.length=="9"&&c.substr(0,1)=="#"){d=c.substr(7,2);
c=c.substr(0,7)}else{d="FF"}this.visProp.highlightStrokeColor=c;this.visProp.highlightStrokeOpacity=parseInt(d.toUpperCase(),16)/255;
break;case"highlightfillcolor":c=g[1];if(c.length=="9"&&c.substr(0,1)=="#"){d=c.substr(7,2);
c=c.substr(0,7)}else{d="FF"}this.visProp.highlightFillColor=c;this.visProp.highlightFillOpacity=parseInt(d.toUpperCase(),16)/255;
break;case"fillopacity":this.visProp.fillOpacity=g[1];this.board.renderer.setObjectFillColor(this,this.visProp.fillColor,this.visProp.fillOpacity);
break;case"strokeopacity":this.visProp.strokeOpacity=g[1];this.board.renderer.setObjectStrokeColor(this,this.visProp.strokeColor,this.visProp.strokeOpacity);
break;case"highlightfillopacity":this.visProp.highlightFillOpacity=g[1];break;case"highlightstrokeopacity":this.visProp.highlightStrokeOpacity=g[1];
break;case"labelcolor":c=g[1];if(c.length=="9"&&c.substr(0,1)=="#"){d=c.substr(7,2);
c=c.substr(0,7)}else{d="FF"}if(d=="00"){if(this.label!=null&&this.hasLabel){this.label.content.hideElement()
}}if(this.label!=null&&this.hasLabel){this.label.color=c;this.board.renderer.setObjectStrokeColor(this.label.content,c,d)
}if(this.type==JXG.OBJECT_TYPE_TEXT){this.visProp.strokeColor=c;this.board.renderer.setObjectStrokeColor(this,this.visProp.strokeColor,1)
}break;case"showinfobox":if(g[1]=="false"||g[1]==false){this.showInfobox=false}else{if(g[1]=="true"||g[1]==true){this.showInfobox=true
}}break;case"visible":if(g[1]=="false"||g[1]==false){this.visProp.visible=false;this.hideElement()
}else{if(g[1]=="true"||g[1]==true){this.visProp.visible=true;this.showElement()}}break;
case"dash":this.setDash(g[1]);break;case"trace":if(g[1]=="false"||g[1]==false){this.traced=false
}else{if(g[1]=="true"||g[1]==true){this.traced=true}}break;case"style":this.setStyle(1*g[1]);
break;case"face":if(this.elementClass==JXG.OBJECT_CLASS_POINT){this.setFace(g[1])
}break;case"size":if(this.elementClass==JXG.OBJECT_CLASS_POINT){this.visProp.size=1*g[1];
this.board.renderer.updatePoint(this)}break;case"fixed":this.fixed=((g[1]=="false")||(g[1]==false))?false:true;
break;case"shadow":if(g[1]=="false"||g[1]==false){this.visProp.shadow=false}else{if(g[1]=="true"||g[1]==true){this.visProp.shadow=true
}}this.board.renderer.setShadow(this);break;case"gradient":this.visProp.gradient=g[1];
this.board.renderer.setGradient(this);break;case"gradientsecondcolor":c=g[1];if(c.length=="9"&&c.substr(0,1)=="#"){d=c.substr(7,2);
c=c.substr(0,7)}else{d="FF"}this.visProp.gradientSecondColor=c;this.visProp.gradientSecondOpacity=parseInt(d.toUpperCase(),16)/255;
this.board.renderer.updateGradient(this);break;case"gradientsecondopacity":this.visProp.gradientSecondOpacity=g[1];
this.board.renderer.updateGradient(this);break;case"draft":if(g[1]=="false"||g[1]==false){if(this.visProp.draft==true){this.visProp.draft=false;
this.board.renderer.removeDraft(this)}}else{if(g[1]=="true"||g[1]==true){this.visProp.draft=true;
this.board.renderer.setDraft(this)}}break;case"straightfirst":if(g[1]=="false"||g[1]==false){this.visProp.straightFirst=false
}else{if(g[1]=="true"||g[1]==true){this.visProp.straightFirst=true}}this.setStraight(this.visProp.straightFirst,this.visProp.straightLast);
break;case"straightlast":if(g[1]=="false"||g[1]==false){this.visProp.straightLast=false
}else{if(g[1]=="true"||g[1]==true){this.visProp.straightLast=true}}this.setStraight(this.visProp.straightFirst,this.visProp.straightLast);
break;case"firstarrow":if(g[1]=="false"||g[1]==false){this.visProp.firstArrow=false
}else{if(g[1]=="true"||g[1]==true){this.visProp.firstArrow=true}}this.setArrow(this.visProp.firstArrow,this.visProp.lastArrow);
break;case"lastarrow":if(g[1]=="false"||g[1]==false){this.visProp.lastArrow=false
}else{if(g[1]=="true"||g[1]==true){this.visProp.lastArrow=true}}this.setArrow(this.visProp.firstArrow,this.visProp.lastArrow);
break;case"curvetype":this.curveType=g[1];break;case"fontsize":this.visProp.fontSize=g[1];
break;case"insertticks":if(this.type==JXG.OBJECT_TYPE_TICKS){var a=this.insertTicks;
this.insertTicks=true;if(g[1]=="false"||g[1]==false){this.insertTicks=false}if(a!=this.insertTicks){this.calculateTicksCoordinates()
}}break;case"drawlabels":if(this.type==JXG.OBJECT_TYPE_TICKS){var a=this.drawLabels;
this.drawLabels=true;if(g[1]=="false"||g[1]==false){this.drawLabels=false}if(a!=this.drawLabels){this.calculateTicksCoordinates()
}}break;case"drawzero":if(this.type==JXG.OBJECT_TYPE_TICKS){var a=this.drawZero;this.drawZero=true;
if(g[1]=="false"||g[1]==false){this.drawZero=false}if(a!=this.drawZero){this.calculateTicksCoordinates()
}}break;case"minorticks":if(this.type==JXG.OBJECT_TYPE_TICKS){var a=this.minorTicks;
if((g[1]!=null)&&(g[1]>0)){this.minorTicks=g[1]}if(a!=this.minorTicks){this.calculateTicksCoordinates()
}}break;case"majortickheight":if(this.type==JXG.OBJECT_TYPE_TICKS){var a=this.majorHeight;
if((g[1]!=null)&&(g[1]>0)){this.majorHeight=g[1]}if(a!=this.majorHeight){this.calculateTicksCoordinates()
}}break;case"minortickheight":if(this.type==JXG.OBJECT_TYPE_TICKS){var a=this.minorHeight;
if((g[1]!=null)&&(g[1]>0)){this.minorHeight=g[1]}if(a!=this.minorHeight){this.calculateTicksCoordinates()
}}break;case"snapwidth":if(this.type==JXG.OBJECT_TYPE_GLIDER){this.snapWidth=g[1]
}}}return this};JXG.GeometryElement.prototype.setDash=function(a){this.visProp.dash=a;
this.board.renderer.setDashStyle(this,this.visProp);return this};JXG.GeometryElement.prototype.prepareUpdate=function(){this.needsUpdate=true;
return this};JXG.GeometryElement.prototype.remove=function(){this.board.renderer.remove(document.getElementById(this.id));
if(this.hasLabel){this.board.renderer.remove(document.getElementById(this.label.content.id))
}return this};JXG.GeometryElement.prototype.getTextAnchor=function(){return new JXG.Coords(JXG.COORDS_BY_USER,[0,0],this.board)
};JXG.GeometryElement.prototype.getLabelAnchor=function(){return new JXG.Coords(JXG.COORDS_BY_USER,[0,0],this.board)
};JXG.GeometryElement.prototype.setStyle=function(a){return this};JXG.GeometryElement.prototype.setStraight=function(a,b){return this
};JXG.GeometryElement.prototype.setArrow=function(b,a){return this};JXG.GeometryElement.prototype.createLabel=function(b,c){var a=false;
if(typeof c=="undefined"||c==null){c=[10,10]}this.nameHTML=this.board.algebra.replaceSup(this.board.algebra.replaceSub(this.name));
this.label={};if(typeof b=="undefined"||b==true){if(this.board.objects[this.id]==null){this.board.objects[this.id]=this;
a=true}this.label.relativeCoords=c;this.label.content=new JXG.Text(this.board,this.nameHTML,this.id,[this.label.relativeCoords[0]/(this.board.stretchX),this.label.relativeCoords[1]/(this.board.stretchY)],this.id+"Label","",null,true,this.board.options.text.defaultType);
if(a){delete (this.board.objects[this.id])}this.label.color="#000000";if(!this.visProp.visible){this.label.hiddenByParent=true;
this.label.content.visProp.visible=false}this.hasLabel=true}return this};JXG.GeometryElement.prototype.addLabelToElement=function(){this.createLabel(true);
this.label.content.id=this.id+"Label";this.board.addText(this.label.content);this.board.renderer.drawText(this.label.content);
if(!this.label.content.visProp.visible){board.renderer.hide(this.label.content)}return this
};JXG.GeometryElement.prototype.highlight=function(){this.board.renderer.highlight(this);
return this};JXG.GeometryElement.prototype.noHighlight=function(){this.board.renderer.noHighlight(this);
return this};JXG.GeometryElement.prototype.clearTrace=function(){var a;for(a in this.traces){this.board.renderer.remove(this.traces[a])
}this.numTraces=0;return this};JXG.GeometryElement.prototype.cloneToBackground=function(a){return this
};JXG.GeometryElement.prototype.normalize=function(){this.stdform=this.board.algebra.normalize(this.stdform);
return this};JXG.GeometryElement.prototype.toJSON=function(){var b='{"name":'+this.name;
b+=', "id":'+this.id;var c=[];for(var a in this.visProp){if(this.visProp[a]!=null){c.push('"'+a+'":'+this.visProp[a])
}}b+=', "visProp":{'+c.toString()+"}";b+="}";return b};JXG.clearVisPropOld=function(a){a.visPropOld={};
a.visPropOld.strokeColor="";a.visPropOld.strokeOpacity="";a.visPropOld.strokeWidth="";
a.visPropOld.fillColor="";a.visPropOld.fillOpacity="";a.visPropOld.shadow=false;a.visPropOld.firstArrow=false;
a.visPropOld.lastArrow=false};JXG.COORDS_BY_USER=1;JXG.COORDS_BY_SCREEN=2;JXG.Coords=function(c,b,a){this.board=a;
this.usrCoords=[];this.scrCoords=[];if(c==JXG.COORDS_BY_USER){if(b.length<=2){this.usrCoords[0]=1;
this.usrCoords[1]=b[0];this.usrCoords[2]=b[1]}else{this.usrCoords[0]=b[0];this.usrCoords[1]=b[1];
this.usrCoords[2]=b[2];this.normalizeUsrCoords()}this.usr2screen()}else{this.scrCoords[0]=1;
this.scrCoords[1]=b[0];this.scrCoords[2]=b[1];this.screen2usr()}};JXG.Coords.prototype.normalizeUsrCoords=function(){var a=0.000001;
if(Math.abs(this.usrCoords[0])>a){this.usrCoords[1]/=this.usrCoords[0];this.usrCoords[2]/=this.usrCoords[0];
this.usrCoords[0]=1}};JXG.Coords.prototype.usr2screen=function(f){var e=Math.round,a=this.board,d=this.usrCoords,c=this.board.origin.scrCoords;
if(f==null||f){this.scrCoords[0]=e(d[0]);this.scrCoords[1]=e(d[0]*c[1]+d[1]*a.stretchX);
this.scrCoords[2]=e(d[0]*c[2]-d[2]*a.stretchY)}else{this.scrCoords[0]=d[0];this.scrCoords[1]=d[0]*c[1]+d[1]*a.stretchX;
this.scrCoords[2]=d[0]*c[2]-d[2]*a.stretchY}};JXG.Coords.prototype.screen2usr=function(){var d=this.board.origin.scrCoords,c=this.scrCoords,a=this.board;
this.usrCoords[0]=1;this.usrCoords[1]=(c[1]-d[1])/a.stretchX;this.usrCoords[2]=(d[2]-c[2])/a.stretchY
};JXG.Coords.prototype.distance=function(b,e){var d=0,k,a=this.usrCoords,h=this.scrCoords,g;
if(b==JXG.COORDS_BY_USER){k=e.usrCoords;g=a[0]-k[0];d=g*g;g=a[1]-k[1];d+=g*g;g=a[2]-k[2];
d+=g*g}else{k=e.scrCoords;g=h[0]-k[0];d=g*g;g=h[1]-k[1];d+=g*g;g=h[2]-k[2];d+=g*g
}return Math.sqrt(d)};JXG.Coords.prototype.setCoordinates=function(e,c,b){var a=this.usrCoords,d=this.scrCoords;
if(e==JXG.COORDS_BY_USER){if(c.length==2){a[0]=1;a[1]=c[0];a[2]=c[1]}else{a[0]=c[0];
a[1]=c[1];a[2]=c[2];this.normalizeUsrCoords()}this.usr2screen(b)}else{d[1]=c[0];d[2]=c[1];
this.screen2usr()}};JXG.POINT_STYLE_X_SMALL=0;JXG.POINT_STYLE_X=1;JXG.POINT_STYLE_X_BIG=2;
JXG.POINT_STYLE_CIRCLE_TINY=3;JXG.POINT_STYLE_CIRCLE_SMALL=4;JXG.POINT_STYLE_CIRCLE=5;
JXG.POINT_STYLE_CIRCLE_BIG=6;JXG.POINT_STYLE_SQUARE_SMALL=7;JXG.POINT_STYLE_SQUARE=8;
JXG.POINT_STYLE_SQUARE_BIG=9;JXG.POINT_STYLE_PLUS_SMALL=10;JXG.POINT_STYLE_PLUS=11;
JXG.POINT_STYLE_PLUS_BIG=12;JXG.Point=function(e,f,g,b,a,d,c){this.constructor();
this.type=JXG.OBJECT_TYPE_POINT;this.elementClass=JXG.OBJECT_CLASS_POINT;this.init(e,g,b);
if(f==null){f=[0,0]}this.coords=new JXG.Coords(JXG.COORDS_BY_USER,f,this.board);this.initialCoords=new JXG.Coords(JXG.COORDS_BY_USER,f,this.board);
if(c==null){c=e.options.layer.point}this.layer=c;this.showInfobox=true;this.label={};
this.label.relativeCoords=[10,10];this.nameHTML=this.board.algebra.replaceSup(this.board.algebra.replaceSub(this.name));
if(typeof d=="undefined"||d==true){this.board.objects[this.id]=this;this.label.content=new JXG.Text(this.board,this.nameHTML,this.id,[this.label.relativeCoords[0]/this.board.stretchX,this.label.relativeCoords[1]/this.board.stretchY],this.id+"Label","",null,true,this.board.options.text.defaultType);
delete (this.board.objects[this.id]);this.label.color="#000000";if(!a){this.label.hiddenByParent=true;
this.label.content.visProp.visible=false}this.hasLabel=true}else{this.showInfobox=false
}this.fixed=false;this.position=null;this.onPolygon=false;this.visProp.style=this.board.options.point.style;
this.visProp.face="circle";this.visProp.size=3;this.visProp.fillColor=this.board.options.point.fillColor;
this.visProp.highlightFillColor=this.board.options.point.highlightFillColor;this.visProp.strokeColor=this.board.options.point.strokeColor;
this.visProp.highlightStrokeColor=this.board.options.point.highlightStrokeColor;this.visProp.strokeWidth=this.board.options.point.strokeWidth;
this.visProp.visible=a;this.slideObject=null;this.group=[];this.id=this.board.addPoint(this)
};JXG.Point.prototype=new JXG.GeometryElement();JXG.Point.prototype.hasPoint=function(b,d){var a=this.coords.scrCoords,c;
c=this.visProp.size;if(c<this.board.options.precision.hasPoint){c=this.board.options.precision.hasPoint
}return((Math.abs(a[1]-b)<c+2)&&(Math.abs(a[2]-d))<c+2)};JXG.Point.prototype.updateConstraint=function(){return this
};JXG.Point.prototype.update=function(e){if(!this.needsUpdate){return}if(typeof e=="undefined"){e=false
}if(this.traced){this.cloneToBackground(true)}if(this.type==JXG.OBJECT_TYPE_GLIDER){if(this.slideObject.type==JXG.OBJECT_TYPE_CIRCLE){if(e){this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.slideObject.midpoint.X()+Math.cos(this.position),this.slideObject.midpoint.Y()+Math.sin(this.position)]);
this.coords=this.board.algebra.projectPointToCircle(this,this.slideObject)}else{this.coords=this.board.algebra.projectPointToCircle(this,this.slideObject);
this.position=this.board.algebra.rad([this.slideObject.midpoint.X()+1,this.slideObject.midpoint.Y()],this.slideObject.midpoint,this)
}}else{if(this.slideObject.type==JXG.OBJECT_TYPE_LINE){this.coords=this.board.algebra.projectPointToLine(this,this.slideObject);
var d=this.slideObject.point1.coords;var h=this.slideObject.point2.coords;if(e){if(Math.abs(d.usrCoords[0])>=JXG.Math.eps&&Math.abs(h.usrCoords[0])>=JXG.Math.eps){this.coords.setCoordinates(JXG.COORDS_BY_USER,[d.usrCoords[1]+this.position*(h.usrCoords[1]-d.usrCoords[1]),d.usrCoords[2]+this.position*(h.usrCoords[2]-d.usrCoords[2])])
}}else{var k=1;var q=d.distance(JXG.COORDS_BY_USER,this.coords);var b=d.distance(JXG.COORDS_BY_USER,h);
var g=h.distance(JXG.COORDS_BY_USER,this.coords);if(((q>b)||(g>b))&&(q<g)){k=-1}this.position=k*q/b;
if(this.snapWidth!=null&&Math.abs(this._smax-this._smin)>=JXG.Math.eps){if(this.position<0){this.position=0
}if(this.position>1){this.position=1}var r=this.position*(this._smax-this._smin)+this._smin;
r=Math.round(r/this.snapWidth)*this.snapWidth;this.position=(r-this._smin)/(this._smax-this._smin);
this.update(true)}}var c=this.slideObject.point1.coords.scrCoords;var n=this.slideObject.point2.coords.scrCoords;
var f;if(this.slideObject.getSlope()==0){f=1}else{f=2}var l=this.coords.scrCoords[f];
if(!this.slideObject.visProp.straightFirst){if(c[f]<n[f]){if(l<c[f]){this.coords=this.slideObject.point1.coords;
this.position=0}}else{if(c[f]>n[f]){if(l>c[f]){this.coords=this.slideObject.point1.coords;
this.position=0}}}}if(!this.slideObject.visProp.straightLast){if(c[f]<n[f]){if(l>n[f]){this.coords=this.slideObject.point2.coords;
this.position=1}}else{if(c[f]>n[f]){if(l<n[f]){this.coords=this.slideObject.point2.coords;
this.position=1}}}}if(this.onPolygon){var s=this.slideObject.point1.coords;var m=this.slideObject.point2.coords;
if(Math.abs(this.coords.scrCoords[1]-s.scrCoords[1])<this.board.options.precision.hasPoint&&Math.abs(this.coords.scrCoords[2]-s.scrCoords[2])<this.board.options.precision.hasPoint){var a=this.slideObject.parentPolygon;
for(var f=0;f<a.borders.length;f++){if(this.slideObject==a.borders[f]){this.slideObject=a.borders[(f-1+a.borders.length)%a.borders.length];
break}}}else{if(Math.abs(this.coords.scrCoords[1]-m.scrCoords[1])<this.board.options.precision.hasPoint&&Math.abs(this.coords.scrCoords[2]-m.scrCoords[2])<this.board.options.precision.hasPoint){var a=this.slideObject.parentPolygon;
for(var f=0;f<a.borders.length;f++){if(this.slideObject==a.borders[f]){this.slideObject=a.borders[(f+1+a.borders.length)%a.borders.length];
break}}}}}}else{if(this.slideObject.type==JXG.OBJECT_TYPE_CURVE){this.updateConstraint();
this.coords=this.board.algebra.projectPointToCurve(this,this.slideObject)}else{if(this.slideObject.type==JXG.OBJECT_TYPE_TURTLE){this.updateConstraint();
this.coords=this.board.algebra.projectPointToTurtle(this,this.slideObject)}}}}}if(this.type==JXG.OBJECT_TYPE_CAS){this.updateConstraint()
}this.updateTransform();this.needsUpdate=false;return this};JXG.Point.prototype.updateRenderer=function(){if(this.visProp.visible){var a=this.isReal;
this.isReal=(isNaN(this.coords.usrCoords[1]+this.coords.usrCoords[2]))?false:true;
this.isReal=(Math.abs(this.coords.usrCoords[0])>this.board.algebra.eps)?this.isReal:false;
if(this.isReal){if(a!=this.isReal){this.board.renderer.show(this);if(this.hasLabel&&this.label.content.visProp.visible){this.board.renderer.show(this.label.content)
}}this.board.renderer.updatePoint(this)}else{if(a!=this.isReal){this.board.renderer.hide(this);
if(this.hasLabel&&this.label.content.visProp.visible){this.board.renderer.hide(this.label.content)
}}}}if(this.hasLabel&&this.label.content.visProp.visible&&this.isReal){this.label.content.update();
this.board.renderer.updateText(this.label.content)}return this};JXG.Point.prototype.X=function(){return this.coords.usrCoords[1]
};JXG.Point.prototype.Y=function(){return this.coords.usrCoords[2]};JXG.Point.prototype.Z=function(){return this.coords.usrCoords[0]
};JXG.Point.prototype.XEval=function(){return this.coords.usrCoords[1]};JXG.Point.prototype.YEval=function(){return this.coords.usrCoords[2]
};JXG.Point.prototype.ZEval=function(){return this.coords.usrCoords[0]};JXG.Point.prototype.Dist=function(b){var d,g=b.coords.usrCoords,a=this.coords.usrCoords,e;
e=a[0]-g[0];d=e*e;e=a[1]-g[1];d+=e*e;e=a[2]-g[2];d+=e*e;return Math.sqrt(d)};JXG.Point.prototype.setPositionDirectly=function(a,g,e){var d,k,h,c,b,f=this.coords;
this.coords=new JXG.Coords(a,[g,e],this.board);if(this.group.length!=0){k=this.coords.usrCoords[1]-f.usrCoords[1];
h=this.coords.usrCoords[2]-f.usrCoords[2];for(d=0;d<this.group.length;d++){for(c in this.group[d].objects){b=this.group[d].objects[c];
b.initialCoords=new JXG.Coords(JXG.COORDS_BY_USER,[b.initialCoords.usrCoords[1]+k,b.initialCoords.usrCoords[2]+h],this.board)
}}this.group[this.group.length-1].dX=this.coords.scrCoords[1]-f.scrCoords[1];this.group[this.group.length-1].dY=this.coords.scrCoords[2]-f.scrCoords[2];
this.group[this.group.length-1].update(this)}else{for(d=this.transformations.length-1;
d>=0;d--){this.initialCoords=new JXG.Coords(a,JXG.Math.matVecMult(JXG.Math.Numerics.Inverse(this.transformations[d].matrix),[1,g,e]),this.board)
}this.update()}return this};JXG.Point.prototype.setPositionByTransform=function(e,a,d){var c=this.coords;
var b=this.board.create("transform",[a,d],{type:"translate"});if(this.transformations.length>0&&this.transformations[this.transformations.length-1].isNumericMatrix){this.transformations[this.transformations.length-1].melt(b)
}else{this.addTransform(this,b)}if(this.group.length!=0){}else{this.update()}return this
};JXG.Point.prototype.setPosition=function(c,a,b){this.setPositionDirectly(c,a,b);
return this};JXG.Point.prototype.makeGlider=function(a){this.slideObject=JXG.getReference(this.board,a);
this.type=JXG.OBJECT_TYPE_GLIDER;this.snapWidth=null;this.slideObject.addChild(this);
if(this.slideObject.elementClass==JXG.OBJECT_CLASS_LINE){this.generatePolynomial=function(){return this.slideObject.generatePolynomial(this)
}}else{if(this.slideObject.elementClass==JXG.OBJECT_CLASS_CIRCLE){this.generatePolynomial=function(){return this.slideObject.generatePolynomial(this)
}}}this.needsUpdate=true;this.update();return this};JXG.Point.prototype.addConstraint=function(e){this.type=JXG.OBJECT_TYPE_CAS;
var f=this.board.elementsByName;var g=[];var a;for(var d=0;d<e.length;d++){var b=e[d];
if(typeof b=="string"){var c=this.board.algebra.geonext2JS(b);g[d]=new Function("","return "+c+";")
}else{if(typeof b=="function"){g[d]=b}else{if(typeof b=="number"){g[d]=function(h){return function(){return h
}}(b)}else{if(typeof b=="object"&&typeof b.Value=="function"){g[d]=(function(h){return function(){return h.Value()
}})(b)}}}}}if(e.length==1){this.updateConstraint=function(){var h=g[0]();if(JXG.isArray(h)){this.coords.setCoordinates(JXG.COORDS_BY_USER,h)
}else{this.coords=h}}}else{if(e.length==2){this.XEval=g[0];this.YEval=g[1];a="this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.XEval(),this.YEval()]);";
this.updateConstraint=new Function("",a)}else{this.ZEval=g[0];this.XEval=g[1];this.YEval=g[2];
a="this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.ZEval(),this.XEval(),this.YEval()]);";
this.updateConstraint=new Function("",a)}}if(!this.board.isSuspendedUpdate){this.update()
}return this};JXG.Point.prototype.updateTransform=function(){if(this.transformations.length==0||this.baseElement==null){return
}var b,a;if(this===this.baseElement){b=this.transformations[0].apply(this.baseElement,"self")
}else{b=this.transformations[0].apply(this.baseElement)}this.coords.setCoordinates(JXG.COORDS_BY_USER,b);
for(a=1;a<this.transformations.length;a++){this.coords.setCoordinates(JXG.COORDS_BY_USER,this.transformations[a].apply(this))
}return this};JXG.Point.prototype.addTransform=function(d,b){var e,c,a;if(this.transformations.length==0){this.baseElement=d
}if(JXG.isArray(b)){e=b}else{e=[b]}a=e.length;for(c=0;c<a;c++){this.transformations.push(e[c])
}return this};JXG.Point.prototype.startAnimation=function(a,b){if((this.type==JXG.OBJECT_TYPE_GLIDER)&&(typeof this.intervalCode=="undefined")){this.intervalCode=window.setInterval("JXG.JSXGraph.boards['"+this.board.id+"'].objects['"+this.id+"']._anim("+a+", "+b+")",250);
if(typeof this.intervalCount=="undefined"){this.intervalCount=0}}return this};JXG.Point.prototype.stopAnimation=function(){if(typeof this.intervalCode!="undefined"){window.clearInterval(this.intervalCode);
delete (this.intervalCode)}return this};JXG.Point.prototype.moveTo=function(g,c){if(typeof c=="undefined"||c==0){this.setPosition(JXG.COORDS_BY_USER,g[0],g[1]);
this.board.update(this);return this}var h=35,k=Math.ceil(c/(h*1)),l=new Array(k+1),b=this.coords.usrCoords[1],a=this.coords.usrCoords[2],e=(g[0]-b),d=(g[1]-a),f;
if(Math.abs(e)<JXG.Math.eps&&Math.abs(d)<JXG.Math.eps){return this}for(f=k;f>=0;f--){l[k-f]=[b+e*Math.sin((f/(k*1))*Math.PI/2),a+d*Math.sin((f/(k*1))*Math.PI/2)]
}this.animationPath=l;this.board.animationObjects[this.id]=this;if(typeof this.board.animationIntervalCode=="undefined"){this.board.animationIntervalCode=window.setInterval("JXG.JSXGraph.boards['"+this.board.id+"'].animate();",h)
}return this};JXG.Point.prototype.visit=function(k,d,b){if(arguments.length==2){b=1
}var l=35,m=Math.ceil(d/(l*1)),n=new Array(b*(m+1)),c=this.coords.usrCoords[1],a=this.coords.usrCoords[2],g=(k[0]-c),e=(k[1]-a),h,f;
for(f=0;f<b;f++){for(h=m;h>=0;h--){n[f*(m+1)+m-h]=[c+g*Math.pow(Math.sin((h/(m*1))*Math.PI),2),a+e*Math.pow(Math.sin((h/(m*1))*Math.PI),2)]
}}this.animationPath=n;this.board.animationObjects[this.id]=this;if(typeof this.board.animationIntervalCode=="undefined"){this.board.animationIntervalCode=window.setInterval("JXG.JSXGraph.boards['"+this.board.id+"'].animate();",l)
}return this};JXG.Point.prototype._anim=function(m,f){var b,k,g,e,d,c,l=1,a,h;this.intervalCount++;
if(this.intervalCount>f){this.intervalCount=0}if(this.slideObject.type==JXG.OBJECT_TYPE_LINE){b=this.slideObject.point1.coords.distance(JXG.COORDS_BY_SCREEN,this.slideObject.point2.coords);
k=this.slideObject.getSlope();if(k!="INF"){d=Math.atan(k);g=Math.round((this.intervalCount/f)*b*Math.cos(d));
e=Math.round((this.intervalCount/f)*b*Math.sin(d))}else{g=0;e=Math.round((this.intervalCount/f)*b)
}if(m<0){c=this.slideObject.point2;if(this.slideObject.point2.coords.scrCoords[1]-this.slideObject.point1.coords.scrCoords[1]>0){l=-1
}else{if(this.slideObject.point2.coords.scrCoords[1]-this.slideObject.point1.coords.scrCoords[1]==0){if(this.slideObject.point2.coords.scrCoords[2]-this.slideObject.point1.coords.scrCoords[2]>0){l=-1
}}}}else{c=this.slideObject.point1;if(this.slideObject.point1.coords.scrCoords[1]-this.slideObject.point2.coords.scrCoords[1]>0){l=-1
}else{if(this.slideObject.point1.coords.scrCoords[1]-this.slideObject.point2.coords.scrCoords[1]==0){if(this.slideObject.point1.coords.scrCoords[2]-this.slideObject.point2.coords.scrCoords[2]>0){l=-1
}}}}this.coords.setCoordinates(JXG.COORDS_BY_SCREEN,[c.coords.scrCoords[1]+l*g,c.coords.scrCoords[2]+l*e])
}else{if(this.slideObject.type==JXG.OBJECT_TYPE_CURVE){if(m>0){a=Math.round(this.intervalCount/f*this.board.canvasWidth)
}else{a=Math.round((f-this.intervalCount)/f*this.board.canvasWidth)}this.coords.setCoordinates(JXG.COORDS_BY_SCREEN,[a,0]);
this.coords=this.board.algebra.projectPointToCurve(this,this.slideObject)}else{if(this.slideObject.type==JXG.OBJECT_TYPE_CIRCLE){if(m<0){d=this.intervalCount/f*2*Math.PI
}else{d=(f-this.intervalCount)/f*2*Math.PI}h=this.slideObject.Radius();this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.slideObject.midpoint.coords.usrCoords[1]+h*Math.cos(d),this.slideObject.midpoint.coords.usrCoords[2]+h*Math.sin(d)])
}}}this.board.update(this);return this};JXG.Point.prototype.setStyle=function(a){if(a==0||a==1||a==2){this.visProp.face="cross";
if(a==0){this.visProp.size=2}else{if(a==1){this.visProp.size=3}else{this.visProp.size=4
}}}else{if(a==3||a==4||a==5||a==6){this.visProp.face="circle";if(a==3){this.visProp.size=1
}else{if(a==4){this.visProp.size=2}else{if(a==5){this.visProp.size=3}else{this.visProp.size=4
}}}}else{if(a==7||a==8||a==9){this.visProp.face="square";if(a==7){this.visProp.size=2
}else{if(a==8){this.visProp.size=3}else{this.visProp.size=4}}}else{if(a==10||a==11||a==12){this.visProp.face="plus";
if(a==10){this.visProp.size=2}else{if(a==11){this.visProp.size=3}else{this.visProp.size=4
}}}}}}this.board.renderer.changePointStyle(this);return this};JXG.Point.prototype.setFace=function(a){a=a.toLowerCase();
if(a=="cross"||a=="x"||a=="plus"||a=="+"||a=="circle"||a=="o"||a=="square"||a=="[]"||a=="diamond"||a=="<>"||a=="triangleup"||a=="a"||a=="triangledown"||a=="v"||a=="triangleleft"||a=="<"||a=="triangleright"||a==">"){this.visProp.face=a
}else{this.visProp.face="circle"}this.board.renderer.changePointStyle(this);return this
};JXG.Point.prototype.remove=function(){if(this.hasLabel){this.board.renderer.remove(document.getElementById(this.label.content.id))
}this.board.renderer.remove(document.getElementById(this.id))};JXG.Point.prototype.getTextAnchor=function(){return this.coords
};JXG.Point.prototype.getLabelAnchor=function(){return this.coords};JXG.Point.prototype.cloneToBackground=function(a){var b={};
b.id=this.id+"T"+this.numTraces;this.numTraces++;b.coords=this.coords;b.visProp=this.visProp;
b.elementClass=JXG.OBJECT_CLASS_POINT;JXG.clearVisPropOld(b);this.board.renderer.drawPoint(b);
this.traces[b.id]=document.getElementById(b.id);delete b;return this};JXG.createPoint=function(f,c,g){var e,b=false,d,a;
g=JXG.checkAttributes(g,{withLabel:JXG.readOption(f.options,"point","withLabel"),layer:null});
a=(typeof g.visible=="undefined")||JXG.str2Bool(g.visible);for(d=0;d<c.length;d++){if(typeof c[d]=="function"||typeof c[d]=="string"){b=true
}}if(!b){if((JXG.isNumber(c[0]))&&(JXG.isNumber(c[1]))){e=new JXG.Point(f,c,g.id,g.name,a,g.withLabel,g.layer);
if(g.slideObject!=null){e.makeGlider(g.slideObject)}else{e.baseElement=e}}else{if((typeof c[0]=="object")&&(typeof c[1]=="object")){e=new JXG.Point(f,[0,0],g.id,g.name,a,g.withLabel,g.layer);
e.addTransform(c[0],c[1])}else{throw new Error("JSXGraph: Can't create point with parent types '"+(typeof c[0])+"' and '"+(typeof c[1])+"'.")
}}}else{e=new JXG.Point(f,[0,0],g.id,g.name,a,g.withLabel,g.layer);e.addConstraint(c)
}return e};JXG.createGlider=function(d,b,e){var c,a;e=JXG.checkAttributes(e,{withLabel:JXG.readOption(d.options,"point","withLabel"),layer:null});
a=(typeof e.visible=="undefined")||JXG.str2Bool(e.visible);if(b.length==1){c=new JXG.Point(d,[0,0],e.id,e.name,a,e.withLabel)
}else{c=d.create("point",b.slice(0,-1),e)}c.makeGlider(b[b.length-1]);return c};JXG.createIntersectionPoint=function(d,b,a){var c;
if(b.length>=3){if(b.length==3){b.push(null)}c=d.create("point",[d.intersection(b[0],b[1],b[2],b[3])],a)
}b[0].addChild(c);b[1].addChild(c);c.generatePolynomial=function(){var e=b[0].generatePolynomial(c);
var f=b[1].generatePolynomial(c);if((e.length==0)||(f.length==0)){return[]}else{return[e[0],f[0]]
}};return c};JXG.createOtherIntersectionPoint=function(d,b,a){var c;if(b.length!=3||!JXG.isPoint(b[2])||(b[0].elementClass!=JXG.OBJECT_CLASS_LINE&&b[0].elementClass!=JXG.OBJECT_CLASS_CIRCLE)||(b[1].elementClass!=JXG.OBJECT_CLASS_LINE&&b[1].elementClass!=JXG.OBJECT_CLASS_CIRCLE)){throw new Error("JSXGraph: Can't create 'other intersection point' with parent types '"+(typeof b[0])+"',  '"+(typeof b[1])+"'and  '"+(typeof b[2])+"'.")
}else{c=d.create("point",[d.otherIntersection(b[0],b[1],b[2])],a)}b[0].addChild(c);
b[1].addChild(c);c.generatePolynomial=function(){var e=b[0].generatePolynomial(c);
var f=b[1].generatePolynomial(c);if((e.length==0)||(f.length==0)){return[]}else{return[e[0],f[0]]
}};return c};JXG.JSXGraph.registerElement("point",{icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAqCAIAAACofUV1AAAAu0lEQVR42u2Y2w7EIAhEYeL//zL7ttntRakyhjTw2MhwYDSaqplJgoDkiAAOFV0XaSGFD19MjMjh7/u70g8E6vBV1JmIQK2VHhp7A/5KdWxKf24Dh+HRxDaIvnJiX3jD6OhjM8RdlRfdc/Ece0y5rFW+FEdxFMerOCbe+9NxqFW+9Dn2WHOuAs8iNkT6/cEbyZ0yniYwIBL50ob4IY/F4XThkVj0yJOOQK2VHtpEW0OnuP+lqEep7rn/+AD75zNf8mTQTQAAAABJRU5ErkJggg%3D%3D",label:"Free point",alttext:"Constructs a free point",category:"basic/points",description:"Click on the board to place a free point or enter a pair of coordinates in the textbox.",showCoordsBox:true,showInputbox:false,checkInput:function(a,b){if(a&&b[b.length-1].usrCoords){return true
}if(!a&&b.length==1){return board.create("point",b[0].usrCoords.slice(1))}return false
},creator:JXG.createPoint});JXG.JSXGraph.registerElement("glider",JXG.createGlider);
JXG.JSXGraph.registerElement("intersection",JXG.createIntersectionPoint);JXG.JSXGraph.registerElement("otherintersection",JXG.createOtherIntersectionPoint);
JXG.Line=function(d,f,e,g,a,c,b){this.constructor();this.type=JXG.OBJECT_TYPE_LINE;
this.elementClass=JXG.OBJECT_CLASS_LINE;this.init(d,g,a);if(b==null){b=d.options.layer.line
}this.layer=b;this.point1=JXG.getReference(this.board,f);this.point2=JXG.getReference(this.board,e);
this.image=null;this.imageTransformMatrix=[[1,0,0],[0,1,0],[0,0,1]];this.visProp.fillColor=this.board.options.line.fillColor;
this.visProp.highlightFillColor=this.board.options.line.highlightFillColor;this.visProp.strokeColor=this.board.options.line.strokeColor;
this.visProp.highlightStrokeColor=this.board.options.line.highlightStrokeColor;this.visProp.straightFirst=this.board.options.line.straightFirst;
this.visProp.straightLast=this.board.options.line.straightLast;this.visProp.visible=true;
this.visProp.firstArrow=this.board.options.line.firstArrow;this.visProp.lastArrow=this.board.options.line.lastArrow;
this.ticks=[];this.defaultTicks=null;this.parentPolygon=null;this.createLabel(c);
this.id=this.board.addLine(this);this.point1.addChild(this);this.point2.addChild(this);
this.update()};JXG.Line.prototype=new JXG.GeometryElement;JXG.Line.prototype.hasPoint=function(k,g){var f=[],r,n=[1,k,g],l=[],u,d,h,b,m,q,e,a;
f[0]=this.stdform[0]-this.stdform[1]*this.board.origin.scrCoords[1]/this.board.stretchX+this.stdform[2]*this.board.origin.scrCoords[2]/this.board.stretchY;
f[1]=this.stdform[1]/this.board.stretchX;f[2]=this.stdform[2]/(-this.board.stretchY);
var l=[0,f[1],f[2]];l=JXG.Math.crossProduct(l,n);l=JXG.Math.crossProduct(l,f);l[1]/=l[0];
l[2]/=l[0];l[0]=1;r=(n[0]-l[0])*(n[0]-l[0])+(n[1]-l[1])*(n[1]-l[1])+(n[2]-l[2])*(n[2]-l[2]);
if(isNaN(r)||r>this.board.options.precision.hasPoint*this.board.options.precision.hasPoint){return false
}if(this.visProp.straightFirst&&this.visProp.straightLast){return true}else{b=this.point1.coords.scrCoords;
m=this.point2.coords.scrCoords;a=(m[1]-b[1])*(m[1]-b[1])+(m[2]-b[2])*(m[2]-b[2]);
q=(l[1]-b[1])*(l[1]-b[1])+(l[2]-b[2])*(l[2]-b[2]);e=(l[1]-m[1])*(l[1]-m[1])+(l[2]-m[2])*(l[2]-m[2]);
if((q>a)||(e>a)){if(q<e){if(!this.visProp.straightFirst){return false}}else{if(!this.visProp.straightLast){return false
}}}return true}};JXG.Line.prototype.update=function(){var a,b;if(this.constrained){if(typeof this.funps!="undefined"){b=this.funps();
this.point1=b[0];this.point2=b[1]}else{this.point1=this.funp1();this.point2=this.funp2()
}}if(this.needsUpdate){if(true||!this.board.geonextCompatibilityMode){this.updateStdform()
}for(a=0;a<this.ticks.length;a++){if(typeof this.ticks[a]!="undefined"){this.ticks[a].calculateTicksCoordinates()
}}}if(this.traced){this.cloneToBackground(true)}};JXG.Line.prototype.updateStdform=function(){var a=JXG.Math.crossProduct(this.point1.coords.usrCoords,this.point2.coords.usrCoords);
this.stdform[0]=a[0];this.stdform[1]=a[1];this.stdform[2]=a[2];this.stdform[3]=0;
this.normalize()};JXG.Line.prototype.updateRenderer=function(){var a;if(this.needsUpdate&&this.visProp.visible){a=this.isReal;
this.isReal=(isNaN(this.point1.coords.usrCoords[1]+this.point1.coords.usrCoords[2]+this.point2.coords.usrCoords[1]+this.point2.coords.usrCoords[2]))?false:true;
if(this.isReal){if(a!=this.isReal){this.board.renderer.show(this);if(this.hasLabel&&this.label.content.visProp.visible){this.board.renderer.show(this.label.content)
}}this.board.renderer.updateLine(this)}else{if(a!=this.isReal){this.board.renderer.hide(this);
if(this.hasLabel&&this.label.content.visProp.visible){this.board.renderer.hide(this.label.content)
}}}this.needsUpdate=false}if(this.hasLabel&&this.label.content.visProp.visible&&this.isReal){this.label.content.update();
this.board.renderer.updateText(this.label.content)}};JXG.Line.prototype.generatePolynomial=function(e){var d=this.point1.symbolic.x,c=this.point1.symbolic.y,g=this.point2.symbolic.x,f=this.point2.symbolic.y,b=e.symbolic.x,a=e.symbolic.y;
return[["(",c,")*(",b,")-(",c,")*(",g,")+(",a,")*(",g,")-(",d,")*(",a,")+(",d,")*(",f,")-(",b,")*(",f,")"].join("")]
};JXG.Line.prototype.getRise=function(){if(Math.abs(this.stdform[2])>=JXG.Math.eps){return -this.stdform[0]/this.stdform[2]
}else{return Infinity}};JXG.Line.prototype.getSlope=function(){if(Math.abs(this.stdform[2])>=JXG.Math.eps){return -this.stdform[1]/this.stdform[2]
}else{return Infinity}};JXG.Line.prototype.setStraight=function(a,b){this.visProp.straightFirst=a;
this.visProp.straightLast=b;this.board.renderer.updateLine(this)};JXG.Line.prototype.setArrow=function(b,a){this.visProp.firstArrow=b;
this.visProp.lastArrow=a;this.board.renderer.updateLine(this)};JXG.Line.prototype.getTextAnchor=function(){return new JXG.Coords(JXG.COORDS_BY_USER,[0.5*(this.point2.X()-this.point1.X()),0.5*(this.point2.Y()-this.point1.Y())],this.board)
};JXG.Line.prototype.getLabelAnchor=function(){var e,c,b,d,a;if(!this.visProp.straightFirst&&!this.visProp.straightLast){return new JXG.Coords(JXG.COORDS_BY_USER,[this.point2.X()-0.5*(this.point2.X()-this.point1.X()),this.point2.Y()-0.5*(this.point2.Y()-this.point1.Y())],this.board)
}else{c=new JXG.Coords(JXG.COORDS_BY_USER,this.point1.coords.usrCoords,this.board);
b=new JXG.Coords(JXG.COORDS_BY_USER,this.point2.coords.usrCoords,this.board);this.board.renderer.calcStraight(this,c,b);
if(this.visProp.straightFirst){e=c}else{e=b}if(this.label.content!=null){d=[0,0];
a=this.getSlope();if(e.scrCoords[2]==0){if(a==Infinity){d=[10,-10]}else{if(a>=0){d=[10,-10]
}else{d=[-10,-10]}}}else{if(e.scrCoords[2]==this.board.canvasHeight){if(a==Infinity){d=[10,10]
}else{if(a>=0){d=[-10,10]}else{d=[10,10]}}}}if(e.scrCoords[1]==0){if(a==Infinity){d=[10,10]
}else{if(a>=0){d=[10,-10]}else{d=[10,10]}}}else{if(e.scrCoords[1]==this.board.canvasWidth){if(a==Infinity){d=[-10,10]
}else{if(a>=0){d=[-10,10]}else{d=[-10,-10]}}}}this.label.content.relativeCoords=new JXG.Coords(JXG.COORDS_BY_USER,[d[0]/this.board.stretchX,d[1]/this.board.stretchY],this.board)
}return e}};JXG.Line.prototype.cloneToBackground=function(b){var d={},c,a;d.id=this.id+"T"+this.numTraces;
this.numTraces++;d.point1=this.point1;d.point2=this.point2;d.stdform=this.stdform;
JXG.clearVisPropOld(d);d.board={};d.board.unitX=this.board.unitX;d.board.unitY=this.board.unitY;
d.board.zoomX=this.board.zoomX;d.board.zoomY=this.board.zoomY;d.board.stretchX=this.board.stretchX;
d.board.stretchY=this.board.stretchY;d.board.origin=this.board.origin;d.board.canvasHeight=this.board.canvasHeight;
d.board.canvasWidth=this.board.canvasWidth;d.board.dimension=this.board.dimension;
d.board.algebra=this.board.algebra;d.visProp=this.visProp;a=this.getSlope();c=this.getRise();
d.getSlope=function(){return a};d.getRise=function(){return c};this.board.renderer.enhancedRendering=true;
this.board.renderer.drawLine(d);this.board.renderer.enhancedRendering=false;this.traces[d.id]=document.getElementById(d.id);
delete d};JXG.Line.prototype.addTransform=function(a){var c,b;if(JXG.isArray(a)){c=a
}else{c=[a]}for(b=0;b<c.length;b++){this.point1.transformations.push(c[b]);this.point2.transformations.push(c[b])
}};JXG.Line.prototype.setPosition=function(d,a,c){var b=this.board.create("transform",[a,c],{type:"translate"});
if(this.point1.transformations.length>0&&this.point1.transformations[this.point1.transformations.length-1].isNumericMatrix){this.point1.transformations[this.point1.transformations.length-1].melt(b)
}else{this.point1.addTransform(this.point1,b)}if(this.point2.transformations.length>0&&this.point2.transformations[this.point2.transformations.length-1].isNumericMatrix){this.point2.transformations[this.point2.transformations.length-1].melt(b)
}else{this.point2.addTransform(this.point2,b)}};JXG.Line.prototype.X=function(k){var n=this.stdform[1],m=this.stdform[2],l=this.stdform[0],g,f,d,e,h;
k*=Math.PI;g=n*Math.cos(k)+m*Math.sin(k);f=l;d=Math.sqrt(g*g+f*f);e=-f/d;h=g/d;if(Math.abs(h)<this.board.algebra.eps){h=1
}return e*Math.cos(k)/h};JXG.Line.prototype.Y=function(k){var n=this.stdform[1],m=this.stdform[2],l=this.stdform[0],g,f,d,e,h;
k*=Math.PI;g=n*Math.cos(k)+m*Math.sin(k);f=l;d=Math.sqrt(g*g+f*f);e=-f/d;h=g/d;if(Math.abs(h)<this.board.algebra.eps){h=1
}return e*Math.sin(k)/h};JXG.Line.prototype.Z=function(h){var f=this.stdform[1],e=this.stdform[2],m=this.stdform[0],d,l,g,k;
h*=Math.PI;d=f*Math.cos(h)+e*Math.sin(h);l=m;g=Math.sqrt(d*d+l*l);k=d/g;if(Math.abs(k)>=this.board.algebra.eps){return 1
}else{return 0}};JXG.Line.prototype.minX=function(){return 0};JXG.Line.prototype.maxX=function(){return 1
};JXG.Line.prototype.addTicks=function(a){if(a.id==""||typeof a.id=="undefined"){a.id=this.id+"_ticks_"+(this.ticks.length+1)
}this.board.renderer.drawTicks(a);this.ticks.push(a);this.ticks[this.ticks.length-1].updateRenderer();
return a.id};JXG.Line.prototype.removeAllTicks=function(){var a;for(a=this.ticks.length;
a>0;a--){this.board.renderer.remove(this.ticks[a-1].rendNode)}this.ticks=new Array()
};JXG.Line.prototype.removeTicks=function(c){var b,a;if(this.defaultTicks!=null&&this.defaultTicks==c){this.defaultTicks=null
}for(b=this.ticks.length;b>0;b--){if(this.ticks[b-1]==c){this.board.renderer.remove(this.ticks[b-1].rendNode);
for(a=0;a<this.ticks[b-1].ticks.length;a++){if(this.ticks[b-1].labels[a]!=null){if(this.ticks[b-1].labels[a].show){this.board.renderer.remove(this.ticks[b-1].labels[a].rendNode)
}}}delete (this.ticks[b-1])}}};JXG.createLine=function(g,k,f){var b,m,l,e,h=[];f=JXG.checkAttributes(f,{withLabel:JXG.readOption(g.options,"line","withLabel"),layer:null});
var d=false;if(k.length==2){if(k[0].length>1){m=g.create("point",k[0],{visible:false,fixed:true})
}else{if(k[0].elementClass==JXG.OBJECT_CLASS_POINT){m=JXG.getReference(g,k[0])}else{if((typeof k[0]=="function")&&(k[0]().elementClass==JXG.OBJECT_CLASS_POINT)){m=k[0]();
d=true}else{throw new Error("JSXGraph: Can't create line with parent types '"+(typeof k[0])+"' and '"+(typeof k[1])+"'.")
}}}if(k[1].length>1){l=g.create("point",k[1],{visible:false,fixed:true})}else{if(k[1].elementClass==JXG.OBJECT_CLASS_POINT){l=JXG.getReference(g,k[1])
}else{if((typeof k[1]=="function")&&(k[1]().elementClass==JXG.OBJECT_CLASS_POINT)){l=k[1]();
d=true}else{throw new Error("JSXGraph: Can't create line with parent types '"+(typeof k[0])+"' and '"+(typeof k[1])+"'.")
}}}b=new JXG.Line(g,m.id,l.id,f.id,f.name,f.withLabel,f.layer);if(d){b.constrained=true;
b.funp1=k[0];b.funp2=k[1]}}else{if(k.length==3){for(e=0;e<3;e++){if(typeof k[e]=="number"){h[e]=function(c){return function(){return c
}}(k[e])}else{if(typeof k[e]=="function"){h[e]=k[e]}else{throw new Error("JSXGraph: Can't create line with parent types '"+(typeof k[0])+"' and '"+(typeof k[1])+"' and '"+(typeof k[2])+"'.");
return}}}m=g.create("point",[function(){return 0},function(){return h[2]()},function(){return -h[1]()
}],{visible:false,name:" "});l=g.create("point",[function(){return h[2]()*h[2]()+h[1]()*h[1]()
},function(){return -h[1]()*h[0]()+h[2]()},function(){return -h[2]()*h[0]()-h[1]()
}],{visible:false,name:" "});b=new JXG.Line(g,m.id,l.id,f.id,f.name,f.withLabel)}else{if((k.length==1)&&(typeof k[0]=="function")&&(k[0]().length==2)&&(k[0]()[0].elementClass==JXG.OBJECT_CLASS_POINT)&&(k[0]()[1].elementClass==JXG.OBJECT_CLASS_POINT)){var a=k[0]();
b=new JXG.Line(g,a[0].id,a[1].id,f.id,f.name,f.withLabel,f.layer);b.constrained=true;
b.funps=k[0]}else{throw new Error("JSXGraph: Can't create line with parent types '"+(typeof k[0])+"' and '"+(typeof k[1])+"'.")
}}}return b};JXG.JSXGraph.registerElement("line",JXG.createLine);JXG.createSegment=function(c,a,d){var b;
d=JXG.checkAttributes(d,{withLabel:JXG.readOption(c.options,"line","withLabel"),layer:null});
d.straightFirst=false;d.straightLast=false;b=c.create("line",a,d);return b};JXG.JSXGraph.registerElement("segment",JXG.createSegment);
JXG.createArrow=function(d,b,a){var c;a=JXG.checkAttributes(a,{withLabel:JXG.readOption(d.options,"line","withLabel"),layer:null});
c=d.create("line",b,a);c.setStraight(false,false);c.setArrow(false,true);return c
};JXG.JSXGraph.registerElement("arrow",JXG.createArrow);JXG.createAxis=function(e,l,b){var h,g,m,f,c,a,d,k;
if((JXG.isArray(l[0])||JXG.isPoint(l[0]))&&(JXG.isArray(l[1])||JXG.isPoint(l[1]))){if(JXG.isPoint(l[0])){h=l[0]
}else{h=new JXG.Point(e,l[0],"","",false)}if(JXG.isPoint(l[1])){g=l[1]}else{g=new JXG.Point(e,l[1],"","",false)
}h.fixed=true;g.fixed=true;b=b||{};b.lastArrow=b.lastArrow||true;b.straightFirst=b.lastArrow||true;
b.straightLast=b.straightLast||true;b.strokeWidth=b.strokeWidth||1;b.withLabel=b.withLabel||false;
b.highlightStrokeColor=b.highlightStrokeColor||b.strokeColor||e.options.axis.highlightStrokeColor;
b.strokeColor=b.strokeColor||e.options.axis.strokeColor;m=e.create("line",[h,g],b);
m.needsRegularUpdate=false;b.minorTicks=b.minorTicks||4;b.insertTicks=b.insertTicks||"true";
if(b.ticksDistance!="undefined"&&b.ticksDistance!=null){f=b.ticksDistance}else{c=new JXG.Coords(JXG.COORDS_BY_USER,[m.point1.coords.usrCoords.slice(1)],e);
a=new JXG.Coords(JXG.COORDS_BY_USER,[m.point2.coords.usrCoords.slice(1)],e);e.renderer.calcStraight(m,c,a);
d=c.distance(JXG.COORDS_BY_USER,a);f=1}k=e.create("ticks",[m,f],b);k.needsRegularUpdate=false;
m.defaultTicks=k}else{throw new Error("JSXGraph: Can't create point with parent types '"+(typeof l[0])+"' and '"+(typeof l[1])+"'.")
}return m};JXG.JSXGraph.registerElement("axis",JXG.createAxis);JXG.createTangent=function(m,q,e){var a,n,k,l,h,d,b,r,s,u;
if(q.length==1){a=q[0];n=a.slideObject}else{if(q.length==2){if(JXG.isPoint(q[0])){a=q[0];
n=q[1]}else{if(JXG.isPoint(q[1])){n=q[0];a=q[1]}else{throw new Error("JSXGraph: Can't create normal with parent types '"+(typeof q[0])+"' and '"+(typeof q[1])+"'.")
}}}else{throw new Error("JSXGraph: Can't create normal with parent types '"+(typeof q[0])+"' and '"+(typeof q[1])+"'.")
}}e=JXG.checkAttributes(e,{withLabel:JXG.readOption(m.options,"line","withLabel"),layer:null});
if(n.elementClass==JXG.OBJECT_CLASS_LINE){u=m.create("line",[n.point1,n.point2],e)
}else{if(n.elementClass==JXG.OBJECT_CLASS_CURVE){if(n.curveType!="plot"){k=n.X;l=n.Y;
u=m.create("line",[function(){return -a.X()*m.D(l)(a.position)+a.Y()*m.D(k)(a.position)
},function(){return m.D(l)(a.position)},function(){return -m.D(k)(a.position)}],e);
a.addChild(u);u.glider=a}else{u=m.create("line",[function(){h=Math.floor(a.position);
if(h==n.numberPoints-1){h--}if(h<0){return 1}return n.Y(h)*n.X(h+1)-n.X(h)*n.Y(h+1)
},function(){h=Math.floor(a.position);if(h==n.numberPoints-1){h--}if(h<0){return 0
}return n.Y(h+1)-n.Y(h)},function(){h=Math.floor(a.position);if(h==n.numberPoints-1){h--
}if(h<0){return 0}return n.X(h)-n.X(h+1)}],e);a.addChild(u);u.glider=a}}else{if(n.type==JXG.OBJECT_TYPE_TURTLE){u=m.create("line",[function(){h=Math.floor(a.position);
for(d=0;d<n.objects.length;d++){b=n.objects[d];if(b.type==JXG.OBJECT_TYPE_CURVE){if(h<b.numberPoints){break
}h-=b.numberPoints}}if(h==b.numberPoints-1){h--}if(h<0){return 1}return b.Y(h)*b.X(h+1)-b.X(h)*b.Y(h+1)
},function(){h=Math.floor(a.position);for(d=0;d<n.objects.length;d++){b=n.objects[d];
if(b.type==JXG.OBJECT_TYPE_CURVE){if(h<b.numberPoints){break}h-=b.numberPoints}}if(h==b.numberPoints-1){h--
}if(h<0){return 0}return b.Y(h+1)-b.Y(h)},function(){h=Math.floor(a.position);for(d=0;
d<n.objects.length;d++){b=n.objects[d];if(b.type==JXG.OBJECT_TYPE_CURVE){if(h<b.numberPoints){break
}h-=b.numberPoints}}if(h==b.numberPoints-1){h--}if(h<0){return 0}return b.X(h)-b.X(h+1)
}],e);a.addChild(u);u.glider=a}else{if(n.elementClass==JXG.OBJECT_CLASS_CIRCLE){m.create("line",[function(){return JXG.Math.matVecMult(n.quadraticform,a.coords.usrCoords)[0]
},function(){return JXG.Math.matVecMult(n.quadraticform,a.coords.usrCoords)[1]},function(){return JXG.Math.matVecMult(n.quadraticform,a.coords.usrCoords)[2]
}],e);a.addChild(u);u.glider=a}}}}return u};JXG.JSXGraph.registerElement("tangent",JXG.createTangent);
JXG.Group=function(e,h,a){var f,d,b,g,c;this.board=e;this.objects={};f=this.board.numObjects;
this.board.numObjects++;if((h=="")||(h==null)||(typeof h=="undefined")){this.id=this.board.id+"Group"+f
}else{this.id=h}this.type=JXG.OBJECT_TYPE_POINT;this.elementClass=JXG.OBJECT_CLASS_POINT;
if((a=="")||(a==null)||(typeof a=="undefined")){this.name="group_"+this.board.generateName(this)
}else{this.name=a}delete (this.type);if((arguments.length==4)&&(JXG.isArray(arguments[3]))){d=arguments[3]
}else{d=[];for(b=3;b<arguments.length;b++){d.push(arguments[b])}}for(b=0;b<d.length;
b++){g=JXG.getReference(this.board,d[b]);if((!g.fixed)&&((g.type==JXG.OBJECT_TYPE_POINT)||(g.type==JXG.OBJECT_TYPE_GLIDER))){if(g.group.length!=0){this.addGroup(g.group[g.group.length-1])
}else{this.addPoint(g)}}}for(c in this.objects){this.objects[c].group.push(this)}this.dX=0;
this.dY=0};JXG.Group.prototype.ungroup=function(){var a;for(a in this.objects){if(this.objects[a].group[this.objects[a].group.length-1]==this){this.objects[a].group.pop()
}delete (this.objects[a])}};JXG.Group.prototype.update=function(a){var c=null,b;for(b in this.objects){c=this.objects[b];
if(c.id!=a.id){c.coords=new JXG.Coords(JXG.COORDS_BY_SCREEN,[c.coords.scrCoords[1]+this.dX,c.coords.scrCoords[2]+this.dY],c.board)
}}for(b in this.objects){if(this.board.objects[b]!=undefined){this.objects[b].update(false)
}else{delete (this.objects[b])}}};JXG.Group.prototype.addPoint=function(a){this.objects[a.id]=a
};JXG.Group.prototype.addPoints=function(a){var b;for(b in a){this.objects[b.id]=b
}};JXG.Group.prototype.addGroup=function(b){var a;for(a in b.objects){this.addPoint(b.objects[a])
}};JXG.createGroup=function(c,b,a){return new JXG.Group(c,a.id,a.name,b)};JXG.JSXGraph.registerElement("group",JXG.createGroup);
JXG.Circle=function(f,h,e,b,g,a,d,c){this.constructor();this.type=JXG.OBJECT_TYPE_CIRCLE;
this.elementClass=JXG.OBJECT_CLASS_CIRCLE;this.init(f,g,a);if(c==null){c=f.options.layer.circle
}this.layer=c;this.method=h;this.midpoint=JXG.getReference(this.board,e);this.midpoint.addChild(this);
this.visProp.visible=true;this.visProp.fillColor=this.board.options.circle.fillColor;
this.visProp.highlightFillColor=this.board.options.circle.highlightFillColor;this.visProp.strokeColor=this.board.options.circle.strokeColor;
this.visProp.highlightStrokeColor=this.board.options.circle.highlightStrokeColor;
this.point2=null;this.radius=0;this.line=null;this.circle=null;if(h=="twoPoints"){this.point2=JXG.getReference(f,b);
this.point2.addChild(this);this.radius=this.Radius()}else{if(h=="pointRadius"){this.generateTerm(b);
this.updateRadius()}else{if(h=="pointLine"){this.line=JXG.getReference(f,b);this.radius=this.line.point1.coords.distance(JXG.COORDS_BY_USER,this.line.point2.coords)
}else{if(h=="pointCircle"){this.circle=JXG.getReference(f,b);this.radius=this.circle.Radius()
}}}}if(d!=null){this.createLabel(d)}if(h=="twoPoints"){this.id=this.board.addCircle(this)
}else{if(h=="pointRadius"){this.id=this.board.addCircle(this);this.notifyParents(b)
}else{if(h=="pointLine"){this.line.addChild(this);this.id=this.board.addCircle(this)
}else{if(h=="pointCircle"){this.circle.addChild(this);this.id=this.board.addCircle(this)
}}}}};JXG.Circle.prototype=new JXG.GeometryElement;JXG.Circle.prototype.hasPoint=function(a,g){var b=this.board.options.precision.hasPoint/(this.board.stretchX),d=this.midpoint.coords.usrCoords,e=new JXG.Coords(JXG.COORDS_BY_SCREEN,[a,g],this.board),c=this.Radius();
var f=Math.sqrt((d[1]-e.usrCoords[1])*(d[1]-e.usrCoords[1])+(d[2]-e.usrCoords[2])*(d[2]-e.usrCoords[2]));
return(Math.abs(f-c)<b)};JXG.Circle.prototype.generatePolynomial=function(g){var e=this.midpoint.symbolic.x;
var d=this.midpoint.symbolic.y;var c=g.symbolic.x;var b=g.symbolic.y;var a=this.generateRadiusSquared();
if(a==""){return[]}var f="(("+c+")-("+e+"))^2 + (("+b+")-("+d+"))^2 - ("+a+")";return[f]
};JXG.Circle.prototype.generateRadiusSquared=function(){var b="";if(this.method=="twoPoints"){var d=this.midpoint.symbolic.x;
var c=this.midpoint.symbolic.y;var f=this.point2.symbolic.x;var e=this.point2.symbolic.y;
b="("+f+"-"+d+")^2 + ("+e+"-"+c+")^2"}else{if(this.method=="pointRadius"){if(typeof(this.radius)=="number"){b=""+this.radius*this.radius
}}else{if(this.method=="pointLine"){var f=this.line.point1.symbolic.x;var e=this.line.point1.symbolic.y;
var a=this.line.point2.symbolic.x;var g=this.line.point2.symbolic.y;b="("+f+"-"+a+")^2 + ("+e+"-"+g+")^2"
}else{if(this.method=="pointCircle"){b=this.circle.Radius()}}}}return b};JXG.Circle.prototype.update=function(){if(this.traced){this.cloneToBackground(true)
}if(this.needsUpdate){if(this.method=="pointLine"){this.radius=this.line.point1.coords.distance(JXG.COORDS_BY_USER,this.line.point2.coords)
}else{if(this.method=="pointCircle"){this.radius=this.circle.Radius()}else{if(this.method=="pointRadius"){this.radius=this.updateRadius()
}}}if(!this.board.geonextCompatibilityMode){this.updateStdform();this.updateQuadraticform()
}}};JXG.Circle.prototype.updateQuadraticform=function(){var a=this.midpoint,d=a.X(),c=a.Y(),b=this.Radius();
this.quadraticform=[[d*d+c*c-b*b,-d,-c],[-d,1,0],[-c,0,1]]};JXG.Circle.prototype.updateStdform=function(){this.stdform[3]=0.5;
this.stdform[4]=this.Radius();this.stdform[1]=-this.midpoint.coords.usrCoords[1];
this.stdform[2]=-this.midpoint.coords.usrCoords[2];this.normalize()};JXG.Circle.prototype.updateRenderer=function(){if(this.needsUpdate&&this.visProp.visible){var a=this.isReal;
this.isReal=(isNaN(this.midpoint.coords.usrCoords[1]+this.midpoint.coords.usrCoords[2]+this.Radius()))?false:true;
if(this.isReal){if(a!=this.isReal){this.board.renderer.show(this);if(this.hasLabel&&this.label.content.visProp.visible){this.board.renderer.show(this.label.content)
}}this.board.renderer.updateCircle(this)}else{if(a!=this.isReal){this.board.renderer.hide(this);
if(this.hasLabel&&this.label.content.visProp.visible){this.board.renderer.hide(this.label.content)
}}}this.needsUpdate=false}if(this.hasLabel&&this.label.content.visProp.visible&&this.isReal){this.label.content.update();
this.board.renderer.updateText(this.label.content)}};JXG.Circle.prototype.generateTerm=function(b){if(typeof b=="string"){var c=this.board.elementsByName;
var a=this.board.algebra.geonext2JS(b+"");this.updateRadius=new Function("return "+a+";")
}else{if(typeof b=="number"){this.updateRadius=function(){return b}}else{this.updateRadius=b
}}};JXG.Circle.prototype.notifyParents=function(b){var a=null;var c=this.board.elementsByName;
if(typeof b=="string"){this.board.algebra.findDependencies(this,b+"")}};JXG.Circle.prototype.Radius=function(){if(this.method=="twoPoints"){return(Math.sqrt(Math.pow(this.midpoint.coords.usrCoords[1]-this.point2.coords.usrCoords[1],2)+Math.pow(this.midpoint.coords.usrCoords[2]-this.point2.coords.usrCoords[2],2)))
}else{if(this.method=="pointLine"||this.method=="pointCircle"){return this.radius
}else{if(this.method=="pointRadius"){return this.updateRadius()}}}};JXG.Circle.prototype.getRadius=function(){return this.Radius()
};JXG.Circle.prototype.getTextAnchor=function(){return this.midpoint.coords};JXG.Circle.prototype.getLabelAnchor=function(){if(this.method=="twoPoints"){var b=this.midpoint.coords.usrCoords[1]-this.point2.coords.usrCoords[1];
var a=this.midpoint.coords.usrCoords[2]-this.point2.coords.usrCoords[2];return new JXG.Coords(JXG.COORDS_BY_USER,[this.midpoint.coords.usrCoords[1]+b,this.midpoint.coords.usrCoords[2]+a],this.board)
}else{if(this.method=="pointLine"||this.method=="pointCircle"||this.method=="pointRadius"){return new JXG.Coords(JXG.COORDS_BY_USER,[this.midpoint.coords.usrCoords[1]-this.Radius(),this.midpoint.coords.usrCoords[2]],this.board)
}}};JXG.Circle.prototype.cloneToBackground=function(a){var c={};c.id=this.id+"T"+this.numTraces;
this.numTraces++;c.midpoint={};c.midpoint.coords=this.midpoint.coords;var b=this.Radius();
c.Radius=function(){return b};c.getRadius=function(){return b};c.board={};c.board.unitX=this.board.unitX;
c.board.unitY=this.board.unitY;c.board.zoomX=this.board.zoomX;c.board.zoomY=this.board.zoomY;
c.board.stretchX=this.board.stretchX;c.board.stretchY=this.board.stretchY;c.visProp=this.visProp;
JXG.clearVisPropOld(c);this.board.renderer.drawCircle(c);this.traces[c.id]=document.getElementById(c.id);
delete c};JXG.Circle.prototype.addTransform=function(a){var c;if(JXG.isArray(a)){c=a
}else{c=[a]}for(var b=0;b<c.length;b++){this.midpoint.transformations.push(c[b]);
if(this.method=="twoPoints"){this.point2.transformations.push(c[b])}}};JXG.Circle.prototype.setPosition=function(d,a,c){var b=this.board.create("transform",[a,c],{type:"translate"});
this.addTransform(b)};JXG.Circle.prototype.X=function(a){a*=2*Math.PI;return this.Radius()*Math.cos(a)+this.midpoint.coords.usrCoords[1]
};JXG.Circle.prototype.Y=function(a){a*=2*Math.PI;return this.Radius()*Math.sin(a)+this.midpoint.coords.usrCoords[2]
};JXG.Circle.prototype.minX=function(){return 0};JXG.Circle.prototype.maxX=function(){return 1
};JXG.Circle.prototype.Area=function(){var a=this.Radius();return a*a*Math.PI};JXG.createCircle=function(d,g,f){var c,e,b;
f=JXG.checkAttributes(f,{withLabel:JXG.readOption(d.options,"circle","withLabel"),layer:null});
e=[];for(b=0;b<g.length;b++){if(JXG.isPoint(g[b])){e[b]=g[b]}else{if(g[b].length>1){e[b]=d.create("point",g[b],{visible:false,fixed:true})
}else{e[b]=g[b]}}}if(g.length==2&&JXG.isPoint(e[0])&&JXG.isPoint(e[1])){c=new JXG.Circle(d,"twoPoints",e[0],e[1],f.id,f.name,f.withLabel,f.layer)
}else{if((JXG.isNumber(e[0])||JXG.isFunction(e[0])||JXG.isString(e[0]))&&JXG.isPoint(e[1])){c=new JXG.Circle(d,"pointRadius",e[1],e[0],f.id,f.name,f.withLabel,f.layer)
}else{if((JXG.isNumber(e[1])||JXG.isFunction(e[1])||JXG.isString(e[1]))&&JXG.isPoint(e[0])){c=new JXG.Circle(d,"pointRadius",e[0],e[1],f.id,f.name,f.withLabel,f.layer)
}else{if((e[0].type==JXG.OBJECT_TYPE_CIRCLE)&&JXG.isPoint(e[1])){c=new JXG.Circle(d,"pointCircle",e[1],e[0],f.id,f.name,f.withLabel,f.layer)
}else{if((e[1].type==JXG.OBJECT_TYPE_CIRCLE)&&JXG.isPoint(e[0])){c=new JXG.Circle(d,"pointCircle",e[0],e[1],f.id,f.name,f.withLabel,f.layer)
}else{if((e[0].type==JXG.OBJECT_TYPE_LINE)&&JXG.isPoint(e[1])){c=new JXG.Circle(d,"pointLine",e[1],e[0],f.id,f.name,f.withLabel,f.layer)
}else{if((e[1].type==JXG.OBJECT_TYPE_LINE)&&JXG.isPoint(e[0])){c=new JXG.Circle(d,"pointLine",e[0],e[1],f.id,f.name,f.withLabel,f.layer)
}else{if(g.length==3&&JXG.isPoint(e[0])&&JXG.isPoint(e[1])&&JXG.isPoint(e[2])){var a=JXG.createCircumcircle(d,e,f);
a[0].setProperty({visible:false});return a[1]}else{throw new Error("JSXGraph: Can't create circle with parent types '"+(typeof g[0])+"' and '"+(typeof g[1])+"'.")
}}}}}}}}return c};JXG.JSXGraph.registerElement("circle",JXG.createCircle);JXG.createEllipse=function(h,l,g){var n=[],b,a,e,f;
g=JXG.checkAttributes(g,{withLabel:JXG.readOption(h.options,"conic","withLabel"),layer:null});
for(e=0;e<2;e++){if(l[e].length>1){n[e]=h.create("point",l[e],{visible:false,fixed:true})
}else{if(JXG.isPoint(l[e])){n[e]=JXG.getReference(h,l[e])}else{if((typeof l[e]=="function")&&(l[e]().elementClass==JXG.OBJECT_CLASS_POINT)){n[e]=l[e]()
}else{if(JXG.isString(l[e])){n[e]=JXG.getReference(h,l[e])}else{throw new Error("JSXGraph: Can't create Ellipse with parent types '"+(typeof l[0])+"' and '"+(typeof l[1])+"'.")
}}}}}if(JXG.isNumber(l[2])){a=JXG.createFunction(l[2],h)}else{if(JXG.isPoint(l[2])){b=JXG.getReference(h,l[2])
}else{if(l[2].length>1){b=h.create("point",l[2],{visible:false,fixed:true})}else{if((typeof l[2]=="function")&&(l[2]().elementClass==JXG.OBJECT_CLASS_POINT)){b=l[2]()
}else{if(JXG.isString(l[2])){b=JXG.getReference(h,l[2])}else{throw new Error("JSXGraph: Can't create Ellipse with parent types '"+(typeof l[0])+"' and '"+(typeof l[1])+"' and '"+(typeof l[2])+"'.")
}}}}a=function(){return b.Dist(n[0])+b.Dist(n[1])}}if(typeof l[4]=="undefined"){l[4]=1.0001*Math.PI
}if(typeof l[3]=="undefined"){l[3]=-1.0001*Math.PI}g=JXG.checkAttributes(g,{curveType:"parameter"});
var k=h.create("point",[function(){return(n[0].X()+n[1].X())*0.5},function(){return(n[0].Y()+n[1].Y())*0.5
}],{visible:false,name:"",withLabel:false});var m=function(){var s=n[0].X(),r=n[0].Y(),x=n[1].X(),v=n[1].Y(),u;
var w=(x-s>0)?1:-1;if(Math.abs(x-s)>1e-7){u=Math.atan2(v-r,x-s)+((w<0)?Math.PI:0)
}else{u=((v-r>0)?0.5:-0.5)*Math.PI}var q=[[1,0,0],[k.X(),Math.cos(u),-Math.sin(u)],[k.Y(),Math.sin(u),Math.cos(u)]];
return q};var d=function(s,u){var r=a()*0.5,v=n[1].Dist(n[0])*0.5,q=Math.sqrt(r*r-v*v);
if(!u){f=m()}return JXG.Math.matVecMult(f,[1,r*Math.cos(s),q*Math.sin(s)])};var c=h.create("curve",[function(q,r){return d(q,r)[1]
},function(q,r){return d(q,r)[2]},l[3],l[4]],g);return c};JXG.createHyperbola=function(h,l,g){var n=[],b,a,e,f;
g=JXG.checkAttributes(g,{withLabel:JXG.readOption(h.options,"conic","withLabel"),layer:null});
for(e=0;e<2;e++){if(l[e].length>1){n[e]=h.create("point",l[e],{visible:false,fixed:true})
}else{if(JXG.isPoint(l[e])){n[e]=JXG.getReference(h,l[e])}else{if((typeof l[e]=="function")&&(l[e]().elementClass==JXG.OBJECT_CLASS_POINT)){n[e]=l[e]()
}else{if(JXG.isString(l[e])){n[e]=JXG.getReference(h,l[e])}else{throw new Error("JSXGraph: Can't create Hyperbola with parent types '"+(typeof l[0])+"' and '"+(typeof l[1])+"'.")
}}}}}if(JXG.isNumber(l[2])){a=JXG.createFunction(l[2],h)}else{if(JXG.isPoint(l[2])){b=JXG.getReference(h,l[2])
}else{if(l[2].length>1){b=h.create("point",l[2],{visible:false,fixed:true})}else{if((typeof l[2]=="function")&&(l[2]().elementClass==JXG.OBJECT_CLASS_POINT)){b=l[2]()
}else{if(JXG.isString(l[2])){b=JXG.getReference(h,l[2])}else{throw new Error("JSXGraph: Can't create Hyperbola with parent types '"+(typeof l[0])+"' and '"+(typeof l[1])+"' and '"+(typeof l[2])+"'.")
}}}}a=function(){return b.Dist(n[0])-b.Dist(n[1])}}if(typeof l[4]=="undefined"){l[4]=1.0001*Math.PI
}if(typeof l[3]=="undefined"){l[3]=-1.0001*Math.PI}g=JXG.checkAttributes(g,{curveType:"parameter"});
var k=h.create("point",[function(){return(n[0].X()+n[1].X())*0.5},function(){return(n[0].Y()+n[1].Y())*0.5
}],{visible:false,name:"",withLabel:false});var m=function(){var s=n[0].X(),r=n[0].Y(),x=n[1].X(),v=n[1].Y(),u;
var w=(x-s>0)?1:-1;if(Math.abs(x-s)>1e-7){u=Math.atan2(v-r,x-s)+((w<0)?Math.PI:0)
}else{u=((v-r>0)?0.5:-0.5)*Math.PI}var q=[[1,0,0],[k.X(),Math.cos(u),-Math.sin(u)],[k.Y(),Math.sin(u),Math.cos(u)]];
return q};var d=function(s,u){var r=a()*0.5,v=n[1].Dist(n[0])*0.5,q=Math.sqrt(-r*r+v*v);
if(!u){f=m()}return JXG.Math.matVecMult(f,[1,r/Math.cos(s),q*Math.tan(s)])};var c=h.create("curve",[function(q,r){return d(q,r)[1]
},function(q,r){return d(q,r)[2]},l[3],l[4]],g);return c};JXG.createParabola=function(g,k,f){var e=k[0],b=k[1],d;
f=JXG.checkAttributes(f,{withLabel:JXG.readOption(g.options,"conic","withLabel"),layer:null});
if(k[0].length>1){e=g.create("point",k[0],{visible:false,fixed:true})}else{if(JXG.isPoint(k[0])){e=JXG.getReference(g,k[0])
}else{if((typeof k[0]=="function")&&(k[0]().elementClass==JXG.OBJECT_CLASS_POINT)){e=k[0]()
}else{if(JXG.isString(k[0])){e=JXG.getReference(g,k[0])}else{throw new Error("JSXGraph: Can't create Parabola with parent types '"+(typeof k[0])+"' and '"+(typeof k[1])+"'.")
}}}}if(typeof k[3]=="undefined"){k[3]=10}if(typeof k[2]=="undefined"){k[2]=-10}f=JXG.checkAttributes(f,{curveType:"parameter"});
var h=g.create("point",[function(){var l=[0,b.stdform[1],b.stdform[2]];l=JXG.Math.crossProduct(l,e.coords.usrCoords);
return g.algebra.meetLineLine(l,b.stdform,0).usrCoords}],{visible:false,name:"",withLabel:false});
var m=function(){var q=Math.atan(b.getSlope()),n=(h.X()+e.X())*0.5,r=(h.Y()+e.Y())*0.5;
q+=(e.Y()-h.Y()<0||(e.Y()==h.Y()&&e.X()>h.X()))?Math.PI:0;var l=[[1,0,0],[n*(1-Math.cos(q))+r*Math.sin(q),Math.cos(q),-Math.sin(q)],[r*(1-Math.cos(q))-n*Math.sin(q),Math.sin(q),Math.cos(q)]];
return l};var c=function(l,n){var q=h.Dist(e)*0.5;if(!n){d=m()}return JXG.Math.matVecMult(d,[1,l+(h.X()+e.X())*0.5,l*l/(q*4)+(h.Y()+e.Y())*0.5])
};var a=g.create("curve",[function(l,n){return c(l,n)[1]},function(l,n){return c(l,n)[2]
},k[2],k[3]],f);return a};JXG.createConic=function(e,x,q){var g,C,A,z,y,f,r,n,u=[],v,s,B=(x.length==5)?true:false,m=[];
q=JXG.checkAttributes(q,{withLabel:JXG.readOption(e.options,"conic","withLabel"),layer:null});
if(B){for(v=0;v<5;v++){if(x[v].length>1){u[v]=e.create("point",x[v],{visible:false,fixed:true})
}else{if(JXG.isPoint(x[v])){u[v]=JXG.getReference(e,x[v])}else{if((typeof x[v]=="function")&&(x[v]().elementClass==JXG.OBJECT_CLASS_POINT)){u[v]=x[v]()
}else{if(JXG.isString(x[v])){u[v]=JXG.getReference(e,x[v])}else{throw new Error("JSXGraph: Can't create Conic section with parent types '"+(typeof x[v])+"'.")
}}}}}}else{f=[[-x[2],x[5]*2,x[4]*0.5],[x[5]*2,-x[0],x[3]*0.5],[x[4]*0.5,x[3]*0.5,-x[1]]]
}var h=function(a){var c,b;for(c=0;c<3;c++){for(b=c;b<3;b++){a[c][b]+=a[b][c]}}for(c=0;
c<3;c++){for(b=0;b<c;b++){a[c][b]=a[b][c]}}return a};var l=function(b,a){var E,c,D=[[0,0,0],[0,0,0],[0,0,0]];
for(E=0;E<3;E++){for(c=0;c<3;c++){D[E][c]=b[E]*a[c]}}return h(D)};var w=function(D,b,c){var G,I,a,H=[[0,0,0],[0,0,0],[0,0,0]],F,E;
a=JXG.Math.matVecMult(b,c);G=JXG.Math.innerProduct(c,a);a=JXG.Math.matVecMult(D,c);
I=JXG.Math.innerProduct(c,a);for(F=0;F<3;F++){for(E=0;E<3;E++){H[F][E]=G*D[F][E]-I*b[F][E]
}}return H};var d=function(E,F){var D,c,a,b;if(!F){if(B){for(D=0;D<5;D++){m[D]=u[D].coords.usrCoords
}r=l(JXG.Math.crossProduct(m[0],m[1]),JXG.Math.crossProduct(m[2],m[3]));n=l(JXG.Math.crossProduct(m[0],m[2]),JXG.Math.crossProduct(m[1],m[3]));
f=w(r,n,m[4])}C=JXG.Math.Numerics.Jacobi(f);if(C[0][0][0]<0){C[0][0][0]*=(-1);C[0][1][1]*=(-1);
C[0][2][2]*=(-1)}for(D=0;D<3;D++){a=0;for(c=0;c<3;c++){a+=C[1][c][D]*C[1][c][D]}a=Math.sqrt(a);
for(c=0;c<3;c++){C[1][c][D]/=a}}g=C[1];y=Math.sqrt(Math.abs(C[0][0][0]));A=Math.sqrt(Math.abs(C[0][1][1]));
z=Math.sqrt(Math.abs(C[0][2][2]))}if(C[0][1][1]<0){b=JXG.Math.matVecMult(g,[1/y,Math.cos(E)/A,Math.sin(E)/z])
}else{if(C[0][2][2]<0){b=JXG.Math.matVecMult(g,[Math.sin(E)/y,Math.cos(E)/A,1/z])
}}b[1]/=b[0];b[2]/=b[0];b[0]=1;return b};var k=e.create("curve",[function(a,b){return d(a,b)[1]
},function(a,b){return d(a,b)[2]},-Math.PI,Math.PI],q);return k};JXG.JSXGraph.registerElement("ellipse",JXG.createEllipse);
JXG.JSXGraph.registerElement("hyperbola",JXG.createHyperbola);JXG.JSXGraph.registerElement("parabola",JXG.createParabola);
JXG.JSXGraph.registerElement("conic",JXG.createConic);JXG.Polygon=function(m,n,q,c,b,d,a,g,k){this.constructor();
this.type=JXG.OBJECT_TYPE_POLYGON;this.elementClass=JXG.OBJECT_CLASS_AREA;this.init(m,c,b);
if(k==null){k=m.options.layer.polygon}this.layer=k;if((typeof d=="undefined")||(d==null)){d=true
}if((typeof g=="undefined")||(g==null)){g=false}this.withLines=d;this.vertices=[];
for(var f=0;f<n.length;f++){var h=JXG.getReference(this.board,n[f]);this.vertices[f]=h
}if((typeof q=="undefined")||(q==null)){q=[];for(var f=0;f<n.length-1;f++){q[f]={}
}}if(this.vertices[this.vertices.length-1]!=this.vertices[0]){this.vertices.push(this.vertices[0]);
q.push({})}this.visProp.fillColor=this.board.options.polygon.fillColor;this.visProp.highlightFillColor=this.board.options.polygon.highlightFillColor;
this.visProp.fillOpacity=this.board.options.polygon.fillOpacity;this.visProp.highlightFillOpacity=this.board.options.polygon.highlightFillOpacity;
var e;this.borders=[];if(d){for(var f=0;f<this.vertices.length-1;f++){e=new JXG.Line(m,this.vertices[f],this.vertices[f+1],q[f].id,q[f].name,g,this.layer);
e.setStraight(false,false);this.borders[f]=e;e.parentPolygon=this}}for(var f=0;f<this.vertices.length-1;
f++){var h=JXG.getReference(this.board,this.vertices[f]);h.addChild(this)}this.createLabel(a,[0,0]);
this.id=this.board.addPolygon(this)};JXG.Polygon.prototype=new JXG.GeometryElement;
JXG.Polygon.prototype.hasPoint=function(a,b){return false};JXG.Polygon.prototype.updateRenderer=function(){if(this.needsUpdate){this.board.renderer.updatePolygon(this);
this.needsUpdate=false}if(this.hasLabel&&this.label.content.visProp.visible){this.label.content.update();
this.board.renderer.updateText(this.label.content)}};JXG.Polygon.prototype.getTextAnchor=function(){var e=0;
var d=0;var c=0;var g=0;e=c=this.vertices[0].X();d=g=this.vertices[0].Y();for(var f=0;
f<this.vertices.length;f++){if(this.vertices[f].X()<e){e=this.vertices[f].X()}if(this.vertices[f].X()>c){c=this.vertices[f].X()
}if(this.vertices[f].Y()>d){d=this.vertices[f].Y()}if(this.vertices[f].Y()<g){g=this.vertices[f].Y()
}}return new JXG.Coords(JXG.COORDS_BY_USER,[(e+c)*0.5,(d+g)*0.5],this.board)};JXG.Polygon.prototype.getLabelAnchor=function(){var e=0;
var d=0;var c=0;var g=0;e=c=this.vertices[0].X();d=g=this.vertices[0].Y();for(var f=0;
f<this.vertices.length;f++){if(this.vertices[f].X()<e){e=this.vertices[f].X()}if(this.vertices[f].X()>c){c=this.vertices[f].X()
}if(this.vertices[f].Y()>d){d=this.vertices[f].Y()}if(this.vertices[f].Y()<g){g=this.vertices[f].Y()
}}return new JXG.Coords(JXG.COORDS_BY_USER,[(e+c)*0.5,(d+g)*0.5],this.board)};JXG.Polygon.prototype.cloneToBackground=function(a){var b={};
b.id=this.id+"T"+this.numTraces;this.numTraces++;b.vertices=this.vertices;b.visProp=this.visProp;
JXG.clearVisPropOld(b);this.board.renderer.drawPolygon(b);this.traces[b.id]=$(b.id);
delete b};JXG.createPolygon=function(d,a,e){var c,b;e=JXG.checkAttributes(e,{withLabel:JXG.readOption(d.options,"polygon","withLabel"),layer:null});
for(b=0;b<a.length;b++){a[b]=JXG.getReference(d,a[b]);if(!JXG.isPoint(a[b])){throw new Error("JSXGraph: Can't create polygon with parent types other than 'point'.")
}}c=new JXG.Polygon(d,a,e.borders,e.id,e.name,e.withLines,e.withLabel,e.lineLabels,e.layer);
if(e.withLines||true){for(b=0;b<c.borders.length;b++){c.borders[b].setProperty(e)
}}return c};JXG.JSXGraph.registerElement("polygon",JXG.createPolygon);JXG.Polygon.prototype.hideElement=function(){this.visProp.visible=false;
this.board.renderer.hide(this);if(this.withLines){for(var a=0;a<this.borders.length;
a++){this.borders[a].hideElement()}}if(this.hasLabel&&this.label!=null){this.label.hiddenByParent=true;
if(this.label.content.visProp.visible){this.board.renderer.hide(this.label.content)
}}};JXG.Polygon.prototype.showElement=function(){this.visProp.visible=true;this.board.renderer.show(this);
if(this.withLines){for(var a=0;a<this.borders.length;a++){this.borders[a].showElement()
}}};JXG.Polygon.prototype.Area=function(){var b=0,a;for(a=0;a<this.vertices.length-1;
a++){b+=(this.vertices[a].X()*this.vertices[a+1].Y()-this.vertices[a+1].X()*this.vertices[a].Y())
}b/=2;return Math.abs(b)};JXG.createRegularPolygon=function(k,q,h){var d,f,e,a=[],b,m,g,l;
h=JXG.checkAttributes(h,{withLabel:JXG.readOption(k.options,"polygon","withLabel"),layer:null});
if(JXG.isNumber(q[q.length-1])&&q.length!=3){throw new Error("JSXGraph: A regular polygon needs two point and a number as input.")
}g=q.length;e=q[g-1];if((!JXG.isNumber(e)&&!JXG.isPoint(JXG.getReference(k,e)))||e<3){throw new Error("JSXGraph: The third parameter has to be number greater than 2 or a point.")
}if(JXG.isPoint(JXG.getReference(k,e))){e=g;l=true}else{g--;l=false}for(f=0;f<g;f++){q[f]=JXG.getReference(k,q[f]);
if(!JXG.isPoint(q[f])){throw new Error("JSXGraph: Can't create regular polygon if the first two parameters aren't points.")
}}a[0]=q[0];a[1]=q[1];for(f=2;f<e;f++){b=k.create("transform",[Math.PI*(2-(e-2)/e),a[f-1]],{type:"rotate"});
if(l){a[f]=q[f];a[f].addTransform(q[f-2],b)}else{a[f]=k.create("point",[a[f-2],b],{name:"",withLabel:false,fixed:true,face:"o",size:1})
}}d=k.create("polygon",a,h);return d};JXG.JSXGraph.registerElement("regularpolygon",JXG.createRegularPolygon);
JXG.Curve=function(e,b,f,a,d,c){this.constructor();this.points=[];this.type=JXG.OBJECT_TYPE_CURVE;
this.elementClass=JXG.OBJECT_CLASS_CURVE;this.init(e,f,a);if(c==null){c=e.options.layer.curve
}this.layer=c;this.doAdvancedPlot=this.board.options.curve.doAdvancedPlot;this.numberPointsHigh=this.board.options.curve.numberPointsHigh;
this.numberPointsLow=this.board.options.curve.numberPointsLow;this.numberPoints=this.numberPointsHigh;
this.visProp.strokeWidth=this.board.options.curve.strokeWidth;this.visProp.visible=true;
this.dataX=null;this.dataY=null;this.curveType=null;if(b[0]!=null){this.varname=b[0]
}else{this.varname="x"}this.xterm=b[1];this.yterm=b[2];this.generateTerm(this.varname,this.xterm,this.yterm,b[3],b[4]);
this.updateCurve();this.createLabel(d);this.id=this.board.addCurve(this);if(typeof this.xterm=="string"){this.notifyParents(this.xterm)
}if(typeof this.yterm=="string"){this.notifyParents(this.yterm)}};JXG.Curve.prototype=new JXG.GeometryElement;
JXG.Curve.prototype.minX=function(){if(this.curveType=="polar"){return 0}else{var a=new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],this.board);
return a.usrCoords[1]}};JXG.Curve.prototype.maxX=function(){var a;if(this.curveType=="polar"){return 2*Math.PI
}else{a=new JXG.Coords(JXG.COORDS_BY_SCREEN,[this.board.canvasWidth,0],this.board);
return a.usrCoords[1]}};JXG.Curve.prototype.hasPoint=function(r,q){var s,A=Infinity,I,k,C,B,v,u,w,b,J,z,m,G,h,F,f,l,n,E=this.numberPointsLow,H=(this.maxX()-this.minX())/E,a=this.board.options.precision.hasPoint/(this.board.unitX*this.board.zoomX),e,D,g=true;
a=a*a;e=new JXG.Coords(JXG.COORDS_BY_SCREEN,[r,q],this.board);r=e.usrCoords[1];q=e.usrCoords[2];
if(this.curveType=="parameter"||this.curveType=="polar"||this.curveType=="functiongraph"){D=this.transformations.length;
for(C=0,s=this.minX();C<E;C++){v=this.X(s,g);u=this.Y(s,g);for(B=0;B<D;B++){k=this.transformations[B];
k.update();I=JXG.Math.matVecMult(k.matrix,[1,v,u]);v=I[1];u=I[2]}A=(r-v)*(r-v)+(q-u)*(q-u);
if(A<a){return true}s+=H}}else{if(this.curveType=="plot"){D=this.numberPoints;for(C=0;
C<D-1;C++){w=this.X(C);b=this.X(C+1);J=this.Y(C);z=this.Y(C+1);F=b-w;f=z-J;G=r-w;
h=q-J;n=F*F+f*f;if(n>=JXG.Math.eps){l=G*F+h*f;m=l/n;A=G*G+h*h-m*l}else{m=0;A=G*G+h*h
}if(m>=0&&m<=1&&A<a){return true}}return false}}return(A<a)};JXG.Curve.prototype.allocatePoints=function(){var b,a;
a=this.numberPoints;if(this.points.length<this.numberPoints){for(b=this.points.length;
b<a;b++){this.points[b]=new JXG.Coords(JXG.COORDS_BY_USER,[0,0],this.board)}}};JXG.Curve.prototype.update=function(){if(this.needsUpdate){this.updateCurve()
}return this};JXG.Curve.prototype.updateRenderer=function(){if(this.needsUpdate){this.board.renderer.updateCurve(this);
this.needsUpdate=false}if(this.hasLabel&&this.label.content.visProp.visible){this.label.content.update();
this.board.renderer.updateText(this.label.content)}return this};JXG.Curve.prototype.updateDataArray=function(){return this
};JXG.Curve.prototype.updateCurve=function(){var b,c,g,a,f,d,e=false;this.updateDataArray();
c=this.minX();g=this.maxX();if(this.dataX!=null){this.numberPoints=this.dataX.length;
b=this.numberPoints;this.allocatePoints();for(d=0;d<b;d++){a=d;if(this.dataY!=null){f=d
}else{f=this.X(a)}this.points[d].setCoordinates(JXG.COORDS_BY_USER,[this.X(a,e),this.Y(f,e)],false);
this.updateTransform(this.points[d]);e=true}}else{if(this.doAdvancedPlot){this.updateParametricCurve(c,g,b)
}else{if(this.board.updateQuality==this.board.BOARD_QUALITY_HIGH){this.numberPoints=this.numberPointsHigh
}else{this.numberPoints=this.numberPointsLow}b=this.numberPoints;this.allocatePoints();
this.updateParametricCurveNaive(c,g,b)}}this.getLabelAnchor();return this};JXG.Curve.prototype.updateParametricCurveNaive=function(c,g,b){var e,d,f=false,a=(g-c)/b;
for(e=0;e<b;e++){d=c+e*a;this.points[e].setCoordinates(JXG.COORDS_BY_USER,[this.X(d,f),this.Y(d,f)],false);
this.updateTransform(this.points[e]);f=true}return this};JXG.Curve.prototype.updateParametricCurve=function(B,a,v){var s,k,h,c=false,u=new JXG.Coords(JXG.COORDS_BY_USER,[0,0],this.board),g,f,z,b,l,D,C,n,e,r=[],d=[],A=[],w=[],m=false,q=0;
if(this.board.updateQuality==this.board.BOARD_QUALITY_LOW){C=12;n=12;e=12}else{C=20;
n=2;e=2}w[0]=a-B;for(s=1;s<C;s++){w[s]=w[s-1]*0.5}s=1;r[0]=1;d[0]=0;k=B;u.setCoordinates(JXG.COORDS_BY_USER,[this.X(k,c),this.Y(k,c)],false);
c=true;z=u.scrCoords[1];b=u.scrCoords[2];h=k;k=a;u.setCoordinates(JXG.COORDS_BY_USER,[this.X(k,c),this.Y(k,c)],false);
g=u.scrCoords[1];f=u.scrCoords[2];A[0]=[g,f];l=1;D=0;this.points=[];this.points[q++]=new JXG.Coords(JXG.COORDS_BY_SCREEN,[z,b],this.board);
do{m=this.isDistOK(z,b,g,f,n,e)||this.isSegmentOutside(z,b,g,f);while(D<C&&(!m||D<3)&&!(!this.isSegmentDefined(z,b,g,f)&&D>8)){r[l]=s;
d[l]=D;A[l]=[g,f];l++;s=2*s-1;D++;k=B+s*w[D];u.setCoordinates(JXG.COORDS_BY_USER,[this.X(k,c),this.Y(k,c)],false);
g=u.scrCoords[1];f=u.scrCoords[2];m=this.isDistOK(z,b,g,f,n,e)||this.isSegmentOutside(z,b,g,f)
}this.points[q]=new JXG.Coords(JXG.COORDS_BY_SCREEN,[g,f],this.board);this.updateTransform(this.points[q]);
q++;z=g;b=f;h=k;l--;g=A[l][0];f=A[l][1];D=d[l]+1;s=r[l]*2}while(l!=0);this.numberPoints=this.points.length;
return this};JXG.Curve.prototype.isSegmentOutside=function(b,d,a,c){if(d<0&&c<0){return true
}else{if(d>this.board.canvasHeight&&c>this.board.canvasHeight){return true}else{if(b<0&&a<0){return true
}else{if(b>this.board.canvasWidth&&a>this.board.canvasWidth){return true}}}}return false
};JXG.Curve.prototype.isDistOK=function(d,f,c,e,b,a){if(isNaN(d+f+c+e)){return false
}return(Math.abs(c-d)<a&&Math.abs(e-f)<a)};JXG.Curve.prototype.isSegmentDefined=function(b,d,a,c){if(isNaN(b+d)&&isNaN(a+c)){return false
}return true};JXG.Curve.prototype.updateTransform=function(e){var d,f,b,a=this.transformations.length;
if(a==0){return e}for(b=0;b<a;b++){d=this.transformations[b];d.update();f=JXG.Math.matVecMult(d.matrix,e.usrCoords);
e.setCoordinates(JXG.COORDS_BY_USER,[f[1],f[2]])}return e};JXG.Curve.prototype.addTransform=function(b){var d,c,a;
if(JXG.isArray(b)){d=b}else{d=[b]}a=d.length;for(c=0;c<a;c++){this.transformations.push(d[c])
}return this};JXG.Curve.prototype.setPosition=function(d,a,c){var b=this.board.create("transform",[a,c],{type:"translate"});
if(this.transformations.length>0&&this.transformations[this.transformations.length-1].isNumericMatrix){this.transformations[this.transformations.length-1].melt(b)
}else{this.addTransform(b)}return this};JXG.Curve.prototype.generateTerm=function(b,f,c,a,g){var e,d;
if(JXG.isArray(f)){this.dataX=f;this.X=function(h){return this.dataX[h]};this.curveType="plot";
this.numberPoints=this.dataX.length}else{this.X=JXG.createFunction(f,this.board,b);
if(JXG.isString(f)){this.curveType="functiongraph"}else{if(JXG.isFunction(f)||JXG.isNumber(f)){this.curveType="parameter"
}}}if(JXG.isArray(c)){this.dataY=c;this.Y=function(h){if(JXG.isFunction(this.dataY[h])){return this.dataY[h]()
}else{return this.dataY[h]}}}else{this.Y=JXG.createFunction(c,this.board,b)}if(JXG.isFunction(f)&&JXG.isArray(c)){e=JXG.createFunction(c[0],this.board,"");
d=JXG.createFunction(c[1],this.board,"");this.X=function(h){return(f)(h)*Math.cos(h)+e()
};this.Y=function(h){return(f)(h)*Math.sin(h)+d()};this.curveType="polar"}if(a!=null){this.minX=JXG.createFunction(a,this.board,"")
}if(g!=null){this.maxX=JXG.createFunction(g,this.board,"")}};JXG.Curve.prototype.notifyParents=function(a){this.board.algebra.findDependencies(this,a)
};JXG.Curve.prototype.getLabelAnchor=function(){var a=new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,this.board.canvasHeight*0.5],this.board);
a=this.board.algebra.projectCoordsToCurve(a.usrCoords[1],a.usrCoords[2],0,this)[0];
return a};JXG.createCurve=function(c,b,a){a=JXG.checkAttributes(a,{withLabel:JXG.readOption(c.options,"curve","withLabel"),layer:null});
return new JXG.Curve(c,["x"].concat(b),a.id,a.name,a.withLabel,a.layer)};JXG.JSXGraph.registerElement("curve",JXG.createCurve);
JXG.createFunctiongraph=function(d,b,a){var c=["x","x"].concat(b);a=JXG.checkAttributes(a,{withLabel:JXG.readOption(d.options,"curve","withLabel"),layer:null});
a.curveType="functiongraph";return new JXG.Curve(d,c,a.id,a.name,a.withLabel,a.layer)
};JXG.JSXGraph.registerElement("functiongraph",JXG.createFunctiongraph);JXG.createSpline=function(c,b,a){var d;
a=JXG.checkAttributes(a,{withLabel:JXG.readOption(c.options,"curve","withLabel"),layer:null});
d=function(){var g,e=[],h=[];var f=function(n,m){var l,k;if(!m){e=[];h=[];if(b.length==2&&JXG.isArray(b[0])&&JXG.isArray(b[1])&&b[0].length==b[1].length){for(l=0;
l<b[0].length;l++){if(typeof b[0][l]=="function"){e.push(b[0][l]())}else{e.push(b[0][l])
}if(typeof b[1][l]=="function"){h.push(b[1][l]())}else{h.push(b[1][l])}}}else{for(l=0;
l<b.length;l++){if(JXG.isPoint(b[l])){e.push(b[l].X());h.push(b[l].Y())}else{if(JXG.isArray(b[l])&&b[l].length==2){for(l=0;
l<b.length;l++){if(typeof b[l][0]=="function"){e.push(b[l][0]())}else{e.push(b[l][0])
}if(typeof b[l][1]=="function"){h.push(b[l][1]())}else{h.push(b[l][1])}}}}}}g=JXG.Math.Numerics.splineDef(e,h)
}return JXG.Math.Numerics.splineEval(n,e,h,g)};return f};return new JXG.Curve(c,["x","x",d()],a.id,a.name,a.withLabel,a.layer)
};JXG.JSXGraph.registerElement("spline",JXG.createSpline);JXG.createRiemannsum=function(g,b,a){var l,e,h,d,k;
a=JXG.checkAttributes(a,{withLabel:JXG.readOption(g.options,"curve","withLabel"),layer:null,fillOpacity:0.3,fillColor:"#ffff00",curveType:"plot"});
h=b[0];l=JXG.createFunction(b[1],g,"");if(l==null){throw new Error("JSXGraph: JXG.createRiemannsum: argument '2' n has to be number or function.")
}e=JXG.createFunction(b[2],g,"",false);if(e==null){throw new Error("JSXGraph: JXG.createRiemannsum: argument 3 'type' has to be string or function.")
}d=["x",[0],[0]].concat(b.slice(3));k=new JXG.Curve(g,d,a.id,a.name,a.withLabel,a.layer);
k.updateDataArray=function(){var c=JXG.Math.Numerics.riemann(h,l(),e(),this.minX(),this.maxX());
this.dataX=c[0];this.dataY=c[1]};return k};JXG.JSXGraph.registerElement("riemannsum",JXG.createRiemannsum);
JXG.Arc=function(d,g,f,e,h,a,c,b){this.constructor();this.type=JXG.OBJECT_TYPE_ARC;
this.elementClass=JXG.OBJECT_CLASS_CIRCLE;this.init(d,h,a);if(b==null){b=d.options.layer.arc
}this.layer=b;this.midpoint=JXG.getReference(this.board,g);this.point2=JXG.getReference(this.board,f);
this.point3=JXG.getReference(this.board,e);this.visProp.visible=true;this.visProp.firstArrow=this.board.options.arc.firstArrow;
this.visProp.lastArrow=this.board.options.arc.lastArrow;this.visProp.fillColor=this.board.options.arc.fillColor;
this.visProp.highlightFillColor=this.board.options.arc.highlightFillColor;this.visProp.strokeColor=this.board.options.arc.strokeColor;
this.visProp.highlightStrokeColor=this.board.options.arc.highlightStrokeColor;this.createLabel(c,[0,0]);
this.id=this.board.addArc(this);this.midpoint.addChild(this);this.point2.addChild(this);
this.point3.addChild(this)};JXG.Arc.prototype=new JXG.GeometryElement;JXG.Arc.prototype.hasPoint=function(k,h){var m=this.board.options.precision.hasPoint/(this.board.stretchX);
var f=new JXG.Coords(JXG.COORDS_BY_SCREEN,[k,h],this.board);var a=this.Radius();var g=Math.sqrt(Math.pow(this.midpoint.coords.usrCoords[1]-f.usrCoords[1],2)+Math.pow(this.midpoint.coords.usrCoords[2]-f.usrCoords[2],2));
var l=(Math.abs(g-a)<m);if(l){var b={};b.coords=new JXG.Coords(JXG.COORDS_BY_USER,[this.midpoint.coords.usrCoords[1],this.board.origin.usrCoords[2]/(this.board.stretchY)],this.board);
var e=this.board.algebra.trueAngle(this.point2,this.midpoint,b);var d=this.board.algebra.trueAngle(this.point3,this.midpoint,b);
var n={};n.coords=f;var c=this.board.algebra.trueAngle(n,this.midpoint,b);if(e>=d){if(e<c||c<d){l=false
}}else{if(c>e){if(c<d){l=false}}}}return l};JXG.Arc.prototype.hasPointSector=function(k,h){var m=this.board.options.precision.hasPoint/(this.board.stretchX);
var f=new JXG.Coords(JXG.COORDS_BY_SCREEN,[k,h],this.board);var a=this.Radius();var g=Math.sqrt(Math.pow(this.midpoint.coords.usrCoords[1]-f.usrCoords[1],2)+Math.pow(this.midpoint.coords.usrCoords[2]-f.usrCoords[2],2));
var l=(g<a);if(l){var b={};b.coords=new JXG.Coords(JXG.COORDS_BY_USER,[this.midpoint.coords.usrCoords[1],this.board.origin.usrCoords[2]/(this.board.stretchY)],this.board);
var e=this.board.algebra.trueAngle(this.point2,this.midpoint,b);var d=this.board.algebra.trueAngle(this.point3,this.midpoint,b);
var n={};n.coords=f;var c=this.board.algebra.trueAngle(n,this.midpoint,b);if(e>=d){if(e<c||c<d){l=false
}}else{if(c>e){if(c<d){l=false}}}}return l};JXG.Arc.prototype.Radius=function(){return(Math.sqrt(Math.pow(this.midpoint.coords.usrCoords[1]-this.point2.coords.usrCoords[1],2)+Math.pow(this.midpoint.coords.usrCoords[2]-this.point2.coords.usrCoords[2],2)))
};JXG.Arc.prototype.getRadius=function(){this.Radius()};JXG.Arc.prototype.getTextAnchor=function(){return this.midpoint.coords
};JXG.Arc.prototype.getLabelAnchor=function(){var c=this.board.algebra.trueAngle(this.point2,this.midpoint,this.point3);
var l=10/(this.board.stretchX);var h=10/(this.board.stretchY);var b=this.point2.coords.usrCoords[1]-this.midpoint.coords.usrCoords[1];
var k=this.point2.coords.usrCoords[2]-this.midpoint.coords.usrCoords[2];if(this.label.content!=null){this.label.content.relativeCoords=new JXG.Coords(JXG.COORDS_BY_USER,[0/(this.board.stretchX),0/(this.board.stretchY)],this.board)
}var f=new JXG.Coords(JXG.COORDS_BY_USER,[this.midpoint.coords.usrCoords[1]+Math.cos(c*Math.PI/(2*180))*b-Math.sin(c*Math.PI/(2*180))*k,this.midpoint.coords.usrCoords[2]+Math.sin(c*Math.PI/(2*180))*b+Math.cos(c*Math.PI/(2*180))*k],this.board);
var e=f.usrCoords[1]-this.midpoint.coords.usrCoords[1];var d=f.usrCoords[2]-this.midpoint.coords.usrCoords[2];
var a=Math.sqrt(e*e+d*d);e=e*(a+l)/a;d=d*(a+h)/a;var g=new JXG.Coords(JXG.COORDS_BY_USER,[this.midpoint.coords.usrCoords[1]+e,this.midpoint.coords.usrCoords[2]+d],this.board);
return g};JXG.Arc.prototype.updateRenderer=function(){if(this.needsUpdate){this.board.renderer.updateArc(this);
this.needsUpdate=false}if(this.hasLabel&&this.label.content.visProp.visible&&this.isReal){this.label.content.update();
this.board.renderer.updateText(this.label.content)}};JXG.Arc.prototype.setArrow=function(b,a){this.visProp.firstArrow=b;
this.visProp.lastArrow=a;this.board.renderer.updateArc(this);if(this.hasLabel&&this.label.content.visProp.visible){this.label.content.update();
this.board.renderer.updateText(this.label.content)}};JXG.createArc=function(d,b,a){var c;
a=JXG.checkAttributes(a,{withLabel:JXG.readOption(d.options,"arc","withLabel"),layer:null});
if((JXG.isPoint(b[0]))&&(JXG.isPoint(b[1]))&&(JXG.isPoint(b[2]))){c=new JXG.Arc(d,b[0],b[1],b[2],a.id,a.name,a.withLabel,a.layer)
}else{throw new Error("JSXGraph: Can't create Arc with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"' and '"+(typeof b[2])+"'.")
}return c};JXG.JSXGraph.registerElement("arc",JXG.createArc);JXG.createSemicircle=function(d,b,a){var c,f,e;
a=JXG.checkAttributes(a,{withLabel:JXG.readOption(d.options,"arc","withLabel"),layer:null});
if(a.id!=null){e=a.id+"_mp"}if((JXG.isPoint(b[0]))&&(JXG.isPoint(b[1]))){f=d.create("midpoint",[b[0],b[1]],{id:e,withLabel:false,visible:false});
c=new JXG.Arc(d,f,b[1],b[0],a.id,a.name,a.withLabel,a.layer)}else{throw new Error("JSXGraph: Can't create Semicircle with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"'.")
}return c};JXG.JSXGraph.registerElement("semicircle",JXG.createSemicircle);JXG.createCircumcircleArc=function(e,b,a){var d,g,f,c;
a=JXG.checkAttributes(a,{withLabel:JXG.readOption(e.options,"arc","withLabel"),layer:null});
if(a.id!=null){f=a.id+"_mp"}if((JXG.isPoint(b[0]))&&(JXG.isPoint(b[1]))&&(JXG.isPoint(b[2]))){g=e.create("circumcirclemidpoint",[b[0],b[1],b[2]],{id:f,withLabel:false,visible:false});
c=(b[0].coords.usrCoords[1]-b[2].coords.usrCoords[1])*(b[0].coords.usrCoords[2]-b[1].coords.usrCoords[2])-(b[0].coords.usrCoords[2]-b[2].coords.usrCoords[2])*(b[0].coords.usrCoords[1]-b[1].coords.usrCoords[1]);
if(c<0){d=new JXG.Arc(e,g,b[0],b[2],a.id,a.name,a.withLabel,a.layer)}else{d=new JXG.Arc(e,g,b[2],b[0],a.id,a.name,a.withLabel,a.layer)
}d.update=function(){var h;if(this.traced){this.cloneToBackground(true)}h=(b[0].coords.usrCoords[1]-b[2].coords.usrCoords[1])*(b[0].coords.usrCoords[2]-b[1].coords.usrCoords[2])-(b[0].coords.usrCoords[2]-b[2].coords.usrCoords[2])*(b[0].coords.usrCoords[1]-b[1].coords.usrCoords[1]);
if(h<0){this.point2=b[0];this.point3=b[2]}else{this.point2=b[2];this.point3=b[0]}}
}else{throw new Error("JSXGraph: create Circumcircle Arc with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"' and '"+(typeof b[2])+"'.")
}return d};JXG.JSXGraph.registerElement("circumcirclearc",JXG.createCircumcircleArc);
JXG.Sector=function(l,u,s,r,b,m,e,h){this.constructor();this.type=JXG.OBJECT_TYPE_SECTOR;
this.elementClass=JXG.OBJECT_CLASS_AREA;this.init(l,e,"");if(h==null){h=l.options.layer.sector
}this.layer=h;if(!JXG.isArray(b)){b=[null,null,null,null]}if(!JXG.isArray(m)){}this.point1=JXG.getReference(this.board,u);
this.point2=JXG.getReference(this.board,s);this.point3=JXG.getReference(this.board,r);
this.visProp.visible=true;var c={};c.midpoint=this.point1;var k=this.Radius();c.Radius=function(){return k
};c.getRadius=function(){return k};var q=this.board.algebra.projectPointToCircle(this.point3,c);
var d=new JXG.Point(l,[q.usrCoords[1],q.usrCoords[2]],b[1],m[1],true);d.fixed=true;
this.addChild(d);d.update=function(){var v={};v.midpoint=JXG.getReference(this.board,u);
var a=(Math.sqrt(Math.pow(JXG.getReference(this.board,u).coords.usrCoords[1]-JXG.getReference(this.board,s).coords.usrCoords[1],2)+Math.pow(JXG.getReference(this.board,u).coords.usrCoords[2]-JXG.getReference(this.board,s).coords.usrCoords[2],2)));
v.Radius=function(){return a};v.getRadius=function(){return a};q=this.board.algebra.projectPointToCircle(JXG.getReference(this.board,r),v);
this.coords=q;this.board.renderer.updatePoint(this);if(this.label.content.visProp.visible){this.label.content.update()
}};var g=new JXG.Line(l,u,s,b[2],m[2]);var f=new JXG.Line(l,u,d.id,b[3],m[3]);g.setStraight(false,false);
f.setStraight(false,false);var n=new JXG.Arc(l,u,s,r,b[0],m[0]);n.visProp.fillColor=this.board.options.sector.fillColor;
n.visProp.highlightFillColor=this.board.options.sector.highlightFillColor;n.visProp.fillOpacity=this.board.options.sector.fillOpacity;
n.visProp.highlightFillOpacity=this.board.options.sector.highlightFillOpacity;this.point4=d;
this.lines=[g,f];this.arc=n;this.id=this.board.addSector(this);this.point1.addChild(this);
this.point2.addChild(this);this.point3.addChild(this);return this};JXG.Sector.prototype=new JXG.GeometryElement;
JXG.Sector.prototype.hasPoint=function(a,b){return false};JXG.Sector.prototype.Radius=function(){return(Math.sqrt(Math.pow(this.point1.coords.usrCoords[1]-this.point2.coords.usrCoords[1],2)+Math.pow(this.point1.coords.usrCoords[2]-this.point2.coords.usrCoords[2],2)))
};JXG.Sector.prototype.getRadius=function(){return this.Radius()};JXG.Sector.prototype.updateRenderer=function(){};
JXG.createSector=function(b,d,c){var a;c=JXG.checkAttributes(c,{withLabel:JXG.readOption(b.options,"sector","withLabel"),layer:null});
if((JXG.isPoint(d[0]))&&(JXG.isPoint(d[1]))&&(JXG.isPoint(d[2]))){a=new JXG.Sector(b,d[0],d[1],d[2],c.ids,c.names,c.id,c.layer)
}else{throw new Error("JSXGraph: Can't create sector with parent types '"+(typeof d[0])+"' and '"+(typeof d[1])+"' and '"+(typeof d[2])+"'.")
}return a};JXG.JSXGraph.registerElement("sector",JXG.createSector);JXG.createCircumcircleSector=function(e,b,a){var d,g,f,c;
a=JXG.checkAttributes(a,{withLabel:JXG.readOption(e.options,"sector","withLabel"),layer:null});
if(a.id!=null){f=a.id+"_mp"}if((JXG.isPoint(b[0]))&&(JXG.isPoint(b[1]))&&(JXG.isPoint(b[2]))){g=e.create("circumcirclemidpoint",[b[0],b[1],b[2]],{id:f,withLabel:false,visible:false});
c=(b[0].coords.usrCoords[1]-b[2].coords.usrCoords[1])*(b[0].coords.usrCoords[2]-b[1].coords.usrCoords[2])-(b[0].coords.usrCoords[2]-b[2].coords.usrCoords[2])*(b[0].coords.usrCoords[1]-b[1].coords.usrCoords[1]);
if(c<0){d=new JXG.Sector(e,g,b[0],b[2],a.id,[a.name,"","",""],a.withLabel,a.layer)
}else{d=new JXG.Sector(e,g,b[2],b[0],a.id,[a.name,"","",""],a.withLabel,a.layer)}d.arc.update=function(){var h;
if(this.traced){this.cloneToBackground(true)}h=(b[0].coords.usrCoords[1]-b[2].coords.usrCoords[1])*(b[0].coords.usrCoords[2]-b[1].coords.usrCoords[2])-(b[0].coords.usrCoords[2]-b[2].coords.usrCoords[2])*(b[0].coords.usrCoords[1]-b[1].coords.usrCoords[1]);
if(h<0){this.point2=b[0];this.point3=b[2]}else{this.point2=b[2];this.point3=b[0]}};
d.point4.setProperty({visible:false})}else{throw new Error("JSXGraph: Can't create circumcircle sector with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"' and '"+(typeof b[2])+"'.")
}return d};JXG.JSXGraph.registerElement("circumcirclesector",JXG.createCircumcircleSector);
JXG.Angle=function(h,d,c,a,g,m,q,y,b,w){this.constructor();this.type=JXG.OBJECT_TYPE_ANGLE;
this.elementClass=JXG.OBJECT_CLASS_AREA;this.init(h,q,y);if(w==null){w=h.options.layer.angle
}this.layer=w;this.point1=JXG.getReference(this.board,d);this.point2=JXG.getReference(this.board,c);
this.point3=JXG.getReference(this.board,a);this.radius=this.board.options.angle.radius;
if(g!=undefined&&g!=null){this.radius=g}this.visProp.fillColor=this.board.options.angle.fillColor;
this.visProp.highlightFillColor=this.board.options.angle.highlightFillColor;this.visProp.fillOpacity=this.board.options.angle.fillOpacity;
this.visProp.highlightFillOpacity=this.board.options.angle.highlightFillOpacity;this.visProp.strokeColor=this.board.options.angle.strokeColor;
if(m==""){var f=["&alpha;","&beta;","&gamma;","&delta;","&epsilon;","&zeta;","&eta","&theta;","&iota;","&kappa;","&lambda;","&mu;","&nu;","&xi;","&omicron;","&pi;","&rho;","&sigmaf;","&sigma;","&tau;","&upsilon;","&phi;","&chi;","&psi;","&omega;"],u=0,r,k,e,n,s,l;
while(u<f.length){r=u;k=f[u];for(e in h.objects){if(h.objects[e].type==JXG.OBJECT_TYPE_ANGLE){if(h.objects[e].text==k){u++;
break}}}if(u==r){m=k;u=f.length+1}}if(u==f.length){n="&alpha;_{";s="}";l=false;r=0;
while(!l){for(e in h.objects){if(h.objects[e].type==JXG.OBJECT_TYPE_ANGLE){if(h.objects[e].text==(n+r+s)){l=true;
break}}}if(l){l=false}else{l=true;m=(n+r+s)}}}}this.text=m;var v=this.name;this.name=this.text;
this.createLabel(b);this.name=v;this.id=this.board.addAngle(this);this.point1.addChild(this);
this.point2.addChild(this);this.point3.addChild(this)};JXG.Angle.prototype=new JXG.GeometryElement;
JXG.Angle.prototype.hasPoint=function(a,b){return false};JXG.Angle.prototype.updateRenderer=function(){if(this.needsUpdate){this.board.renderer.updateAngle(this);
this.needsUpdate=false}if(this.hasLabel&&this.label.content.visProp.visible&&this.isReal){this.label.content.update();
this.board.renderer.updateText(this.label.content)}};JXG.Angle.prototype.getLabelAnchor=function(){var e=this.board.algebra.trueAngle(this.point1,this.point2,this.point3);
var d=this.point1.coords.distance(JXG.COORDS_BY_USER,this.point2.coords);var b=(this.point1.coords.usrCoords[1]-this.point2.coords.usrCoords[1])*(this.radius/2)/d;
var a=(this.point1.coords.usrCoords[2]-this.point2.coords.usrCoords[2])*(this.radius/2)/d;
var f=new JXG.Coords(JXG.COORDS_BY_USER,[this.point2.coords.usrCoords[1]+Math.cos(e*Math.PI/(2*160))*b-Math.sin(e*Math.PI/(2*160))*a,this.point2.coords.usrCoords[2]+Math.sin(e*Math.PI/(2*160))*b+Math.cos(e*Math.PI/(2*160))*a],this.board);
if(this.label.content!=null){this.label.content.relativeCoords=new JXG.Coords(JXG.COORDS_BY_USER,[0/(this.board.stretchX),0/(this.board.stretchY)],this.board)
}return f};JXG.createAngle=function(d,b,a){var c;a=JXG.checkAttributes(a,{withLabel:JXG.readOption(d.options,"angle","withLabel"),text:"",layer:null});
if((JXG.isPoint(b[0]))&&(JXG.isPoint(b[1]))&&(JXG.isPoint(b[2]))){c=new JXG.Angle(d,b[0],b[1],b[2],a.radius,a.text,a.id,a.name,a.withLabel,a.layer)
}else{throw new Error("JSXGraph: Can't create angle with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"' and '"+(typeof b[2])+"'.")
}return c};JXG.JSXGraph.registerElement("angle",JXG.createAngle);JXG.Algebra=function(a){this.board=a;
this.eps=JXG.Math.eps};JXG.Algebra.prototype.angle=function(f,e,d){var k=[],h=[],g=[],m,l,q,n;
if(f.coords==null){k[0]=f[0];k[1]=f[1]}else{k[0]=f.coords.usrCoords[1];k[1]=f.coords.usrCoords[2]
}if(e.coords==null){h[0]=e[0];h[1]=e[1]}else{h[0]=e.coords.usrCoords[1];h[1]=e.coords.usrCoords[2]
}if(d.coords==null){g[0]=d[0];g[1]=d[1]}else{g[0]=d.coords.usrCoords[1];g[1]=d.coords.usrCoords[2]
}m=k[0]-h[0];l=k[1]-h[1];q=g[0]-h[0];n=g[1]-h[1];return Math.atan2(m*n-l*q,m*q+l*n)
};JXG.Algebra.prototype.trueAngle=function(a,c,b){return this.rad(a,c,b)*57.29577951308232
};JXG.Algebra.prototype.rad=function(q,n,m){var h,e,x,w,c,b,g,f,l,k,d,u,s,y,r,v,a=0;
if(q.coords==null){h=q[0];e=q[1]}else{h=q.coords.usrCoords[1];e=q.coords.usrCoords[2]
}if(n.coords==null){x=n[0];w=n[1]}else{x=n.coords.usrCoords[1];w=n.coords.usrCoords[2]
}if(m.coords==null){c=m[0];b=m[1]}else{c=m.coords.usrCoords[1];b=m.coords.usrCoords[2]
}l=c-x;k=b-w;g=h-x;f=e-w;v=l*g+k*f;d=g*k-f*l;u=Math.sqrt(g*g+f*f);s=Math.sqrt(l*l+k*k);
y=v/(u*s);if(y>1){y=1}else{if(y<-1){y=-1}}r=Math.acos(y);if((Math.sin(r)*d)<0){a=6.283185307179586-r
}else{a=r}return a};JXG.Algebra.prototype.angleBisector=function(f,e,b){var c=f.coords.usrCoords,l=e.coords.usrCoords,g=b.coords.usrCoords,n=c[1]-l[1],m=c[2]-l[2],k=Math.sqrt(n*n+m*m),a,q,h;
n/=k;m/=k;a=Math.acos(n);if(m<0){a*=-1}if(a<0){a+=2*Math.PI}n=g[1]-l[1];m=g[2]-l[2];
k=Math.sqrt(n*n+m*m);n/=k;m/=k;q=Math.acos(n);if(m<0){q*=-1}if(q<0){q+=2*Math.PI}h=(a+q)*0.5;
if(a>q){h+=Math.PI}n=Math.cos(h)+l[1];m=Math.sin(h)+l[2];return new JXG.Coords(JXG.COORDS_BY_USER,[n,m],this.board)
};JXG.Algebra.prototype.midpoint=function(a,b){return new JXG.Coords(JXG.COORDS_BY_USER,[(a.coords.usrCoords[0]+b.coords.usrCoords[0])*0.5,(a.coords.usrCoords[1]+b.coords.usrCoords[1])*0.5,(a.coords.usrCoords[2]+b.coords.usrCoords[2])*0.5],this.board)
};JXG.Algebra.prototype.parallel=function(e,b,h){var c=1,f=h.coords.usrCoords,k=e.coords.usrCoords,a=b.coords.usrCoords,g=f[1]+c*(a[1]-k[1]),d=f[2]+c*(a[2]-k[2]);
return new JXG.Coords(JXG.COORDS_BY_USER,[g,d],this.board)};JXG.Algebra.prototype.reflection=function(m,h){var d=h.coords.usrCoords,n=m.point1.coords.usrCoords,c=m.point2.coords.usrCoords,b,g,a,e,k,f,l;
k=c[1]-n[1];f=c[2]-n[2];b=d[1]-n[1];g=d[2]-n[2];l=(k*g-f*b)/(k*k+f*f);a=d[1]+2*l*f;
e=d[2]-2*l*k;return new JXG.Coords(JXG.COORDS_BY_USER,[a,e],this.board)};JXG.Algebra.prototype.rotation=function(a,m,f){var h=m.coords.usrCoords,b=a.coords.usrCoords,e,l,g,n,d,k;
e=h[1]-b[1];l=h[2]-b[2];g=Math.cos(f);n=Math.sin(f);d=e*g-l*n+b[1];k=e*n+l*g+b[2];
return new JXG.Coords(JXG.COORDS_BY_USER,[d,k],this.board)};JXG.Algebra.prototype.perpendicular=function(q,m){var e=q.point1.coords.usrCoords,d=q.point2.coords.usrCoords,b=m.coords.usrCoords,k,g,h,n,f,c,a,l;
if(m==q.point1){k=e[1]+d[2]-e[2];g=e[2]-d[1]+e[1];h=true}else{if(m==q.point2){k=d[1]+e[2]-d[2];
g=d[2]-e[1]+d[1];h=false}else{if(((Math.abs(e[1]-d[1])>this.eps)&&(Math.abs(b[2]-(e[2]-d[2])*(b[1]-e[1])/(e[1]-d[1])-e[2])<this.eps))||((Math.abs(e[1]-d[1])<=this.eps)&&(Math.abs(e[1]-b[1])<this.eps))){k=b[1]+d[2]-b[2];
g=b[2]-d[1]+b[1];h=true;if(Math.abs(k-b[1])<this.eps&&Math.abs(g-b[2])<this.eps){k=b[1]+e[2]-b[2];
g=b[2]-e[1]+b[1];h=false}}else{n=e[2]-d[2];f=e[1]-d[1];c=d[1]*n-d[2]*f;a=b[1]*f+b[2]*n;
l=n*n+f*f;if(Math.abs(l)<this.eps){l=this.eps}k=(c*n+a*f)/l;g=(a*n-c*f)/l;h=true}}}return[new JXG.Coords(JXG.COORDS_BY_USER,[k,g],this.board),h]
};JXG.Algebra.prototype.circumcenterMidpoint=function(g,e,d){var c=g.coords.usrCoords,b=e.coords.usrCoords,a=d.coords.usrCoords,m,l,k,h,f;
m=((c[1]-b[1])*(c[1]+b[1])+(c[2]-b[2])*(c[2]+b[2]))*0.5;l=((b[1]-a[1])*(b[1]+a[1])+(b[2]-a[2])*(b[2]+a[2]))*0.5;
k=(c[1]-b[1])*(b[2]-a[2])-(b[1]-a[1])*(c[2]-b[2]);if(Math.abs(k)<this.eps){k=this.eps
}h=(m*(b[2]-a[2])-l*(c[2]-b[2]))/k;f=(l*(c[1]-b[1])-m*(b[1]-a[1]))/k;return new JXG.Coords(JXG.COORDS_BY_USER,[h,f],this.board)
};JXG.Algebra.prototype.intersectLineLine=function(m,l){var f=m.point1.coords.usrCoords,d=m.point2.coords.usrCoords,b=l.point1.coords.usrCoords,a=l.point2.coords.usrCoords,e,c,k,h,g;
e=f[1]*d[2]-f[2]*d[1];c=b[1]*a[2]-b[2]*a[1];k=(d[2]-f[2])*(b[1]-a[1])-(f[1]-d[1])*(a[2]-b[2]);
if(Math.abs(k)<this.eps){k=this.eps}h=(e*(b[1]-a[1])-c*(f[1]-d[1]))/k;g=(c*(d[2]-f[2])-e*(a[2]-b[2]))/k;
return new JXG.Coords(JXG.COORDS_BY_USER,[h,g],this.board)};JXG.Algebra.prototype.intersectCircleLine=function(k,z){var L=z.point1.coords.usrCoords,J=z.point2.coords.usrCoords,e=k.midpoint.coords.usrCoords,D,a,K,I,B,G,E,m,C,A,g,f,F,u,n,c,v,q,H;
D=z.point1.Dist(z.point2);if(D>0){a=k.midpoint.Dist(z.point1);K=k.midpoint.Dist(z.point2);
I=((a*a)+(D*D)-(K*K))/(2*D);B=(a*a)-(I*I);B=(B<0)?0:B;G=Math.sqrt(B);E=k.Radius();
m=Math.sqrt((E*E)-G*G);C=J[1]-L[1];A=J[2]-L[2];g=e[1]+(G/D)*A;f=e[2]-(G/D)*C;a=(J[1]*A)-(J[2]*C);
K=(g*C)+(f*A);F=(A*A)+(C*C);if(Math.abs(F)<this.eps){F=this.eps}u=((a*A)+(K*C))/F;
n=((K*A)-(a*C))/F;c=m/D;v=new JXG.Coords(JXG.COORDS_BY_USER,[u+c*C,n+c*A],this.board);
q=new JXG.Coords(JXG.COORDS_BY_USER,[u-c*C,n-c*A],this.board);H=k.midpoint.coords.distance(JXG.COORDS_BY_USER,v);
if((E<(H-1))||isNaN(H)){return[0]}else{return[2,v,q]}}return[0]};JXG.Algebra.prototype.intersectCircleCircle=function(l,k){var c={},f=l.Radius(),e=k.Radius(),d=l.midpoint.coords.usrCoords,b=k.midpoint.coords.usrCoords,q,g,v,u,r,n,m;
q=f+e;g=Math.abs(f-e);v=l.midpoint.coords.distance(JXG.COORDS_BY_USER,k.midpoint.coords);
if(v>q){return[0]}else{if(v<g){return[0]}else{if(v!=0){c[0]=1;u=b[1]-d[1];r=b[2]-d[2];
n=(v*v-e*e+f*f)/(2*v);m=Math.sqrt(f*f-n*n);c[1]=new JXG.Coords(JXG.COORDS_BY_USER,[d[1]+(n/v)*u+(m/v)*r,d[2]+(n/v)*r-(m/v)*u],this.board);
c[2]=new JXG.Coords(JXG.COORDS_BY_USER,[d[1]+(n/v)*u-(m/v)*r,d[2]+(n/v)*r+(m/v)*u],this.board)
}else{return[0]}return c}}};JXG.Algebra.prototype.projectPointToCircle=function(b,e){var f=b.coords.distance(JXG.COORDS_BY_USER,e.midpoint.coords),d=b.coords.usrCoords,h=e.midpoint.coords.usrCoords,a,g,c;
if(Math.abs(f)<this.eps){f=this.eps}c=e.Radius()/f;a=h[1]+c*(d[1]-h[1]);g=h[2]+c*(d[2]-h[2]);
return new JXG.Coords(JXG.COORDS_BY_USER,[a,g],this.board)};JXG.Algebra.prototype.projectPointToLine=function(a,b){var c=[0,b.stdform[1],b.stdform[2]];
c=JXG.Math.crossProduct(c,a.coords.usrCoords);return this.meetLineLine(c,b.stdform,0)
};JXG.Algebra.prototype.projectPointToCurve=function(c,e){var b=c.X(),f=c.Y(),d=c.position||0,a=this.projectCoordsToCurve(b,f,d,e);
c.position=a[1];return a[0]};JXG.Algebra.prototype.projectCoordsToCurve=function(m,k,s,d){var r,c,q,b,l,n,e,f,g,a,h=1000000;
if(d.curveType=="parameter"||d.curveType=="polar"){s=JXG.Math.Numerics.root(JXG.Math.Numerics.D(function(u){return(m-d.X(u))*(m-d.X(u))+(k-d.Y(u))*(k-d.Y(u))
}),s);if(s<d.minX()){s=d.maxX()+s-d.minX()}if(s>d.maxX()){s=d.minX()+s-d.maxX()}r=new JXG.Coords(JXG.COORDS_BY_USER,[d.X(s),d.Y(s)],this.board)
}else{if(d.curveType=="plot"){f=h;for(e=0;e<d.numberPoints;e++){c=m-d.X(e);q=k-d.Y(e);
g=Math.sqrt(c*c+q*q);if(g<f){f=g;s=e}if(e==d.numberPoints-1){continue}b=d.X(e+1)-d.X(e);
l=d.Y(e+1)-d.Y(e);n=b*b+l*l;if(n>=JXG.Math.eps){a=(c*b+q*l)/n;g=Math.sqrt(c*c+q*q-a*(c*b+q*l))
}else{a=0;g=Math.sqrt(c*c+q*q)}if(a>=0&&a<=1&&g<f){s=e+a;f=g}}e=Math.floor(s);a=s-e;
if(e<d.numberPoints-1){m=a*d.X(e+1)+(1-a)*d.X(e);k=a*d.Y(e+1)+(1-a)*d.Y(e)}else{m=d.X(e);
k=d.Y(e)}r=new JXG.Coords(JXG.COORDS_BY_USER,[m,k],this.board)}else{s=m;m=s;k=d.Y(s);
r=new JXG.Coords(JXG.COORDS_BY_USER,[m,k],this.board)}}return[d.updateTransform(r),s]
};JXG.Algebra.prototype.projectPointToTurtle=function(l,q){var n,r,k,h,c,m=0,f=0,d=1000000,g,a,b,e=q.objects.length;
for(c=0;c<e;c++){a=q.objects[c];if(a.type==JXG.OBJECT_TYPE_CURVE){n=this.projectPointToCurve(l,a);
g=this.distance(n.usrCoords,l.coords.usrCoords);if(g<d){k=n.usrCoords[1];h=n.usrCoords[2];
r=l.position;d=g;b=a;f=m}m+=a.numberPoints}}n=new JXG.Coords(JXG.COORDS_BY_USER,[k,h],this.board);
l.position=r+f;return b.updateTransform(n)};JXG.Algebra.prototype.replacePow=function(d){var h,m,k,g,l,e,a,b,f,q,n;
f=d.indexOf("^");while(f>=0){b=d.slice(0,f);if(b.charAt(b.length-1)==")"){h=1;m=b.length-2;
while(m>=0&&h>0){k=b.charAt(m);if(k==")"){h++}else{if(k=="("){h--}}m--}if(h==0){g="";
e=b.substring(0,m+1);a=m;while(a>=0&&e.substr(a,1).match(/(\w+)/)){g=RegExp.$1+g;
a--}g+=b.substring(m+1,b.length);g=g.replace(/([\(\)\+\*\%\^\-\/\]\[])/g,"\\$1")}}else{g="\\w+"
}q=d.slice(f+1);if(q.match(/^([\w\.]*\()/)){h=1;m=RegExp.$1.length;while(m<q.length&&h>0){k=q.charAt(m);
if(k==")"){h--}else{if(k=="("){h++}}m++}if(h==0){l=q.substring(0,m);l=l.replace(/([\(\)\+\*\%\^\-\/\[\]])/g,"\\$1")
}}else{l="[\\w\\.]+"}n=new RegExp("("+g+")\\^("+l+")");d=d.replace(n,"this.board.algebra.pow($1,$2)");
f=d.indexOf("^")}return d};JXG.Algebra.prototype.replaceIf=function(b){var u="",d,r,f=null,a=null,k=null,e,q,g,l,h,m,n;
e=b.indexOf("If(");if(e<0){return b}b=b.replace(/""/g,"0");while(e>=0){d=b.slice(0,e);
r=b.slice(e+3);g=1;q=0;l=-1;h=-1;while(q<r.length&&g>0){m=r.charAt(q);if(m==")"){g--
}else{if(m=="("){g++}else{if(m==","&&g==1){if(l<0){l=q}else{h=q}}}}q++}n=r.slice(0,q-1);
r=r.slice(q);if(l<0){return""}if(h<0){return""}f=n.slice(0,l);a=n.slice(l+1,h);k=n.slice(h+1);
f=this.replaceIf(f);a=this.replaceIf(a);k=this.replaceIf(k);u+=d+"(("+f+")?("+a+"):("+k+"))";
b=r;f=null;a=null;e=b.indexOf("If(")}u+=r;return u};JXG.Algebra.prototype.replaceSub=function(c){if(c.indexOf){}else{return c
}var b=c.indexOf("_{"),a;while(b>=0){c=c.substr(0,b)+c.substr(b).replace(/_\{/,"<sub>");
a=c.substr(b).indexOf("}");if(a>=0){c=c.substr(0,a)+c.substr(a).replace(/\}/,"</sub>")
}b=c.indexOf("_{")}b=c.indexOf("_");while(b>=0){c=c.substr(0,b)+c.substr(b).replace(/_(.?)/,"<sub>$1</sub>");
b=c.indexOf("_")}return c};JXG.Algebra.prototype.replaceSup=function(c){if(c.indexOf){}else{return c
}var b=c.indexOf("^{"),a;while(b>=0){c=c.substr(0,b)+c.substr(b).replace(/\^\{/,"<sup>");
a=c.substr(b).indexOf("}");if(a>=0){c=c.substr(0,a)+c.substr(a).replace(/\}/,"</sup>")
}b=c.indexOf("^{")}b=c.indexOf("^");while(b>=0){c=c.substr(0,b)+c.substr(b).replace(/\^(.?)/,"<sup>$1</sup>");
b=c.indexOf("^")}return c};JXG.Algebra.prototype.replaceNameById=function(d){var g=0,a,f,e,c,b=["X","Y","L","V"];
for(c=0;c<b.length;c++){g=d.indexOf(b[c]+"(");while(g>=0){if(g>=0){a=d.indexOf(")",g+2);
if(a>=0){f=d.slice(g+2,a);f=f.replace(/\\(['"])?/g,"$1");e=this.board.elementsByName[f];
d=d.slice(0,g+2)+e.id+d.slice(a)}}a=d.indexOf(")",g+2);g=d.indexOf(b[c]+"(",a)}}g=d.indexOf("Dist(");
while(g>=0){if(g>=0){a=d.indexOf(",",g+5);if(a>=0){f=d.slice(g+5,a);f=f.replace(/\\(['"])?/g,"$1");
e=this.board.elementsByName[f];d=d.slice(0,g+5)+e.id+d.slice(a)}}a=d.indexOf(",",g+5);
g=d.indexOf(",",a);a=d.indexOf(")",g+1);if(a>=0){f=d.slice(g+1,a);f=f.replace(/\\(['"])?/g,"$1");
e=this.board.elementsByName[f];d=d.slice(0,g+1)+e.id+d.slice(a)}a=d.indexOf(")",g+1);
g=d.indexOf("Dist(",a)}b=["Deg","Rad"];for(c=0;c<b.length;c++){g=d.indexOf(b[c]+"(");
while(g>=0){if(g>=0){a=d.indexOf(",",g+4);if(a>=0){f=d.slice(g+4,a);f=f.replace(/\\(['"])?/g,"$1");
e=this.board.elementsByName[f];d=d.slice(0,g+4)+e.id+d.slice(a)}}a=d.indexOf(",",g+4);
g=d.indexOf(",",a);a=d.indexOf(",",g+1);if(a>=0){f=d.slice(g+1,a);f=f.replace(/\\(['"])?/g,"$1");
e=this.board.elementsByName[f];d=d.slice(0,g+1)+e.id+d.slice(a)}a=d.indexOf(",",g+1);
g=d.indexOf(",",a);a=d.indexOf(")",g+1);if(a>=0){f=d.slice(g+1,a);f=f.replace(/\\(['"])?/g,"$1");
e=this.board.elementsByName[f];d=d.slice(0,g+1)+e.id+d.slice(a)}a=d.indexOf(")",g+1);
g=d.indexOf(b[c]+"(",a)}}return d};JXG.Algebra.prototype.replaceIdByObj=function(a){var b=/(X|Y|L)\(([\w_]+)\)/g;
a=a.replace(b,'this.board.objects["$2"].$1()');b=/(V)\(([\w_]+)\)/g;a=a.replace(b,'this.board.objects["$2"].Value()');
b=/(Dist)\(([\w_]+),([\w_]+)\)/g;a=a.replace(b,'this.board.objects["$2"].Dist(this.board.objects["$3"])');
b=/(Deg)\(([\w_]+),([ \w\[\w_]+),([\w_]+)\)/g;a=a.replace(b,'this.board.algebra.trueAngle(this.board.objects["$2"],this.board.objects["$3"],this.board.objects["$4"])');
b=/Rad\(([\w_]+),([\w_]+),([\w_]+)\)/g;a=a.replace(b,'this.board.algebra.rad(this.board.objects["$1"],this.board.objects["$2"],this.board.objects["$3"])');
return a};JXG.Algebra.prototype.geonext2JS=function(b){var d,c,a,f=["Abs","ACos","ASin","ATan","Ceil","Cos","Exp","Floor","Log","Max","Min","Random","Round","Sin","Sqrt","Tan","Trunc"],e=["Math.abs","Math.acos","Math.asin","Math.atan","Math.ceil","Math.cos","Math.exp","Math.floor","Math.log","Math.max","Math.min","Math.random","this.board.round","Math.sin","Math.sqrt","Math.tan","Math.ceil"];
b=b.replace(/&lt;/g,"<");b=b.replace(/&gt;/g,">");b=b.replace(/&amp;/g,"&");c=b;c=this.replaceNameById(c);
c=this.replaceIf(c);c=this.replacePow(c);c=this.replaceIdByObj(c);for(a=0;a<f.length;
a++){d=new RegExp(f[a],"ig");c=c.replace(d,e[a])}c=c.replace(/True/g,"true");c=c.replace(/False/g,"false");
c=c.replace(/fasle/g,"false");c=c.replace(/Pi/g,"Math.PI");return c};JXG.Algebra.prototype.findDependencies=function(d,b){var e=this.board.elementsByName,c,f,a;
for(c in e){if(c!=d.name){if(e[c].type==JXG.OBJECT_TYPE_TEXT){if(!e[c].isLabel){a=c.replace(/\[/g,"\\[");
a=a.replace(/\]/g,"\\]");f=new RegExp("\\(([\\w\\[\\]'_ ]+,)*("+a+")(,[\\w\\[\\]'_ ]+)*\\)","g");
if(b.search(f)>=0){e[c].addChild(d)}}}else{a=c.replace(/\[/g,"\\[");a=a.replace(/\]/g,"\\]");
f=new RegExp("\\(([\\w\\[\\]'_ ]+,)*("+a+")(,[\\w\\[\\]'_ ]+)*\\)","g");if(b.search(f)>=0){e[c].addChild(d)
}}}}};JXG.Algebra.prototype.distance=function(e,d){var c=0,b,a;if(e.length!=d.length){return
}a=e.length;for(b=0;b<a;b++){c+=(e[b]-d[b])*(e[b]-d[b])}return Math.sqrt(c)};JXG.Algebra.prototype.affineDistance=function(b,a){var c;
if(b.length!=a.length){return}c=this.distance(b,a);if(c>this.eps&&(Math.abs(b[0])<this.eps||Math.abs(a[0])<this.eps)){return Infinity
}else{return c}};JXG.Algebra.prototype.pow=function(d,c){if(d==0||c==0){return 1}if(Math.floor(c)==c){return Math.pow(d,c)
}else{if(d>0){return Math.exp(c*Math.log(Math.abs(d)))}else{return NaN}}};JXG.Algebra.prototype.meet=function(d,b,c){var a=this.eps;
if(Math.abs(d[3])<a&&Math.abs(b[3])<a){return this.meetLineLine(d,b,c)}else{if(Math.abs(d[3])>=a&&Math.abs(b[3])<a){return this.meetLineCircle(b,d,c)
}else{if(Math.abs(d[3])<a&&Math.abs(b[3])>=a){return this.meetLineCircle(d,b,c)}else{return this.meetCircleCircle(d,b,c)
}}}};JXG.Algebra.prototype.meetLineLine=function(b,a,c){var d=JXG.Math.crossProduct(b,a);
if(Math.abs(d[0])>this.eps){d[1]/=d[0];d[2]/=d[0];d[0]=1}return new JXG.Coords(JXG.COORDS_BY_USER,d,this.board)
};JXG.Algebra.prototype.meetLineCircle=function(l,e,r){var w,v,u,s,m,h,g,f,q,x;if(e[4]<this.eps){return new JXG.Coords(JXG.COORDS_BY_USER,e.slice(1,3),this.board)
}u=e[0];v=e.slice(1,3);w=e[3];s=l[0];m=l.slice(1,3);h=w;g=(v[0]*m[1]-v[1]*m[0]);f=w*s*s-(v[0]*m[0]+v[1]*m[1])*s+u;
q=g*g-4*h*f;if(q>=0){q=Math.sqrt(q);x=[(-g+q)/(2*h),(-g-q)/(2*h)];return((r==0)?new JXG.Coords(JXG.COORDS_BY_USER,[-x[0]*(-m[1])-s*m[0],-x[0]*m[0]-s*m[1]],this.board):new JXG.Coords(JXG.COORDS_BY_USER,[-x[1]*(-m[1])-s*m[0],-x[1]*m[0]-s*m[1]],this.board))
}else{return new JXG.Coords(JXG.COORDS_BY_USER,[NaN,NaN],this.board)}};JXG.Algebra.prototype.meetCircleCircle=function(c,a,b){var d;
if(c[4]<this.eps){if(this.distance(c.slice(1,3),a.slice(1,3))==a[4]){return new JXG.Coords(JXG.COORDS_BY_USER,c.slice(1,3),this.board)
}else{return new JXG.Coords(JXG.COORDS_BY_USER,[NaN,NaN],this.board)}}if(a[4]<this.eps){if(this.distance(a.slice(1,3),c.slice(1,3))==c[4]){return new JXG.Coords(JXG.COORDS_BY_USER,a.slice(1,3),this.board)
}else{return new JXG.Coords(JXG.COORDS_BY_USER,[NaN,NaN],this.board)}}d=[a[3]*c[0]-c[3]*a[0],a[3]*c[1]-c[3]*a[1],a[3]*c[2]-c[3]*a[2],0,1,Infinity,Infinity,Infinity];
d=this.normalize(d);return this.meetLineCircle(d,c,b)};JXG.Algebra.prototype.normalize=function(c){var a=2*c[3],d=c[4]/(a),e,b;
c[5]=d;c[6]=-c[1]/a;c[7]=-c[2]/a;if(d==Infinity||isNaN(d)){e=Math.sqrt(c[1]*c[1]+c[2]*c[2]);
c[0]/=e;c[1]/=e;c[2]/=e;c[3]=0;c[4]=1}else{if(Math.abs(d)>=1){c[0]=(c[6]*c[6]+c[7]*c[7]-d*d)/(2*d);
c[1]=-c[6]/d;c[2]=-c[7]/d;c[3]=1/(2*d);c[4]=1}else{b=(d<=0)?(-1):(1);c[0]=b*(c[6]*c[6]+c[7]*c[7]-d*d)*0.5;
c[1]=-b*c[6];c[2]=-b*c[7];c[3]=b/2;c[4]=b*d}}return c};JXG.Algebra.prototype.meetCurveCurve=function(v,u,h,m){var n=0,r,q,D,B,z,y,g,x,w,s,C,A,l,k;
if(arguments.callee.t1memo){r=arguments.callee.t1memo;q=arguments.callee.t2memo}else{r=h;
q=m}if(r>v.maxX()){r=v.maxX()}if(r<v.minX()){r=v.minX()}if(q>u.maxX()){q=u.maxX()
}if(q<u.minX()){q=u.minX()}x=v.X(r)-u.X(q);w=v.Y(r)-u.Y(q);s=x*x+w*w;C=v.board.D(v.X,v);
A=u.board.D(u.X,u);l=v.board.D(v.Y,v);k=u.board.D(u.Y,u);while(s>JXG.Math.eps&&n<10){D=C(r);
B=-A(q);z=l(r);y=-k(q);g=D*y-B*z;r-=(y*x-B*w)/g;q-=(D*w-z*x)/g;x=v.X(r)-u.X(q);w=v.Y(r)-u.Y(q);
s=x*x+w*w;n++}arguments.callee.t1memo=r;arguments.callee.t2memo=q;if(Math.abs(r)<Math.abs(q)){return(new JXG.Coords(JXG.COORDS_BY_USER,[v.X(r),v.Y(r)],this.board))
}else{return(new JXG.Coords(JXG.COORDS_BY_USER,[u.X(q),u.Y(q)],this.board))}};JXG.Intersection=function(e,b,d,c,g,f,m,l){this.constructor();
this.board=e;this.id=b;this.name=this.id;this.visProp={};this.visProp.visible=true;
this.show=true;this.real=true;this.notExistingParents={};this.intersect1=JXG.getReference(this.board,d);
this.intersect2=JXG.getReference(this.board,c);this.type=JXG.OBJECT_TYPE_INTERSECTION;
if(((this.intersect1=="")||(this.intersect1==undefined))&&((this.intersect2=="")||(this.intersect2==undefined))){return
}if(((this.intersect1.type==this.intersect2.type)&&(this.intersect1.type==JXG.OBJECT_TYPE_LINE||this.intersect1.type==JXG.OBJECT_TYPE_ARROW))||((this.intersect1.type==JXG.OBJECT_TYPE_LINE)&&(this.intersect2.type==JXG.OBJECT_TYPE_ARROW))||((this.intersect2.type==JXG.OBJECT_TYPE_LINE)&&(this.intersect1.type==JXG.OBJECT_TYPE_ARROW))){var h=this.board.algebra.intersectLineLine(this.intersect1,this.intersect2).usrCoords.slice(1);
this.p=new JXG.Point(this.board,h,g,m,true);this.p.fixed=true;this.addChild(this.p);
this.real=true;this.update=function(){if(this.needsUpdate){this.p.coords=this.board.algebra.intersectLineLine(this.intersect1,this.intersect2);
this.needsUpdate=false}};this.hideElement=function(){this.visProp.visible=false;this.p.hideElement()
};this.showElement=function(){this.visProp.visible=true;this.p.showElement()};this.hideChild=function(q){this.notExistingParents[q]=this.board.objects[q];
for(var n in this.descendants){if(this.descendants[n].visProp.visible&&this.descendants[n].type!=JXG.OBJECT_TYPE_INTERSECTION){if(this.descendants[n].type!=JXG.OBJECT_TYPE_TEXT){this.descendants[n].hideElement();
this.descendants[n].visProp.visible=true}else{if(!this.descendants[n].isLabel){this.descendants[n].hideElement();
this.descendants[n].visProp.visible=true}}}this.descendants[n].notExistingParents[q]=this.board.objects[q]
}};this.showChild=function(q){for(var n in this.board.objects){delete (this.board.objects[n].notExistingParents[q]);
if(this.board.objects[n].visProp.visible&&JXG.keys(this.board.objects[n].notExistingParents).length==0){if(this.board.objects[n].type!=JXG.OBJECT_TYPE_INTERSECTION){this.board.objects[n].showElement()
}}}}}else{if(((d.type==c.type)&&(d.type==JXG.OBJECT_TYPE_CIRCLE||d.type==JXG.OBJECT_TYPE_ARC))||(d.type==JXG.OBJECT_TYPE_CIRCLE&&c.type==JXG.OBJECT_TYPE_ARC)||(c.type==JXG.OBJECT_TYPE_CIRCLE&&d.type==JXG.OBJECT_TYPE_ARC)){this.p1=new JXG.Point(this.board,[0,0],g,m,false);
this.p1.fixed=true;this.p1.label.content.visProp.visible=true;this.p2=new JXG.Point(this.board,[0,0],f,l,false);
this.p2.fixed=true;this.p2.label.content.visProp.visible=true;this.addChild(this.p1);
this.addChild(this.p2);var k=this.board.algebra.intersectCircleCircle(this.intersect1,this.intersect2);
if(k[0]==1){this.p1.coords=k[1];this.p1.showElement();this.p1.updateRenderer();this.p2.coords=k[2];
this.p2.showElement();this.p2.updateRenderer();this.real=true}else{this.real=false
}this.update=function(){if(!this.needsUpdate){return}var r=this.board.algebra.intersectCircleCircle(this.intersect1,this.intersect2);
var q=this.p1.visProp.visible;var n=this.p2.visProp.visible;if(r[0]==0){if(this.real){this.hideChild(this.id);
this.p1.visProp.visible=q;this.p2.visProp.visible=n;this.real=false}}else{this.p1.coords=r[1];
this.p2.coords=r[2];if(!this.real){this.showChild(this.id);this.real=true}}this.needsUpdate=false
};this.hideElement=function(){this.visProp.visible=false;this.p1.hideElement();this.p2.hideElement()
};this.showElement=function(){this.visProp.visible=true;this.p1.showElement();this.p2.showElement()
};this.hideChild=function(q){this.notExistingParents[q]=this.board.objects[q];for(var n in this.descendants){if(this.descendants[n].visProp.visible&&this.descendants[n].type!=JXG.OBJECT_TYPE_INTERSECTION){if(this.descendants[n].type!=JXG.OBJECT_TYPE_TEXT){this.descendants[n].hideElement();
this.descendants[n].visProp.visible=true}else{if(!this.descendants[n].isLabel){this.descendants[n].hideElement();
this.descendants[n].visProp.visible=true}}}this.descendants[n].notExistingParents[q]=this.board.objects[q]
}};this.showChild=function(n){for(el in this.board.objects){delete (this.board.objects[el].notExistingParents[n]);
if(this.board.objects[el].visProp.visible&&JXG.keys(this.board.objects[el].notExistingParents).length==0){if(this.board.objects[el].type!=JXG.OBJECT_TYPE_INTERSECTION){this.board.objects[el].showElement()
}}}}}else{this.p1=new JXG.Point(this.board,[0,0],g,m,false);this.p1.fixed=true;this.p1.label.content.visProp.visible=true;
this.p2=new JXG.Point(this.board,[0,0],f,l,false);this.p2.fixed=true;this.p2.label.content.visProp.visible=true;
this.addChild(this.p1);this.addChild(this.p2);if(this.intersect1.type==JXG.OBJECT_TYPE_LINE||this.intersect1.type==JXG.OBJECT_TYPE_ARROW){var a=this.intersect1;
this.intersect1=this.intersect2;this.intersect2=a}var k=this.board.algebra.intersectCircleLine(this.intersect1,this.intersect2);
if(k[0]==1){this.p1.coords=k[1];this.p1.showElement();this.p1.update()}else{if(k[0]==2){this.p1.coords=k[1];
this.p1.showElement();this.p2.coords=k[2];this.p2.showElement();this.p1.updateRenderer();
this.p2.updateRenderer();this.real=true}else{this.real=false}}this.update=function(){if(!this.needsUpdate){return
}var r=this.board.algebra.intersectCircleLine(this.intersect1,this.intersect2);var q=this.p1.visProp.visible;
var n=this.p2.visProp.visible;if(r[0]==0){if(this.real){this.hideChild(this.id);this.p1.visProp.visible=q;
this.p2.visProp.visible=n;this.real=false}}else{if(r[0]==2){this.p1.coords=r[1];this.p2.coords=r[2];
if(!this.real){this.showChild(this.id);this.real=true}}}this.needsUpdate=false};this.hideElement=function(){this.visProp.visible=false;
this.p1.hideElement();this.p2.hideElement()};this.showElement=function(){this.visProp.visible=true;
this.p1.showElement();this.p2.showElement()};this.hideChild=function(q){this.notExistingParents[q]=this.board.objects[q];
for(var n in this.descendants){if(this.descendants[n].visProp.visible&&this.descendants[n].type!=JXG.OBJECT_TYPE_INTERSECTION){if(this.descendants[n].type!=JXG.OBJECT_TYPE_TEXT){this.descendants[n].hideElement();
this.descendants[n].visProp.visible=true}else{if(!this.descendants[n].isLabel){this.descendants[n].hideElement();
this.descendants[n].visProp.visible=true}}}this.descendants[n].notExistingParents[q]=this.board.objects[q]
}};this.showChild=function(n){for(el in this.board.objects){delete (this.board.objects[el].notExistingParents[n]);
if(this.board.objects[el].visProp.visible&&JXG.keys(this.board.objects[el].notExistingParents).length==0){if(this.board.objects[el].type!=JXG.OBJECT_TYPE_INTERSECTION){this.board.objects[el].showElement()
}}}}}}this.id=this.board.addIntersection(this)};JXG.Intersection.prototype=new JXG.GeometryElement();
JXG.Intersection.prototype.update=function(){return};JXG.Intersection.prototype.hasPoint=function(a,b){return false
};JXG.Intersection.prototype.hideChild=function(a){};JXG.Intersection.prototype.showChild=function(a){};
JXG.Intersection.prototype.remove=function(){if(this.p!=undefined){this.board.removeObject(this.p)
}if(this.p1!=undefined){this.board.removeObject(this.p1)}if(this.p2!=undefined){this.board.removeObject(this.p2)
}return};JXG.Intersection.prototype.updateRenderer=function(){};JXG.createPerpendicularPoint=function(c,f,e){var a,d,b;
if(JXG.isPoint(f[0])&&f[1].type==JXG.OBJECT_TYPE_LINE){d=f[0];a=f[1]}else{if(JXG.isPoint(f[1])&&f[0].type==JXG.OBJECT_TYPE_LINE){d=f[1];
a=f[0]}else{throw new Error("JSXGraph: Can't create perpendicular point with parent types '"+(typeof f[0])+"' and '"+(typeof f[1])+"'.")
}}b=JXG.createPoint(c,[function(){return c.algebra.perpendicular(a,d)[0]}],{fixed:true,name:e.name,id:e.id});
d.addChild(b);a.addChild(b);b.update();b.generatePolynomial=function(){var h=a.point1.symbolic.x;
var g=a.point1.symbolic.y;var r=a.point2.symbolic.x;var q=a.point2.symbolic.y;var u=d.symbolic.x;
var s=d.symbolic.y;var m=b.symbolic.x;var k=b.symbolic.y;var n="("+g+")*("+m+")-("+g+")*("+r+")+("+k+")*("+r+")-("+h+")*("+k+")+("+h+")*("+q+")-("+m+")*("+q+")";
var l="("+s+")*("+g+")-("+s+")*("+q+")-("+k+")*("+g+")+("+k+")*("+q+")+("+u+")*("+h+")-("+u+")*("+r+")-("+m+")*("+h+")+("+m+")*("+r+")";
return[n,l]};return b};JXG.createPerpendicular=function(e,h,g){var f,a,b,d,c;h[0]=JXG.getReference(e,h[0]);
h[1]=JXG.getReference(e,h[1]);if(JXG.isPoint(h[0])&&h[1].elementClass==JXG.OBJECT_CLASS_LINE){a=h[1];
f=h[0]}else{if(JXG.isPoint(h[1])&&h[0].elementClass==JXG.OBJECT_CLASS_LINE){a=h[0];
f=h[1]}else{throw new Error("JSXGraph: Can't create perpendicular with parent types '"+(typeof h[0])+"' and '"+(typeof h[1])+"'.")
}}if(!JXG.isArray(g.id)){g.id=["",""]}if(!JXG.isArray(g.name)){g.name=["",""]}d=JXG.createPerpendicularPoint(e,[a,f],{fixed:true,name:g.name[1],id:g.id[1],visible:false});
b=JXG.createSegment(e,[function(){return(e.algebra.perpendicular(a,f)[1]?[d,f]:[f,d])
}],{name:g.name[0],id:g.id[0]});c=[b,d];c.line=b;c.point=d;c.multipleElements=true;
return c};JXG.createMidpoint=function(f,h,g){var d,c,e;if(h.length==2&&JXG.isPoint(h[0])&&JXG.isPoint(h[1])){d=h[0];
c=h[1]}else{if(h.length==1&&h[0].elementClass==JXG.OBJECT_CLASS_LINE){d=h[0].point1;
c=h[0].point2}else{throw new Error("JSXGraph: Can't create midpoint.")}}if(g){g.fixed=true
}else{g={fixed:true}}e=f.create("point",[function(){return(d.coords.usrCoords[1]+c.coords.usrCoords[1])/2
},function(){return(d.coords.usrCoords[2]+c.coords.usrCoords[2])/2}],g);d.addChild(e);
c.addChild(e);e.update();e.generatePolynomial=function(){var k=d.symbolic.x;var b=d.symbolic.y;
var m=c.symbolic.x;var l=c.symbolic.y;var q=e.symbolic.x;var n=e.symbolic.y;var a="("+b+")*("+q+")-("+b+")*("+m+")+("+n+")*("+m+")-("+k+")*("+n+")+("+k+")*("+l+")-("+q+")*("+l+")";
var r="("+k+")^2 - 2*("+k+")*("+q+")+("+b+")^2-2*("+b+")*("+n+")-("+m+")^2+2*("+m+")*("+q+")-("+l+")^2+2*("+l+")*("+n+")";
return[a,r]};if(JXG.nullAtts){g=null}return e};JXG.createParallelPoint=function(f,l,k){var e,d,h,g;
if(l.length==3&&l[0].elementClass==JXG.OBJECT_CLASS_POINT&&l[1].elementClass==JXG.OBJECT_CLASS_POINT&&l[2].elementClass==JXG.OBJECT_CLASS_POINT){e=l[0];
d=l[1];h=l[2]}else{if(l[0].elementClass==JXG.OBJECT_CLASS_POINT&&l[1].elementClass==JXG.OBJECT_CLASS_LINE){h=l[0];
e=l[1].point1;d=l[1].point2}else{if(l[1].elementClass==JXG.OBJECT_CLASS_POINT&&l[0].elementClass==JXG.OBJECT_CLASS_LINE){h=l[1];
e=l[0].point1;d=l[0].point2}else{throw new Error("JSXGraph: Can't create parallel point with parent types '"+(typeof l[0])+"', '"+(typeof l[1])+"' and '"+(typeof l[2])+"'.")
}}}g=f.create("point",[function(){return h.coords.usrCoords[1]+d.coords.usrCoords[1]-e.coords.usrCoords[1]
},function(){return h.coords.usrCoords[2]+d.coords.usrCoords[2]-e.coords.usrCoords[2]
}],k);h.addChild(g);g.update();g.generatePolynomial=function(){var b=e.symbolic.x;
var a=e.symbolic.y;var v=d.symbolic.x;var u=d.symbolic.y;var m=h.symbolic.x;var c=h.symbolic.y;
var r=g.symbolic.x;var n=g.symbolic.y;var s="("+u+")*("+r+")-("+u+")*("+m+")-("+a+")*("+r+")+("+a+")*("+m+")-("+n+")*("+v+")+("+n+")*("+b+")+("+c+")*("+v+")-("+c+")*("+b+")";
var q="("+n+")*("+b+")-("+n+")*("+m+")-("+u+")*("+b+")+("+u+")*("+m+")-("+r+")*("+a+")+("+r+")*("+c+")+("+v+")*("+a+")-("+v+")*("+c+")";
return[s,q]};return g};JXG.createParallel=function(d,b,k){var h,a,c,f;f={name:null,id:null,fixed:true,visible:false};
if(JXG.isArray(k.name)&&k.name.length==2){f.name=k.name[1];k.name=k.name[0]}else{f.name=k.name+"p2"
}if(JXG.isArray(k.id)&&k.id.length==2){f.id=k.id[1];k.id=k.id[0]}else{f.id=k.id+"p2"
}if(k){f=JXG.cloneAndCopy(k,f)}try{a=JXG.createParallelPoint(d,b,f)}catch(g){throw new Error("JSXGraph: Can't create parallel with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"'.")
}h=null;if(b.length==3){h=b[2]}else{if(b[0].elementClass==JXG.OBJECT_CLASS_POINT){h=b[0]
}else{if(b[1].elementClass==JXG.OBJECT_CLASS_POINT){h=b[1]}}}c=d.create("line",[h,a],k);
return c};JXG.createArrowParallel=function(c,b,g){var a,d;try{a=JXG.createParallel(c,b,g)
}catch(f){throw new Error("JSXGraph: Can't create arrowparallel with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"'.")
}a.setStraight(false,false);a.setArrow(false,true);return a};JXG.createNormal=function(d,b,a){var k;
var l;if(b.length==1){k=b[0];l=k.slideObject}else{if(b.length==2){if(JXG.isPoint(b[0])){k=b[0];
l=b[1]}else{if(JXG.isPoint(b[1])){l=b[0];k=b[1]}else{throw new Error("JSXGraph: Can't create normal with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"'.")
}}}else{throw new Error("JSXGraph: Can't create normal with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"'.")
}}if(l.elementClass==JXG.OBJECT_CLASS_LINE){return d.create("line",[function(){return l.stdform[1]*k.Y()-l.stdform[2]*k.X()
},function(){return l.stdform[2]*k.Z()},function(){return -l.stdform[1]*k.Z()}],a)
}else{if(l.elementClass==JXG.OBJECT_CLASS_CIRCLE){return d.create("line",[l.midpoint,k],a)
}else{if(l.elementClass==JXG.OBJECT_CLASS_CURVE){if(l.curveType!="plot"){var e=l.X;
var h=l.Y;return d.create("line",[function(){return -k.X()*d.D(e)(k.position)-k.Y()*d.D(h)(k.position)
},function(){return d.D(e)(k.position)},function(){return d.D(h)(k.position)}],a)
}else{return d.create("line",[function(){var f=Math.floor(k.position);var c=k.position-f;
if(f==l.numberPoints-1){f--;c=1}if(f<0){return 1}return(l.Y(f)+c*(l.Y(f+1)-l.Y(f)))*(l.Y(f)-l.Y(f+1))-(l.X(f)+c*(l.X(f+1)-l.X(f)))*(l.X(f+1)-l.X(f))
},function(){var c=Math.floor(k.position);if(c==l.numberPoints-1){c--}if(c<0){return 0
}return l.X(c+1)-l.X(c)},function(){var c=Math.floor(k.position);if(c==l.numberPoints-1){c--
}if(c<0){return 0}return l.Y(c+1)-l.Y(c)}],a)}}else{if(l.type==JXG.OBJECT_TYPE_TURTLE){return d.create("line",[function(){var g=Math.floor(k.position);
var c=k.position-g;var m,f;for(f=0;f<l.objects.length;f++){m=l.objects[f];if(m.type==JXG.OBJECT_TYPE_CURVE){if(g<m.numberPoints){break
}g-=m.numberPoints}}if(g==m.numberPoints-1){g--;c=1}if(g<0){return 1}return(m.Y(g)+c*(m.Y(g+1)-m.Y(g)))*(m.Y(g)-m.Y(g+1))-(m.X(g)+c*(m.X(g+1)-m.X(g)))*(m.X(g+1)-m.X(g))
},function(){var f=Math.floor(k.position);var g,c;for(c=0;c<l.objects.length;c++){g=l.objects[c];
if(g.type==JXG.OBJECT_TYPE_CURVE){if(f<g.numberPoints){break}f-=g.numberPoints}}if(f==g.numberPoints-1){f--
}if(f<0){return 0}return g.X(f+1)-g.X(f)},function(){var f=Math.floor(k.position);
var g,c;for(c=0;c<l.objects.length;c++){g=l.objects[c];if(g.type==JXG.OBJECT_TYPE_CURVE){if(f<g.numberPoints){break
}f-=g.numberPoints}}if(f==g.numberPoints-1){f--}if(f<0){return 0}return g.Y(f+1)-g.Y(f)
}],a)}else{throw new Error("JSXGraph: Can't create normal with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"'.")
}}}}};JXG.createBisector=function(c,g,f){var e,a,d,b;if(g[0].elementClass==JXG.OBJECT_CLASS_POINT&&g[1].elementClass==JXG.OBJECT_CLASS_POINT&&g[2].elementClass==JXG.OBJECT_CLASS_POINT){d={name:"",id:null,fixed:true,visible:false};
if(f){d=JXG.cloneAndCopy(f,d)}e=c.create("point",[function(){return c.algebra.angleBisector(g[0],g[1],g[2])
}],d);for(b=0;b<3;b++){g[b].addChild(e)}if(typeof f.straightFirst=="undefined"){f.straightFirst=false
}if(typeof f.straightLast=="undefined"){f.straightLast=true}a=JXG.createLine(c,[g[1],e],f);
return a}else{throw new Error("JSXGraph: Can't create angle bisector with parent types '"+(typeof g[0])+"' and '"+(typeof g[1])+"'.")
}};JXG.createAngularBisectorsOfTwoLines=function(g,k,d){var c=JXG.getReference(g,k[0]),b=JXG.getReference(g,k[1]),m="",l="",h="",e="",f;
d=JXG.checkAttributes(d,{});if(d.id!=null){if(JXG.isArray(d.id)){m=d.id[0];l=d.id[1]
}else{m=d.id;l=d.id}}if(d.name!=null){if(JXG.isArray(d.name)){h=d.name[0];e=d.name[1]
}else{h=d.name;e=d.name}}d.id=m;d.name=h;var a=g.create("line",[function(){var r=Math.sqrt(c.stdform[1]*c.stdform[1]+c.stdform[2]*c.stdform[2]);
var q=Math.sqrt(b.stdform[1]*b.stdform[1]+b.stdform[2]*b.stdform[2]);return c.stdform[0]/r-b.stdform[0]/q
},function(){var r=Math.sqrt(c.stdform[1]*c.stdform[1]+c.stdform[2]*c.stdform[2]);
var q=Math.sqrt(b.stdform[1]*b.stdform[1]+b.stdform[2]*b.stdform[2]);return c.stdform[1]/r-b.stdform[1]/q
},function(){var r=Math.sqrt(c.stdform[1]*c.stdform[1]+c.stdform[2]*c.stdform[2]);
var q=Math.sqrt(b.stdform[1]*b.stdform[1]+b.stdform[2]*b.stdform[2]);return c.stdform[2]/r-b.stdform[2]/q
}],d);d.id=l;d.name=e;var n=g.create("line",[function(){var r=Math.sqrt(c.stdform[1]*c.stdform[1]+c.stdform[2]*c.stdform[2]);
var q=Math.sqrt(b.stdform[1]*b.stdform[1]+b.stdform[2]*b.stdform[2]);return c.stdform[0]/r+b.stdform[0]/q
},function(){var r=Math.sqrt(c.stdform[1]*c.stdform[1]+c.stdform[2]*c.stdform[2]);
var q=Math.sqrt(b.stdform[1]*b.stdform[1]+b.stdform[2]*b.stdform[2]);return c.stdform[1]/r+b.stdform[1]/q
},function(){var r=Math.sqrt(c.stdform[1]*c.stdform[1]+c.stdform[2]*c.stdform[2]);
var q=Math.sqrt(b.stdform[1]*b.stdform[1]+b.stdform[2]*b.stdform[2]);return c.stdform[2]/r+b.stdform[2]/q
}],d);f=[a,n];f.lines=[a,n];f.line1=a;f.line2=n;f.multipleElements=true;return f};
JXG.createCircumcircleMidpoint=function(b,e,d){var c,a;if(e[0].elementClass==JXG.OBJECT_CLASS_POINT&&e[1].elementClass==JXG.OBJECT_CLASS_POINT&&e[2].elementClass==JXG.OBJECT_CLASS_POINT){d.fixed=d.fixed||true;
c=JXG.createPoint(b,[function(){return b.algebra.circumcenterMidpoint(e[0],e[1],e[2])
}],d);for(a=0;a<3;a++){e[a].addChild(c)}return c}else{throw new Error("JSXGraph: Can't create circumcircle midpoint with parent types '"+(typeof e[0])+"', '"+(typeof e[1])+"' and '"+(typeof e[2])+"'.")
}};JXG.createCircumcircle=function(b,l,k){var g,h,d,a;d=JXG.clone(k);if(k.name&&JXG.isArray(k.name)){d.name=k.name[0];
k.name=k.name[1]}if(k.id&&JXG.isArray(k.id)){d.id=k.id[0];k.id=k.id[1]}try{g=JXG.createCircumcircleMidpoint(b,l,d);
h=JXG.createCircle(b,[g,l[0]],k)}catch(f){throw new Error("JSXGraph: Can't create circumcircle with parent types '"+(typeof l[0])+"', '"+(typeof l[1])+"' and '"+(typeof l[2])+"'.")
}a=[g,h];a.point=g;a.circle=h;a.multipleElements=true;return a};JXG.createReflection=function(b,f,e){var a,d,c;
if(f[0].elementClass==JXG.OBJECT_CLASS_POINT&&f[1].elementClass==JXG.OBJECT_CLASS_LINE){d=f[0];
a=f[1]}else{if(f[1].elementClass==JXG.OBJECT_CLASS_POINT&&f[0].elementClass==JXG.OBJECT_CLASS_LINE){d=f[1];
a=f[0]}else{throw new Error("JSXGraph: Can't create reflection point with parent types '"+(typeof f[0])+"' and '"+(typeof f[1])+"'.")
}}e.fixed=true;c=JXG.createPoint(b,[function(){return b.algebra.reflection(a,d)}],e);
d.addChild(c);a.addChild(c);c.update();return c};JXG.createMirrorPoint=function(a,d,c){var b;
if(JXG.isPoint(d[0])&&JXG.isPoint(d[1])){c.fixed=c.fixed||true;b=JXG.createPoint(a,[function(){return a.algebra.rotation(d[0],d[1],Math.PI)
}],c);for(i=0;i<2;i++){d[i].addChild(b)}}else{throw new Error("JSXGraph: Can't create mirror point with parent types '"+(typeof d[0])+"' and '"+(typeof d[1])+"'.")
}b.update();return b};JXG.createIntegral=function(m,q,k){var d,f,a={},c=0,h=0,n,r,e,g,l,s,b;
if(!JXG.isArray(k.id)||(k.id.length!=5)){k.id=["","","","",""]}if(!JXG.isArray(k.name)||(k.name.length!=5)){k.name=["","","","",""]
}if(JXG.isArray(q[0])&&q[1].type==JXG.OBJECT_TYPE_CURVE){d=q[0];f=q[1]}else{if(JXG.isArray(q[1])&&q[0].type==JXG.OBJECT_TYPE_CURVE){d=q[1];
f=q[0]}else{throw new Error("JSXGraph: Can't create integral with parent types '"+(typeof q[0])+"' and '"+(typeof q[1])+"'.")
}}if((typeof k!="undefined")&&(k!=null)){a=JXG.cloneAndCopy(k,{name:k.name[0],id:k.id[0]})
}if(d[0]>f.points[0].usrCoords[1]){c=d[0]}else{c=f.points[0].usrCoords[1]}if(d[1]<f.points[f.points.length-1].usrCoords[1]){h=d[1]
}else{h=f.points[f.points.length-1].usrCoords[1]}n=m.create("glider",[c,f.yterm(c),f],a);
a.name=k.name[1];a.id=k.id[1];a.visible=false;r=m.create("point",[function(){return n.X()
},0],a);n.addChild(r);a.name=k.name[2];a.id=k.id[2];a.visible=k.visible||true;e=m.create("glider",[h,f.yterm(h),f],a);
a.name=k.name[3];a.id=k.id[3];a.visible=false;g=m.create("point",[function(){return e.X()
},0],a);e.addChild(g);l=JXG.Math.Numerics.I([c,h],f.yterm);s=m.create("text",[function(){return e.X()+0.2
},function(){return e.Y()-0.8},function(){var u=JXG.Math.Numerics.I([r.X(),g.X()],f.yterm);
return"&int; = "+(u).toFixed(4)}],{labelColor:k.labelColor});a.name=k.name[4];a.id=k.id[4];
a.visible=k.visible||true;a.fillColor=a.fillColor||m.options.polygon.fillColor;a.highlightFillColor=a.highlightFillColor||m.options.polygon.highlightFillColor;
a.fillOpacity=a.fillOpacity||m.options.polygon.fillOpacity;a.highlightFillOpacity=a.highlightFillOpacity||m.options.polygon.highlightFillOpacity;
a.strokeWidth=0;a.strokeOpacity=0;b=m.create("curve",[[0],[0]],a);b.updateDataArray=function(){var u=[r.coords.usrCoords[1],n.coords.usrCoords[1]],w=[r.coords.usrCoords[2],n.coords.usrCoords[2]],v;
for(v=0;v<f.numberPoints;v++){if((r.X()<=f.points[v].usrCoords[1])&&(f.points[v].usrCoords[1]<=g.X())){u.push(f.points[v].usrCoords[1]);
w.push(f.points[v].usrCoords[2])}}u.push(e.coords.usrCoords[1]);w.push(e.coords.usrCoords[2]);
u.push(g.coords.usrCoords[1]);w.push(g.coords.usrCoords[2]);u.push(r.coords.usrCoords[1]);
w.push(r.coords.usrCoords[2]);this.dataX=u;this.dataY=w};n.addChild(b);e.addChild(b);
n.addChild(s);e.addChild(s);return b};JXG.createLocus=function(d,b,a){var f,e;if(JXG.isArray(b)&&b.length==1&&b[0].elementClass==JXG.OBJECT_CLASS_POINT){e=b[0]
}else{throw new Error("JSXGraph: Can't create locus with parent of type other than point.")
}f=d.create("curve",[[null],[null]],a);f.dontCallServer=false;f.updateDataArray=function(){cb=function(g,h,c){f.dataX=g;
f.dataY=h;d.update()};if(d.mode==d.BOARD_MODE_NONE&&!this.dontCallServer){JXG.Math.Symbolic.geometricLocusByGroebnerBase(d,e,cb);
this.dontCallServer=true}else{this.dontCallServer=false}};return f};JXG.JSXGraph.registerElement("arrowparallel",JXG.createArrowParallel);
JXG.JSXGraph.registerElement("bisector",JXG.createBisector);JXG.JSXGraph.registerElement("bisectorlines",JXG.createAngularBisectorsOfTwoLines);
JXG.JSXGraph.registerElement("circumcircle",JXG.createCircumcircle);JXG.JSXGraph.registerElement("circumcirclemidpoint",JXG.createCircumcircleMidpoint);
JXG.JSXGraph.registerElement("integral",JXG.createIntegral);JXG.JSXGraph.registerElement("midpoint",JXG.createMidpoint);
JXG.JSXGraph.registerElement("mirrorpoint",JXG.createMirrorPoint);JXG.JSXGraph.registerElement("normal",JXG.createNormal);
JXG.JSXGraph.registerElement("parallel",JXG.createParallel);JXG.JSXGraph.registerElement("parallelpoint",JXG.createParallelPoint);
JXG.JSXGraph.registerElement("perpendicular",JXG.createPerpendicular);JXG.JSXGraph.registerElement("perpendicularpoint",JXG.createPerpendicularPoint);
JXG.JSXGraph.registerElement("reflection",JXG.createReflection);JXG.JSXGraph.registerElement("locus",JXG.createLocus);
JXG.Text=function(k,q,f,n,c,a,d,m,l,h){this.constructor();this.type=JXG.OBJECT_TYPE_TEXT;
this.elementClass=JXG.OBJECT_CLASS_OTHER;this.init(k,c,a);this.contentStr=q;this.plaintextStr="";
if(h==null){h=k.options.layer.text}this.layer=h;this.display=l||"html";if((typeof m!="undefined")&&(m!=null)){this.isLabel=m
}else{this.isLabel=false}this.visProp.strokeColor=this.board.options.text.strokeColor;
this.visProp.visible=true;if(d!=null){this.digits=d}else{this.digits=2}if((this.element=this.board.objects[f])){var e;
this.relativeCoords=new JXG.Coords(JXG.COORDS_BY_USER,[parseFloat(n[0]),parseFloat(n[1])],this.board);
if(!this.isLabel){e=this.element.getTextAnchor()}else{e=this.element.getLabelAnchor()
}this.element.addChild(this);this.coords=new JXG.Coords(JXG.COORDS_BY_USER,[this.relativeCoords.usrCoords[1]+e.usrCoords[1],this.relativeCoords.usrCoords[2]+e.usrCoords[2]],this.board)
}else{this.X=JXG.createFunction(n[0],this.board,"");this.Y=JXG.createFunction(n[1],this.board,"");
this.coords=new JXG.Coords(JXG.COORDS_BY_USER,[this.X(),this.Y()],this.board);var g="this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.X(),this.Y()]);";
this.updateCoords=new Function("",g)}if(typeof this.contentStr=="function"){this.updateText=function(){this.plaintextStr=this.contentStr()
}}else{var b;if(typeof this.contentStr=="number"){b=(this.contentStr).toFixed(this.digits)
}else{if(this.board.options.text.useASCIIMathML){b="'"+this.contentStr+"'"}else{b=this.generateTerm(this.contentStr)
}}this.updateText=new Function("this.plaintextStr = "+b+";")}if(!this.isLabel){this.id=this.board.addText(this)
}if(typeof this.contentStr=="string"){this.notifyParents(this.contentStr)}};JXG.Text.prototype=new JXG.GeometryElement();
JXG.Text.prototype.hasPoint=function(a,b){return false};JXG.Text.prototype.setText=function(b){var a;
if(typeof b=="number"){a=(b).toFixed(this.digits)}else{a=this.generateTerm(b)}this.updateText=new Function("this.plaintextStr = "+a+";");
this.updateText();return this};JXG.Text.prototype.setCoords=function(a,b){this.X=function(){return a
};this.Y=function(){return b};this.coords=new JXG.Coords(JXG.COORDS_BY_USER,[a,b],this.board);
return this};JXG.Text.prototype.update=function(){if(this.needsUpdate){if(this.relativeCoords){var a;
if(!this.isLabel){a=this.element.getTextAnchor()}else{a=this.element.getLabelAnchor()
}this.coords.setCoordinates(JXG.COORDS_BY_USER,[this.relativeCoords.usrCoords[1]+a.usrCoords[1],this.relativeCoords.usrCoords[2]+a.usrCoords[2]])
}else{this.updateCoords()}this.updateText()}return this};JXG.Text.prototype.updateRenderer=function(){if(this.needsUpdate){this.board.renderer.updateText(this);
this.needsUpdate=false}return this};JXG.Text.prototype.generateTerm=function(e){var d=null;
var g=this.board.elementsByName;var f='""';e=e.replace(/\r/g,"");e=e.replace(/\n/g,"");
e=e.replace(/\"/g,'\\"');e=e.replace(/\'/g,"\\'");e=e.replace(/&amp;arc;/g,"&ang;");
e=e.replace(/<arc\s*\/>/g,"&ang;");e=e.replace(/<sqrt\s*\/>/g,"&radic;");var c;c=e.indexOf("<value>");
var a=e.indexOf("</value>");if(c>=0){while(c>=0){f+=' + "'+this.board.algebra.replaceSub(this.board.algebra.replaceSup(e.slice(0,c)))+'"';
var b=e.slice(c+7,a);var d=this.board.algebra.geonext2JS(b);d=d.replace(/\\"/g,'"');
d=d.replace(/\\'/g,"'");if(d.indexOf("toFixed")<0){f+="+("+d+").toFixed("+(this.digits)+")"
}else{f+="+("+d+")"}e=e.slice(a+8);c=e.indexOf("<value>");a=e.indexOf("</value>")
}}f+=' + "'+this.board.algebra.replaceSub(this.board.algebra.replaceSup(e))+'"';f=f.replace(/<overline>/g,"<span style=text-decoration:overline>");
f=f.replace(/<\/overline>/g,"</span>");f=f.replace(/<arrow>/g,"<span style=text-decoration:overline>");
f=f.replace(/<\/arrow>/g,"</span>");f=f.replace(/&amp;/g,"&");return f};JXG.Text.prototype.notifyParents=function(c){var b=null;
var d=this.board.elementsByName;do{var a=/<value>([\w\s\*\/\^\-\+\(\)\[\],<>=!]+)<\/value>/;
b=a.exec(c);if(b!=null){this.board.algebra.findDependencies(this,b[1]);c=c.substr(b.index);
c=c.replace(a,"")}}while(b!=null);return this};JXG.createText=function(a,c,b){b=JXG.checkAttributes(b,{layer:null,display:a.options.text.defaultDisplay});
return new JXG.Text(a,c[c.length-1],null,c,b.id,b.name,b.digits,false,b.display,b.layer)
};JXG.JSXGraph.registerElement("text",JXG.createText);JXG.Image=function(f,b,g,d,c,h,a,e){this.type=JXG.OBJECT_TYPE_IMAGE;
this.elementClass=JXG.OBJECT_CLASS_OTHER;this.transformations=[];this.init(f,h,a);
this.coords=new JXG.Coords(JXG.COORDS_BY_USER,g,this.board);this.initialCoords=new JXG.Coords(JXG.COORDS_BY_USER,g,this.board);
this.size=[d[0]*f.stretchX,d[1]*f.stretchY];this.url=b;if(c==null){c=f.options.layer.image
}this.layer=c;this.parent=e;this.visProp.visible=true;this.id=this.board.addImage(this)
};JXG.Image.prototype=new JXG.GeometryElement;JXG.Image.prototype.hasPoint=function(a,b){return false
};JXG.Image.prototype.updateRenderer=function(){this.updateTransform();this.board.renderer.updateImage(this)
};JXG.Image.prototype.updateTransform=function(){if(this.transformations.length==0){return
}for(var a=0;a<this.transformations.length;a++){this.transformations[a].update()}};
JXG.Image.prototype.addTransform=function(a){if(JXG.isArray(a)){for(var b=0;b<a.length;
b++){this.transformations.push(a[b])}}else{this.transformations.push(a)}};JXG.createImage=function(c,b,d){var a;
if(d==null){d={}}else{if(d.imageString!=null){a=d.imageString}}if(typeof d.layer=="undefined"){d.layer=null
}return new JXG.Image(c,b[0],b[1],b[2],d.layer,false,false,undefined)};JXG.JSXGraph.registerElement("image",JXG.createImage);
JXG.createSlider=function(l,x,u){var g,f,y,h,z,m,c,b,w,A,k,e,d,a,v,s,q,r;g=x[0];f=x[1];
y=x[2][0];h=x[2][1];z=x[2][2];m=z-y;u=JXG.checkAttributes(u,{strokeColor:"#000000",fillColor:"#ffffff"});
c=l.create("point",g,{visible:false,fixed:true,name:"",withLabel:false});b=l.create("point",f,{visible:false,fixed:true,name:"",withLabel:false});
w=l.create("segment",[c,b],{strokewidth:1,name:"",withLabel:false,strokeColor:u.strokeColor});
A=2;k=l.create("ticks",[w,b.Dist(c)/A],{insertTicks:true,minorTicks:0,drawLabels:false,drawZero:true});
c.needsRegularUpdate=false;b.needsRegularUpdate=false;w.needsRegularUpdate=false;
e=g[0]+(f[0]-g[0])*(h-y)/(z-y);d=g[1]+(f[1]-g[1])*(h-y)/(z-y);if(u.snapWidth!=null){r=u.snapWidth
}if(u.snapwidth!=null){r=u.snapwidth}a=l.create("glider",[e,d,w],{style:6,strokeColor:u.strokeColor,fillColor:u.fillColor,showInfobox:false,name:u.name,withLabel:false,snapWidth:r});
v=l.create("line",[c,a],{straightFirst:false,straightLast:false,strokewidth:3,strokeColor:u.strokeColor,name:"",withLabel:false});
a.Value=function(){return this.position*m+y};a._smax=z;a._smin=y;if(typeof u.withLabel=="undefined"||u.withLabel==true){if(u.name&&u.name!=""){s=u.name+" = "
}else{s=""}q=l.create("text",[((f[0]-g[0])*0.05+f[0]),((f[1]-g[1])*0.05+f[1]),function(){return s+(a.Value()).toFixed(2)
}],{name:""})}return a};JXG.JSXGraph.registerElement("slider",JXG.createSlider);JXG.Chart=function(h,m,e){this.constructor();
if(m.length==0){return}this.elements=[];var d=e.id||"";var b=e.name||"";this.init(h,d,b);
var n,l,f;if(m.length>0&&(typeof m[0]=="number")){l=m;n=[];for(f=0;f<l.length;f++){n[f]=f+1
}}else{if(m.length==1){l=m[0];n=[];var g;if(JXG.isFunction(l)){g=l().length}else{g=l.length
}for(f=0;f<g;f++){n[f]=f+1}}if(m.length==2){n=m[0];l=m[1]}}if(e==undefined){e={}}var a=e.chartStyle||"line";
a=a.replace(/ /g,"");a=a.split(",");var k;for(f=0;f<a.length;f++){switch(a[f]){case"bar":k=this.drawBar(h,[n,l],e);
break;case"line":k=this.drawLine(h,[n,l],e);break;case"fit":k=this.drawFit(h,[n,l],e);
break;case"spline":k=this.drawSpline(h,[n,l],e);break;case"pie":k=this.drawPie(h,[l],e);
break;case"point":k=this.drawPoints(h,[n,l],e);break}this.elements.push(k)}this.id=this.board.addChart(this);
return this.elements};JXG.Chart.prototype=new JXG.GeometryElement;JXG.Chart.prototype.drawLine=function(f,e,b){var d=e[0],a=e[1];
b.fillColor="none";b.highlightFillColor="none";var g=f.create("curve",[d,a],b);this.rendNode=g.rendNode;
return g};JXG.Chart.prototype.drawSpline=function(f,d,b){var a=d[0],h=d[1],e;b.fillColor="none";
b.highlightFillColor="none";var g=f.create("spline",[a,h],b);this.rendNode=g.rendNode;
return g};JXG.Chart.prototype.drawFit=function(f,e,d){var a=e[0],k=e[1],g=(((typeof d.degree=="undefined")||(parseInt(d.degree)==NaN)||(parseInt(d.degree)<1))?1:parseInt(d.degree));
d.fillColor="none";d.highlightFillColor="none";var b=JXG.Math.Numerics.regressionPolynomial(g,a,k);
var h=f.create("functiongraph",[b],d);this.rendNode=h.rendNode;return h};JXG.Chart.prototype.drawBar=function(h,l,f){var g,e=[],m=l[0],k=l[1],n,c,u,s,b,a,q,d=[],r;
if(f.fillOpacity==undefined){f.fillOpacity=0.6}if(f&&f.width){n=f.width}else{if(m.length<=1){n=1
}else{n=m[1]-m[0];for(g=1;g<m.length-1;g++){n=(m[g+1]-m[g]<n)?(m[g+1]-m[g]):n}}n*=0.8
}r=f.fillColor;for(g=0;g<m.length;g++){if(JXG.isFunction(m[g])){c=function(){return m[g]()-n*0.5
};u=function(){return m[g]()};s=function(){return m[g]()+n*0.5}}else{c=m[g]-n*0.5;
u=m[g];s=m[g]+n*0.5}if(JXG.isFunction(k[g])){a=b}else{a=k[g]+0.2}b=k[g];if(f.dir=="horizontal"){d[0]=h.create("point",[0,c],{name:"",fixed:true,visible:false});
d[1]=h.create("point",[b,c],{name:"",fixed:true,visible:false});d[2]=h.create("point",[b,s],{name:"",fixed:true,visible:false});
d[3]=h.create("point",[0,s],{name:"",fixed:true,visible:false});if(f.labels&&f.labels[g]){h.create("text",[b,s,f.labels[g]],f)
}}else{d[0]=h.create("point",[c,0],{name:"",fixed:true,visible:false});d[1]=h.create("point",[c,b],{name:"",fixed:true,visible:false});
d[2]=h.create("point",[s,b],{name:"",fixed:true,visible:false});d[3]=h.create("point",[s,0],{name:"",fixed:true,visible:false});
if(f.labels&&f.labels[g]){h.create("text",[s,b,f.labels[g]],f)}}f.withLines=false;
if(typeof r=="undefined"&&r==null){q=f.colorArray||["#B02B2C","#3F4C6B","#C79810","#D15600","#FFFF88","#C3D9FF","#4096EE","#008C00"];
f.fillColor=q[g%q.length]}e[g]=h.create("polygon",d,f)}this.rendNode=e[0].rendNode;
return e};JXG.Chart.prototype.drawPoints=function(f,c,b){var d;var e=[];b.fixed=true;
b.name="";var a=c[0];var g=c[1];for(d=0;d<a.length;d++){e[d]=f.create("point",[a[d],g[d]],b)
}this.rendNode=e[0].rendNode;return e};JXG.Chart.prototype.drawPie=function(d,x,f){var g=x[0];
if(g.length<=0){return}if(typeof g[0]=="function"){return}var w;var r=[];var k=[];
var e=[];var l=JXG.Math.Statistics.sum(g);var c=f.colorArray||["#B02B2C","#3F4C6B","#C79810","#D15600","#FFFF88","#C3D9FF","#4096EE","#008C00"];
var B=f.highlightColorArray||["#FF7400"];var u=new Array(g.length);for(w=0;w<g.length;
w++){u[w]=""}var m=f.labelArray||u;var b=f.radius||4;var A={};if(typeof f.highlightOnSector=="undefined"){f.highlightOnSector=false
}A.name=f.name;A.id=f.id;A.strokeWidth=f.strokeWidth||1;A.strokeColor=f.strokeColor||"none";
A.straightFirst=false;A.straightLast=false;A.fillColor=f.fillColor||"#FFFF88";A.fillOpacity=f.fillOpacity||0.6;
A.highlightFillColor=f.highlightFillColor||"#FF7400";A.highlightStrokeColor=f.highlightStrokeColor||"#FFFFFF";
A.gradient=f.gradient||"none";var q=f.center||[0,0];var v=q[0];var a=q[1];var z=d.create("point",[v,a],{name:"",fixed:true,visible:false});
r[0]=d.create("point",[b+v,0+a],{name:"",fixed:true,visible:false});var C=0;for(w=0;
w<g.length;w++){C+=(l!=0)?(2*Math.PI*g[w]/l):0;var h=b*Math.cos(C)+v;var n=b*Math.sin(C)+a;
r[w+1]=d.create("point",[h,n],{name:"",fixed:true,visible:false,withLabel:false});
k[w]=d.create("line",[z,r[w]],{strokeColor:A.strokeColor,straightFirst:false,straightLast:false,strokeWidth:A.strokeWidth,strokeOpacity:1,withLabel:false,highlightStrokeColor:A.highlightStrokeColor});
A.fillColor=c[w%c.length];A.name=m[w];if(A.name!=""){A.withLabel=true}else{A.withLabel=false
}A.labelColor=c[w%c.length];A.highlightfillColor=B[w%B.length];e[w]=d.create("arc",[z,r[w],r[w+1]],A);
if(f.highlightOnSector){e[w].hasPoint=e[w].hasPointSector}}for(w=0;w<g.length;w++){e[w].additionalLines=[k[w],k[(w+1)%g.length]]
}this.rendNode=e[0].rendNode;return{arcs:e,lines:k,points:r,midpoint:z}};JXG.Chart.prototype.updateRenderer=function(){};
JXG.Chart.prototype.update=function(){if(this.needsUpdate){this.updateDataArray()
}};JXG.Chart.prototype.updateDataArray=function(){};JXG.createChart=function(e,u,f){if((u.length==1)&&(typeof u[0]=="string")){var s=document.getElementById(u[0]),A,d,n,m,c,a,r=[],h,g,z,y,B,k,b,l,v,q;
if(typeof s!="undefined"){f=JXG.checkAttributes(f,{withHeader:true});s=(new JXG.DataSource()).loadFromTable(u[0],f.withHeader,f.withHeader);
A=s.data;c=s.columnHeader;d=s.rowHeader;y=f.width;B=f.name;k=f.strokeColor;b=f.fillColor;
l=f.highlightStrokeColor;v=f.highlightFillColor;e.suspendUpdate();q=A.length;z=[];
if(f.rows&&JXG.isArray(f.rows)){for(n=0;n<q;n++){for(m=0;m<f.rows.length;m++){if((f.rows[m]==n)||(f.withHeaders&&f.rows[m]==d[n])){z.push(A[n]);
break}}}}else{z=A}q=z.length;for(n=0;n<q;n++){g=[];if(f.chartStyle&&f.chartStyle.indexOf("bar")!=-1){if(y){h=y
}else{h=0.8}g.push(1-h/2+(n+0.5)*h/(1*q));for(m=1;m<z[n].length;m++){g.push(g[m-1]+1)
}f.width=h/(1*q)}if(B&&B.length==q){f.name=B[n]}else{if(f.withHeaders){f.name=c[n]
}}if(k&&k.length==q){f.strokeColor=k[n]}else{f.strokeColor=JXG.hsv2rgb(((n+1)/(1*q))*360,0.9,0.6)
}if(b&&b.length==q){f.fillColor=b[n]}else{f.fillColor=JXG.hsv2rgb(((n+1)/(1*q))*360,0.9,1)
}if(l&&l.length==q){f.highlightStrokeColor=l[n]}else{f.highlightStrokeColor=JXG.hsv2rgb(((n+1)/(1*q))*360,0.9,1)
}if(v&&v.length==q){f.highlightFillColor=v[n]}else{f.highlightFillColor=JXG.hsv2rgb(((n+1)/(1*q))*360,0.9,0.6)
}if(f.chartStyle&&f.chartStyle.indexOf("bar")!=-1){r.push(new JXG.Chart(e,[g,z[n]],f))
}else{r.push(new JXG.Chart(e,[z[n]],f))}}e.unsuspendUpdate()}return r}else{return new JXG.Chart(e,u,f)
}};JXG.JSXGraph.registerElement("chart",JXG.createChart);JXG.Transformation=function(b,a,c){this.elementClass=JXG.OBJECT_CLASS_OTHER;
this.matrix=[[1,0,0],[0,1,0],[0,0,1]];this.board=b;this.isNumericMatrix=false;this.setMatrix(b,a,c)
};JXG.Transformation.prototype={};JXG.Transformation.prototype.update=function(){};
JXG.Transformation.prototype.setMatrix=function(c,b,d){var a;this.isNumericMatrix=true;
for(a=0;a<d.length;a++){if(typeof d[a]!="number"){this.isNumericMatrix=false;break
}}if(b=="translate"){this.evalParam=JXG.createEvalFunction(c,d,2);this.update=function(){this.matrix[1][0]=this.evalParam(0);
this.matrix[2][0]=this.evalParam(1)}}else{if(b=="scale"){this.evalParam=JXG.createEvalFunction(c,d,2);
this.update=function(){this.matrix[1][1]=this.evalParam(0);this.matrix[2][2]=this.evalParam(1)
}}else{if(b=="reflect"){if(d.length<4){d[0]=JXG.getReference(c,d[0])}if(d.length==2){d[1]=JXG.getReference(c,d[1])
}if(d.length==4){this.evalParam=JXG.createEvalFunction(c,d,4)}this.update=function(){var e,k,f,h,g;
if(d.length==1){e=d[0].point2.X()-d[0].point1.X();k=d[0].point2.Y()-d[0].point1.Y();
f=d[0].point1.X();h=d[0].point1.Y()}else{if(d.length==2){e=d[1].X()-d[0].X();k=d[1].Y()-d[0].Y();
f=d[0].X();h=d[0].Y()}else{if(d.length==4){e=this.evalParam(2)-this.evalParam(0);
k=this.evalParam(3)-this.evalParam(1);f=this.evalParam(0);h=this.evalParam(1)}}}g=e*e+k*k;
this.matrix[1][1]=(e*e-k*k)/g;this.matrix[1][2]=2*e*k/g;this.matrix[2][1]=2*e*k/g;
this.matrix[2][2]=(-e*e+k*k)/g;this.matrix[1][0]=f*(1-this.matrix[1][1])-h*this.matrix[1][2];
this.matrix[2][0]=h*(1-this.matrix[2][2])-f*this.matrix[2][1]}}else{if(b=="rotate"){if(d.length==3){this.evalParam=JXG.createEvalFunction(c,d,3)
}else{if(d.length<=2){this.evalParam=JXG.createEvalFunction(c,d,1);if(d.length==2){d[1]=JXG.getReference(c,d[1])
}}}this.update=function(){var f=this.evalParam(0),e,g;this.matrix[1][1]=Math.cos(f);
this.matrix[1][2]=-Math.sin(f);this.matrix[2][1]=Math.sin(f);this.matrix[2][2]=Math.cos(f);
if(d.length>1){if(d.length==3){e=this.evalParam(1);g=this.evalParam(2)}else{e=d[1].X();
g=d[1].Y()}this.matrix[1][0]=e*(1-Math.cos(f))+g*Math.sin(f);this.matrix[2][0]=g*(1-Math.cos(f))-e*Math.sin(f)
}}}else{if(b=="shear"){this.evalParam=JXG.createEvalFunction(c,d,1);this.update=function(){var e=this.evalParam(0);
this.matrix[1][1]=Math.tan(e)}}else{if(b=="generic"){this.evalParam=JXG.createEvalFunction(c,d,9);
this.update=function(){this.matrix[0][0]=this.evalParam(0);this.matrix[0][1]=this.evalParam(1);
this.matrix[0][2]=this.evalParam(2);this.matrix[1][0]=this.evalParam(3);this.matrix[1][1]=this.evalParam(4);
this.matrix[1][2]=this.evalParam(5);this.matrix[2][0]=this.evalParam(6);this.matrix[2][1]=this.evalParam(7);
this.matrix[2][2]=this.evalParam(8)}}}}}}}};JXG.Transformation.prototype.apply=function(a){this.update();
if(arguments[1]!=null){return JXG.Math.matVecMult(this.matrix,a.initialCoords.usrCoords)
}else{return JXG.Math.matVecMult(this.matrix,a.coords.usrCoords)}};JXG.Transformation.prototype.applyOnce=function(d){var e,a,b;
if(!JXG.isArray(d)){this.update();e=JXG.Math.matVecMult(this.matrix,d.coords.usrCoords);
d.coords.setCoordinates(JXG.COORDS_BY_USER,[e[1],e[2]])}else{a=d.length;for(b=0;b<a;
b++){this.update();e=JXG.Math.matVecMult(this.matrix,d[b].coords.usrCoords);d[b].coords.setCoordinates(JXG.COORDS_BY_USER,[e[1],e[2]])
}}};JXG.Transformation.prototype.bindTo=function(c){var b,a;if(JXG.isArray(c)){a=c.length;
for(b=0;b<a;b++){c[b].transformations.push(this)}}else{c.transformations.push(this)
}};JXG.Transformation.prototype.setProperty=function(a){};JXG.Transformation.prototype.melt=function(g){var f=[],e,a,d,b,h,c;
a=g.matrix.length;d=this.matrix[0].length;for(e=0;e<a;e++){f[e]=[]}this.update();
g.update();for(e=0;e<a;e++){for(c=0;c<d;c++){h=0;for(b=0;b<a;b++){h+=g.matrix[e][b]*this.matrix[b][c]
}f[e][c]=h}}this.update=function(){var k=this.matrix.length,l=this.matrix[0].length;
for(e=0;e<k;e++){for(c=0;c<l;c++){this.matrix[e][c]=f[e][c]}}};return true};JXG.createTransform=function(a,c,b){return new JXG.Transformation(a,b.type,c)
};JXG.JSXGraph.registerElement("transform",JXG.createTransform);JXG.Turtle=function(e,d,b){var a,f,c;
this.type=JXG.OBJECT_TYPE_TURTLE;this.turtleIsHidden=false;this.board=e;this.attributes=JXG.checkAttributes(b,{withLabel:false,layer:null});
this.attributes.straightFirst=false;this.attributes.straightLast=false;a=0;f=0;c=90;
if(d.length!=0){if(d.length==3){a=d[0];f=d[1];c=d[2]}else{if(d.length==2){if(JXG.isArray(d[0])){a=d[0][0];
f=d[0][1];c=d[1]}else{a=d[0];f=d[1]}}else{a=d[0][0];f=d[0][1]}}}this.init(a,f,c);
return this};JXG.Turtle.prototype=new JXG.GeometryElement;JXG.Turtle.prototype.init=function(a,d,c){this.arrowLen=20/Math.sqrt(this.board.unitX*this.board.unitX+this.board.unitY*this.board.unitY);
this.pos=[a,d];this.isPenDown=true;this.dir=90;this.stack=[];this.objects=[];this.attributes.curveType="plot";
this.curve=this.board.create("curve",[[this.pos[0]],[this.pos[1]]],this.attributes);
this.objects.push(this.curve);this.turtle=this.board.create("point",this.pos,{fixed:true,name:" ",visible:false,withLabel:false});
this.objects.push(this.turtle);this.turtle2=this.board.create("point",[this.pos[0],this.pos[1]+this.arrowLen],{fixed:true,name:" ",visible:false,withLabel:false});
this.objects.push(this.turtle2);var b=this.attributes.strokeWidth||this.attributes.strokewidth||2;
this.arrow=this.board.create("line",[this.turtle,this.turtle2],{lastArrow:true,strokeColor:"#ff0000",straightFirst:false,straightLast:false,strokeWidth:b,withLabel:false});
this.objects.push(this.arrow);this.right(90-c);this.board.update()};JXG.Turtle.prototype.forward=function(a){if(a==0){return
}var c=a*Math.cos(this.dir*Math.PI/180);var b=a*Math.sin(this.dir*Math.PI/180);if(!this.turtleIsHidden){var d=this.board.create("transform",[c,b],{type:"translate"});
d.applyOnce(this.turtle);d.applyOnce(this.turtle2)}if(this.isPenDown){if(this.curve.dataX.length>=8192){this.curve=this.board.create("curve",[[this.pos[0]],[this.pos[1]]],this.attributes);
this.objects.push(this.curve)}}this.pos[0]+=c;this.pos[1]+=b;if(this.isPenDown){this.curve.dataX.push(this.pos[0]);
this.curve.dataY.push(this.pos[1])}this.board.update();return this};JXG.Turtle.prototype.back=function(a){return this.forward(-a)
};JXG.Turtle.prototype.right=function(b){this.dir-=b;this.dir%=360;if(!this.turtleIsHidden){var a=this.board.create("transform",[-b*Math.PI/180,this.turtle],{type:"rotate"});
a.applyOnce(this.turtle2)}this.board.update();return this};JXG.Turtle.prototype.left=function(a){return this.right(-a)
};JXG.Turtle.prototype.penUp=function(){this.isPenDown=false;return this};JXG.Turtle.prototype.penDown=function(){this.isPenDown=true;
this.curve=this.board.create("curve",[[this.pos[0]],[this.pos[1]]],this.attributes);
this.objects.push(this.curve);return this};JXG.Turtle.prototype.clean=function(){for(var a=0;
a<this.objects.length;a++){var b=this.objects[a];if(b.type==JXG.OBJECT_TYPE_CURVE){this.board.removeObject(b.id);
this.objects.splice(a,1)}}this.curve=this.board.create("curve",[[this.pos[0]],[this.pos[1]]],this.attributes);
this.objects.push(this.curve);this.board.update();return this};JXG.Turtle.prototype.clearScreen=function(){for(var a=0;
a<this.objects.length;a++){var b=this.objects[a];this.board.removeObject(b.id)}this.init(0,0,90);
return this};JXG.Turtle.prototype.setPos=function(a,c){if(JXG.isArray(a)){this.pos=a
}else{this.pos=[a,c]}if(!this.turtleIsHidden){this.turtle.setPositionDirectly(JXG.COORDS_BY_USER,a,c);
this.turtle2.setPositionDirectly(JXG.COORDS_BY_USER,a,c+this.arrowLen);var b=this.board.create("transform",[-(this.dir-90)*Math.PI/180,this.turtle],{type:"rotate"});
b.applyOnce(this.turtle2)}this.curve=this.board.create("curve",[[this.pos[0]],[this.pos[1]]],this.attributes);
this.objects.push(this.curve);this.board.update();return this};JXG.Turtle.prototype.setPenSize=function(a){this.attributes.strokeWidth=a;
this.curve=this.board.create("curve",[[this.pos[0]],[this.pos[1]]],this.attributes);
this.objects.push(this.curve);return this};JXG.Turtle.prototype.setPenColor=function(a){this.attributes.strokeColor=a;
this.curve=this.board.create("curve",[[this.pos[0]],[this.pos[1]]],this.attributes);
this.objects.push(this.curve);return this};JXG.Turtle.prototype.setHighlightPenColor=function(a){this.attributes.highlightStrokeColor=a;
this.curve=this.board.create("curve",[[this.pos[0]],[this.pos[1]]],this.attributes);
this.objects.push(this.curve);return this};JXG.Turtle.prototype.setProperty=function(){var e;
var a;var c,d;var b;for(c=0;c<arguments.length;c++){a=arguments[c];if(typeof a=="string"){e=a.split(":")
}else{if(!JXG.isArray(a)){for(var b in a){this.setProperty([b,a[b]])}return this}else{e=a
}}this.attributes[e[0]]=e[1]}for(c=0;c<this.objects.length;c++){d=this.objects[c];
if(d.type==JXG.OBJECT_TYPE_CURVE){d.setProperty(this.attributes)}}return this};JXG.Turtle.prototype.showTurtle=function(){this.turtleIsHidden=false;
this.arrow.setProperty("visible:true");this.setPos(this.pos[0],this.pos[1]);this.board.update();
return this};JXG.Turtle.prototype.hideTurtle=function(){this.turtleIsHidden=true;
this.arrow.setProperty("visible:false");this.setPos(this.pos[0],this.pos[1]);this.board.update();
return this};JXG.Turtle.prototype.home=function(){this.pos=[0,0];this.setPos(this.pos[0],this.pos[1]);
return this};JXG.Turtle.prototype.pushTurtle=function(){this.stack.push([this.pos[0],this.pos[1],this.dir]);
return this};JXG.Turtle.prototype.popTurtle=function(){var a=this.stack.pop();this.pos[0]=a[0];
this.pos[1]=a[1];this.dir=a[2];this.setPos(this.pos[0],this.pos[1]);return this};
JXG.Turtle.prototype.lookTo=function(e){if(JXG.isArray(e)){var b=this.pos[0];var a=this.pos[1];
var g=e[0];var d=e[1];var c;var f=(g-b>0)?1:-1;if(Math.abs(g-b)>1e-7){c=Math.atan2(d-a,g-b)+((f<0)?Math.PI:0)
}else{c=((d-a>0)?0.5:-0.5)*Math.PI}this.right(this.dir-(c*180/Math.PI))}else{if(JXG.isNumber(e)){this.right(this.dir-(e))
}}return this};JXG.Turtle.prototype.moveTo=function(d){if(JXG.isArray(d)){var b=d[0]-this.pos[0];
var a=d[1]-this.pos[1];if(!this.turtleIsHidden){var c=this.board.create("transform",[b,a],{type:"translate"});
c.applyOnce(this.turtle);c.applyOnce(this.turtle2)}if(this.isPenDown){if(this.curve.dataX.length>=8192){this.curve=this.board.create("curve",[[this.pos[0]],[this.pos[1]]],this.attributes);
this.objects.push(this.curve)}}this.pos[0]=d[0];this.pos[1]=d[1];if(this.isPenDown){this.curve.dataX.push(this.pos[0]);
this.curve.dataY.push(this.pos[1])}this.board.update()}return this};JXG.Turtle.prototype.fd=function(a){return this.forward(a)
};JXG.Turtle.prototype.bk=function(a){return this.back(a)};JXG.Turtle.prototype.lt=function(a){return this.left(a)
};JXG.Turtle.prototype.rt=function(a){return this.right(a)};JXG.Turtle.prototype.pu=function(){return this.penUp()
};JXG.Turtle.prototype.pd=function(){return this.penDown()};JXG.Turtle.prototype.ht=function(){return this.hideTurtle()
};JXG.Turtle.prototype.st=function(){return this.showTurtle()};JXG.Turtle.prototype.cs=function(){return this.clearScreen()
};JXG.Turtle.prototype.push=function(){return this.pushTurtle()};JXG.Turtle.prototype.pop=function(){return this.popTurtle()
};JXG.Turtle.prototype.X=function(a){return this.pos[0]};JXG.Turtle.prototype.Y=function(a){return this.pos[1]
};JXG.Turtle.prototype.hasPoint=function(a,d){var b,c;for(b=0;b<this.objects.length;
b++){c=this.objects[b];if(c.type==JXG.OBJECT_TYPE_CURVE){if(c.hasPoint(a,d)){return true
}}}return false};JXG.createTurtle=function(c,b,a){if(b==null){var b=[]}return new JXG.Turtle(c,b,a)
};JXG.JSXGraph.registerElement("turtle",JXG.createTurtle);JXG.rgbParser=function(){if(arguments.length==0){return
}if(arguments.length>=3){arguments[0]=[arguments[0],arguments[1],arguments[2]];arguments.length=1
}var l=arguments[0];if(JXG.isArray(l)){var c=false,f;for(f=0;f<3;f++){c|=/\./.test(arguments[0][f].toString())
}for(f=0;f<3;f++){c&=(arguments[0][f]>=0)&(arguments[0][f]<=1)}if(c){return[Math.ceil(arguments[0][0]*255),Math.ceil(arguments[0][1]*255),Math.ceil(arguments[0][2]*255)]
}else{arguments[0].length=3;return arguments[0]}}else{if(typeof arguments[0]=="string"){l=arguments[0]
}}var a,h,m;if(l.charAt(0)=="#"){l=l.substr(1,6)}l=l.replace(/ /g,"");l=l.toLowerCase();
var e={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};
for(var n in e){if(l==n){l=e[n]}}var k=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(b){return[parseInt(b[1]),parseInt(b[2]),parseInt(b[3])]
}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(b){return[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]
}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(b){return[parseInt(b[1]+b[1],16),parseInt(b[2]+b[2],16),parseInt(b[3]+b[3],16)]
}}];for(var f=0;f<k.length;f++){var s=k[f].re;var d=k[f].process;var q=s.exec(l);
if(q){channels=d(q);a=channels[0];h=channels[1];m=channels[2]}}a=(a<0||isNaN(a))?0:((a>255)?255:a);
h=(h<0||isNaN(h))?0:((h>255)?255:h);m=(m<0||isNaN(m))?0:((m>255)?255:m);return[a,h,m]
};JXG.rgb2css=function(){var d,c,a;d=JXG.rgbParser.apply(JXG.rgbParser,arguments);
c=d[1];a=d[2];d=d[0];return"rgb("+d+", "+c+", "+a+")"};JXG.rgb2hex=function(){var d,c,a;
d=JXG.rgbParser.apply(JXG.rgbParser,arguments);c=d[1];a=d[2];d=d[0];d=d.toString(16);
c=c.toString(16);a=a.toString(16);if(d.length==1){d="0"+d}if(c.length==1){c="0"+c
}if(a.length==1){a="0"+a}return"#"+d+c+a};JXG.hsv2rgb=function(m,g,e){var h,n,c,l,k,d,b,a,r;
m=((m%360)+360)%360;if(g==0){if(isNaN(m)||m<JXG.Math.eps){h=e;n=e;c=e}else{return"#ffffff"
}}else{if(m>=360){d=0}else{d=m}d=d/60;k=Math.floor(d);l=d-k;b=e*(1-g);a=e*(1-(g*l));
r=e*(1-(g*(1-l)));switch(k){case 0:h=e;n=r;c=b;break;case 1:h=a;n=e;c=b;break;case 2:h=b;
n=e;c=r;break;case 3:h=b;n=a;c=e;break;case 4:h=r;n=b;c=e;break;case 5:h=e;n=b;c=a;
break}}h=Math.round(h*255).toString(16);h=(h.length==2)?h:((h.length==1)?"0"+h:"00");
n=Math.round(n*255).toString(16);n=(n.length==2)?n:((n.length==1)?"0"+n:"00");c=Math.round(c*255).toString(16);
c=(c.length==2)?c:((c.length==1)?"0"+c:"00");return["#",h,n,c].join("")};JXG.rgb2hsv=function(){var a,m,u,n,c,e,d,w,l,y,x,q,f,k;
a=JXG.rgbParser.apply(JXG.rgbParser,arguments);m=a[1];u=a[2];a=a[0];k=JXG.Math.Statistics;
n=a/255;c=m/255;e=u/255;q=k.max([a,m,u]);f=k.min([a,m,u]);d=q/255;w=f/255;x=d;y=0;
if(x>0){y=(x-w)/(x*1)}l=1/(d-w);if(y>0){if(q==a){l=(c-e)*l}else{if(q==m){l=2+(e-n)*l
}else{l=4+(n-c)*l}}}l*=60;if(l<0){l+=360}if(q==f){l=0}return[l,y,x]};JXG.rgb2LMS=function(){var k,h,c,d,a,f,e;
matrix=[[0.05059983,0.08585369,0.0095242],[0.01893033,0.08925308,0.01370054],[0.00292202,0.00975732,0.07145979]];
k=JXG.rgbParser.apply(JXG.rgbParser,arguments);h=k[1];c=k[2];k=k[0];k=Math.pow(k,0.476190476);
h=Math.pow(h,0.476190476);c=Math.pow(c,0.476190476);d=k*matrix[0][0]+h*matrix[0][1]+c*matrix[0][2];
a=k*matrix[1][0]+h*matrix[1][1]+c*matrix[1][2];f=k*matrix[2][0]+h*matrix[2][1]+c*matrix[2][2];
e=[d,a,f];e.l=d;e.m=a;e.s=f;return e};JXG.LMS2rgb=function(d,c,f){var k,h,a,e;matrix=[[30.830854,-29.832659,1.610474],[-6.481468,17.715578,-2.532642],[-0.37569,-1.199062,14.273846]];
k=d*matrix[0][0]+c*matrix[0][1]+f*matrix[0][2];h=d*matrix[1][0]+c*matrix[1][1]+f*matrix[1][2];
a=d*matrix[2][0]+c*matrix[2][1]+f*matrix[2][2];lut_lookup=function(g){var l=127,b=64;
while(b>0){if(Math.pow(l,0.476190476)>g){l-=b}else{if(Math.pow(l+1,0.476190476)>g){return l
}l+=b}b/=2}if(l==254&&13.994955247<g){return 255}return l};k=lut_lookup(k);h=lut_lookup(h);
a=lut_lookup(a);e=[k,h,a];e.r=k;e.g=h;e.b=a;return e};JXG.Board.prototype.angle=function(a,c,b){return this.algebra.angle(a,c,b)
};JXG.Board.prototype.rad=function(a,c,b){return this.algebra.rad(a,c,b)};JXG.Board.prototype.distance=function(b,a){return this.algebra.distance(b,a)
};JXG.Board.prototype.pow=function(d,c){return this.algebra.pow(d,c)};JXG.Board.prototype.round=function(a,b){return(a).toFixed(b)
};JXG.Board.prototype.cosh=function(a){return JXG.Math.cosh(a)};JXG.Board.prototype.sinh=function(a){return JXG.Math.sinh(a)
};JXG.Board.prototype.sgn=function(a){return(a==0?0:a/(Math.abs(a)))};JXG.Board.prototype.D=function(a,b){return JXG.Math.Numerics.D(a,b)
};JXG.Board.prototype.I=function(a,b){return JXG.Math.Numerics.I(a,b)};JXG.Board.prototype.root=function(b,a,c){return JXG.Math.Numerics.root(b,a,c)
};JXG.Board.prototype.lagrangePolynomial=function(a){return JXG.Math.Numerics.lagrangePolynomial(a)
};JXG.Board.prototype.neville=function(a){return JXG.Math.Numerics.neville(a)};JXG.Board.prototype.riemannsum=function(c,e,b,d,a){return JXG.Math.Numerics.riemannsum(c,e,b,d,a)
};JXG.Board.prototype.abs=Math.abs;JXG.Board.prototype.acos=Math.acos;JXG.Board.prototype.asin=Math.asin;
JXG.Board.prototype.atan=Math.atan;JXG.Board.prototype.ceil=Math.ceil;JXG.Board.prototype.cos=Math.cos;
JXG.Board.prototype.exp=Math.exp;JXG.Board.prototype.floor=Math.floor;JXG.Board.prototype.log=Math.log;
JXG.Board.prototype.max=Math.max;JXG.Board.prototype.min=Math.min;JXG.Board.prototype.random=Math.random;
JXG.Board.prototype.sin=Math.sin;JXG.Board.prototype.sqrt=Math.sqrt;JXG.Board.prototype.tan=Math.tan;
JXG.Board.prototype.trunc=Math.ceil;JXG.Board.prototype.factorial=function(a){return JXG.Math.factorial(a)
};JXG.Board.prototype.binomial=function(b,a){return JXG.Math.binomial(b,a)};JXG.Point.prototype.setPositionX=function(c,a){var b=(c==JXG.COORDS_BY_USER)?this.coords.usrCoords[2]:this.coords.scrCoords[2];
this.setPosition(c,a,b)};JXG.Point.prototype.setPositionY=function(c,b){var a=(c==JXG.COORDS_BY_USER)?this.coords.usrCoords[1]:this.coords.scrCoords[1];
this.setPosition(c,a,b)};JXG.Board.prototype.getElement=function(a){return JXG.getReference(this,a)
};JXG.Board.prototype.intersectionOptions=["point",[[JXG.OBJECT_CLASS_LINE,JXG.OBJECT_CLASS_LINE],[JXG.OBJECT_CLASS_LINE,JXG.OBJECT_CLASS_CIRCLE],[JXG.OBJECT_CLASS_CIRCLE,JXG.OBJECT_CLASS_CIRCLE]]];
JXG.Board.prototype.intersection=function(d,b,c,a){d=JXG.getReference(this,d);b=JXG.getReference(this,b);
if(d.elementClass==JXG.OBJECT_CLASS_CURVE||b.elementClass==JXG.OBJECT_CLASS_CURVE){return function(){return d.board.algebra.meetCurveCurve(d,b,c,a)
}}else{return function(){return d.board.algebra.meet(d.stdform,b.stdform,c)}}};JXG.Board.prototype.intersectionFunc=function(d,b,c,a){return this.intersection(d,b,c,a)
};JXG.Board.prototype.otherIntersection=function(b,a,c){b=JXG.getReference(this,b);
a=JXG.getReference(this,a);return function(){var d=b.board.algebra.meet(b.stdform,a.stdform,0);
if(Math.abs(c.X()-d.usrCoords[1])>JXG.Math.eps||Math.abs(c.Y()-d.usrCoords[2])>JXG.Math.eps||Math.abs(c.Z()-d.usrCoords[0])>JXG.Math.eps){return d
}else{return b.board.algebra.meet(b.stdform,a.stdform,1)}}};JXG.Board.prototype.pointFunc=function(){return[null]
};JXG.Board.prototype.pointOptions=["point",[[JXG.OBJECT_CLASS_POINT]]];JXG.Board.prototype.lineFunc=function(){return arguments
};JXG.Board.prototype.lineOptions=["line",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT]]];
JXG.Board.prototype.linesegmentFunc=function(){return arguments};JXG.Board.prototype.linesegmentOptions=["line",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT]]];
JXG.Board.prototype.linesegmentAtts={straightFirst:false,straightLast:false};JXG.Board.prototype.arrowFunc=function(){return arguments
};JXG.Board.prototype.arrowOptions=["arrow",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT]]];
JXG.Board.prototype.circleFunc=function(){return arguments};JXG.Board.prototype.circleOptions=["circle",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT],[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_LINE],[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_CIRCLE]]];
JXG.Board.prototype.arrowparallelOptions=["arrowparallel",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_LINE]]];
JXG.Board.prototype.arrowparallelFunc=function(){return arguments};JXG.Board.prototype.bisectorOptions=["bisector",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT]]];
JXG.Board.prototype.bisectorFunc=function(){return arguments};JXG.Board.prototype.circumcircleOptions=["circumcircle",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT]]];
JXG.Board.prototype.circumcircleFunc=function(){return arguments};JXG.Board.prototype.circumcirclemidpointOptions=["circumcirclemidpoint",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT]]];
JXG.Board.prototype.circumcirclemidpointFunc=function(){return arguments};JXG.Board.prototype.integralOptions=["integral",[[]]];
JXG.Board.prototype.integralFunc=function(){return arguments};JXG.Board.prototype.midpointOptions=["midpoint",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT],[JXG.OBJECT_CLASS_LINE]]];
JXG.Board.prototype.midpointFunc=function(){return arguments};JXG.Board.prototype.mirrorpointOptions=["mirrorpoint",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT]]];
JXG.Board.prototype.mirrorpointFunc=function(){return arguments};JXG.Board.prototype.normalOptions=["normal",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_LINE]]];
JXG.Board.prototype.normalFunc=function(){return arguments};JXG.Board.prototype.parallelOptions=["parallel",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_LINE]]];
JXG.Board.prototype.parallelFunc=function(){return arguments};JXG.Board.prototype.parallelpointOptions=["parallelpoint",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_POINT]]];
JXG.Board.prototype.parallelpointFunc=function(){return arguments};JXG.Board.prototype.perpendicularOptions=["perpendicular",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_LINE]]];
JXG.Board.prototype.perpendicularFunc=function(){return arguments};JXG.Board.prototype.perpendicularpointOptions=["perpendicularpoint",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_LINE]]];
JXG.Board.prototype.perpendicularpointFunc=function(){return arguments};JXG.Board.prototype.reflectionOptions=["reflection",[[JXG.OBJECT_CLASS_POINT,JXG.OBJECT_CLASS_LINE]]];
JXG.Board.prototype.reflectionFunc=function(){return arguments};JXG.Board.prototype.pstricks={};
JXG.Board.prototype.pstricks.givePsTricksToDiv=function(a,b){JXG.PsTricks.givePsTricksToDiv(a,b)
};JXG.Ticks=function(a,f,e,g,b,h,c,d){this.constructor();this.type=JXG.OBJECT_TYPE_TICKS;
this.elementClass=JXG.OBJECT_CLASS_OTHER;this.line=a;this.board=this.line.board;this.ticksFunction=null;
this.fixedTicks=null;this.equidistant=false;if(JXG.isFunction(f)){this.ticksFunction=f
}else{if(JXG.isArray(f)){this.fixedTicks=f}else{if(Math.abs(f)<JXG.Math.eps){f=this.board.options.line.ticks.defaultDistance
}this.ticksFunction=function(k){return f};this.equidistant=true}}this.minorTicks=((e==null)?this.board.options.line.ticks.minorTicks:e);
if(this.minorTicks<0){this.minorTicks=-this.minorTicks}this.majorHeight=((g==null)||(g==0)?this.board.options.line.ticks.majorHeight:g);
if(this.majorHeight<0){this.majorHeight=-this.majorHeight}this.minorHeight=((b==null)||(b==0)?this.board.options.line.ticks.minorHeight:b);
if(this.minorHeight<0){this.minorHeight=-this.minorHeight}this.minTicksDistance=this.board.options.line.ticks.minTicksDistance;
this.maxTicksDistance=this.board.options.line.ticks.maxTicksDistance;this.insertTicks=this.board.options.line.ticks.insertTicks;
this.drawZero=this.board.options.line.ticks.drawZero;this.drawLabels=this.board.options.line.ticks.drawLabels;
this.labels=[];this.init(this.board,h,c);this.visProp.visible=true;this.visProp.fillColor=this.line.visProp.fillColor;
this.visProp.highlightFillColor=this.line.visProp.highlightFillColor;this.visProp.strokeColor=this.line.visProp.strokeColor;
this.visProp.highlightStrokeColor=this.line.visProp.highlightStrokeColor;this.visProp.strokeWidth=this.line.visProp.strokeWidth;
this.id=this.line.addTicks(this)};JXG.Ticks.prototype=new JXG.GeometryElement;JXG.Ticks.prototype.hasPoint=function(a,b){return false
};JXG.Ticks.prototype.makeTicks=function(f,c,I,F){var A=f.usrCoords[1]-c.usrCoords[1];
var v=f.usrCoords[2]-c.usrCoords[2];var H=0;var g=Math.sqrt(A*A+v*v);if(g<=JXG.Math.eps){return
}var u=f.usrCoords[1];var s=f.usrCoords[2];var G=I/Math.abs(I);H=Math.abs(this.ticksFunction(G));
var K=(H*A)/(g);var J=(H*v)/(g);var D=0;if(this.equidistant){var b=K;var B=J;var a=H;
var w=new JXG.Coords(JXG.COORDS_BY_USER,[0,0],this.board);var E=new JXG.Coords(JXG.COORDS_BY_USER,[K,J],this.board);
D=(E.scrCoords[1]-w.scrCoords[1])*(E.scrCoords[1]-w.scrCoords[1])+(E.scrCoords[2]-w.scrCoords[2])*(E.scrCoords[2]-w.scrCoords[2]);
H=Math.pow(10,Math.floor(Math.log(H)/Math.LN10));K=(H*A)/(g);J=(H*v)/(g);while(D>8*this.minTicksDistance*this.minTicksDistance){H/=10;
K=(H*A)/(g);J=(H*v)/(g);E=new JXG.Coords(JXG.COORDS_BY_USER,[K,J],this.board);D=(E.scrCoords[1]-w.scrCoords[1])*(E.scrCoords[1]-w.scrCoords[1])+(E.scrCoords[2]-w.scrCoords[2])*(E.scrCoords[2]-w.scrCoords[2])
}var C=5;while(D<this.minTicksDistance*this.minTicksDistance){H*=C;if(C==5){C=2}else{C=5
}K=(H*A)/(g);J=(H*v)/(g);E=new JXG.Coords(JXG.COORDS_BY_USER,[K,J],this.board);D=(E.scrCoords[1]-w.scrCoords[1])*(E.scrCoords[1]-w.scrCoords[1])+(E.scrCoords[2]-w.scrCoords[2])*(E.scrCoords[2]-w.scrCoords[2])
}}var L=I*H;var q=new JXG.Coords(JXG.COORDS_BY_USER,[u,s],this.board);var e=null;
var d=null;var m="";var n=null;var l=true;var k=u;var h=s;while(l||(this.board.sgn(K)*(u-F*K)>=this.board.sgn(K)*c.usrCoords[1]&&this.board.sgn(J)*(s-F*J)>=this.board.sgn(J)*c.usrCoords[2])){l=false;
u=u-K;s=s-J;e=new JXG.Coords(JXG.COORDS_BY_USER,[u,s],this.board);if(!this.equidistant){D=(q.scrCoords[1]-e.scrCoords[1])*(q.scrCoords[1]-e.scrCoords[1])+(q.scrCoords[2]-e.scrCoords[2])*(q.scrCoords[2]-e.scrCoords[2])
}if(this.insertTicks&&this.equidistant&&(D>this.maxTicksDistance*this.maxTicksDistance)){while(D>this.maxTicksDistance*this.maxTicksDistance){K*=0.5;
J*=0.5;H*=0.5;u+=K;s+=J;L=L-I*H;e=new JXG.Coords(JXG.COORDS_BY_USER,[u,s],this.board);
D=(q.scrCoords[1]-e.scrCoords[1])*(q.scrCoords[1]-e.scrCoords[1])+(q.scrCoords[2]-e.scrCoords[2])*(q.scrCoords[2]-e.scrCoords[2])
}}if(this.equidistant){for(var r=1;r<this.minorTicks+1;r++){d=new JXG.Coords(JXG.COORDS_BY_USER,[k-(K*r)/(this.minorTicks+1),h-(J*r)/(this.minorTicks+1)],this.board);
d.major=false;this.ticks.push(d);this.labels.push(null)}}if(this.equidistant||(D>this.minTicksDistance*this.minTicksDistance)){e.major=true;
this.ticks.push(e);m=L.toString();if(m.length>5){m=L.toPrecision(3).toString()}n=new JXG.Text(this.board,m,null,[e.usrCoords[1],e.usrCoords[2]],this.id+G+"Label",null,null,true,this.board.options.text.defaultType);
n.distanceX=0;n.distanceY=-10;n.setCoords(e.usrCoords[1]*1+n.distanceX/(this.board.stretchX),e.usrCoords[2]*1+n.distanceY/(this.board.stretchY));
if(this.drawLabels){n.visProp.visible=true}else{n.visProp.visible=false}this.labels.push(n);
k=u;h=s;q=e}G=G+I*1;if(!this.equidistant){H=Math.abs(this.ticksFunction(G))}L=L+I*H;
if(!this.equidistant){K=(H*A)/(g);J=(H*v)/(g)}}};JXG.Ticks.prototype.calculateTicksCoordinates=function(){var y=1;
var r=2;var s=y+r;var z=new JXG.Coords(JXG.COORDS_BY_USER,[this.line.point1.coords.usrCoords[1],this.line.point1.coords.usrCoords[2]],this.board);
var x=new JXG.Coords(JXG.COORDS_BY_USER,[this.line.point2.coords.usrCoords[1],this.line.point2.coords.usrCoords[2]],this.board);
this.board.renderer.calcStraight(this.line,z,x);var b=this.line.point1.coords;if(this.board.renderer.isSameDirection(b,z,x)){if(this.board.renderer.isSameDirection(b,this.line.point2.coords,z)){s=r;
if(b.distance(JXG.COORDS_BY_USER,z)>b.distance(JXG.COORDS_BY_USER,x)){x=z}}else{s=y;
if(b.distance(JXG.COORDS_BY_USER,z)<b.distance(JXG.COORDS_BY_USER,x)){z=x}}}else{if(this.board.renderer.isSameDirection(b,this.line.point2.coords,z)){var f=z;
z=x;x=f}}if(this.ticks!=null){for(var B=0;B<this.ticks.length;B++){if(this.labels[B]!=null){if(this.labels[B].visProp.visible){this.board.renderer.remove(this.labels[B].rendNode)
}}}}this.ticks=new Array();this.labels=new Array();var l=null;var h="";var e=null;
if(this.ticksFunction!=null){if(this.drawZero){e=new JXG.Coords(JXG.COORDS_BY_USER,[b.usrCoords[1],b.usrCoords[2]],this.board);
this.ticks.push(e);l=new JXG.Text(this.board,"0",null,[b.usrCoords[1],b.usrCoords[2]],this.id+"0Label",null,null,true,this.board.options.text.defaultType);
if(this.drawLabels){l.visProp.visible=true}else{l.visProp.visible=false}this.labels.push(l);
this.ticks[0].major=true}if(y==(s&y)){if(this.line.visProp.straightFirst){this.makeTicks(b,z,-1,0)
}}if(r==(s&r)){if(this.line.visProp.straightLast){this.makeTicks(b,x,+1,0)}else{this.makeTicks(b,this.line.point2.coords,+1,1)
}}}else{if(!this.line.visProp.straightFirst){z=b}var m=b.usrCoords[1]-z.usrCoords[1];
var k=b.usrCoords[2]-z.usrCoords[2];var G=Math.sqrt(m*m+k*k);if(!this.line.visProp.straightLast){x=this.line.point2.coords
}var g=b.usrCoords[1]-x.usrCoords[1];var n=b.usrCoords[2]-x.usrCoords[2];var c=Math.sqrt(g*g+n*n);
var E=0;var D=0;for(var C=0;C<this.fixedTicks.length;C++){if((-G<=this.fixedTicks[C])&&(this.fixedTicks[C]<=c)){if(this.fixedTicks[C]<0){E=Math.abs(m)*this.fixedTicks[C]/G;
D=Math.abs(k)*this.fixedTicks[C]/G}else{E=Math.abs(g)*this.fixedTicks[C]/c;D=Math.abs(n)*this.fixedTicks[C]/c
}e=new JXG.Coords(JXG.COORDS_BY_USER,[b.usrCoords[1]+E,b.usrCoords[2]+D],this.board);
this.ticks.push(e);this.ticks[this.ticks.length-1].major=true;h=this.fixedTicks[C].toString();
if(h.length>5){h=this.fixedTicks[C].toFixed(3).toString()}l=new JXG.Text(this.board,h,null,[b.usrCoords[1]+E,b.usrCoords[2]+D],this.id+C+"Label",null,null,true,this.board.options.text.defaultType);
l.distanceX=0;l.distanceY=-10;l.setCoords(e.usrCoords[1]*1+l.distanceX/(this.board.stretchX),e.usrCoords[2]*1+l.distanceY/(this.board.stretchY));
if(this.drawLabels){l.visProp.visible=true}else{l.visProp.visible=false}this.labels.push(l)
}}}var v=JXG.Math.eps;var q=-this.line.getSlope();var u=this.majorHeight/2;var d=this.minorHeight/2;
var F=0;var a=0;var w=0;var A=0;if(Math.abs(q)<v){F=0;a=u;w=0;A=d}else{if((Math.abs(q)>1/v)||(isNaN(q))){F=u;
a=0;w=d;A=0}else{F=-u/Math.sqrt(1/(q*q)+1);a=F/q;w=-d/Math.sqrt(1/(q*q)+1);A=w/q}}this.board.renderer.updateTicks(this,F,a,w,A)
};JXG.Ticks.prototype.updateRenderer=function(){if(this.needsUpdate){this.calculateTicksCoordinates();
this.needsUpdate=false}};JXG.createTicks=function(d,b,a){var c;a=JXG.checkAttributes(a,{layer:null});
if((b[0].elementClass==JXG.OBJECT_CLASS_LINE)&&(JXG.isFunction(b[1])||JXG.isArray(b[1])||JXG.isNumber(b[1]))){c=new JXG.Ticks(b[0],b[1],a.minorTicks,a.majHeight,a.minHeight,a.id,a.name,a.layer)
}else{throw new Error("JSXGraph: Can't create Ticks with parent types '"+(typeof b[0])+"' and '"+(typeof b[1])+"' and '"+(typeof b[2])+"'.")
}return c};JXG.JSXGraph.registerElement("ticks",JXG.createTicks);JXG.Util={};JXG.Util.Unzip=function(W){var q=[],I="",G=false,D,J=0,T=[],v,h=new Array(32768),ab=0,O=false,Y,K,aa=[0,128,64,192,32,160,96,224,16,144,80,208,48,176,112,240,8,136,72,200,40,168,104,232,24,152,88,216,56,184,120,248,4,132,68,196,36,164,100,228,20,148,84,212,52,180,116,244,12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254,1,129,65,193,33,161,97,225,17,145,81,209,49,177,113,241,9,137,73,201,41,169,105,233,25,153,89,217,57,185,121,249,5,133,69,197,37,165,101,229,21,149,85,213,53,181,117,245,13,141,77,205,45,173,109,237,29,157,93,221,61,189,125,253,3,131,67,195,35,163,99,227,19,147,83,211,51,179,115,243,11,139,75,203,43,171,107,235,27,155,91,219,59,187,123,251,7,135,71,199,39,167,103,231,23,151,87,215,55,183,119,247,15,143,79,207,47,175,111,239,31,159,95,223,63,191,127,255],ae=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],V=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],P=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],C=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],r=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=W,b=0,g=0,af=1,a=0,ad=256,f=[],l;
function d(){var ah=z.length;a+=8;if(b<ah){if(G){document.write(b+": "+z[b]+"<br>")
}return z[b++]}else{return -1}}function s(){af=1}function Z(){var ah;a++;ah=(af&1);
af>>=1;if(af==0){af=d();ah=(af&1);af=(af>>1)|128}return ah}function X(ah){var aj=0,ai=ah;
while(ai--){aj=(aj<<1)|Z()}if(ah){aj=aa[aj]>>(8-ah)}return aj}function c(){ab=0}function A(ah){K++;
h[ab++]=ah;q.push(String.fromCharCode(ah));if(ab==32768){ab=0}}function n(){this.b0=0;
this.b1=0;this.jump=null;this.jumppos=-1}var e=288;var y=new Array(e);var R=new Array(32);
var L=0;var ac=null;var u=null;var Q=new Array(64);var N=new Array(64);var B=0;var F=new Array(17);
F[0]=0;var S;var x;function k(){while(1){if(F[B]>=x){return -1}if(S[F[B]]==B){return F[B]++
}F[B]++}}function H(){var ai=ac[L];var ah;if(G){document.write("<br>len:"+B+" treepos:"+L)
}if(B==17){return -1}L++;B++;ah=k();if(G){document.write("<br>IsPat "+ah)}if(ah>=0){ai.b0=ah;
if(G){document.write("<br>b0 "+ai.b0)}}else{ai.b0=32768;if(G){document.write("<br>b0 "+ai.b0)
}if(H()){return -1}}ah=k();if(ah>=0){ai.b1=ah;if(G){document.write("<br>b1 "+ai.b1)
}ai.jump=null}else{ai.b1=32768;if(G){document.write("<br>b1 "+ai.b1)}ai.jump=ac[L];
ai.jumppos=L;if(H()){return -1}}B--;return 0}function m(al,aj,am,ai){var ak;if(G){document.write("currentTree "+al+" numval "+aj+" lengths "+am+" show "+ai)
}ac=al;L=0;S=am;x=aj;for(ak=0;ak<17;ak++){F[ak]=0}B=0;if(H()){if(G){alert("invalid huffman tree\n")
}return -1}if(G){document.write("<br>Tree: "+ac.length);for(var ah=0;ah<32;ah++){document.write("Places["+ah+"].b0="+ac[ah].b0+"<br>");
document.write("Places["+ah+"].b1="+ac[ah].b1+"<br>")}}return 0}function E(ak){var ai,aj,am=0,al=ak[am],ah;
while(1){ah=Z();if(G){document.write("b="+ah)}if(ah){if(!(al.b1&32768)){if(G){document.write("ret1")
}return al.b1}al=al.jump;ai=ak.length;for(aj=0;aj<ai;aj++){if(ak[aj]===al){am=aj;
break}}}else{if(!(al.b0&32768)){if(G){document.write("ret2")}return al.b0}am++;al=ak[am]
}}if(G){document.write("ret3")}return -1}function ag(){var al,ay,ai,aw,ax;do{al=Z();
ai=X(2);switch(ai){case 0:if(G){alert("Stored\n")}break;case 1:if(G){alert("Fixed Huffman codes\n")
}break;case 2:if(G){alert("Dynamic Huffman codes\n")}break;case 3:if(G){alert("Reserved block type!!\n")
}break;default:if(G){alert("Unexpected value %d!\n",ai)}break}if(ai==0){var au,ah;
s();au=d();au|=(d()<<8);ah=d();ah|=(d()<<8);if(((au^~ah)&65535)){document.write("BlockLen checksum mismatch\n")
}while(au--){ay=d();A(ay)}}else{if(ai==1){var av;while(1){av=(aa[X(7)]>>1);if(av>23){av=(av<<1)|Z();
if(av>199){av-=128;av=(av<<1)|Z()}else{av-=48;if(av>143){av=av+136}}}else{av+=256
}if(av<256){A(av)}else{if(av==256){break}else{var ax,aq;av-=256+1;ax=X(V[av])+ae[av];
av=aa[X(5)]>>3;if(C[av]>8){aq=X(8);aq|=(X(C[av]-8)<<8)}else{aq=X(C[av])}aq+=P[av];
for(av=0;av<ax;av++){var ay=h[(ab-aq)&32767];A(ay)}}}}}else{if(ai==2){var av,ar,aj,ao,ap;
var an=new Array(288+32);aj=257+X(5);ao=1+X(5);ap=4+X(4);for(av=0;av<19;av++){an[av]=0
}for(av=0;av<ap;av++){an[r[av]]=X(3)}ax=R.length;for(aw=0;aw<ax;aw++){R[aw]=new n()
}if(m(R,19,an,0)){c();return 1}if(G){document.write("<br>distanceTree");for(var az=0;
az<R.length;az++){document.write("<br>"+R[az].b0+" "+R[az].b1+" "+R[az].jump+" "+R[az].jumppos)
}}ar=aj+ao;aw=0;var ak=-1;if(G){document.write("<br>n="+ar+" bits: "+a+"<br>")}while(aw<ar){ak++;
av=E(R);if(G){document.write("<br>"+ak+" i:"+aw+" decode: "+av+"    bits "+a+"<br>")
}if(av<16){an[aw++]=av}else{if(av==16){var at;av=3+X(2);if(aw+av>ar){c();return 1
}at=aw?an[aw-1]:0;while(av--){an[aw++]=at}}else{if(av==17){av=3+X(3)}else{av=11+X(7)
}if(aw+av>ar){c();return 1}while(av--){an[aw++]=0}}}}ax=y.length;for(aw=0;aw<ax;aw++){y[aw]=new n()
}if(m(y,aj,an,0)){c();return 1}ax=y.length;for(aw=0;aw<ax;aw++){R[aw]=new n()}var am=new Array();
for(aw=aj;aw<an.length;aw++){am[aw-aj]=an[aw]}if(m(R,ao,am,0)){c();return 1}if(G){document.write("<br>literalTree")
}while(1){av=E(y);if(av>=256){var ax,aq;av-=256;if(av==0){break}av--;ax=X(V[av])+ae[av];
av=E(R);if(C[av]>8){aq=X(8);aq|=(X(C[av]-8)<<8)}else{aq=X(C[av])}aq+=P[av];while(ax--){var ay=h[(ab-aq)&32767];
A(ay)}}else{A(av)}}}}}}while(!al);c();s();return 0}JXG.Util.Unzip.prototype.unzipFile=function(ah){var ai;
this.unzip();for(ai=0;ai<T.length;ai++){if(T[ai][1]==ah){return T[ai][0]}}};JXG.Util.Unzip.prototype.unzip=function(){if(G){alert(z)
}w();return T};function w(){if(G){alert("NEXTFILE")}q=[];var al=[];O=false;al[0]=d();
al[1]=d();if(G){alert("type: "+al[0]+" "+al[1])}if(al[0]==parseInt("78",16)&&al[1]==parseInt("da",16)){if(G){alert("GEONExT-GZIP")
}ag();if(G){alert(q.join(""))}T[J]=new Array(2);T[J][0]=q.join("");T[J][1]="geonext.gxt";
J++}if(al[0]==parseInt("50",16)&&al[1]==parseInt("4b",16)){O=true;al[2]=d();al[3]=d();
if(al[2]==parseInt("3",16)&&al[3]==parseInt("4",16)){al[0]=d();al[1]=d();if(G){alert("ZIP-Version: "+al[1]+" "+al[0]/10+"."+al[0]%10)
}D=d();D|=(d()<<8);if(G){alert("gpflags: "+D)}var ah=d();ah|=(d()<<8);if(G){alert("method: "+ah)
}d();d();d();d();var am=d();am|=(d()<<8);am|=(d()<<16);am|=(d()<<24);var ak=d();ak|=(d()<<8);
ak|=(d()<<16);ak|=(d()<<24);var ap=d();ap|=(d()<<8);ap|=(d()<<16);ap|=(d()<<24);if(G){alert("local CRC: "+am+"\nlocal Size: "+ap+"\nlocal CompSize: "+ak)
}var ai=d();ai|=(d()<<8);var ao=d();ao|=(d()<<8);if(G){alert("filelen "+ai)}aj=0;
f=[];while(ai--){var an=d();if(an=="/"|an==":"){aj=0}else{if(aj<ad-1){f[aj++]=String.fromCharCode(an)
}}}if(G){alert("nameBuf: "+f)}if(!l){l=f}var aj=0;while(aj<ao){an=d();aj++}Y=4294967295;
K=0;if(ap=0&&fileOut.charAt(l.length-1)=="/"){if(G){alert("skipdir")}}if(ah==8){ag();
if(G){alert(q.join(""))}T[J]=new Array(2);T[J][0]=q.join("");T[J][1]=f.join("");J++
}U()}}}function U(){var am,aj=[],ak,ai,al,ah,an;if((D&8)){aj[0]=d();aj[1]=d();aj[2]=d();
aj[3]=d();if(aj[0]==parseInt("50",16)&&aj[1]==parseInt("4b",16)&&aj[2]==parseInt("07",16)&&aj[3]==parseInt("08",16)){am=d();
am|=(d()<<8);am|=(d()<<16);am|=(d()<<24)}else{am=aj[0]|(aj[1]<<8)|(aj[2]<<16)|(aj[3]<<24)
}ak=d();ak|=(d()<<8);ak|=(d()<<16);ak|=(d()<<24);ai=d();ai|=(d()<<8);ai|=(d()<<16);
ai|=(d()<<24);if(G){alert("CRC:")}}if(O){w()}aj[0]=d();if(aj[0]!=8){if(G){alert("Unknown compression method!")
}return 0}D=d();if(G){if((D&~(parseInt("1f",16)))){alert("Unknown flags set!")}}d();
d();d();d();d();al=d();if((D&4)){aj[0]=d();aj[2]=d();B=aj[0]+256*aj[1];if(G){alert("Extra field size: "+B)
}for(ah=0;ah<B;ah++){d()}}if((D&8)){ah=0;f=[];while(an=d()){if(an=="7"||an==":"){ah=0
}if(ah<ad-1){f[ah++]=an}}if(G){alert("original file name: "+f)}}if((D&16)){while(an=d()){}}if((D&2)){d();
d()}ag();am=d();am|=(d()<<8);am|=(d()<<16);am|=(d()<<24);ai=d();ai|=(d()<<8);ai|=(d()<<16);
ai|=(d()<<24);w()}};JXG.Util.Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a=[],l,h,f,k,g,e,d,b=0;
c=JXG.Util.Base64._utf8_encode(c);while(b<c.length){l=c.charCodeAt(b++);h=c.charCodeAt(b++);
f=c.charCodeAt(b++);k=l>>2;g=((l&3)<<4)|(h>>4);e=((h&15)<<2)|(f>>6);d=f&63;if(isNaN(h)){e=d=64
}else{if(isNaN(f)){d=64}}a.push([this._keyStr.charAt(k),this._keyStr.charAt(g),this._keyStr.charAt(e),this._keyStr.charAt(d)].join(""))
}return a.join("")},decode:function(d,c){var a=[],m,k,g,l,h,f,e,b=0;d=d.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(b<d.length){l=this._keyStr.indexOf(d.charAt(b++));h=this._keyStr.indexOf(d.charAt(b++));
f=this._keyStr.indexOf(d.charAt(b++));e=this._keyStr.indexOf(d.charAt(b++));m=(l<<2)|(h>>4);
k=((h&15)<<4)|(f>>2);g=((f&3)<<6)|e;a.push(String.fromCharCode(m));if(f!=64){a.push(String.fromCharCode(k))
}if(e!=64){a.push(String.fromCharCode(g))}}a=a.join("");if(c){a=JXG.Util.Base64._utf8_decode(a)
}return a},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");var a="";for(var e=0;
e<b.length;e++){var d=b.charCodeAt(e);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);
a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);
a+=String.fromCharCode((d&63)|128)}}}return a},_utf8_decode:function(a){var d=[],f=0,g=0,e=0,b=0;
while(f<a.length){g=a.charCodeAt(f);if(g<128){d.push(String.fromCharCode(g));f++}else{if((g>191)&&(g<224)){e=a.charCodeAt(f+1);
d.push(String.fromCharCode(((g&31)<<6)|(e&63)));f+=2}else{e=a.charCodeAt(f+1);b=a.charCodeAt(f+2);
d.push(String.fromCharCode(((g&15)<<12)|((e&63)<<6)|(b&63)));f+=3}}}return d.join("")
},_destrip:function(f,d){var b=[],e,c,a=[];if(d==null){d=76}f.replace(/ /g,"");e=f.length/d;
for(c=0;c<e;c++){b[c]=f.substr(c*d,d)}if(e!=f.length/d){b[b.length]=f.substr(e*d,f.length-(e*d))
}for(c=0;c<b.length;c++){a.push(b[c])}return a.join("\n")},decodeAsArray:function(b){var d=this.decode(b),a=[],c;
for(c=0;c<d.length;c++){a[c]=d.charCodeAt(c)}return a},decodeGEONExT:function(a){return decodeAsArray(destrip(a),false)
}};JXG.Util.asciiCharCodeAt=function(b,a){var d=b.charCodeAt(a);if(d>255){switch(d){case 8364:d=128;
break;case 8218:d=130;break;case 402:d=131;break;case 8222:d=132;break;case 8230:d=133;
break;case 8224:d=134;break;case 8225:d=135;break;case 710:d=136;break;case 8240:d=137;
break;case 352:d=138;break;case 8249:d=139;break;case 338:d=140;break;case 381:d=142;
break;case 8216:d=145;break;case 8217:d=146;break;case 8220:d=147;break;case 8221:d=148;
break;case 8226:d=149;break;case 8211:d=150;break;case 8212:d=151;break;case 732:d=152;
break;case 8482:d=153;break;case 353:d=154;break;case 8250:d=155;break;case 339:d=156;
break;case 382:d=158;break;case 376:d=159;break;default:break}}return d};JXG.Util.utf8Decode=function(a){var b=[];
var e=0;var g=0,f=0,d=0;while(e<a.length){g=a.charCodeAt(e);if(g<128){b.push(String.fromCharCode(g));
e++}else{if((g>191)&&(g<224)){d=a.charCodeAt(e+1);b.push(String.fromCharCode(((g&31)<<6)|(d&63)));
e+=2}else{d=a.charCodeAt(e+1);c3=a.charCodeAt(e+2);b.push(String.fromCharCode(((g&15)<<12)|((d&63)<<6)|(c3&63)));
e+=3}}}return b.join("")};JXG.PsTricks=new function(){this.psTricksString=""};JXG.PsTricks.convertBoardToPsTricks=function(b){var d=new JXG.Coords(JXG.COORDS_BY_SCREEN,[b.canvasWidth,b.canvasHeight],b);
var c=new JXG.Coords(JXG.COORDS_BY_SCREEN,[0,0],b);this.psTricksString="\\begin{pspicture*}("+c.usrCoords[1]+","+d.usrCoords[2]+")("+d.usrCoords[1]+","+c.usrCoords[2]+")\n";
for(var a in b.objects){var e=b.objects[a];if(e.type==JXG.OBJECT_TYPE_ARC){if(e.visProp.visible){this.addSector(e)
}}}for(var a in b.objects){var e=b.objects[a];if(e.type==JXG.OBJECT_TYPE_POLYGON){if(e.visProp.visible){this.addPolygon(e)
}}}for(var a in b.objects){var e=b.objects[a];if(e.type==JXG.OBJECT_TYPE_ANGLE){if(e.visProp.visible){this.addAngle(e)
}}}for(var a in b.objects){var e=b.objects[a];if(e.type==JXG.OBJECT_TYPE_CIRCLE){if(e.visProp.visible){this.addCircle(e)
}}}for(var a in b.objects){var e=b.objects[a];if(e.type==JXG.OBJECT_TYPE_ARC){if(e.visProp.visible){this.addArc(e)
}}}for(var a in b.objects){var e=b.objects[a];if(e.type==JXG.OBJECT_TYPE_LINE){if(e.visProp.visible){this.addLine(e)
}}}for(var a in b.objects){var e=b.objects[a];if(e.type==JXG.OBJECT_TYPE_POINT){if(e.visProp.visible){this.addPoint(e)
}}}this.psTricksString+="\\end{pspicture*}"};JXG.PsTricks.givePsTricksToDiv=function(a,b){this.convertBoardToPsTricks(b);
document.getElementById(a).innerHTML=this.psTricksString};JXG.PsTricks.addPoint=function(a){this.psTricksString+="\\psdot";
this.psTricksString+="[linecolor="+this.parseColor(a.visProp.strokeColor)+",";this.psTricksString+="dotstyle=";
if(a.visProp.face=="cross"){this.psTricksString+="x, dotsize=";if(a.visProp.size==2){this.psTricksString+="2pt 2"
}else{if(a.visProp.size==3){this.psTricksString+="5pt 2"}else{if(a.visProp.size>=4){this.psTricksString+="5pt 3"
}}}}else{if(a.visProp.face=="circle"){this.psTricksString+="*, dotsize=";if(a.visProp.size==1){this.psTricksString+="2pt 2"
}else{if(a.visProp.size==2){this.psTricksString+="4pt 2"}else{if(a.visProp.size==3){this.psTricksString+="6pt 2"
}else{if(a.visProp.size>=4){this.psTricksString+="6pt 3"}}}}}else{if(a.visProp.face=="square"){this.psTricksString+="square*, dotsize=";
if(a.visProp.size==2){this.psTricksString+="2pt 2"}else{if(a.visProp.size==3){this.psTricksString+="5pt 2"
}else{if(a.visProp.size>=4){this.psTricksString+="5pt 3"}}}}else{if(a.visProp.face=="plus"){this.psTricksString+="+, dotsize=";
if(a.visProp.size==2){this.psTricksString+="2pt 2"}else{if(a.visProp.size==3){this.psTricksString+="5pt 2"
}else{if(a.visProp.size>=4){this.psTricksString+="5pt 3"}}}}}}}this.psTricksString+="]";
this.psTricksString+="("+a.coords.usrCoords[1]+","+a.coords.usrCoords[2]+")\n";this.psTricksString+="\\rput("+(a.coords.usrCoords[1]+15/a.board.stretchY)+","+(a.coords.usrCoords[2]+15/a.board.stretchY)+"){\\small $"+a.name+"$}\n"
};JXG.PsTricks.addLine=function(c){var b=new JXG.Coords(JXG.COORDS_BY_USER,c.point1.coords.usrCoords,c.board);
var a=new JXG.Coords(JXG.COORDS_BY_USER,c.point2.coords.usrCoords,c.board);if(c.visProp.straightFirst||c.visProp.straightLast){c.board.renderer.calcStraight(c,b,a)
}this.psTricksString+="\\psline";this.psTricksString+="[linecolor="+this.parseColor(c.visProp.strokeColor)+", linewidth="+c.visProp.strokeWidth+"px";
this.psTricksString+="]";if(c.visProp.firstArrow){if(c.visProp.lastArrow){this.psTricksString+="{<->}"
}else{this.psTricksString+="{<-}"}}else{if(c.visProp.lastArrow){this.psTricksString+="{->}"
}}this.psTricksString+="("+b.usrCoords[1]+","+b.usrCoords[2]+")("+a.usrCoords[1]+","+a.usrCoords[2]+")\n"
};JXG.PsTricks.addCircle=function(b){var a=b.Radius();this.psTricksString+="\\pscircle";
this.psTricksString+="[linecolor="+this.parseColor(b.visProp.strokeColor)+", linewidth="+b.visProp.strokeWidth+"px";
if(b.visProp.fillColor!="none"&&b.visProp.fillOpacity!=0){this.psTricksString+=", fillstyle=solid, fillcolor="+this.parseColor(b.visProp.fillColor)+", opacity="+JXG.Math.round(b.visProp.fillOpacity,5)
}this.psTricksString+="]";this.psTricksString+="("+b.midpoint.coords.usrCoords[1]+","+b.midpoint.coords.usrCoords[2]+"){"+a+"}\n"
};JXG.PsTricks.addPolygon=function(b){this.psTricksString+="\\pspolygon";this.psTricksString+="[linestyle=none, fillstyle=solid, fillcolor="+this.parseColor(b.visProp.fillColor)+", opacity="+JXG.Math.round(b.visProp.fillOpacity,5)+"]";
for(var a=0;a<b.vertices.length;a++){this.psTricksString+="("+b.vertices[a].coords.usrCoords[1]+","+b.vertices[a].coords.usrCoords[2]+")"
}this.psTricksString+="\n"};JXG.PsTricks.addArc=function(b){var a=b.Radius();var d={};
d.coords=new JXG.Coords(JXG.COORDS_BY_USER,[b.board.canvasWidth/(b.board.stretchY),b.midpoint.coords.usrCoords[2]],b.board);
var c=JXG.Math.round(b.board.algebra.trueAngle(d,b.midpoint,b.point2),4);var e=JXG.Math.round(b.board.algebra.trueAngle(d,b.midpoint,b.point3),4);
this.psTricksString+="\\psarc";this.psTricksString+="[linecolor="+this.parseColor(b.visProp.strokeColor)+", linewidth="+b.visProp.strokeWidth+"px";
this.psTricksString+="]";if(b.visProp.lastArrow){if(b.visProp.firstArrow){this.psTricksString+="{<->}"
}else{this.psTricksString+="{<-}"}}else{if(b.visProp.firstArrow){this.psTricksString+="{->}"
}}this.psTricksString+="("+b.midpoint.coords.usrCoords[1]+","+b.midpoint.coords.usrCoords[2]+"){"+a+"}{"+c+"}{"+e+"}\n"
};JXG.PsTricks.addSector=function(b){var a=b.Radius();var d={};d.coords=new JXG.Coords(JXG.COORDS_BY_USER,[b.board.canvasWidth/(b.board.stretchY),b.midpoint.coords.usrCoords[2]],b.board);
var c=JXG.Math.round(b.board.algebra.trueAngle(d,b.midpoint,b.point2),4);var e=JXG.Math.round(b.board.algebra.trueAngle(d,b.midpoint,b.point3),4);
if(b.visProp.fillColor!="none"&&b.visProp.fillOpacity!=0){this.psTricksString+="\\pswedge";
this.psTricksString+="[linestyle=none, fillstyle=solid, fillcolor="+this.parseColor(b.visProp.fillColor)+", opacity="+JXG.Math.round(b.visProp.fillOpacity,5)+"]";
this.psTricksString+="("+b.midpoint.coords.usrCoords[1]+","+b.midpoint.coords.usrCoords[2]+"){"+a+"}{"+c+"}{"+e+"}\n"
}};JXG.PsTricks.addAngle=function(b){var a=b.radius;var d={};d.coords=new JXG.Coords(JXG.COORDS_BY_USER,[b.board.canvasWidth/(b.board.stretchY),b.point2.coords.usrCoords[2]],b.board);
var c=JXG.Math.round(b.board.algebra.trueAngle(d,b.point2,b.point1),4);var e=JXG.Math.round(b.board.algebra.trueAngle(d,b.point2,b.point3),4);
if(b.visProp.fillColor!="none"&&b.visProp.fillOpacity!=0){this.psTricksString+="\\pswedge";
this.psTricksString+="[linestyle=none, fillstyle=solid, fillcolor="+this.parseColor(b.visProp.fillColor)+", opacity="+JXG.Math.round(b.visProp.fillOpacity,5)+"]";
this.psTricksString+="("+b.point2.coords.usrCoords[1]+","+b.point2.coords.usrCoords[2]+"){"+a+"}{"+c+"}{"+e+"}\n"
}this.psTricksString+="\\psarc";this.psTricksString+="[linecolor="+this.parseColor(b.visProp.strokeColor)+", linewidth="+b.visProp.strokeWidth+"px";
this.psTricksString+="]";this.psTricksString+="("+b.point2.coords.usrCoords[1]+","+b.point2.coords.usrCoords[2]+"){"+a+"}{"+c+"}{"+e+"}\n"
};JXG.PsTricks.parseColor=function(b){var a=JXG.rgbParser(b);return"{[rgb]{"+a[0]/255+","+a[1]/255+","+a[2]/255+"}}"
};JXG.Server=function(){};JXG.Server.modules=function(){};JXG.Server.runningCalls={};
JXG.Server.handleError=function(a){alert("error occured, server says: "+a.message)
};JXG.Server.callServer=function(action,callback,data,sync){var fileurl,passdata,AJAX,params,id,dataJSONStr,k;
if(typeof sync=="undefined"||sync==null){sync=false}params="";for(k in data){params+="&"+escape(k)+"="+escape(data[k])
}dataJSONStr=JXG.toJSON(data);do{id=action+Math.floor(Math.random()*4096)}while(typeof this.runningCalls[id]!="undefined");
this.runningCalls[id]={action:action};if(typeof data.module!="undefined"){this.runningCalls[id].module=data.module
}fileurl=JXG.serverBase+"JXGServer.py";passdata="action="+escape(action)+"&id="+id+"&dataJSON="+escape(JXG.Util.Base64.encode(dataJSONStr));
this.cbp=function(d){var str,data,tmp,inject,paramlist,id,i,j;str=(new JXG.Util.Unzip(JXG.Util.Base64.decodeAsArray(d))).unzip();
if(JXG.isArray(str)&&str.length>0){str=str[0][0]}if(typeof str!="string"){return}data=eval("("+str+")");
if(data.type=="error"){this.handleError(data)}else{if(data.type=="response"){id=data.id;
for(i=0;i<data.fields.length;i++){tmp=data.fields[i];inject=tmp.namespace+(typeof eval(tmp.namespace)=="object"?".":".prototype.")+tmp.name+" = "+tmp.value;
eval(inject)}for(i=0;i<data.handler.length;i++){tmp=data.handler[i];paramlist=[];
for(j=0;j<tmp.parameters.length;j++){paramlist[j]='"'+tmp.parameters[j]+'": '+tmp.parameters[j]
}inject="if(typeof JXG.Server.modules."+this.runningCalls[id].module+' == "undefined")JXG.Server.modules.'+this.runningCalls[id].module+" = {};";
inject+="JXG.Server.modules."+this.runningCalls[id].module+"."+tmp.name+"_cb = "+tmp.callback+";";
inject+="JXG.Server.modules."+this.runningCalls[id].module+"."+tmp.name+" = function ("+tmp.parameters.join(",")+', __JXGSERVER_CB__) {if(typeof __JXGSERVER_CB__ == "undefined") __JXGSERVER_CB__ = JXG.Server.modules.'+this.runningCalls[id].module+"."+tmp.name+"_cb;var __JXGSERVER_PAR__ = {"+paramlist.join(",")+', "module": "'+this.runningCalls[id].module+'", "handler": "'+tmp.name+'" };JXG.Server.callServer("exec", __JXGSERVER_CB__, __JXGSERVER_PAR__);};';
eval(inject)}delete this.runningCalls[id];callback(data.data)}}};this.cb=JXG.bind(this.cbp,this);
if(window.XMLHttpRequest){AJAX=new XMLHttpRequest();AJAX.overrideMimeType("text/plain; charset=iso-8859-1")
}else{AJAX=new ActiveXObject("Microsoft.XMLHTTP")}if(AJAX){AJAX.open("POST",fileurl,!sync);
AJAX.setRequestHeader("Content-type","application/x-www-form-urlencoded");if(!sync){AJAX.onreadystatechange=(function(cb){return function(){switch(AJAX.readyState){case 4:if(AJAX.status!=200){alert("Fehler:"+AJAX.status)
}else{cb(AJAX.responseText)}break;default:return false;break}}})(this.cb)}AJAX.send(passdata);
if(sync){this.cb(AJAX.responseText)}}else{return false}};JXG.Server.loadModule_cb=function(b){var a;
for(a=0;a<b.length;a++){alert(b[a].name+": "+b[a].value)}};JXG.Server.loadModule=function(a){return JXG.Server.callServer("load",JXG.Server.loadModule_cb,{module:a},true)
};JXG.DataSource=function(){this.data=[];this.columnHeaders=[];this.rowHeaders=[];
return this};JXG.DataSource.prototype.loadFromArray=function(e,f,d){var c,b,a;if(typeof f=="undefined"){f=false
}if(typeof d=="undefined"){d=false}if(JXG.isArray(f)){this.columnHeader=f;f=false
}if(JXG.isArray(d)){this.rowHeader=d;d=false}this.data=[];if(f){this.columnHeader=[]
}if(d){this.rowHeader=[]}if(typeof e!="undefined"){this.data=new Array(e.length);
for(c=0;c<e.length;c++){this.data[c]=new Array(e[c].length);for(b=0;b<e[c].length;
b++){a=e[c][b];if(""+parseFloat(a)==a){this.data[c][b]=parseFloat(a)}else{if(a!="-"){this.data[c][b]=a
}else{this.data[c][b]=NaN}}}}if(f){this.columnHeader=this.data[0].slice(1);this.data=this.data.slice(1)
}if(d){this.rowHeader=new Array();for(c=0;c<this.data.length;c++){this.rowHeader.push(this.data[c][0]);
this.data[c]=this.data[c].slice(1)}}}return this};JXG.DataSource.prototype.loadFromTable=function(h,c,f){var k,e,d,b,g,a;
if(typeof c=="undefined"){c=false}if(typeof f=="undefined"){f=false}if(JXG.isArray(c)){this.columnHeader=c;
c=false}if(JXG.isArray(f)){this.rowHeader=f;f=false}this.data=[];if(c){this.columnHeader=[]
}if(f){this.rowHeader=[]}h=document.getElementById(h);if(typeof h!="undefined"){k=h.getElementsByTagName("tr");
this.data=new Array(k.length);for(e=0;e<k.length;e++){b=k[e].getElementsByTagName("td");
this.data[e]=new Array(b.length);for(d=0;d<b.length;d++){g=b[d].innerHTML;if(""+parseFloat(g)==g){this.data[e][d]=parseFloat(g)
}else{if(g!="-"){this.data[e][d]=g}else{this.data[e][d]=NaN}}}}if(c){this.columnHeader=this.data[0].slice(1);
this.data=this.data.slice(1)}if(f){this.rowHeader=new Array();for(e=0;e<this.data.length;
e++){this.rowHeader.push(this.data[e][0]);this.data[e]=this.data[e].slice(1)}}}return this
};JXG.DataSource.prototype.addColumn=function(a,c,b){};JXG.DataSource.prototype.addRow=function(a,c,b){};
JXG.DataSource.prototype.getColumn=function(b){var a=new Array(this.data.length),c;
if(typeof b=="string"){for(c=0;c<this.columnHeader.length;c++){if(b==this.columnHeader[c]){b=c;
break}}}for(c=0;c<this.data.length;c++){if(this.data[c].length>b){a[c]=this.data[c][b]
}}return a};JXG.DataSource.prototype.getRow=function(c){var a,b;if(typeof c=="string"){for(b=0;
b<this.rowHeader.length;b++){if(c==this.rowHeader[b]){c=b;break}}}a=new Array(this.data[c].length);
for(b=0;b<this.data[c].length;b++){a[b]=this.data[c][b]}return a};JXG.SVGRenderer=function(a){var b;
this.constructor();this.svgRoot=null;this.suspendHandle=null;this.svgNamespace="http://www.w3.org/2000/svg";
this.xlinkNamespace="http://www.w3.org/1999/xlink";this.container=a;this.container.style.MozUserSelect="none";
this.container.style.overflow="hidden";if(this.container.style.position==""){this.container.style.position="relative"
}this.svgRoot=this.container.ownerDocument.createElementNS(this.svgNamespace,"svg");
this.container.appendChild(this.svgRoot);this.defs=this.container.ownerDocument.createElementNS(this.svgNamespace,"defs");
this.svgRoot.appendChild(this.defs);this.filter=this.container.ownerDocument.createElementNS(this.svgNamespace,"filter");
this.filter.setAttributeNS(null,"id","f1");this.filter.setAttributeNS(null,"width","300%");
this.filter.setAttributeNS(null,"height","300%");this.feOffset=this.container.ownerDocument.createElementNS(this.svgNamespace,"feOffset");
this.feOffset.setAttributeNS(null,"result","offOut");this.feOffset.setAttributeNS(null,"in","SourceAlpha");
this.feOffset.setAttributeNS(null,"dx","5");this.feOffset.setAttributeNS(null,"dy","5");
this.filter.appendChild(this.feOffset);this.feGaussianBlur=this.container.ownerDocument.createElementNS(this.svgNamespace,"feGaussianBlur");
this.feGaussianBlur.setAttributeNS(null,"result","blurOut");this.feGaussianBlur.setAttributeNS(null,"in","offOut");
this.feGaussianBlur.setAttributeNS(null,"stdDeviation","3");this.filter.appendChild(this.feGaussianBlur);
this.feBlend=this.container.ownerDocument.createElementNS(this.svgNamespace,"feBlend");
this.feBlend.setAttributeNS(null,"in","SourceGraphic");this.feBlend.setAttributeNS(null,"in2","blurOut");
this.feBlend.setAttributeNS(null,"mode","normal");this.filter.appendChild(this.feBlend);
this.defs.appendChild(this.filter);this.layer=[];for(b=0;b<JXG.Options.layer.numlayers;
b++){this.layer[b]=this.container.ownerDocument.createElementNS(this.svgNamespace,"g");
this.svgRoot.appendChild(this.layer[b])}this.dashArray=["2, 2","5, 5","10, 10","20, 20","20, 10, 10, 10","20, 5, 10, 5"]
};JXG.SVGRenderer.prototype=new JXG.AbstractRenderer;JXG.SVGRenderer.prototype.setShadow=function(a){if(a.visPropOld.shadow==a.visProp.shadow){return
}if(a.rendNode!=null){if(a.visProp.shadow){a.rendNode.setAttributeNS(null,"filter","url(#f1)")
}else{a.rendNode.removeAttributeNS(null,"filter")}}a.visPropOld.shadow=a.visProp.shadow
};JXG.SVGRenderer.prototype.setGradient=function(c){var m=c.rendNode,d,f;if(c.type==JXG.OBJECT_TYPE_ARC||c.type==JXG.OBJECT_TYPE_ANGLE){m=c.rendNode2
}if(typeof c.visProp.fillOpacity=="function"){f=c.visProp.fillOpacity()}else{f=c.visProp.fillOpacity
}f=(f>0)?f:0;if(typeof c.visProp.fillColor=="function"){d=c.visProp.fillColor()}else{d=c.visProp.fillColor
}if(c.visProp.gradient=="linear"){var e=this.createPrimitive("linearGradient",c.id+"_gradient");
var b="0%";var a="100%";var h="0%";var g="0%";e.setAttributeNS(null,"x1",b);e.setAttributeNS(null,"x2",a);
e.setAttributeNS(null,"y1",h);e.setAttributeNS(null,"y2",g);var l=this.createPrimitive("stop",c.id+"_gradient1");
l.setAttributeNS(null,"offset","0%");l.setAttributeNS(null,"style","stop-color:"+d+";stop-opacity:"+f);
var k=this.createPrimitive("stop",c.id+"_gradient2");k.setAttributeNS(null,"offset","100%");
k.setAttributeNS(null,"style","stop-color:"+c.visProp.gradientSecondColor+";stop-opacity:"+c.visProp.gradientSecondOpacity);
e.appendChild(l);e.appendChild(k);this.defs.appendChild(e);m.setAttributeNS(null,"style","fill:url(#"+c.id+"_gradient)");
c.gradNode1=l;c.gradNode2=k}else{if(c.visProp.gradient=="radial"){var e=this.createPrimitive("radialGradient",c.id+"_gradient");
e.setAttributeNS(null,"cx","50%");e.setAttributeNS(null,"cy","50%");e.setAttributeNS(null,"r","50%");
e.setAttributeNS(null,"fx",c.visProp.gradientPositionX*100+"%");e.setAttributeNS(null,"fy",c.visProp.gradientPositionY*100+"%");
var l=this.createPrimitive("stop",c.id+"_gradient1");l.setAttributeNS(null,"offset","0%");
l.setAttributeNS(null,"style","stop-color:"+c.visProp.gradientSecondColor+";stop-opacity:"+c.visProp.gradientSecondOpacity);
var k=this.createPrimitive("stop",c.id+"_gradient2");k.setAttributeNS(null,"offset","100%");
k.setAttributeNS(null,"style","stop-color:"+d+";stop-opacity:"+f);e.appendChild(l);
e.appendChild(k);this.defs.appendChild(e);m.setAttributeNS(null,"style","fill:url(#"+c.id+"_gradient)");
c.gradNode1=l;c.gradNode2=k}else{m.removeAttributeNS(null,"style")}}};JXG.SVGRenderer.prototype.updateGradient=function(d){var b=d.gradNode1,a=d.gradNode2,c,e;
if(b==null||a==0){return}if(typeof d.visProp.fillOpacity=="function"){e=d.visProp.fillOpacity()
}else{e=d.visProp.fillOpacity}e=(e>0)?e:0;if(typeof d.visProp.fillColor=="function"){c=d.visProp.fillColor()
}else{c=d.visProp.fillColor}if(d.visProp.gradient=="linear"){b.setAttributeNS(null,"style","stop-color:"+c+";stop-opacity:"+e);
a.setAttributeNS(null,"style","stop-color:"+d.visProp.gradientSecondColor+";stop-opacity:"+d.visProp.gradientSecondOpacity)
}else{if(d.visProp.gradient=="radial"){b.setAttributeNS(null,"style","stop-color:"+d.visProp.gradientSecondColor+";stop-opacity:"+d.visProp.gradientSecondOpacity);
a.setAttributeNS(null,"style","stop-color:"+c+";stop-opacity:"+e)}}};JXG.SVGRenderer.prototype.displayCopyright=function(c,d){var b=this.createPrimitive("text","licenseText"),a;
b.setAttributeNS(null,"x","20");b.setAttributeNS(null,"y",2+d);b.setAttributeNS(null,"style","font-family:Arial,Helvetica,sans-serif; font-size:"+d+"px; fill:#356AA0;  opacity:0.3;");
a=document.createTextNode(c);b.appendChild(a);this.appendChildPrimitive(b,0)};JXG.SVGRenderer.prototype.drawInternalText=function(a){var b=this.createPrimitive("text",a.id);
b.setAttributeNS(null,"class","JXGtext");a.rendNodeText=document.createTextNode("");
b.appendChild(a.rendNodeText);this.appendChildPrimitive(b,9);return b};JXG.SVGRenderer.prototype.updateInternalText=function(a){a.rendNode.setAttributeNS(null,"x",(a.coords.scrCoords[1])+"px");
a.rendNode.setAttributeNS(null,"y",(a.coords.scrCoords[2]-this.vOffsetText)+"px");
a.updateText();if(a.htmlStr!=a.plaintextStr){a.rendNodeText.data=a.plaintextStr;a.htmlStr=a.plaintextStr
}};JXG.SVGRenderer.prototype.drawTicks=function(a){var b=this.createPrimitive("path",a.id);
this.appendChildPrimitive(b,a.layer);this.appendNodesToElement(a,"path")};JXG.SVGRenderer.prototype.updateTicks=function(e,f,a,h,b){var g="",k,m,d,l=e.ticks.length;
for(k=0;k<l;k++){m=e.ticks[k].scrCoords;if(e.ticks[k].major){if(e.labels[k].visProp.visible){this.drawText(e.labels[k])
}g+="M "+(m[1]+f)+" "+(m[2]-a)+" L "+(m[1]-f)+" "+(m[2]+a)+" "}else{g+="M "+(m[1]+h)+" "+(m[2]-b)+" L "+(m[1]-h)+" "+(m[2]+b)+" "
}}d=document.getElementById(e.id);if(d==null){d=this.createPrimitive("path",e.id);
this.appendChildPrimitive(d,e.layer);this.appendNodesToElement(e,"path")}d.setAttributeNS(null,"stroke",e.visProp.strokeColor);
d.setAttributeNS(null,"stroke-opacity",e.visProp.strokeOpacity);d.setAttributeNS(null,"stroke-width",e.visProp.strokeWidth);
this.updatePathPrimitive(d,g,e.board)};JXG.SVGRenderer.prototype.drawArc=function(b){var c=this.createPrimitive("path",b.id),g,d,a,h,e,f,l,k;
b.rendNode=c;JXG.clearVisPropOld(b);g=b.Radius();d=b.board.algebra.trueAngle(b.point2,b.midpoint,b.point3);
a={};a.midpoint=b.midpoint;a.Radius=function(){return g};a.getRadius=function(){return g
};h=b.board.algebra.projectPointToCircle(b.point3,a);e="M "+b.point2.coords.scrCoords[1]+" "+b.point2.coords.scrCoords[2]+" A ";
e+=Math.round(g*b.board.stretchX)+" "+Math.round(g*b.board.stretchY)+" 0 ";if(d>=180){e+="1 "
}else{e+="0 "}e+="0 ";e+=h.scrCoords[1]+" "+h.scrCoords[2];this.updatePathPrimitive(c,e,b.board);
if(b.visProp.strokeColor!=null){c.setAttributeNS(null,"stroke",b.visProp.strokeColor)
}if(b.visProp.strokeOpacity!=null){c.setAttributeNS(null,"stroke-opacity",b.visProp.strokeOpacity)
}if(b.visProp.strokeWidth!=null){c.setAttributeNS(null,"stroke-width",b.visProp.strokeWidth)
}c.setAttributeNS(null,"fill","none");this.setDashStyle(b,b.visProp);this.setShadow(b);
if(b.visProp.firstArrow){l=this.createArrowHead(b,"Start");this.defs.appendChild(l);
b.rendNodeTriangleStart=l;c.setAttributeNS(null,"marker-end","url(#"+b.id+"TriangleStart)")
}if(b.visProp.lastArrow){l=this.createArrowHead(b,"End");this.defs.appendChild(l);
b.rendNodeTriangleEnd=l;c.setAttributeNS(null,"marker-start","url(#"+b.id+"TriangleEnd)")
}k=this.createPrimitive("path",b.id+"sector");b.rendNode2=k;f="M "+b.midpoint.coords.scrCoords[1]+" "+b.midpoint.coords.scrCoords[2];
f+=" L "+b.point2.coords.scrCoords[1]+" "+b.point2.coords.scrCoords[2]+" A ";f+=Math.round(g*b.board.stretchX)+" "+Math.round(g*b.board.stretchY)+" 0 ";
if(d>=180){f+="1 "}else{f+="0 "}f+="0 ";f+=h.scrCoords[1]+" "+h.scrCoords[2];f+=" L "+b.midpoint.coords.scrCoords[1]+" "+b.midpoint.coords.scrCoords[2]+" z";
this.updatePathPrimitive(k,f,b.board);if(b.visProp.fillColor!=null){k.setAttributeNS(null,"fill",b.visProp.fillColor)
}if(b.visProp.fillOpacity!=null){k.setAttributeNS(null,"fill-opacity",b.visProp.fillOpacity)
}k.setAttributeNS(null,"stroke","none");this.setGradient(b);this.appendChildPrimitive(c,b.layer);
this.appendChildPrimitive(k,2);if(b.visProp.draft){this.setDraft(b)}if(!b.visProp.visible){b.hideElement()
}};JXG.SVGRenderer.prototype.updateArc=function(a){var b;this.remove(a.rendNode);
this.remove(a.rendNode2);b=a.rendNodeTriangleStart;if(b!=null){this.remove(b)}b=a.rendNodeTriangleEnd;
if(b!=null){this.remove(b)}this.drawArc(a);return};JXG.SVGRenderer.prototype.drawAngle=function(e){var h=e.board.algebra.trueAngle(e.point1,e.point2,e.point3),g,d,b,f,a,c;
JXG.clearVisPropOld(e);g={};g.midpoint=e.point2;g.Radius=function(){return e.radius
};g.getRadius=function(){return e.radius};d=e.board.algebra.projectPointToCircle(e.point1,g);
b=e.board.algebra.projectPointToCircle(e.point3,g);f=this.createPrimitive("path",e.id+"_1");
c="M "+e.point2.coords.scrCoords[1]+" "+e.point2.coords.scrCoords[2];c+=" L "+d.scrCoords[1]+" "+d.scrCoords[2]+" A ";
c+=Math.round(e.radius*e.board.stretchX)+" "+Math.round(e.radius*e.board.stretchY)+" 0 ";
if(h>=180){c+="1 "}else{c+="0 "}c+="0 ";c+=b.scrCoords[1]+" "+b.scrCoords[2];c+=" L "+e.point2.coords.scrCoords[1]+" "+e.point2.coords.scrCoords[2]+" z";
f.setAttributeNS(null,"d",c);f.setAttributeNS(null,"fill",e.visProp.fillColor);f.setAttributeNS(null,"fill-opacity",e.visProp.fillOpacity);
f.setAttributeNS(null,"stroke","none");a=this.createPrimitive("path",e.id+"_2");c="M "+d.scrCoords[1]+" "+d.scrCoords[2]+" A ";
c+=Math.round(e.radius*e.board.stretchX)+" "+Math.round(e.radius*e.board.stretchY)+" 0 ";
if(h>=180){c+="1 "}else{c+="0 "}c+="0 ";c+=b.scrCoords[1]+" "+b.scrCoords[2];a.setAttributeNS(null,"d",c);
a.setAttributeNS(null,"id",e.id+"_2");a.setAttributeNS(null,"fill","none");a.setAttributeNS(null,"stroke",e.visProp.strokeColor);
a.setAttributeNS(null,"stroke-opacity",e.visProp.strokeOpacity);this.appendChildPrimitive(f,e.layer);
e.rendNode=f;this.setShadow(e);this.appendChildPrimitive(a,2);e.rendNode2=a;this.setObjectStrokeWidth(e,e.visProp.strokeWidth)
};JXG.SVGRenderer.prototype.updateAngle=function(a){this.remove(a.rendNode);this.remove(a.rendNode2);
this.drawAngle(a);if(!a.visProp.visible){a.hideElement()}return};JXG.SVGRenderer.prototype.drawImage=function(b){var a=b.url,c=this.createPrimitive("image",b.id);
c.setAttributeNS(this.xlinkNamespace,"xlink:href",a);c.setAttributeNS(null,"preserveAspectRatio","none");
this.appendChildPrimitive(c,b.layer);b.rendNode=c;this.updateImage(b)};JXG.SVGRenderer.prototype.transformImage=function(b,a){var c=b.rendNode,d=c.getAttributeNS(null,"transform");
d+=" "+this.joinTransforms(b,a);c.setAttributeNS(null,"transform",d)};JXG.SVGRenderer.prototype.joinTransforms=function(e,c){var f="",b,d,a=c.length;
for(b=0;b<a;b++){d=c[b].matrix[1][1]+","+c[b].matrix[2][1]+","+c[b].matrix[1][2]+","+c[b].matrix[2][2]+","+c[b].matrix[1][0]+","+c[b].matrix[2][0];
f+="matrix("+d+") "}return f};JXG.SVGRenderer.prototype.transformImageParent=function(c,a){var b,d;
if(a!=null){b=a[1][1]+","+a[2][1]+","+a[1][2]+","+a[2][2]+","+a[1][0]+","+a[2][0];
d="matrix("+b+")"}else{d=""}c.rendNode.setAttributeNS(null,"transform",d)};JXG.SVGRenderer.prototype.setObjectStrokeColor=function(el,color,opacity){var c=this.eval(color),o=this.eval(opacity),node;
o=(o>0)?o:0;if(el.visPropOld.strokeColor==c&&el.visPropOld.strokeOpacity==o){return
}node=el.rendNode;if(el.type==JXG.OBJECT_TYPE_TEXT){node.style.color=c}else{node.setAttributeNS(null,"stroke",c);
node.setAttributeNS(null,"stroke-opacity",o)}if(el.type==JXG.OBJECT_TYPE_ARROW){el.rendNodeTriangle.setAttributeNS(null,"stroke",c);
el.rendNodeTriangle.setAttributeNS(null,"stroke-opacity",o);el.rendNodeTriangle.setAttributeNS(null,"fill",c);
el.rendNodeTriangle.setAttributeNS(null,"fill-opacity",o)}if(el.type==JXG.OBJECT_TYPE_ARC){if(el.visProp.firstArrow){el.rendNodeTriangleStart.setAttributeNS(null,"stroke",c);
el.rendNodeTriangleStart.setAttributeNS(null,"stroke-opacity",o);el.rendNodeTriangleStart.setAttributeNS(null,"fill",c);
el.rendNodeTriangleStart.setAttributeNS(null,"fill-opacity",o)}if(el.visProp.lastArrow){el.rendNodeTriangleEnd.setAttributeNS(null,"stroke",c);
el.rendNodeTriangleEnd.setAttributeNS(null,"stroke-opacity",o);el.rendNodeTriangleEnd.setAttributeNS(null,"fill",c);
el.rendNodeTriangleEnd.setAttributeNS(null,"fill-opacity",o)}}else{if(el.type==JXG.OBJECT_TYPE_LINE){if(el.visProp.firstArrow){el.rendNodeTriangleStart.setAttributeNS(null,"stroke",c);
el.rendNodeTriangleStart.setAttributeNS(null,"stroke-opacity",o);el.rendNodeTriangleStart.setAttributeNS(null,"fill",c);
el.rendNodeTriangleStart.setAttributeNS(null,"fill-opacity",o)}if(el.visProp.lastArrow){el.rendNodeTriangleEnd.setAttributeNS(null,"stroke",c);
el.rendNodeTriangleEnd.setAttributeNS(null,"stroke-opacity",o);el.rendNodeTriangleEnd.setAttributeNS(null,"fill",c);
el.rendNodeTriangleEnd.setAttributeNS(null,"fill-opacity",o)}}}el.visPropOld.strokeColor=c;
el.visPropOld.strokeOpacity=o};JXG.SVGRenderer.prototype.setObjectFillColor=function(el,color,opacity){var c=this.eval(color),o=this.eval(opacity);
o=(o>0)?o:0;if(el.visPropOld.fillColor==c&&el.visPropOld.fillOpacity==o){return}if(el.type==JXG.OBJECT_TYPE_ARC||el.type==JXG.OBJECT_TYPE_ANGLE){node=el.rendNode2;
node.setAttributeNS(null,"fill",c);node.setAttributeNS(null,"fill-opacity",o)}else{node=el.rendNode;
node.setAttributeNS(null,"fill",c);node.setAttributeNS(null,"fill-opacity",o)}if(el.visProp.gradient!=null){this.updateGradient(el)
}el.visPropOld.fillColor=c;el.visPropOld.fillOpacity=o};JXG.SVGRenderer.prototype.setObjectStrokeWidth=function(el,width){var w=this.eval(width),node;
try{if(el.visPropOld.strokeWidth==w){return}}catch(e){}if(el.elementClass!=JXG.OBJECT_CLASS_POINT){if(el.type==JXG.OBJECT_TYPE_ANGLE){node=el.rendNode2
}else{node=el.rendNode}this.setPropertyPrimitive(node,"stroked","true");if(w!=null){this.setPropertyPrimitive(node,"stroke-width",w)
}}else{node=el.rendNode;this.setPropertyPrimitive(node,"stroked","true");if(w!=null){this.setPropertyPrimitive(node,"stroke-width",w)
}}el.visPropOld.strokeWidth=w};JXG.SVGRenderer.prototype.hide=function(a){var b;if(a==null){return
}if(a.type==JXG.OBJECT_TYPE_ARC){b=a.rendNode;b.setAttributeNS(null,"display","none");
b.style.visibility="hidden";b=a.rendNode2;b.setAttributeNS(null,"display","none");
b.style.visibility="hidden"}else{if(a.type==JXG.OBJECT_TYPE_ANGLE){b=a.rendNode;b.setAttributeNS(null,"display","none");
b.style.visibility="hidden";b=a.rendNode2;b.setAttributeNS(null,"display","none");
b.style.visibility="hidden"}else{b=a.rendNode;b.setAttributeNS(null,"display","none");
b.style.visibility="hidden"}}};JXG.SVGRenderer.prototype.show=function(a){var b;if(a.type==JXG.OBJECT_TYPE_ARC){b=a.rendNode;
b.setAttributeNS(null,"display","inline");b.style.visibility="inherit";b=a.rendNode2;
b.setAttributeNS(null,"display","inline");b.style.visibility="inherit"}else{if(a.type==JXG.OBJECT_TYPE_ANGLE){b=a.rendNode;
b.setAttributeNS(null,"display","inline");b.style.visibility="inherit";b=a.rendNode2;
b.setAttributeNS(null,"display","inline");b.style.visibility="inherit"}else{b=a.rendNode;
b.setAttributeNS(null,"display","inline");b.style.visibility="inherit"}}};JXG.SVGRenderer.prototype.remove=function(a){if(a!=null&&a.parentNode!=null){a.parentNode.removeChild(a)
}};JXG.SVGRenderer.prototype.suspendRedraw=function(){if(true){this.suspendHandle=this.svgRoot.suspendRedraw(10000)
}};JXG.SVGRenderer.prototype.unsuspendRedraw=function(){if(true){this.svgRoot.unsuspendRedraw(this.suspendHandle);
this.svgRoot.forceRedraw()}};JXG.SVGRenderer.prototype.setDashStyle=function(b,a){var d=b.visProp.dash,c=b.rendNode;
if(b.visProp.dash>0){c.setAttributeNS(null,"stroke-dasharray",this.dashArray[d-1])
}else{if(c.hasAttributeNS(null,"stroke-dasharray")){c.removeAttributeNS(null,"stroke-dasharray")
}}};JXG.SVGRenderer.prototype.setGridDash=function(b){var a=document.getElementById(b);
this.setPropertyPrimitive(a,"stroke-dasharray","5, 5")};JXG.SVGRenderer.prototype.createPrimitive=function(a,c){var b=this.container.ownerDocument.createElementNS(this.svgNamespace,a);
b.setAttributeNS(null,"id",c);b.style.position="absolute";if(a=="path"){b.setAttributeNS(null,"stroke-linecap","butt");
b.setAttributeNS(null,"stroke-linejoin","round")}return b};JXG.SVGRenderer.prototype.createArrowHead=function(c,e){var d=c.id+"Triangle",b,a;
if(e!=null){d+=e}b=this.createPrimitive("marker",d);b.setAttributeNS(null,"viewBox","0 0 10 6");
b.setAttributeNS(null,"refY","3");b.setAttributeNS(null,"markerUnits","strokeWidth");
b.setAttributeNS(null,"markerHeight","6");b.setAttributeNS(null,"markerWidth","6");
b.setAttributeNS(null,"orient","auto");b.setAttributeNS(null,"stroke",c.visProp.strokeColor);
b.setAttributeNS(null,"stroke-opacity",c.visProp.strokeOpacity);b.setAttributeNS(null,"fill",c.visProp.strokeColor);
b.setAttributeNS(null,"fill-opacity",c.visProp.strokeOpacity);a=this.container.ownerDocument.createElementNS(this.svgNamespace,"path");
if(e=="End"){b.setAttributeNS(null,"refX","0");a.setAttributeNS(null,"d","M 0 3 L 10 6 L 10 0 z")
}else{b.setAttributeNS(null,"refX","10");a.setAttributeNS(null,"d","M 0 0 L 10 3 L 0 6 z")
}b.appendChild(a);return b};JXG.SVGRenderer.prototype.makeArrow=function(c,b,d){var a=this.createArrowHead(b,d);
this.defs.appendChild(a);c.setAttributeNS(null,"marker-end","url(#"+b.id+"Triangle)");
b.rendNodeTriangle=a};JXG.SVGRenderer.prototype.makeArrows=function(b){var a;if(b.visPropOld.firstArrow==b.visProp.firstArrow&&b.visPropOld.lastArrow==b.visProp.lastArrow){return
}if(b.visProp.firstArrow){a=b.rendNodeTriangleStart;if(a==null){a=this.createArrowHead(b,"End");
this.defs.appendChild(a);b.rendNodeTriangleStart=a;b.rendNode.setAttributeNS(null,"marker-start","url(#"+b.id+"TriangleEnd)")
}}else{a=b.rendNodeTriangleStart;if(a!=null){this.remove(a)}}if(b.visProp.lastArrow){a=b.rendNodeTriangleEnd;
if(a==null){a=this.createArrowHead(b,"Start");this.defs.appendChild(a);b.rendNodeTriangleEnd=a;
b.rendNode.setAttributeNS(null,"marker-end","url(#"+b.id+"TriangleStart)")}}else{a=b.rendNodeTriangleEnd;
if(a!=null){this.remove(a)}}b.visPropOld.firstArrow=b.visProp.firstArrow;b.visPropOld.lastArrow=b.visProp.lastArrow
};JXG.SVGRenderer.prototype.updateLinePrimitive=function(e,b,a,d,c){e.setAttributeNS(null,"x1",b);
e.setAttributeNS(null,"y1",a);e.setAttributeNS(null,"x2",d);e.setAttributeNS(null,"y2",c)
};JXG.SVGRenderer.prototype.updateCirclePrimitive=function(c,a,d,b){c.setAttributeNS(null,"cx",(a));
c.setAttributeNS(null,"cy",(d));c.setAttributeNS(null,"r",(b))};JXG.SVGRenderer.prototype.updateEllipsePrimitive=function(b,a,e,d,c){b.setAttributeNS(null,"cx",(a));
b.setAttributeNS(null,"cy",(e));b.setAttributeNS(null,"rx",(d));b.setAttributeNS(null,"ry",(c))
};JXG.SVGRenderer.prototype.updateRectPrimitive=function(d,a,e,b,c){d.setAttributeNS(null,"x",(a));
d.setAttributeNS(null,"y",(e));d.setAttributeNS(null,"width",(b));d.setAttributeNS(null,"height",(c))
};JXG.SVGRenderer.prototype.updatePathPrimitive=function(b,c,a){b.setAttributeNS(null,"d",c)
};JXG.SVGRenderer.prototype.updatePathStringPrimitive=function(a){var c=" M ",d=" L ",b=c,l=5000,f="",e,h,k=(a.curveType!="plot"),g;
if(a.numberPoints<=0){return""}if(k&&a.board.options.curve.RDPsmoothing){a.points=this.RamenDouglasPeuker(a.points,0.5)
}g=Math.min(a.points.length,a.numberPoints);for(e=0;e<g;e++){h=a.points[e].scrCoords;
if(isNaN(h[1])||isNaN(h[2])){b=c}else{if(h[1]>l){h[1]=l}else{if(h[1]<-l){h[1]=-l}}if(h[2]>l){h[2]=l
}else{if(h[2]<-l){h[2]=-l}}f+=[b,h[1]," ",h[2]].join("");b=d}}return f};JXG.SVGRenderer.prototype.updatePathStringPoint=function(d,a,c){var b="";
if(c=="x"){b="M "+(d.coords.scrCoords[1]-a)+" "+(d.coords.scrCoords[2]-a)+" L "+(d.coords.scrCoords[1]+a)+" "+(d.coords.scrCoords[2]+a)+" M "+(d.coords.scrCoords[1]+a)+" "+(d.coords.scrCoords[2]-a)+" L "+(d.coords.scrCoords[1]-a)+" "+(d.coords.scrCoords[2]+a)
}else{if(c=="+"){b="M "+(d.coords.scrCoords[1]-a)+" "+(d.coords.scrCoords[2])+" L "+(d.coords.scrCoords[1]+a)+" "+(d.coords.scrCoords[2])+" M "+(d.coords.scrCoords[1])+" "+(d.coords.scrCoords[2]-a)+" L "+(d.coords.scrCoords[1])+" "+(d.coords.scrCoords[2]+a)
}else{if(c=="diamond"){b="M "+(d.coords.scrCoords[1]-a)+" "+(d.coords.scrCoords[2])+" L "+(d.coords.scrCoords[1])+" "+(d.coords.scrCoords[2]+a)+" L "+(d.coords.scrCoords[1]+a)+" "+(d.coords.scrCoords[2])+" L "+(d.coords.scrCoords[1])+" "+(d.coords.scrCoords[2]-a)+" Z "
}else{if(c=="A"){b="M "+(d.coords.scrCoords[1])+" "+(d.coords.scrCoords[2]-a)+" L "+(d.coords.scrCoords[1]-a*Math.sqrt(3)/2)+" "+(d.coords.scrCoords[2]+a/2)+" L "+(d.coords.scrCoords[1]+a*Math.sqrt(3)/2)+" "+(d.coords.scrCoords[2]+a/2)+" Z "
}else{if(c=="v"){b="M "+(d.coords.scrCoords[1])+" "+(d.coords.scrCoords[2]+a)+" L "+(d.coords.scrCoords[1]-a*Math.sqrt(3)/2)+" "+(d.coords.scrCoords[2]-a/2)+" L "+(d.coords.scrCoords[1]+a*Math.sqrt(3)/2)+" "+(d.coords.scrCoords[2]-a/2)+" Z "
}else{if(c==">"){b="M "+(d.coords.scrCoords[1]+a)+" "+(d.coords.scrCoords[2])+" L "+(d.coords.scrCoords[1]-a/2)+" "+(d.coords.scrCoords[2]-a*Math.sqrt(3)/2)+" L "+(d.coords.scrCoords[1]-a/2)+" "+(d.coords.scrCoords[2]+a*Math.sqrt(3)/2)+" Z "
}else{if(c=="<"){b="M "+(d.coords.scrCoords[1]-a)+" "+(d.coords.scrCoords[2])+" L "+(d.coords.scrCoords[1]+a/2)+" "+(d.coords.scrCoords[2]-a*Math.sqrt(3)/2)+" L "+(d.coords.scrCoords[1]+a/2)+" "+(d.coords.scrCoords[2]+a*Math.sqrt(3)/2)+" Z "
}}}}}}}return b};JXG.SVGRenderer.prototype.updatePolygonePrimitive=function(e,d){var f="",b,c,a=d.vertices.length;
e.setAttributeNS(null,"stroke","none");for(c=0;c<a-1;c++){b=d.vertices[c].coords.scrCoords;
f=f+b[1]+","+b[2];if(c<a-2){f+=" "}}e.setAttributeNS(null,"points",f)};JXG.SVGRenderer.prototype.appendChildPrimitive=function(a,b){if(typeof b=="undefined"){b=0
}else{if(b>=JXG.Options.layer.numlayers){b=JXG.Options.layer.numlayers-1}}this.layer[b].appendChild(a)
};JXG.SVGRenderer.prototype.setPropertyPrimitive=function(b,a,c){if(a=="stroked"){return
}b.setAttributeNS(null,a,c)};JXG.SVGRenderer.prototype.drawVerticalGrid=function(d,b,f,c){var e=this.createPrimitive("path","gridx"),a="";
while(d.scrCoords[1]<b.scrCoords[1]+f-1){a+=" M "+d.scrCoords[1]+" "+0+" L "+d.scrCoords[1]+" "+c.canvasHeight+" ";
d.setCoordinates(JXG.COORDS_BY_SCREEN,[d.scrCoords[1]+f,d.scrCoords[2]])}this.updatePathPrimitive(e,a,c);
return e};JXG.SVGRenderer.prototype.drawHorizontalGrid=function(d,b,f,c){var e=this.createPrimitive("path","gridy"),a="";
while(d.scrCoords[2]<=b.scrCoords[2]+f-1){a+=" M "+0+" "+d.scrCoords[2]+" L "+c.canvasWidth+" "+d.scrCoords[2]+" ";
d.setCoordinates(JXG.COORDS_BY_SCREEN,[d.scrCoords[1],d.scrCoords[2]+f])}this.updatePathPrimitive(e,a,c);
return e};JXG.SVGRenderer.prototype.appendNodesToElement=function(a,b){a.rendNode=document.getElementById(a.id)
};JXG.VMLRenderer=function(a){this.constructor();this.container=a;this.container.style.overflow="hidden";
this.container.onselectstart=function(){return false};this.resolution=10;a.ownerDocument.namespaces.add("jxgvml","urn:schemas-microsoft-com:vml");
this.container.ownerDocument.createStyleSheet().addRule(".jxgvml","behavior:url(#default#VML)");
try{!a.ownerDocument.namespaces.jxgvml&&a.ownerDocument.namespaces.add("jxgvml","urn:schemas-microsoft-com:vml");
this.createNode=function(c){return a.ownerDocument.createElement("<jxgvml:"+c+' class="jxgvml">')
}}catch(b){this.createNode=function(c){return a.ownerDocument.createElement("<"+c+' xmlns="urn:schemas-microsoft.com:vml" class="jxgvml">')
}}this.dashArray=["Solid","1 1","ShortDash","Dash","LongDash","ShortDashDot","LongDashDot"]
};JXG.VMLRenderer.prototype=new JXG.AbstractRenderer;JXG.VMLRenderer.prototype.setAttr=function(c,a,f,b){try{if(document.documentMode==8){c[a]=f
}else{c.setAttribute(a,f,b)}}catch(d){}};JXG.VMLRenderer.prototype.setShadow=function(a){var b=a.rendNodeShadow;
if(!b){return}if(a.visPropOld.shadow==a.visProp.shadow){return}if(a.visProp.shadow){this.setAttr(b,"On","True");
this.setAttr(b,"Offset","3pt,3pt");this.setAttr(b,"Opacity","60%");this.setAttr(b,"Color","#aaaaaa")
}else{this.setAttr(b,"On","False")}a.visPropOld.shadow=a.visProp.shadow};JXG.VMLRenderer.prototype.setGradient=function(b){var a=b.rendNodeFill;
if(b.type==JXG.OBJECT_TYPE_ARC||b.type==JXG.OBJECT_TYPE_ANGLE){a=b.rendNode2Fill}if(b.visProp.gradient=="linear"){this.setAttr(a,"type","gradient");
this.setAttr(a,"color2",b.visProp.gradientSecondColor);this.setAttr(a,"opacity2",b.visProp.gradientSecondOpacity);
this.setAttr(a,"angle",b.visProp.gradientAngle)}else{if(b.visProp.gradient=="radial"){this.setAttr(a,"type","gradientradial");
this.setAttr(a,"color2",b.visProp.gradientSecondColor);this.setAttr(a,"opacity2",b.visProp.gradientSecondOpacity);
this.setAttr(a,"focusposition",b.visProp.gradientPositionX*100+"%,"+b.visProp.gradientPositionY*100+"%");
this.setAttr(a,"focussize","0,0")}else{this.setAttr(a,"type","solid")}}};JXG.VMLRenderer.prototype.updateGradient=function(a){};
JXG.VMLRenderer.prototype.addShadowToGroup=function(a,c){var b,d;if(a=="lines"){for(b in c.objects){d=c.objects[b];
if(d.elementClass==JXG.OBJECT_CLASS_LINE){this.addShadowToElement(d)}}}else{if(a=="points"){for(b in c.objects){d=c.objects[b];
if(d.elementClass==JXG.OBJECT_CLASS_POINT){this.addShadowToElement(d)}}}else{if(a=="circles"){for(b in c.objects){d=c.objects[b];
if(d.elementClass==JXG.OBJECT_CLASS_CIRCLE){this.addShadowToElement(d)}}}}}c.fullUpdate()
};JXG.VMLRenderer.prototype.displayCopyright=function(c,d){var b,a;b=this.createNode("textbox");
b.style.position="absolute";this.setAttr(b,"id","licenseText");b.style.left=20;b.style.top=(2);
b.style.fontSize=(d);b.style.color="#356AA0";b.style.fontFamily="Arial,Helvetica,sans-serif";
this.setAttr(b,"opacity","30%");b.style.filter="alpha(opacity = 30)";a=document.createTextNode(c);
b.appendChild(a);this.appendChildPrimitive(b,0)};JXG.VMLRenderer.prototype.drawInternalText=function(a){var b;
b=this.createNode("textbox");b.style.position="absolute";if(document.documentMode==8){b.setAttribute("class","JXGtext")
}else{b.setAttribute("className",9)}a.rendNodeText=document.createTextNode("");b.appendChild(a.rendNodeText);
this.appendChildPrimitive(b,9);return b};JXG.VMLRenderer.prototype.updateInternalText=function(a){a.rendNode.style.left=(a.coords.scrCoords[1])+"px";
a.rendNode.style.top=(a.coords.scrCoords[2]-this.vOffsetText)+"px";a.updateText();
if(a.htmlStr!=a.plaintextStr){a.rendNodeText.data=a.plaintextStr;a.htmlStr=a.plaintextStr
}};JXG.VMLRenderer.prototype.drawTicks=function(b){var a=this.createPrimitive("path",b.id);
this.appendChildPrimitive(a,b.layer);this.appendNodesToElement(b,"path")};JXG.VMLRenderer.prototype.updateTicks=function(e,f,a,g,d){var b=[],h,k,l,m;
k=e.ticks.length;for(h=0;h<k;h++){l=e.ticks[h];if(l.major){if(e.labels[h].visProp.visible){this.drawText(e.labels[h])
}b.push(" m "+Math.round(this.resolution*(l.scrCoords[1]+f))+", "+Math.round(this.resolution*(l.scrCoords[2]-a))+" l "+Math.round(this.resolution*(l.scrCoords[1]-f))+", "+Math.round(this.resolution*(l.scrCoords[2]+a))+" ")
}else{b.push(" m "+Math.round(this.resolution*(l.scrCoords[1]+g))+", "+Math.round(this.resolution*(l.scrCoords[2]-d))+" l "+Math.round(this.resolution*(l.scrCoords[1]-g))+", "+Math.round(this.resolution*(l.scrCoords[2]+d))+" ")
}}m=document.getElementById(e.id);if(m==null){m=this.createPrimitive("path",e.id);
this.appendChildPrimitive(m,e.layer);this.appendNodesToElement(e,"path")}this.setAttr(m,"stroked","true");
this.setAttr(m,"strokecolor",e.visProp.strokeColor,1);this.setAttr(m,"strokeweight",e.visProp.strokeWidth);
this.updatePathPrimitive(m,b,e.board)};JXG.VMLRenderer.prototype.drawArcLine=function(a,g,f,e,m,h,b){var c=this.createNode("arc"),l=this.createNode("fill"),k=this.createNode("stroke"),d=this.createNode("shadow");
this.setAttr(c,"id",a);this.setAttr(l,"id",a+"_fill");this.setAttr(k,"id",a+"_stroke");
this.setAttr(d,"id",a+"_shadow");c.appendChild(l);c.appendChild(k);c.appendChild(d);
b.rendNode=c;b.rendNodeFill=l;b.rendNodeStroke=k;b.rendNodeShadow=d;c.style.position="absolute";
this.setAttr(c,"filled","false");c.style.left=(m.coords.scrCoords[1]-Math.round(g*h.stretchX))+"px";
c.style.top=(m.coords.scrCoords[2]-Math.round(g*h.stretchY))+"px";c.style.width=(Math.round(g*h.stretchX)*2)+"px";
c.style.height=(Math.round(g*h.stretchY)*2)+"px";this.setAttr(c,"startangle",f);this.setAttr(c,"endangle",e);
return c};JXG.VMLRenderer.prototype.drawArcFill=function(a,e,s,k,h,f,d){var n,l,b,g=this.createNode("path"),q=this.createNode("shape"),r=this.createNode("fill"),m=this.createNode("stroke"),c=this.createNode("shadow");
a=a+"sector";this.setAttr(g,"id",a+"_path");this.setAttr(r,"id",a+"_fill");this.setAttr(m,"id",a+"_stroke");
this.setAttr(c,"id",a+"_shadow");this.setAttr(q,"id",a);q.appendChild(r);q.appendChild(m);
q.appendChild(c);q.appendChild(g);q.style.position="absolute";d.rendNode2=q;d.rendNode2Fill=r;
d.rendNode2Stroke=m;d.rendNode2Shadow=c;d.rendNode2Path=g;this.setAttr(q,"stroked","false");
n=Math.round(e*f.stretchX);l=Math.round(e*f.stretchY);q.style.width=n;q.style.height=l;
this.setAttr(q,"coordsize",n+","+l);b="m "+s.coords.scrCoords[1]+","+s.coords.scrCoords[2]+" l ";
b+=k.coords.scrCoords[1]+","+k.coords.scrCoords[2]+" at ";b+=(s.coords.scrCoords[1]-n)+","+(s.coords.scrCoords[2]-l)+",";
b+=(s.coords.scrCoords[1]+n)+","+(s.coords.scrCoords[2]+l);b+=" "+k.coords.scrCoords[1]+","+k.coords.scrCoords[2];
b+=", "+h.coords.scrCoords[1]+","+h.coords.scrCoords[2]+" l ";b+=s.coords.scrCoords[1]+","+s.coords.scrCoords[2]+" x e";
this.setAttr(g,"v",b);return q};JXG.VMLRenderer.prototype.drawArc=function(b){var g,a={},f,e,d,c,k,h={};
JXG.clearVisPropOld(b);g=b.Radius();a.coords=new JXG.Coords(JXG.COORDS_BY_USER,[b.midpoint.coords.usrCoords[1],b.board.origin.scrCoords[2]/b.board.stretchY],b.board);
e=b.board.algebra.trueAngle(b.point2,b.midpoint,a);f=b.board.algebra.trueAngle(b.point3,b.midpoint,a);
if(e<f){f-=360}d=this.drawArcLine(b.id,g,f,e,b.midpoint,b.board,b);c=b.rendNodeStroke;
if(b.visProp.lastArrow){this.setAttr(c,"endarrow","block");this.setAttr(c,"endarrowlength","long")
}if(b.visProp.firstArrow){this.setAttr(c,"startarrow","block");this.setAttr(c,"startarrowlength","long")
}this.setObjectStrokeColor(b,b.visProp.strokeColor,b.visProp.strokeOpacity);this.setObjectStrokeWidth(b,b.visProp.strokeWidth);
this.setDashStyle(b,b.visProp);this.setShadow(b);h.coords=b.board.algebra.projectPointToCircle(b.point3,b);
k=this.drawArcFill(b.id,g,b.midpoint,b.point2,h,b.board,b);this.setObjectFillColor(b,b.visProp.fillColor,b.visProp.fillOpacity);
this.setGradient(b);this.appendChildPrimitive(d,b.layer);this.appendChildPrimitive(k,b.layer);
if(b.visProp.draft){this.setDraft(b)}if(!b.visProp.visible){b.hideElement(b)}};JXG.AbstractRenderer.prototype.updateArc=function(a){this.remove(a.rendNode);
this.remove(a.rendNode2);this.drawArc(a);return};JXG.VMLRenderer.prototype.drawAngle=function(d){var a={},q,n,b={},h,g,e,f,c,m={},k={},l;
JXG.clearVisPropOld(d);a.midpoint=d.point2;a.Radius=function(){return d.radius};a.getRadius=function(){return d.radius
};q=d.board.algebra.projectPointToCircle(d.point1,a);n=d.board.algebra.projectPointToCircle(d.point3,a);
b.coords=new JXG.Coords(JXG.COORDS_BY_USER,[d.point2.coords.usrCoords[1],d.board.origin.scrCoords[2]/(d.board.stretchY)],d.board);
g=d.board.algebra.trueAngle(d.point1,d.point2,b);h=d.board.algebra.trueAngle(d.point3,d.point2,b);
if(g<h){h-=360}e=this.drawArcLine(d.id,d.radius,h,g,d.point2,d.board,d);this.setObjectStrokeColor(d,d.visProp.strokeColor,d.visProp.strokeOpacity);
this.setObjectStrokeWidth(d,d.visProp.strokeWidth);f=d.visProp.dash;c=d.rendNodeStroke;
this.setAttr(c,"dashstyle",this.dashArray[f]);this.setShadow(d);m.coords=q;k.coords=n;
l=this.drawArcFill(d.id,d.radius,d.point2,m,k,d.board,d);this.setObjectFillColor(d,d.visProp.fillColor,d.visProp.fillOpacity);
this.appendChildPrimitive(e,d.layer);this.appendChildPrimitive(l,d.layer);if(d.visProp.draft){this.setDraft(d)
}if(!d.visProp.visible){d.hideElement(d)}};JXG.VMLRenderer.prototype.updateAngle=function(a){this.remove(a.rendNode);
this.remove(a.rendNode2);this.drawAngle(a);return};JXG.VMLRenderer.prototype.drawImage=function(b){var c,a=b.url;
c=this.container.ownerDocument.createElement("img");c.style.position="absolute";this.setAttr(c,"id",b.id);
this.setAttr(c,"src",a);this.container.appendChild(c);this.appendChildPrimitive(c,b.layer);
c.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11='1.0', sizingMethod='auto expand')";
b.rendNode=c;this.updateImage(b)};JXG.VMLRenderer.prototype.transformImage=function(c,b){var d=c.rendNode,a;
a=this.joinTransforms(c,b);d.style.left=(c.coords.scrCoords[1]+a[1][0])+"px";d.style.top=(c.coords.scrCoords[2]-c.size[1]+a[2][0])+"px";
d.filters.item(0).M11=a[1][1];d.filters.item(0).M12=a[1][2];d.filters.item(0).M21=a[2][1];
d.filters.item(0).M22=a[2][2]};JXG.VMLRenderer.prototype.joinTransforms=function(e,d){var b=[[1,0,0],[0,1,0],[0,0,1]],c,a=d.length;
for(c=0;c<a;c++){b=JXG.Math.matMatMult(d[c].matrix,b)}return b};JXG.VMLRenderer.prototype.transformImageParent=function(b,a){};
JXG.VMLRenderer.prototype.hide=function(a){var b=a.rendNode;b.style.visibility="hidden";
if(a.type==JXG.OBJECT_TYPE_ARC||a.type==JXG.OBJECT_TYPE_ANGLE){b=a.rendNode2;b.style.visibility="hidden"
}};JXG.VMLRenderer.prototype.show=function(a){var b=a.rendNode;b.style.visibility="inherit";
if(a.type==JXG.OBJECT_TYPE_ARC||a.type==JXG.OBJECT_TYPE_ANGLE){b=a.rendNode2;b.style.visibility="inherit"
}};JXG.VMLRenderer.prototype.setDashStyle=function(b,a){var c;if(a.dash>=0){c=b.rendNodeStroke;
this.setAttr(c,"dashstyle",this.dashArray[a.dash])}};JXG.VMLRenderer.prototype.setObjectStrokeColor=function(el,color,opacity){var c=this.eval(color),o=this.eval(opacity),node,nodeStroke;
o=(o>0)?o:0;if(el.visPropOld.strokeColor==c&&el.visPropOld.strokeOpacity==o){return
}if(el.type==JXG.OBJECT_TYPE_TEXT){el.rendNode.style.color=c}else{node=el.rendNode;
this.setAttr(node,"stroked","true");this.setAttr(node,"strokecolor",c);if(el.id=="gridx"){nodeStroke=document.getElementById("gridx_stroke")
}else{if(el.id=="gridy"){nodeStroke=document.getElementById("gridy_stroke")}else{nodeStroke=el.rendNodeStroke
}}if(o!=undefined){this.setAttr(nodeStroke,"opacity",(o*100)+"%")}}el.visPropOld.strokeColor=c;
el.visPropOld.strokeOpacity=o};JXG.VMLRenderer.prototype.setObjectFillColor=function(el,color,opacity){var c=this.eval(color),o=this.eval(opacity);
o=(o>0)?o:0;if(el.visPropOld.fillColor==c&&el.visPropOld.fillOpacity==o){return}if(el.type==JXG.OBJECT_TYPE_ARC||el.type==JXG.OBJECT_TYPE_ANGLE){if(c=="none"){this.setAttr(el.rendNode2,"filled","false")
}else{this.setAttr(el.rendNode2,"filled","true");this.setAttr(el.rendNode2,"fillcolor",c);
if(o!=undefined){this.setAttr(el.rendNode2Fill,"opacity",(o*100)+"%")}}}else{if(c=="none"){this.setAttr(el.rendNode,"filled","false")
}else{this.setAttr(el.rendNode,"filled","true");this.setAttr(el.rendNode,"fillcolor",c);
if(o!=undefined&&el.rendNodeFill){this.setAttr(el.rendNodeFill,"opacity",(o*100)+"%")
}}}el.visPropOld.fillColor=c;el.visPropOld.fillOpacity=o};JXG.VMLRenderer.prototype.remove=function(a){if(a!=null){a.removeNode(true)
}};JXG.VMLRenderer.prototype.suspendRedraw=function(){this.container.style.display="none"
};JXG.VMLRenderer.prototype.unsuspendRedraw=function(){this.container.style.display=""
};JXG.VMLRenderer.prototype.setAttributes=function(node,props,vmlprops,visProp){var val,i,p;
len=props.length;for(i=0;i<len;i++){p=props[i];if(visProp[p]!=null){val=this.eval(visProp[p]);
val=(val>0)?val:0;this.setAttr(node,vmlprops[i],val)}}};JXG.VMLRenderer.prototype.setGridDash=function(b,a){var a=document.getElementById(b+"_stroke");
this.setAttr(a,"dashstyle","Dash")};JXG.VMLRenderer.prototype.setObjectStrokeWidth=function(el,width){var w=this.eval(width),node;
if(el.visPropOld.strokeWidth==w){return}node=el.rendNode;this.setPropertyPrimitive(node,"stroked","true");
if(w!=null){this.setPropertyPrimitive(node,"stroke-width",w)}el.visPropOld.strokeWidth=w
};JXG.VMLRenderer.prototype.createPrimitive=function(b,g){var c,a=this.createNode("fill"),f=this.createNode("stroke"),e=this.createNode("shadow"),d;
this.setAttr(a,"id",g+"_fill");this.setAttr(f,"id",g+"_stroke");this.setAttr(e,"id",g+"_shadow");
if(b=="circle"||b=="ellipse"){c=this.createNode("oval");c.appendChild(a);c.appendChild(f);
c.appendChild(e)}else{if(b=="polygon"||b=="path"||b=="shape"||b=="line"){c=this.createNode("shape");
c.appendChild(a);c.appendChild(f);c.appendChild(e);d=this.createNode("path");this.setAttr(d,"id",g+"_path");
c.appendChild(d)}else{c=this.createNode(b);c.appendChild(a);c.appendChild(f);c.appendChild(e)
}}c.style.position="absolute";this.setAttr(c,"id",g);return c};JXG.VMLRenderer.prototype.appendNodesToElement=function(a,b){if(b=="shape"||b=="path"||b=="polygon"){a.rendNodePath=document.getElementById(a.id+"_path")
}a.rendNodeFill=document.getElementById(a.id+"_fill");a.rendNodeStroke=document.getElementById(a.id+"_stroke");
a.rendNodeShadow=document.getElementById(a.id+"_shadow");a.rendNode=document.getElementById(a.id)
};JXG.VMLRenderer.prototype.makeArrow=function(c,b,d){var a=b.rendNodeStroke;this.setAttr(a,"endarrow","block");
this.setAttr(a,"endarrowlength","long")};JXG.VMLRenderer.prototype.makeArrows=function(b){var a;
if(b.visPropOld.firstArrow==b.visProp.firstArrow&&b.visPropOld.lastArrow==b.visProp.lastArrow){return
}if(b.visProp.firstArrow){a=b.rendNodeStroke;this.setAttr(a,"startarrow","block");
this.setAttr(a,"startarrowlength","long")}else{a=b.rendNodeStroke;if(a!=null){this.setAttr(a,"startarrow","none")
}}if(b.visProp.lastArrow){a=b.rendNodeStroke;this.setAttr(a,"id",b.id+"stroke");this.setAttr(a,"endarrow","block");
this.setAttr(a,"endarrowlength","long")}else{a=b.rendNodeStroke;if(a!=null){this.setAttr(a,"endarrow","none")
}}b.visPropOld.firstArrow=b.visProp.firstArrow;b.visPropOld.lastArrow=b.visProp.lastArrow
};JXG.VMLRenderer.prototype.updateLinePrimitive=function(h,b,a,d,c,f){var e,g=this.resolution;
e=["m ",g*b,", ",g*a," l ",g*d,", ",g*c];this.updatePathPrimitive(h,e,f)};JXG.VMLRenderer.prototype.updateCirclePrimitive=function(c,a,d,b){c.style.left=(a-b)+"px";
c.style.top=(d-b)+"px";c.style.width=(b*2)+"px";c.style.height=(b*2)+"px"};JXG.VMLRenderer.prototype.updateRectPrimitive=function(d,a,e,b,c){d.style.left=(a)+"px";
d.style.top=(e)+"px";d.style.width=(b)+"px";d.style.height=(c)+"px"};JXG.VMLRenderer.prototype.updateEllipsePrimitive=function(b,a,e,d,c){b.style.left=(a-d)+"px";
b.style.top=(e-c)+"px";b.style.width=(d*2)+"px";b.style.height=(c*2)+"px"};JXG.VMLRenderer.prototype.updatePathPrimitive=function(c,d,b){var a=b.canvasWidth,e=b.canvasHeight;
c.style.width=a;c.style.height=e;this.setAttr(c,"coordsize",[(this.resolution*a),(this.resolution*e)].join(","));
this.setAttr(c,"path",d.join(""))};JXG.VMLRenderer.prototype.updatePathStringPrimitive=function(b){var h=[],g,l,a=this.resolution,f=Math.round,d=" m ",e=" l ",c=d,m=(b.curveType!="plot"),k=Math.min(b.numberPoints,8192);
if(b.numberPoints<=0){return""}if(m&&b.board.options.curve.RDPsmoothing){b.points=this.RamenDouglasPeuker(b.points,1)
}k=Math.min(k,b.points.length);for(g=0;g<k;g++){l=b.points[g].scrCoords;if(isNaN(l[1])||isNaN(l[2])){c=d
}else{if(l[1]>20000){l[1]=20000}else{if(l[1]<-20000){l[1]=-20000}}if(l[2]>20000){l[2]=20000
}else{if(l[2]<-20000){l[2]=-20000}}h.push([c,f(a*l[1]),", ",f(a*l[2])].join(""));
c=e}}h.push(" e");return h};JXG.VMLRenderer.prototype.updatePathStringPoint=function(d,a,c){var b=[],f=d.coords.scrCoords,e=this.resolution;
if(c=="x"){b.push(["m ",(e*(f[1]-a)),", ",(e*(f[2]-a))," l ",(e*(f[1]+a)),", ",(e*(f[2]+a))," m ",(e*(f[1]+a)),", ",(e*(f[2]-a))," l ",(e*(f[1]-a)),", ",(e*(f[2]+a))].join(""))
}else{if(c=="+"){b.push(["m ",(e*(f[1]-a)),", ",(e*(f[2]))," l ",(e*(f[1]+a)),", ",(e*(f[2]))," m ",(e*(f[1])),", ",(e*(f[2]-a))," l ",(e*(f[1])),", ",(e*(f[2]+a))].join(""))
}else{if(c=="diamond"){b.push(["m ",(e*(f[1]-a)),", ",(e*(f[2]))," l ",(e*(f[1])),", ",(e*(f[2]+a))," l ",(e*(f[1]+a)),", ",(e*(f[2]))," l ",(e*(f[1])),", ",(e*(f[2]-a))," x e "].join(""))
}else{if(c=="A"){b.push(["m ",(e*(f[1])),", ",(e*(f[2]-a))," l ",Math.round(e*(f[1]-a*Math.sqrt(3)/2)),", ",(e*(f[2]+a/2))," l ",Math.round(e*(f[1]+a*Math.sqrt(3)/2)),", ",(e*(f[2]+a/2))," x e "].join(""))
}else{if(c=="v"){b.push(["m ",(e*(f[1])),", ",(e*(f[2]+a))," l ",Math.round(e*(f[1]-a*Math.sqrt(3)/2)),", ",(e*(f[2]-a/2))," l ",Math.round(e*(f[1]+a*Math.sqrt(3)/2)),", ",(e*(f[2]-a/2))," x e "].join(""))
}else{if(c==">"){b.push(["m ",(e*(f[1]+a)),", ",(e*(f[2]))," l ",(e*(f[1]-a/2)),", ",Math.round(e*(f[2]-a*Math.sqrt(3)/2))," l ",(e*(f[1]-a/2)),", ",Math.round(e*(f[2]+a*Math.sqrt(3)/2))," l ",(e*(f[1]+a)),", ",(e*(f[2]))].join(""))
}else{if(c=="<"){b.push(["m ",(e*(f[1]-a)),", ",(e*(f[2]))," l ",(e*(f[1]+a/2)),", ",Math.round(e*(f[2]-a*Math.sqrt(3)/2))," l ",(e*(f[1]+a/2)),", ",Math.round(e*(f[2]+a*Math.sqrt(3)/2))," x e "].join(""))
}}}}}}}return b};JXG.VMLRenderer.prototype.updatePolygonePrimitive=function(e,c){var f=c.vertices[0].coords.scrCoords[1],b=c.vertices[0].coords.scrCoords[1],d=c.vertices[0].coords.scrCoords[2],a=c.vertices[0].coords.scrCoords[2],g,k=c.vertices.length,l,n,m,h=[];
this.setAttr(e,"stroked","false");for(g=1;g<k-1;g++){l=c.vertices[g].coords.scrCoords;
if(l[1]<f){f=l[1]}else{if(l[1]>b){b=l[1]}}if(l[2]<d){d=l[2]}else{if(l[2]>a){a=l[2]
}}}n=Math.round(b-f);m=Math.round(a-d);if(!isNaN(n)&&!isNaN(m)){e.style.width=n;e.style.height=m;
this.setAttr(e,"coordsize",n+","+m)}l=c.vertices[0].coords.scrCoords;h.push(["m ",l[1],",",l[2]," l "].join(""));
for(g=1;g<k-1;g++){l=c.vertices[g].coords.scrCoords;h.push(l[1]+","+l[2]);if(g<k-2){h.push(", ")
}}h.push(" x e");this.setAttr(e,"path",h.join(""))};JXG.VMLRenderer.prototype.appendChildPrimitive=function(a,b){if(typeof b=="undefined"){b=0
}a.style.zIndex=b;this.container.appendChild(a)};JXG.VMLRenderer.prototype.setPropertyPrimitive=function(node,key,val){var keyVml="",node2,v;
switch(key){case"stroke":keyVml="strokecolor";break;case"stroke-width":keyVml="strokeweight";
break;case"stroke-dasharray":keyVml="dashstyle";break}if(keyVml!=""){v=this.eval(val);
this.setAttr(node,keyVml,v)}};JXG.VMLRenderer.prototype.drawVerticalGrid=function(d,b,f,c){var e=this.createPrimitive("path","gridx"),a=[];
while(d.scrCoords[1]<b.scrCoords[1]+f-1){a.push(" m "+(this.resolution*d.scrCoords[1])+", "+0+" l "+(this.resolution*d.scrCoords[1])+", "+(this.resolution*c.canvasHeight)+" ");
d.setCoordinates(JXG.COORDS_BY_SCREEN,[d.scrCoords[1]+f,d.scrCoords[2]])}this.updatePathPrimitive(e,a,c);
return e};JXG.VMLRenderer.prototype.drawHorizontalGrid=function(d,b,f,c){var e=this.createPrimitive("path","gridy"),a=[];
while(d.scrCoords[2]<=b.scrCoords[2]+f-1){a.push(" m "+0+", "+(this.resolution*d.scrCoords[2])+" l "+(this.resolution*c.canvasWidth)+", "+(this.resolution*d.scrCoords[2])+" ");
d.setCoordinates(JXG.COORDS_BY_SCREEN,[d.scrCoords[1],d.scrCoords[2]+f])}this.updatePathPrimitive(e,a,c);
return e};JsxGraph.SimpleGraphView=SC.View.extend({classNames:"jxgbox",layerDidChange:function(){this.set("layerNeedsUpdate",YES)
}.observes("layer"),updateLayer:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("layer");if(a){JXG.JSXGraph.initBoard(a.id,{originX:250,originY:250,unitX:50,unitY:50,axis:true})
}}});if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("jsx_graph")
};