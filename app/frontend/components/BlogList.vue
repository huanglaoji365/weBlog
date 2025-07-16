<template>
  <el-row :gutter="10">
    <el-col>
      <div class="left-content">
        <div class="left-content-header">
            <span>
              <el-tag class="el-tags" type="primary" effect="light" round>博客日志 {{ total || 0 }} 篇</el-tag>
            </span></div>
        <div class="left-content-items" v-if="total">
          <div
              class="left-content-item itemhover cssnice1"
              v-for="item in articleList"
              :key="item.id"
          >
            <div class="item-title">
              {{ item.title }}
            </div>

            <div class="item-tags">
              <el-tag
                  class="item-tags-top"
                  v-if="item.top == '是'"
                  type="danger"
              >置顶
              </el-tag
              >
              <div class="item-tags-time">
                  <span
                      style="color: #fa9200"
                      class="iconfont icon-icon-riqi mr-5px"
                  ></span>
                <span>{{ UnixToDate(new Date(item.create_time), 6) }}</span>
              </div>
              <div class="item-tags-type">
                  <span
                      style="color: #67c23a"
                      class="iconfont icon-biaoqian mr-5px"
                  ></span>
                <span
                    style="margin-right: 10px"
                    v-for="tag in item.tag.split(',')"
                >{{ tag }}</span
                >
              </div>
              <div class="item-tags-hot">
                  <span
                      style="color: #6ccaf5"
                      class="iconfont icon-yanjing_kai mr-5px"
                  ></span>
                <span>{{ item.hot }}</span>
              </div>
            </div>

            <div class="item-img" @click="toDetail(item)">
              <img v-lazy="'https://liuzepeng.com/' + item.pic" :alt="item.title"/>
            </div>
            <div class="item-txt">{{ item.description }}</div>
          </div>

          <div class="pagination" style="margin-top: 20px;">
            <el-pagination
                background
                v-model:currentPage="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[3, 6, 9, 12]"
                :disabled="disabled"
                :background="background"
                :layout="pageLayout"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>

        <div class="left-content-items nodata" v-else>
          <img
              style="width: 120px; height: 120px"
              src="../assets/nodata.png"
              alt="暂无数据"
          />
          <div style="color: #bbbbbb; font-size: 14px; margin-top: 10px">
            暂无数据
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { UnixToDate } from "../utils/datetime";
import axios from '../utils/axios'

const pageNo = ref(1);
const pageSize = ref(6);
const disabled = ref(false);
const background = ref(false);
let total = ref(0);
let pageLayout = ref("sizes, prev, pager, next, jumper");

function handleSizeChange(newSize) {
  pageSize.value = newSize
  getArticleList();
}

function handleCurrentChange(newPage) {
  pageNo.value = newPage
  getArticleList();
}
let articleList = ref([]);

function getArticleList() {
  let params = {
    pageSize: pageSize.value,
    pageNo: pageNo.value,
  };
  axios.post('/api/queryWebArticleList', params).then(res => {
    if (res.code == 200) {
      articleList.value = res.data.data;
      total.value = res.data.total;
    }
  })
}

onMounted(() => {
  getArticleList();
});
</script>

<style lang="scss" scoped>
.left-content-items {
  width: 100%;

  .left-content-item {
    padding: 0.75rem 0.3rem;

    .item-title {
      font-size: 1.25rem;
      color: #1e90ff;
      padding: 0 0.3rem;
      cursor: pointer;
    }

    .item-tags {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0.5rem 0;
      color: #aaa;
      font-size: 14px;

      .item-tags-top {
        padding: 0 0.5rem;
        margin-right: 0.8rem;
      }

      .item-tags-time {
        margin-right: 0.5rem;
      }

      .item-tags-type {
        margin-right: 0.5rem;
      }

      .item-tags-hot {
      }

      .mr-5px {
        margin-right: 0.3125rem;
      }
    }

    .item-img {
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 20vw;
      // max-height: 300px;
      cursor: pointer;
      overflow: hidden;
      border-radius: 12px;

      img {
        width: 100%;
        transition: all 0.5s ease-out 0.1s;
      }
    }

    @media not screen and (min-width: 60em) {
      .item-img {
        max-height: 20vw;
      }
    }

    @media not screen and (min-width: 50em) {
      .item-img {
        max-height: 40vw;
      }
    }

    .item-img:hover img {
      transform: scale(1.1);
    }

    .item-txt {
      margin-top: 1rem;
      color: #777;
      font-size: 14px;
    }

    .item-more {
      text-align: right;
      margin-right: 20px;
      font-size: 15px;
      color: rgb(30, 144, 255);
      cursor: pointer;
    }
  }

  .itemhover {
    transition: all linear 0.7s;
    border-radius: 10px;
  }

  .itemhover:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transform: translate3d(0, -2px, 0);
    background-color: rgb(253, 253, 253);
  }
}

.el-tags {
  margin-top: 10px;
  font-size: 1.1rem;
  color: var(--text-color);
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.nodata {
  height: 825px;
  text-align: center;

  img {
    margin-top: 100px;
  }
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>