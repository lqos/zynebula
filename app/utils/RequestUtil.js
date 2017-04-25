/**
 *
 * Copyright 2015-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const HOST = 'https://dev.nebulaedu.com/api/v1/';//测试  正式https://nebulaedu.com/api/v1/
export const require = (url,method,header,params)=>{
  if (params) {
      let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return new Promise((resolve, reject) =>{
    fetch(HOST+url,{method: method,headers:header})
    .then((response) =>response.json())
    .then((responseData)=>{
      resolve(responseData);
    }).catch((error)=>{
      reject(error);
    })
    .done();
  });
};


export const post = (url,method,params)=>{
  if (params) {
      let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return new Promise((resolve, reject) =>{
    fetch(HOST+url,{
      method: method,
    })
    .then((response) =>response.json())
    .then((responseData)=>{
      resolve(responseData);
    }).catch((error)=>{
      reject(error);
    })
    .done();
  });
};


export const postJson = (url,params,header,body)=>{
  let paramsArray = [];
  if (params) {
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return new Promise((resolve, reject) =>{
    fetch(HOST+url,{
      method: 'POST',
      headers:header,
      body:JSON.stringify(body)
    })
    .then((response) =>response.json())
    .then((responseData)=>{
      resolve(responseData);
    }).catch((error)=>{
      reject(error);
    })
    .done();
  });
};

export const paypostJson = (url,params,header,body)=>{
  let paramsArray = [];
  if (params) {
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return new Promise((resolve, reject) =>{
    fetch('http://pay2.enetic.cn/api/v1/'+url,{
      method: 'POST',
      headers:header,
      body:JSON.stringify(body)
    })
    .then((response) =>response.json())
    .then((responseData)=>{
      resolve(responseData);
    }).catch((error)=>{
      reject(error);
    })
    .done();
  });
};
