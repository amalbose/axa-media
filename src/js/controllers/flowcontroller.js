class FlowController {

    constructor(totalCount, callBackFun) {
        this.totalCount         = totalCount;
        this.callBackFun        = callBackFun;
        this.curCount           = 0;
    }

    incrementCount(callback){
        this.curCount = this.curCount + 1;
        if(callback)
            callback(this.curCount);
        this.checkCallback();
    }

    checkCallback(){
        if(this.curCount >= this.totalCount) {
            this.callBackFun();
        }
    }
}

module.exports.FlowController = FlowController;