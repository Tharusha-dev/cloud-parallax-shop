<script lang="ts">
import { onMount } from "svelte";

let rangeInputMinEl:HTMLInputElement | undefined;
let rangeInputMaxEl:HTMLInputElement | undefined;

export let rangeInputMax = 1000;
export let rangeInputMin = 0;

let priceInputMinEl:HTMLInputElement | undefined;
let priceInputMaxEl:HTMLInputElement | undefined;
let priceInputMin = 0;
let priceInputMax = 1000;



let rangeEl:HTMLElement | undefined;
let priceGap = 100;

let minPrice = 0;
let maxPrice = 1000;
let minVal = 0;
let maxVal = 1000;

function updateSlider() {

  if(rangeEl && rangeInputMaxEl && rangeInputMinEl){

    let minMax = Number(rangeInputMinEl.max);
    let maxMax = Number(rangeInputMaxEl.max)

    rangeEl.style.left = (minPrice / minMax) * 100 + "%";
    rangeEl.style.right = 100 - (maxPrice / maxMax) * 100 + "%";
  }

}

function changeRange() {
  if (minPrice !== undefined && maxPrice !== undefined && rangeInputMax !== undefined && rangeInputMin !== undefined) {
    let minVal = rangeInputMin;
    let maxVal = rangeInputMax;

    if (maxVal - minVal < priceGap) {
      rangeInputMin = maxVal - priceGap;
      rangeInputMax = minVal + priceGap;
    } else {

      let minMax = Number(rangeInputMinEl!.max);
      let maxMax = Number(rangeInputMaxEl!.max)

      priceInputMin = minVal;
      priceInputMax = maxVal;
      rangeEl!.style.left = (minVal / minMax) * 100 + "%";
      rangeEl!.style.right = 100 - (maxVal / maxMax) * 100 + "%";
    }
  }
}

function changeNumbers() {
  if (minVal !== undefined && maxVal !== undefined && rangeInputMax !== undefined && rangeInputMin !== undefined) {
    let minPrice = priceInputMin;
    let maxPrice = priceInputMax;

    let minMax = Number(rangeInputMinEl!.max);
    let maxMax = Number(rangeInputMaxEl!.max)

    if (maxPrice - minPrice >= priceGap && maxPrice <= maxMax) {
      rangeInputMin = minPrice;
      rangeEl!.style.left = (minPrice / minMax) * 100 + "%";
      rangeInputMax = maxPrice;
      rangeEl!.style.right = 100 - (maxPrice / maxMax) * 100 + "%";
    }
  }
}

onMount(() => {
  // let minPrice = parseInt(priceInputMin);
  // let maxPrice = parseInt(priceInputMax);

  // let minVal = parseInt(rangeInputMin);
  // let maxVal = parseInt(rangeInputMax);

  updateSlider()
})


</script>


<div class="wrapper">
 
    <div class="price-input flex-col xl:flex-row" >
      <div class="field">
        <span>Min</span>
        <input  bind:this={priceInputMinEl} type="number" class="input-min" bind:value={priceInputMin} on:input={()=>{changeNumbers()}}>
      </div>
      <div class="separator">-</div>
      <div class="field">
        <span>Max</span>
        <input bind:this={priceInputMaxEl} type="number" class="input-max" bind:value={priceInputMax} on:input={()=>{changeNumbers()}}>
      </div>
    </div>
    <div class="slider">
      <div bind:this={rangeEl} class="progress"></div>
    </div>
    <div class="range-input" >
      <input bind:this={rangeInputMinEl} type="range" class="range-min" min="0" max="1000" bind:value={rangeInputMin} on:input={()=>{changeRange()}} step="100">
<input bind:this={rangeInputMaxEl} type="range" class="range-max" min="0" max="1000" bind:value={rangeInputMax}  on:input={()=>{changeRange()}} step="100">
    </div>
  </div>


<style>

.wrapper {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 20px 25px 40px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
}

.price-input {
  width: 100%;
  display: flex;
  margin: 30px 0 35px;
}
.price-input .field {
  display: flex;
  width: 100%;
  height: 45px;
  align-items: center;
}
.field input {
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 70%;
  margin-left: 12px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #999;
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.price-input .separator {
  width: 130px;
  display: flex;
  font-size: 19px;
  align-items: center;
  justify-content: center;
}
.slider {
  height: 5px;
  position: relative;
  background: #ddd;
  border-radius: 5px;
}
.slider .progress {
  height: 100%;
  left: 25%;
  right: 25%;
  position: absolute;
  border-radius: 5px;
  background: #17a2b8;
}
.range-input {
  position: relative;
}
.range-input input {
  position: absolute;
  width: 100%;
  height: 5px;
  top: -5px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
input[type="range"]::-webkit-slider-thumb {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background: #17a2b8;
  pointer-events: auto;
  -webkit-appearance: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
input[type="range"]::-moz-range-thumb {
  height: 17px;
  width: 17px;
  border: none;
  border-radius: 50%;
  background: #17a2b8;
  pointer-events: auto;
  -moz-appearance: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
</style>