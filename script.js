//const apiBaseUrl = 'http://textoxitique.vercel.app/api/alunos';

//const apiBaseUrl = 'http://https://banco-xi.vercel.app/';

const apiBaseUrl = 'https://ap3-pink.vercel.app';

// Cadastro de aluno
document.getElementById('formCadastro').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const turma = document.getElementById('turma').value;

  fetch(`${apiBaseUrl}/cadastrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, turma }),
  })
    .then((response) => {
      if (response.ok) {
        alert('Aluno cadastrado com sucesso!');
        listarAlunos();  // Atualiza a lista de alunos após o cadastro
      } else {
        return response.json().then((data) => {
          // Se a resposta não for ok, mostra a mensagem de erro da API
          alert(`Erro ao cadastrar aluno: ${data.message || 'Erro desconhecido'}`);
        });
      }
    })
    .catch((err) => {
      console.error('Erro no cadastro:', err);
      alert('Houve um erro ao tentar cadastrar o aluno.');
    });
});


// Listar alunos
function listarAlunos() {
  fetch(`${apiBaseUrl}/listar`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Falha ao buscar dados');
      }
      return response.json();
    })
    .then((data) => {
      const lista = document.getElementById('listaAlunos');
      lista.innerHTML = '';  // Limpa a lista antes de preencher com os novos dados
      data.forEach((aluno) => {
        const li = document.createElement('li');
        li.textContent = `${aluno.nome} - ${aluno.turma}`;
        lista.appendChild(li);
      });
    })
    .catch((err) => console.error('Erro:', err));
}


// Inicializar lista
listarAlunos();