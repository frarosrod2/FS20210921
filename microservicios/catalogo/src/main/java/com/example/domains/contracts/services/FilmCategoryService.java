package com.example.domains.contracts.services;

import com.example.domains.core.services.contracts.DomainService;
import com.example.domains.core.services.contracts.ProjectionDomainService;
import com.example.domains.entities.Film;
import com.example.domains.entities.FilmActor;
import com.example.domains.entities.FilmCategory;

public interface FilmCategoryService extends DomainService<FilmCategory, Integer>{

}
