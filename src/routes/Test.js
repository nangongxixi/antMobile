import 'antd-mobile/dist/antd-mobile.css'; //引入公共类
import {
  List,
  InputItem,
  Picker,
  ImagePicker,
  WhiteSpace,
  Button,
  Checkbox,
  TextareaItem,
  WingBlank,
  Switch,
  Radio,
  Flex
} from 'antd-mobile';
import {Upload, message, Icon} from 'antd';
import {createForm} from 'rc-form';

const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

const dataf = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

//文件上传
const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class BasicInputExample extends React.Component {

  state = {
    type: 'money',
    value: 0,
    files: dataf,
    multiple: false,
  }

  onChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };

  onChangeMor = (val) => {
    console.log(val);
  }

  onChangeFileUp = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  //提交表单
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(value);
    });
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {type} = this.state;
    const {value} = this.state;
    const data = [
      {value: 0, label: '男'},
      {value: 1, label: '女'},
    ];
    const Parbu = [
      {value: 0, label: '技术部'},
      {value: 1, label: '工程部'},
    ];


    const {files} = this.state;//图片上传

    return (
      <WingBlank>
        <WhiteSpace/>
        <InputItem {...getFieldProps('name')} clear placeholder="请输入姓名"
                   ref={el => this.autoFocusInst = el}>姓名</InputItem>
        <WhiteSpace/>

        <List renderHeader={() => '性别'}>
          {data.map(i => (
            <RadioItem key={i.value} {...getFieldProps.sex} checked={value === i.value}
                       onChange={() => this.onChange(i.value)}>
              {i.label}
            </RadioItem>
          ))}
        </List>

        <WhiteSpace/>
        <InputItem {...getFieldProps('age')} clear type={type} moneyKeyboardAlign="left" placeholder="请输入年龄"
                   ref={el => this.customFocusInst = el}>年龄</InputItem>

        <WhiteSpace/>

        <Picker data={Parbu} cols={1} {...getFieldProps('partment')} className="forss">
          <List.Item arrow="horizontal">部门</List.Item>
        </Picker>

        <List renderHeader={() => '多选项'}  {...getFieldProps('duoxuan')}>
          {Parbu.map(i => (
            <CheckboxItem key={i.value} onChange={() => this.onChangeMor(i.value)}>
              {i.label}
            </CheckboxItem>
          ))}
        </List>

        <WhiteSpace/>

        <List renderHeader={() => '投诉内容'}>
          <TextareaItem
            {...getFieldProps('content', {
              initialValue: '',
            })}
            placeholder="请输入内容"
            rows={5}
            count={100}
          />
        </List>

        <WhiteSpace/>

        <ImagePicker
          files={files}
          onChange={this.onChangeFileUp}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 5}
          multiple={this.state.multiple}
        />

        <WhiteSpace/>

        <Upload {...props}>
          <Button>
            <Icon type="upload"/> Click to Upload
          </Button>
        </Upload>

        <WhiteSpace/>

        <Flex>
          <Flex.Item>
            <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)}>
              同意 <a onClick={(e) => {
              e.preventDefault();
              location.href = 'http://www.baidu.com';
              /*alert('agree it');*/
            }}
                    style={{color: "red"}}>服务协议</a>
            </AgreeItem>
          </Flex.Item>
        </Flex>


        <WhiteSpace/>


        <Button type="warning" onClick={this.submit}>提交</Button>
        <WhiteSpace/>
        <WhiteSpace/>


      </WingBlank>
    );
  }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);
export default BasicInputExampleWrapper;

