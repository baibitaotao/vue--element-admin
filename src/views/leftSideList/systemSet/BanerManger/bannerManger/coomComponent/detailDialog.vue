<template>
<div class="bannerDetail">
<el-dialog
            title="详情页"
            :visible.sync="dialogVisible">
            <span class="title">资金信息 <i class="leftRed"></i></span>
            <el-row>
                  
                   <el-col :span="10" v-for="(item,key,index) in detailsData" :key="index" style="width:50%;height:100%">
                     <div class="show_ditals" >
                       <div style="borderRight:1px solid #ddd">{{key|detailsText}}</div>
                       <div>{{item}}</div>
                      </div>
                   </el-col>
             </el-row>

            <div style="marginTop:20px">
              <span class="title">审核信息 <i class="leftRed"></i></span>
               <el-timeline :reverse="reverse">
                   <el-timeline-item
                     v-for="(activity, index) in activities"
                     :key="index"
                     :timestamp="activity.timestamp">
                     {{activity.content}}
                   </el-timeline-item>
                </el-timeline>
              </div>

            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
</el-dialog>

</div>
     
</template>

<script>
export default {
    props:{
     seletedItem:{
        type:Array,
      }
    },
    filters: {
       detailsText(value){
         switch (value) {
           case 'bannerId':
              return 'banner账号'
           case 'content':
               return"内容";   
           case 'pictureId':
              return '图片Id'
            case 'pictureUrl':
              return '图片url'
            case 'publishTime':
              return '发布时间'
             case 'status':
                return "状态码";  
             case 'statusName':
                return "状态";
             case 'summary':
                return"摘要";
            case 'title':
                return "标题";
            case 'url':
               return"地址";
        }
      }  
    },
    data () {
        return {
            dialogVisible:false,
            detailsData:{},
            tableData:[],
            reverse: true,
            activities: [{
              content: '活动按期开始',
              timestamp: '2018-04-15'
             }, 
             {
            content: '通过审核',
            timestamp: '2018-04-13'
            }, 
            {
             content: '创建成功',
             timestamp: '2018-04-11'
        }]
        }
    },
    methods: {
       isShowDialog(){
          this.getDetail()
        }, 
        getDetail(){
            this.$store.dispatch('banngerManger/bannerDetail',this.seletedItem[0].bannerId).then(res => {
                console.log(res)
                this.detailsData.bannerId = res.data.bannerId
                this.detailsData.content = res.data.content
                this.detailsData.pictureId = res.data.pictureId
                this.detailsData.pictureUrl = res.data.pictureUrl
                this.detailsData.publishTime = res.data.publishTime
                this.detailsData.status = res.data.status
                this.detailsData.statusName = res.data.statusName
                this.detailsData.summary = res.data.summary
                this.detailsData.title = res.data.title
                this.detailsData.url = res.data.url
                this.dialogVisible =  !this.dialogVisible    
            })
        }  
    }

}
</script>


<style lang="scss">

  .bannerDetail{
    .el-dialog__header{
        text-align: center;
        background:rgba(180,45,40,1);
        border-radius:4px;
        >span{
          color: #fff;
        }
        >button{
          >i{
               color: #ffffff;
          }
        }
    }
    .el-dialog{
    width: 90%;
    }
  .el-row{
    border-bottom: 1px solid #ddd
    }
    
}


</style>



<style lang="scss" scoped>

.bannerDetail{
.title{
    width:82px;
    height:21px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:53px;
    margin-bottom: 10px;
    position: relative;
    .leftRed{
        position: absolute;
        left:-10px;
        top:5px;
        width: 3px;
        height: 17px;
        background:rgba(180,45,40,1);
    }
}

}

.show_ditals{
  display: flex;
  border-top: 1px solid #DDDDDD;

  >div{
    line-height: 100%;
    padding: 17px 0;
  }

  :nth-child(odd){
  padding-right: 20px;
  background-color:rgba(248,248,249,1);
  width:100px;
  text-align: right
} 

  :nth-child(even){
  background-color:rgba(255,255,255,1);
  text-align: right;
  padding-left:10px;
} 



}








// .show_ditals{
//   display: flex;
//   border:1px solid #ccc;
//   :nth-child(odd){
//     padding-left: 5px;
//     background-color:rgba(255,255,255,1);
//   }
//   :nth-child(even){
//     padding-left: 10px;
//     transform: translateX(-1px)
//   }
//   >div{
//     padding: 20px 0;

//     flex:1;
//   }
// }
</style>
