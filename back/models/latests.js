import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少標題']
  },
  time: {
    type: Number,
    min: [0, '價格錯誤'],
    required: [true, '缺少日期']
  },
  description: {
    type: String,
    required: [true, '缺少內容']
  },
  image: {
    type: String,
    required: [true, '缺少圖片']
  },
  sell: {
    type: Boolean,
    required: [true, '缺少狀態']
  }
}, { versionKey: false })

export default model('latests', schema)
