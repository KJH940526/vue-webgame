import Vue from 'vue'

//NumberBaseball.vue를 main.js와 연결해준다.
//원래는 .vue 확장자가 있어야하는데 웹팩 resolve.extensions 처리했기 때문에 안써도 된다.

// 자바스크립트에서 모듈시스템
// export default에 들어온 객체를 가져온다.
import NumberBaseball from './NumberBaseball'



//이것은 el 역할을 한다.
// vue 인스턴스를 여기다가 만들고
// vue 컴포넌트는 NumberBaseball.vue에서 만든다.
new Vue(NumberBaseball).$mount('#root')