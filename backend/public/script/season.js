function makeEditable(element) {
    const seasonName = element.querySelector('.season-name');
      const seasonYearbegin = element.querySelector('#begin');
      const seasonYearend = element.querySelector('#end');
      const editBtn = element.querySelector('#buttonEdit');
      const saveBtn = element.querySelector('#buttonSave');
      const chitietBtn = element.querySelector('#buttonchitiet');
      seasonName.contentEditable = 'true';
      seasonYearbegin.contentEditable = 'true';
      seasonYearend.contentEditable = 'true';
      // Cho phép chỉnh sửa
      editBtn.style.display = 'none'; // Ẩn nút "Sửa"
      chitietBtn.style.display = 'none'; //
      saveBtn.style.display = 'inline-block'; // Hiển thị nút "Lưu"
    }

    function saveChanges(element) {
      const seasonId = element.getAttribute('data-season-id');
      const seasonName = element.querySelector('.season-name');
      const seasonYearbegin = element.querySelector('#begin');
      const seasonYearend = element.querySelector('#end');
      const editBtn = element.querySelector('#buttonEdit');
      const saveBtn = element.querySelector('#buttonSave');
      const chitietBtn = element.querySelector('#buttonchitiet');
      const updatedYearbegin = parseInt(seasonYearbegin.textContent);
      const updatedYearend = parseInt(seasonYearend.textContent);
      const updateName = seasonName.textContent;
      if (updatedYearbegin < updatedYearend) {
        // Nếu seasonYearbegin < seasonYearend, thực hiện lưu thay đổi
        seasonName.contentEditable = 'false';
        seasonYearbegin.contentEditable = 'false';
        seasonYearend.contentEditable = 'false';
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        chitietBtn.style.display = 'inline-block';
        console.log(seasonId,updateName,  updatedYearbegin, updatedYearend);
        // Lưu thay đổi vào cơ sở dữ liệu hoặc thực hiện các tác vụ khác
        // Gửi dữ liệu lên server để lưu thay đổi
        fetch(`/api/v1/season/${seasonId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: updateName,
                yearStart: updatedYearbegin,
                yearEnd: updatedYearend,
            }),
        })
        .then(response => {
            if (response.status === 201) {
                console.log('Lưu thành công!');
            } else {
                console.error('Lỗi khi thay đổi:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Lỗi khi lưu thay đổi:', error.message);
        });
      } else {
        // Nếu seasonYearbegin >= seasonYearend, báo lỗi
        alert('Năm bắt đầu phải nhỏ hơn năm kết thúc.');
      }
    }
    function sendData(input) {
      const searchResult = document.getElementById('search-results');
      let match = input.value.match(/^[a-zA-Z ]*/);
      let match2 = input.value.match(/\s*/);
      if (match2[0] === input.value) {
        searchResult.innerHTML = '';
        return;
      }
      if (match[0] === input.value) {


        fetch('/api/v1/season/getName', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: input.value
          })
        }).then(res => res.json()).then(data => {
          const seasonList = document.querySelector('.season-list'); // Get the <ul> element
          seasonList.innerHTML = ''; // Clear existing content

          if (data.name.length < 1) {
            // Handle case when no results are found
            seasonList.innerHTML = '<p>Không tìm thấy</p>';
            return;
          }

          data.name.forEach((element, index) => {
            // Create a new <li> element for each season
            const li = document.createElement('li');
            li.classList.add('season-item');
            li.setAttribute('data-season-id', element._id);
            // Populate the <li> with season details
            li.innerHTML = `
                            <span class="season-name">${element.name}</span>
                            <span class="season-year" id="begin">${element.yearStart}</span>
                            <span class="season-year" id="end">${element.yearEnd}</span>
                            <button onclick='makeEditable(this.parentElement)' id="buttonEdit" class="season-detail-btn">Sửa</button>
                            <button onclick='saveChanges(this.parentElement)' id="buttonSave" class="season-detail-btn" style="display: none; margin-right: 115px;">Lưu</button>
                            <a href="/api/v1/season/${element._id}" class="season-detail-btn" id="buttonchitiet" >Chi tiết</a>`;
            // Append the <li> to the <ul>
            seasonList.appendChild(li);
          });
        });
        return;
      }
      searchResult.innerHTML = '';
    }
