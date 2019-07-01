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
          if(this.checkedId){
             let data = {
                customerManager:this.checkedId,
                rowVersion:this.seletedItem[0].rowVersion,
                userId:this.seletedItem[0].userId
             }
               this.$store.dispatch('userAuditManger/assignCustomerManager',data).then(res => {
                  if(res.status == '0'){
                      this.$message({
                        showClose: true,
                        message: '分配' + res.msg,
                        type: 'success'
                     });
                  this.isShowDialog()
                   this.$emit('refresh')
                  }
               }).catch(err => {
                  console.log(err)
               })
          }else{
              this.$message({
                   showClose: true,
                   message: '请选择客户经理',
                   type: 'warning'
                  });  
         }
          
       },
       handleClick(data, checked, node){
          if(checked == true){
              this.checkedId = data.id;
              this.$refs.treeForm.setCheckedNodes([data]);
            }
          },
       nodeClick(data,checked,node){
         this.$refs.treeForm.setCheckedNodes([data]);
       },
       isShowDialog(){
          this.dialogVisible =  !this.dialogVisible
          this.getlist()
        },
        getlist(){
             this.$store.dispatch('userAuditManger/selectOrgUserByRoleCode',{roleCode:'12'}).then(res => {
                this.data = res.data.treeData
             })
         }

        } 
}
</script>
