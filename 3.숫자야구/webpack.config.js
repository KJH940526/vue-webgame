//노드의 모듈시스템 import 대신 require를 사용하고 export디폴트 대신에 module.exports 사용한다
//
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

// node의 모듈을 만들었다.
// 이렇게 만든 객체를 나중에 웹팩이 웹팩처리를 할 때 사용한다.
module.exports = {
    mode:'development', //개발용 //배표할때는 production
    devtool: 'eval',    //개발용 //배포할때는 hidden-source-map을 많이사용
    resolve: {
        //확장자들을 편하게 처리할 수 있다.
        extensions: ['.js','.vue']
    },
    //웹팩은 스크립트들이 너무 많아서 합치기 위해서 사용한다.
    //여러개의 스크립트를 하나로 합치는 파일이 필요하다.
    //그 중에서 가장 대표가 되는 파일이 entry이다.
    entry: {
        //app는 나중에 하나로 합쳐질 파일의 이름이다.
        app: path.join(__dirname,'main.js'),
    },

    // 모듈이 핵심!!
    module: {
        //rules는 스크립트를 합칠때!! 어떻게 합칠지? 처리할건지 정한다.
        rules:[{
            //웹팩은 자바스크립트 처리한다. .vue는 자바스크립트가 아니기 때문에 에러가 뜸
            
            //정규표현식 -> 파일명이 .vue로 끝나는 파일 
            //$가 정규표현식에서는 끝을 의미한다.
            //.vue로 끝나는 파일은 vue-loader가 처리한다.
            test: /\.vue$/,
            //npm install vue-loader -D
            loader: 'vue-loader'
            //loader 대신 use를 사용해도 된다.
            //npm i vue-template-compiler -D를 설치해야한다
            //여기서 vue-template-compiler는 항상 vue랑 버전이 일치해야한다.
            //npm i vue@2.7.0 이런식(@)으로 특정버전을 다운 받을수 있다.
        }],

    },

    plugins: [
        new VueLoaderPlugin()
    ],
    output: {           //나중에 위에 있는 app이 name에 들어간다.
        filename : '[name].js',

        //dist(임의지정)라는 폴더가 생기고 app.js가 최종결과물로 나온다.
        //절대경로로 지정해야한다.
        //노드에서 path라는 모듈을 이용하면 간편하다.
        //현재 경로는 __dirname 이렇게 접근이 가능하다. 뒤에 경로를 쓰면 합쳐준다.
        //현재경로는 숫자야구폴더이고 그 안에 있는 dist폴더로 경로가 설정된다.
        path : path.join(__dirname, 'dist')
    },
};

//기본적으로 entry부터 시작해서 특이한것을 만나면 module의 rules를 통해서 처리하고
//최종결과물로 output이 나온다.
//변할때마다 빌드를 다시해주어야한다. 기존에 빌드했던것이 남아있어서 정상적으로 작동하지 않는다.