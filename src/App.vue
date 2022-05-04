<template>
  <h1>BillSplitter</h1>

  <div class="app">
    <div class="left_side">
      <div class="input_box">
        <label>Bill</label>
        <input type="number" placeholder="$99.99" v-model="bill" class="bill">
      </div>

      <div class="input_box tip_box">
        <label>Select tip %</label>
        <div class="tip_section">
          <div class="tip" v-for="tip in availableTips" :key="tip.tip" :class="tip.isActive ? 'active' : ''" @click="handleShowTip(tip)">
            <p>{{ tip.tip }}%</p>
          </div>
        </div>
      </div>

      <div class="input_box">
        <label>Number of People</label>
        <input type="number" placeholder="0" v-model="people" class="people">
      </div>
      <button class="calculate" @click="handleCalculateTip">Calculate</button>
    </div>

    <div class="right_side">
      <div class="sum">
        <h3>Tip Amount <span class="inside_tip">/ person</span></h3>
        <span class="money">${{tip_amount}}</span>
      </div>
      <div class="sum">
        <h3>Total <span class="inside_tip">/ person</span></h3>
        <span class="money">${{total_amount}}</span>
      </div>
      <button class="reset" @click="resetInputs">Reset</button>
    </div>
    <div class="error" v-if="error">
      <p>{{error}}</p>
    </div>
  </div>
</template>

<script>

import {computed, ref} from "vue";
import {useStore} from 'vuex';
export default {
  name: 'App',
  setup() {
    const store = useStore();
    const availableTips = ref([
      {
        tip: 5,
        isActive: false
      },
      {
        tip: 10,
        isActive: false
      },
      {
        tip: 15,
        isActive: false
      },
      {
        tip: 25,
        isActive: false
      },
      {
        tip: 50,
        isActive: false
      },
      {
        tip: 100,
        isActive: false
      },
    ])
    const bill = ref('')
    const tip_sum = ref('');
    const people = ref('');
    const error = ref('');

    const handleShowTip = (tip) => {
      availableTips.value.forEach(x => x.isActive = false);
      tip.isActive = !tip.isActive;
      tip_sum.value = tip.tip;
    }

    const handleCalculateTip = () => {
      if(bill.value !== '' && people.value !== '' && parseInt(people.value) > 0) {
        store.commit('calculateTip', {
          billValue: parseFloat(bill.value),
          tipValue: parseInt(tip_sum.value),
          peopleValue: parseInt(people.value)
        })
        error.value = ''
      } else {
        error.value = 'All fields must be filled.'
      }
    }

    const tip_amount = computed(() => store.state.tip_amount.toFixed(2));
    const total_amount = computed(() => store.state.total_amount.toFixed(2));

    const resetInputs = () => {
      bill.value = '';
      tip_sum.value = '';
      people.value = '';
      error.value = '';
      availableTips.value.forEach(x => x.isActive = false);
      store.state.tip_amount = 0;
      store.state.total_amount = 0
    }


    return {handleCalculateTip, availableTips, bill, tip_sum, people, error, handleShowTip, store, resetInputs, tip_amount, total_amount}
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #C5E4E7;
}

.app {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 20px auto;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
}

.left_side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0;
}

.tip_box {
  max-width: 380px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.tip_section {
  display: flex;
  flex-wrap: wrap;
}

.tip {
  margin: 10px;
  width: 80px;
  height: 30px;
  background-color: #03464E;
  color: white;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  border-radius: 8px;
}

input {
  display: block;
  width: 300px;
  height: 40px;
  border-radius: 8px;
  padding: 8px;
  border: 0;
  outline: 0;
  background-color: #F3F8FB;
}

.right_side {
  width: 100%;
  max-width: 400px;
  background-color: #0F676D;
  border-radius: 10px;
  color: white;
}

.inside_tip {
  display: block;
  font-size: .7em;
}

.sum {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.money {
  font-weight: bold;
  font-size: 2em;
}

.reset {
  display: block;
  margin: 100px auto 20px;
  width: 300px;
  height: 40px;
  border-radius: 8px;
  border: 0;
  outline: 0;
  background-color: #2AB3A3;
  color: white;
  cursor: pointer;
}

.active {
  background-color: #2AB3A3;
}

.error {
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translateX(-50%);
  color: crimson;
  font-size: 1em;
  font-weight: bold;
}

.calculate {
  border: 0;
  outline: 0;
  background-color: #2AB3A3;
  color: white;
  cursor: pointer;
  height: 40px;
  border-radius: 10px;
  margin-top: 10px;
}

@media screen and (min-width: 800px) {
  .app {
    flex-direction: row;
  }
  .left_side {
    margin-right: 100px;
  }

  .error {
    top: 70%;
    font-size: 2em;
  }
}
</style>
