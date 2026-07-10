---
sidebar_position: 2
description: KnowFlow 飞书接入教程，将配置好的聊天接入飞书智能机器人，实现在飞书中使用 KnowFlow 知识库问答。
---

# 飞书接入

## 一、功能简介

将 KnowFlow 配置好的聊天直接接入飞书智能机器人，轻松实现在飞书中使用 KnowFlow。

## 二、配置步骤

### 1. 选择目标聊天

打开 KnowFlow 前端聊天功能，选择一个目标聊天卡片。

![选择聊天卡片](../images/wecom-chat-1.png)

### 2. 进入三方接入

点击进入聊天详情页，点击详情页右上角的三方接入按钮。

![点击三方接入](../images/wecom-chat-2.png)

### 3. 选择飞书应用

在弹出框中选择飞书应用。

![选择飞书](../images/feishu-chat-1.png)
![飞书机器人配置](../images/feishu-chat-2.png)

### 4. 打开飞书开放平台

点击飞书开放平台的链接：https://open.feishu.cn/app?lang=zh-CN

### 5. 进入飞书应用模块，创建机器人并配置权限

获取 App ID 和 App Secret

![获取 App ID 和 App Secret](../images/feishu-chat-0.png)

### 6. knowFlow 配置并保存

切到 KnowFlow 页面，将获取到的 App ID 和 App Secret 复制粘贴到 KnowFlow 页面的 App ID 和 App Secret 输入框中，打开启用机器人开关，然后底部点击保存。
![保存配置](../images/feishu-chat-6.png)


### 7. 配置飞书机器人权限并发布

1、配置权限，哪些权限需要见下图

![权限配置](../images/feishu-chat-3.png)

2、配置长连接

![长连接配置](../images/feishu-chat-4.png)

3、发布机器人

![发布机器人](../images/feishu-chat-5.png)

### 8. 验证使用

在手机端，打开飞书应用，在工作台的全部应用中找到机器人。

![机器人单聊](../images/feishu-chat-7.jpeg)

进行聊天问答，即可在飞书中使用 KnowFlow。

![单聊](../images/feishu-chat-8.jpeg)
