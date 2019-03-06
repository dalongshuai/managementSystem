<template>
    <div class="index">
        <div>
            <Layout></Layout>
            <router-view/>
        </div>
        
    </div>
</template>

<script>
// 引入组件
import Layout from "@/components/Layout.vue"
export default {
    components:{
        Layout
    }
}
</script>

<style lang="less">

</style>
