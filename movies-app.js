$(function() {
	//This id lets us keep track of which movie to delete
	let currentId = 0;

	// list of all movies in memory. Can use for sorting/other purposes
	let moviesList = [];

	$(function() {
		$('#new-movie-form').on('submit', function(e) {
			e.preventDefault();
			let title = $('#title').val();
			let rating = $('#rating').val();

			let movieData = { title, rating, currentId };

			const HTMLtoAppend = createMovieHTML(movieData);

			currentId++;
			moviesList.push(movieData);

			$('#movie-table-body').append(HTMLtoAppend);
			$('#new-movie-form').trigger('reset');
		});
	});

	$('tbody').on('click', '.btn.btn-danger', function(e) {
		//Determine the index corresponding to the delete button clicked

		let indexToBeRemoved = moviesList.findIndex((movie) => movie.currentId === $(this).data('deleteid'));

		// Remove the movie found at that index
		moviesList.splice(indexToBeRemoved, 1);

		// Remove from DOM

		$(this).parent().parent().remove();
	});
});

function createMovieHTML(data) {
	return ` <tr>
    <td>${data.title}</td>
    <td>${data.rating}</td>
    <td>
      <button class="btn btn-danger" data-delete-id=${data.currentId}>
        Delete
      </button>
    </td>
  <tr>`;
}
