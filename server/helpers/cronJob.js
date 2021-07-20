const cron = require("node-cron");
const User = require("../models/userModel");

function deleteJob(timeSchedule, userId) {
  const url_taskMap = {};
  const task = cron.schedule(timeSchedule, async () => {
    const response = await User.findById(userId);
    if (response) {
      if (!response.isActive) {
        await User.findByIdAndDelete(userId);
        console.log("deleted user and stop");
        stopDel();
      } else {
        console.log("active cuma di stop");
        stopDel();
      }
    } else {
      stopDel();
    }
  });
  url_taskMap[`${userId}`] = task;
  let my_job = url_taskMap[`${userId}`];
  my_job.start();

  const stopDel = () => {
    my_job.stop();
  };
}

module.exports = {
  deleteJob,
};
