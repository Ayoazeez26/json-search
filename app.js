
const runSearch = (e) => {
  e.preventDefault();
  const fname = document.querySelector('#fname').value;
  const lname = document.querySelector('#lname').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  console.log(fname, lname, email, phone);
  fetch("./data.json")
  .then(response => {
    return response.json();
  })
  .then(data => searchThrough(data));

  let objects = [];
  const searchThrough = (data) => {
    if (fname == '' || lname == '') {
      errorMsg('Required field missing');
    } else {
      par = data.names;
      par.forEach( (e, i) => {
        if (fname != '' && lname != '' && email != '' && phone != '') {
          if (e.fname.toLowerCase() == fname.toLowerCase() && e.lname.toLowerCase() == lname.toLowerCase() && e.email.toLowerCase() == email.toLowerCase() && e.phone == phone) {
            objects.push(par[i]);
          }
        } else if (fname != '' && lname != '' && email != '' && phone == '') {
          if (e.fname.toLowerCase() == fname.toLowerCase() && e.lname.toLowerCase() == lname.toLowerCase() && e.email.toLowerCase() == email.toLowerCase()) {
            objects.push(par[i]);
          }
        } else if (fname != '' && lname != '' && email == '' && phone == '') {
          if (e.fname.toLowerCase() == fname.toLowerCase() && e.lname.toLowerCase() == lname.toLowerCase()) {
            objects.push(par[i]);
          }
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
                                <tr>
                                    <td>Phone Number</td>
                                    <td>${objects[0].phone}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td>${objects[0].total}</td>
                                </tr>
                                <tr>
                                    <td>Pledge</td>
                                    <td>${objects[0].pledge}</td>
                                </tr>
                              </tbody>
                            </table>`
      }
    }
  }

}

const errorMsg = (str) => {
  const div = document.createElement('div');
  div.classList.add('error');
  div.innerHTML = `<p class="message">${str}</p>`;
  const form = document.querySelector('form');
  form.insertAdjacentElement('beforebegin', div);
  setTimeout(() => {
    document.querySelector('.error').remove();
  }, 2000);
}