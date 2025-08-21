import React from 'react'
import { Alert, Card, Steps, Typography, Space, Button } from 'antd'
import { KeyOutlined, SettingOutlined, ReloadOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text, Link } = Typography

interface ApiConfigGuideProps {
  onRetry?: () => void
}

const ApiConfigGuide: React.FC<ApiConfigGuideProps> = ({ onRetry }) => {
  const steps = [
    {
      title: '获取API密钥',
      description: (
        <div>
          <Paragraph>
            1. 访问 <Link href="https://console.volcengine.com/" target="_blank">火山引擎控制台</Link>
          </Paragraph>
          <Paragraph>
            2. 登录您的账号并进入"访问控制" → "访问密钥"
          </Paragraph>
          <Paragraph>
            3. 创建新的AccessKey或使用现有的AccessKey
          </Paragraph>
          <Paragraph>
            4. 记录下AccessKeyId和SecretAccessKey
          </Paragraph>
        </div>
      ),
      icon: <KeyOutlined />
    },
    {
      title: '配置环境变量',
      description: (
        <div>
          <Paragraph>
            1. 在项目根目录找到 <Text code>.env.example</Text> 文件
          </Paragraph>
          <Paragraph>
            2. 复制该文件并重命名为 <Text code>.env</Text>
          </Paragraph>
          <Paragraph>
            3. 编辑 <Text code>.env</Text> 文件，填入您的真实API密钥：
          </Paragraph>
          <Paragraph>
            <Text code style={{ display: 'block', padding: '8px', background: '#f5f5f5' }}>
              VITE_VOLCENGINE_ACCESS_KEY_ID=您的AccessKeyId<br/>
              VITE_VOLCENGINE_SECRET_ACCESS_KEY=您的SecretAccessKey
            </Text>
          </Paragraph>
        </div>
      ),
      icon: <SettingOutlined />
    },
    {
      title: '重启服务',
      description: (
        <div>
          <Paragraph>
            1. 保存 <Text code>.env</Text> 文件
          </Paragraph>
          <Paragraph>
            2. 重启开发服务器（Ctrl+C 然后 npm run dev）
          </Paragraph>
          <Paragraph>
            3. 刷新页面并重试图像生成功能
          </Paragraph>
        </div>
      ),
      icon: <ReloadOutlined />
    }
  ]

  return (
    <Card 
      title={
        <Space>
          <KeyOutlined />
          <span>火山引擎API配置指南</span>
        </Space>
      }
      style={{ maxWidth: 800, margin: '20px auto' }}
    >
      <Alert
        message="API密钥配置问题"
        description="检测到火山引擎API密钥未正确配置，请按照以下步骤进行配置："
        type="warning"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <Steps
        direction="vertical"
        current={-1}
        items={steps}
        style={{ marginBottom: 24 }}
      />
      
      <Alert
        message="安全提醒"
        description={
          <div>
            <Paragraph>
              • 请勿将API密钥提交到代码仓库中
            </Paragraph>
            <Paragraph>
              • .env文件已被.gitignore忽略，确保不会被意外提交
            </Paragraph>
            <Paragraph>
              • 定期轮换您的API密钥以确保安全
            </Paragraph>
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      {onRetry && (
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
            配置完成，重试生成
          </Button>
        </div>
      )}
    </Card>
  )
}

export default ApiConfigGuide
