let CacheObject = Object.create(null)

// 缓存函数结果
export function cacher(key,callback,mustCall /* 强制执行此回调 */){
  if(true === mustCall){
    return callback()
  }
  var hint = CacheObject[key]
  if(hint == null){
    hint = CacheObject[key] = callback(key)
  }
  return hint
}

export function encodeScriptCode(code) {
    return multiReplace(code, [
        [/\\/g, "\\u005C"],
        [/"/g, "\\u0022"],
        [/'/g, "\\u0027"],
        [/\//g, "\\u002F"],
        [/\r/g, "\\u000A"],
        [/\n/g, "\\u000D"],
        [/\t/g, "\\u0009"]
    ]);
}

export function multiReplace(string,replaces){
  for(var i = 0,_len = replaces.length,replace ; i < _len ; i++){
    replace = replaces[i]
    string = string.replace(replace[0],replace[1])
  }
  return string
}