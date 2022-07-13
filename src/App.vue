<script setup>
import {reactive, ref, unref, computed} from 'vue'
import {getRelativeValue, process, getAspectRatio, generatePathForTriangle , generateViewBox , generateRandomColor, getRandomStroke, getRandomArbitrary, randomOrTransparent, genHeight} from './randomUtils';
const Types = {
    Rect: 'rect',
    Circle: 'circle',
    Triangle: 'triangle'
}
const typesAsArray = [Types.Rect, Types.Circle, Types.Triangle];
const width = ref(100)
const height = ref(100);
const svgSrc = ref(null);
const isGrayscale = ref(true);
const figuresAmount = ref(getRandomArbitrary(4, 1));
const figures = reactive([]);

const center = computed(() => {return [Math.round(unref(width)/2), Math.round(unref(height)/ 2)]});

const viewBox = computed(() => generateViewBox(unref(width), unref(height)));
const getRandomFigure = (figure) => {
    console.log(center.value);
    const type = figure || typesAsArray[getRandomArbitrary(typesAsArray.length, 0)];
    // TODO: make it in percents
    const size =  getRelativeValue(getRandomArbitrary(20,40));
    let x ,y, path;
    if (type === Types.Rect) {
        x = getRelativeValue(center.value[0] - Math.round(size/2), 30);
        y = getRelativeValue(center.value[1]- Math.round(size/2), 30);
    }
    if (type === Types.Circle) {
        x = getRelativeValue(center.value[0], 30);
        y = getRelativeValue(center.value[1], 30);
    }
    if (type === Types.Triangle) {
        x = getRelativeValue(center.value[0], 30);
        y = getRelativeValue(center.value[1], 30);
        path = generatePathForTriangle(x,y,size)
    }
    return {
        type,x,y,size,path
    }
}

function generate() {
    console.log('geenrate');
    figures.splice(0);
    // figuresAmount.value = getRandomArbitrary(3, 2);
    figuresAmount.value = 3;
    for (let i=0; i < figuresAmount.value; i++) {
        figures.push(getRandomFigure(typesAsArray[i]))
    }
}
generate();
</script>
<template>
    <main>
        <h1>SVG placeholder generator</h1>
        <div class="svg-container" style="" ref="svgSrc">
            <svg :viewBox="viewBox" >
              <template v-for="figure in figures">
                  <rect v-if="figure.type === Types.Rect"
                    :height="figure.size"
                    :width="figure.size" :x="figure.x" :y="figure.y"
                    :stroke="generateRandomColor(isGrayscale)"
                    :stroke-width="getRandomStroke()"
                    :fill="randomOrTransparent(isGrayscale)"
                  />
                  <circle v-if="figure.type === Types.Circle"
                          :cx="figure.x"
                          :cy="figure.y"
                          :r="figure.size/2"
                          :fill="randomOrTransparent(isGrayscale)"
                          :stroke="generateRandomColor(isGrayscale)"
                          :stroke-width="getRandomStroke()" />
                  <polygon v-if="figure.type === Types.Triangle" :points="figure.path"
                           :stroke="generateRandomColor(isGrayscale)"
                           :stroke-width="getRandomStroke()"
                           :fill="randomOrTransparent(isGrayscale)"
                           />
              </template>
            </svg>
        </div>
        <button @click="generate">Refresh</button>
        <form>
            <div>
          <label for="width-input" >Width: </label>
          <input v-model="width" id="width-input" />
            </div>
            <div>
          <label for="height-input" >Height: </label>
          <input v-model="height" id="height-input" />
            </div>
            <div>
                <label for="height-input" >Grayscale: </label>
                <input v-model="isGrayscale" type="checkbox" />
            </div>
        </form>
        <div>
            <pre>
            <code>{{process(svgSrc?.innerHTML, 0)}}</code>
</pre>

        </div>
  </main>
</template>

<style>
@import './assets/base.css';

body {
    background-color: rgb(226,226,226)

}
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
    text-align: center;
}
.svg-container {
    width: 400px;
    height: 400px;
    margin: 30px auto;
    text-align: center;
    padding: 30px;
}
.svg-container svg {
    background-color: white;
    height: 100%;
}
</style>
