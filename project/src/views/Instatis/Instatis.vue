<template>
  <div>
    <page-header>
    <el-form label-width="120px" ref="term" :model="term"  :rules="termRules">
      <el-row :gutter="15">
        <el-col :span="8" :lg="6">
          <el-form-item label="资产编号">
            <el-input v-model="term.ZCBH" placeholder="请输入资产编号" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :lg="6">
          <el-form-item label="资产名称">
            <el-input v-model="term.ZCMC" placeholder="请输入资产名称" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8" :lg="6">
          <el-form-item label="型号">
            <el-input v-model="term.ZCXH" placeholder="请输入型号" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8" :lg="6">
          <el-form-item label="规格">
            <el-input v-model="term.GG" placeholder="请输入规格" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="6">
          <el-form-item label="入库数量(件)" prop="RKSL">
            <el-input v-model.number="term.RKSL" placeholder="请输入入库数量" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8" :lg="6">
          <el-form-item label="单价" prop="DJ">
            <el-input v-model="term.DJ" placeholder="请输入单价" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8" :lg="6">
          <el-form-item label="总价" prop="ZJ">
            <el-input v-model="term.ZJ" placeholder="请输入总价" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="6">
          <el-form-item label="供应商名称">
            <el-input v-model="term.GYSMC" placeholder="请输入供应商名称" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="6">
          <el-form-item label="资产来源">
             <el-select filterable v-model="term.ZCLY" placeholder="请选择资产来源" clearable style="width: 100%">
              <el-option v-for="item in zclyArr" :key="item.CODE" :label="item.NAME" :value="item.CODE" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="8" :lg="6">
          <el-form-item label="出厂日期">
           <el-date-picker v-model="term.CCRQ" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择出厂日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
         <el-col :span="8" :lg="6">
          <el-form-item label="入库日期">
           <el-date-picker v-model="term.RKRQ" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择出厂日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="6">
          <el-form-item label="使用年限">
           <el-input v-model="term.SYNX" placeholder="请输入使用年限" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="6">
          <el-form-item label="已使用年限">
           <el-input v-model="term.YYEAR" placeholder="请输入已使用年限" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="8" :lg="6">
          <el-form-item label="可报废日期">
           <el-date-picker v-model="term.BFRQ" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择可报废日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
         <el-col :span="8" :lg="6">
          <el-form-item label="保修截止日期">
           <el-date-picker v-model="term.BXJZRQ" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择保修截止日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
         <el-col :span="8" :lg="6">
          <el-form-item label="安置地点">
           <el-input v-model="term.AZDD" placeholder="请输入安置地点" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="6">
          <el-form-item label="采购员">
           <el-select filterable v-model="term.CGY" placeholder="请选择采购员" clearable style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
           <el-col :span="8" :lg="6">
          <el-form-item label="保管部门">
            <el-select filterable v-model="term.CGY" placeholder="请选择保管部门" clearable style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
            <el-col :span="8" :lg="6">
          <el-form-item label="部门主管">
           <el-select filterable v-model="term.BGBM" placeholder="请选择部门主管" clearable style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="6">
          <el-form-item label="保管人">
           <el-select filterable v-model="term.BGR" placeholder="请选择保管人" clearable  style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      
        <el-col :span="8" :lg="6">
          <el-form-item label="物质属性">
           <el-select filterable v-model="term.WZSX" placeholder="请选择物质属性" clearable  style="width: 100%">
              <el-option v-for="item in wzsxArr" :key="item.CODE" :label="item.NAME" :value="item.CODE"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :lg="6">
          <el-form-item label="校内分类">
           <el-input v-model="term.XNFL" placeholder="请输入校内分类" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
          <!-- <el-col :span="8" :lg="6">
          <el-form-item label="设备现状">
            <el-select filterable v-model="term.SBXZ" placeholder="请选择设备现状" clearable  style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
          <el-col :span="8" :lg="6">
          <el-form-item label="费用类型">
            <el-select filterable v-model="term.FYLX" placeholder="请选择费用类型" clearable  style="width: 100%">
              <el-option v-for="item in fylxArr" :key="item.CODE" :label="item.NAME" :value="item.CODE"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
          <el-col :span="8" :lg="6">
          <el-form-item label="使用方向">
            <el-select filterable v-model="term.SYFX" placeholder="请选择使用方向" clearable  style="width: 100%">
              <el-option v-for="item in syfxArr" :key="item.CODE" :label="item.NAME" :value="item.CODE"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="24">
          <el-button type="primary" @click="getTableData(true)" size="mini">
            <svg-icon icon-class="svg-search" /> 查询
          </el-button>
          <el-button type="danger" @click="resetTerm" size="mini">
            <svg-icon icon-class="svg-btn-reset" /> 重置
          </el-button>
         
        </el-col>
      </el-row>
    </el-form>
    </page-header>
    <div style="margin-bottom:10px">
         <el-button @click="addData" size="mini">
            <svg-icon icon-class="svg-btn-add" /> 入库
          </el-button>
         <el-button size="mini" type="primary" @click="exportData">
            <svg-icon icon-class="svg-btn-lmp" /> 导出
          </el-button>
    </div>
    <div class="jy-table">
      <el-table :data="tableData" border ref='tabletPX' @sort-change="changeSort" tooltip-effect='light' style="width: 100%; margin-top: 10px" v-loading="tableLoading">
         <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left"  class="demo-table-expand">
          <el-col :span="8">
            <el-form-item label="保管部门">
              <span>{{ props.row.BGBM }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="保管人">
            <span>{{ props.row.BGR }}</span>
          </el-form-item>
           </el-col>
           <el-col :span="8">
          <el-form-item label="部门主管">
            <span>{{ props.row.BMZG }}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="资产处记账人">
            <span>{{ props.row.ZCCJZR}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="规格">
            <span>{{ props.row.GG}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="型号">
            <span>{{ props.row.ZCXH}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="供应商名称">
            <span>{{ props.row.GYSMC}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="资产来源">
            <span>{{ props.row.ZCLY}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="出厂日期">
            <span>{{ props.row.CCRQ}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="使用年限">
            <span>{{ props.row.SYNX}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="已使用年限">
            <span>{{ props.row.YDAY}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="可报废日期">
            <span>{{ props.row.BFRQ}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="保修截止日期">
            <span>{{ props.row.BXJZRQ}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="物质属性">
            <span>{{ props.row.WZSX}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="校内分类">
            <span>{{ props.row.XNFL}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="设备状态">
            <span>{{ props.row.SBZT}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
          <el-form-item label="费用类型">
            <span>{{ props.row.FYLX}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
           <el-form-item label="使用方向">
            <span>{{ props.row.SYFX}}</span>
          </el-form-item>
          </el-col>
          <el-col :span="8">
           <el-form-item label="备注">
            <span>{{ props.row.BZ}}</span>
          </el-form-item>
          </el-col>
        </el-form>
      </template>
    </el-table-column>
        <el-table-column prop="ZCBH" label="资产编号"  width="120" sortable='custom'></el-table-column>
        <el-table-column prop="ZCMC" label="资产名称" :show-overflow-tooltip="true" sortable='custom'></el-table-column>
        <el-table-column prop="RKSL" label="库存数量(件)" width="120"></el-table-column>
        <el-table-column prop="DJ" label="单价" width="80"></el-table-column>
        <el-table-column prop="ZJ" label="总价"  width="80"></el-table-column>
        <el-table-column prop="RKRQ" label="入库日期" width="150" sortable='custom'></el-table-column>
        <el-table-column prop="AZDD" label="安置地点" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="CGY" label="采购员" width="120"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
             <el-button type="text" size="small" @click="editPX(scope.$index, scope.row)">
              未完成
            </el-button>
            <el-button type="text" size="small" @click="editZC(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button type="text" size="small" @click="delZC(scope.$index, scope.row)">
              删除
            </el-button>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination v-if="totalNum" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 15,20 ]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
      </el-pagination>
    </div>

    <float-pane v-model="showPane" @on-break="breakContent">
      <div slot="heard">{{heard}}</div>
      <div>
       <el-tabs v-model="activeName" type="card" @tab-click="handleChange">
        <el-tab-pane label="资产信息" name="zcxx">
          <el-form ref="formZCXX" :model="formZCXX" label-width="120px" :rules="formZCXXRules">
            <el-row>
        <el-col :span="12">
          <el-form-item label="资产编号" prop="zcbh" v-if="this.formZCXX.kcid">
            <el-input v-model="formZCXX.zcbh" placeholder="请输入资产编号" clearable style="width: 100%" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="资产名称" prop="zcmc">
            <el-input v-model="formZCXX.zcmc" placeholder="请输入资产名称" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="型号">
            <el-input v-model="formZCXX.zcxh" placeholder="请输入型号" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="规格">
            <el-input v-model="formZCXX.gg" placeholder="请输入规格" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入库数量(件)" prop="rksl">
            <!-- <el-input v-model="formZCXX.RKSL" placeholder="请输入入库数量" clearable style="width: 100%"></el-input> -->
            <el-input-number style="width: 100%" v-model="formZCXX.rksl" @change="createZJ" :precision="0" :min="0" :max="9999999999" label="请输入入库数量"></el-input-number>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="单价" prop="dj">
            <el-input-number style="width: 100%" v-model="formZCXX.dj" @change="createZJ" :precision="2" :min="0" :max="9999999999" label="请输入单价"></el-input-number>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="总价"  prop="zj">
            <el-input v-model="formZCXX.zj" placeholder="请输入总价" clearable style="width: 100%" disabled></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="设备现状">
            <el-select filterable v-model="formZCXX.sbzt" placeholder="请选择设备现状" clearable  style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购员" prop="cgy">
           <el-select filterable v-model="formZCXX.cgy" placeholder="请选择采购员" clearable style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="资产处记账人" prop="zccjzr">
           <el-select filterable v-model="formZCXX.zccjzr" placeholder="请选择资产处记账人" clearable style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应商名称">
            <el-input v-model="formZCXX.gysmc" placeholder="请输入供应商名称" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资产来源">
             <el-select filterable v-model="formZCXX.zcly" placeholder="请选择资产来源" clearable style="width: 100%">
              <el-option v-for="item in zclyArr" :key="item.CODE" :label="item.NAME" :value="item.CODE" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="出厂日期">
           <el-date-picker v-model="formZCXX.ccrq" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择出厂日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="入库日期" prop="rkrq">
           <el-date-picker v-model="formZCXX.rkrq" :clearable="false" @change="createRQ" :picker-options="pickerBeginDateBefore"  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择出厂日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用年限(天)">
           <el-input v-model="formZCXX.synx"  @change="createBFRQ" placeholder="请输入使用年限" clearable style="width: 100%"></el-input>
            <!-- <el-input-number style="width: 100%" v-model="formZCXX.synx" @change="createRQ" :precision="2" :min="0" :max="99999" label="请输入使用年限"></el-input-number> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="已用年限(天)">
           <el-input v-model="formZCXX.ysynx" disabled placeholder="请输入已使用年限" clearable style="width: 100%"></el-input>
            <!-- <el-input-number style="width: 100%" disabled v-model="formZCXX.ysynx" :precision="2" :min="0" :max="99999" label="请输入已使用年限"></el-input-number> -->
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="可报废日期(天)">
            <el-input v-model="formZCXX.bfrq" disabled placeholder="请输入可报废日期" clearable style="width: 100%"></el-input>
           <!-- <el-date-picker v-model="formZCXX.bfrq" disabled type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择可报废日期" style="width: 100%"></el-date-picker> -->
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item label="保修截止日期">
           <el-date-picker v-model="formZCXX.bxjzrq" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择保修截止日期" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
          </el-form>
          </el-tab-pane>
          <el-tab-pane label="保管信息" name="bgxx" :disabled='!this.formBGXX.kcId'>
             <el-form ref="formBGXX" :model="formBGXX" label-width="90px" :rules="formBGXXRules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="安置地点" prop="azdd">
                <el-input v-model="formBGXX.azdd" placeholder="请输入安置地点" clearable style="width: 100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保管部门" prop="bgbm">
                  <el-select filterable v-model="formBGXX.bgbm" placeholder="请选择保管部门" clearable style="width: 100%">
                    <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            <el-col :span="12">
            <el-form-item label="部门主管" prop="bmzg">
              <el-select filterable v-model="formBGXX.bmzg" placeholder="请选择部门主管" clearable style="width: 100%">
                  <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
                </el-select>
            </el-form-item>
             </el-col>
        <el-col :span="12">
          <el-form-item label="保管人" prop="bgr">
           <el-select filterable v-model="formBGXX.bgr" placeholder="请选择保管人" clearable  style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="其它" name="qt" :disabled='!this.formBGXX.kcId'>
      <el-form ref="formQT" :model="formQT" label-width="90px" :rules="formQTRules">
      <el-row>   
        <el-col :span="12">
          <el-form-item label="物质属性">
           <el-select filterable v-model="formQT.wzsx" placeholder="请选择物质属性" clearable  style="width: 100%">
              <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="校内分类">
           <el-input v-model="formQT.xnfl" placeholder="请输入校内分类" clearable style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
              <el-col :span="12">
                <el-form-item label="使用方向">
                  <el-select filterable v-model="formQT.syfx" placeholder="请选择使用方向" clearable  style="width: 100%">
                    <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="费用类型">
                  <el-select filterable v-model="formQT.fylx" placeholder="请选择费用类型" clearable  style="width: 100%">
                    <el-option v-for="item in jbArr" :key="item.D_ID_" :label="item.MC" :value="item.D_ID_"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="formQT.bz" type="textarea" :autosize="{ minRows: 4, maxRows: 7}"  placeholder="请填写备注"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
              <el-form-item label="附件"  ref="upload">
               
               <!-- :on-success="handleSuccess"  -->
                    
                <el-upload ref="uploadQT"
                    :action="import_path"
                    :show-file-list="true"
                    :file-list="fileList"
                    :on-remove="handleRemove" 
                    :before-upload="beforeUpload"
                    :with-credentials='true'
                    :limit='5' :auto-upload='false'
                    :data='formQT'  accept='.xls,.xlsx,.word,.txt,.WORD'
                    multiple>
                  <el-button size='small' icon='el-icon-plus' border> </el-button>
                  </el-upload>
              </el-form-item>
            </el-col>
            </el-row>
          </el-form>
          </el-tab-pane>
      <el-tab-pane label="操作记录" name="czRecord" v-if='this.formZCXX.kcid'>
        <div class="jy-table">
          <el-table :data="tableDataJL" border  tooltip-effect='light' style="width: 100%; margin-top: 10px" v-loading="tableLoadingJL">
          <el-table-column prop="ZCBH" label="资产编号" ></el-table-column>
          <el-table-column prop="ZCMC" label="资产名称" ></el-table-column>
          <el-table-column prop="ZCXH" label="型号"></el-table-column>
          <el-table-column prop="GG" label="规格"></el-table-column>
          <el-table-column prop="CZR" label="操作人" width="120"></el-table-column>
          <el-table-column prop="SJ" label="时间" width="120" ></el-table-column>
          <el-table-column prop="CZNR" label="操作内容" width="120"></el-table-column>
        </el-table>
        <el-pagination v-if="totalNumJL" @size-change="handleSizeChangeJL" @current-change="handleCurrentChangeJL" :current-page="currentPageJL" :page-sizes="[10, 15,20 ]" :page-size="pageSizeJL" layout="total, sizes, prev, pager, next, jumper" :total="totalNumJL">
        </el-pagination>
    </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="addZCGL('form')" size="mini">
          <svg-icon icon-class="svg-btn-pre" />保存
        </el-button>
        <el-button type="danger" @click="breakContent()" size="mini">
          <svg-icon icon-class="svg-btn-cancel" />取消
        </el-button>
      </div>
    </float-pane>
  </div>
</template>
<script>
const qs = require('qs')
// import floatPane from '@/components/FloatPane'
export default {
  // components: {
  //   floatPane
  // },
  data() {
    return {
      tableLoading: false,
      zclyArr: [], // 资产来源
      wzsxArr: [], // 物质属性
      syfxArr: [], // 使用方向
      fylxArr: [], // 费用类型
      jbArr: [],
      term: {
        ZCBH: '',
        ZCMC: '',
        ZCXH: '',
        GG: '',
        RKSL: '',
        DJ: '',
        ZJ: '',
        GYSMC: '',
        ZCLY: '',
        CCRQ: '',
        RKRQ: '',
        SYNX: '',
        YYEAR: '',
        BFRQ: '',
        BXJZRQ: '',
        AZDD: '',
        CGY: '',
        BGBM: '',
        BGR: '',
        BMZG: '',
        WZSX: '',
        XNFL: '',
        SBXZ: '',
        FYLX: '',
        SYFX: ''
      },
      termRules: {
        RKSL: { pattern: /^([1-9]\d*|[0]{1,1})$/, message: '请输入正整数', trigger: 'change' },
        DJ: { pattern: /^([1-9][0-9]*(\.\d{1,2})?)|(0\.\d{1,2})$/, message: '请输入正数', trigger: 'change' },
        ZJ: { pattern: /^([1-9][0-9]*(\.\d{1,2})?)|(0\.\d{1,2})$/, message: '请输入正数', trigger: 'change' }
      },
      totalNum: 0,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      field: { order: '', sort: '' }, // 排序字段
      activeName: 'zcxx',
      // editFlag: false,
      // 资产信息
      formZCXX: {
        kcid: '',
        zcbh: '',
        zcmc: '',
        zcxh: '',
        gg: '',
        bxjzrq: '',
        ccrq: '',
        cgy: 'admin',
        dj: 0,
        zj: 0,
        gysmc: '',
        rkrq: '',
        rksl: 0,
        sbzt: '',
        synx: '',
        ysynx: '',
        bfrq: '',
        zccjzr: 'admin',
        // zccjzr: sessionStorage['roleName'],
        zcly: ''
      },
      pickerBeginDateBefore: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      },
      formZCXXRules: {
        // zcbh: [{ required: true, message: '请填写资产编号', trigger: 'change' }],
        zcmc: [{ required: true, message: '请填写资产名称', trigger: 'change' }],
        // rksl: [{ required: true, message: '请填写入库数量', trigger: 'change' },
        // { pattern: /^([1-9]\d*|[0]{1,1})$/, message: '请输入正整数', trigger: 'change' },
        // { max: 10, message: '请输入10位数以内的数字', trigger: 'change' }],
        dj: { required: true, message: '请填写单价', trigger: 'change' },
        zj: { required: true, message: '请填写总价', trigger: 'change' },
        // cgy: { required: true, message: '请选择采购员', trigger: 'change' },
        rkrq: { required: true, message: '请选择入库日期', trigger: 'change' }
      },
      // 保管信息
      formBGXX: {
        kcId: '',
        azdd: '地点',
        bgbm: 'admin',
        bmzg: 'admi',
        bgr: 'admin'
      },
      formBGXXRules: {
        azdd: { required: true, message: '请填写安置地点', trigger: 'change' },
        bgbm: { required: true, message: '请选择保管部门', trigger: 'change' },
        bmzg: { required: true, message: '请选择部门主管', trigger: 'change' },
        bgr: { required: true, message: '请选择保管人', trigger: 'change' }
      },
      // 其它
      formQT: {
        kcId: '',
        wzsx: 'hhg',
        xnfl: 'hg',
        syfx: 'hg',
        fylx: 'hg',
        bz: ''
      },
      fileList: [],
      import_path: '',
      listObj: {},
      heard: '',
      showPane: false,
      formQTRules: {
        bz: { max: 1000, message: '字数不能超过1000字', trigger: 'change' }
      },
      // 操作记录
      tableDataJL: [],
      tableLoadingJL: false,
      totalNumJL: 0,
      currentPageJL: 1,
      pageSizeJL: 10,
      submitFlag: false
    }
  },
  methods: {
    // 导出信息
    exportData() {
      window.location.href = global.BASE_API + '/api/kc/export?condition=' + JSON.stringify(this.term)
    },
    breakContent() {
      this.showPane = false
      this.initFormZCXX()
      this.initFormBGXX()
      this.initFormQT()
    },
    resetTerm() {
      this.term = {
        ZCBH: '',
        ZCMC: '',
        ZCXH: '',
        GG: '',
        RKSL: '',
        DJ: '',
        ZJ: '',
        GYSMC: '',
        ZCLY: '',
        CCRQ: '',
        RKRQ: '',
        SYNX: '',
        YYEAR: '',
        BFRQ: '',
        BXJZRQ: '',
        AZDD: '',
        CGY: '',
        BGBM: '',
        BGR: '',
        BMZG: '',
        WZSX: '',
        XNFL: '',
        SBXZ: '',
        FYLX: '',
        SYFX: ''
      }
      this.getTableData(true)
    },
    initFormZCXX() {
      this.$refs['formZCXX'].resetFields()
      this.formZCXX = {
        kcid: '',
        zcbh: '',
        zcmc: '',
        zcxh: '',
        gg: '',
        bxjzrq: '',
        ccrq: '',
        cgy: '',
        dj: 0,
        zj: 0,
        gysmc: '',
        rkrq: '',
        rksl: 0,
        sbzt: '',
        synx: '',
        ysynx: '',
        bfrq: '',
        zccjzr: '',
        zcly: ''
      }
    },
    initFormBGXX() {
      this.$refs['formBGXX'].resetFields()
      this.formBGXX = {
        kcId: '',
        azdd: '',
        bgbm: '',
        bmzg: '',
        bgr: ''
      }
      this.fileList = []
    },
    initFormQT() {
      this.$refs['formQT'].resetFields()
      this.formQT = {
        kcId: '',
        wzsx: '',
        xnfl: '',
        syfx: '',
        fylx: '',
        bz: ''
      }
    },
    handleChange() {
      if (this.activeName === 'czRecord') {
        this.getTableDataJL()
      }
    },
    // 计算总价
    createZJ() {
      this.formZCXX.zj = (this.formZCXX.dj * this.formZCXX.rksl).toFixed(2)
    },
    // 计算各种日期
    createRQ() {
      // 计算已使用年限（当前年限 - 入库年限）
      const today = new Date().getTime()
      const rkrq = new Date(this.formZCXX.rkrq)
      const year = rkrq.getFullYear()
      const mouth = ('0' + (rkrq.getMonth() + 1)).slice(-2)
      const day = ('0' + rkrq.getDate()).slice(-2)
      this.formZCXX.ysynx = ((today - rkrq) / (1000 * 60 * 60 * 24)).toFixed(0)
      // 保修截止日期 （入库日期 + 1年）
      this.formZCXX.bxjzrq = (year + 1) + '-' + mouth + '-' + day
      this.createBFRQ()
    },
    createBFRQ() {
      // 可报废日期（使用年限-已用年限(当前年限 - 入库年限)）
      if (Number(this.formZCXX.synx) > Number(this.formZCXX.ysynx)) {
        this.formZCXX.bfrq = Number(this.formZCXX.synx) - Number(this.formZCXX.ysynx)
      } else {
        this.formZCXX.bfrq = ''
      }
    },
    editZC(index, row) {
      this.showPane = true
      // this.editFlag = true
      this.activeName = 'zcxx'
      this.heard = row.ZCMC + '信息修改'
      this.findOneById(row.KC_ID)
    },
    findOneById(id) {
      this.$axios({
        url: '/api/kc/getZcxx',
        method: 'post',
        data: qs.stringify({
          kcId: id
        })
      }).then(res => {
        if (res.result) {
          const temp = res.data.kc[0]
          this.formZCXX = {
            kcid: temp.KC_ID,
            zcbh: temp.ZCBH,
            zcmc: temp.ZCMC,
            zcxh: temp.ZCXH,
            gg: temp.GG,
            bxjzrq: temp.BXJZRQ,
            ccrq: temp.CCRQ,
            cgy: temp.CGY,
            dj: temp.DJ,
            zj: temp.ZJ,
            gysmc: temp.GYSMC,
            rkrq: temp.RKRQ,
            rksl: temp.RKSL,
            sbzt: temp.SBZT,
            synx: temp.SYNX,
            ysynx: temp.YDAY,
            bfrq: temp.BFRQ,
            zccjzr: temp.ZCCJZR,
            zcly: temp.ZCLY
          }
          this.formBGXX.kcId = temp.KC_ID
          // this.formBGXX = {
          //   kcId: temp.KC_ID,
          //   azdd: temp.AZDD,
          //   bgbm: temp.BGBM,
          //   bmzg: temp.BMZG,
          //   bgr: temp.BGR
          // }
          this.formQT.kcId = temp.KC_ID
          // this.formQT = {
          //   kcId: temp.KC_ID,
          //   wzsx: temp.WZSX,
          //   xnfl: temp.XNFL,
          //   syfx: temp.SYFX,
          //   fylx: temp.FYLX,
          //   bz: temp.BZ
          // }
          if (res.data.resource && res.data.resource.length) {
            this.fileList = []
            res.data.resource.map((item, index) => {
              this.fileList.push({
                url: global.BASE_API + '/file/download/' + item.resId,
                hasSuccess: true,
                resId: item.resId,
                resName: item.resName,
                resPath: item.resPath,
                resSize: item.resSize,
                resSuffix: item.resSuffix,
                resNewName: item.resNewName,
                name: item.resName + item.resSuffix
              })
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 资产管理保存
    addZCGL() {
      if (this.activeName === 'zcxx' && !this.formZCXX.kcid) {
        this.$refs['formZCXX'].validate(vaild => {
          if (vaild) {
            this.addZCXX()
          }
        })
      } else if (this.activeName === 'zcxx' && this.formZCXX.kcid) {
        this.$refs['formZCXX'].validate(vaild => {
          if (vaild) {
            this.editZCXX()
          }
        })
      } else if (this.activeName === 'bgxx') {
        this.$refs['formBGXX'].validate(vaild => {
          if (vaild) {
            this.addBGXX()
          }
        })
      } else if (this.activeName === 'qt') {
        this.$refs['formQT'].validate(vaild => {
          if (vaild) {
            this.addQT()
          }
        })
      }
    },
    // 资产信息新增
    addZCXX() {
      this.$axios({
        url: '/api/kc/addZcxx',
        method: 'post',
        data: this.formZCXX
      }).then(res => {
        if (res.result) {
          this.formBGXX.kcId = res.data.kcId
          this.$message.success('资产信息保存成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 资产信息修改
    editZCXX() {
      this.$axios({
        url: '/api/kc/updateZcxx',
        method: 'post',
        data: this.formZCXX
      }).then(res => {
        if (res.result) {
          this.$message.success('资产信息修改成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 保管信息修改
    addBGXX() {
      this.$axios({
        url: '/api/bgxx/addBgxx',
        method: 'post',
        data: this.formBGXX
      }).then(res => {
        if (res.result) {
          this.$message.success('保管信息保存成功')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 其它信息修改
    addQT() {
      this.$axios({
        url: '/api/kc/updateOther',
        method: 'post',
        data: qs.stringify(this.formQT)
      }).then(res => {
        if (res.result) {
          this.$message.success('其它信息保存成功')
        } else {
          this.$message.error(res.msg)
        }
      })
      this.$refs.uploadQT.submit()
    },
    // 上传附件成功
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          if (!this.listObj[objKeyArr[i]].url) {
            this.listObj[objKeyArr[i]].url = global.BASE_API + '/file/download/' + response.data[0].resId
          }
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    // 处理删除附件
    handleRemove(file) {
      if (file.size === 0) {
        return false
      }
      this.$axios({
        url: '/api/kc/remove',
        method: 'post',
        data: qs.stringify({
          resId: file.resId
        })
      }).then(res => {
        if (res.result) {
          for (let i = 0, len = this.fileList.length; i < len; i++) {
            if (this.fileList[i].uid === file.uid) {
              this.fileList.splice(i, 1)
              break
            }
          }
          if (this.fileList.length) {
            this.$message.success('删除附件成功')
          } else {
            this.$message.warning('附件内容不能为空，已删除')
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 上传附件之前校验
    beforeUpload(file) {
      if (file.size === 0) {
        // this.submitFlag = false
        this.$message.warning('附件内容不能为空，已删除')
        return false
      } else {
        // this.submitFlag = true
        // return true
        // const fileName = file.uid
        // this.listObj[fileName] = { hasSuccess: false, uid: file.uid, name: file.name }
        // this.fileList.push({
        //   name: file.name,
        //   hasSuccess: false,
        //   uid: file.uid
        // })
        // return true
      }
    },
    delZC(index, row) {
      this.$confirm('此操作将永久删除该条资产信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          // url: 'jspx/deleteJsPx',
          method: 'post',
          data: qs.stringify({
            id: row.KC_ID
          })
        }).then(res => {
          this.tableLoading = false
          if (res.result) {
            this.$message.success('删除成功')
            if (this.totalNum % this.pageSize === 1 && this.currentPage !== 1) {
              this.currentPage--
            }
            this.getTableData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addData() {
      this.showPane = true
      this.heard = '新增入库信息'
      // this.editFlag = false
      this.activeName = 'zcxx'
      // this.getTableDataNR(true)
    },
    // 切换排序
    changeSort({ column, prop, order }) {
      let temp = ''
      if (order === 'descending') {
        temp = 'desc'
      } else {
        temp = 'asc'
      }
      this.field = {
        order: temp,
        sort: prop
      }
      this.getTableData()
    },
    // 初始化表格数据
    getTableData(flag) {
      if (flag) {
        this.currentPage = 1
      }
      this.tableLoading = true
      const param = { page: this.currentPage - 1, size: this.pageSize, condition: JSON.stringify(this.term), field: JSON.stringify(this.field) }
      this.$axios({
        method: 'post',
        url: '/api/kc/getKcs',
        data: qs.stringify(param)
      }).then(res => {
        this.tableLoading = false
        if (res.result) {
          this.tableData = res.data.kc
          this.totalNum = res.data.count
          if (this.totalNum <= (this.currentPage - 1) * this.pageSize && this.currentPage !== 1) {
            this.currentPage = 1
            this.getTableData()
          }
        }
      })
    },
    farmtTime(time) {
      if (time) {
        const dataTime = new Date(time)
        const year = dataTime.getFullYear()
        const mouth = ('0' + (dataTime.getMonth() + 1)).slice(-2)
        const day = ('0' + dataTime.getDate()).slice(-2)
        return year + '-' + mouth + '-' + day
      } else {
        return ''
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.totalNum = 0
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
    // 获取操作记录
    getTableDataJL(flag) {
      if (flag) {
        this.currentPageJL = 1
      }
      this.tableLoadingJL = true
      const param = { kcId: this.formBGXX.kcId, page: this.currentPageJL - 1, size: this.pageSizeJL }
      this.$axios({
        method: 'post',
        url: '/api/kc/getCzjl',
        data: qs.stringify(param)
      }).then(res => {
        this.tableLoadingJL = false
        if (res.result) {
          this.tableDataJL = []
          res.data.jl.map((item, index) => {
            const temp = {
              SJ: item.CJSJ,
              CZNR: JSON.parse(item.CZJL).content,
              ZCBH: JSON.parse(item.CZJL).new.zcbh,
              ZCMC: JSON.parse(item.CZJL).new.zcmc,
              ZCXH: JSON.parse(item.CZJL).new.zcxh,
              GG: JSON.parse(item.CZJL).new.gg,
              CZR: item.CJR
            }
            this.tableDataJL.push(temp)
          })
          this.totalNumJL = res.data.count
        }
      })
    },
    handleSizeChangeJL(val) {
      this.pageSizeJL = val
      this.currentPageJL = 1
      this.totalNumJL = 0
      this.getTableDataJL()
    },
    handleCurrentChangeJL(val) {
      this.currentPageJL = val
      this.getTableDataJL()
    },
    // 获取字典表
    getDict() {
      var param = {
        zclyArr: 'STD_JB_GDZC_LY',
        wzsxArr: 'STD_JB_GDZC_WZSX',
        syfxArr: 'STD_JB_GDZC_SYFX',
        fylxArr: 'STD_JB_GDZC_FYLX'
      }
      this.$axios({
        url: '/dicts',
        method: 'post',
        data: qs.stringify(param)
      }).then(res => {
        if (res.result) {
          this.zclyArr = res.data.zclyArr
          this.wzsxArr = res.data.wzsxArr
          this.syfxArr = res.data.syfxArr
          this.fylxArr = res.data.fylxArr
          this.getTableData()
        }
      })
    }
  },
  created() {
    this.getDict()
    this.getTableData()
    // this.import_path = global.BASE_API + '/file/upload'
    this.import_path = global.BASE_API + '/api/kc/updateOther'
  }
}
</script>
<style lang="less" scoped>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 120px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
   .el-table .cell-style .cell {
    width: 100% !important;
    white-space: nowrap !important;
    background: #084c26;
  }
</style>



