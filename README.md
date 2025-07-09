# weBlog

weBlog 是一个基于 Ruby on Rails 构建的博客应用，支持文章发布、用户管理和基本的交互功能。

## 环境要求

- Ruby 版本: 3.0.4
- Rails 版本: 7.0.4
- 数据库: MYSQL（视配置而定）
- vite 和 Yarn（用于前端依赖）

## 安装步骤

1. 克隆仓库：
    ```bash
   git clone https://github.com/yourname/weBlog.git
   cd weBlog
2. 安装依赖：
    rails run 
   ```bash
   bundle install
   yarn install/npm i

3. 配置数据库：
    - 修改 `config/database.yml` 文件以匹配您的数据库设置。

4. 创建和初始化数据库：
    ```bash
   rails db:create 
   rails db:migrate 
   rails db:seed # 可选：导入初始数据
5. 启动 rails 服务器：
   ```bash 
   rails s/rails server
   vite dev
6. 访问应用：
访问 `http://localhost:3000` 查看运行中的应用。
   