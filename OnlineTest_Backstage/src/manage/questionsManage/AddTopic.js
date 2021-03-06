import React, { Component } from 'react';
import { Form, Modal, Button, Input, Switch, message, Select, Icon } from 'antd';
import { questionServices, config } from '../../lib'
const Option = Select.Option
const FormItem = Form.Item
class AddTopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            nickname: '',
            visible: '',
            type: 1,
            difficulty: 1,
            anlysis: '',
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            visible: nextProps.visible
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ submitting: true });
                const params = {
                    subjectId: this.props.subId,
                    questionName: values.questionName,
                    questionAnlysis: this.state.anlysis,
                    questionType: this.state.type,
                    questionClass: this.state.difficulty,
                    rightAnswer: values.rightAnswer
                }
                questionServices.addTopic(params).then(ret => {
                    if (ret.data > 0) {
                        const optionA = {
                            questionId: ret.data,
                            answerDescription: values.optionA,
                        }
                        const optionB = {
                            questionId: ret.data,
                            answerDescription: values.optionB,
                        }
                        const optionC = {
                            questionId: ret.data,
                            answerDescription: values.optionC,
                        }
                        const optionD = {
                            questionId: ret.data,
                            answerDescription: values.optionD,
                        }
                        try{
                            questionServices.addOption(optionA).then((ret)=>{
                                console.log(ret.data)
                                questionServices.addOption(optionB).then((ret)=>{
                                    console.log(ret.data)
                                    questionServices.addOption(optionC).then((ret)=>{
                                        console.log(ret.data)
                                        questionServices.addOption(optionD).then((ret)=>{
                                            console.log(ret.data)
                                            this.setState({ submitting: false });
                                            this.props.onCancel();
                                            this.props.loadData();
                                            config.success("添加成功!");
                                        }).catch((err)=>{
                                            config.error("添加选项失败，请找到该题目，重新添加选项!");
                                        })
                                    }).catch((err)=>{
                                        config.error("添加选项失败，请找到该题目，重新添加选项!");
                                    })
                                 }).catch((err)=>{
                                    config.error("添加选项失败，请找到该题目，重新添加选项!");
                                })
                            }).catch((err)=>{
                                config.error("添加选项失败，请找到该题目，重新添加选项!");
                            })
                        }catch(err){
                            this.setState({ submitting: false });
                            this.props.onCancel();
                            this.props.loadData();
                            config.error("添加选项失败，请找到该题目，重新添加选项!");
                        }
                    } else {
                        this.setState({ submitting: false });
                        config.error("已经有这个题目了!");
                    }
                }).catch(ret => {
                    console.log(ret)
                    config.error("添加失败!");
                    this.setState({ submitting: false });
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <Modal
                title='新增题目'
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                footer={null}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="题目名称" {...formItemLayout}>
                        {getFieldDecorator('questionName', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="题目名称" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem label="类型" {...formItemLayout}>
                        <Select
                            defaultValue="1"
                            onChange={(value) => this.setState({ type: value })}
                            style={{ width: 120 }}>
                            <Option value="1">单选</Option>
                            <Option value="2">多选</Option>
                            <Option value="3">问答</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="解析" {...formItemLayout}>
                        <Input onChange={(value) => this.setState({ anlysis: value.target.value })} placeholder="解析" maxLength="20" />
                    </FormItem>
                    <FormItem label="题目难度" {...formItemLayout}>
                        <Select
                            defaultValue="1"
                            onChange={(value) => this.setState({ difficulty: value })}
                            style={{ width: 120 }}>
                            <Option value="1">简单</Option>
                            <Option value="2">中级</Option>
                            <Option value="3">高级</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="选项A:" {...formItemLayout}>
                        {getFieldDecorator('optionA', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="选项A" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem label="选项B:" {...formItemLayout}>
                        {getFieldDecorator('optionB', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="选项B" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem label="选项C:" {...formItemLayout}>
                        {getFieldDecorator('optionC', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="选项D" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem label="选项D:" {...formItemLayout}>
                        {getFieldDecorator('optionD', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="选项D" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem label="正确答案" {...formItemLayout}>
                        {getFieldDecorator('rightAnswer', {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="正确答案" maxLength="20" />
                            )}
                    </FormItem>
                    <FormItem wrapperCol={{ xs: { span: 24, offset: 0, }, sm: { span: 14, offset: 6, } }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={this.state.submitting}>确认
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
AddTopic = Form.create()(AddTopic);
export default AddTopic;