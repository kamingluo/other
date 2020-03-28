Component({
    properties: {
        adData: Object,
    },
    attached: function () {
        this.setData({
            adID: this.dataset.id
        });
    },
    methods: {
        clickAd(e) {
          // console.log("点击微量小程序广告",e)
            if(e.currentTarget.dataset.type==='insert'){
                this.triggerEvent('close')
            }
            this.triggerEvent('click');
        },
        close() {
            this.triggerEvent('close')
        }
    }
});