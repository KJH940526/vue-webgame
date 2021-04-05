<template>
<!-- 컴포넌트도 마찬가지로 최상단에 태그하나로 감싸준다. -->
    <div>
        <h1>{{result}}</h1>
        <!-- <form v-on:submit="onsubmitForm"> e.preventDefault() 막아주기-->
        <form @submit.prevent="onsubmitForm">
            <input ref="answer" minlength="4" maxlength="4" v-model="value"/>
            <button type="sumbit">입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
                <!-- try같은 예약어는 안됌 -->
            <li v-for="t in tries"> 
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
//다른 컴포넌트에 사용할수 있기 때문에 methods에 묶지 않았음!
  const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
      const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
    }
    return array;
  };

//Vue.component('wordRelay',{ //이 부분이 export default로 바뀐다.
export default {
    data(){
        return {
            answer: getNumbers(), // ex) [1,5,3,4]
            tries: [], // 시도 수
            value: '', // 입력
            result: '', // 결과
        }

    },
    methods: {
        onsubmitForm(e){
            // e.preventDefault();
            if(this.value === this.answer.join('')){    // 정답 맞췄으면
                this.tries.push({
                    try: this.value,
                    result: '홈런'
                });
                this.result = "홈런";
                alert('홈런!!')
                this.value = '';
                this.answer = getNumbers();
                this.tries = [];
                this.$refs.answer.focus();
            } else { // 정답 틀렸을 때
                    if (this.tries.length >= 9) { // 10번째 시도
                        this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다!`;
                        alert('게임을 다시 시작합니다.');
                        this.value = '';
                        this.answer = getNumbers();
                        this.tries = [];
                        this.$refs.answer.focus();
                    }
                //같은 변수라도 화면에 보여지면 data이고
                //화면과는 관련이 없으면 그냥 변수 사용하면된다.

                let strike = 0;
                let ball = 0;
                const answerArray = this.value.split('').map(v=> parseInt(v))
                for ( let i = 0; i<4; i += 1){
                    if(answerArray[i] === this.answer[i]){ // 숫자 자릿수 모두 정답
                        strike++;
                    } else if (this.answer.includes(answerArray[i])){ // 숫자만 정답
                        ball++;
                    }
                }
                this.tries.push({
                    try: this.value,
                    result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                });
            }


            console.log(this.tries);
            this.value = "";
            this.$refs.answer.focus();
        }
    },
}
</script>

<style>

</style>
