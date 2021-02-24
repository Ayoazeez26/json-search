

const apiKey = "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";

  document.querySelector('button').addEventListener('click',(e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  console.log(email);
  fetch("./data.json")
  .then(response => {
    return response.json();
  })
  .then(data => searchThrough(data));

  let objects = [];
  const searchThrough = (data) => {
    if (email == '') {
      errorMsg('Required field missing');
    } else {
      par = data.names;
      par.forEach( (e, i) => {
        if (e.email.toLowerCase() == email.toLowerCase()) {
          objects.push(par[i]);
        } 
      }); 
      console.log(objects);
      const results = document.querySelector('.result');
      if (objects.length == 0) {
        results.innerHTML = `<p>No result found</p>`
      } else if (objects.length > 1) {
        errorMsg('More than one result found, be more specific');
      } else {
        results.innerHTML = `<table class="styled">
                              <thead>
                                  <tr>
                                      <th colspan="2">Result</th>
                                  </tr>
                              </thead>
                              <tbody>
                                <tr>
                                    <td>First Name</td>
                                    <td>${objects[0].fname}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>${objects[0].lname}</td>
                                </tr>
                                <tr>
                                    <td>Email Address</td>
                                    <td>${objects[0].email}</td>
                                </tr>
                              </tbody>
                            </table>`
        
        const data = {
          "personalizations" : [{
            "to":[{
              "email":`${objects[0].email}`,"name":`${objects[0].lname} ${objects[0].fname}`
            }],
            "subject":"MSC Contribution"
          }],
          "content": [{
            "type": "text/html", "value": `<table style="border-collapse: collapse; margin: 25px 0; font-size: 0.9em; min-width: 400px;">
            <thead>
                <tr style="background-color: #009879; color: #ffffff; text-align: center;">
                    <th style="padding: 12px 15px;" colspan="2">Result</th>
                </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #dddddd;">
                  <td style="padding: 12px 15px;">First Name</td>
                  <td style="padding: 12px 15px;">${objects[0].fname}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dddddd; background-color: #f3f3f3;">
                  <td style="padding: 12px 15px;">Last Name</td>
                  <td style="padding: 12px 15px;">${objects[0].lname}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dddddd;">
                  <td style="padding: 12px 15px;">Email Address</td>
                  <td style="padding: 12px 15px;">${objects[0].email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dddddd; background-color: #f3f3f3;">
                  <td style="padding: 12px 15px;">Phone Number</td>
                  <td style="padding: 12px 15px;">${objects[0].phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dddddd;">
                  <td style="padding: 12px 15px;">Total</td>
                  <td style="padding: 12px 15px;">${objects[0].total}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dddddd; background-color: #f3f3f3; border-bottom: 2px solid #009879;">
                  <td style="padding: 12px 15px;">Pledge</td>
                  <td style="padding: 12px 15px;">${objects[0].pledge}</td>
              </tr>
            </tbody>
          </table>`
          }],
          "from":{
            "email":"ayoazeez26@gmail.com","name":"Ayodeji Abdulazeez"
          }
        }

        axios.post(`https://pure-plains-91675.herokuapp.com/https://api.sendgrid.com/v3/mail/send`, data, {
          headers: {
            'Access-Control-Allow-Origin': "https://sendgrid.api-docs.io",
            'Content-Type': "application/json",
            'Authorization': `Bearer ${apiKey}`
          },
        }).then((res) => {
          console.log(res);
          console.log('Successful');
          successMsg('Your contribution data has been sent to your email');
        }).catch((err) => console.log(err));
      }
    }
  }

})
const errorMsg = (str) => {
  const div = document.createElement('div');
  div.classList.add('error');
  div.innerHTML = `<p class="error message">${str}</p>`;
  const form = document.querySelector('form');
  form.insertAdjacentElement('beforebegin', div);
  setTimeout(() => {
    document.querySelector('.error').remove();
  }, 2000);
}

const successMsg = (str) => {
  const div = document.createElement('div');
  div.classList.add('success');
  div.innerHTML = `<p class="success message">${str}</p>`;
  const form = document.querySelector('form');
  form.insertAdjacentElement('beforebegin', div);
  setTimeout(() => {
    document.querySelector('.success').remove();
  }, 2000);
}