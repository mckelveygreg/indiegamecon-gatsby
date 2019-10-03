const Airtable = require('airtable')
const axios = require('axios')

const saveContact = async data => {
  return new Promise((resolve, reject) => {
    const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env

    Airtable.configure({
      AIRTABLE_API_KEY,
    })

    const base = Airtable.base(AIRTABLE_BASE_ID)

    // formName directs data to correct base
    base(data.formName).create(data, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

const postToSlack = async data => {
  const payload = {
    text: `New Game! /n Name: ${data.name}/n email: ${data.email}/n link: ${data.link}`,
  }

  axios
    .post(
      'https://hooks.slack.com/services/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',
      JSON.stringify(payload)
    )
    .then(response => {
      console.log('SUCCEEDED: Sent slack webhook: \n', response.data)
    })
    .catch(error => {
      console.log('FAILED: Send slack webhook', error)
    })
}

export async function handler(event) {
  try {
    const data = JSON.parse(event.body)
    await saveContact(data)
    await postToSlack(data)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Apparently this saved to airtable...',
      }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: error.message,
    }
  }
}
