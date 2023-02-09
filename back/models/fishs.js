import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少中文名稱']
  },
  egname: {
    type: String,
    required: [true, '缺少英文名稱']
  },
  stname: {
    type: String,
    required: [true, '缺少學術名稱']
  },
  danger: {
    type: String,
    required: [true, '缺少危險性'],
    enum: {
      values: ['溫和', '具攻擊性', '危險', '同科相殘', '攻擊珊瑚'],
      message: '分類錯誤'
    }
  },
  food: {
    type: String,
    required: [true, '缺少食性'],
    enum: {
      values: ['雜食', '肉食', '素食'],
      message: '分類錯誤'
    }
  },
  size: {
    type: Number,
    min: [0, '尺寸錯誤'],
    required: [true, '缺少尺寸']
  },
  description: {
    type: String,
    required: [true, '缺少說明']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少狀態']
  },
  place: {
    type: String,
    required: [true, '缺少產地'],
    enum: {
      values: ['印度洋', '紅海'],
      message: '分類錯誤'
    }
  },
  category: {
    type: String,
    required: [true, '缺少分類'],
    enum: {
      values: ['小丑魚', '倒吊魚', '神仙魚'],
      message: '分類錯誤'
    }
  }
}, { versionKey: false })

export default model('fishs', schema)
