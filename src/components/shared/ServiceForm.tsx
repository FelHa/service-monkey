import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStore } from '../../hooks/useStore';
import Category, { CategoryCheck } from '../../types/Category';
import Cost from '../../types/Cost';
import { genericApiAcess } from '../../shared/genericApiAcess';
import Service from '../../types/Service';

interface PropsBasic {
  readonly categories: CategoryCheck[];
  readonly title?: string;
  readonly description?: string;
  readonly costs?: Cost;
}

interface PropsEdit extends PropsBasic {
  readonly isEdit: boolean;
  readonly serviceId?: never;
}

interface PropsCreate extends PropsBasic {
  readonly isEdit?: never;
  readonly serviceId: string;
}

type Props = PropsCreate | PropsEdit;

export default function AddService(props: Props): ReactElement {
  const [title, setTitle] = useState(props.title || '');
  const [categories, setCategories] = useState<CategoryCheck[]>(
    props.categories
  );
  const [description, setDescription] = useState(props.description || '');
  const [costs, setCosts] = useState(
    props.costs || { amount: 0, isMonthly: false }
  );

  const { store } = useStore();

  const history = useHistory();

  const evalChecked = (category: Category): boolean => {
    return categories.filter(
      (oneCategory) => oneCategory._id === category._id
    )[0].checked;
  };

  const onCategoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    setCategories((categories) =>
      categories.map((oneCategory) => {
        if (oneCategory._id === category._id)
          oneCategory.checked = e.target.checked;
        return oneCategory;
      })
    );
  };

  const onTitelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onCostTypeCheck = (isMonthly: boolean) => {
    setCosts((costs) => ({ ...costs, isMonthly: isMonthly }));
  };

  const onCostAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCosts((costs) => ({ ...costs, amount: +e.target.value }));
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      user: store.user?._id,
      title,
      categoryIds: categories
        .filter((category) => category.checked)
        .map((category) => category._id),
      description,
      isMonthly: costs.isMonthly,
      amount: costs.amount,
    };

    if (!data.title || data.title.length > 255) {
      toast.warning('Bitte einen Titel mit maximal 255 Zeichen eingeben.');
      return;
    }
    if (data.categoryIds.length === 0) {
      toast.warning('Bitte mindestens eine Kategorie angeben.');
      return;
    }
    if (!data.description) {
      toast.warning(
        'Bitte eine Beschreibung der Dienstleistung mit maximal 5000 Zeichen angeben.'
      );
      return;
    }
    if (!data.amount) {
      toast.warning('Bitte die Kosten der Dienstleistung angeben.');
      return;
    }

    console.log(props);

    if (props.serviceId) {
      console.log('put');

      await genericApiAcess<Service>(
        `api/services/${props.serviceId}`,
        'put',
        data
      );
      history.push('/services');
    } else {
      const newService = await genericApiAcess<Service>(
        'api/services',
        'post',
        data
      );

      history.push(`/services/${newService?._id}`);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Form onSubmit={(e: SyntheticEvent) => onSubmit(e)}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => onTitelChange(e)}
              value={title}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCategories">
            <Form.Label>Kategorien</Form.Label>

            <div className="mb-3">
              {categories.map((category, index) => (
                <Form.Check
                  key={category._id}
                  inline
                  label={category.name}
                  type={'checkbox'}
                  id={category._id}
                  checked={evalChecked(category)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onCategoryChange(e, category)
                  }
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Beschreibung</Form.Label>
            <Form.Control
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onDescriptionChange(e)
              }
              value={description}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCosts">
            <Form.Label>Preis</Form.Label>
            <fieldset>
              <Form.Group as={Row}>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="Preis fällt einmalig an"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    checked={costs.isMonthly === false}
                    onChange={() => onCostTypeCheck(false)}
                  />
                  <Form.Check
                    type="radio"
                    label="Preis fällt monatlich an"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    checked={costs.isMonthly === true}
                    onChange={() => onCostTypeCheck(true)}
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>€</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onCostAmountChange(e)
                }
                value={costs && costs.amount ? costs.amount : ''}
              />
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit">
            Anbieten
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
