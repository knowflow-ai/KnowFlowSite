/**
 * 咨询表单 → 企业微信群机器人。
 *
 * 注意：站点是纯静态部署，没有服务端可以中转，因此 Webhook 地址随前端
 * 打包分发，任何访问者都能看到。这里的取舍是「表单可用」优先，
 * 代价是该地址可能被外部滥用发消息。要彻底解决需要一个服务端代理
 * （或云函数）持有密钥，前端只调用自有接口。
 */

export interface ContactFormData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  need: string;
  message: string;
}

const WEBHOOK_URL =
  'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=2eac2f11-6641-430c-bb2c-50340c4adcff';

const NOT_PROVIDED = '未填写';

const formatFormDataToMessage = (data: ContactFormData): string => {
  const timestamp = new Date().toLocaleString('zh-CN');

  return `🔔 新的咨询表单提交

📅 提交时间：${timestamp}

👤 联系人信息：
• 姓名：${data.name}
• 公司：${data.company}
• 职位：${data.position || NOT_PROVIDED}
• 邮箱：${data.email || NOT_PROVIDED}
• 微信：${data.phone}

📋 咨询信息：
• 需求类型：${data.need}
• 需求描述：${data.message || NOT_PROVIDED}

请及时跟进处理！`;
};

/**
 * 发送表单内容到企业微信群机器人。
 *
 * 请求使用 `no-cors`，因此无法读取响应体——只要请求本身没有抛错，
 * 就按发送成功处理。网络失败会返回 `false`，由调用方提示用户重试。
 */
export const sendToWeChatWork = async (
  formData: ContactFormData,
): Promise<boolean> => {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        msgtype: 'text',
        text: {content: formatFormDataToMessage(formData)},
      }),
    });

    return true;
  } catch {
    return false;
  }
};
