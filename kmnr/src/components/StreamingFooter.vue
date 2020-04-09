<template>
    <div>
        <div class="stream-container"></div>
        <div id="timer">0:00</div>
        <div id="duration">0:00</div>
        <div class="controlsOuter">
            <div class="controlsInner">
                <div id="loading"></div>
                <div class="btn" id="playBtn"></div>
                <div class="btn" id="pauseBtn"></div>
                <div class="btn" id="prevBtn"></div>
                <div class="btn" id="nextBtn"></div>
            </div>
            <div class="btn" id="playlistBtn"></div>
            <div class="btn" id="volumeBtn"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: "StreamingFooter",
    });
</script>

<style lang="scss" scoped>
.stream-container{
    position: absolute;
    bottom: 0%;
    background-color: black;
    width: 100%;
    height: 15%;
}
#timer {
  position: absolute;
  bottom: 10%;
  text-align: left;
  font-size: 26px;
  font-weight: 300;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.33);
}
#duration {
  position: absolute;
  bottom: 10%;
  width: 100%;
  text-align: right;
  font-size: 26px;
  font-weight: 300;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.33);
}
.controlsOuter {
  position: absolute;
  width: 100%;
  height: 70px;
  bottom: 3%;
}
.controlsInner {
  position: absolute;
  width: 340px;
  height: 70px;
  left: 50%;
  margin: 0 -170px;
}
.btn {
  position: absolute;
  cursor: pointer;
  opacity: 0.9;
  -webkit-filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.33));
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.33));
  -webkit-user-select: none;
  user-select: none;
}
.btn:hover {
  opacity: 1;
}
#playBtn {
  background-image: url("../assets/play.png");
  width: 69px;
  height: 70px;
  left: 50%;
  margin: auto -34.5px;
}
#pauseBtn {
  background-image: url("../assets/pause.png");
  width: 69px;
  height: 70px;
  left: 50%;
  margin: auto -34.5px;
  display: none;
}
#prevBtn {
  background-image: url("../assets/prev.png");
  width: 35px;
  height: 35px;
  left: 0;
  top: 50%;
  margin: -17.5px auto;
}
#nextBtn {
  background-image: url("../assets/next.png");
  width: 35px;
  height: 35px;
  right: 0;
  top: 50%;
  margin: -17.5px auto;
}
#volumeBtn {
  background-image: url("../assets/volume.png");
  width: 35px;
  height: 35px;
  top: 50%;
  right: 3%;
  margin: -17.5px auto;
}
</style>