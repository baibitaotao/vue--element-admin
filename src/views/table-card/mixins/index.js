export default {
  data() {
    return {

      addBtnList: [
        {
          title: '添加1',
          icon: 'el-icon-circle-plus-outline',
          methods: 'addItem'
        },
        {
          title: '添加2',
          icon: 'el-icon-circle-plus-outline',
          methods: 'addItem2'
        },
        {
          title: '添加3',
          icon: 'el-icon-circle-plus-outline',
          methods: 'addItem3'
        }
      ],
      columnData: [{
        logo: 'imgLogo',
        name: 'company',
        name1: 'company1'
      },
      {
        column: {
          column1: [{
            label: '项目状态',
            value: 'projectStatus'
          },
          {
            label: '立项日期',
            value: 'projectDate'
          },
          {
            label: '决策日期',
            value: 'decisionDate'
          },
          {
            label: '首次出资日期',
            value: 'initialContribution'
          }
          ],
          column2: [{
            label: '管理平台',
            value: 'managementPlatform'
          },
          {
            label: '拟投资金额',
            value: 'investmentAmount'
          },
          {
            label: '决策金额',
            value: 'decisionAmount'
          },
          {
            label: '累计出资金额',
            value: 'amount'
          }
          ],
          column3: [{
            label: '出资主体',
            value: 'investment'
          },
          {
            label: '占股比',
            value: 'ratio'
          },
          {
            label: '决策占比',
            value: 'ratio1'
          },
          {
            label: '项目经理',
            value: 'projectManager'
          }
          ]
        }
      }
      ],
      tableData: [
        {
          imgLogo: '',
          company: '金融有限公司',
          company1: '企业名称金融有限公司',
          projectStatus: '已入库',
          projectDate: '2019-03-21',
          decisionDate: '2019-03-21',
          initialContribution: '2019-03-21',
          managementPlatform: '元禾辰坤',
          investmentAmount: '1,258',
          decisionAmount: '1,258',
          amount: '1,258',
          investment: '正则',
          ratio: '2.36%',
          ratio1: '2.36%',
          projectManager: '苏丽'
        },
        {
          imgLogo: '',
          company: '金融有限公司',
          company1: '企业名称金融有限公司',
          projectStatus: '已入库',
          projectDate: '2019-03-21',
          decisionDate: '2019-03-21',
          initialContribution: '2019-03-21',
          managementPlatform: '元禾辰坤',
          investmentAmount: '1,258',
          decisionAmount: '1,258',
          amount: '1,258',
          investment: '正则',
          ratio: '2.36%',
          ratio1: '2.36%',
          projectManager: '苏丽'
        },
        {
          imgLogo: '',
          company: '金融有限公司',
          company1: '企业名称金融有限公司',
          projectStatus: '已入库',
          projectDate: '2019-03-21',
          decisionDate: '2019-03-21',
          initialContribution: '2019-03-21',
          managementPlatform: '元禾辰坤',
          investmentAmount: '1,258',
          decisionAmount: '1,258',
          amount: '1,258',
          investment: '正则',
          ratio: '2.36%',
          ratio1: '2.36%',
          projectManager: '苏丽'
        }
      ],
      acynData: {
        imgLogo: '',
        company: '金融有限公司',
        company1: '企业名称金融有限公司',
        projectStatus: '已入库',
        projectDate: '2019-03-21',
        decisionDate: '2019-03-21',
        initialContribution: '2019-03-21',
        managementPlatform: '元禾辰坤',
        investmentAmount: '1,258',
        decisionAmount: '1,258',
        amount: '1,258',
        investment: '正则',
        ratio: '2.36%',
        ratio1: '2.36%',
        projectManager: '苏丽'
      }
    }
  },
  created() {},
  watch: {},
  methods: {}
}
