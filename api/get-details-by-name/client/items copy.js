


router.put('/:id', async (req,res) => {
  await Item.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    address: req.body.address,
  }, {new:true})
    .then(item => res.json(item))
})