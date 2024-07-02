const topics = [
  {
    id: 1,
    name: 'Car rental',
    disabled: false,
  },
  {
    id: 2,
    name: 'Cargo Services',
    disabled: false,
  },
  {
    id: 3,
    name: 'Retail stocks',
    disabled: false,
  },
  {
    id: 4,
    name: 'Hotel accommodation',
    disabled: false,
  },
];


function getAllTopics(request, response) {
  return response.status(200).json(topics);
}

module.exports = {
  getAllTopics,
}