import React, { useEffect } from 'react';
import { Button, Form, InputNumber, Select } from '@arco-design/web-react';
// import ReactECharts from 'echarts-for-react';
import { getROI } from '@/api/douyu';

// const RadioGroup = Radio.Group;

function Home() {
  const [form] = Form.useForm();
  const [result, setResult] = React.useState<any>([]);
  const [formData, setFormData] = React.useState<any>({
    brandDeductionType: 1,
    brandDeductionStr: 8,
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await getROI(formData);
      setLoading(false);
      setResult(res);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="base-page">
      <div className="top-card-bg-box">
        <Form
          form={form}
          initialValues={formData}
          onValuesChange={(value, values) => {
            setFormData(values);
          }}
        >
          {/* 产品定价 */}
          <Form.Item
            field="priceStr"
            rules={[{ required: true, message: '请输入产品定价' }]}
            label="产品定价"
          >
            <InputNumber className="w200" step={1} min={0} mode="button" />
          </Form.Item>
          <Form.Item label="品牌折扣" required>
            <Form.Item
              field="brandDeductionStr"
              rules={[{ required: true, message: '请输入品牌折扣' }]}
              noStyle={{ showErrorTip: true }}
            >
              <InputNumber
                className="w200"
                step={1}
                min={0}
                max={formData.brandDeductionType === 1 ? 100 : undefined}
                mode="button"
              />
            </Form.Item>
            <Form.Item field="brandDeductionType" noStyle>
              <Select
                className="w150 ml8"
                options={[
                  {
                    label: '百分比（%）',
                    value: 1,
                  },
                  {
                    label: '固定金额（元）',
                    value: 2,
                  },
                ]}
              />
            </Form.Item>
          </Form.Item>
          {/* 产品的成本 */}
          <Form.Item
            rules={[{ required: true, message: '请输入商品成本' }]}
            field="costStr"
            label="商品成本"
          >
            <InputNumber className="w200" step={1} min={0} mode="button" />
          </Form.Item>
          {/* 额外费用 */}
          <Form.Item
            rules={[{ required: true, message: '请输入额外费用' }]}
            field="expenseStr"
            label="额外费用"
            extra={'单件商品额外的费用，如包装费等'}
          >
            <InputNumber className="w200" step={1} min={0} mode="button" />
          </Form.Item>
          {/* 请求数据 */}
          <Form.Item label=" ">
            <Button
              type="primary"
              loading={loading}
              className="w400 mb20"
              onClick={() => {
                form.validate((res: any) => {
                  if (!res) {
                    getData();
                  }
                });
              }}
            >
              计算结果
            </Button>
          </Form.Item>
        </Form>

        <div className="result">
          <Form>
            {/* 产品定价 */}
            <Form.Item label="保本成交价">
              <span className="mb0">{result?.data?.breakEvenBid}</span>
            </Form.Item>
            <Form.Item label="预估ROI">
              <span className="mb0">{result?.data?.breakEvenROI}</span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Home;
