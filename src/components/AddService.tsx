import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStore } from '../hooks/useStore';
import { useServicesApi } from '../hooks/useServicesApi';
import Category, { CategoryCheck } from '../types/Category';
import Cost from '../types/Cost';
import LoadingSpinner from './shared/LoadingSpinner';
import { genericApiAcess } from '../shared/genericApiAcess';
import Service from '../types/Service';

export default function AddService(): ReactElement {
  const { state: availableCategories } = useServicesApi<Category[]>(
    'api/categories/',
    'get'
  );

  const [title, setTitle] = useState<string>('');
  const [categories, setCategories] = useState<CategoryCheck[]>();
  const [description, setDescription] = useState<string>('');
  const [costs, setCosts] = useState<Cost>({ isMonthly: false, amount: 0 });

  const { store } = useStore();

  useEffect(() => {
    setCategories(
      availableCategories &&
        availableCategories.map((category) => ({
          checked: false,
          ...category,
        }))
    );
  }, [availableCategories]);

  const history = useHistory();

  if (!availableCategories || !categories) return <LoadingSpinner />;

  const evalChecked = (category: Category): boolean => {
    return categories.filter(
      (oneCategory) => oneCategory._id === category._id
    )[0].checked;
  };

  const onCategoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    setCategories((categories) => {
      if (!categories) return undefined;
      const categoriesFilterd = [...categories].filter(
        (oneCategory) => oneCategory._id !== category._id
      );
      return [
        ...categoriesFilterd,
        {
          checked: e.target.checked,
          _id: category._id,
          name: category.name,
        },
      ];
    });
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

    const newService = await genericApiAcess<Service>(
      'api/services',
      'post',
      data
    );

    if (newService) history.push(`/services/${newService._id}`);
  };

  return (
    <>
      <h2>Neue Dienstleistung anbieten</h2>

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
            {availableCategories.map((category) => (
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
                  defaultChecked
                  onChange={() => onCostTypeCheck(false)}
                />
                <Form.Check
                  type="radio"
                  label="Preis fällt monatlich an"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
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
    </>
  );
}
