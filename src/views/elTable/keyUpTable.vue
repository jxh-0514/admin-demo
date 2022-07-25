<template>
	<div>
		<!-- <el-form label-width='500px' style='display:flex' class='fromclass aline'>
			<el-form-item label="公司" required>
				<el-input style='width:200px' v-model="purchase" autocomplete="off" @keyup.native.enter="getpurchaseevet('buyerref')" ref='purchaserel' clearable></el-input>
			</el-form-item>
			<el-form-item label="人员">
				<el-input style='width:200px' v-model="buyer" autocomplete="off" ref='buyerref' clearable></el-input>
			</el-form-item>
		</el-form> -->

		<el-button @click="add">增加</el-button>
		<el-table ref="multipleTable" :data="datalist2" border v-loading="loadings" element-loading-text="拼命加载中"
			style='margin-top: 0.1rem;' :row-style="rowStyle" @row-dblclick="handledbsupplier">
			<el-table-column type="index" label="序号" width="70" align="center"></el-table-column>

			<el-table-column label="名称" prop="company">
				<template v-slot="scope">
					<el-input size="mini"  ref="input" v-model="scope.row.company"
						v-if="scope.$index == 0 && flag">
					</el-input>
					<span v-else>{{ scope.row.company }}</span>
				</template>
			</el-table-column>

			<el-table-column label="联系人" prop="username" align="center">
				<template v-slot="scope">
					<el-input size="mini"  ref="input2" v-model="scope.row.username"
						v-if="scope.$index == 0 && flag2">
					</el-input>
					<span v-else>{{ scope.row.username }}</span>
				</template>
			</el-table-column>
			<el-table-column label="联系人电话" prop="userphone" align="center"></el-table-column>
		</el-table>

		<el-dialog title="公司信息" :visible.sync="popupsupplier" width="90%" :close-on-click-modal="false">
			<!-- <el-button @click="add">增加</el-button> -->
			<el-table ref="multipleTabless" :data="datalist" border v-loading="loadings" element-loading-text="拼命加载中"
				style='margin-top: 0.1rem;' :row-style="rowStyle" @row-dblclick="handledbsupplier"  @selection-change="handleSelectionChange">
				<el-table-column label="全选" type="selection" width="55"></el-table-column>
				<el-table-column type="index" label="序号" width="70" align="center"></el-table-column>				
				<el-table-column label="名称" prop="company" align="center"></el-table-column>
				<el-table-column label="联系人" prop="username" align="center"></el-table-column>
				<el-table-column label="联系人电话" prop="userphone" align="center"></el-table-column>
			</el-table>
			<el-pagination
				background
				@prev-click="prevClick"
				@next-click="nextClick"
				:current-page="page"
            	:page-sizes="[5, 10, 15, 20]"
            	:page-size="size"
				layout="total, sizes, prev, pager, next"
				:total="datalist.length">
			</el-pagination>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			purchase: '',//公司名称
			purchasecode: '',//公司code
			buyer: '',//人员
			loadings: false,
			popupsupplier: false,
			datalist: [
				{ code: 'ad00001', company: 'xxxx公司', username: '张三', userphone: '156********' },
				{ code: 'ad00002', company: 'xxxx公司', username: '李四', userphone: '156********' },
				{ code: 'ad00003', company: 'xxxx公司', username: '王二', userphone: '156********' },
				{ code: 'ad00004', company: 'xxxx公司', username: '麻子', userphone: '156********' },
				{ code: 'ad00005', company: 'xxxx公司', username: '张三1', userphone: '156********' },
				{ code: 'ad00006', company: 'xxxx公司', username: '李四1', userphone: '156********' },
				{ code: 'ad00007', company: 'xxxx公司', username: '王二1', userphone: '156********' },
				{ code: 'ad00008', company: 'xxxx公司', username: '麻子1', userphone: '156********' },
				{ code: 'ad00009', company: 'xxxx公司', username: '张三2', userphone: '156********' },
				{ code: 'ad000010', company: 'xxxx公司', username: '李四2', userphone: '156********' },
				{ code: 'ad000011', company: 'xxxx公司', username: '王二2', userphone: '156********' },
				{ code: 'ad000012', company: 'xxxx公司', username: '麻子2', userphone: '156********' },
				{ code: 'ad000013', company: 'xxxx公司', username: '张三3', userphone: '156********' },
				{ code: 'ad000014', company: 'xxxx公司', username: '李四3', userphone: '156********' },
				{ code: 'ad000015', company: 'xxxx公司', username: '王二3', userphone: '156********' },
				{ code: 'ad000016', company: 'xxxx公司', username: '麻子3', userphone: '156********' },
				{ code: 'ad000017', company: 'xxxx公司', username: '张三4', userphone: '156********' },
				{ code: 'ad000018', company: 'xxxx公司', username: '李四4', userphone: '156********' },
				{ code: 'ad000019', company: 'xxxx公司', username: '王二4', userphone: '156********' },
				{ code: 'ad000020', company: 'xxxx公司', username: '麻子4', userphone: '156********' },
			],//这个数据是请求过来的数据，我写死了
			datalist2: [
				{ code: 'ad00001', company: 'xxxx公司', username: '张三', userphone: '156********' },
				{ code: 'ad00002', company: 'xxxx公司', username: '李四', userphone: '156********' },
				{ code: 'ad00003', company: 'xxxx公司', username: '王二', userphone: '156********' },
			],//这个数据是请求过来的数据，我写死了
			datarow: '', // 当前已选择行
			dataindex: 0, // 当前选择行的index
			refenter: '',//光标移动
			flag: false,
			flag2: false,
			aaa: { code: 'ad00003', company: 'xxxx公司', username: '王二', userphone: '156********' },
			multipleSelection: [],   //多选存数据
			page: 1,
			size: 5,
		}
	},
	created() {
		// this.changfouce();
	},
	mounted() {
		// setTimeout(() => {
		// 	addEventListener('keyup', this.keyUp)//创建监听键盘事件
		// }, 100)
		this.$nextTick(() => {
			addEventListener('keyup', this.keyUp)//创建监听键盘事件
			console.log('创建键盘监听');
		})

	},
	methods: {
		keyUp(e) {
			console.log('keyCode', e.keyCode);
			// 表格为空，不执行下方 
			if (this.datalist.length == 0) {
				return
			}
			if (e.keyCode == 40) { // 下键
				if (this.dataindex == this.datalist.length - 1) {
					this.dataindex = 0  //当选中的index与数据的天数相等时，在按下键就要返回第一个
					this.datarow = this.datalist[0]
					let height = 47  //计算表格一行的高度，用于出现滚动条的时候，页面展示选中的某一行
					this.$refs.multipleTabless.bodyWrapper.scrollTop = -(height * (this.datalist.length - 6));
				} else {
					if (this.dataindex > 6 && this.dataindex < 14) {
						let height = 47  //计算选中行离表格顶部的距离
						this.$refs.multipleTabless.bodyWrapper.scrollTop = (height * (this.dataindex - 6));
					}
					this.dataindex = this.dataindex + 1
					this.datarow = this.datalist[this.dataindex]// 当前已选择行
				}
			}
			else if (e.keyCode == 38) { // 上键
				if (this.dataindex == 0) {  //当选中的index等于0时，说明到顶了，再按上键就要返回到表格的底部，并计算距离表格顶部的距离
					this.dataindex = this.datalist.length - 1
					this.datarow = this.datalist[this.dataindex]// 当前已选择行
					let height = 47

					this.$refs.multipleTabless.bodyWrapper.scrollTop = (height * (this.datalist.length - 6));
				} else {
					this.dataindex = this.dataindex - 1
					this.datarow = this.datalist[this.dataindex]
					let height = 47
					this.$refs.multipleTabless.bodyWrapper.scrollTop += -(height * (1));
				}
			} else if (e.keyCode == 37) {  //左键页数 -1
				// this.$refs.multipleTabless.prevClick()
				this.prevClick()				
			} else if (e.keyCode == 39) {  //左键页数 +1
				// this.$refs.multipleTabless.nextClick()
				this.nextClick()
			} else if (e.keyCode == 13) {   //enter事件
				if (this.flag && this.popupsupplier) {
					this.datalist2[0] = { ...this.datalist[this.dataindex] }
					this.datalist2 = [...this.datalist2]
					this.flag = false
                    this.flag2 = true
					this.popupsupplier = false
					this.$nextTick((x)=>{   //数量聚焦
                        this.$refs.input2.focus();
                    })
				} else if (this.flag) {
					this.addB()
				} else if (this.flag2) {
					this.$message.success('添加成功')
					this.flag2 = false
					this.add()
				}

			} else if (e.keyCode == 113) {   //f2事件
				this.add()
			} else if (e.keyCode == 32) {    // 空格多选								
				// 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
				this.$refs.multipleTabless.toggleRowSelection(this.datalist[this.dataindex]);
				this.handleSelectionChange
				console.log('多选', this.multipleSelection);
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val
			console.log('handleSelectionChange', this.multipleSelection);
		},
		//改变表格选中某一行    的颜色
		rowStyle(row) {
			if (row.rowIndex == this.dataindex) {
				return {
					color: '#F56C6C'
				}
			}

		},
		//双击选择某一行
		handledbsupplier(row) {
			this.purchase = row.company
			this.purchasecode = row.code
		},
		//公司回车事件
		getpurchaseevet(nextRef) {
			this.refenter = nextRef  //下个光标移动到那个输入框
			this.popupsupplier = true//弹窗
			this.datalist = this.datalist
			addEventListener('keyup', this.keyUp)  //打开键盘事件
			console.log('keyup');
		},
		add() {
			if(this.flag) {
				this.$message.warning('请添加料号')
			} else {
				this.datalist2.unshift({})
				this.flag = true
				console.log(111, this.datalist);
				this.$nextTick((x) => {   //正确写法
					this.$refs.input.focus();
				})
			}			
		},
		hideInput() {

		},
		changfouce() {
			this.$nextTick((x) => {   //正确写法
				this.$refs.input.focus();
			})
		},
		addB() {
			// this.flag = false
			this.popupsupplier = true
			console.log(2222);
			// this.add()
			// this.datalist[0] = this.aaa
			// this.flag2 = true
			// this.$nextTick((x) => {   //正确写法
			// 	this.$refs.input.focus();
			// })
			// this.getpurchaseevet()
		},
		// 上一页
		prevClick() {
			if (this.page > 1) {
				this.page--
			} else {
				return this.$message.warning('到头了')
			}				
		},
		//下一页
		nextClick() {
			if (this.page < Math.ceil(this.datalist.length/this.size)) {
				this.page++
			} else {
				return this.$message.warning('到底了')
			}			
		}

	}
}

</script>

<style>
</style>