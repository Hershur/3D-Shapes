function randomInteger(min, max) {
    return Math.abs(Math.floor(Math.random() * (max - min + 1))) + min;
}

function randomWidthHeightGenerator (base = {w: 1920, h: 700, r: 100}){
    const randomWidth = randomInteger(150, base.w);
    const randomHeight = randomInteger(75, base.h);
    const randomRadius = randomInteger(20, base.r);
    const randomCylinderHeight = randomInteger(20, base.h/2);
    const width = randomHeight > randomWidth ? randomHeight : randomWidth;
    const height = randomHeight > randomWidth ? randomWidth : randomHeight;

    return {w: width, h: height, r: randomRadius, hc: randomCylinderHeight};
}

export default {
    randomWidthHeightGenerator
}