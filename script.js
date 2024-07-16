document.addEventListener('DOMContentLoaded', function () {
    const phoneBtn = document.getElementById('phoneBtn');
    const emailBtn = document.getElementById('emailBtn');
    const inputContainer = document.getElementById('inputContainer');
    const nextBtn = document.getElementById('nextBtn');

    phoneBtn.addEventListener('click', function () {
        inputContainer.innerHTML = `
            <label for="phoneNumber" style="display: block; margin-bottom: 5px; color: white; text-align: left; padding-left: 75px;">Phone Number</label>
            <input type="text" id="phoneNumber" placeholder="Enter your phone number" style="width: 330px; height: 30px; color: black; text-align: left; padding-left: 10px;">
        `;
        nextBtn.classList.remove('hidden');
        nextBtn.innerText = 'Next';
        nextBtn.onclick = function () {
            showOtpInput();
        };
    });

    emailBtn.addEventListener('click', function () {
        inputContainer.innerHTML = `
            <label for="email" style="display: block; margin-bottom: 5px; color: white; text-align: left; padding-left: 75px;">Email</label>
            <input type="email" id="email" placeholder="Enter your email" style="width: 330px; height: 30px; color: black; text-align: left; padding-left: 10px;">
            <br style="margin-top: 10px;">
            <label for="password" style="display: block; margin-bottom: 5px; color: white; text-align: left; padding-left: 75px;">Password</label>
            <input type="password" id="password" placeholder="Enter your password" style="width: 330px; height: 30px; color: black; text-align: left; padding-left: 10px;">
        `;
        nextBtn.classList.remove('hidden');
        nextBtn.innerText = 'Login';
        nextBtn.onclick = function () {
            alert('Logged in with Email and Password');
            window.location.href = "page1.html";
        };
    });

    function showOtpInput() {
        inputContainer.innerHTML += `
            <label for="otp" style="display: block; margin-top: 20px; margin-bottom: 5px; color: white; text-align: left; padding-left: 75px;">Enter OTP</label>
            <div class="otp-container" style="display: flex; justify-content: flex-start; align-items: center; margin-left: 75px;">
                <input type="text" id="otp1" class="otp-input" maxlength="1" style="width: 30px; height: 30px; color: black; text-align: center; margin-right: 5px;">
                <input type="text" id="otp2" class="otp-input" maxlength="1" style="width: 30px; height: 30px; color: black; text-align: center; margin-right: 5px;">
                <input type="text" id="otp3" class="otp-input" maxlength="1" style="width: 30px; height: 30px; color: black; text-align: center; margin-right: 5px;">
                <input type="text" id="otp4" class="otp-input" maxlength="1" style="width: 30px; height: 30px; color: black; text-align: center;">
            </div>
        `;
        nextBtn.innerText = 'Login';
        nextBtn.onclick = function () {
            alert('Logged in with OTP');
            window.location.href = "page1.html";
        };
    }
});
