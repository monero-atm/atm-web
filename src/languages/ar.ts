import type { TranslationKeys } from '../types/translations'

export const ar: TranslationKeys = {
  home: {
    title: 'قوموا بمسح شفرة (كيو آر) للبدء',
    instruction: 'ابحث عن الماسح المجاور للشاشة'
  },
  wallet: {
    title: 'هوية المحفظة:'
  },
  payment: {
    title: 'أدخل أموالك',
    instruction: 'اعثر على متلقي النقود بجوار الشاشة'
  },
  review: {
    firstTitle: 'النقدية المودعة:',
    secondTitle: 'مبلغ Monero:',
    thirdTitle: 'عنوان الوجهة:'
  },
  error: {
    cancelled: 'تم إلغاء الصفقة',
    exchange: 'خطأ في الصرف',
    invalidID: 'معرف المحفظة غير صالح'
  },
  success: {
    title: 'اكتملت المعاملة',
    secondTitle: 'تم إرساله إلى:'
  },
  buttons: {
    cancel: 'إلغاء',
    continue: 'إكمال',
    seconds: 'ثانية'
  }
}
