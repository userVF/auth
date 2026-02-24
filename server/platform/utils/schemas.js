// const lang = { type: 'string', enum: ['ru', 'en', 'kz'] }
const identifierPattern = '^\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$'

const loginInitSchema = {  
  body: {
    type: 'object',
    required: ['identifier', 'channel'], 
    properties: {
      identifier: { 
        type: 'string', 
        pattern: identifierPattern,
        errorMessage: {
          pattern: 'invalidIdentifierFormat'
        }
      },    
      channel: { 
        type: 'string', 
        enum: ['email', 'whatsapp'],
        errorMessage: {
          pattern: 'invalidChannelFormat'
        }
      }
    },
  }
}

const loginCompleteSchema = {  
  body: {
    type: 'object',
    required: ['identifier', 'code'], 
    properties: {
      identifier: { 
        type: 'string', 
        pattern: identifierPattern,
        errorMessage: {
          pattern: 'invalidIdentifierFormat'
        }
      },    
      code: { 
        type: 'string', 
        pattern: '^\\d{5}$',
        errorMessage: {
          pattern: 'invalidCodeFormat'
        }
      }
    },
  }
}

export { 
  loginInitSchema, 
  loginCompleteSchema,
}