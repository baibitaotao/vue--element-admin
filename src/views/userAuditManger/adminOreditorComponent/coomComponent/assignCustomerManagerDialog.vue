<template>
         <el-dialog
            title="分配客户经理"
            :visible.sync="dialogVisible">

             <div>
             <el-tree
               :data="data"
               show-checkbox
               default-expand-all
               node-key="id"
               ref="treeForm"
               check-strictly
               :highlight-current='true'
               @check-change="handleClick" 
               @node-click="nodeClick"
               :props="defaultProps">
             </el-tree>
             </div>  

            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
</template>


<script>
export default {
    props:{
     seletedItem:{
        type:Array,
      }
    },
    data () {
        return {
              dialogVisible:false,
              data:[],
              checkedId:null,
              defaultProps: {
                children: 'children',
                label: 'label'
               }    
        }
    },
      methods: {
       confirm(){
          console.log(this.checkedId)
       },
       handleClick(data, checked, node){
          if(checked == true){
              this.checkedId = data.id;
              this.$refs.treeForm.setCheckedNodes([data]);
            }
          },
       nodeClick(data,checked,node){
          console.log(data)
         this.checkedId = data.id
         this.$refs.treeForm.setCheckedNodes([data]);
       },
       isShowDialog(){
          this.dialogVisible =  !this.dialogVisible
          this.getlist()
        },
        getlist(){
             this.$store.dispatch('userAuditManger/assignCustomerManager',{roleCode:'12'}).then(res => {
                this.data = res.data.treeData
             })
         }

        } 
}
</script>
